import { AlgorithmItem, EssayQuestion, GradeResult } from '../types';

function stripJavaComments(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\/\/.*$/gm, ' ');
}

function countChars(str: string, ch: string): number {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ch) count++;
  }
  return count;
}

export function gradeCodeOffline(
  algo: AlgorithmItem,
  userCode: string,
  reasonPrefix = 'Chấm nhanh Offline (Rubric Engine)'
): GradeResult {
  const cleaned = stripJavaComments(userCode).trim();
  if (cleaned.length < 25) {
    return {
      score: 0,
      maxScore: 10,
      verdict: 'Chưa đạt',
      provider: reasonPrefix,
      summary: 'Bài làm quá ngắn hoặc chưa điền code. Hãy thử viết ít nhất khung chính hoặc chuyển sang chế độ Điền khung.',
      strengths: [],
      bugsOrGaps: ['Chưa có thân hàm xử lý thuật toán.'],
      paperExamWarnings: ['Đi thi viết giấy cần ghi rõ khai báo biến, điều kiện dừng và lệnh return.'],
    };
  }

  let totalWeight = 0;
  let earnedWeight = 0;
  const strengths: string[] = [];
  const bugsOrGaps: string[] = [];
  const paperExamWarnings: string[] = [];

  for (const check of algo.rubricChecks) {
    totalWeight += check.points;
    const matched = check.patterns.some((pat) => new RegExp(pat, 'm').test(cleaned));
    if (matched) {
      earnedWeight += check.points;
      strengths.push(`Đạt tiêu chí: ${check.label}`);
    } else {
      bugsOrGaps.push(`Thiếu hoặc sai logic: ${check.label} — Gợi ý: ${check.hintIfMissing}`);
    }
  }

  // Structural Java syntax checks
  const openBraces = countChars(cleaned, '{');
  const closeBraces = countChars(cleaned, '}');
  const openParens = countChars(cleaned, '(');
  const closeParens = countChars(cleaned, ')');

  let syntaxPenalty = 0;
  if (openBraces !== closeBraces) {
    syntaxPenalty += 0.5;
    paperExamWarnings.push(`Số dấu ngoặc nhọn không khớp (${openBraces} '{' vs ${closeBraces} '}'). Khi viết giấy rất dễ sót dấu đóng '}'.`);
  }
  if (openParens !== closeParens) {
    syntaxPenalty += 0.5;
    paperExamWarnings.push(`Số dấu ngoặc tròn không khớp (${openParens} '(' vs ${closeParens} ')').`);
  }
  if (/Comparable/.test(algo.modelCode) && /\b[a-zA-Z0-9_\[\]]+\s*[<>]\s*[a-zA-Z0-9_\[\]]+/.test(cleaned) && !/less\s*\(/.test(cleaned) && !/compareTo\s*\(/.test(cleaned)) {
    paperExamWarnings.push('Nếu dùng kiểu Comparable trong Java, không được so sánh trực tiếp bằng `<` hoặc `>` mà phải dùng `a.compareTo(b) < 0` hoặc hàm `less(a, b)`.');
  }
  if (/if\s*\([^=!<>]*=[^=][^)]*\)/.test(cleaned)) {
    syntaxPenalty += 0.5;
    paperExamWarnings.push('Phát hiện phép gán `=` bên trong `if (...)` thay vì so sánh `==`. Lỗi này mất điểm nặng khi chấm giấy.');
  }

  const rawScore = totalWeight > 0 ? (earnedWeight / totalWeight) * 10 : 0;
  const finalScore = Math.max(0, Math.min(10, Math.round((rawScore - syntaxPenalty) * 10) / 10));

  let verdict: GradeResult['verdict'] = 'Chưa đạt';
  if (finalScore >= 8.5) verdict = 'Xuất sắc';
  else if (finalScore >= 6.5) verdict = 'Đạt yêu cầu';
  else if (finalScore >= 4) verdict = 'Cần sửa thêm';

  if (paperExamWarnings.length === 0) {
    paperExamWarnings.push('Cú pháp ngoặc và cấu trúc tổng thể ổn. Nhớ kiểm tra lại điều kiện biên (mảng rỗng, null, i == hi) trước khi nộp bài.');
  }

  return {
    score: finalScore,
    maxScore: 10,
    verdict,
    provider: reasonPrefix,
    summary:
      finalScore >= 8.5
        ? 'Cấu trúc thuật toán và các bước cốt lõi đã đầy đủ theo chuẩn algs4.'
        : 'Bài làm đã nắm được một phần ý tưởng, cần bổ sung các bước còn thiếu bên dưới để đạt điểm tối đa.',
    strengths,
    bugsOrGaps,
    paperExamWarnings,
  };
}

export function gradeEssayOffline(
  question: EssayQuestion,
  userAnswer: string,
  reasonPrefix = 'Chấm nhanh Offline (Keyword Rubric)'
): GradeResult {
  const normalized = userAnswer.toLowerCase().trim();
  if (normalized.length < 15) {
    return {
      score: 0,
      maxScore: question.maxScore,
      verdict: 'Chưa đạt',
      provider: reasonPrefix,
      summary: 'Câu trả lời còn quá ngắn. Hãy trình bày rõ từng bước hoặc ý tưởng + độ phức tạp.',
      strengths: [],
      bugsOrGaps: ['Chưa đủ dữ liệu để chấm theo thang điểm tự luận.'],
      paperExamWarnings: ['Đi thi tự luận UET cần nêu rõ: (1) Ý tưởng/Cấu trúc dữ liệu, (2) Minh họa từng bước nếu đề yêu cầu, (3) Độ phức tạp thời gian & bộ nhớ.'],
    };
  }

  const matchedPoints: string[] = [];
  const missingPoints: string[] = [];

  for (const kp of question.keyPoints) {
    const tokens = kp
      .toLowerCase()
      .split('|')
      .map((t) => t.trim())
      .filter(Boolean);
    const hit = tokens.some((tok) => normalized.includes(tok));
    if (hit) matchedPoints.push(kp.split('|')[0]);
    else missingPoints.push(kp.split('|')[0]);
  }

  const ratio = question.keyPoints.length > 0 ? matchedPoints.length / question.keyPoints.length : 0.5;
  const score = Math.round(ratio * question.maxScore * 10) / 10;

  let verdict: GradeResult['verdict'] = 'Chưa đạt';
  if (score >= question.maxScore * 0.85) verdict = 'Xuất sắc';
  else if (score >= question.maxScore * 0.6) verdict = 'Đạt yêu cầu';
  else if (score >= question.maxScore * 0.35) verdict = 'Cần sửa thêm';

  return {
    score,
    maxScore: question.maxScore,
    verdict,
    provider: reasonPrefix,
    summary: `Khớp ${matchedPoints.length}/${question.keyPoints.length} ý trọng tâm trong đáp án chuẩn. Hãy đối chiếu thêm phần Đáp án mẫu để hoàn thiện cách trình bày trên giấy.`,
    strengths: matchedPoints.map((m) => `Đã đề cập ý/từ khóa: ${m}`),
    bugsOrGaps: missingPoints.map((m) => `Chưa thấy rõ ý: ${m}`),
    paperExamWarnings: [
      'Chấm offline chỉ kiểm tra từ khóa cốt lõi; dùng Gemini AI Grader khi có mạng để chấm ngữ nghĩa chi tiết từng bước.',
    ],
  };
}
