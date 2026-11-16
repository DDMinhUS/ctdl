import { AlgorithmItem, ApiKeyEntry, ApiSettings, EssayQuestion, GradeResult } from '../types';
import { gradeCodeOffline, gradeEssayOffline } from './offlineGrader';

const STORAGE_KEY = 'uet_dsa_api_settings_v1';

export const AVAILABLE_MODELS = [
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Nhanh, ổn định, khuyên dùng)' },
  { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Chấm tự luận & thuật toán sâu)' },
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash (Dự phòng tốc độ cao)' },
  { id: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash Lite (Tiết kiệm quota)' },
];

export function getDefaultApiSettings(): ApiSettings {
  const envKey1 = (import.meta.env.VITE_GEMINI_KEY_1 as string | undefined) || '';
  const envKey2 = (import.meta.env.VITE_GEMINI_KEY_2 as string | undefined) || '';

  const defaultKeys: ApiKeyEntry[] = [];
  if (envKey1) {
    defaultKeys.push({
      id: 'key-1',
      label: 'Key #1 (AIza... Primary)',
      key: envKey1,
      enabled: true,
      status: 'idle',
    });
  }
  if (envKey2) {
    defaultKeys.push({
      id: 'key-2',
      label: 'Key #2 (Backup Token)',
      key: envKey2,
      enabled: true,
      status: 'idle',
    });
  }

  return {
    keys: defaultKeys,
    preferredModel: 'gemini-2.5-flash',
    customModel: '',
  };
}

export function loadApiSettings(): ApiSettings {
  const defaults = getDefaultApiSettings();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as ApiSettings;
    // Merge env keys if user doesn't have them yet
    const mergedKeys = [...(parsed.keys || [])];
    for (const dk of defaults.keys) {
      if (!mergedKeys.some((k) => k.key === dk.key)) {
        mergedKeys.push(dk);
      }
    }
    return {
      keys: mergedKeys,
      preferredModel: parsed.preferredModel || defaults.preferredModel,
      customModel: parsed.customModel || '',
    };
  } catch {
    return defaults;
  }
}

export function saveApiSettings(settings: ApiSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function extractJsonObject(text: string): Record<string, unknown> | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : text.trim();
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(candidate.slice(start, end + 1)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function callGeminiWithRotation(
  prompt: string,
  settings: ApiSettings,
  onSettingsUpdate?: (updated: ApiSettings) => void
): Promise<{ rawText: string; usedModel: string; usedKeyLabel: string }> {
  const enabledKeys = settings.keys.filter((k) => k.enabled && k.key.trim().length > 0);
  if (enabledKeys.length === 0) {
    throw new Error('Chưa có API key nào được bật. Vui lòng thêm key trong tab API & Deploy.');
  }

  // Prioritize standard AIza keys first if both exist, while keeping user order otherwise
  const sortedKeys = [...enabledKeys].sort((a, b) => {
    const aStd = a.key.startsWith('AIza') ? 0 : 1;
    const bStd = b.key.startsWith('AIza') ? 0 : 1;
    return aStd - bStd;
  });

  const primaryModel = settings.customModel.trim() || settings.preferredModel || 'gemini-2.5-flash';
  const modelCandidates = Array.from(
    new Set([primaryModel, 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'])
  );

  let lastErr = 'Không thể kết nối Gemini API';
  const nextSettings: ApiSettings = {
    ...settings,
    keys: settings.keys.map((k) => ({ ...k })),
  };

  for (const keyEntry of sortedKeys) {
    for (const model of modelCandidates) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(keyEntry.key.trim())}`;
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: 'application/json',
            },
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          lastErr = `HTTP ${res.status} (${model}): ${errBody.slice(0, 180)}`;
          const targetKey = nextSettings.keys.find((k) => k.id === keyEntry.id);
          if (res.status === 429) {
            if (targetKey) {
              targetKey.status = 'quota';
              targetKey.lastError = 'Hết quota (429)';
            }
            break; // rotate to next key immediately
          }
          if (res.status === 400 || res.status === 401 || res.status === 403) {
            if (targetKey) {
              targetKey.status = 'invalid';
              targetKey.lastError = `Lỗi xác thực (${res.status})`;
            }
            break; // rotate to next key
          }
          // 404 model not found -> try next model with same key
          continue;
        }

        const data = (await res.json()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        };
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!rawText) {
          lastErr = 'Gemini trả về phản hồi rỗng.';
          continue;
        }

        const targetKey = nextSettings.keys.find((k) => k.id === keyEntry.id);
        if (targetKey) {
          targetKey.status = 'ok';
          targetKey.lastError = undefined;
        }
        onSettingsUpdate?.(nextSettings);
        saveApiSettings(nextSettings);
        return { rawText, usedModel: model, usedKeyLabel: keyEntry.label };
      } catch (err) {
        lastErr = err instanceof Error ? err.message : String(err);
      }
    }
  }

  onSettingsUpdate?.(nextSettings);
  saveApiSettings(nextSettings);
  throw new Error(lastErr);
}

export async function gradeJavaCodeWithAI(
  algo: AlgorithmItem,
  userCode: string,
  settings: ApiSettings,
  onSettingsUpdate?: (updated: ApiSettings) => void
): Promise<GradeResult> {
  const prompt = `Bạn là giảng viên chấm thi tự luận trên giấy môn Cấu trúc dữ liệu và Giải thuật (INT2210 - UET, giáo trình Robert Sedgewick Algorithms 4th Ed, ngôn ngữ Java).
Sinh viên đang tự ôn để mai thi viết code trên giấy.

ĐỀ BÀI: ${algo.title} (${algo.topic})
Mục tiêu: ${algo.summary}
Độ phức tạp chuẩn: Time ${algo.timeComplexity}, Space ${algo.spaceComplexity}.

CODE MẪU CHUẨN THAM KHẢO:
\`\`\`java
${algo.modelCode}
\`\`\`

BÀI LÀM CỦA SINH VIÊN:
\`\`\`java
${userCode}
\`\`\`

Hãy chấm điểm thật công tâm, chặt chẽ theo thang 10 của đề thi đại học UET (kiểm tra tính đúng logic, điều kiện dừng/biên, thao tác con trỏ/chỉ số mảng, cú pháp Java cơ bản, độ phức tạp).
Trả về ĐÚNG 1 JSON object theo schema sau (bằng tiếng Việt, súc tích, dễ hiểu cho sinh viên đang ôn gấp):
{
  "score": <số từ 0 đến 10, có thể lẻ .5>,
  "verdict": "<'Xuất sắc' | 'Đạt yêu cầu' | 'Cần sửa thêm' | 'Chưa đạt'>",
  "summary": "<nhận xét tổng quan 1-2 câu>",
  "strengths": ["<điểm làm đúng 1>", "<điểm làm đúng 2>"],
  "bugsOrGaps": ["<lỗi logic / thiếu điều kiện biên / sai cú pháp Java cụ thể ở dòng nào>"],
  "paperExamWarnings": ["<lưu ý mất điểm oan khi viết ra giấy thi>"],
  "improvedSnippet": "<đoạn code Java ngắn đã sửa lỗi nếu bài làm còn lỗi, hoặc chuỗi rỗng nếu đã chuẩn>"
}`;

  try {
    const { rawText, usedModel, usedKeyLabel } = await callGeminiWithRotation(
      prompt,
      settings,
      onSettingsUpdate
    );
    const parsed = extractJsonObject(rawText);
    if (!parsed) {
      throw new Error('Không phân tích được JSON từ Gemini.');
    }
    const score = Math.max(0, Math.min(10, Number(parsed.score ?? 0)));
    return {
      score,
      maxScore: 10,
      verdict: (parsed.verdict as GradeResult['verdict']) || (score >= 8.5 ? 'Xuất sắc' : score >= 6.5 ? 'Đạt yêu cầu' : score >= 4 ? 'Cần sửa thêm' : 'Chưa đạt'),
      provider: `${usedModel} · ${usedKeyLabel}`,
      summary: String(parsed.summary || 'Đã chấm xong.'),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.map(String) : [],
      bugsOrGaps: Array.isArray(parsed.bugsOrGaps) ? parsed.bugsOrGaps.map(String) : [],
      paperExamWarnings: Array.isArray(parsed.paperExamWarnings) ? parsed.paperExamWarnings.map(String) : [],
      improvedSnippet: parsed.improvedSnippet ? String(parsed.improvedSnippet) : undefined,
    };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    const fallback = gradeCodeOffline(
      algo,
      userCode,
      `Fallback Offline (API lỗi: ${errMsg.slice(0, 70)})`
    );
    return fallback;
  }
}

export async function gradeEssayWithAI(
  question: EssayQuestion,
  userAnswer: string,
  settings: ApiSettings,
  onSettingsUpdate?: (updated: ApiSettings) => void
): Promise<GradeResult> {
  const prompt = `Bạn là giảng viên UET chấm bài thi tự luận môn Cấu trúc dữ liệu và Giải thuật (INT2210 - Princeton algs4).

CÂU HỎI (${question.source}, tối đa ${question.maxScore} điểm):
${question.prompt}
${question.codeSnippet ? `\nĐoạn code đề bài:\n${question.codeSnippet}\n` : ''}

BA-REM CHẤM ĐIỂM CHUẨN:
${question.rubricCriteria.map((c, idx) => `${idx + 1}. ${c}`).join('\n')}

ĐÁP ÁN MẪU:
${question.modelAnswer}

BÀI LÀM CỦA SINH VIÊN:
${userAnswer}

Hãy chấm điểm theo đúng thang 0 đến ${question.maxScore} điểm. Chỉ rõ sinh viên đúng ý nào, sai hoặc thiếu ý nào (đặc biệt các bước trace trung gian, phép xoay cây, đếm truy nhập mảng, hoặc độ phức tạp).
Trả về ĐÚNG 1 JSON object:
{
  "score": <số từ 0 đến ${question.maxScore}, bước 0.25 hoặc 0.5>,
  "verdict": "<'Xuất sắc' | 'Đạt yêu cầu' | 'Cần sửa thêm' | 'Chưa đạt'>",
  "summary": "<nhận xét 1-2 câu về mức độ đạt chuẩn đề thi UET>",
  "strengths": ["<ý trả lời đúng>"],
  "bugsOrGaps": ["<ý sai hoặc thiếu so với ba-rem>"],
  "paperExamWarnings": ["<mẹo trình bày trên giấy thi để không bị trừ điểm>"]
}`;

  try {
    const { rawText, usedModel, usedKeyLabel } = await callGeminiWithRotation(
      prompt,
      settings,
      onSettingsUpdate
    );
    const parsed = extractJsonObject(rawText);
    if (!parsed) {
      throw new Error('Không phân tích được JSON từ Gemini.');
    }
    const score = Math.max(0, Math.min(question.maxScore, Number(parsed.score ?? 0)));
    return {
      score,
      maxScore: question.maxScore,
      verdict: (parsed.verdict as GradeResult['verdict']) || (score >= question.maxScore * 0.85 ? 'Xuất sắc' : score >= question.maxScore * 0.6 ? 'Đạt yêu cầu' : score >= question.maxScore * 0.35 ? 'Cần sửa thêm' : 'Chưa đạt'),
      provider: `${usedModel} · ${usedKeyLabel}`,
      summary: String(parsed.summary || 'Đã chấm xong.'),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.map(String) : [],
      bugsOrGaps: Array.isArray(parsed.bugsOrGaps) ? parsed.bugsOrGaps.map(String) : [],
      paperExamWarnings: Array.isArray(parsed.paperExamWarnings) ? parsed.paperExamWarnings.map(String) : [],
    };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return gradeEssayOffline(
      question,
      userAnswer,
      `Fallback Offline (API lỗi: ${errMsg.slice(0, 70)})`
    );
  }
}

export async function testGeminiKey(key: string, model: string): Promise<{ ok: boolean; message: string }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key.trim())}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Trả lời đúng 1 chữ: OK' }] }],
      }),
    });
    if (!res.ok) {
      const txt = await res.text();
      return { ok: false, message: `HTTP ${res.status}: ${txt.slice(0, 140)}` };
    }
    return { ok: true, message: `Kết nối thành công tới ${model}` };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : String(err) };
  }
}
