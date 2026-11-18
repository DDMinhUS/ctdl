import { AlgorithmItem } from '../types';

export const ALGORITHMS_PART_2: AlgorithmItem[] = [
  {
    id: 'max-pq',
    title: 'Binary Heap MaxPQ (swim, sink, insert, delMax)',
    topic: 'Priority Queue & Heap',
    week: 'Tuần 7',
    priority: 'Bắt buộc',
    timeComplexity: 'insert: <= 1 + lg N | delMax: <= 2 lg N compares (O(lg N)) | max: O(1)',
    spaceComplexity: 'O(N) mảng pq[1..N] (bỏ qua chỉ số 0)',
    summary: 'Cây nhị phân hoàn chỉnh lưu trên mảng chỉ số từ 1: cha của k là k/2, hai con của k là 2k và 2k+1. Nút cha luôn >= hai nút con.',
    paperTips: [
      'Cực hay ra cả code lẫn vẽ trace (Câu 3 Đề 2024-2025!).',
      'Khi `insert(x)`: tăng `N` trước (`pq[++N] = x;`), rồi gọi `swim(N)`. Tối đa 1 + lg N phép so sánh.',
      'Khi `delMax()`: lấy `pq[1]`, đổi chỗ `exch(1, N--)`, xóa loitering `pq[N+1] = null`, rồi gọi `sink(1)`. Tối đa 2 lg N phép so sánh (mỗi tầng: 1 phép chọn con lớn hơn + 1 phép so với cha).',
      'Trong `sink(k)`: vòng lặp `while (2*k <= N)`: chọn con lớn hơn `int j = 2*k; if (j < N && less(j, j+1)) j++;`, nếu `!less(k, j)` thì `break;`!',
    ],
    javaIdioms: [
      { token: 'Key extends Comparable<Key>', meaning: 'Giới hạn kiểu tổng quát `Key` bắt buộc phải so sánh được với nhau.' },
      { token: 'pq = (Key[]) new Comparable[capacity + 1];', meaning: 'Ép kiểu mảng Comparable[] sang Key[] (vì Java không cho tạo `new Key[]` trực tiếp).' },
    ],
    starterCode: `public class MaxPQ<Key extends Comparable<Key>> {
    private Key[] pq;
    private int N = 0;

    public MaxPQ(int capacity) {
        pq = (Key[]) new Comparable[capacity + 1];
    }

    public boolean isEmpty() { return N == 0; }

    public void insert(Key x) {
        // Them vao cuoi va swim len
    }

    public Key delMax() {
        // Lay max, dua cuoi len dau, sink xuong
        return null;
    }

    private void swim(int k) {
        // Leo len khi k > 1 va cha < k
    }

    private void sink(int k) {
        // Chim xuong doi cho voi con lon hon
    }

    private boolean less(int i, int j) { return pq[i].compareTo(pq[j]) < 0; }
    private void exch(int i, int j) { Key t = pq[i]; pq[i] = pq[j]; pq[j] = t; }
}`,
    skeletonCode: `public class MaxPQ<Key extends Comparable<Key>> {
    private Key[] pq;
    private int N = 0;

    public MaxPQ(int capacity) {
        pq = (Key[]) new Comparable[capacity + 1];
    }

    public void insert(Key x) {
        pq[++N] = x;
        swim(___);
    }

    public Key delMax() {
        Key max = pq[1];
        exch(1, N--);
        sink(___);
        pq[N + 1] = null;
        return max;
    }

    private void swim(int k) {
        while (k > 1 && less(k / 2, k)) {
            exch(k, ___);
            k = ___;
        }
    }

    private void sink(int k) {
        while (2 * k <= N) {
            int j = 2 * k;
            if (j < N && less(j, ___)) j++;
            if (!less(k, j)) break;
            exch(k, j);
            k = j;
        }
    }

    private boolean less(int i, int j) { return pq[i].compareTo(pq[j]) < 0; }
    private void exch(int i, int j) { Key t = pq[i]; pq[i] = pq[j]; pq[j] = t; }
}`,
    modelCode: `public class MaxPQ<Key extends Comparable<Key>> {
    private Key[] pq;
    private int N = 0;

    public MaxPQ(int capacity) {
        pq = (Key[]) new Comparable[capacity + 1];
    }

    public boolean isEmpty() { return N == 0; }

    public void insert(Key x) {
        pq[++N] = x;
        swim(N);
    }

    public Key delMax() {
        Key max = pq[1];
        exch(1, N--);
        sink(1);
        pq[N + 1] = null;
        return max;
    }

    private void swim(int k) {
        while (k > 1 && less(k / 2, k)) {
            exch(k, k / 2);
            k = k / 2;
        }
    }

    private void sink(int k) {
        while (2 * k <= N) {
            int j = 2 * k;
            if (j < N && less(j, j + 1)) j++;
            if (!less(k, j)) break;
            exch(k, j);
            k = j;
        }
    }

    private boolean less(int i, int j) { return pq[i].compareTo(pq[j]) < 0; }
    private void exch(int i, int j) { Key t = pq[i]; pq[i] = pq[j]; pq[j] = t; }
}`,
    lineExplanations: [
      { lineRange: '11-14', snippet: 'pq[++N] = x; swim(N);', javaSyntax: 'Tăng kích thước N rồi gán vào vị trí cuối mảng.', algoRole: 'Nếu nút mới lớn hơn cha nó, bơi ngược lên để khôi phục Max-Heap.' },
      { lineRange: '16-22', snippet: 'Key max = pq[1]; exch(1, N--); sink(1); pq[N+1] = null;', javaSyntax: 'N-- giảm kích thước ngay sau khi truyền cho exch.', algoRole: 'Đưa nút cuối lên gốc, chìm xuống đúng tầng, rồi giải phóng ô dư.' },
      { lineRange: '24-29', snippet: 'while (k > 1 && less(k / 2, k))', javaSyntax: 'Chia nguyên `k / 2` ra chỉ số nút cha.', algoRole: 'Đổi chỗ với cha cho tới khi đạt gốc (k == 1) hoặc cha >= con.' },
      { lineRange: '31-38', snippet: 'if (j < N && less(j, j + 1)) j++;', javaSyntax: 'Kiểm tra `j < N` để chắc chắn con phải `j+1` có tồn tại.', algoRole: 'Luôn chọn con lớn hơn trong 2 con để hoán đổi với cha.' },
    ],
    rubricChecks: [
      { id: 'swim', label: 'Hàm swim(k) so sánh với k/2 và đi lên', patterns: ['k\\s*>\\s*1', 'k\\s*/\\s*2'], points: 3, hintIfMissing: 'swim lặp khi k > 1 && less(k/2, k), đổi k với k/2.' },
      { id: 'sink-child', label: 'Hàm sink(k) chọn con lớn hơn trong 2k và 2k+1', patterns: ['2\\s*\\*\\s*k\\s*<=\\s*N', 'j\\s*<\\s*N', 'j\\+\\+'], points: 3, hintIfMissing: 'Trong sink kiểm tra j < N && less(j, j+1) thì j++.' },
      { id: 'sink-stop', label: 'Dừng sink khi !less(k, j) và cập nhật k = j', patterns: ['!less\\s*\\(\\s*k\\s*,\\s*j\\s*\\)', 'k\\s*=\\s*j'], points: 2, hintIfMissing: 'Nếu cha >= con lớn nhất thì break; ngược lại exch(k, j) và k = j.' },
      { id: 'ops', label: 'insert(++N -> swim) và delMax(exch 1, N-- -> sink)', patterns: ['swim\\s*\\(\\s*N\\s*\\)', 'sink\\s*\\(\\s*1\\s*\\)'], points: 2, hintIfMissing: 'insert gọi swim(N); delMax đổi 1 với N-- rồi gọi sink(1).' },
    ],
  },
  {
    id: 'heapsort',
    title: 'Heapsort (Xây Heap bottom-up + Sortdown)',
    topic: 'Priority Queue & Heap',
    week: 'Tuần 7',
    priority: 'Trọng tâm',
    timeComplexity: 'Best: O(N) (~3N) | Avg/Worst: <= 2N lg N compares (Xây heap <= 2N)',
    spaceComplexity: 'O(1) in-place | Unstable',
    summary: 'Pha 1: Duyệt k từ N/2 về 1 gọi `sink` để biến mảng thành Max-Heap trong O(N). Pha 2: Đổi `pq[1]` với `pq[N--]` và `sink(pq, 1, N)` (quy ước 1-based) lặp lại đến N = 1.',
    paperTips: [
      'Vì đề hay dùng mảng 0-based `pq[0..N-1]` để sort, `algs4` viết `less(pq, i, j)` trừ đi 1 (`pq[i-1].compareTo(pq[j-1]) < 0`) hoặc dùng quy ước 1-based khi mô phỏng giấy.',
      'Nhớ công thức: Xây heap bottom-up chỉ tốn O(N) (tối đa 2N phép so sánh), KHÔNG phải O(N lg N)!',
    ],
    javaIdioms: [
      { token: 'for (int k = N / 2; k >= 1; k--)', meaning: 'Bắt đầu từ nút cha cuối cùng N/2 (bỏ qua toàn bộ nửa nút lá).' },
      { token: 'pq[i - 1]', meaning: 'Chuyển đổi chỉ số 1-based sang 0-based trong mảng Java.' },
    ],
    starterCode: `public class Heap {
    public static void sort(Comparable[] pq) {
        int N = pq.length;
        // Pha 1: Build Max-Heap tu k = N/2 ve 1
        // Pha 2: Sortdown doi 1 voi N-- roi sink
    }

    private static void sink(Comparable[] pq, int k, int N) {
        // Chim xuong theo chi so 1..N
    }

    private static boolean less(Comparable[] pq, int i, int j) {
        return pq[i - 1].compareTo(pq[j - 1]) < 0;
    }

    private static void exch(Comparable[] pq, int i, int j) {
        Comparable swap = pq[i - 1];
        pq[i - 1] = pq[j - 1];
        pq[j - 1] = swap;
    }
}`,
    skeletonCode: `public class Heap {
    public static void sort(Comparable[] pq) {
        int N = pq.length;
        for (int k = ___; k >= 1; k--)
            sink(pq, k, N);
        while (N > 1) {
            exch(pq, 1, ___);
            sink(pq, 1, ___);
        }
    }

    private static void sink(Comparable[] pq, int k, int N) {
        while (2 * k <= N) {
            int j = 2 * k;
            if (j < N && less(pq, j, j + 1)) j++;
            if (!less(pq, k, j)) break;
            exch(pq, k, j);
            k = j;
        }
    }

    private static boolean less(Comparable[] pq, int i, int j) {
        return pq[i - 1].compareTo(pq[j - 1]) < 0;
    }

    private static void exch(Comparable[] pq, int i, int j) {
        Comparable swap = pq[i - 1]; pq[i - 1] = pq[j - 1]; pq[j - 1] = swap;
    }
}`,
    modelCode: `public class Heap {
    public static void sort(Comparable[] pq) {
        int N = pq.length;
        for (int k = N / 2; k >= 1; k--)
            sink(pq, k, N);
        while (N > 1) {
            exch(pq, 1, N--);
            sink(pq, 1, N);
        }
    }

    private static void sink(Comparable[] pq, int k, int N) {
        while (2 * k <= N) {
            int j = 2 * k;
            if (j < N && less(pq, j, j + 1)) j++;
            if (!less(pq, k, j)) break;
            exch(pq, k, j);
            k = j;
        }
    }

    private static boolean less(Comparable[] pq, int i, int j) {
        return pq[i - 1].compareTo(pq[j - 1]) < 0;
    }

    private static void exch(Comparable[] pq, int i, int j) {
        Comparable swap = pq[i - 1];
        pq[i - 1] = pq[j - 1];
        pq[j - 1] = swap;
    }
}`,
    lineExplanations: [
      { lineRange: '4-5', snippet: 'for (int k = N / 2; k >= 1; k--) sink(pq, k, N);', javaSyntax: 'Lặp ngược từ N/2 về 1.', algoRole: 'Các nút > N/2 đều là lá (heap cỡ 1) nên không cần sink.' },
      { lineRange: '6-9', snippet: 'while (N > 1) { exch(pq, 1, N--); sink(pq, 1, N); }', javaSyntax: 'Giảm N ngay sau khi đưa phần tử lớn nhất về cuối.', algoRole: 'Đưa max về cuối mảng rồi thu hẹp heap để khôi phục đỉnh tiếp theo.' },
    ],
    rubricChecks: [
      { id: 'build', label: 'Pha 1 duyệt k từ N/2 về 1 gọi sink', patterns: ['N\\s*/\\s*2', 'k\\s*>=\\s*1', 'sink\\s*\\(\\s*pq\\s*,\\s*k\\s*,\\s*N\\s*\\)'], points: 4, hintIfMissing: 'Xây heap từ k = N/2 xuống 1.' },
      { id: 'sortdown', label: 'Pha 2 đổi 1 với N-- và sink(pq, 1, N)', patterns: ['N\\s*>\\s*1', 'exch\\s*\\(\\s*pq\\s*,\\s*1\\s*,\\s*N--\\s*\\)', 'sink\\s*\\(\\s*pq\\s*,\\s*1\\s*,\\s*N\\s*\\)'], points: 4, hintIfMissing: 'Lặp while (N > 1): exch(pq, 1, N--); sink(pq, 1, N);.' },
      { id: 'sink', label: 'Hàm sink đúng chuẩn heap', patterns: ['2\\s*\\*\\s*k\\s*<=\\s*N', 'exch\\s*\\(\\s*pq\\s*,\\s*k\\s*,\\s*j\\s*\\)'], points: 2, hintIfMissing: 'Cài sink chọn con lớn hơn và đổi chỗ nếu cha nhỏ hơn.' },
    ],
  },
  {
    id: 'bst',
    title: 'Binary Search Tree (BST: get, put, delete)',
    topic: 'BST',
    week: 'Tuần 9',
    priority: 'Bắt buộc',
    timeComplexity: 'Avg: ~1.39 lg N | Worst: O(N) (cây suy biến)',
    spaceComplexity: 'O(N) mỗi Node có left, right, count',
    summary: 'Mỗi nút có khóa lớn hơn mọi khóa cây con trái và nhỏ hơn mọi khóa cây con phải. Hàm đệ quy `put` trả về `Node` để nối lại liên kết cha-con.',
    paperTips: [
      'Kỹ thuật Hibbard Deletion (`delete(x, key)`): nếu nút cần xóa có 2 con, thay bằng nút nhỏ nhất bên cây con phải `x = min(t.right)`, nối `x.right = deleteMin(t.right)` và `x.left = t.left`.',
      'Khi vẽ cây BST kết quả từ dãy số (Câu 4a đề 2024-2025): phần tử đầu tiên là gốc, mỗi số mới đi xuống trái (<) hoặc phải (>) tới khi gặp null.',
      'Duyệt Inorder (trái -> gốc -> phải) trên BST luôn cho dãy TĂNG DẦN.',
    ],
    javaIdioms: [
      { token: 'private Node put(Node x, Key key, Value val)', meaning: 'Hàm đệ quy nội bộ nhận gốc cây con và trả về gốc mới sau khi chèn.' },
      { token: 'int cmp = key.compareTo(x.key);', meaning: 'Âm nếu key < x.key, dương nếu key > x.key, 0 nếu bằng.' },
    ],
    starterCode: `public class BST<Key extends Comparable<Key>, Value> {
    private Node root;

    private class Node {
        private Key key;
        private Value val;
        private Node left, right;
        private int count;
        public Node(Key key, Value val, int count) {
            this.key = key; this.val = val; this.count = count;
        }
    }

    public Value get(Key key) {
        // Tim kiem vong lap hoac de quy
        return null;
    }

    public void put(Key key, Value val) {
        root = put(root, key, val);
    }

    private Node put(Node x, Key key, Value val) {
        // Neu x == null tao Node moi, nguoc lai re trai/phai/cap nhat val & count
        return null;
    }

    public void delete(Key key) { root = delete(root, key); }

    private Node delete(Node x, Key key) {
        // Hibbard deletion: tim nut, xu ly 0/1 con va 2 con (min ben phai)
        return null;
    }
}`,
    skeletonCode: `public class BST<Key extends Comparable<Key>, Value> {
    private Node root;

    private class Node {
        private Key key; private Value val;
        private Node left, right; private int count;
        public Node(Key key, Value val, int count) {
            this.key = key; this.val = val; this.count = count;
        }
    }

    public int size() { return size(root); }
    private int size(Node x) { return x == null ? 0 : x.count; }

    public Value get(Key key) {
        Node x = root;
        while (x != null) {
            int cmp = key.compareTo(x.key);
            if      (cmp < 0) x = ___;
            else if (cmp > 0) x = ___;
            else              return x.val;
        }
        return null;
    }

    public void put(Key key, Value val) { root = put(root, key, val); }

    private Node put(Node x, Key key, Value val) {
        if (x == null) return new Node(key, val, 1);
        int cmp = key.compareTo(x.key);
        if      (cmp < 0) x.left  = put(x.left, key, val);
        else if (cmp > 0) x.right = put(x.right, key, val);
        else              x.val = val;
        x.count = 1 + size(x.left) + size(x.right);
        return ___;
    }

    private Node min(Node x) {
        if (x.left == null) return x;
        return min(x.left);
    }

    private Node deleteMin(Node x) {
        if (x.left == null) return x.right;
        x.left = deleteMin(x.left);
        x.count = 1 + size(x.left) + size(x.right);
        return x;
    }

    public void delete(Key key) { root = delete(root, key); }

    private Node delete(Node x, Key key) {
        if (x == null) return null;
        int cmp = key.compareTo(x.key);
        if      (cmp < 0) x.left  = delete(x.left, key);
        else if (cmp > 0) x.right = delete(x.right, key);
        else {
            if (x.right == null) return x.left;
            if (x.left == null)  return x.right;
            Node t = x;
            x = min(___);
            x.right = deleteMin(___);
            x.left = t.left;
        }
        x.count = 1 + size(x.left) + size(x.right);
        return x;
    }
}`,
    modelCode: `public class BST<Key extends Comparable<Key>, Value> {
    private Node root;

    private class Node {
        private Key key;
        private Value val;
        private Node left, right;
        private int count;
        public Node(Key key, Value val, int count) {
            this.key = key;
            this.val = val;
            this.count = count;
        }
    }

    public int size() { return size(root); }
    private int size(Node x) { return x == null ? 0 : x.count; }

    public Value get(Key key) {
        Node x = root;
        while (x != null) {
            int cmp = key.compareTo(x.key);
            if      (cmp < 0) x = x.left;
            else if (cmp > 0) x = x.right;
            else              return x.val;
        }
        return null;
    }

    public void put(Key key, Value val) {
        root = put(root, key, val);
    }

    private Node put(Node x, Key key, Value val) {
        if (x == null) return new Node(key, val, 1);
        int cmp = key.compareTo(x.key);
        if      (cmp < 0) x.left  = put(x.left, key, val);
        else if (cmp > 0) x.right = put(x.right, key, val);
        else              x.val = val;
        x.count = 1 + size(x.left) + size(x.right);
        return x;
    }

    private Node min(Node x) {
        if (x.left == null) return x;
        return min(x.left);
    }

    private Node deleteMin(Node x) {
        if (x.left == null) return x.right;
        x.left = deleteMin(x.left);
        x.count = 1 + size(x.left) + size(x.right);
        return x;
    }

    public void delete(Key key) {
        root = delete(root, key);
    }

    private Node delete(Node x, Key key) {
        if (x == null) return null;
        int cmp = key.compareTo(x.key);
        if      (cmp < 0) x.left  = delete(x.left, key);
        else if (cmp > 0) x.right = delete(x.right, key);
        else {
            if (x.right == null) return x.left;
            if (x.left == null)  return x.right;
            Node t = x;
            x = min(t.right);
            x.right = deleteMin(t.right);
            x.left = t.left;
        }
        x.count = 1 + size(x.left) + size(x.right);
        return x;
    }
}`,
    lineExplanations: [
      { lineRange: '17', snippet: 'return x == null ? 0 : x.count;', javaSyntax: 'Toán tử 3 ngôi `điều_kiện ? giá_trị_đúng : giá_trị_sai`.', algoRole: 'Tránh NullPointerException khi nút con rỗng.' },
      { lineRange: '34-41', snippet: 'if (x == null) return new Node(...); ... x.left = put(...); return x;', javaSyntax: 'Gán lại `x.left = put(...)` để nối nút mới tạo từ nhánh dưới lên cha.', algoRole: 'Vừa chèn đúng chỗ vừa cập nhật lại kích thước `count` trên đường quay lui.' },
      { lineRange: '65-72', snippet: 'Node t = x; x = min(t.right); x.right = deleteMin(t.right); x.left = t.left;', javaSyntax: 'Giữ lại tham chiếu cũ `t` trước khi gán lại `x`.', algoRole: 'Hibbard deletion: lấy phần tử kế vị nhỏ nhất bên phải thế chỗ cho nút bị xóa.' },
    ],
    rubricChecks: [
      { id: 'get', label: 'Hàm get dùng compareTo rẽ trái/phải', patterns: ['compareTo\\s*\\(\\s*x\\.key\\s*\\)', 'x\\s*=\\s*x\\.left', 'x\\s*=\\s*x\\.right'], points: 3, hintIfMissing: 'So sánh key.compareTo(x.key) để đi sang x.left hoặc x.right.' },
      { id: 'put', label: 'Hàm put tạo Node mới khi null và cập nhật count', patterns: ['new\\s+Node\\s*\\(', 'x\\.left\\s*=\\s*put', 'x\\.right\\s*=\\s*put'], points: 4, hintIfMissing: 'put đệ quy nhớ gán x.left = put(...) và return x.' },
      { id: 'delete', label: 'Hàm delete xử lý 1 con và 2 con (min(t.right))', patterns: ['x\\.right\\s*==\\s*null', 'min\\s*\\(\\s*t\\.right\\s*\\)', 'deleteMin\\s*\\(\\s*t\\.right\\s*\\)'], points: 3, hintIfMissing: 'Xử lý Hibbard: nếu có 2 con thì thay bằng min(t.right) và deleteMin(t.right).' },
    ],
  },
  {
    id: 'llrb',
    title: 'Left-Leaning Red-Black BST (Cây Đỏ-Đen)',
    topic: 'Balanced Search Trees',
    week: 'Tuần 10',
    priority: 'Trọng tâm',
    timeComplexity: 'Search/Insert: Worst <= 2 lg N (Cân bằng đen tuyệt đối)',
    spaceComplexity: 'O(N) thêm boolean color trên Node',
    summary: 'Ánh xạ 1-1 với cây 2-3: liên kết ĐỎ luôn nghiêng TRÁI, không nút nào có 2 liên kết đỏ liên tiếp. Chèn xong chạy 3 dòng chuẩn hóa từ dưới lên.',
    paperTips: [
      'THỨ TỰ 3 DÒNG THẦN THÁNH trong `put(Node h, Key key, Value val)` (TUYỆT ĐỐI KHÔNG ĐẢO THỨ TỰ):',
      '1. `if (isRed(h.right) && !isRed(h.left)) h = rotateLeft(h);` (đỏ nghiêng phải -> xoay trái)',
      '2. `if (isRed(h.left) && isRed(h.left.left)) h = rotateRight(h);` (2 đỏ liên tiếp bên trái -> xoay phải)',
      '3. `if (isRed(h.left) && isRed(h.right)) flipColors(h);` (cả 2 con đều đỏ -> tách nút 4 bằng đổi màu)',
      'Lưu ý: gốc `root` sau khi `put` luôn phải đặt `root.color = BLACK;`!',
    ],
    javaIdioms: [
      { token: 'private static final boolean RED = true;', meaning: 'Hằng số tĩnh không thể thay đổi giá trị.' },
      { token: 'if (x == null) return false;', meaning: 'Quy ước mọi liên kết tới null đều là màu ĐEN.' },
    ],
    starterCode: `public class RedBlackBST<Key extends Comparable<Key>, Value> {
    private static final boolean RED = true;
    private static final boolean BLACK = false;
    private Node root;

    private class Node {
        Key key; Value val;
        Node left, right;
        boolean color;
        Node(Key key, Value val, boolean color) {
            this.key = key; this.val = val; this.color = color;
        }
    }

    private boolean isRed(Node x) {
        if (x == null) return false;
        return x.color == RED;
    }

    private Node rotateLeft(Node h) { /* ... */ return null; }
    private Node rotateRight(Node h) { /* ... */ return null; }
    private void flipColors(Node h) { /* ... */ }

    public void put(Key key, Value val) {
        root = put(root, key, val);
        root.color = BLACK;
    }

    private Node put(Node h, Key key, Value val) {
        // Chen nhu BST voi color = RED, sau do chuan hoa bang 3 if
        return null;
    }
}`,
    skeletonCode: `public class RedBlackBST<Key extends Comparable<Key>, Value> {
    private static final boolean RED = true;
    private static final boolean BLACK = false;
    private Node root;

    private class Node {
        Key key; Value val; Node left, right; boolean color;
        Node(Key key, Value val, boolean color) {
            this.key = key; this.val = val; this.color = color;
        }
    }

    private boolean isRed(Node x) {
        if (x == null) return false;
        return x.color == RED;
    }

    private Node rotateLeft(Node h) {
        Node x = h.right;
        h.right = x.left;
        x.left = h;
        x.color = h.color;
        h.color = ___;
        return x;
    }

    private Node rotateRight(Node h) {
        Node x = h.left;
        h.left = x.right;
        x.right = h;
        x.color = h.color;
        h.color = ___;
        return x;
    }

    private void flipColors(Node h) {
        h.color = RED;
        h.left.color = BLACK;
        h.right.color = BLACK;
    }

    public void put(Key key, Value val) {
        root = put(root, key, val);
        root.color = BLACK;
    }

    private Node put(Node h, Key key, Value val) {
        if (h == null) return new Node(key, val, ___);
        int cmp = key.compareTo(h.key);
        if      (cmp < 0) h.left  = put(h.left, key, val);
        else if (cmp > 0) h.right = put(h.right, key, val);
        else              h.val = val;

        if (isRed(h.right) && !isRed(h.left))    h = rotateLeft(h);
        if (isRed(h.left)  && isRed(h.left.left)) h = ___;
        if (isRed(h.left)  && isRed(h.right))     ___(h);
        return h;
    }
}`,
    modelCode: `public class RedBlackBST<Key extends Comparable<Key>, Value> {
    private static final boolean RED = true;
    private static final boolean BLACK = false;
    private Node root;

    private class Node {
        Key key; Value val;
        Node left, right;
        boolean color;
        Node(Key key, Value val, boolean color) {
            this.key = key;
            this.val = val;
            this.color = color;
        }
    }

    private boolean isRed(Node x) {
        if (x == null) return false;
        return x.color == RED;
    }

    private Node rotateLeft(Node h) {
        Node x = h.right;
        h.right = x.left;
        x.left = h;
        x.color = h.color;
        h.color = RED;
        return x;
    }

    private Node rotateRight(Node h) {
        Node x = h.left;
        h.left = x.right;
        x.right = h;
        x.color = h.color;
        h.color = RED;
        return x;
    }

    private void flipColors(Node h) {
        h.color = RED;
        h.left.color = BLACK;
        h.right.color = BLACK;
    }

    public void put(Key key, Value val) {
        root = put(root, key, val);
        root.color = BLACK;
    }

    private Node put(Node h, Key key, Value val) {
        if (h == null) return new Node(key, val, RED);
        int cmp = key.compareTo(h.key);
        if      (cmp < 0) h.left  = put(h.left, key, val);
        else if (cmp > 0) h.right = put(h.right, key, val);
        else              h.val = val;

        if (isRed(h.right) && !isRed(h.left))     h = rotateLeft(h);
        if (isRed(h.left)  && isRed(h.left.left)) h = rotateRight(h);
        if (isRed(h.left)  && isRed(h.right))     flipColors(h);

        return h;
    }
}`,
    lineExplanations: [
      { lineRange: '22-28', snippet: 'Node x = h.right; h.right = x.left; x.left = h; x.color = h.color; h.color = RED;', javaSyntax: 'Hoán đổi liên kết giữa h và con phải x.', algoRole: 'Xoay liên kết đỏ đang nghiêng phải sang nghiêng trái, giữ nguyên bất biến độ cao đen.' },
      { lineRange: '40-44', snippet: 'h.color = RED; h.left.color = BLACK; h.right.color = BLACK;', javaSyntax: 'Đổi trường color trên 3 nút.', algoRole: 'Tương đương tách nút 4 trong cây 2-3 và đẩy khóa giữa lên cha.' },
      { lineRange: '58-60', snippet: 'if (isRed(h.right) ...) rotateLeft; if (... h.left.left) rotateRight; if (... && ...) flipColors;', javaSyntax: '3 câu lệnh if ĐỘC LẬP nối tiếp nhau (không dùng else if!).', algoRole: 'Mọi tình huống chèn nút đỏ mới đều tự quy chuẩn về LLRB hợp lệ trong O(1) tại mỗi tầng.' },
    ],
    rubricChecks: [
      { id: 'rotL', label: 'rotateLeft chuyển x = h.right lên làm gốc và h.color = RED', patterns: ['x\\s*=\\s*h\\.right', 'h\\.right\\s*=\\s*x\\.left', 'x\\.left\\s*=\\s*h'], points: 3, hintIfMissing: 'rotateLeft: x = h.right; h.right = x.left; x.left = h; x.color = h.color; h.color = RED;.' },
      { id: 'rotR', label: 'rotateRight chuyển x = h.left lên làm gốc', patterns: ['x\\s*=\\s*h\\.left', 'h\\.left\\s*=\\s*x\\.right', 'x\\.right\\s*=\\s*h'], points: 2, hintIfMissing: 'rotateRight đối xứng với rotateLeft.' },
      { id: 'flip', label: 'flipColors đặt h = RED, 2 con = BLACK', patterns: ['h\\.color\\s*=\\s*RED', 'h\\.left\\.color\\s*=\\s*BLACK'], points: 2, hintIfMissing: 'flipColors biến 2 con thành BLACK và cha thành RED.' },
      { id: 'fixup', label: 'Đúng thứ tự 3 if cân bằng trong put', patterns: ['isRed\\(h\\.right\\)\\s*&&\\s*!isRed\\(h\\.left\\)', 'isRed\\(h\\.left\\.left\\)', 'flipColors\\s*\\(\\s*h\\s*\\)'], points: 3, hintIfMissing: 'Đủ 3 bước theo đúng thứ tự: rotateLeft -> rotateRight -> flipColors.' },
    ],
  },
  {
    id: 'avl-tree',
    title: 'AVL Tree (height, balanceFactor, 4 phép xoay)',
    topic: 'Balanced Search Trees',
    week: 'Tuần 10',
    priority: 'Bắt buộc',
    timeComplexity: 'Search/Insert: Worst O(log N) (h <= 1.44 lg N)',
    spaceComplexity: 'O(N) thêm int height trên mỗi Node',
    summary: 'Cây BST tự cân bằng sao cho tại mọi nút, hiệu chiều cao |height(left) - height(right)| <= 1. Xử lý 4 trường hợp lệch: LL (Right Rotate), RR (Left Rotate), LR (Left rồi Right), RL (Right rồi Left).',
    paperTips: [
      'Cực hay ra ở Câu 4b (vẽ cây cân bằng & ghi rõ tên phép xoay)!',
      'Quy ước chiều cao: `height(null) = -1` (hoặc `0` tùy slide — miễn nhất quán!). Trong code chuẩn bên dưới dùng `height(null) = 0` và lá có `height = 1` (rất gọn khi code giấy!).',
      'Khi lệch Trái (`bf > 1`): nếu khóa mới chèn vào trái-trái (`bf(x.left) >= 0`) -> Xoay phải đơn (LL); nếu chèn vào trái-phải (`bf(x.left) < 0`) -> Xoay trái `x.left` rồi xoay phải `x` (LR).',
    ],
    javaIdioms: [
      { token: 'Math.max(height(x.left), height(x.right))', meaning: 'Hàm thư viện chuẩn lấy giá trị lớn hơn giữa hai số nguyên.' },
    ],
    starterCode: `public class AVLTree<Key extends Comparable<Key>, Value> {
    private Node root;

    private class Node {
        Key key; Value val;
        Node left, right;
        int height;
        Node(Key key, Value val) {
            this.key = key; this.val = val; this.height = 1;
        }
    }

    private int height(Node x) { return x == null ? 0 : x.height; }
    private int bf(Node x) { return x == null ? 0 : height(x.left) - height(x.right); }

    private Node rotateRight(Node y) { /* ... */ return null; }
    private Node rotateLeft(Node x) { /* ... */ return null; }

    public void put(Key key, Value val) { root = put(root, key, val); }
    private Node put(Node x, Key key, Value val) {
        // 1. Chen BST binh thuong
        // 2. Cap nhat x.height
        // 3. Kiem tra bf(x) cho 4 truong hop LL, LR, RR, RL
        return null;
    }
}`,
    skeletonCode: `public class AVLTree<Key extends Comparable<Key>, Value> {
    private Node root;

    private class Node {
        Key key; Value val; Node left, right; int height;
        Node(Key key, Value val) {
            this.key = key; this.val = val; this.height = 1;
        }
    }

    private int height(Node x) { return x == null ? 0 : x.height; }
    private int bf(Node x) { return x == null ? 0 : height(x.left) - height(x.right); }
    private void updateHeight(Node x) {
        x.height = 1 + Math.max(height(x.left), height(x.right));
    }

    private Node rotateRight(Node y) {
        Node x = y.left;
        y.left = x.right;
        x.right = y;
        updateHeight(y);
        updateHeight(x);
        return x;
    }

    private Node rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        y.left = x;
        updateHeight(x);
        updateHeight(y);
        return y;
    }

    public void put(Key key, Value val) { root = put(root, key, val); }

    private Node put(Node x, Key key, Value val) {
        if (x == null) return new Node(key, val);
        int cmp = key.compareTo(x.key);
        if      (cmp < 0) x.left  = put(x.left, key, val);
        else if (cmp > 0) x.right = put(x.right, key, val);
        else              { x.val = val; return x; }

        updateHeight(x);
        int balance = bf(x);

        if (balance > 1 && bf(x.left) >= 0) return rotateRight(x); // LL
        if (balance > 1 && bf(x.left) < 0) {                      // LR
            x.left = rotateLeft(x.left);
            return rotateRight(x);
        }
        if (balance < -1 && bf(x.right) <= 0) return ___;         // RR
        if (balance < -1 && bf(x.right) > 0) {                    // RL
            x.right = ___;
            return ___;
        }
        return x;
    }
}`,
    modelCode: `public class AVLTree<Key extends Comparable<Key>, Value> {
    private Node root;

    private class Node {
        Key key; Value val;
        Node left, right;
        int height;
        Node(Key key, Value val) {
            this.key = key;
            this.val = val;
            this.height = 1;
        }
    }

    private int height(Node x) { return x == null ? 0 : x.height; }
    private int bf(Node x) { return x == null ? 0 : height(x.left) - height(x.right); }
    private void updateHeight(Node x) {
        x.height = 1 + Math.max(height(x.left), height(x.right));
    }

    private Node rotateRight(Node y) {
        Node x = y.left;
        y.left = x.right;
        x.right = y;
        updateHeight(y);
        updateHeight(x);
        return x;
    }

    private Node rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        y.left = x;
        updateHeight(x);
        updateHeight(y);
        return y;
    }

    public void put(Key key, Value val) {
        root = put(root, key, val);
    }

    private Node put(Node x, Key key, Value val) {
        if (x == null) return new Node(key, val);
        int cmp = key.compareTo(x.key);
        if      (cmp < 0) x.left  = put(x.left, key, val);
        else if (cmp > 0) x.right = put(x.right, key, val);
        else              { x.val = val; return x; }

        updateHeight(x);
        int balance = bf(x);

        // LL
        if (balance > 1 && bf(x.left) >= 0) return rotateRight(x);
        // LR
        if (balance > 1 && bf(x.left) < 0) {
            x.left = rotateLeft(x.left);
            return rotateRight(x);
        }
        // RR
        if (balance < -1 && bf(x.right) <= 0) return rotateLeft(x);
        // RL
        if (balance < -1 && bf(x.right) > 0) {
            x.right = rotateRight(x.right);
            return rotateLeft(x);
        }
        return x;
    }
}`,
    lineExplanations: [
      { lineRange: '16-19', snippet: 'bf(x) = height(x.left) - height(x.right);', javaSyntax: 'Tính hệ số cân bằng (Balance Factor).', algoRole: 'bf > 1 nghĩa là nặng bên trái; bf < -1 nghĩa là nặng bên phải.' },
      { lineRange: '25-26', snippet: 'updateHeight(y); updateHeight(x);', javaSyntax: 'Cập nhật chiều cao nút con y TRƯỚC nút cha mới x.', algoRole: 'Sau xoay, y nằm dưới x nên chiều cao x phụ thuộc vào y.' },
      { lineRange: '52-65', snippet: 'if (balance > 1 ...) ... if (balance < -1 ...)', javaSyntax: '4 nhánh xử lý đủ 4 ca mất cân bằng.', algoRole: 'LL xoay phải; LR xoay trái con trái rồi xoay phải; RR xoay trái; RL xoay phải con phải rồi xoay trái.' },
    ],
    rubricChecks: [
      { id: 'bf', label: 'Tính height và balance factor = height(left) - height(right)', patterns: ['Math\\.max', 'height\\s*\\(\\s*x\\.left\\s*\\)\\s*-\\s*height\\s*\\(\\s*x\\.right\\s*\\)'], points: 2, hintIfMissing: 'Tính height và bf(x) = height(x.left) - height(x.right).' },
      { id: 'rot', label: 'Cài rotateRight và rotateLeft có cập nhật height', patterns: ['rotateRight', 'rotateLeft'], points: 4, hintIfMissing: 'Cần rotateRight(y) và rotateLeft(x), nhớ cập nhật height con trước cha.' },
      { id: 'cases', label: 'Xử lý đủ 4 trường hợp LL, LR, RR, RL', patterns: ['>\\s*1', '<\\s*-1', 'x\\.left\\s*=\\s*rotateLeft', 'x\\.right\\s*=\\s*rotateRight'], points: 4, hintIfMissing: 'Xử lý đủ cả 4 nhánh balance > 1 (LL, LR) và balance < -1 (RR, RL).' },
    ],
  },
  {
    id: 'hash-tables',
    isMidterm: false,
    title: 'Hash Tables (Separate Chaining & Linear Probing)',
    topic: 'Bảng băm',
    week: 'Tuần 10',
    priority: 'Bắt buộc',
    timeComplexity: 'Avg: O(1) (3-5 probes) | Worst: O(N)',
    spaceComplexity: 'Chaining: M danh sách | Probing: mảng kích thước M > N',
    summary: 'Hàm băm `hash(key) = (key.hashCode() & 0x7fffffff) % M`. Separate Chaining dùng mảng danh sách liên kết; Linear Probing dò tuyến tính `(i + 1) % M` trên mảng phẳng.',
    paperTips: [
      'TẠI SAO dùng `& 0x7fffffff` trước `% M`? Vì `hashCode()` trong Java có thể trả về số ÂM (và `Math.abs(Integer.MIN_VALUE)` vẫn âm!). Mặt nạ bit `0x7fffffff` xóa bit dấu để ra số không âm!',
      'Trong Linear Probing: khi chèn trùng khóa -> ghi đè `vals[i] = val`; khi gặp `null` -> chèn vào ô trống đó. Mảng BẮT BUỘC phải duy trì M > N (thực tế algs4 giữ tải `alpha = N/M <= 1/2`, gấp đôi M khi `N >= M/2`), nếu mảng đầy 100% không còn ô null thì vòng lặp dò sẽ lặp vô hạn!',
      'Khi vẽ bảng băm trên giấy (Câu 5 đề 2024-2025): Linear Probing rất dễ bị hiện tượng **primary clustering** (dồn cục) khi các khóa liên tiếp băm vào cùng cụm ô.',
    ],
    javaIdioms: [
      { token: '(key.hashCode() & 0x7fffffff) % M', meaning: 'Biến bất kỳ hashCode 32-bit nào thành chỉ số mảng hợp lệ `0..M-1`.' },
      { token: '(i + 1) % M', meaning: 'Dịch tiến 1 ô và quay vòng về 0 nếu chạm cuối bảng M.' },
    ],
    starterCode: `public class LinearProbingHashST<Key, Value> {
    private int M = 30001;
    private Key[] keys = (Key[]) new Object[M];
    private Value[] vals = (Value[]) new Object[M];

    private int hash(Key key) {
        return (key.hashCode() & 0x7fffffff) % M;
    }

    public void put(Key key, Value val) {
        // Do tuyen tinh tu hash(key): neu trung key -> ghi de, gap null -> chen
    }

    public Value get(Key key) {
        // Do tuyen tinh tu hash(key) toi khi gap null
        return null;
    }
}`,
    skeletonCode: `public class LinearProbingHashST<Key, Value> {
    private int M = 30001;
    private Key[] keys = (Key[]) new Object[M];
    private Value[] vals = (Value[]) new Object[M];

    private int hash(Key key) {
        return (key.hashCode() & 0x7fffffff) % M;
    }

    public void put(Key key, Value val) {
        int i;
        for (i = hash(key); keys[i] != null; i = (i + 1) % M) {
            if (keys[i].equals(key)) {
                vals[i] = val;
                return;
            }
        }
        keys[i] = ___;
        vals[i] = ___;
    }

    public Value get(Key key) {
        for (int i = hash(key); keys[i] != null; i = (i + 1) % M) {
            if (keys[i].equals(key))
                return ___;
        }
        return null;
    }
}`,
    modelCode: `public class LinearProbingHashST<Key, Value> {
    private int M = 30001;
    private Key[] keys = (Key[]) new Object[M];
    private Value[] vals = (Value[]) new Object[M];

    private int hash(Key key) {
        return (key.hashCode() & 0x7fffffff) % M;
    }

    public void put(Key key, Value val) {
        int i;
        for (i = hash(key); keys[i] != null; i = (i + 1) % M) {
            if (keys[i].equals(key)) {
                vals[i] = val;
                return;
            }
        }
        keys[i] = key;
        vals[i] = val;
    }

    public Value get(Key key) {
        for (int i = hash(key); keys[i] != null; i = (i + 1) % M) {
            if (keys[i].equals(key))
                return vals[i];
        }
        return null;
    }
}`,
    lineExplanations: [
      { lineRange: '7', snippet: 'return (key.hashCode() & 0x7fffffff) % M;', javaSyntax: 'Phép AND bit `&` với 31 bit 1.', algoRole: 'Triệt tiêu bit dấu âm trước khi chia lấy dư % M.' },
      { lineRange: '12-19', snippet: 'for (i = hash(key); keys[i] != null; i = (i + 1) % M)', javaSyntax: 'Dùng `.equals()` để so sánh nội dung hai đối tượng Java (không dùng `==`).', algoRole: 'Gặp khóa trùng thì cập nhật giá trị; thoát vòng lặp tại ô null đầu tiên để chèn mới.' },
    ],
    rubricChecks: [
      { id: 'hash', label: 'Hàm hash xử lý số âm bằng & 0x7fffffff rồi % M', patterns: ['0x7fffffff', '%\\s*M'], points: 3, hintIfMissing: 'Nhớ công thức (key.hashCode() & 0x7fffffff) % M.' },
      { id: 'probe', label: 'Vòng lặp dò (i + 1) % M dừng khi keys[i] == null', patterns: ['keys\\[i\\]\\s*!=\\s*null', '\\(i\\s*\\+\\s*1\\)\\s*%\\s*M'], points: 4, hintIfMissing: 'Dùng (i + 1) % M để dò vòng tròn đến khi keys[i] == null.' },
      { id: 'eq', label: 'Dùng equals(key) để tìm khóa trùng', patterns: ['\\.equals\\s*\\(\\s*key\\s*\\)'], points: 3, hintIfMissing: 'So sánh đối tượng Key trong Java phải dùng keys[i].equals(key).' },
    ],
  },
  {
    id: 'graph-dfs-bfs',
    isMidterm: false,
    title: 'Đồ thị vô hướng: Graph + DFS + BFS',
    topic: 'Đồ thị vô hướng',
    week: 'Tuần 11',
    priority: 'Bắt buộc',
    timeComplexity: 'DFS & BFS: O(V + E) với Danh sách kề',
    spaceComplexity: 'O(V + E) lưu adj[] + O(V) marked[], edgeTo[]',
    summary: 'Biểu diễn đồ thị bằng mảng danh sách kề `Bag<Integer>[] adj`. DFS dùng đệ quy (tìm mọi đỉnh liên thông); BFS dùng Queue (tìm đường đi ÍT CẠNH NHẤT).',
    paperTips: [
      'Cực hay ra ở Câu 7 đề thi cuối kỳ! Nhớ 3 mảng chuẩn của algs4: `marked[v]`, `edgeTo[v]`, và `distTo[v]` (cho BFS).',
      'QUAN TRỌNG TRONG BFS: phải đánh dấu `marked[w] = true;` NGAY KHI ĐƯA `w` VÀO QUEUE (`q.enqueue(w)`), KHÔNG chờ tới khi lấy ra khỏi queue — nếu chờ lấy ra mới đánh dấu, một đỉnh có thể bị đẩy vào queue nhiều lần!',
      'Đồ thị vô hướng khi `addEdge(v, w)` phải thêm cả 2 chiều: `adj[v].add(w); adj[w].add(v);`.',
    ],
    javaIdioms: [
      { token: 'for (int w : G.adj(v))', meaning: 'Vòng lặp for-each duyệt qua mọi đỉnh w kề với v.' },
      { token: 'Bag<Integer>[] adj', meaning: 'Mỗi đỉnh v sở hữu một túi (danh sách) chứa các đỉnh kề.' },
    ],
    starterCode: `public class GraphPaths {
    private boolean[] marked;
    private int[] edgeTo;
    private int[] distTo;
    private final int s;

    public GraphPaths(Graph G, int s) {
        this.s = s;
        marked = new boolean[G.V()];
        edgeTo = new int[G.V()];
        distTo = new int[G.V()];
        // Goi dfs(G, s) hoac bfs(G, s)
    }

    private void dfs(Graph G, int v) {
        // Danh dau v va de quy qua cac dinh w ke v chua marked
    }

    private void bfs(Graph G, int s) {
        // Dung Queue<Integer>, danh dau ngay khi enqueue
    }
}`,
    skeletonCode: `public class GraphPaths {
    private boolean[] marked;
    private int[] edgeTo;
    private int[] distTo;
    private final int s;

    public GraphPaths(Graph G, int s) {
        this.s = s;
        marked = new boolean[G.V()];
        edgeTo = new int[G.V()];
        distTo = new int[G.V()];
        bfs(G, s);
    }

    private void dfs(Graph G, int v) {
        marked[v] = true;
        for (int w : G.adj(v)) {
            if (!marked[w]) {
                edgeTo[w] = ___;
                dfs(G, w);
            }
        }
    }

    private void bfs(Graph G, int s) {
        Queue<Integer> q = new Queue<Integer>();
        marked[s] = true;
        distTo[s] = 0;
        q.enqueue(s);
        while (!q.isEmpty()) {
            int v = q.dequeue();
            for (int w : G.adj(v)) {
                if (!marked[w]) {
                    edgeTo[w] = ___;
                    distTo[w] = distTo[v] + 1;
                    marked[w] = ___;
                    q.enqueue(w);
                }
            }
        }
    }
}`,
    modelCode: `public class GraphPaths {
    private boolean[] marked;
    private int[] edgeTo;
    private int[] distTo;
    private final int s;

    public GraphPaths(Graph G, int s) {
        this.s = s;
        marked = new boolean[G.V()];
        edgeTo = new int[G.V()];
        distTo = new int[G.V()];
        bfs(G, s);
    }

    private void dfs(Graph G, int v) {
        marked[v] = true;
        for (int w : G.adj(v)) {
            if (!marked[w]) {
                edgeTo[w] = v;
                dfs(G, w);
            }
        }
    }

    private void bfs(Graph G, int s) {
        Queue<Integer> q = new Queue<Integer>();
        marked[s] = true;
        distTo[s] = 0;
        q.enqueue(s);
        while (!q.isEmpty()) {
            int v = q.dequeue();
            for (int w : G.adj(v)) {
                if (!marked[w]) {
                    edgeTo[w] = v;
                    distTo[w] = distTo[v] + 1;
                    marked[w] = true;
                    q.enqueue(w);
                }
            }
        }
    }

    public Iterable<Integer> pathTo(int v) {
        if (!marked[v]) return null;
        Stack<Integer> path = new Stack<Integer>();
        for (int x = v; x != s; x = edgeTo[x])
            path.push(x);
        path.push(s);
        return path;
    }
}`,
    lineExplanations: [
      { lineRange: '15-22', snippet: 'marked[v] = true; for (int w : G.adj(v)) if (!marked[w]) { edgeTo[w] = v; dfs(G, w); }', javaSyntax: 'Duyệt các phần tử trong Iterable `G.adj(v)`.', algoRole: 'DFS đi sâu hết một nhánh rồi mới quay lui; ghi lại đỉnh cha trong edgeTo[].' },
      { lineRange: '25-39', snippet: 'Queue<Integer> q = new Queue<>(); ... marked[w] = true; q.enqueue(w);', javaSyntax: 'Dùng kiểu bao đóng `Integer` thay cho `int` trong Generics `Queue<Integer>`.', algoRole: 'BFS duyệt theo từng lớp khoảng cách tăng dần nên đảm bảo đường đi ít cạnh nhất.' },
      { lineRange: '43-50', snippet: 'for (int x = v; x != s; x = edgeTo[x]) path.push(x);', javaSyntax: 'Truy vết ngược từ đích v về nguồn s qua mảng edgeTo[].', algoRole: 'Đẩy vào Stack để khi lấy ra có thứ tự thuận từ s -> v.' },
    ],
    rubricChecks: [
      { id: 'dfs', label: 'DFS đánh dấu marked[v] = true và đệ quy w chưa marked', patterns: ['marked\\[v\\]\\s*=\\s*true', 'G\\.adj\\s*\\(\\s*v\\s*\\)', 'dfs\\s*\\(\\s*G\\s*,\\s*w\\s*\\)'], points: 4, hintIfMissing: 'DFS cần marked[v] = true, lặp w : G.adj(v), nếu !marked[w] thì edgeTo[w] = v; dfs(G, w);.' },
      { id: 'bfs-q', label: 'BFS dùng Queue, đánh dấu marked[s] = true và lặp !q.isEmpty()', patterns: ['Queue', 'q\\.enqueue\\s*\\(\\s*s\\s*\\)', '!q\\.isEmpty\\s*\\(\\)'], points: 3, hintIfMissing: 'BFS khởi tạo Queue, marked[s] = true, enqueue(s), lặp while (!q.isEmpty()).' },
      { id: 'bfs-mark', label: 'BFS đánh dấu marked[w] = true ngay trước/khi enqueue(w)', patterns: ['edgeTo\\[w\\]\\s*=\\s*v', 'marked\\[w\\]\\s*=\\s*true', 'q\\.enqueue\\s*\\(\\s*w\\s*\\)'], points: 3, hintIfMissing: 'Nhớ gán edgeTo[w] = v, marked[w] = true và q.enqueue(w).' },
    ],
  },
];
