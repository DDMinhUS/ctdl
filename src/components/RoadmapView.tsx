import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Circle, Clock, Code2, Flame, Sparkles } from 'lucide-react';
import { JAVA_CRASH_COURSE, SPRINT_ROADMAP } from '../data/cheatSheet';
import { TabId } from '../types';

interface RoadmapViewProps {
  completedTaskIds: string[];
  onToggleTask: (id: string) => void;
  onNavigate: (tab: TabId, algoId?: string) => void;
  passedAlgoCount: number;
  totalAlgoCount: number;
  quizAccuracy: string;
  midtermOnly?: boolean;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  completedTaskIds,
  onToggleTask,
  onNavigate,
  passedAlgoCount,
  totalAlgoCount,
  quizAccuracy,
  midtermOnly = false,
}) => {
  const displayedRoadmap = useMemo(() => {
    if (!midtermOnly) return SPRINT_ROADMAP;
    return SPRINT_ROADMAP.filter((p) => p.id !== 'phase-4').map((p) => {
      if (p.id === 'phase-1') {
        return {
          ...p,
          phase: 'Chặng 1 (45 phút đầu): Java viết giấy, Độ phức tạp & Stack/Queue',
          goal: 'Nắm vững cú pháp Java algs4, phân tích độ phức tạp O(1)/O(log N) và cấu trúc LIFO/FIFO.',
          tasks: p.tasks.map((t) => {
            if (t.id === 't1-2') {
              return {
                id: 't1-2',
                title: 'Thuộc BinarySearch & Phân tích Độ phức tạp',
                detail: 'Tính mid an toàn `lo + (hi - lo) / 2`, phân tích worst-case ~ 1 + lg N so sánh và mô hình bộ nhớ 64-bit JVM.',
                tag: 'Bắt buộc' as const,
                linkedTab: 'codelab' as const,
                linkedAlgoId: 'binary-search',
              };
            }
            return t;
          }),
        };
      }
      if (p.id === 'phase-3') {
        return {
          ...p,
          phase: 'Chặng 3: BST & Cây Cân Bằng AVL',
          goal: 'Nắm chắc cây BST, xóa Hibbard và 4 phép xoay cân bằng cây AVL (LL, RR, LR, RL).',
          tasks: p.tasks
            .filter((t) => !t.title.toLowerCase().includes('băm') && !t.title.toLowerCase().includes('llrb'))
            .map((t) => {
              if (t.id === 't3-2') {
                return {
                  ...t,
                  title: 'Thành thạo 4 phép xoay AVL (LL, RR, LR, RL)',
                  detail: 'Thử chạy dãy 80 20 40 30 10 100 70 90 50 trên AVL để thấy từng bước xoay kép LR!',
                };
              }
              return t;
            }),
        };
      }
      return p;
    });
  }, [midtermOnly]);

  const totalTasks = displayedRoadmap.reduce((acc, p) => acc + p.tasks.length, 0);
  const doneTasks = displayedRoadmap.reduce(
    (acc, p) => acc + p.tasks.filter((t) => completedTaskIds.includes(t.id)).length,
    0
  );
  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#14171a] dark:text-white">
            Lộ trình cấp tốc 5 giờ — Mục tiêu 10 điểm INT2210
          </h1>
          <p className="text-sm text-[#5c6168] dark:text-slate-400 mt-1">
            Bám sát giáo trình Princeton algs4 &amp; cấu trúc đề tự luận UET (giấy thi viết Java).
          </p>
        </div>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('codelab', 'mergesort')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14171a] dark:bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-blue-500 transition-colors shrink-0 shadow-xs"
        >
          <Code2 className="w-4 h-4" />
          Vào luyện Code ngay
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Single divided metric strip */}
      <div className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#ecece6] dark:divide-[#222834]">
        <div className="p-4 space-y-2">
          <div className="text-xs font-medium text-[#646970] dark:text-slate-400">Tiến độ lộ trình ôn</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums text-[#14171a] dark:text-white">{pct}%</span>
            <span className="text-xs text-[#646970] dark:text-slate-400 tabular-nums">
              ({doneTasks}/{totalTasks} chặng nhỏ)
            </span>
          </div>
          <div className="h-1.5 bg-[#ecece6] dark:bg-[#1f2533] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#1d4ed8] dark:bg-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="text-xs font-medium text-[#646970] dark:text-slate-400">
            Thuật toán Java đã đạt &ge; 8đ
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums text-[#1d4ed8] dark:text-blue-400">
              {passedAlgoCount}
            </span>
            <span className="text-xs text-[#646970] dark:text-slate-400 tabular-nums">
              / {totalAlgoCount} bài chuẩn algs4
            </span>
          </div>
          <div className="h-1.5 bg-[#ecece6] dark:bg-[#1f2533] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#1d4ed8] dark:bg-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.round((passedAlgoCount / Math.max(1, totalAlgoCount)) * 100)}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="text-xs font-medium text-[#646970] dark:text-slate-400">Điểm Quiz Trắc nghiệm</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums text-[#0f766e] dark:text-teal-400">
              {quizAccuracy}
            </span>
            <span className="text-xs text-[#646970] dark:text-slate-400">câu đúng</span>
          </div>
          <div className="text-[11px] text-[#646970] dark:text-slate-500">
            Cộng thêm 7 bài tự luận chuẩn UET trong tab Quiz
          </div>
        </div>
      </div>

      {/* Midterm Filter Banner */}
      {midtermOnly && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200 text-xs">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Chế độ Ôn thi Giữa Kỳ đang BẬT:</strong> Đã tinh gọn chỉ hiển thị 5 chuyên đề trọng tâm: Complexity, Sort, Stack/Queue, Heap, BST + AVL. Đã ẩn các phần Đồ thị (DFS/BFS) &amp; Bảng băm mở rộng.
            </span>
          </div>
        </div>
      )}

      {/* Sprint Phases */}
      <div className="space-y-4">
        {displayedRoadmap.map((phase, pIdx) => {
          const phaseDone = phase.tasks.filter((t) => completedTaskIds.includes(t.id)).length;
          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: pIdx * 0.05 }}
              className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl overflow-hidden"
            >
              <div className="px-5 py-3.5 bg-[#fafaf8] dark:bg-[#171b24] border-b border-[#ecece6] dark:border-[#222834] flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 bg-white dark:bg-[#13161d] border border-[#dcdcd4] dark:border-[#2c3444] rounded text-[#475569] dark:text-slate-300">
                      <Clock className="w-3 h-3" /> {phase.duration}
                    </span>
                    <h2 className="text-sm font-semibold text-[#14171a] dark:text-white">{phase.phase}</h2>
                  </div>
                  <p className="text-xs text-[#5c6168] dark:text-slate-400 mt-1">{phase.goal}</p>
                </div>
                <span className="text-xs font-mono text-[#5c6168] dark:text-slate-400 tabular-nums">
                  {phaseDone}/{phase.tasks.length} hoàn thành
                </span>
              </div>

              <div className="divide-y divide-[#f0f0ea] dark:divide-[#1d222d]">
                {phase.tasks.map((task) => {
                  const checked = completedTaskIds.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      className="px-5 py-3.5 flex items-start justify-between gap-4 hover:bg-[#fafaf8] dark:hover:bg-[#171b24]/70 transition-colors"
                    >
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="flex items-start gap-3 text-left flex-1 group"
                      >
                        <motion.span
                          whileTap={{ scale: 0.85 }}
                          className="shrink-0 mt-0.5"
                        >
                          {checked ? (
                            <CheckCircle2 className="w-5 h-5 text-[#0f766e] dark:text-teal-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-[#9ca3af] dark:text-slate-600 group-hover:text-[#1d4ed8] dark:group-hover:text-blue-400 transition-colors" />
                          )}
                        </motion.span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-sm font-medium transition-colors ${
                                checked
                                  ? 'line-through text-[#8c9199] dark:text-slate-500'
                                  : 'text-[#14171a] dark:text-slate-100'
                              }`}
                            >
                              {task.title}
                            </span>
                            <span
                              className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                                task.tag === 'Bắt buộc'
                                  ? 'bg-blue-50 text-[#1d4ed8] dark:bg-blue-950/70 dark:text-blue-300'
                                  : task.tag === 'Trọng tâm'
                                  ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                  : 'bg-emerald-50 text-[#0f766e] dark:bg-teal-950/60 dark:text-teal-300'
                              }`}
                            >
                              {task.tag}
                            </span>
                          </div>
                          <p className="text-xs text-[#5c6168] dark:text-slate-400 mt-1 leading-relaxed">
                            {task.detail}
                          </p>
                        </div>
                      </button>

                      {task.linkedTab && (
                        <button
                          onClick={() => onNavigate(task.linkedTab!, task.linkedAlgoId)}
                          className="shrink-0 text-xs font-medium text-[#1d4ed8] dark:text-blue-400 hover:underline px-2.5 py-1.5 rounded-md hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-colors"
                        >
                          Mở bài &rarr;
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Java Crash Course for Paper Exam */}
      <div className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#1d4ed8] dark:text-blue-400" />
          <h2 className="text-base font-semibold text-[#14171a] dark:text-white">
            Khôi phục trí nhớ Java viết giấy trong 10 phút
          </h2>
        </div>
        <p className="text-xs text-[#5c6168] dark:text-slate-400 mb-4">
          Nếu bạn quên sạch Java trông như thế nào, chỉ cần thuộc đúng 8 mẫu lệnh dưới đây là viết trôi chảy mọi bài trong algs4.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {JAVA_CRASH_COURSE.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="border border-[#e7e7e1] dark:border-[#222834] rounded-lg p-3.5 bg-[#fafaf8] dark:bg-[#171b24]"
            >
              <code className="block text-xs font-semibold text-[#1d4ed8] dark:text-blue-300 bg-white dark:bg-[#0e1117] border border-[#e3e3dc] dark:border-[#2a3140] px-2.5 py-1.5 rounded mb-2 overflow-x-auto">
                {item.syntax}
              </code>
              <p className="text-xs text-[#14171a] dark:text-slate-200 leading-relaxed">{item.meaning}</p>
              <p className="text-[11px] text-[#0f766e] dark:text-teal-400 mt-1.5 font-medium">
                Mẹo thi giấy: {item.examTip}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
