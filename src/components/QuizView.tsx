import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  HelpCircle,
  Loader2,
  Sparkles,
  XCircle,
  Zap,
} from 'lucide-react';
import { ESSAY_QUESTIONS, MCQ_QUESTIONS } from '../data/quizzes';
import { gradeEssayWithAI } from '../services/geminiGrader';
import { gradeEssayOffline } from '../services/offlineGrader';
import { ApiSettings, GradeResult } from '../types';

interface QuizViewProps {
  apiSettings: ApiSettings;
  onUpdateApiSettings: (next: ApiSettings) => void;
  mcqAnswers: Record<string, number>;
  onAnswerMcq: (qId: string, idx: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  apiSettings,
  onUpdateApiSettings,
  mcqAnswers,
  onAnswerMcq,
}) => {
  const [subTab, setSubTab] = useState<'essay' | 'mcq'>('essay');
  const [selectedEssayId, setSelectedEssayId] = useState<string>(ESSAY_QUESTIONS[0].id);
  const [essayDrafts, setEssayDrafts] = useState<Record<string, string>>({});
  const [essayGrades, setEssayGrades] = useState<Record<string, GradeResult>>({});
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [grading, setGrading] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const essay = ESSAY_QUESTIONS.find((q) => q.id === selectedEssayId) || ESSAY_QUESTIONS[0];
  const draft = essayDrafts[essay.id] || '';
  const grade = essayGrades[essay.id];

  useEffect(() => {
    setShowHint(false);
    setShowAnswer(false);
    setSecondsElapsed(0);
  }, [essay.id]);

  useEffect(() => {
    if (subTab !== 'essay') return;
    const id = setInterval(() => setSecondsElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [subTab, essay.id]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
  };

  const handleGradeEssayAI = async () => {
    setGrading(true);
    try {
      const res = await gradeEssayWithAI(essay, draft, apiSettings, onUpdateApiSettings);
      setEssayGrades((prev) => ({ ...prev, [essay.id]: res }));
    } finally {
      setGrading(false);
    }
  };

  const handleGradeEssayOffline = () => {
    const res = gradeEssayOffline(essay, draft);
    setEssayGrades((prev) => ({ ...prev, [essay.id]: res }));
  };

  const answeredCount = Object.keys(mcqAnswers).length;
  const correctCount = MCQ_QUESTIONS.filter((q) => mcqAnswers[q.id] === q.correctIndex).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#14171a] dark:text-white">
            Đấu trường Quiz — Tự luận UET &amp; Trắc nghiệm Bẫy
          </h1>
          <p className="text-sm text-[#5c6168] dark:text-slate-400 mt-1">
            Luyện đề thật (Đề cuối kỳ 2024-2025 &amp; COS226 Midterm) — chấm điểm chi tiết bằng Gemini AI theo đúng ba-rem.
          </p>
        </div>

        <div className="flex gap-1 bg-[#e9e9e3] dark:bg-[#171b24] p-1 rounded-xl border border-transparent dark:border-[#242b38]">
          {(
            [
              ['essay', `Thi Tự luận (${ESSAY_QUESTIONS.length} bài)`],
              ['mcq', `Trắc nghiệm & Đúng/Sai (${correctCount}/${MCQ_QUESTIONS.length})`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setSubTab(id)}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                subTab === id
                  ? 'text-[#14171a] dark:text-white'
                  : 'text-[#5c6168] dark:text-slate-400 hover:text-[#14171a] dark:hover:text-slate-200'
              }`}
            >
              {subTab === id && (
                <motion.div
                  layoutId="quizSubtabPill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 bg-white dark:bg-[#222836] rounded-lg shadow-xs"
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {subTab === 'essay' ? (
          <motion.div
            key="essay-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
          >
            {/* Essay Question Selector */}
            <div className="lg:col-span-4 bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 bg-[#fafaf8] dark:bg-[#171b24] border-b border-[#ecece6] dark:border-[#222834] text-xs font-semibold text-[#5c6168] dark:text-slate-400">
                Bộ đề Tự luận chuẩn UET &amp; COS226
              </div>
              <div className="divide-y divide-[#f0f0ea] dark:divide-[#1d222d]">
                {ESSAY_QUESTIONS.map((q, idx) => {
                  const active = q.id === essay.id;
                  const g = essayGrades[q.id];
                  return (
                    <button
                      key={q.id}
                      onClick={() => setSelectedEssayId(q.id)}
                      className={`w-full text-left px-4 py-3 transition-colors ${
                        active
                          ? 'bg-[#eef2ff] dark:bg-blue-950/50 border-l-2 border-l-[#1d4ed8] dark:border-l-blue-400'
                          : 'hover:bg-[#fafaf8] dark:hover:bg-[#171b24]/70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-semibold ${
                            active ? 'text-[#1d4ed8] dark:text-blue-300' : 'text-[#14171a] dark:text-slate-100'
                          }`}
                        >
                          Bài {idx + 1}: {q.topic}
                        </span>
                        {g ? (
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-teal-950/70 text-[#0f766e] dark:text-teal-300">
                            {g.score}/{q.maxScore}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-[#646970] dark:text-slate-400">
                            {q.maxScore}đ
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#646970] dark:text-slate-400 mt-0.5">{q.source}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Essay Workspace */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ecece6] dark:border-[#222834] pb-3">
                  <div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#f4f4f0] dark:bg-[#1b202c] text-[#475569] dark:text-slate-300">
                      {essay.source} · Tối đa {essay.maxScore} điểm
                    </span>
                    <h2 className="text-base font-semibold text-[#14171a] dark:text-white mt-1.5">{essay.topic}</h2>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 bg-[#fafaf8] dark:bg-[#171b24] border border-[#e3e3dc] dark:border-[#242b38] rounded-lg text-[#475569] dark:text-slate-300 tabular-nums">
                    <Clock className="w-3.5 h-3.5" />
                    {formatTime(secondsElapsed)} / {essay.estimatedMinutes}p
                  </div>
                </div>

                <div className="text-sm text-[#14171a] dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {essay.prompt}
                </div>

                {essay.codeSnippet && (
                  <pre className="p-3.5 bg-[#161920] border border-[#2a3140] text-slate-100 rounded-lg text-xs leading-5 overflow-x-auto">
                    {essay.codeSnippet}
                  </pre>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowHint((v) => !v)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#f4f4f0] dark:bg-[#1b202c] hover:bg-[#e7e7e0] dark:hover:bg-[#252c3b] text-[#14171a] dark:text-slate-200 rounded-lg transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#1d4ed8] dark:text-blue-400" />
                    {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý hướng làm'}
                  </button>
                  <button
                    onClick={() => setShowAnswer((v) => !v)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#dcdcd4] dark:border-[#2c3444] bg-white dark:bg-[#171b24] hover:bg-[#fafaf8] dark:hover:bg-[#1e2430] text-[#14171a] dark:text-white rounded-lg transition-colors"
                  >
                    {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showAnswer ? 'Ẩn đáp án chuẩn' : 'Xem đáp án & Ba-rem chấm'}
                  </button>
                </div>

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-lg p-3.5 text-xs text-[#1e3a8a] dark:text-blue-200 space-y-1">
                        {essay.hints.map((h, i) => (
                          <div key={i}>• {h}</div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] dark:text-slate-300 mb-1.5">
                    Bài làm tự luận của bạn (trình bày từng bước hoặc viết mã giả / Java như trên giấy thi):
                  </label>
                  <textarea
                    value={draft}
                    onChange={(e) => setEssayDrafts((prev) => ({ ...prev, [essay.id]: e.target.value }))}
                    rows={8}
                    placeholder="Viết câu trả lời của bạn vào đây... (Ví dụ: 1. Ý tưởng / Từng bước biến đổi; 2. Code hoặc cấu trúc dữ liệu; 3. Độ phức tạp thời gian & không gian)"
                    className="w-full p-3.5 text-sm border border-[#dcdcd4] dark:border-[#2a3140] rounded-xl focus:outline-none focus:border-[#1d4ed8] dark:focus:border-blue-500 bg-[#fafaf8] dark:bg-[#161920] text-[#14171a] dark:text-slate-100 font-mono leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-[#646970] dark:text-slate-400">
                    Tự động xoay vòng qua các API key Gemini nếu gặp giới hạn token.
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleGradeEssayOffline}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#f4f4f0] dark:bg-[#1b202c] hover:bg-[#e7e7e0] dark:hover:bg-[#252c3b] text-[#14171a] dark:text-slate-100 rounded-lg transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Chấm nhanh Offline
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleGradeEssayAI}
                      disabled={grading}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#1d4ed8] hover:bg-blue-600 text-white rounded-lg disabled:opacity-60 transition-colors"
                    >
                      {grading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      {grading ? 'Gemini đang chấm...' : 'Chấm tự luận bằng Gemini AI'}
                    </motion.button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {grade && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-5 space-y-3"
                  >
                    <div className="flex items-center gap-3 pb-3 border-b border-[#ecece6] dark:border-[#222834]">
                      <span className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-[#1d4ed8] dark:text-blue-300 font-mono text-lg font-bold tabular-nums">
                        {grade.score} / {grade.maxScore} đ
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-[#14171a] dark:text-white">{grade.verdict}</div>
                        <div className="text-[11px] text-[#646970] dark:text-slate-400">{grade.provider}</div>
                      </div>
                    </div>
                    <p className="text-sm text-[#14171a] dark:text-slate-200">{grade.summary}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-[#fafaf8] dark:bg-[#171b24] border border-[#e7e7e1] dark:border-[#242b38]">
                        <div className="font-semibold text-[#0f766e] dark:text-teal-400 mb-1">Ý đạt điểm</div>
                        <ul className="space-y-1 text-[#334155] dark:text-slate-300">
                          {grade.strengths.map((s, i) => (
                            <li key={i}>• {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 rounded-lg bg-[#fafaf8] dark:bg-[#171b24] border border-[#e7e7e1] dark:border-[#242b38]">
                        <div className="font-semibold text-rose-700 dark:text-rose-400 mb-1">
                          Ý thiếu / sai cần bổ sung
                        </div>
                        <ul className="space-y-1 text-[#334155] dark:text-slate-300">
                          {grade.bugsOrGaps.length === 0 ? (
                            <li>Không thiếu ý quan trọng nào!</li>
                          ) : (
                            grade.bugsOrGaps.map((b, i) => <li key={i}>• {b}</li>)
                          )}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="bg-white dark:bg-[#13161d] border border-[#0f766e]/40 dark:border-teal-500/40 rounded-xl p-5 space-y-4"
                  >
                    <div className="text-sm font-semibold text-[#0f766e] dark:text-teal-400">
                      Đáp án chuẩn &amp; Ba-rem điểm thi UET
                    </div>
                    <div className="bg-[#fafaf8] dark:bg-[#171b24] border border-[#e7e7e1] dark:border-[#242b38] rounded-lg p-3.5 text-xs text-[#334155] dark:text-slate-300 space-y-1">
                      <div className="font-semibold text-[#14171a] dark:text-white mb-1">
                        Các ý bắt buộc phải có để ăn trọn {essay.maxScore}đ:
                      </div>
                      {essay.rubricCriteria.map((c, i) => (
                        <div key={i}>
                          {i + 1}. {c}
                        </div>
                      ))}
                    </div>
                    <pre className="p-4 bg-[#161920] border border-[#2a3140] text-slate-100 rounded-lg text-xs leading-relaxed whitespace-pre-wrap">
                      {essay.modelAnswer}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* MCQ & True/False Arena */
          <motion.div
            key="mcq-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-[#14171a] dark:text-slate-200">
                Đã làm <span className="font-semibold tabular-nums">{answeredCount}/{MCQ_QUESTIONS.length}</span> câu · Đúng{' '}
                <span className="font-semibold text-[#0f766e] dark:text-teal-400 tabular-nums">{correctCount}</span> câu
              </div>
              <div className="text-xs text-[#646970] dark:text-slate-400">
                Gồm toàn bộ câu Đúng/Sai bẫy từ đề Midterm COS226 &amp; lý thuyết algs4
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MCQ_QUESTIONS.map((q, idx) => {
                const chosen = mcqAnswers[q.id];
                const isAnswered = chosen !== undefined;
                const isRight = chosen === q.correctIndex;
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.02 }}
                    className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-4 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#f4f4f0] dark:bg-[#1b202c] text-[#475569] dark:text-slate-300">
                          Câu {idx + 1} · {q.source}
                        </span>
                        <span className="text-[11px] font-medium text-[#1d4ed8] dark:text-blue-400">{q.topic}</span>
                      </div>
                      <p className="text-sm font-medium text-[#14171a] dark:text-slate-100 leading-relaxed">
                        {q.question}
                      </p>
                      <div className="mt-3 space-y-1.5">
                        {q.options.map((opt, optIdx) => {
                          const picked = chosen === optIdx;
                          const correctOpt = q.correctIndex === optIdx;
                          let style =
                            'border-[#e3e3dc] dark:border-[#262d3b] bg-[#fafaf8] dark:bg-[#171b24] hover:border-[#94a3b8] dark:hover:border-slate-500 text-[#14171a] dark:text-slate-200';
                          if (isAnswered) {
                            if (correctOpt)
                              style =
                                'border-[#0f766e] dark:border-teal-500 bg-emerald-50 dark:bg-teal-950/60 text-[#0f766e] dark:text-teal-300 font-medium';
                            else if (picked)
                              style =
                                'border-rose-500 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300';
                            else
                              style =
                                'border-[#ecece6] dark:border-[#1d222d] bg-white dark:bg-[#13161d] text-[#8c9199] dark:text-slate-500';
                          }
                          return (
                            <motion.button
                              key={optIdx}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => onAnswerMcq(q.id, optIdx)}
                              className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-colors flex items-center justify-between gap-2 ${style}`}
                            >
                              <span>{opt}</span>
                              {isAnswered && correctOpt && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                              {isAnswered && picked && !correctOpt && <XCircle className="w-4 h-4 shrink-0" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isAnswered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="overflow-hidden"
                        >
                          <div
                            className={`p-3 rounded-lg text-xs leading-relaxed border ${
                              isRight
                                ? 'bg-emerald-50/50 dark:bg-teal-950/30 border-emerald-200 dark:border-teal-800/60 text-[#14171a] dark:text-slate-200'
                                : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-[#14171a] dark:text-slate-200'
                            }`}
                          >
                            <div className="font-semibold mb-1">
                              {isRight ? 'Chính xác!' : 'Cẩn thận bẫy đề thi!'}
                            </div>
                            <p>{q.explanation}</p>
                            <p className="mt-1.5 text-[11px] text-[#5c6168] dark:text-slate-400">
                              <span className="font-semibold">Điểm bẫy:</span> {q.trapNote}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
