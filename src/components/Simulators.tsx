import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

type SimKind = 'heap' | 'avl' | 'hash' | 'graph';

/* ---------------- 1. MAX HEAP SIMULATOR ---------------- */
interface HeapStep {
  arr: number[];
  msg: string;
  highlight: number[];
}

function buildHeapInsertSteps(initial: number[], val: number): HeapStep[] {
  const a = [0, ...initial];
  const steps: HeapStep[] = [{ arr: a.slice(1), msg: `Ban đầu (1-based): [${a.slice(1).join(', ')}]`, highlight: [] }];
  a.push(val);
  let k = a.length - 1;
  steps.push({ arr: a.slice(1), msg: `Chèn ${val} vào cuối tại vị trí k = ${k}`, highlight: [k - 1] });
  while (k > 1 && a[Math.floor(k / 2)] < a[k]) {
    const p = Math.floor(k / 2);
    const tmp = a[k];
    a[k] = a[p];
    a[p] = tmp;
    steps.push({
      arr: a.slice(1),
      msg: `swim(${k}): ${a[p]} > cha ${a[k]} (tại ${p}) -> Đổi chỗ vị trí ${k} và ${p}`,
      highlight: [p - 1, k - 1],
    });
    k = p;
  }
  steps.push({ arr: a.slice(1), msg: `Hoàn tất insert(${val})! Max-Heap hợp lệ.`, highlight: [k - 1] });
  return steps;
}

function buildHeapDelMaxSteps(initial: number[]): HeapStep[] {
  if (initial.length === 0) return [{ arr: [], msg: 'Heap rỗng.', highlight: [] }];
  const a = [0, ...initial];
  const steps: HeapStep[] = [{ arr: a.slice(1), msg: `Ban đầu: [${a.slice(1).join(', ')}]`, highlight: [0] }];
  const maxVal = a[1];
  const n = a.length - 1;
  if (n === 1) {
    return [...steps, { arr: [], msg: `Xóa phần tử duy nhất ${maxVal}. Heap rỗng.`, highlight: [] }];
  }
  a[1] = a[n];
  a.pop();
  const newN = a.length - 1;
  steps.push({
    arr: a.slice(1),
    msg: `Lấy max = ${maxVal}, đưa phần tử cuối (${a[1]}) lên gốc 1`,
    highlight: [0],
  });
  let k = 1;
  while (2 * k <= newN) {
    let j = 2 * k;
    if (j < newN && a[j] < a[j + 1]) j++;
    if (a[k] >= a[j]) {
      steps.push({
        arr: a.slice(1),
        msg: `sink(${k}): ${a[k]} >= con lớn hơn ${a[j]} (tại ${j}) -> Dừng!`,
        highlight: [k - 1],
      });
      break;
    }
    const tmp = a[k];
    a[k] = a[j];
    a[j] = tmp;
    steps.push({
      arr: a.slice(1),
      msg: `sink(${k}): ${a[j]} < con lớn hơn ${a[k]} (tại ${j}) -> Đổi chỗ vị trí ${k} và ${j}`,
      highlight: [k - 1, j - 1],
    });
    k = j;
  }
  steps.push({ arr: a.slice(1), msg: `Hoàn tất delMax() (đã xóa ${maxVal}).`, highlight: [] });
  return steps;
}

function HeapTreeSvg({ arr, highlight }: { arr: number[]; highlight: number[] }) {
  if (arr.length === 0) {
    return <div className="py-8 text-center text-sm text-neutral-500 dark:text-slate-400">Heap rỗng</div>;
  }
  const coords = arr.map((_, idx) => {
    const k = idx + 1;
    const level = Math.floor(Math.log2(k));
    const levelStart = Math.pow(2, level);
    const posInLevel = k - levelStart;
    const totalInLevel = levelStart;
    const x = ((posInLevel + 0.5) / totalInLevel) * 520;
    const y = 34 + level * 62;
    return { x, y, k };
  });

  return (
    <svg viewBox="0 0 520 230" className="w-full max-w-[540px] mx-auto">
      {coords.map((c, idx) => {
        if (idx === 0) return null;
        const pIdx = Math.floor(c.k / 2) - 1;
        const p = coords[pIdx];
        return (
          <line
            key={`e-${idx}`}
            x1={p.x}
            y1={p.y}
            x2={c.x}
            y2={c.y}
            className="stroke-slate-300 dark:stroke-slate-600"
            strokeWidth="2"
          />
        );
      })}
      {coords.map((c, idx) => {
        const active = highlight.includes(idx);
        return (
          <motion.g
            key={`n-${idx}`}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: active ? 1.08 : 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <circle
              cx={c.x}
              cy={c.y}
              r={18}
              className={
                active
                  ? 'fill-[#1d4ed8] stroke-[#1d4ed8] dark:fill-blue-500 dark:stroke-blue-400'
                  : 'fill-white stroke-slate-700 dark:fill-[#1b202c] dark:stroke-slate-400'
              }
              strokeWidth="2"
            />
            <text
              x={c.x}
              y={c.y + 4}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              className={active ? 'fill-white' : 'fill-slate-900 dark:fill-slate-100'}
            >
              {arr[idx]}
            </text>
            <text x={c.x} y={c.y - 22} textAnchor="middle" fontSize="10" className="fill-slate-500 dark:fill-slate-400">
              [{c.k}]
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ---------------- 2. BST & AVL TREE SIMULATOR ---------------- */
interface TreeNode {
  key: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height: number;
}

const h = (n: TreeNode | null): number => (n ? n.height : 0);
const bf = (n: TreeNode | null): number => (n ? h(n.left) - h(n.right) : 0);
const cloneNode = (n: TreeNode | null): TreeNode | null =>
  n ? { key: n.key, height: n.height, left: cloneNode(n.left), right: cloneNode(n.right) } : null;

function updateH(n: TreeNode): TreeNode {
  return { ...n, height: 1 + Math.max(h(n.left), h(n.right)) };
}

function rotRight(y: TreeNode): TreeNode {
  const x = y.left!;
  const T2 = x.right;
  const newY = updateH({ ...y, left: T2 });
  return updateH({ ...x, right: newY });
}

function rotLeft(x: TreeNode): TreeNode {
  const y = x.right!;
  const T2 = y.left;
  const newX = updateH({ ...x, right: T2 });
  return updateH({ ...y, left: newX });
}

interface TreeStep {
  tree: TreeNode | null;
  msg: string;
  inserted?: number;
}

function insertBst(root: TreeNode | null, key: number): TreeNode {
  if (!root) return { key, left: null, right: null, height: 1 };
  if (key < root.key) return updateH({ ...root, left: insertBst(root.left, key) });
  if (key > root.key) return updateH({ ...root, right: insertBst(root.right, key) });
  return root;
}

function insertAvlWithLogs(
  node: TreeNode | null,
  key: number,
  logs: string[]
): TreeNode {
  if (!node) return { key, left: null, right: null, height: 1 };
  let next = { ...node };
  if (key < node.key) next.left = insertAvlWithLogs(node.left, key, logs);
  else if (key > node.key) next.right = insertAvlWithLogs(node.right, key, logs);
  else return next;

  next = updateH(next);
  const balance = bf(next);

  if (balance > 1 && bf(next.left) >= 0) {
    logs.push(`Mất cân bằng tại ${next.key} (bf=+${balance}) -> LL: Xoay phải tại ${next.key}`);
    return rotRight(next);
  }
  if (balance > 1 && bf(next.left) < 0) {
    logs.push(`Mất cân bằng tại ${next.key} (bf=+${balance}) -> LR: Xoay trái tại ${next.left!.key}, rồi Xoay phải tại ${next.key}`);
    next.left = rotLeft(next.left!);
    return rotRight(next);
  }
  if (balance < -1 && bf(next.right) <= 0) {
    logs.push(`Mất cân bằng tại ${next.key} (bf=${balance}) -> RR: Xoay trái tại ${next.key}`);
    return rotLeft(next);
  }
  if (balance < -1 && bf(next.right) > 0) {
    logs.push(`Mất cân bằng tại ${next.key} (bf=${balance}) -> RL: Xoay phải tại ${next.right!.key}, rồi Xoay trái tại ${next.key}`);
    next.right = rotRight(next.right!);
    return rotLeft(next);
  }
  return next;
}

function TreeSvg({ root, highlightKey }: { root: TreeNode | null; highlightKey?: number }) {
  if (!root) {
    return <div className="py-10 text-center text-sm text-neutral-500 dark:text-slate-400">Cây rỗng</div>;
  }
  const nodes: Array<{ key: number; x: number; y: number; px?: number; py?: number; b: number; h: number }> = [];
  let order = 0;

  function assignInorder(n: TreeNode | null): Map<TreeNode, number> {
    const map = new Map<TreeNode, number>();
    function walk(curr: TreeNode | null) {
      if (!curr) return;
      walk(curr.left);
      map.set(curr, order++);
      walk(curr.right);
    }
    walk(n);
    return map;
  }

  const xMap = assignInorder(root);
  const total = Math.max(1, order);

  function collect(n: TreeNode | null, depth: number, px?: number, py?: number) {
    if (!n) return;
    const idx = xMap.get(n) || 0;
    const x = 35 + ((idx + 0.5) / total) * 530;
    const y = 34 + depth * 56;
    nodes.push({ key: n.key, x, y, px, py, b: bf(n), h: n.height });
    collect(n.left, depth + 1, x, y);
    collect(n.right, depth + 1, x, y);
  }
  collect(root, 0);
  const maxY = Math.max(...nodes.map((n) => n.y)) + 40;

  return (
    <svg viewBox={`0 0 600 ${Math.max(200, maxY)}`} className="w-full max-w-[640px] mx-auto">
      {nodes.map((n, i) =>
        n.px !== undefined && n.py !== undefined ? (
          <motion.line
            key={`l-${n.key}-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x1: n.px, y1: n.py, x2: n.x, y2: n.y }}
            transition={{ duration: 0.25 }}
            className="stroke-slate-300 dark:stroke-slate-600"
            strokeWidth="2"
          />
        ) : null
      )}
      {nodes.map((n) => {
        const active = n.key === highlightKey;
        return (
          <motion.g
            key={n.key}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, x: n.x, y: n.y }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <circle
              cx={0}
              cy={0}
              r={17}
              className={
                active
                  ? 'fill-[#0f766e] stroke-[#0f766e] dark:fill-teal-500 dark:stroke-teal-400'
                  : 'fill-white stroke-slate-700 dark:fill-[#1b202c] dark:stroke-slate-400'
              }
              strokeWidth="2"
            />
            <text
              x={0}
              y={4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              className={active ? 'fill-white' : 'fill-slate-900 dark:fill-slate-100'}
            >
              {n.key}
            </text>
            <text x={0} y={29} textAnchor="middle" fontSize="9.5" className="fill-slate-500 dark:fill-slate-400">
              bf:{n.b > 0 ? `+${n.b}` : n.b}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ---------------- MAIN SIMULATOR SWITCHER ---------------- */
export const Simulators: React.FC = () => {
  const [sim, setSim] = useState<SimKind>('avl');

  const [heapInitStr, setHeapInitStr] = useState('9, 8, 7, 2, 4, 3');
  const [heapInsertVal, setHeapInsertVal] = useState('10');
  const [heapSteps, setHeapSteps] = useState<HeapStep[]>(() =>
    buildHeapInsertSteps([9, 8, 7, 2, 4, 3], 10)
  );
  const [heapIdx, setHeapIdx] = useState(0);

  const parseNums = (s: string) =>
    s
      .split(/[\s,]+/)
      .map((v) => parseInt(v, 10))
      .filter((n) => !Number.isNaN(n));

  const runHeapInsert = () => {
    const arr = parseNums(heapInitStr);
    const val = parseInt(heapInsertVal, 10);
    if (Number.isNaN(val)) return;
    setHeapSteps(buildHeapInsertSteps(arr, val));
    setHeapIdx(0);
  };

  const runHeapDelMax = () => {
    const arr = parseNums(heapInitStr);
    setHeapSteps(buildHeapDelMaxSteps(arr));
    setHeapIdx(0);
  };

  const [treeSeqStr, setTreeSeqStr] = useState('80, 20, 40, 30, 10, 100, 70, 90, 50');
  const [treeMode, setTreeMode] = useState<'avl' | 'bst'>('avl');
  const [treeIdx, setTreeIdx] = useState(9);

  const treeSteps = useMemo<TreeStep[]>(() => {
    const keys = parseNums(treeSeqStr);
    const steps: TreeStep[] = [{ tree: null, msg: 'Cây rỗng ban đầu' }];
    let root: TreeNode | null = null;
    for (const k of keys) {
      if (treeMode === 'bst') {
        root = insertBst(root, k);
        steps.push({ tree: cloneNode(root), msg: `Chèn ${k} vào BST thường`, inserted: k });
      } else {
        const logs: string[] = [];
        root = insertAvlWithLogs(root, k, logs);
        steps.push({
          tree: cloneNode(root),
          msg: logs.length > 0 ? `Chèn ${k}: ${logs.join(' | ')}` : `Chèn ${k} (cây giữ nguyên cân bằng)`,
          inserted: k,
        });
      }
    }
    return steps;
  }, [treeSeqStr, treeMode]);

  const safeTreeIdx = Math.min(treeIdx, treeSteps.length - 1);

  const [hashM, setHashM] = useState(11);
  const [hashKeysStr, setHashKeysStr] = useState('34, 45, 14, 11, 0, 28, 22, 78, 20, 5, 33');

  const hashResult = useMemo(() => {
    const M = Math.max(3, Math.min(23, hashM || 11));
    const keys = parseNums(hashKeysStr);
    const chaining: number[][] = Array.from({ length: M }, () => []);
    const probing: Array<number | null> = Array.from({ length: M }, () => null);
    const probeLog: Array<{ key: number; hash: number; placedAt: number | null; probes: number }> = [];

    for (const k of keys) {
      const hVal = ((k % M) + M) % M;
      chaining[hVal].push(k);

      let placedAt: number | null = null;
      let probes = 0;
      for (let step = 0; step < M; step++) {
        const idx = (hVal + step) % M;
        probes++;
        if (probing[idx] === null || probing[idx] === k) {
          probing[idx] = k;
          placedAt = idx;
          break;
        }
      }
      probeLog.push({ key: k, hash: hVal, placedAt, probes });
    }
    return { M, chaining, probing, probeLog };
  }, [hashM, hashKeysStr]);

  const [graphMode, setGraphMode] = useState<'bfs' | 'dfs'>('bfs');
  const [graphStepIdx, setGraphStepIdx] = useState(0);

  const graphSteps = useMemo(() => {
    const V = 6;
    const edges: Array<[number, number]> = [
      [0, 3], [0, 5], [1, 2], [1, 4], [1, 5],
      [2, 3], [2, 4], [3, 4], [3, 5], [4, 5],
    ];
    const adj: number[][] = Array.from({ length: V }, () => []);
    for (const [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
    }
    adj.forEach((list) => list.sort((a, b) => a - b));

    const marked = Array(V).fill(false);
    const edgeTo = Array(V).fill(-1);
    const distTo = Array(V).fill(-1);
    const steps: Array<{
      marked: boolean[];
      edgeTo: number[];
      distTo: number[];
      frontier: number[];
      current: number | null;
      msg: string;
    }> = [];

    if (graphMode === 'bfs') {
      const q: number[] = [0];
      marked[0] = true;
      distTo[0] = 0;
      steps.push({
        marked: [...marked],
        edgeTo: [...edgeTo],
        distTo: [...distTo],
        frontier: [...q],
        current: 0,
        msg: 'Khởi tạo BFS tại nguồn 0: marked[0]=true, distTo[0]=0, q=[0]',
      });
      while (q.length > 0) {
        const v = q.shift()!;
        const newlyAdded: number[] = [];
        for (const w of adj[v]) {
          if (!marked[w]) {
            marked[w] = true;
            edgeTo[w] = v;
            distTo[w] = distTo[v] + 1;
            q.push(w);
            newlyAdded.push(w);
          }
        }
        steps.push({
          marked: [...marked],
          edgeTo: [...edgeTo],
          distTo: [...distTo],
          frontier: [...q],
          current: v,
          msg: newlyAdded.length
            ? `Dequeue ${v}: phát hiện ${newlyAdded.join(', ')} (edgeTo=${v}, dist=${distTo[v] + 1}) -> enqueue`
            : `Dequeue ${v}: mọi đỉnh kề đều đã marked.`,
        });
      }
    } else {
      function dfs(v: number) {
        marked[v] = true;
        steps.push({
          marked: [...marked],
          edgeTo: [...edgeTo],
          distTo: [...distTo],
          frontier: [],
          current: v,
          msg: `Thăm DFS(${v}): đánh dấu marked[${v}]=true`,
        });
        for (const w of adj[v]) {
          if (!marked[w]) {
            edgeTo[w] = v;
            dfs(w);
          }
        }
      }
      dfs(0);
    }
    return { V, edges, steps };
  }, [graphMode]);

  const safeGraphIdx = Math.min(graphStepIdx, graphSteps.steps.length - 1);
  const curGraph = graphSteps.steps[safeGraphIdx];

  const nodePositions: Array<{ x: number; y: number }> = [
    { x: 90, y: 120 },
    { x: 350, y: 55 },
    { x: 350, y: 185 },
    { x: 215, y: 175 },
    { x: 280, y: 118 },
    { x: 215, y: 60 },
  ];

  return (
    <div className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#ecece6] dark:border-[#222834]">
        <div>
          <h3 className="text-base font-semibold text-[#14171a] dark:text-white">
            Bộ mô phỏng từng bước (Trace Simulator)
          </h3>
          <p className="text-xs text-[#646970] dark:text-slate-400">
            Nhập đúng dữ liệu trong đề thi để kiểm tra bài làm trên giấy
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 bg-[#f4f4f0] dark:bg-[#0e1117] p-1 rounded-lg border border-transparent dark:border-[#222834]">
          {(
            [
              ['avl', 'BST / AVL Tree'],
              ['heap', 'Max-Heap'],
              ['hash', 'Hash Table'],
              ['graph', 'Đồ thị BFS / DFS'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setSim(id)}
              className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                sim === id
                  ? 'text-[#14171a] dark:text-white'
                  : 'text-[#5c6168] dark:text-slate-400 hover:text-[#14171a] dark:hover:text-slate-200'
              }`}
            >
              {sim === id && (
                <motion.div
                  layoutId="simKindPill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 bg-white dark:bg-[#1d2330] rounded-md shadow-xs"
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {sim === 'heap' && (
        <div className="pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[#5c6168] dark:text-slate-400 mb-1">
                Mảng Max-Heap ban đầu (1-based)
              </label>
              <input
                value={heapInitStr}
                onChange={(e) => setHeapInitStr(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-[#dcdcd4] dark:border-[#2a3140] bg-white dark:bg-[#171b24] text-[#14171a] dark:text-slate-100 rounded-lg font-mono"
              />
            </div>
            <div className="flex gap-2 items-end">
              <div className="w-20">
                <label className="block text-xs font-medium text-[#5c6168] dark:text-slate-400 mb-1">Key mới</label>
                <input
                  value={heapInsertVal}
                  onChange={(e) => setHeapInsertVal(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-sm border border-[#dcdcd4] dark:border-[#2a3140] bg-white dark:bg-[#171b24] text-[#14171a] dark:text-slate-100 rounded-lg font-mono"
                />
              </div>
              <button
                onClick={runHeapInsert}
                className="px-3 py-1.5 bg-[#1d4ed8] hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Insert
              </button>
              <button
                onClick={runHeapDelMax}
                className="px-3 py-1.5 bg-[#14171a] dark:bg-slate-700 hover:bg-neutral-800 dark:hover:bg-slate-600 text-white text-xs font-medium rounded-lg transition-colors"
              >
                DelMax
              </button>
            </div>
          </div>

          <div className="bg-[#fafaf8] dark:bg-[#0e1117] border border-[#e7e7e1] dark:border-[#222834] rounded-lg p-4">
            <HeapTreeSvg arr={heapSteps[heapIdx]?.arr || []} highlight={heapSteps[heapIdx]?.highlight || []} />
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {(heapSteps[heapIdx]?.arr || []).map((v, i) => (
                <div
                  key={i}
                  className={`px-2.5 py-1 rounded border text-xs font-mono transition-colors ${
                    heapSteps[heapIdx]?.highlight.includes(i)
                      ? 'bg-[#1d4ed8] text-white border-[#1d4ed8]'
                      : 'bg-white dark:bg-[#171b24] text-[#14171a] dark:text-slate-100 border-[#dcdcd4] dark:border-[#2c3444]'
                  }`}
                >
                  <span className="opacity-60 mr-1">{i + 1}:</span>
                  {v}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 bg-[#f4f4f0] dark:bg-[#171b24] px-3.5 py-2.5 rounded-lg">
            <div className="text-xs font-medium text-[#14171a] dark:text-white">
              Bước {heapIdx + 1}/{heapSteps.length}:{' '}
              <span className="font-normal text-[#334155] dark:text-slate-300">{heapSteps[heapIdx]?.msg}</span>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => setHeapIdx((i) => Math.max(0, i - 1))}
                disabled={heapIdx === 0}
                className="p-1.5 rounded bg-white dark:bg-[#222834] border border-[#dcdcd4] dark:border-[#323a4a] disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setHeapIdx((i) => Math.min(heapSteps.length - 1, i + 1))}
                disabled={heapIdx >= heapSteps.length - 1}
                className="p-1.5 rounded bg-white dark:bg-[#222834] border border-[#dcdcd4] dark:border-[#323a4a] disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {sim === 'avl' && (
        <div className="pt-4 space-y-4">
          <div className="flex flex-wrap gap-3 items-end justify-between">
            <div className="flex-1 min-w-[240px]">
              <label className="block text-xs font-medium text-[#5c6168] dark:text-slate-400 mb-1">
                Dãy khóa thêm tuần tự (mặc định Câu 4 Đề 2024-2025)
              </label>
              <input
                value={treeSeqStr}
                onChange={(e) => {
                  setTreeSeqStr(e.target.value);
                  setTreeIdx(99);
                }}
                className="w-full px-3 py-1.5 text-sm border border-[#dcdcd4] dark:border-[#2a3140] bg-white dark:bg-[#171b24] text-[#14171a] dark:text-slate-100 rounded-lg font-mono"
              />
            </div>
            <div className="flex gap-1.5 bg-[#f4f4f0] dark:bg-[#0e1117] p-1 rounded-lg">
              <button
                onClick={() => setTreeMode('bst')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  treeMode === 'bst'
                    ? 'bg-white dark:bg-[#1d2330] text-[#14171a] dark:text-white shadow-xs'
                    : 'text-[#5c6168] dark:text-slate-400'
                }`}
              >
                BST thường
              </button>
              <button
                onClick={() => setTreeMode('avl')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  treeMode === 'avl'
                    ? 'bg-white dark:bg-[#1d2330] shadow-xs text-[#0f766e] dark:text-teal-400'
                    : 'text-[#5c6168] dark:text-slate-400'
                }`}
              >
                AVL cân bằng
              </button>
            </div>
          </div>

          <div className="bg-[#fafaf8] dark:bg-[#0e1117] border border-[#e7e7e1] dark:border-[#222834] rounded-lg p-3">
            <TreeSvg root={treeSteps[safeTreeIdx]?.tree || null} highlightKey={treeSteps[safeTreeIdx]?.inserted} />
          </div>

          <div className="flex items-center justify-between gap-3 bg-[#f4f4f0] dark:bg-[#171b24] px-3.5 py-2.5 rounded-lg">
            <div className="text-xs font-medium text-[#14171a] dark:text-white">
              Bước {safeTreeIdx}/{treeSteps.length - 1}:{' '}
              <span className="font-normal text-[#334155] dark:text-slate-300">{treeSteps[safeTreeIdx]?.msg}</span>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => setTreeIdx(0)}
                className="p-1.5 rounded bg-white dark:bg-[#222834] border border-[#dcdcd4] dark:border-[#323a4a]"
                title="Về đầu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTreeIdx((i) => Math.max(0, Math.min(i, treeSteps.length - 1) - 1))}
                disabled={safeTreeIdx === 0}
                className="p-1.5 rounded bg-white dark:bg-[#222834] border border-[#dcdcd4] dark:border-[#323a4a] disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTreeIdx((i) => Math.min(treeSteps.length - 1, i + 1))}
                disabled={safeTreeIdx >= treeSteps.length - 1}
                className="p-1.5 rounded bg-white dark:bg-[#222834] border border-[#dcdcd4] dark:border-[#323a4a] disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {sim === 'hash' && (
        <div className="pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#5c6168] dark:text-slate-400 mb-1">
                Kích thước bảng M
              </label>
              <input
                type="number"
                min={3}
                max={23}
                value={hashM}
                onChange={(e) => setHashM(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm border border-[#dcdcd4] dark:border-[#2a3140] bg-white dark:bg-[#171b24] text-[#14171a] dark:text-slate-100 rounded-lg font-mono"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-[#5c6168] dark:text-slate-400 mb-1">
                Chuỗi khóa (mặc định Câu 5 Đề 2024-2025)
              </label>
              <input
                value={hashKeysStr}
                onChange={(e) => setHashKeysStr(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-[#dcdcd4] dark:border-[#2a3140] bg-white dark:bg-[#171b24] text-[#14171a] dark:text-slate-100 rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-[#e3e3dc] dark:border-[#222834] rounded-lg p-3">
              <div className="text-xs font-semibold text-[#14171a] dark:text-white mb-2">
                a. Separate Chaining (Chuỗi tách biệt)
              </div>
              <div className="space-y-1.5">
                {hashResult.chaining.map((bucket, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                    <span className="w-7 text-right text-[#646970] dark:text-slate-400">[{idx}]</span>
                    <div className="flex-1 flex flex-wrap gap-1 min-h-[26px] items-center bg-[#fafaf8] dark:bg-[#0e1117] px-2 py-1 rounded border border-[#ecece6] dark:border-[#222834]">
                      {bucket.length === 0 ? (
                        <span className="text-neutral-400 dark:text-slate-600">null</span>
                      ) : (
                        bucket.map((val, j) => (
                          <React.Fragment key={j}>
                            <span className="px-1.5 py-0.5 bg-white dark:bg-[#1b202c] border border-[#dcdcd4] dark:border-[#2c3444] rounded text-[#14171a] dark:text-slate-100">
                              {val}
                            </span>
                            {j < bucket.length - 1 && <span className="text-neutral-400 dark:text-slate-500">→</span>}
                          </React.Fragment>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#e3e3dc] dark:border-[#222834] rounded-lg p-3">
              <div className="text-xs font-semibold text-[#14171a] dark:text-white mb-2">
                b. Linear Probing (Địa chỉ mở)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                {hashResult.probing.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-2.5 py-1.5 bg-[#fafaf8] dark:bg-[#0e1117] border border-[#e3e3dc] dark:border-[#222834] rounded text-xs font-mono"
                  >
                    <span className="text-[#646970] dark:text-slate-400">[{idx}]</span>
                    <span className={val !== null ? 'font-semibold text-[#1d4ed8] dark:text-blue-400' : 'text-neutral-400 dark:text-slate-600'}>
                      {val !== null ? val : '—'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-[#5c6168] dark:text-slate-300 bg-[#f4f4f0] dark:bg-[#171b24] p-2 rounded font-mono max-h-28 overflow-y-auto">
                {hashResult.probeLog.map((p, i) => (
                  <div key={i}>
                    {p.key} mod {hashResult.M} = {p.hash} → ô {p.placedAt ?? 'ĐẦY'} ({p.probes} probes)
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {sim === 'graph' && (
        <div className="pt-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-[#5c6168] dark:text-slate-400">
              Đồ thị ví dụ Đảo quốc X (N=6, nguồn 0 — Câu 7 Đề 2024-2025)
            </div>
            <div className="flex gap-1.5 bg-[#f4f4f0] dark:bg-[#0e1117] p-1 rounded-lg">
              <button
                onClick={() => {
                  setGraphMode('bfs');
                  setGraphStepIdx(0);
                }}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  graphMode === 'bfs'
                    ? 'bg-white dark:bg-[#1d2330] shadow-xs text-[#1d4ed8] dark:text-blue-400'
                    : 'text-[#5c6168] dark:text-slate-400'
                }`}
              >
                BFS (Đường ngắn nhất)
              </button>
              <button
                onClick={() => {
                  setGraphMode('dfs');
                  setGraphStepIdx(0);
                }}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  graphMode === 'dfs'
                    ? 'bg-white dark:bg-[#1d2330] shadow-xs text-[#0f766e] dark:text-teal-400'
                    : 'text-[#5c6168] dark:text-slate-400'
                }`}
              >
                DFS (Chiều sâu)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="bg-[#fafaf8] dark:bg-[#0e1117] border border-[#e7e7e1] dark:border-[#222834] rounded-lg p-3">
              <svg viewBox="0 0 430 235" className="w-full">
                {graphSteps.edges.map(([u, v], i) => {
                  const p1 = nodePositions[u];
                  const p2 = nodePositions[v];
                  const inTree = curGraph.edgeTo[v] === u || curGraph.edgeTo[u] === v;
                  return (
                    <line
                      key={i}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      className={
                        inTree ? 'stroke-[#1d4ed8] dark:stroke-blue-400' : 'stroke-slate-300 dark:stroke-slate-700'
                      }
                      strokeWidth={inTree ? 3 : 1.5}
                    />
                  );
                })}
                {nodePositions.map((pos, v) => {
                  const isCur = curGraph.current === v;
                  const isMarked = curGraph.marked[v];
                  return (
                    <motion.g
                      key={v}
                      animate={{ scale: isCur ? 1.1 : 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={19}
                        className={
                          isCur
                            ? 'fill-[#1d4ed8] stroke-[#1d4ed8] dark:fill-blue-500 dark:stroke-blue-400'
                            : isMarked
                            ? 'fill-blue-100 stroke-[#1d4ed8] dark:fill-blue-950 dark:stroke-blue-400'
                            : 'fill-white stroke-slate-600 dark:fill-[#1b202c] dark:stroke-slate-400'
                        }
                        strokeWidth="2"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 4}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="600"
                        className={isCur ? 'fill-white' : 'fill-slate-900 dark:fill-slate-100'}
                      >
                        {v}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="border border-[#e3e3dc] dark:border-[#222834] rounded-lg overflow-hidden">
                <table className="w-full text-left font-mono">
                  <thead className="bg-[#f4f4f0] dark:bg-[#171b24] text-[#5c6168] dark:text-slate-400">
                    <tr>
                      <th className="px-2.5 py-1.5">Đỉnh v</th>
                      <th className="px-2.5 py-1.5">marked</th>
                      <th className="px-2.5 py-1.5">edgeTo</th>
                      {graphMode === 'bfs' && <th className="px-2.5 py-1.5">distTo</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ecece6] dark:divide-[#1d222d]">
                    {Array.from({ length: 6 }, (_, v) => (
                      <tr
                        key={v}
                        className={curGraph.current === v ? 'bg-blue-50/70 dark:bg-blue-950/40' : ''}
                      >
                        <td className="px-2.5 py-1 font-semibold">{v}</td>
                        <td className="px-2.5 py-1">{curGraph.marked[v] ? 'true' : 'false'}</td>
                        <td className="px-2.5 py-1">{curGraph.edgeTo[v] === -1 ? '—' : curGraph.edgeTo[v]}</td>
                        {graphMode === 'bfs' && (
                          <td className="px-2.5 py-1">{curGraph.distTo[v] === -1 ? '∞' : curGraph.distTo[v]}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {graphMode === 'bfs' && (
                <div className="px-3 py-2 bg-[#fafaf8] dark:bg-[#171b24] border border-[#e3e3dc] dark:border-[#222834] rounded-lg font-mono text-[#334155] dark:text-slate-300">
                  Queue hiện tại: [{curGraph.frontier.join(', ')}]
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 bg-[#f4f4f0] dark:bg-[#171b24] px-3.5 py-2.5 rounded-lg">
            <div className="text-xs font-medium text-[#14171a] dark:text-white">
              Bước {safeGraphIdx + 1}/{graphSteps.steps.length}:{' '}
              <span className="font-normal text-[#334155] dark:text-slate-300">{curGraph.msg}</span>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => setGraphStepIdx((i) => Math.max(0, i - 1))}
                disabled={safeGraphIdx === 0}
                className="p-1.5 rounded bg-white dark:bg-[#222834] border border-[#dcdcd4] dark:border-[#323a4a] disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGraphStepIdx((i) => Math.min(graphSteps.steps.length - 1, i + 1))}
                disabled={safeGraphIdx >= graphSteps.steps.length - 1}
                className="p-1.5 rounded bg-white dark:bg-[#222834] border border-[#dcdcd4] dark:border-[#323a4a] disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
