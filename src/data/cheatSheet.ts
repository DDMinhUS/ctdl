export interface RoadmapPhase {
  id: string;
  phase: string;
  duration: string;
  goal: string;
  tasks: {
    id: string;
    title: string;
    detail: string;
    tag: 'Bắt buộc' | 'Trọng tâm' | 'Ăn điểm 9-10đ';
    linkedTab?: 'codelab' | 'quiz' | 'cheatsheet';
    linkedAlgoId?: string;
  }[];
}

export const SPRINT_ROADMAP: RoadmapPhase[] = [
  {
    id: 'phase-1',
    phase: 'Chặng 1 (45 phút đầu): Khôi phục trí nhớ Java viết giấy',
    duration: '00:00 – 00:45',
    goal: 'Nhớ lại toàn bộ cú pháp Java cơ bản xuất hiện trong đề thi algs4 để không mất điểm ngớ ngẩn.',
    tasks: [
      {
        id: 't1-1',
        title: 'Nắm 6 mẫu câu lệnh Java sống còn',
        detail: 'Mảng (new int[N]), Node (class lồng), Generics (<Item>), Comparable (compareTo), Vòng lặp for-each, Toán tử ++i / i++.',
        tag: 'Bắt buộc',
        linkedTab: 'cheatsheet',
      },
      {
        id: 't1-2',
        title: 'Thuộc QuickFind & WeightedQuickUnionUF',
        detail: 'Hai đoạn code ngắn nhất đề thi. Chú ý biến tạm pid/qid trong QuickFind và mảng sz[] trong WeightedQuickUnion.',
        tag: 'Bắt buộc',
        linkedTab: 'codelab',
        linkedAlgoId: 'weighted-quick-union',
      },
      {
        id: 't1-3',
        title: 'Thuộc Stack & Queue (Linked List)',
        detail: 'Rất hay ra bài đổi ngược Queue bằng 1 Stack (Câu 2 đề 2024-2025) và thao tác con trỏ first/last.',
        tag: 'Bắt buộc',
        linkedTab: 'codelab',
        linkedAlgoId: 'linked-queue',
      },
    ],
  },
  {
    id: 'phase-2',
    phase: 'Chặng 2 (90 phút): Sắp xếp, Đếm độ phức tạp & Heap',
    duration: '00:45 – 02:15',
    goal: 'Ăn trọn 5-6 điểm phần Sorting, đếm truy nhập mảng (~) và mô phỏng Binary Heap.',
    tasks: [
      {
        id: 't2-1',
        title: 'Thuộc bảng Độ phức tạp & Tính ổn định (Stable)',
        detail: 'Selection, Insertion, Mergesort, Quicksort, Heapsort — biết rõ Best/Avg/Worst và Stable/In-place.',
        tag: 'Bắt buộc',
        linkedTab: 'cheatsheet',
      },
      {
        id: 't2-2',
        title: 'Code & đếm truy nhập mảng hàm merge() của Mergesort',
        detail: 'Đề 2024-2025 Câu 1 hỏi chính xác số lần truy nhập mảng của merge (~4N đến ~6N)!',
        tag: 'Bắt buộc',
        linkedTab: 'codelab',
        linkedAlgoId: 'mergesort',
      },
      {
        id: 't2-3',
        title: 'Code Quicksort Partition (Hoare) & Quickselect',
        detail: 'Nhớ thứ tự ++i, --j, kiểm tra i >= j trước exch, cuối cùng đổi a[lo] với a[j].',
        tag: 'Trọng tâm',
        linkedTab: 'codelab',
        linkedAlgoId: 'quicksort',
      },
      {
        id: 't2-4',
        title: 'Thuần thục Max-Heap swim() / sink() & Mô phỏng tay',
        detail: 'Luyện vẽ bước thêm 10 và delMax trên [9, 8, 7, 2, 4, 3] bằng Simulator.',
        tag: 'Bắt buộc',
        linkedTab: 'codelab',
        linkedAlgoId: 'max-pq',
      },
    ],
  },
  {
    id: 'phase-3',
    phase: 'Chặng 3 (90 phút): BST, Cây Cân Bằng (AVL/LLRB) & Bảng băm',
    duration: '02:15 – 03:45',
    goal: 'Chắc tay câu vẽ cây, xoay cây cân bằng và điền bảng băm mod M.',
    tasks: [
      {
        id: 't3-1',
        title: 'Thuộc BST get / put / Hibbard delete',
        detail: 'Nhớ cách đệ quy gán ngược `x.left = put(...)` và thay nút 2 con bằng `min(t.right)`.',
        tag: 'Bắt buộc',
        linkedTab: 'codelab',
        linkedAlgoId: 'bst',
      },
      {
        id: 't3-2',
        title: 'Thành thạo 4 phép xoay AVL (LL, RR, LR, RL) & 3 dòng LLRB',
        detail: 'Thử chạy dãy 80 20 40 30 10 100 70 90 50 trên AVL Simulator để thấy từng bước xoay!',
        tag: 'Bắt buộc',
        linkedTab: 'codelab',
        linkedAlgoId: 'avl-tree',
      },
      {
        id: 't3-3',
        title: 'Bảng băm Separate Chaining vs Linear Probing',
        detail: 'Nhớ `(key.hashCode() & 0x7fffffff) % M`, cách dò `(i+1)%M` và giải thích primary clustering.',
        tag: 'Bắt buộc',
        linkedTab: 'codelab',
        linkedAlgoId: 'hash-tables',
      },
    ],
  },
  {
    id: 'phase-4',
    phase: 'Chặng 4 (60 phút cuối): Đồ thị DFS/BFS & Thi thử Đề Tự Luận',
    duration: '03:45 – 04:45',
    goal: 'Xử lý gọn bài mô hình hóa đồ thị (Câu 7-8) và các câu thiết kế cấu trúc dữ liệu 9-10 điểm.',
    tasks: [
      {
        id: 't4-1',
        title: 'Code Graph + DFS + BFS (nhớ marked trước enqueue)',
        detail: 'Biết khi nào chọn BFS (đường đi ngắn nhất ít cạnh nhất) vs DFS (kiểm tra liên thông, chu trình).',
        tag: 'Bắt buộc',
        linkedTab: 'codelab',
        linkedAlgoId: 'graph-dfs-bfs',
      },
      {
        id: 't4-2',
        title: 'Làm trọn bộ Quiz Trắc nghiệm Bẫy & Tự luận AI chấm',
        detail: 'Làm toàn bộ 12 câu bẫy COS226 + 7 câu Tự luận chuẩn đề UET, để Gemini chấm và chỉ chỗ mất điểm.',
        tag: 'Ăn điểm 9-10đ',
        linkedTab: 'quiz',
      },
    ],
  },
];

export const JAVA_CRASH_COURSE = [
  {
    syntax: 'public class TenLop<Item>',
    meaning: 'Khai báo lớp công khai có tham số kiểu `<Item>` (Generics), giúp dùng chung cho String, Integer, Double...',
    examTip: 'Khi thi giấy dùng `Item` hoặc `Key extends Comparable<Key>` cho thấy bạn nắm chuẩn algs4.',
  },
  {
    syntax: 'int[] a = new int[N];',
    meaning: 'Khởi tạo mảng số nguyên kích thước N (chỉ số chạy từ 0 đến N-1, độ dài lấy bằng `a.length`).',
    examTip: 'Java dùng `a.length` (không có ngoặc `()`), còn String dùng `s.length()` (có ngoặc `()`).',
  },
  {
    syntax: 'v.compareTo(w) < 0',
    meaning: 'So sánh hai đối tượng `Comparable`: trả về số âm nếu `v < w`, 0 nếu `v == w`, dương nếu `v > w`.',
    examTip: 'Tuyệt đối KHÔNG viết `a[i] < a[j]` nếu mảng có kiểu `Comparable[]`! Hoặc viết hàm `less(v, w)` cho gọn.',
  },
  {
    syntax: 'keys[i].equals(key)',
    meaning: 'So sánh nội dung hai đối tượng (ví dụ 2 String) trong Java.',
    examTip: 'Toán tử `==` trên String/Object chỉ so sánh địa chỉ bộ nhớ; luôn dùng `.equals()` khi so sánh khóa ở Bảng băm!',
  },
  {
    syntax: 'private class Node { Item item; Node next; }',
    meaning: 'Khai báo cấu trúc 1 nút danh sách liên kết. Con trỏ trong Java chính là biến tham chiếu đối tượng.',
    examTip: 'Mặc định tham chiếu chưa gán sẽ là `null`. Phải kiểm tra `x != null` trước khi gọi `x.next` hay `x.left`.',
  },
  {
    syntax: 'a[j++] vs a[++j]',
    meaning: '`j++` dùng giá trị cũ của `j` rồi mới tăng 1; `++j` tăng `j` lên 1 rồi mới lấy giá trị mới.',
    examTip: 'Mergesort dùng `aux[j++]` (hậu tố); Quicksort partition & MaxPQ insert dùng `++i`, `++N` (tiền tố).',
  },
  {
    syntax: 'for (int w : G.adj(v))',
    meaning: 'Vòng lặp for-each: lần lượt lấy từng đỉnh `w` nằm trong danh sách kề của đỉnh `v`.',
    examTip: 'Dùng thay cho `for (int i = 0; ...)` khi duyệt Bag/Iterable trong Graph, Stack, Queue.',
  },
  {
    syntax: 'Bag<Integer>[] adj = (Bag<Integer>[]) new Bag[V];',
    meaning: 'Tạo mảng gồm V danh sách kề. Java không cho viết `new Bag<Integer>[V]` trực tiếp nên phải ép kiểu.',
    examTip: 'Sau dòng này PHẢI chạy vòng `for (int v = 0; v < V; v++) adj[v] = new Bag<Integer>();` nếu không sẽ NullPointerException!',
  },
];

export const COMPLEXITY_TABLE = [
  { name: 'Quick-Find', best: 'Union: N', avg: 'Union: N', worst: 'Union: N (M ops: MN)', space: 'O(N)', stable: '—', note: 'Find O(1), quá chậm khi Union nhiều' },
  { name: 'Weighted Quick-Union', best: 'O(1)', avg: 'O(lg* N)', worst: 'O(lg N)', space: 'O(N)', stable: '—', note: 'Thêm Path Compression gần như O(1)' },
  { name: 'Stack / Queue (Linked)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(N)', stable: '—', note: 'Mỗi Node tốn ~40 bytes (64-bit)' },
  { name: 'Stack (Resizing Array)', best: 'O(1)', avg: 'O(1) amortized', worst: 'O(N) khi resize', space: 'O(N)', stable: '—', note: 'Nhân 2 khi đầy, giảm nửa khi còn 1/4' },
  { name: 'Selection Sort', best: '~N²/2', avg: '~N²/2', worst: '~N²/2', space: 'O(1)', stable: 'Không', note: 'Chỉ đúng N lần đổi chỗ; không nhạy đầu vào' },
  { name: 'Insertion Sort', best: 'N - 1', avg: '~N²/4', worst: '~N²/2', space: 'O(1)', stable: 'Có', note: 'Số lần đổi = số nghịch thế; tốt cho mảng gần sorted' },
  { name: 'Mergesort (Top-down / Bottom-up)', best: '~1/2 N lg N', avg: '~N lg N', worst: '~N lg N (~6N lg N access)', space: 'O(N)', stable: 'Có', note: 'Tối ưu mọi trường hợp nhưng tốn mảng phụ aux[]' },
  { name: 'Quicksort (Shuffle + Hoare)', best: '~N lg N', avg: '~1.39 N lg N', worst: '~N²/2', space: 'O(lg N)', stable: 'Không', note: 'Nhanh nhất thực tế; dùng 3-way nếu nhiều khóa trùng' },
  { name: 'Quickselect (Tìm phần tử thứ k)', best: 'O(N)', avg: '~2N (O(N))', worst: '~N²/2', space: 'O(1)', stable: 'Không', note: 'Chỉ đệ quy 1 phía chứa k -> tuyến tính trung bình!' },
  { name: 'Binary Heap (MaxPQ)', best: 'O(1)', avg: 'O(lg N)', worst: 'O(lg N)', space: 'O(N)', stable: '—', note: 'Build heap bottom-up chỉ mất O(N) (<= 2N compares)' },
  { name: 'Heapsort', best: 'O(N)', avg: '~2N lg N', worst: '~2N lg N', space: 'O(1)', stable: 'Không', note: 'Vừa O(N lg N) worst-case vừa In-place O(1)' },
  { name: 'BST (Cây tìm kiếm nhị phân)', best: 'O(lg N)', avg: '~1.39 lg N', worst: 'O(N)', space: 'O(N)', stable: '—', note: 'Suy biến thành danh sách nếu chèn theo thứ tự tăng/giảm' },
  { name: 'LLRB (Đỏ-Đen) & AVL Tree', best: 'O(lg N)', avg: 'O(lg N)', worst: 'O(lg N)', space: 'O(N)', stable: '—', note: 'LLRB h <= 2 lg N; AVL h <= 1.44 lg N' },
  { name: 'Hash Table (Chaining / Probing)', best: 'O(1)', avg: 'O(1) (3-5 probes)', worst: 'O(N)', space: 'O(N + M)', stable: '—', note: 'Không hỗ trợ các phép toán có thứ tự (min, floor, rank)' },
  { name: 'DFS / BFS (Danh sách kề)', best: 'O(V + E)', avg: 'O(V + E)', worst: 'O(V + E)', space: 'O(V + E)', stable: '—', note: 'BFS tìm đường ngắn nhất theo số cạnh; DFS tìm chu trình/CC' },
];

export interface ExamPlaybookPattern {
  id: string;
  title: string;
  frequency: string;
  summary: string;
  steps: string[];
  exampleTrap: string;
}

export const EXAM_PLAYBOOK: ExamPlaybookPattern[] = [
  {
    id: 'pat-1',
    title: 'Dạng 1: Đếm số lần truy nhập mảng & Ký hiệu Tilde (~)',
    frequency: 'Rất cao (Câu 1 Đề 2024-2025)',
    summary: 'Đếm chính xác số lần đọc/ghi `a[...]` hoặc `aux[...]` trong đoạn code, tách riêng trường hợp tốt nhất và xấu nhất.',
    steps: [
      'Ghi rõ quy ước: mỗi lần đọc `a[k]` hoặc ghi `aux[k] = ...` tính là 1 truy nhập mảng (array access).',
      'Xét từng vòng lặp riêng biệt: tính số lần chạy và số truy nhập mỗi lần lặp.',
      'Với nhánh `if / else if`: nhớ tính Đánh giá ngắn mạch (nếu `if (i > mid)` đúng thì KHÔNG đụng vào mảng ở các `else if` dưới).',
      'Ký hiệu `~f(N)` giữ lại hệ số hằng của số hạng bậc cao nhất (ví dụ `~6N lg N`), còn `Θ(f(N))` / `O(f(N))` bỏ hằng số.',
    ],
    exampleTrap: 'Đề hỏi SỐ LẦN TRUY NHẬP MẢNG của `merge()` thì phải trả lời ~4N đến ~6N (hoặc Θ(N)), đừng trả lời nhầm sang N lg N (đó là cả hàm Mergesort!).',
  },
  {
    id: 'pat-2',
    title: 'Dạng 2: Mô phỏng tay (Trace) — Heap, BST, AVL, Hash Table',
    frequency: 'Chắc chắn có 3-4 câu (3-5 điểm)',
    summary: 'Đề cho một dãy số và yêu cầu vẽ từng bước thêm/xóa trên Heap, BST, Cây cân bằng, hoặc Bảng băm.',
    steps: [
      'Max-Heap: Đánh số mảng từ 1! `insert` luôn gắn cuối rồi `swim`; `delMax` luôn đưa cuối lên gốc 1 rồi `sink` (luôn chọn con LỚN HƠN).',
      'BST thường: Số đầu là gốc, cứ nhỏ rẽ trái, lớn rẽ phải. Vẽ rõ từng nhánh trái/phải tránh nhầm vị trí.',
      'AVL Tree: Sau mỗi lần thêm, tính `bf = h(left) - h(right)` từ dưới lên. Gặp `|bf| = 2` thì xác định 1 trong 4 ca (LL -> R, RR -> L, LR -> L rồi R, RL -> R rồi L) và vẽ lại cây ngay sau khi xoay!',
      'Hash Table `h(x) = x mod M`: Kẻ bảng đủ M ô `0..M-1`. Separate Chaining vẽ mũi tên nối danh sách; Linear Probing cứ đụng là dò `(i+1)%M` tới ô trống đầu tiên.',
    ],
    exampleTrap: 'Ở Câu 4b đề UET: đề yêu cầu "vẽ các tình trạng trung gian để thấy các công đoạn xoay chỉnh cho cân bằng". Đừng chỉ vẽ mỗi cây cuối cùng — mất nửa số điểm!',
  },
  {
    id: 'pat-3',
    title: 'Dạng 3: Đúng / Sai bẫy lý thuyết (COS226 Midterm)',
    frequency: 'Hay gặp ở kiểm tra giữa kỳ (3-4 điểm)',
    summary: 'Các câu phát biểu tinh vi kiểm tra bản chất bất biến (invariant), cận dưới, và trường hợp biên.',
    steps: [
      'Cẩn thận từ khóa "worst-case" vs "average-case": Hash Table chỉ O(1) average, worst-case là O(N)! Quicksort không shuffle worst-case là O(N²)!',
      'Cẩn thận Heap: chỉ cha >= con, KHÔNG so sánh được hai nút khác nhánh dù ở độ sâu khác nhau.',
      'Cẩn thận Resizing Array: double = 8 bytes, int = 4 bytes; bộ nhớ xấu nhất xảy ra NGAY TRƯỚC LÚC thu gọn.',
      'Cẩn thận Lower bound Ω(N log N): chỉ đúng với sắp xếp dựa trên so sánh và các khóa phân biệt (nếu chỉ có 4 giá trị khóa -> làm được O(N)!).',
    ],
    exampleTrap: 'Luôn tự tìm 1 phản ví dụ nhỏ (N=3, N=4 hoặc mảng chỉ có 2 giá trị) trước khi kết luận Đúng!',
  },
  {
    id: 'pat-4',
    title: 'Dạng 4: Thiết kế thuật toán / Cấu trúc dữ liệu đạt chuẩn O(...)',
    frequency: 'Câu phân loại 8-10 điểm (COS226 + Câu 6 UET)',
    summary: 'Cho yêu cầu ràng buộc thời gian/bộ nhớ cụ thể (như Tìm hạng k, UniStack, Tournament, Mảng 0-1, Mảng núi).',
    steps: [
      'Nếu đề cho tập giá trị cực nhỏ (vd điểm thi 0.0 -> 30.0 bước 0.1 = 301 giá trị) -> nghĩ ngay Counting Sort O(N)!',
      'Nếu đề tìm phần tử nhỏ/lớn thứ k trên mảng bất kỳ -> Quickselect (kèm shuffle) O(N) trung bình!',
      'Nếu đề tìm điểm chuyển tiếp trong mảng đơn điệu / 0-1 / cam-đen trong O(log N) -> Binary Search cải biên!',
      'Nếu đề đòi nhiều thao tác (insert + getScore + getLeader) đều O(log N) worst-case -> Kết hợp 2 cấu trúc dữ liệu đồng bộ nhau (RedBlackBST + MaxPQ / IndexMaxPQ hoặc 2 RedBlackBST)!',
    ],
    exampleTrap: 'Khi đề đòi "O(log n) worst-case", tránh dùng HashMap nếu có thể thay bằng Red-Black BST (`TreeMap`), vì HashMap lý thuyết có worst-case O(N)!',
  },
  {
    id: 'pat-5',
    title: 'Dạng 5: Mô hình hóa bài toán thực tế về Đồ thị (DFS / BFS)',
    frequency: 'Câu chốt điểm cao (Câu 7-8 Đề 2024-2025)',
    summary: 'Chuyển bài toán lời văn (đảo quốc, mê cung, mạng lưới, tô màu ảnh) sang Đỉnh, Cạnh, và chọn thuật toán duyệt.',
    steps: [
      'Bước 1 (Mô hình hóa): Nêu rõ "Đỉnh biểu diễn cái gì?", "Cạnh biểu diễn cái gì?", có hướng hay vô hướng, có trọng số hay không?',
      'Bước 2 (Chọn thuật toán): Không trọng số + đường đi ngắn nhất -> BFS (`Queue`). Kiểm tra liên thông / chu trình / thành phần liên thông -> DFS. Có trọng số dương -> Dijkstra (nếu học tới).',
      'Bước 3 (Multi-source BFS/Dijkstra): Nếu xuất phát từ nhiều đỉnh nguồn M (Câu 8!), đẩy TẤT CẢ M đỉnh nguồn vào Queue/PQ ngay từ đầu với dist=0 (hoặc nối 1 đỉnh ảo trọng số 0 tới M đỉnh)!',
      'Bước 4 (Độ phức tạp & Trace): Ghi rõ O(V + E) với danh sách kề và minh họa từng lớp duyệt của Queue.',
    ],
    exampleTrap: 'Luôn trình bày đủ 5 phần khi làm bài đồ thị trên giấy: (1) Mô hình hóa, (2) CTDL dùng (adj[], Queue, marked[], edgeTo[]), (3) Mã giả/Java, (4) Minh họa ví dụ, (5) Độ phức tạp!',
  },
];
