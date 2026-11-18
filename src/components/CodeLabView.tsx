import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Code2,
  Eye,
  EyeOff,
  Loader2,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ALGORITHMS } from '../data/algorithms';
import { gradeJavaCodeWithAI } from '../services/geminiGrader';
import { gradeCodeOffline } from '../services/offlineGrader';
import { ApiSettings, GradeResult } from '../types';
import { JavaCodeBlock, renderTokenizedLine, tokenizeJavaLines } from '../utils/javaHighlight';

interface CodeLabViewProps {
  selectedAlgoId: string;
  onSelectAlgo: (id: string) => void;
  apiSettings: ApiSettings;
  onUpdateApiSettings: (next: ApiSettings) => void;
  algoScores: Record<string, number>;
  onSaveAlgoScore: (algoId: string, score: number) => void;
  midtermOnly?: boolean;
}

type PracticeMode = 'skeleton' | 'blank' | 'study';

function isLineInRange(lineNum: number, rangeStr: string): boolean {
  const parts = rangeStr.split('-').map((p) => parseInt(p.trim(), 10));
  if (parts.length === 1) return lineNum === parts[0];
  if (parts.length === 2) return lineNum >= parts[0] && lineNum <= parts[1];
  return false;
}

export const CodeLabView: React.FC<CodeLabViewProps> = ({
  selectedAlgoId,
  onSelectAlgo,
  apiSettings,
  onUpdateApiSettings,
  algoScores,
  onSaveAlgoScore,
  midtermOnly = false,
}) => {
  const displayedAlgos = useMemo(() => {
    if (!midtermOnly) return ALGORITHMS;
    return ALGORITHMS.filter((a) => a.isMidterm !== false);
  }, [midtermOnly]);

  const algo = displayedAlgos.find((a) => a.id === selectedAlgoId) || displayedAlgos[0];

  const [mode, setMode] = useState<PracticeMode>('skeleton');
  const [codeByAlgo, setCodeByAlgo] = useState<Record<string, string>>({});
  const [showModel, setShowModel] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState<number>(0);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);

  const currentCode =
    codeByAlgo[`${algo.id}:${mode}`] ??
    (mode === 'skeleton' ? algo.skeletonCode : mode === 'blank' ? algo.starterCode : algo.modelCode);

  useEffect(() => {
    setGradeResult(null);
    setActiveLineIdx(0);
    setShowModel(mode === 'study');
  }, [algo.id, mode]);

  const setCode = (val: string) => {
    setCodeByAlgo((prev) => ({ ...prev, [`${algo.id}:${mode}`]: val }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const next = currentCode.slice(0, start) + '    ' + currentCode.slice(end);
      setCode(next);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      });
    }
  };

  const handleReset = () => {
    const def = mode === 'skeleton' ? algo.skeletonCode : mode === 'blank' ? algo.starterCode : algo.modelCode;
    setCode(def);
    setGradeResult(null);
  };

  const handleGradeAI = async () => {
    setGrading(true);
    try {
      const res = await gradeJavaCodeWithAI(algo, currentCode, apiSettings, onUpdateApiSettings);
      setGradeResult(res);
      onSaveAlgoScore(algo.id, res.score);
    } finally {
      setGrading(false);
    }
  };

  const handleGradeOffline = () => {
    const res = gradeCodeOffline(algo, currentCode);
    setGradeResult(res);
    onSaveAlgoScore(algo.id, res.score);
  };

  const lineCount = currentCode.split('\n').length;
  const activeRange = algo.lineExplanations[activeLineIdx]?.lineRange || '';
  const backdropRef = useRef<HTMLPreElement>(null);
  const tokenizedEditor = useMemo(() => tokenizeJavaLines(currentCode), [currentCode]);
  const tokenizedModel = useMemo(() => tokenizeJavaLines(algo.modelCode), [algo.modelCode]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#14171a] dark:text-white">
          Phòng luyện Code Java (algs4 &amp; Paper Exam)
        </h1>
        <p className="text-sm text-[#5c6168] dark:text-slate-400 mt-1">
          Chọn chế độ Điền khung để học nhanh hoặc Viết lại từ đầu để test trí nhớ trước khi viết ra giấy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left list of algorithms */}
        <div className="lg:col-span-3 bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl overflow-hidden">
          <div className="px-3.5 py-2.5 bg-[#fafaf8] dark:bg-[#171b24] border-b border-[#ecece6] dark:border-[#222834] text-xs font-semibold text-[#5c6168] dark:text-slate-400">
            Danh sách thuật toán ({displayedAlgos.length})
            {midtermOnly && <span className="ml-1 text-amber-500 font-bold">🔥 Giữa kỳ</span>}
          </div>
          <div className="divide-y divide-[#f0f0ea] dark:divide-[#1d222d] max-h-[580px] overflow-y-auto">
            {displayedAlgos.map((item) => {
              const active = item.id === algo.id;
              const bestScore = algoScores[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectAlgo(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 transition-colors flex items-start justify-between gap-2 ${
                    active
                      ? 'bg-[#eef2ff] dark:bg-blue-950/50 border-l-2 border-l-[#1d4ed8] dark:border-l-blue-400'
                      : 'hover:bg-[#fafaf8] dark:hover:bg-[#171b24]/70'
                  }`}
                >
                  <div>
                    <div
                      className={`text-xs font-semibold ${
                        active ? 'text-[#1d4ed8] dark:text-blue-300' : 'text-[#14171a] dark:text-slate-100'
                      }`}
                    >
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#646970] dark:text-slate-400 mt-0.5">
                      {item.week} · {item.topic}
                    </div>
                  </div>
                  {bestScore !== undefined ? (
                    <span
                      className={`text-[11px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                        bestScore >= 8
                          ? 'bg-emerald-50 text-[#0f766e] dark:bg-teal-950/70 dark:text-teal-300'
                          : 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                      }`}
                    >
                      {bestScore}đ
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#8c9199] dark:text-slate-500 shrink-0">
                      {item.priority === 'Bắt buộc' ? '★' : ''}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Editor & Explanation Area */}
        <div className="lg:col-span-9 space-y-4">
          {/* Spec Card */}
          <motion.div
            key={algo.id}
            initial={{ opacity: 0.6, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-[#14171a] dark:text-white">{algo.title}</h2>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-[#1d4ed8] dark:text-blue-300 font-medium">
                    {algo.priority}
                  </span>
                </div>
                <p className="text-xs text-[#475569] dark:text-slate-300 mt-1 leading-relaxed">{algo.summary}</p>
              </div>
              <div className="text-right font-mono text-[11px] text-[#475569] dark:text-slate-300 bg-[#fafaf8] dark:bg-[#171b24] border border-[#ecece6] dark:border-[#242b38] px-3 py-1.5 rounded-lg">
                <div>Time: {algo.timeComplexity}</div>
                <div>Space: {algo.spaceComplexity}</div>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="mt-4 pt-3 border-t border-[#ecece6] dark:border-[#222834] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1 bg-[#f4f4f0] dark:bg-[#0e1117] p-1 rounded-lg">
                {(
                  [
                    ['skeleton', 'Điền khung cốt lõi (___)'],
                    ['blank', 'Tự viết từ đầu (Thi giấy)'],
                    ['study', 'Xem & Học Code mẫu'],
                  ] as const
                ).map(([m, label]) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      mode === m
                        ? 'text-[#14171a] dark:text-white'
                        : 'text-[#5c6168] dark:text-slate-400 hover:text-[#14171a] dark:hover:text-slate-200'
                    }`}
                  >
                    {mode === m && (
                      <motion.div
                        layoutId="codeModePill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute inset-0 bg-white dark:bg-[#1b202c] rounded-md shadow-xs border border-[#e3e3dc] dark:border-[#2c3444]"
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#475569] dark:text-slate-300 bg-[#f4f4f0] dark:bg-[#1b202c] hover:bg-[#e7e7e0] dark:hover:bg-[#252c3b] rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
                </button>
                <button
                  onClick={() => setShowModel((v) => !v)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#14171a] dark:text-white border border-[#dcdcd4] dark:border-[#2c3444] bg-white dark:bg-[#171b24] hover:bg-[#fafaf8] dark:hover:bg-[#1e2430] rounded-lg transition-colors"
                >
                  {showModel ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showModel ? 'Ẩn Code mẫu' : 'Xem Code mẫu & Giải thích'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Code Editor */}
          <div className="bg-[#161920] border border-[#2a3140] rounded-xl overflow-hidden text-neutral-100 shadow-sm">
            <div className="px-4 py-2 bg-[#101318] border-b border-[#242a37] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                {algo.id}.java — Thay thế các chỗ `___` hoặc viết code Java hoàn chỉnh (Hỗ trợ phím Tab)
              </span>
              <span>{lineCount} dòng</span>
            </div>
            <div className="max-h-[540px] overflow-y-auto flex font-mono text-[13px] leading-6">
              <div className="select-none pt-3 pb-4 px-3 text-right text-slate-500 bg-[#12151b] border-r border-[#222836] min-w-[44px] shrink-0">
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="relative flex-1 min-w-0 grid min-h-[360px]">
                <pre
                  ref={backdropRef}
                  aria-hidden="true"
                  className="code-editor col-start-1 row-start-1 pt-3 pb-4 px-3 m-0 pointer-events-none select-none overflow-x-hidden whitespace-pre text-[13px] leading-6"
                >
                  {tokenizedEditor.map((lineTokens, i) => (
                    <div key={i}>{lineTokens.length > 0 ? renderTokenizedLine(lineTokens) : ' '}</div>
                  ))}
                </pre>
                <textarea
                  value={currentCode}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onScroll={(e) => {
                    if (backdropRef.current) {
                      backdropRef.current.scrollLeft = e.currentTarget.scrollLeft;
                    }
                  }}
                  wrap="off"
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="code-editor code-overlay col-start-1 row-start-1 w-full h-full min-w-0 pt-3 pb-4 px-3 m-0 bg-transparent caret-sky-400 focus:outline-none resize-none overflow-x-auto overflow-y-hidden whitespace-pre text-[13px] leading-6"
                />
              </div>
            </div>

            <div className="px-4 py-3 bg-[#101318] border-t border-[#242a37] flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400">
                Mẹo: Chấm nhanh Offline mất 0ms; Chấm bằng Gemini AI soi từng lỗi logic và lỗi viết giấy.
              </div>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGradeOffline}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#222834] hover:bg-[#2d3545] text-slate-100 rounded-lg transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Chấm nhanh Offline
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGradeAI}
                  disabled={grading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#1d4ed8] hover:bg-blue-600 text-white rounded-lg disabled:opacity-60 transition-colors"
                >
                  {grading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  {grading ? 'Đang chấm...' : 'Chấm điểm bằng Gemini AI'}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Grade Result */}
          <AnimatePresence>
            {gradeResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-5 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#ecece6] dark:border-[#222834]">
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-3.5 py-2 rounded-lg font-mono text-xl font-bold tabular-nums ${
                        gradeResult.score >= 8
                          ? 'bg-emerald-50 text-[#0f766e] dark:bg-teal-950/70 dark:text-teal-300'
                          : gradeResult.score >= 5
                          ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300'
                      }`}
                    >
                      {gradeResult.score} / {gradeResult.maxScore}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#14171a] dark:text-white">{gradeResult.verdict}</div>
                      <div className="text-[11px] text-[#646970] dark:text-slate-400">
                        Nguồn chấm: {gradeResult.provider}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#14171a] dark:text-slate-200">{gradeResult.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#fafaf8] dark:bg-[#171b24] border border-[#e7e7e1] dark:border-[#242b38] rounded-lg p-3.5">
                    <div className="text-xs font-semibold text-[#0f766e] dark:text-teal-400 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Điểm đã làm đúng
                    </div>
                    {gradeResult.strengths.length === 0 ? (
                      <p className="text-xs text-[#646970] dark:text-slate-400">Chưa ghi nhận phần đúng rõ rệt.</p>
                    ) : (
                      <ul className="space-y-1.5 text-xs text-[#334155] dark:text-slate-300">
                        {gradeResult.strengths.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="bg-[#fafaf8] dark:bg-[#171b24] border border-[#e7e7e1] dark:border-[#242b38] rounded-lg p-3.5">
                    <div className="text-xs font-semibold text-rose-700 dark:text-rose-400 mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Lỗi cần sửa / Chỗ bị trừ điểm
                    </div>
                    {gradeResult.bugsOrGaps.length === 0 ? (
                      <p className="text-xs text-[#0f766e] dark:text-teal-400">Không phát hiện thiếu sót cốt lõi!</p>
                    ) : (
                      <ul className="space-y-1.5 text-xs text-[#334155] dark:text-slate-300">
                        {gradeResult.bugsOrGaps.map((b, i) => (
                          <li key={i}>• {b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {gradeResult.paperExamWarnings.length > 0 && (
                  <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-lg p-3 text-xs text-amber-900 dark:text-amber-200">
                    <span className="font-semibold">Lưu ý khi viết giấy: </span>
                    {gradeResult.paperExamWarnings.join(' ')}
                  </div>
                )}

                {gradeResult.improvedSnippet && gradeResult.improvedSnippet.trim() && (
                  <div>
                    <div className="text-xs font-semibold text-[#475569] dark:text-slate-300 mb-1.5">
                      Đoạn code sửa chuẩn:
                    </div>
                    <JavaCodeBlock
                      code={gradeResult.improvedSnippet}
                      className="p-3 bg-[#161920] rounded-lg text-xs leading-5 overflow-x-auto border border-[#2a3140]"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Model Code + Interactive Line Highlighting + Java Idioms */}
          <AnimatePresence>
            {showModel && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-5 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[#ecece6] dark:border-[#222834] pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#1d4ed8] dark:text-blue-400" />
                    <h3 className="text-base font-semibold text-[#14171a] dark:text-white">
                      Code mẫu chuẩn algs4 &amp; Giải thích từng câu lệnh Java
                    </h3>
                  </div>
                  <button
                    onClick={() => setCode(algo.modelCode)}
                    className="text-xs font-medium text-[#1d4ed8] dark:text-blue-400 hover:underline"
                  >
                    Nạp vào trình soạn thảo
                  </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#161920] border border-[#2a3140] text-slate-100 rounded-lg text-xs leading-6 overflow-x-auto font-mono">
                    {tokenizedModel.map((lineTokens, i) => {
                      const lineNum = i + 1;
                      const highlighted = activeRange && isLineInRange(lineNum, activeRange);
                      return (
                        <div
                          key={lineNum}
                          className={`px-2 rounded transition-colors ${
                            highlighted ? 'bg-blue-500/20 border-l-2 border-blue-400' : ''
                          }`}
                        >
                          <span className="inline-block w-7 select-none text-slate-500">
                            {String(lineNum).padStart(2, ' ')}
                          </span>
                          <span className="whitespace-pre">
                            {lineTokens.length > 0 ? renderTokenizedLine(lineTokens) : ' '}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2.5">
                    <div className="text-xs font-semibold text-[#475569] dark:text-slate-300">
                      Bấm từng khối để soi sáng dòng code tương ứng &amp; hiểu cú pháp Java:
                    </div>
                    {algo.lineExplanations.map((exp, idx) => (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setActiveLineIdx(idx)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          activeLineIdx === idx
                            ? 'bg-blue-50/70 dark:bg-blue-950/40 border-[#1d4ed8] dark:border-blue-500'
                            : 'bg-[#fafaf8] dark:bg-[#171b24] border-[#e7e7e1] dark:border-[#242b38] hover:border-[#cbd5e1] dark:hover:border-[#3b465c]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[11px] font-mono font-semibold text-[#1d4ed8] dark:text-blue-400">
                            Dòng {exp.lineRange}
                          </span>
                          <code className="text-[11px] text-[#334155] dark:text-slate-300 truncate max-w-[260px]">
                            {exp.snippet}
                          </code>
                        </div>
                        <p className="text-xs text-[#14171a] dark:text-slate-200">
                          <span className="font-semibold">Ý nghĩa Java:</span> {exp.javaSyntax}
                        </p>
                        <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
                          <span className="font-semibold text-[#0f766e] dark:text-teal-400">Thuật toán:</span>{' '}
                          {exp.algoRole}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Java Idioms & Paper Exam Traps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="border border-[#e7e7e1] dark:border-[#242b38] rounded-lg p-3.5 bg-[#fafaf8] dark:bg-[#171b24]">
                    <div className="text-xs font-semibold text-[#14171a] dark:text-white mb-2">
                      Từ vựng Java trong bài này
                    </div>
                    <div className="space-y-2">
                      {algo.javaIdioms.map((id, i) => (
                        <div key={i} className="text-xs">
                          <code className="px-1.5 py-0.5 bg-white dark:bg-[#0e1117] border border-[#dcdcd4] dark:border-[#2c3444] rounded text-[#1d4ed8] dark:text-blue-300">
                            {id.token}
                          </code>
                          <span className="text-[#475569] dark:text-slate-300 ml-1.5">— {id.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-[#e7e7e1] dark:border-[#242b38] rounded-lg p-3.5 bg-[#fafaf8] dark:bg-[#171b24]">
                    <div className="text-xs font-semibold text-[#14171a] dark:text-white mb-2">
                      Ghi chú sống còn khi viết giấy
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#334155] dark:text-slate-300">
                      {algo.paperTips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
