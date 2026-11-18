import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Cpu, Search, TableProperties } from 'lucide-react';
import { COMPLEXITY_TABLE, EXAM_PLAYBOOK } from '../data/cheatSheet';
import { Simulators } from './Simulators';

const MEMORY_AND_FORMULAS = [
  {
    title: 'Bộ nhớ Java (64-bit JVM — Tuần 2)',
    items: [
      'Object overhead: 16 bytes | Tham chiếu (reference): 8 bytes | Padding: bội số của 8.',
      'int = 4 bytes | double = 8 bytes | boolean / byte = 1 byte | char = 2 bytes.',
      'Mảng `double[N]`: ~8N + 24 bytes | Mảng `int[N]`: ~4N + 24 bytes.',
      'Inner `Node` (LinkedList): 16 (header) + 8 (enclosing ref) + 8 (item) + 8 (next) = 40 bytes/phần tử.',
    ],
  },
  {
    title: 'Bất biến & Công thức Cây / Heap / Băm',
    items: [
      'Binary Heap (1-based): Cha của k là `k/2`, Con trái `2k`, Con phải `2k+1`. Các lá từ `N/2 + 1` đến `N`.',
      'Xây Heap bottom-up: tối đa `2N` phép so sánh & `N` lần đổi chỗ -> O(N) tuyến tính!',
      'Cây AVL: `|h(left) - h(right)| <= 1`, chiều cao `h <= 1.44 lg(N)`.',
      'Cây LLRB (Đỏ-Đen): mọi đường từ gốc tới null có cùng số cạnh ĐEN; chiều cao `h <= 2 lg(N)`.',
      'Hash Table: Separate Chaining `alpha = N/M` (lý tưởng ~5); Linear Probing luôn giữ `alpha <= 1/2`.',
    ],
  },
];

interface CheatSheetViewProps {
  midtermOnly?: boolean;
}

export const CheatSheetView: React.FC<CheatSheetViewProps> = ({ midtermOnly = false }) => {
  const [query, setQuery] = useState('');

  const filteredTable = COMPLEXITY_TABLE.filter((row) => {
    if (midtermOnly) {
      const name = row.name.toLowerCase();
      // Exclude graph algorithms and hash tables in midterm mode
      if (name.includes('hash') || name.includes('băm') || name.includes('đồ thị') || name.includes('dfs') || name.includes('bfs') || name.includes('kruskal') || name.includes('prim') || name.includes('dijkstra')) {
        return false;
      }
    }
    return (
      row.name.toLowerCase().includes(query.toLowerCase()) ||
      row.note.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#14171a] dark:text-white">
          Tổng kết kiến thức, Dạng đề "Bài tập mẫu" &amp; Mô phỏng
        </h1>
        <p className="text-sm text-[#5c6168] dark:text-slate-400 mt-1">
          Tất cả bảng độ phức tạp, công thức giải nhanh 5 dạng bài thi và trình mô phỏng Heap / AVL / Hash / Graph.
        </p>
      </div>

      {/* Interactive Simulators */}
      <Simulators />

      {/* 5 Exam Playbooks from "Bài tập mẫu" */}
      <div className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#ecece6] dark:border-[#222834] pb-3">
          <BookMarked className="w-4 h-4 text-[#1d4ed8] dark:text-blue-400" />
          <h2 className="text-base font-semibold text-[#14171a] dark:text-white">
            5 Dạng bài chắc chắn gặp từ folder "Bài tập mẫu" &amp; Đề UET
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAM_PLAYBOOK.map((pat) => (
            <motion.div
              key={pat.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="border border-[#e7e7e1] dark:border-[#242b38] rounded-xl p-4 bg-[#fafaf8] dark:bg-[#171b24] flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-semibold text-[#14171a] dark:text-white">{pat.title}</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-[#1d4ed8] dark:text-blue-300 font-medium">
                    {pat.frequency}
                  </span>
                </div>
                <p className="text-xs text-[#475569] dark:text-slate-300 mb-2.5">{pat.summary}</p>
                <ol className="space-y-1.5 text-xs text-[#14171a] dark:text-slate-200 list-decimal list-inside">
                  {pat.steps.map((st, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {st}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-lg text-[11px] text-amber-900 dark:text-amber-200">
                <span className="font-semibold">Bẫy hay mất điểm: </span>
                {pat.exampleTrap}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Memory & Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MEMORY_AND_FORMULAS.map((block, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-[#0f766e] dark:text-teal-400" />
              <h3 className="text-sm font-semibold text-[#14171a] dark:text-white">{block.title}</h3>
            </div>
            <ul className="space-y-2 text-xs text-[#334155] dark:text-slate-300">
              {block.items.map((it, j) => (
                <li key={j} className="leading-relaxed">
                  • {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Master Complexity Table */}
      <div className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#ecece6] dark:border-[#222834] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TableProperties className="w-4 h-4 text-[#14171a] dark:text-white" />
            <h2 className="text-base font-semibold text-[#14171a] dark:text-white">
              Bảng tổng hợp Độ phức tạp &amp; Tính ổn định (Học thuộc trước giờ G)
            </h2>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8c9199] dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Lọc thuật toán..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#dcdcd4] dark:border-[#2a3140] rounded-lg bg-[#fafaf8] dark:bg-[#171b24] text-[#14171a] dark:text-slate-100 focus:outline-none focus:border-[#1d4ed8]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fafaf8] dark:bg-[#171b24] border-b border-[#e3e3dc] dark:border-[#222834] text-[#5c6168] dark:text-slate-400">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Cấu trúc / Thuật toán</th>
                <th className="px-4 py-2.5 font-semibold">Best</th>
                <th className="px-4 py-2.5 font-semibold">Average</th>
                <th className="px-4 py-2.5 font-semibold">Worst</th>
                <th className="px-4 py-2.5 font-semibold">Space</th>
                <th className="px-4 py-2.5 font-semibold">Stable</th>
                <th className="px-4 py-2.5 font-semibold">Ghi chú thi cử</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ecece6] dark:divide-[#1d222d]">
              {filteredTable.map((r, i) => (
                <tr key={i} className="hover:bg-[#fafaf8] dark:hover:bg-[#171b24]/70 transition-colors">
                  <td className="px-4 py-2.5 font-semibold text-[#14171a] dark:text-white">{r.name}</td>
                  <td className="px-4 py-2.5 font-mono text-[#0f766e] dark:text-teal-400">{r.best}</td>
                  <td className="px-4 py-2.5 font-mono text-[#1d4ed8] dark:text-blue-400">{r.avg}</td>
                  <td className="px-4 py-2.5 font-mono text-rose-700 dark:text-rose-400">{r.worst}</td>
                  <td className="px-4 py-2.5 font-mono text-[#475569] dark:text-slate-300">{r.space}</td>
                  <td className="px-4 py-2.5 dark:text-slate-200">{r.stable}</td>
                  <td className="px-4 py-2.5 text-[#475569] dark:text-slate-300">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
