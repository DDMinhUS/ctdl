import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Search,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Flame,
  Filter,
} from 'lucide-react';
import { JAVA_W3SCHOOLS_LESSONS } from '../data/javaW3Schools';
import { JavaLesson } from '../types';
import { JavaCodeBlock } from '../utils/javaHighlight';

interface JavaW3SchoolsViewProps {
  midtermOnly?: boolean;
}

const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  all: { label: 'Tất cả chủ đề', color: 'bg-slate-500/10 text-slate-700 dark:text-slate-300' },
  basics: { label: '1. Cú pháp & Căn bản', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300' },
  methods: { label: '2. Phương thức & Đệ quy', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
  oop: { label: '3. Hướng đối tượng OOP', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300' },
  collections: { label: '4. Collections & Nâng cao', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300' },
};

export const JavaW3SchoolsView: React.FC<JavaW3SchoolsViewProps> = ({ midtermOnly = false }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLessons = useMemo(() => {
    return JAVA_W3SCHOOLS_LESSONS.filter((lesson) => {
      // Filter by midterm if midtermOnly is active
      if (midtermOnly && !lesson.isMidtermCore) return false;

      // Filter by category
      if (selectedCat !== 'all' && lesson.category !== selectedCat) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = lesson.title.toLowerCase().includes(q);
        const matchesSummary = lesson.summary.toLowerCase().includes(q);
        const matchesTip = lesson.dsaExamTip.toLowerCase().includes(q);
        const matchesCode = lesson.codeExample.toLowerCase().includes(q);
        const matchesTags = lesson.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesTip && !matchesCode && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [midtermOnly, selectedCat, searchQuery]);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1829] via-[#162238] to-[#0c1829] p-6 sm:p-8 text-white border border-slate-700/60 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>W3SCHOOLS JAVA TUTORIAL // BẢN VIỆT HÓA CHUYÊN BIỆT CHO INT2210</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                <span>Cẩm Nang Cú Pháp Java Toàn Diện</span>
                {midtermOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/30 text-amber-300 border border-amber-500/50">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    Chế độ Giữa Kỳ
                  </span>
                )}
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
                Hệ thống hóa toàn bộ cú pháp Java từ cơ bản đến nâng cao theo cấu trúc của W3Schools.
                Mỗi bài học đều được giải thích trực giác, có mã nguồn chuẩn chạy ngay, kèm lưu ý đặc biệt cho các bài thi viết giấy và chấm máy của Đại học Công nghệ (UET).
              </p>
            </div>

            <a
              href="https://www.w3schools.com/java"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-colors shrink-0"
            >
              <span>Gốc: w3schools.com/java</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Search Box */}
          <div className="mt-4 relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhanh: 'comparable', 'node', 'casting', 'scanner', 'recursion', 'try-catch'..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
              >
                Xóa
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {Object.entries(CATEGORY_MAP).map(([catKey, { label }]) => {
          const active = selectedCat === catKey;
          return (
            <button
              key={catKey}
              onClick={() => setSelectedCat(catKey)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                active
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs font-semibold'
                  : 'bg-white dark:bg-[#151922] text-[#4b4f56] dark:text-slate-300 border-[#dcdcd4] dark:border-[#242b38] hover:border-emerald-400'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* List of Lessons */}
      <div className="space-y-5">
        <div className="flex items-center justify-between text-xs text-[#646970] dark:text-slate-400">
          <span>
            Đang hiển thị <strong>{filteredLessons.length}</strong> bài học Java
            {midtermOnly && ' (Đã lọc theo trọng tâm Giữa Kỳ)'}
          </span>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-[#dcdcd4] dark:border-[#242b38] bg-white/50 dark:bg-[#12161f]/50">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Không tìm thấy bài học nào phù hợp với từ khóa "{searchQuery}".
            </p>
          </div>
        ) : (
          filteredLessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-6 rounded-2xl border border-[#dcdcd4] dark:border-[#242b38] bg-white dark:bg-[#12161f] shadow-xs space-y-4 hover:border-emerald-500/40 transition-colors"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#e3e3dc] dark:border-[#1e2533]">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    &lt;/&gt;
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#14171a] dark:text-white">
                      {lesson.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium ${
                      CATEGORY_MAP[lesson.category]?.color || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {CATEGORY_MAP[lesson.category]?.label.split('. ')[1] || lesson.category}
                  </span>
                  {lesson.isMidtermCore && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-500" />
                      Trọng tâm Giữa kỳ
                    </span>
                  )}
                </div>
              </div>

              {/* Summary / Intuition */}
              <p className="text-xs sm:text-sm text-[#374151] dark:text-slate-300 leading-relaxed">
                {lesson.summary}
              </p>

              {/* Syntax Outline */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#181d28] border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                  Khung cú pháp chuẩn:
                </div>
                <pre className="whitespace-pre-wrap">{lesson.syntax}</pre>
              </div>

              {/* Code Example Block */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Mã nguồn minh họa (Code chạy được):</span>
                  </span>
                  <button
                    onClick={() => handleCopy(lesson.id, lesson.codeExample)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {copiedId === lesson.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl overflow-hidden border border-[#dcdcd4] dark:border-[#242b38] bg-[#0c1017] p-4 text-xs font-mono">
                  <JavaCodeBlock code={lesson.codeExample} />
                </div>
              </div>

              {/* DSA Exam Tip Box */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
                <div className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Lưu ý thi viết giấy & Cạm bẫy DSA (UET):</span>
                </div>
                <p className="text-xs text-amber-950 dark:text-amber-100 leading-relaxed">
                  {lesson.dsaExamTip}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {lesson.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
