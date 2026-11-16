import React, { useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Plus,
  Rocket,
  ShieldAlert,
  Trash2,
  Wifi,
} from 'lucide-react';
import { AVAILABLE_MODELS, testGeminiKey } from '../services/geminiGrader';
import { ApiSettings } from '../types';

interface DeployApiViewProps {
  apiSettings: ApiSettings;
  onUpdateApiSettings: (next: ApiSettings) => void;
}

export const DeployApiView: React.FC<DeployApiViewProps> = ({
  apiSettings,
  onUpdateApiSettings,
}) => {
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [newLabel, setNewLabel] = useState('');
  const [newKey, setNewKey] = useState('');
  const [testMessages, setTestMessages] = useState<Record<string, { ok: boolean; msg: string }>>({});
  const [testingId, setTestingId] = useState<string | null>(null);

  const maskKey = (k: string) =>
    k.length <= 12 ? '••••••••' : `${k.slice(0, 8)}••••••••${k.slice(-6)}`;

  const handleTestKey = async (id: string, key: string) => {
    setTestingId(id);
    const model = apiSettings.customModel.trim() || apiSettings.preferredModel || 'gemini-2.5-flash';
    const res = await testGeminiKey(key, model);
    setTestMessages((prev) => ({ ...prev, [id]: { ok: res.ok, msg: res.message } }));
    const next = {
      ...apiSettings,
      keys: apiSettings.keys.map((k) =>
        k.id === id
          ? {
              ...k,
              status: res.ok ? ('ok' as const) : ('invalid' as const),
              lastError: res.ok ? undefined : res.message,
            }
          : k
      ),
    };
    onUpdateApiSettings(next);
    setTestingId(null);
  };

  const handleAddKey = () => {
    if (!newKey.trim()) return;
    const next: ApiSettings = {
      ...apiSettings,
      keys: [
        ...apiSettings.keys,
        {
          id: `custom-${Date.now()}`,
          label: newLabel.trim() || `Key #${apiSettings.keys.length + 1}`,
          key: newKey.trim(),
          enabled: true,
          status: 'idle',
        },
      ],
    };
    onUpdateApiSettings(next);
    setNewLabel('');
    setNewKey('');
  };

  const toggleEnabled = (id: string) => {
    onUpdateApiSettings({
      ...apiSettings,
      keys: apiSettings.keys.map((k) => (k.id === id ? { ...k, enabled: !k.enabled } : k)),
    });
  };

  const removeKey = (id: string) => {
    onUpdateApiSettings({
      ...apiSettings,
      keys: apiSettings.keys.filter((k) => k.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#14171a] dark:text-white">
          Cấu hình Gemini API &amp; Hướng dẫn Deploy web lên mạng
        </h1>
        <p className="text-sm text-[#5c6168] dark:text-slate-400 mt-1">
          Quản lý 2 API Key xoay vòng tự động và hướng dẫn đưa trang web lên Vercel / Netlify / GitHub Pages miễn phí.
        </p>
      </div>

      {/* Gemini API Config */}
      <div className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#ecece6] dark:border-[#222834] pb-3">
          <KeyRound className="w-4 h-4 text-[#1d4ed8] dark:text-blue-400" />
          <h2 className="text-base font-semibold text-[#14171a] dark:text-white">
            Cấu hình Model &amp; Xoay vòng API Key
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#5c6168] dark:text-slate-400 mb-1">
              Chọn Gemini Model chấm bài
            </label>
            <select
              value={apiSettings.preferredModel}
              onChange={(e) => onUpdateApiSettings({ ...apiSettings, preferredModel: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-[#dcdcd4] dark:border-[#2a3140] rounded-lg bg-[#fafaf8] dark:bg-[#171b24] text-[#14171a] dark:text-slate-100"
            >
              {AVAILABLE_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#5c6168] dark:text-slate-400 mb-1">
              Hoặc nhập Model ID tùy chọn (tự động fallback sang Flash nếu 404)
            </label>
            <input
              value={apiSettings.customModel}
              onChange={(e) => onUpdateApiSettings({ ...apiSettings, customModel: e.target.value })}
              placeholder="Ví dụ: gemini-2.5-flash"
              className="w-full px-3 py-2 text-xs border border-[#dcdcd4] dark:border-[#2a3140] rounded-lg font-mono bg-[#fafaf8] dark:bg-[#171b24] text-[#14171a] dark:text-slate-100"
            />
          </div>
        </div>

        <div className="text-xs text-[#475569] dark:text-slate-300 bg-[#f4f4f0] dark:bg-[#171b24] p-3 rounded-lg leading-relaxed">
          <span className="font-semibold text-[#14171a] dark:text-white">Lưu ý kỹ thuật:</span> Endpoint công khai của Google Gemini sử dụng tên model chính thức như{' '}
          <code>gemini-2.5-flash</code>, <code>gemini-2.5-pro</code>, <code>gemini-2.0-flash</code>. Key dạng <code>AIza...</code> là Google AI Studio API key chuẩn (được ưu tiên gọi trước), key thứ 2 làm dự phòng xoay vòng, và nếu hết token hệ thống tự chuyển sang Chấm Offline Rubric để bạn không bao giờ bị gián đoạn.
        </div>

        {/* Key List */}
        <div className="space-y-2">
          {apiSettings.keys.map((k) => {
            const revealed = !!revealedIds[k.id];
            const tMsg = testMessages[k.id];
            return (
              <div
                key={k.id}
                className="flex flex-wrap items-center justify-between gap-3 p-3 border border-[#e3e3dc] dark:border-[#242b38] rounded-lg bg-[#fafaf8] dark:bg-[#171b24]"
              >
                <div className="flex items-center gap-3 min-w-[220px]">
                  <input
                    type="checkbox"
                    checked={k.enabled}
                    onChange={() => toggleEnabled(k.id)}
                    className="w-4 h-4 accent-[#1d4ed8]"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#14171a] dark:text-white flex items-center gap-2">
                      {k.label}
                      {k.status === 'ok' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-teal-950/70 text-[#0f766e] dark:text-teal-300">
                          Hoạt động
                        </span>
                      )}
                      {k.status === 'quota' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                          Hết quota
                        </span>
                      )}
                      {k.status === 'invalid' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300">
                          Lỗi key
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-[#5c6168] dark:text-slate-400 mt-0.5">
                      {revealed ? k.key : maskKey(k.key)}
                    </div>
                    {tMsg && (
                      <div className={`text-[11px] mt-1 ${tMsg.ok ? 'text-[#0f766e] dark:text-teal-400' : 'text-rose-700 dark:text-rose-400'}`}>
                        {tMsg.msg}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setRevealedIds((p) => ({ ...p, [k.id]: !p[k.id] }))}
                    className="p-1.5 rounded bg-white dark:bg-[#13161d] border border-[#dcdcd4] dark:border-[#2c3444] text-[#475569] dark:text-slate-300 hover:text-[#14171a] dark:hover:text-white"
                    title="Hiện/Ẩn key"
                  >
                    {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleTestKey(k.id, k.key)}
                    disabled={testingId === k.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white dark:bg-[#13161d] border border-[#dcdcd4] dark:border-[#2c3444] text-xs font-medium text-[#14171a] dark:text-white hover:bg-[#f4f4f0] dark:hover:bg-[#1f2533]"
                  >
                    <Wifi className="w-3.5 h-3.5 text-[#1d4ed8] dark:text-blue-400" />
                    {testingId === k.id ? 'Đang thử...' : 'Test Key'}
                  </button>
                  <button
                    onClick={() => removeKey(k.id)}
                    className="p-1.5 rounded bg-white dark:bg-[#13161d] border border-[#dcdcd4] dark:border-[#2c3444] text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                    title="Xóa key"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Key */}
        <div className="flex flex-wrap gap-2 pt-2">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Tên gợi nhớ (vd: Key dự phòng 3)"
            className="px-3 py-1.5 text-xs border border-[#dcdcd4] dark:border-[#2a3140] rounded-lg bg-[#fafaf8] dark:bg-[#171b24] text-[#14171a] dark:text-slate-100 w-48"
          />
          <input
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Dán API Key AIza... mới vào đây"
            className="flex-1 min-w-[220px] px-3 py-1.5 text-xs border border-[#dcdcd4] dark:border-[#2a3140] rounded-lg font-mono bg-[#fafaf8] dark:bg-[#171b24] text-[#14171a] dark:text-slate-100"
          />
          <button
            onClick={handleAddKey}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#14171a] dark:bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-blue-500"
          >
            <Plus className="w-3.5 h-3.5" /> Thêm Key
          </button>
        </div>
      </div>

      {/* Security Warning */}
      <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/70 rounded-xl p-4 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="font-semibold">Cảnh báo bảo mật quan trọng khi dùng từ GitHub / Vercel:</div>
          <p>
            File <code>.env.local</code> đã được <code>.gitignore</code> bỏ qua nên KHÔNG bị đẩy lên repo GitHub <code>DDMinhUS/ctdl</code>.
            Khi mở web đã deploy trên mạng (GitHub Pages / Vercel / Netlify), chỉ cần dán key Gemini của bạn vào ô phía trên (chỉ lưu riêng trong <code>localStorage</code> trình duyệt của bạn) hoặc cấu hình <code>VITE_GEMINI_KEY_1</code> trong Environment Variables trên Vercel.
          </p>
        </div>
      </div>

      {/* Deployment Guide */}
      <div className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-5 space-y-5">
        <div className="flex items-center gap-2 border-b border-[#ecece6] dark:border-[#222834] pb-3">
          <Rocket className="w-4 h-4 text-[#0f766e] dark:text-teal-400" />
          <h2 className="text-base font-semibold text-[#14171a] dark:text-white">
            Hướng dẫn Deploy web lên mạng (Miễn phí, 2 phút xong)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="border border-[#e7e7e1] dark:border-[#242b38] rounded-xl p-4 bg-[#fafaf8] dark:bg-[#171b24] space-y-2">
            <div className="font-semibold text-sm text-[#14171a] dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0f766e] dark:text-teal-400" /> Cách 1: Vercel (Khuyên dùng)
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-[#334155] dark:text-slate-300 leading-relaxed">
              <li>Đăng nhập <code>vercel.com</code> bằng GitHub và chọn Import repo <code>DDMinhUS/ctdl</code>.</li>
              <li>Vào <strong>Settings &rarr; Environment Variables</strong> thêm <code>VITE_GEMINI_KEY_1</code>.</li>
              <li>Bấm <strong>Deploy</strong> — mỗi lần push code sẽ tự cập nhật web ngay lập tức.</li>
            </ol>
          </div>

          <div className="border border-[#e7e7e1] dark:border-[#242b38] rounded-xl p-4 bg-[#fafaf8] dark:bg-[#171b24] space-y-2">
            <div className="font-semibold text-sm text-[#14171a] dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1d4ed8] dark:text-blue-400" /> Cách 2: GitHub Pages (Đã cài sẵn Workflow)
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-[#334155] dark:text-slate-300 leading-relaxed">
              <li>Mở repo <code>github.com/DDMinhUS/ctdl</code> &rarr; <strong>Settings &rarr; Pages</strong>.</li>
              <li>Ở mục <strong>Source</strong>, chọn <strong>GitHub Actions</strong>.</li>
              <li>Workflow <code>deploy.yml</code> đã cài sẵn sẽ tự build và phát hành tại <code>ddminhus.github.io/ctdl</code>!</li>
            </ol>
          </div>

          <div className="border border-[#e7e7e1] dark:border-[#242b38] rounded-xl p-4 bg-[#fafaf8] dark:bg-[#171b24] space-y-2">
            <div className="font-semibold text-sm text-[#14171a] dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#475569] dark:text-slate-400" /> Cách 3: Netlify Drop (30 giây)
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-[#334155] dark:text-slate-300 leading-relaxed">
              <li>Chạy lệnh <code>npm run build</code> để tạo thư mục <code>dist/</code>.</li>
              <li>Mở <code>app.netlify.com/drop</code> và kéo thả thư mục <code>dist/</code> vào.</li>
              <li>Có ngay link online để mở trên điện thoại hoặc máy tính khác.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
