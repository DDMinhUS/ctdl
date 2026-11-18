import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Search,
  BookOpen,
  Code2,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Cpu,
  BookmarkCheck,
  ExternalLink,
} from 'lucide-react';
import { SLIDE_WEEKS_DATA, WeekSlideData, SlideConcept } from '../data/slidesWeeks';
import { JavaCodeBlock } from '../utils/javaHighlight';
import { TabId } from '../types';

interface SlideReviewViewProps {
  onNavigate: (tab: TabId, algoId?: string) => void;
  midtermOnly?: boolean;
}

// ==========================================
// INTERACTIVE / CUSTOM SVG DIAGRAMS FOR SLIDES
// ==========================================
const VisualDiagram: React.FC<{ type?: string; conceptName: string }> = ({ type, conceptName }) => {
  if (!type) return null;

  switch (type) {
    case 'union-find':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-blue-400 font-mono mb-2">
            <span>// Minh họa Cấu trúc Rừng Cây Quick-Union & Weighted Quick-Union</span>
            <span className="text-slate-400">id[i] = parent</span>
          </div>
          <svg viewBox="0 0 540 180" className="w-full max-w-[540px] mx-auto h-auto">
            {/* Tree 1: 0 -> 1 -> 9 */}
            <line x1="80" y1="40" x2="50" y2="90" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="80" y1="40" x2="110" y2="90" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="50" y1="90" x2="30" y2="140" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
            
            <circle cx="80" cy="40" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="80" y="44" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">9 (gốc)</text>

            <circle cx="50" cy="90" r="16" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
            <text x="50" y="94" fill="#e2e8f0" fontSize="12" textAnchor="middle">1</text>

            <circle cx="110" cy="90" r="16" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
            <text x="110" y="94" fill="#e2e8f0" fontSize="12" textAnchor="middle">2</text>

            <circle cx="30" cy="140" r="14" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            <text x="30" y="144" fill="#94a3b8" fontSize="11" textAnchor="middle">0</text>

            {/* Path compression arrow */}
            <path d="M 35 125 C 20 80, 50 50, 62 42" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="65,40 58,45 64,50" fill="#f59e0b" />
            <text x="5" y="70" fill="#f59e0b" fontSize="10" fontStyle="italic">Path Compression: 0 nối tắt lên 9</text>

            {/* Tree 2: Weighted Union sz[9]=4 vs sz[6]=2 */}
            <line x1="260" y1="90" x2="260" y2="40" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="260" cy="40" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
            <text x="260" y="44" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">6 (gốc)</text>

            <circle cx="260" cy="90" r="16" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
            <text x="260" y="94" fill="#e2e8f0" fontSize="12" textAnchor="middle">5</text>

            {/* Weighted Union operation */}
            <path d="M 240 40 C 180 20, 130 20, 100 38" fill="none" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="98,39 105,33 107,41" fill="#10b981" />
            <text x="135" y="16" fill="#10b981" fontSize="11" fontWeight="bold">Gốc 6 nối vào gốc 9 vì sz[6] &lt; sz[9]</text>

            {/* Array State Table at bottom */}
            <rect x="330" y="30" width="190" height="110" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="345" y="52" fill="#94a3b8" fontSize="11" fontFamily="monospace">Mảng id[] (Parent):</text>
            <text x="345" y="75" fill="#38bdf8" fontSize="11" fontFamily="monospace">i:     0  1  2  5  6  9</text>
            <text x="345" y="95" fill="#f8fafc" fontSize="11" fontFamily="monospace">id[i]: 1  9  9  6  9  9</text>
            <text x="345" y="122" fill="#10b981" fontSize="10" fontFamily="monospace">Chi phí: lg* N &le; 5 (gần O(1))</text>
          </svg>
        </div>
      );

    case 'memory-box':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
            <span>// Cấu trúc bộ nhớ 64-bit JVM của Node (LinkedList) - Tổng cộng 32 Bytes/Node</span>
            <span className="text-slate-400">Sedgewick algs4 Sec 1.4</span>
          </div>
          <svg viewBox="0 0 540 140" className="w-full max-w-[540px] mx-auto h-auto">
            {/* 16B Overhead */}
            <rect x="20" y="30" width="130" height="55" rx="6" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="2" />
            <text x="85" y="55" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle">Header (16B)</text>
            <text x="85" y="72" fill="#cbd5e1" fontSize="10" textAnchor="middle">Mark + Class Pointer</text>

            {/* 8B Inner pointer */}
            <rect x="160" y="30" width="110" height="55" rx="6" fill="#8b5cf6" fillOpacity="0.25" stroke="#8b5cf6" strokeWidth="2" />
            <text x="215" y="55" fill="#c4b5fd" fontSize="12" fontWeight="bold" textAnchor="middle">Inner Class (8B)</text>
            <text x="215" y="72" fill="#cbd5e1" fontSize="10" textAnchor="middle">Outer 'this' ref</text>

            {/* 8B Item pointer */}
            <rect x="280" y="30" width="110" height="55" rx="6" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" />
            <text x="335" y="55" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">item ref (8B)</text>
            <text x="335" y="72" fill="#cbd5e1" fontSize="10" textAnchor="middle">Tham chiếu phần tử</text>

            {/* 8B next pointer */}
            <rect x="400" y="30" width="120" height="55" rx="6" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="2" />
            <text x="460" y="55" fill="#fde68a" fontSize="12" fontWeight="bold" textAnchor="middle">next ref (8B)</text>
            <text x="460" y="72" fill="#cbd5e1" fontSize="10" textAnchor="middle">Tham chiếu Node tiếp</text>

            {/* Sum brace */}
            <line x1="20" y1="100" x2="520" y2="100" stroke="#64748b" strokeWidth="1.5" />
            <text x="270" y="125" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
              16B + 8B + 8B + 8B = 40B/Node (hoặc 32B nếu static Node không trỏ outer class)
            </text>
          </svg>
        </div>
      );

    case 'stack-queue':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-sky-400 font-mono mb-2">
            <span>// Cơ chế Con trỏ: Stack (LIFO tại first) vs Queue (FIFO: enqueue tại last, dequeue tại first)</span>
          </div>
          <svg viewBox="0 0 540 130" className="w-full max-w-[540px] mx-auto h-auto">
            {/* Stack side */}
            <text x="120" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Stack (Push & Pop cùng ở first)</text>
            <rect x="40" y="45" width="55" height="36" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="67" y="68" fill="#e2e8f0" fontSize="11" textAnchor="middle">A</text>
            <line x1="95" y1="63" x2="115" y2="63" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="115,63 110,60 110,66" fill="#94a3b8" />

            <rect x="120" y="45" width="55" height="36" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="147" y="68" fill="#e2e8f0" fontSize="11" textAnchor="middle">B</text>
            <line x1="175" y1="63" x2="195" y2="63" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="195,63 190,60 190,66" fill="#94a3b8" />
            <text x="210" y="68" fill="#64748b" fontSize="11">null</text>

            <text x="67" y="105" fill="#f59e0b" fontSize="10" textAnchor="middle">&uarr; first (O(1))</text>

            {/* Separator */}
            <line x1="250" y1="15" x2="250" y2="115" stroke="#334155" strokeDasharray="3 3" />

            {/* Queue side */}
            <text x="390" y="25" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Queue (Enqueue at last, Dequeue at first)</text>
            <rect x="290" y="45" width="55" height="36" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="317" y="68" fill="#e2e8f0" fontSize="11" textAnchor="middle">A</text>
            <line x1="345" y1="63" x2="365" y2="63" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="365,63 360,60 360,66" fill="#94a3b8" />

            <rect x="370" y="45" width="55" height="36" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="397" y="68" fill="#e2e8f0" fontSize="11" textAnchor="middle">B</text>
            <line x1="425" y1="63" x2="445" y2="63" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="445,63 440,60 440,66" fill="#94a3b8" />

            <rect x="450" y="45" width="55" height="36" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="477" y="68" fill="#e2e8f0" fontSize="11" textAnchor="middle">C</text>

            <text x="317" y="105" fill="#f59e0b" fontSize="10" textAnchor="middle">&uarr; first (Dequeue)</text>
            <text x="477" y="105" fill="#38bdf8" fontSize="10" textAnchor="middle">&uarr; last (Enqueue)</text>
          </svg>
        </div>
      );

    case 'sort-compare':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-teal-400 font-mono mb-2">
            <span>// So sánh Độ phức tạp & Tính Ổn định (Stability) 5 Thuật toán Sắp xếp Cơ bản</span>
          </div>
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="py-1 px-2">Thuật toán</th>
                <th className="py-1 px-2">Best</th>
                <th className="py-1 px-2">Average</th>
                <th className="py-1 px-2">Worst</th>
                <th className="py-1 px-2">Space</th>
                <th className="py-1 px-2 text-center">Stable?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr>
                <td className="py-1.5 px-2 font-bold text-blue-400">Selection Sort</td>
                <td className="py-1.5 px-2">~ N²/2</td>
                <td className="py-1.5 px-2">~ N²/2</td>
                <td className="py-1.5 px-2">~ N²/2</td>
                <td className="py-1.5 px-2">1 (In-place)</td>
                <td className="py-1.5 px-2 text-center text-rose-400 font-bold">Không (Swap xa)</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 font-bold text-emerald-400">Insertion Sort</td>
                <td className="py-1.5 px-2 text-emerald-300 font-bold">N - 1 (Đã sx)</td>
                <td className="py-1.5 px-2">~ N²/4</td>
                <td className="py-1.5 px-2">~ N²/2</td>
                <td className="py-1.5 px-2">1 (In-place)</td>
                <td className="py-1.5 px-2 text-center text-emerald-400 font-bold">Có (Ổn định)</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 font-bold text-amber-400">Shellsort (3x+1)</td>
                <td className="py-1.5 px-2">N log₃ N</td>
                <td className="py-1.5 px-2">O(N^(3/2))</td>
                <td className="py-1.5 px-2">c N^(3/2)</td>
                <td className="py-1.5 px-2">1 (In-place)</td>
                <td className="py-1.5 px-2 text-center text-rose-400 font-bold">Không (Nhảy h-bước)</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 font-bold text-purple-400">Mergesort</td>
                <td className="py-1.5 px-2">½ N lg N</td>
                <td className="py-1.5 px-2">N lg N</td>
                <td className="py-1.5 px-2">N lg N</td>
                <td className="py-1.5 px-2 text-amber-300">N (Mảng aux[])</td>
                <td className="py-1.5 px-2 text-center text-emerald-400 font-bold">Có (dùng &le;)</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 font-bold text-pink-400">Quicksort</td>
                <td className="py-1.5 px-2">N lg N</td>
                <td className="py-1.5 px-2">~ 1.39 N lg N</td>
                <td className="py-1.5 px-2 text-rose-400 font-bold">~ N²/2</td>
                <td className="py-1.5 px-2">lg N (Call stack)</td>
                <td className="py-1.5 px-2 text-center text-rose-400 font-bold">Không (Hoare swap)</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 'merge-tree':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-indigo-400 font-mono mb-2">
            <span>// Cây Đệ quy Mergesort: Chia Đôi (Divide) & Trộn 2 Mảng Con Đã Xếp (Conquer)</span>
            <span className="text-slate-400">Chi phí: C(N) &le; C(&lceil;N/2&rceil;) + C(&lfloor;N/2&rfloor;) + N</span>
          </div>
          <svg viewBox="0 0 540 140" className="w-full max-w-[540px] mx-auto h-auto">
            {/* Level 0: [E E G M R O R T] */}
            <rect x="180" y="10" width="180" height="26" rx="4" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
            <text x="270" y="27" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">sort(0, 7) - Size 8 (N)</text>

            {/* Split lines */}
            <line x1="220" y1="36" x2="130" y2="55" stroke="#818cf8" strokeWidth="1.5" />
            <line x1="320" y1="36" x2="410" y2="55" stroke="#818cf8" strokeWidth="1.5" />

            {/* Level 1: [E E G M] & [R O R T] */}
            <rect x="70" y="55" width="120" height="24" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
            <text x="130" y="71" fill="#e0e7ff" fontSize="10" textAnchor="middle">sort(0, 3) - N/2</text>

            <rect x="350" y="55" width="120" height="24" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
            <text x="410" y="71" fill="#e0e7ff" fontSize="10" textAnchor="middle">sort(4, 7) - N/2</text>

            {/* Level 2 leaf nodes hint */}
            <line x1="100" y1="79" x2="60" y2="98" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="160" y1="79" x2="200" y2="98" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="380" y1="79" x2="340" y2="98" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="440" y1="79" x2="480" y2="98" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2 2" />

            <text x="60" y="112" fill="#a5b4fc" fontSize="9" textAnchor="middle">[0,1]</text>
            <text x="200" y="112" fill="#a5b4fc" fontSize="9" textAnchor="middle">[2,3]</text>
            <text x="340" y="112" fill="#a5b4fc" fontSize="9" textAnchor="middle">[4,5]</text>
            <text x="480" y="112" fill="#a5b4fc" fontSize="9" textAnchor="middle">[6,7]</text>

            <text x="270" y="130" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
              lg N tầng &times; N so sánh mỗi tầng = N lg N so sánh
            </text>
          </svg>
        </div>
      );

    case 'partition-hoare':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-rose-400 font-mono mb-2">
            <span>// Cơ chế 2 Con trỏ Phân hoạch Quicksort (Hoare): Con trỏ i quét &rarr;, j quét &larr;</span>
            <span className="text-slate-400">Pivot v = a[lo]</span>
          </div>
          <svg viewBox="0 0 540 130" className="w-full max-w-[540px] mx-auto h-auto">
            {/* Array Cells: [K, C, A, T, E, M, P, R, X] */}
            {['K (v)', 'C', 'A', 'T', 'E', 'M', 'P', 'R', 'X'].map((val, idx) => {
              const isPivot = idx === 0;
              const isI = idx === 3; // 'T' >= 'K' -> stop
              const isJ = idx === 4; // 'E' <= 'K' -> stop
              return (
                <g key={idx} transform={`translate(${20 + idx * 56}, 30)`}>
                  <rect
                    width="50"
                    height="40"
                    rx="4"
                    fill={isPivot ? '#831843' : isI ? '#7f1d1d' : isJ ? '#064e3b' : '#1e293b'}
                    stroke={isPivot ? '#f43f5e' : isI ? '#ef4444' : isJ ? '#10b981' : '#475569'}
                    strokeWidth="1.5"
                  />
                  <text x="25" y="25" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                    {val}
                  </text>
                  {isPivot && <text x="25" y="-6" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">lo (pivot)</text>}
                  {isI && <text x="25" y="55" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">&uarr; i (lớn hơn v)</text>}
                  {isJ && <text x="25" y="55" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">&uarr; j (nhỏ hơn v)</text>}
                </g>
              );
            })}
            <text x="270" y="115" fill="#fbbf24" fontSize="11" textAnchor="middle">
              Dừng lại: a[i] &ge; v và a[j] &le; v. Khi i &lt; j: swap(a, i, j). Khi i &ge; j: swap(a, lo, j) đưa pivot về đúng vị trí!
            </text>
          </svg>
        </div>
      );

    case 'heap-array':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
            <span>// Ánh xạ Cây Nhị phân Hoàn chỉnh vào Mảng 1-based (Binary Heap)</span>
            <span className="text-slate-400">Parent(k) = &lfloor;k/2&rfloor;, Children = 2k, 2k+1</span>
          </div>
          <svg viewBox="0 0 540 140" className="w-full max-w-[540px] mx-auto h-auto">
            {/* Tree nodes */}
            <circle cx="270" cy="25" r="15" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
            <text x="270" y="29" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">T (1)</text>

            <line x1="258" y1="36" x2="160" y2="58" stroke="#d97706" strokeWidth="1.5" />
            <line x1="282" y1="36" x2="380" y2="58" stroke="#d97706" strokeWidth="1.5" />

            <circle cx="160" cy="65" r="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="160" y="69" fill="#f8fafc" fontSize="10" textAnchor="middle">S (2)</text>

            <circle cx="380" cy="65" r="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="380" y="69" fill="#f8fafc" fontSize="10" textAnchor="middle">R (3)</text>

            <line x1="150" y1="76" x2="110" y2="95" stroke="#94a3b8" strokeWidth="1" />
            <line x1="170" y1="76" x2="210" y2="95" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="110" cy="100" r="12" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />
            <text x="110" y="103" fill="#cbd5e1" fontSize="9" textAnchor="middle">P(4)</text>
            <circle cx="210" cy="100" r="12" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />
            <text x="210" y="103" fill="#cbd5e1" fontSize="9" textAnchor="middle">N(5)</text>

            {/* Array indexing at bottom */}
            <rect x="290" y="92" width="230" height="36" rx="4" fill="#0f172a" stroke="#334155" />
            <text x="300" y="107" fill="#64748b" fontSize="10" fontFamily="monospace">idx: [0]  [1]  [2]  [3]  [4]  [5]</text>
            <text x="300" y="122" fill="#fbbf24" fontSize="11" fontFamily="monospace">val:  -    T    S    R    P    N</text>
          </svg>
        </div>
      );

    case 'bst-hibbard':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-mono mb-2">
            <span>// Xóa Nút có 2 con trong BST (Hibbard Deletion 1962): Kế thừa bởi Successor min(t.right)</span>
          </div>
          <svg viewBox="0 0 540 140" className="w-full max-w-[540px] mx-auto h-auto">
            {/* Target node to delete: E */}
            <circle cx="180" cy="35" r="18" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
            <text x="180" y="39" fill="#ffe4e6" fontSize="11" fontWeight="bold" textAnchor="middle">E (xóa)</text>

            <line x1="166" y1="46" x2="120" y2="80" stroke="#64748b" strokeWidth="1.5" />
            <line x1="194" y1="46" x2="240" y2="80" stroke="#64748b" strokeWidth="1.5" />

            <circle cx="120" cy="88" r="15" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <text x="120" y="92" fill="#cbd5e1" fontSize="10" textAnchor="middle">left &lt; E</text>

            <circle cx="240" cy="88" r="16" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="240" y="92" fill="#93c5fd" fontSize="10" textAnchor="middle">right &gt; E</text>

            <line x1="230" y1="100" x2="200" y2="120" stroke="#10b981" strokeWidth="2" />
            <circle cx="200" cy="122" r="13" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <text x="200" y="125" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">x = min</text>

            {/* Successor replacement arrow */}
            <path d="M 210 115 C 230 100, 220 50, 198 38" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 3" />
            <polygon points="198,38 206,42 201,47" fill="#10b981" />
            <text x="320" y="55" fill="#10b981" fontSize="11" fontWeight="bold">Bước 1: x = min(t.right)</text>
            <text x="320" y="75" fill="#cbd5e1" fontSize="11">Bước 2: x.right = deleteMin(t.right)</text>
            <text x="320" y="95" fill="#cbd5e1" fontSize="11">Bước 3: x.left = t.left</text>
            <text x="320" y="118" fill="#f59e0b" fontSize="10" fontStyle="italic">Cảnh báo: Hibbard deletion làm cây lệch dần về O(&radic;N)</text>
          </svg>
        </div>
      );

    case 'avl-rotations':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-purple-400 font-mono mb-2">
            <span>// 4 Trường hợp Xoay Cân bằng AVL: Balance Factor BF = h(left) - h(right) &isin; &#123;-1, 0, 1&#125;</span>
          </div>
          <svg viewBox="0 0 540 140" className="w-full max-w-[540px] mx-auto h-auto">
            {/* LL Case -> Rotate Right */}
            <g transform="translate(10, 10)">
              <text x="90" y="14" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Trường hợp LL &rarr; Xoay phải (rotateRight)</text>
              <line x1="120" y1="35" x2="80" y2="60" stroke="#c084fc" strokeWidth="2" />
              <line x1="80" y1="75" x2="50" y2="100" stroke="#c084fc" strokeWidth="2" />

              <circle cx="120" cy="30" r="14" fill="#581c87" stroke="#c084fc" strokeWidth="2" />
              <text x="120" y="34" fill="#f3e8ff" fontSize="10" textAnchor="middle">3 (BF=+2)</text>

              <circle cx="80" cy="70" r="14" fill="#3b0764" stroke="#c084fc" strokeWidth="2" />
              <text x="80" y="74" fill="#f3e8ff" fontSize="10" textAnchor="middle">2 (BF=+1)</text>

              <circle cx="50" cy="110" r="12" fill="#1e1b4b" stroke="#e9d5ff" strokeWidth="1.5" />
              <text x="50" y="113" fill="#e9d5ff" fontSize="9" textAnchor="middle">1</text>

              {/* Arrow to Balanced */}
              <path d="M 140 70 L 175 70" stroke="#34d399" strokeWidth="2" />
              <polygon points="175,70 168,66 168,74" fill="#34d399" />
            </g>

            {/* Balanced Result */}
            <g transform="translate(200, 10)">
              <text x="70" y="14" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Sau Xoay Phải (Cân bằng)</text>
              <line x1="70" y1="45" x2="35" y2="80" stroke="#34d399" strokeWidth="2" />
              <line x1="70" y1="45" x2="105" y2="80" stroke="#34d399" strokeWidth="2" />

              <circle cx="70" cy="40" r="15" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
              <text x="70" y="44" fill="#ecfdf5" fontSize="11" fontWeight="bold" textAnchor="middle">2 (Gốc)</text>

              <circle cx="35" cy="85" r="13" fill="#1e293b" stroke="#6ee7b7" strokeWidth="1.5" />
              <text x="35" y="89" fill="#ecfdf5" fontSize="10" textAnchor="middle">1</text>

              <circle cx="105" cy="85" r="13" fill="#1e293b" stroke="#6ee7b7" strokeWidth="1.5" />
              <text x="105" y="89" fill="#ecfdf5" fontSize="10" textAnchor="middle">3</text>
            </g>

            {/* Summary notes */}
            <rect x="350" y="20" width="180" height="105" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="360" y="40" fill="#cbd5e1" fontSize="10" fontWeight="bold">4 Quy tắc Vàng:</text>
            <text x="360" y="58" fill="#c084fc" fontSize="9">&bull; LL: Xoay phải nút gốc lỗi</text>
            <text x="360" y="74" fill="#c084fc" fontSize="9">&bull; RR: Xoay trái nút gốc lỗi</text>
            <text x="360" y="90" fill="#f59e0b" fontSize="9">&bull; LR: Xoay trái con trái &rarr; Xoay phải</text>
            <text x="360" y="106" fill="#f59e0b" fontSize="9">&bull; RL: Xoay phải con phải &rarr; Xoay trái</text>
          </svg>
        </div>
      );

    case 'hash-clustering':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-yellow-400 font-mono mb-2">
            <span>// Bảng Băm: Linear Probing (Dò tuyến tính & Cụm sơ cấp) vs Separate Chaining (Danh sách liên kết)</span>
            <span className="text-slate-400">Hệ số tải &alpha; = N / M</span>
          </div>
          <svg viewBox="0 0 540 130" className="w-full max-w-[540px] mx-auto h-auto">
            {/* Linear Probing array showing clustering */}
            <text x="20" y="25" fill="#f59e0b" fontSize="11" fontWeight="bold">Linear Probing (Khuyên dùng &alpha; &le; ½):</text>
            {['P', 'Q', 'R', 'S', 'T', 'null', 'null', 'A', 'null'].map((val, idx) => {
              const isCluster = idx < 5;
              return (
                <g key={idx} transform={`translate(${20 + idx * 56}, 35)`}>
                  <rect
                    width="50"
                    height="32"
                    rx="4"
                    fill={isCluster ? '#78350f' : val === 'null' ? '#0f172a' : '#1e293b'}
                    stroke={isCluster ? '#f59e0b' : '#475569'}
                    strokeWidth="1.5"
                  />
                  <text x="25" y="20" fill={val === 'null' ? '#64748b' : '#f8fafc'} fontSize="11" textAnchor="middle">
                    {val}
                  </text>
                  <text x="25" y="45" fill="#64748b" fontSize="9" textAnchor="middle">[{idx}]</text>
                </g>
              );
            })}
            <text x="270" y="100" fill="#f87171" fontSize="10" textAnchor="middle">
              Cụm sơ cấp (Primary Clustering): Các ô liên tiếp bị lấp đầy làm tăng mạnh chi phí dò tìm trung bình!
            </text>
            <text x="270" y="118" fill="#38bdf8" fontSize="10" textAnchor="middle">
              Separate Chaining: M danh sách con độc lập, độ dài trung bình &alpha; = N/M &le; 5.
            </text>
          </svg>
        </div>
      );

    case 'graph-bfs-layers':
      return (
        <div className="my-3 p-4 rounded-xl bg-slate-900/90 text-white border border-slate-700/60 overflow-x-auto">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-mono mb-2">
            <span>// Duyệt Đồ thị BFS: Loang theo Từng Lớp Đồng Tâm & Tìm Đường Đi Ngắn Nhất (Số Cạnh Ít Nhất)</span>
            <span className="text-slate-400">Cơ chế Hàng đợi (Queue FIFO)</span>
          </div>
          <svg viewBox="0 0 540 130" className="w-full max-w-[540px] mx-auto h-auto">
            {/* Ripple Circles */}
            <circle cx="100" cy="65" r="20" fill="#065f46" stroke="#10b981" strokeWidth="2" />
            <text x="100" y="69" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">s (d=0)</text>

            <path d="M 120 65 L 190 40" stroke="#34d399" strokeWidth="2" />
            <path d="M 120 65 L 190 90" stroke="#34d399" strokeWidth="2" />

            {/* Layer 1 */}
            <circle cx="210" cy="35" r="16" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
            <text x="210" y="39" fill="#e2e8f0" fontSize="10" textAnchor="middle">v (d=1)</text>

            <circle cx="210" cy="95" r="16" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
            <text x="210" y="99" fill="#e2e8f0" fontSize="10" textAnchor="middle">w (d=1)</text>

            <path d="M 226 35 L 310 35" stroke="#6ee7b7" strokeWidth="1.5" />
            <path d="M 226 95 L 310 95" stroke="#6ee7b7" strokeWidth="1.5" />

            {/* Layer 2 */}
            <circle cx="330" cy="35" r="16" fill="#0f172a" stroke="#6ee7b7" strokeWidth="1.5" />
            <text x="330" y="39" fill="#cbd5e1" fontSize="10" textAnchor="middle">x (d=2)</text>

            <circle cx="330" cy="95" r="16" fill="#0f172a" stroke="#6ee7b7" strokeWidth="1.5" />
            <text x="330" y="99" fill="#cbd5e1" fontSize="10" textAnchor="middle">y (d=2)</text>

            {/* Explanation box */}
            <rect x="380" y="20" width="150" height="90" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="390" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold">Mảng Con Trỏ edgeTo[]:</text>
            <text x="390" y="62" fill="#cbd5e1" fontSize="10">edgeTo[v] = s</text>
            <text x="390" y="80" fill="#cbd5e1" fontSize="10">edgeTo[x] = v</text>
            <text x="390" y="98" fill="#10b981" fontSize="10">Truy vết ngược: x &larr; v &larr; s</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};

export const SlideReviewView: React.FC<SlideReviewViewProps> = ({ onNavigate, midtermOnly = false }) => {
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeWeek, setCopiedCodeWeek] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResult, setShowQuizResult] = useState<Record<number, boolean>>({});

  const displayedWeeks = useMemo(() => {
    if (!midtermOnly) return SLIDE_WEEKS_DATA;
    return SLIDE_WEEKS_DATA.filter((w) => w.isMidterm !== false);
  }, [midtermOnly]);

  useEffect(() => {
    if (displayedWeeks.length > 0 && !displayedWeeks.some((w) => w.weekNumber === selectedWeekNum)) {
      setSelectedWeekNum(displayedWeeks[0].weekNumber);
    }
  }, [displayedWeeks, selectedWeekNum]);

  const selectedWeek = useMemo(() => {
    const found = displayedWeeks.find((w) => w.weekNumber === selectedWeekNum);
    return found || displayedWeeks[0];
  }, [displayedWeeks, selectedWeekNum]);

  // Global search across displayed weeks
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    const hits: Array<{ week: WeekSlideData; concept: SlideConcept }> = [];

    displayedWeeks.forEach((w) => {
      w.concepts.forEach((c) => {
        if (
          c.name.toLowerCase().includes(q) ||
          c.intuition.toLowerCase().includes(q) ||
          c.formulaOrRule.toLowerCase().includes(q) ||
          c.explanation.toLowerCase().includes(q) ||
          w.title.toLowerCase().includes(q)
        ) {
          hits.push({ week: w, concept: c });
        }
      });
    });
    return hits;
  }, [displayedWeeks, searchQuery]);

  const handleCopyCode = (weekNum: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeWeek(weekNum);
    setTimeout(() => setCopiedCodeWeek(null), 2000);
  };

  const handleSelectQuizOption = (weekNum: number, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [weekNum]: optIdx }));
    setShowQuizResult((prev) => ({ ...prev, [weekNum]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 sm:p-8 text-white border border-slate-700/60 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              <span>GIÁO TRÌNH CHUẨN SLIDE UET & ALGS4 SEDGEWICK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Cẩm Nang Slide Bài Giảng Từng Tuần
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tổng hợp 12 tuần học cốt lõi phục vụ ôn thi giữa kỳ & cuối kỳ môn Cấu trúc dữ liệu và Giải thuật (INT2210).
              Được diễn giải với trực giác thực tế ("kèm 1-1"), công thức toán học bất biến, code mẫu thi giấy, bẫy trừ điểm và bài tập kiểm tra tức thì.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-row md:flex-col gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
              <div className="text-xs text-slate-400">Tổng tài liệu</div>
              <div className="text-lg font-bold text-sky-400 font-mono">11+ Tuần / 600+ Trang</div>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
              <div className="text-xs text-slate-400">Chuẩn đầu ra</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">100% Bao Đề Thi</div>
            </div>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="mt-6 relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tra cứu nhanh khái niệm: 'hibbard', 'path compression', '64-bit', 'inversion', 'dijkstra'..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
            >
              Xóa tìm kiếm
            </button>
          )}
        </div>
      </div>

      {/* SEARCH RESULTS VIEW (if search active) */}
      {searchResults ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-[#4b4f56] dark:text-slate-300">
            <span>
              Tìm thấy <strong className="text-blue-600 dark:text-blue-400">{searchResults.length}</strong> kết quả cho "{searchQuery}":
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-blue-600 dark:text-blue-400 underline hover:opacity-80"
            >
              Quay lại danh mục theo tuần
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {searchResults.map(({ week, concept }) => (
              <div
                key={concept.id}
                className="p-5 rounded-2xl border border-[#dcdcd4] dark:border-[#242b38] bg-white dark:bg-[#12161f] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      Tuần {week.weekNumber}
                    </span>
                    <span className="text-xs text-[#646970] dark:text-slate-400">{week.title}</span>
                  </div>
                  {concept.badge && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                      {concept.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#14171a] dark:text-white">{concept.name}</h3>

                <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                  <div className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    Trực giác cốt lõi:
                  </div>
                  <p className="text-xs text-blue-950 dark:text-blue-100 leading-relaxed">{concept.intuition}</p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                  <div className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    Bất biến toán học & Công thức:
                  </div>
                  <p className="text-xs text-amber-950 dark:text-amber-100 font-mono leading-relaxed">{concept.formulaOrRule}</p>
                </div>

                <p className="text-xs text-[#4b4f56] dark:text-slate-300 leading-relaxed">{concept.explanation}</p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedWeekNum(week.weekNumber);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Xem chi tiết Tuần {week.weekNumber} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* NORMAL WEEK-BY-WEEK VIEW */
        <div className="space-y-6">
          {/* Week Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {displayedWeeks.map((w) => {
              const active = selectedWeekNum === w.weekNumber;
              return (
                <button
                  key={w.weekNumber}
                  onClick={() => setSelectedWeekNum(w.weekNumber)}
                  className={`shrink-0 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 border ${
                    active
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm font-semibold'
                      : 'bg-white dark:bg-[#151922] text-[#4b4f56] dark:text-slate-300 border-[#dcdcd4] dark:border-[#242b38] hover:border-blue-400'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {w.weekNumber}
                  </span>
                  <span>{w.weekNumber <= 11 ? `Tuần ${w.weekNumber}` : 'Nâng cao'}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${active ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    {w.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Week Hero Card */}
          <div className="p-6 rounded-2xl border border-[#dcdcd4] dark:border-[#242b38] bg-white dark:bg-[#12161f] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e3e3dc] dark:border-[#1e2533]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    Tuần {selectedWeek.weekNumber}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Slide gốc: {selectedWeek.slideFileName} ({selectedWeek.slidePageCount} trang)
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#14171a] dark:text-white">
                  {selectedWeek.title}
                </h2>
                <p className="text-xs text-[#646970] dark:text-slate-400 mt-0.5">{selectedWeek.subtitle}</p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                  Thi: {selectedWeek.examWeight}
                </span>
                {selectedWeek.linkedAlgoId && (
                  <button
                    onClick={() => onNavigate('codelab', selectedWeek.linkedAlgoId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Luyện Code ngay</span>
                  </button>
                )}
              </div>
            </div>

            <div className="text-xs sm:text-sm text-[#33383f] dark:text-slate-300 leading-relaxed bg-[#f8f9fa] dark:bg-[#171c26] p-4 rounded-xl border border-[#e9ecef] dark:border-[#222938]">
              <strong className="text-blue-700 dark:text-blue-400">Tóm tắt tuần: </strong>
              {selectedWeek.summary}
            </div>

            {/* Concepts Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#14171a] dark:text-white">
                <BookmarkCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Các Khái Niệm Cốt Lõi Cần Nắm Chắc</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {selectedWeek.concepts.map((concept, idx) => (
                  <div
                    key={concept.id}
                    className="p-5 rounded-xl border border-[#e3e3dc] dark:border-[#202735] bg-[#fafaf8] dark:bg-[#151a24] space-y-3 transition-shadow hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-mono font-bold">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-[#14171a] dark:text-white">{concept.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {concept.tag}
                        </span>
                        {concept.badge && (
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              concept.badge === 'Trọng tâm thi'
                                ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                                : concept.badge === 'Dễ mất điểm'
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                                : concept.badge === 'Ăn điểm 10'
                                ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                                : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                            }`}
                          >
                            {concept.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Intuition Box */}
                    <div className="p-3.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40">
                      <div className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Trực giác & Bản chất đời thường:</span>
                      </div>
                      <p className="text-xs text-blue-950 dark:text-blue-100 leading-relaxed">
                        {concept.intuition}
                      </p>
                    </div>

                    {/* Mathematical Formula / Invariant Rule Box */}
                    <div className="p-3.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
                      <div className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>Bất biến toán học & Quy tắc thi giấy:</span>
                      </div>
                      <p className="text-xs text-amber-950 dark:text-amber-100 font-mono leading-relaxed">
                        {concept.formulaOrRule}
                      </p>
                    </div>

                    {/* Technical In-depth Explanation */}
                    <div className="text-xs text-[#374151] dark:text-slate-300 leading-relaxed pl-2 border-l-2 border-slate-300 dark:border-slate-700">
                      {concept.explanation}
                    </div>

                    {/* Visual Diagram if available */}
                    {concept.visualType && (
                      <VisualDiagram type={concept.visualType} conceptName={concept.name} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Java Code Highlight Box */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[#14171a] dark:text-white">
                  <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Code Java Chuẩn Slide & Thi Giấy ({selectedWeek.javaCodeHighlight.title})</span>
                </div>
                <button
                  onClick={() => handleCopyCode(selectedWeek.weekNumber, selectedWeek.javaCodeHighlight.code)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {copiedCodeWeek === selectedWeek.weekNumber ? (
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

              <p className="text-xs text-[#4b4f56] dark:text-slate-400">
                {selectedWeek.javaCodeHighlight.description}
              </p>

              <div className="rounded-xl overflow-hidden border border-[#dcdcd4] dark:border-[#242b38] bg-[#0c1017] p-4 text-xs font-mono">
                <JavaCodeBlock code={selectedWeek.javaCodeHighlight.code} />
              </div>
            </div>

            {/* Exam Traps & Teacher Gotchas */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Cạm Bẫy Trừ Điểm Từ Thầy Cô UET</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedWeek.examTraps.map((trap, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-2"
                  >
                    <div className="text-xs font-bold text-rose-900 dark:text-rose-300 flex items-start gap-1.5">
                      <span className="shrink-0 text-rose-600 font-mono">#{idx + 1}</span>
                      <span>{trap.trapTitle}</span>
                    </div>
                    <p className="text-xs text-rose-950 dark:text-rose-100 leading-relaxed">
                      {trap.trapDetail}
                    </p>
                    <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 bg-white/70 dark:bg-black/30 p-2 rounded-lg border border-emerald-200/50 dark:border-emerald-800/40">
                      <strong>Cách phòng tránh: </strong>
                      {trap.howToAvoid}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Quick-Check Quiz */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-4 h-4" />
                <span>Kiểm Tra Nhanh Độ Hiểu Tuần {selectedWeek.weekNumber}</span>
              </div>

              <div className="p-5 rounded-xl border border-indigo-200/60 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-indigo-950 dark:text-indigo-200">
                  {selectedWeek.quickCheck.question}
                </p>

                <div className="space-y-2">
                  {selectedWeek.quickCheck.options.map((opt, optIdx) => {
                    const answered = showQuizResult[selectedWeek.weekNumber];
                    const selected = quizAnswers[selectedWeek.weekNumber] === optIdx;
                    const isCorrect = optIdx === selectedWeek.quickCheck.correctIndex;

                    let btnStyle = 'bg-white dark:bg-[#181d28] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400';
                    if (answered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (selected) {
                        btnStyle = 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={answered}
                        onClick={() => handleSelectQuizOption(selectedWeek.weekNumber, optIdx)}
                        className={`w-full text-left p-3 rounded-lg text-xs font-mono border transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {showQuizResult[selectedWeek.weekNumber] && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-white/80 dark:bg-[#121620] border border-indigo-300 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed"
                  >
                    <strong className="text-indigo-700 dark:text-indigo-400">Giải thích chi tiết: </strong>
                    {selectedWeek.quickCheck.explanation}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
