import { AlgorithmItem } from '../types';

export const ALGORITHMS_PART_1: AlgorithmItem[] = [
  {
    id: 'quick-find',
    title: 'QuickFindUF (Tìm nhanh)',
    topic: 'Union-Find',
    week: 'Tuần 1',
    priority: 'Bắt buộc',
    timeComplexity: 'Init: N | Find: 1 | Union: N',
    spaceComplexity: 'O(N) mảng int[] id',
    summary: 'Mỗi phần tử lưu trực tiếp ID thành phần liên thông trong mảng id[]. Hai phần tử nối nhau khi id[p] == id[q].',
    paperTips: [
      'Nhớ lưu `int pid = id[p]; int qid = id[q];` trước vòng `for`! Nếu viết `id[i] == id[p]` trực tiếp trong vòng lặp, khi `id[p]` bị đổi giữa chừng thì các phần tử sau sẽ sai hết.',
      'Chú ý: Union N lần tốn O(N^2) — quá chậm với dữ liệu lớn.',
    ],
    javaIdioms: [
      { token: 'private int[] id;', meaning: 'Khai báo thuộc tính mảng số nguyên ẩn (chỉ dùng nội bộ lớp).' },
      { token: 'id = new int[N];', meaning: 'Cấp phát bộ nhớ cho mảng N phần tử (chỉ số 0 đến N-1).' },
      { token: 'public boolean connected(int p, int q)', meaning: 'Hàm trả về true/false kiểm tra p và q có cùng gốc không.' },
    ],
    starterCode: `public class QuickFindUF {
    private int[] id;

    public QuickFindUF(int N) {
        // Khoi tao id[i] = i
    }

    public boolean connected(int p, int q) {
        // Kiem tra cung thanh phan lien thong
        return false;
    }

    public void union(int p, int q) {
        // Hop nhat thanh phan chua p va q
    }
}`,
    skeletonCode: `public class QuickFindUF {
    private int[] id;

    public QuickFindUF(int N) {
        id = new int[N];
        for (int i = 0; i < N; i++)
            id[i] = ___;
    }

    public boolean connected(int p, int q) {
        return ___ == ___;
    }

    public void union(int p, int q) {
        int pid = id[p];
        int qid = id[q];
        for (int i = 0; i < id.length; i++)
            if (id[i] == ___) id[i] = ___;
    }
}`,
    modelCode: `public class QuickFindUF {
    private int[] id;

    public QuickFindUF(int N) {
        id = new int[N];
        for (int i = 0; i < N; i++)
            id[i] = i;
    }

    public boolean connected(int p, int q) {
        return id[p] == id[q];
    }

    public void union(int p, int q) {
        int pid = id[p];
        int qid = id[q];
        for (int i = 0; i < id.length; i++)
            if (id[i] == pid) id[i] = qid;
    }
}`,
    lineExplanations: [
      { lineRange: '1-2', snippet: 'public class QuickFindUF { private int[] id;', javaSyntax: 'Tạo lớp công khai và mảng int[] lưu dữ liệu.', algoRole: 'Mỗi ô id[i] biểu diễn nhãn nhóm của phần tử i.' },
      { lineRange: '4-8', snippet: 'id = new int[N]; for (...) id[i] = i;', javaSyntax: 'Hàm khởi tạo (Constructor) cấp phát mảng độ dài N.', algoRole: 'Ban đầu có N thành phần rời rạc, mỗi đỉnh là nhóm riêng.' },
      { lineRange: '10-12', snippet: 'return id[p] == id[q];', javaSyntax: 'Toán tử `==` so sánh hai giá trị int.', algoRole: 'Find / connected chạy trong O(1).' },
      { lineRange: '15-16', snippet: 'int pid = id[p]; int qid = id[q];', javaSyntax: 'Lưu biến tạm kiểu int trước khi lặp.', algoRole: 'Tránh lỗi ghi đè id[p] làm hỏng điều kiện ở các vòng sau.' },
      { lineRange: '17-18', snippet: 'if (id[i] == pid) id[i] = qid;', javaSyntax: 'Duyệt toàn mảng bằng `id.length`.', algoRole: 'Đổi toàn bộ phần tử thuộc nhóm p sang nhóm q — tốn O(N).' },
    ],
    rubricChecks: [
      { id: 'init', label: 'Khởi tạo id[i] = i', patterns: ['id\\[i\\]\\s*=\\s*i'], points: 2, hintIfMissing: 'Trong constructor phải gán id[i] = i.' },
      { id: 'conn', label: 'Hàm connected trả về id[p] == id[q]', patterns: ['id\\[p\\]\\s*==\\s*id\\[q\\]', 'id\\[q\\]\\s*==\\s*id\\[p\\]'], points: 2, hintIfMissing: 'connected chỉ cần return id[p] == id[q].' },
      { id: 'temp', label: 'Lưu pid = id[p], qid = id[q] trước khi lặp', patterns: ['int\\s+\\w+\\s*=\\s*id\\[p\\]'], points: 3, hintIfMissing: 'Nhớ lưu biến tạm pid = id[p] và qid = id[q] trước vòng for.' },
      { id: 'loop', label: 'Duyệt mảng đổi toàn bộ nhóm pid thành qid', patterns: ['for\\s*\\([^)]*id\\.length', 'id\\[i\\]\\s*=\\s*'], points: 3, hintIfMissing: 'Dùng vòng for qua id.length để cập nhật các phần tử bằng pid thành qid.' },
    ],
  },
  {
    id: 'weighted-quick-union',
    title: 'WeightedQuickUnionUF (Hợp nhanh có trọng số)',
    topic: 'Union-Find',
    week: 'Tuần 1',
    priority: 'Bắt buộc',
    timeComplexity: 'Init: N | Find: lg N | Union: lg N',
    spaceComplexity: 'O(N) hai mảng id[] và sz[]',
    summary: 'Lưu rừng cây qua mảng cha id[]. Hàm root(i) leo lên gốc; khi union luôn gắn cây nhỏ (sz nhỏ hơn) vào gốc cây lớn để giữ chiều cao <= lg N.',
    paperTips: [
      'Phân biệt QuickUnion thường (gắn id[i] = j bất chấp kích thước -> có thể suy biến O(N)) và WeightedQuickUnion (dùng thêm mảng sz[] lưu số nút của cây gốc).',
      'Nếu đề hỏi Path Compression: thêm `id[i] = id[id[i]];` bên trong vòng `while` của `root(i)` (1 dòng duy nhất!).',
    ],
    javaIdioms: [
      { token: 'while (i != id[i]) i = id[i];', meaning: 'Vòng lặp leo ngược lên nút cha cho tới khi gặp gốc (nút có cha là chính nó).' },
      { token: 'sz[i] += sz[j];', meaning: 'Cộng dồn kích thước cây nhỏ vào cây lớn.' },
    ],
    starterCode: `public class WeightedQuickUnionUF {
    private int[] id;
    private int[] sz;

    public WeightedQuickUnionUF(int N) {
        // Khoi tao id[i] = i va sz[i] = 1
    }

    private int root(int i) {
        // Leo len goc (co the them path compression)
        return i;
    }

    public boolean connected(int p, int q) {
        return false;
    }

    public void union(int p, int q) {
        // Tim 2 goc, gan cay nho vao cay lon va cap nhat sz[]
    }
}`,
    skeletonCode: `public class WeightedQuickUnionUF {
    private int[] id;
    private int[] sz;

    public WeightedQuickUnionUF(int N) {
        id = new int[N];
        sz = new int[N];
        for (int i = 0; i < N; i++) {
            id[i] = ___;
            sz[i] = ___;
        }
    }

    private int root(int i) {
        while (i != ___) {
            id[i] = id[id[i]]; // Path compression (tuy chon)
            i = ___;
        }
        return i;
    }

    public boolean connected(int p, int q) {
        return root(p) == root(q);
    }

    public void union(int p, int q) {
        int i = root(p);
        int j = root(q);
        if (i == j) return;
        if (sz[i] < sz[j]) { id[i] = ___; sz[j] += ___; }
        else               { id[j] = ___; sz[i] += ___; }
    }
}`,
    modelCode: `public class WeightedQuickUnionUF {
    private int[] id;
    private int[] sz;

    public WeightedQuickUnionUF(int N) {
        id = new int[N];
        sz = new int[N];
        for (int i = 0; i < N; i++) {
            id[i] = i;
            sz[i] = 1;
        }
    }

    private int root(int i) {
        while (i != id[i]) {
            id[i] = id[id[i]];
            i = id[i];
        }
        return i;
    }

    public boolean connected(int p, int q) {
        return root(p) == root(q);
    }

    public void union(int p, int q) {
        int i = root(p);
        int j = root(q);
        if (i == j) return;
        if (sz[i] < sz[j]) {
            id[i] = j;
            sz[j] += sz[i];
        } else {
            id[j] = i;
            sz[i] += sz[j];
        }
    }
}`,
    lineExplanations: [
      { lineRange: '2-3', snippet: 'private int[] id; private int[] sz;', javaSyntax: 'Hai mảng song song cùng kích thước N.', algoRole: 'id[i] lưu cha của i; sz[r] lưu số lượng nút trong cây gốc r.' },
      { lineRange: '9-10', snippet: 'id[i] = i; sz[i] = 1;', javaSyntax: 'Gán giá trị khởi tạo trong vòng lặp for.', algoRole: 'Mỗi nút ban đầu tự làm gốc với kích thước bằng 1.' },
      { lineRange: '14-20', snippet: 'while (i != id[i]) { id[i] = id[id[i]]; i = id[i]; }', javaSyntax: 'Vòng while dừng khi chạm gốc (id[i] == i).', algoRole: 'Tìm gốc và nén đường đi một nửa (path halving) giúp cây cực phẳng.' },
      { lineRange: '29', snippet: 'if (i == j) return;', javaSyntax: 'Lệnh thoát sớm khỏi hàm void.', algoRole: 'Nếu đã chung gốc thì không hợp nhất nữa, tránh cộng đôi sz[].' },
      { lineRange: '30-36', snippet: 'if (sz[i] < sz[j]) ...', javaSyntax: 'Rẽ nhánh so sánh trọng số hai gốc.', algoRole: 'Cây ít nút luôn làm con cây nhiều nút -> độ sâu tối đa lg N.' },
    ],
    rubricChecks: [
      { id: 'sz-init', label: 'Khởi tạo sz[i] = 1', patterns: ['sz\\[i\\]\\s*=\\s*1'], points: 2, hintIfMissing: 'Nhớ khởi tạo sz[i] = 1 cho mọi i.' },
      { id: 'root', label: 'Hàm root(i) leo lên id[i]', patterns: ['while\\s*\\(\\s*i\\s*!=\\s*id\\[i\\]\\s*\\)'], points: 3, hintIfMissing: 'Viết while (i != id[i]) i = id[i];.' },
      { id: 'same-root', label: 'Kiểm tra i == j để return sớm', patterns: ['if\\s*\\(\\s*i\\s*==\\s*j\\s*\\)\\s*return'], points: 2, hintIfMissing: 'Thiếu if (i == j) return; sẽ làm sz[] bị cộng sai nếu p, q đã nối.' },
      { id: 'weight', label: 'So sánh sz[i] < sz[j] và cập nhật sz', patterns: ['sz\\[i\\]\\s*<\\s*sz\\[j\\]', 'sz\\[[ij]\\]\\s*\\+='], points: 3, hintIfMissing: 'Gắn gốc cây nhỏ vào gốc cây lớn và cộng sz.' },
    ],
  },
  {
    id: 'linked-stack',
    title: 'LinkedStack<Item> (Ngăn xếp LIFO)',
    topic: 'Stack & Queue',
    week: 'Tuần 3',
    priority: 'Bắt buộc',
    timeComplexity: 'Push: O(1) | Pop: O(1) | isEmpty: O(1)',
    spaceComplexity: '~40N bytes (Node overhead)',
    summary: 'Cài Stack bằng danh sách liên kết đơn với con trỏ `first` ở đỉnh stack. Push và Pop đều thao tác ở đầu danh sách (LIFO - Vào sau ra trước).',
    paperTips: [
      'Lúc `push`: luôn lưu `Node oldfirst = first;` trước khi tạo `first = new Node();`, rồi nối `first.next = oldfirst;`.',
      'Lúc `pop`: lưu `Item item = first.item;` trước khi dời `first = first.next;`, và nhớ `n--`.',
      'Nếu dùng mảng co giãn (ResizingArrayStack): nhân đôi `resize(2 * s.length)` khi `N == s.length`, giảm nửa `resize(s.length / 2)` khi `N > 0 && N == s.length / 4` (tại 1/4 để tránh thrashing!).',
    ],
    javaIdioms: [
      { token: 'public class LinkedStack<Item>', meaning: 'Generic `<Item>`: cho phép Stack chứa bất kỳ kiểu đối tượng nào (String, Integer...).' },
      { token: 'private class Node { Item item; Node next; }', meaning: 'Lớp lồng bên trong biểu diễn 1 nút danh sách liên kết.' },
      { token: 'first == null', meaning: 'Kiểm tra danh sách rỗng bằng so sánh con trỏ với null.' },
    ],
    starterCode: `public class LinkedStack<Item> {
    private Node first = null;
    private int n = 0;

    private class Node {
        Item item;
        Node next;
    }

    public boolean isEmpty() { return first == null; }
    public int size() { return n; }

    public void push(Item item) {
        // Them vao dau danh sach
    }

    public Item pop() {
        // Lay phan tu o dau danh sach
        return null;
    }
}`,
    skeletonCode: `public class LinkedStack<Item> {
    private Node first = null;
    private int n = 0;

    private class Node {
        Item item;
        Node next;
    }

    public boolean isEmpty() { return first == null; }
    public int size() { return n; }

    public void push(Item item) {
        Node oldfirst = ___;
        first = new Node();
        first.item = ___;
        first.next = ___;
        n++;
    }

    public Item pop() {
        if (isEmpty()) throw new RuntimeException("Stack underflow");
        Item item = ___;
        first = ___;
        n--;
        return item;
    }
}`,
    modelCode: `public class LinkedStack<Item> {
    private Node first = null;
    private int n = 0;

    private class Node {
        Item item;
        Node next;
    }

    public boolean isEmpty() { return first == null; }
    public int size() { return n; }

    public void push(Item item) {
        Node oldfirst = first;
        first = new Node();
        first.item = item;
        first.next = oldfirst;
        n++;
    }

    public Item pop() {
        if (isEmpty()) throw new RuntimeException("Stack underflow");
        Item item = first.item;
        first = first.next;
        n--;
        return item;
    }
}`,
    lineExplanations: [
      { lineRange: '1', snippet: 'public class LinkedStack<Item>', javaSyntax: 'Kiểu tổng quát (Generics) đặt trong dấu ngoặc nhọn <Item>.', algoRole: 'Cho phép dùng lại Stack cho mọi kiểu dữ liệu.' },
      { lineRange: '5-8', snippet: 'private class Node { Item item; Node next; }', javaSyntax: 'Inner class tự tham chiếu tới chính kiểu Node.', algoRole: 'Mỗi Node giữ dữ liệu và con trỏ tới nút nằm ngay dưới nó.' },
      { lineRange: '14-18', snippet: 'Node oldfirst = first; first = new Node(); ...', javaSyntax: 'Cấp phát đối tượng mới bằng từ khóa `new`.', algoRole: 'Chèn nút mới lên đỉnh stack và trỏ next về đỉnh cũ trong O(1).' },
      { lineRange: '22-26', snippet: 'Item item = first.item; first = first.next;', javaSyntax: 'Truy cập trường bằng dấu chấm `.` và gán lại tham chiếu.', algoRole: 'Lấy dữ liệu đỉnh cũ và dời đỉnh stack xuống nút kế tiếp.' },
    ],
    rubricChecks: [
      { id: 'node', label: 'Định nghĩa class Node có item và next', patterns: ['class\\s+Node', 'Node\\s+next'], points: 2, hintIfMissing: 'Cần khai báo private class Node { Item item; Node next; }.' },
      { id: 'push', label: 'Push giữ oldfirst, tạo new Node, gán next = oldfirst', patterns: ['oldfirst\\s*=\\s*first', 'new\\s+Node\\s*\\(\\)', 'first\\.next\\s*=\\s*oldfirst'], points: 4, hintIfMissing: 'Push cần lưu oldfirst = first, tạo new Node(), gán item và next = oldfirst.' },
      { id: 'pop', label: 'Pop lấy first.item và dời first = first.next', patterns: ['first\\.item', 'first\\s*=\\s*first\\.next'], points: 4, hintIfMissing: 'Pop cần lấy first.item trước rồi cập nhật first = first.next.' },
    ],
  },
  {
    id: 'linked-queue',
    title: 'LinkedQueue<Item> (Hàng đợi FIFO)',
    topic: 'Stack & Queue',
    week: 'Tuần 3',
    priority: 'Bắt buộc',
    timeComplexity: 'Enqueue: O(1) | Dequeue: O(1)',
    spaceComplexity: '~40N bytes',
    summary: 'Cài Queue bằng 2 con trỏ `first` (đầu ra) và `last` (đuôi vào). Phải xử lý cẩn thận trường hợp rỗng ở cả `enqueue` và `dequeue`.',
    paperTips: [
      'Cạm bẫy kinh điển khi thi giấy: quên `if (isEmpty()) first = last;` trong `enqueue`, và quên `if (isEmpty()) last = null;` trong `dequeue`!',
      'Quy ước đề thi UET: bên phải hoặc đầu `first` là nơi `dequeue`, đọc kỹ quy ước trong đề bài.',
    ],
    javaIdioms: [
      { token: 'private Node first, last;', meaning: 'Khai báo hai biến tham chiếu cùng kiểu Node trên một dòng.' },
      { token: 'if (isEmpty()) last = null;', meaning: 'Tránh rò rỉ bộ nhớ (loitering) khi phần tử cuối cùng vừa bị dequeue.' },
    ],
    starterCode: `public class LinkedQueue<Item> {
    private Node first, last;
    private int n = 0;

    private class Node {
        Item item;
        Node next;
    }

    public boolean isEmpty() { return first == null; }

    public void enqueue(Item item) {
        // Them vao cuoi (last), chu y truong hop rong
    }

    public Item dequeue() {
        // Lay tu dau (first), chu y cap nhat last = null khi rong
        return null;
    }
}`,
    skeletonCode: `public class LinkedQueue<Item> {
    private Node first, last;
    private int n = 0;

    private class Node {
        Item item;
        Node next;
    }

    public boolean isEmpty() { return first == null; }

    public void enqueue(Item item) {
        Node oldlast = last;
        last = new Node();
        last.item = item;
        last.next = null;
        if (isEmpty()) first = ___;
        else           oldlast.next = ___;
        n++;
    }

    public Item dequeue() {
        if (isEmpty()) throw new RuntimeException("Queue underflow");
        Item item = first.item;
        first = ___;
        n--;
        if (isEmpty()) last = ___;
        return item;
    }
}`,
    modelCode: `public class LinkedQueue<Item> {
    private Node first, last;
    private int n = 0;

    private class Node {
        Item item;
        Node next;
    }

    public boolean isEmpty() { return first == null; }

    public void enqueue(Item item) {
        Node oldlast = last;
        last = new Node();
        last.item = item;
        last.next = null;
        if (isEmpty()) first = last;
        else           oldlast.next = last;
        n++;
    }

    public Item dequeue() {
        if (isEmpty()) throw new RuntimeException("Queue underflow");
        Item item = first.item;
        first = first.next;
        n--;
        if (isEmpty()) last = null;
        return item;
    }
}`,
    lineExplanations: [
      { lineRange: '13-16', snippet: 'Node oldlast = last; last = new Node(); ...', javaSyntax: 'Tạo nút mới cho biến last.', algoRole: 'Nút mới luôn nằm ở cuối hàng đợi nên last.next = null.' },
      { lineRange: '17-18', snippet: 'if (isEmpty()) first = last; else oldlast.next = last;', javaSyntax: 'isEmpty() kiểm tra first == null.', algoRole: 'Nếu queue từng rỗng, first cũng phải trỏ vào nút mới; ngược lại nối đuôi cũ tới đuôi mới.' },
      { lineRange: '24-27', snippet: 'first = first.next; if (isEmpty()) last = null;', javaSyntax: 'Cập nhật first trước rồi mới check isEmpty().', algoRole: 'Khi phần tử duy nhất bị xóa, first thành null nên phải đưa last về null.' },
    ],
    rubricChecks: [
      { id: 'enq-empty', label: 'Xử lý isEmpty() trong enqueue (first = last)', patterns: ['if\\s*\\(\\s*isEmpty\\s*\\(\\)\\s*\\)\\s*first\\s*=\\s*last'], points: 3, hintIfMissing: 'Thiếu if (isEmpty()) first = last; khi queue rỗng.' },
      { id: 'enq-link', label: 'Nối oldlast.next = last', patterns: ['oldlast\\.next\\s*=\\s*last'], points: 3, hintIfMissing: 'Cần nối oldlast.next = last ở nhánh else.' },
      { id: 'deq-move', label: 'Dequeue cập nhật first = first.next', patterns: ['first\\s*=\\s*first\\.next'], points: 2, hintIfMissing: 'Dời first = first.next khi lấy phần tử đầu.' },
      { id: 'deq-empty', label: 'Xử lý last = null khi rỗng sau dequeue', patterns: ['if\\s*\\(\\s*isEmpty\\s*\\(\\)\\s*\\)\\s*last\\s*=\\s*null'], points: 2, hintIfMissing: 'Nhớ gán last = null nếu queue trở nên rỗng.' },
    ],
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort (Sắp xếp chọn)',
    topic: 'Elementary Sorts',
    week: 'Tuần 4',
    priority: 'Bắt buộc',
    timeComplexity: 'Best/Avg/Worst: ~N²/2 compares, N exchanges',
    spaceComplexity: 'O(1) in-place | Unstable',
    summary: 'Ở bước i, tìm chỉ số `min` nhỏ nhất trong đoạn [i..N-1], sau đó hoán đổi `a[i]` với `a[min]`.',
    paperTips: [
      'Dù mảng ĐÃ SẮP XẾP sẵn, Selection Sort vẫn tốn ~N²/2 phép so sánh (không nhạy đầu vào).',
      'Ưu điểm: chỉ đổi chỗ tối đa N lần (mỗi vòng ngoài đổi đúng 1 lần) — ít ghi mảng nhất.',
      'KHÔNG ổn định (Unstable): đổi chỗ xa có thể đảo thứ tự hai phần tử bằng nhau (vd: [2a, 2b, 1]).',
    ],
    javaIdioms: [
      { token: 'Comparable[] a', meaning: 'Mảng các đối tượng có thể so sánh bằng phương thức compareTo.' },
      { token: 'less(a[j], a[min])', meaning: 'Hàm trợ giúp viết tắt cho `a[j].compareTo(a[min]) < 0`.' },
      { token: 'exch(a, i, min)', meaning: 'Hoán đổi 2 phần tử tại vị trí i và min trong mảng a.' },
    ],
    starterCode: `public class Selection {
    public static void sort(Comparable[] a) {
        int N = a.length;
        // Duyet i tu 0 den N-1, tim min trong [i..N-1] roi exch(a, i, min)
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable swap = a[i];
        a[i] = a[j];
        a[j] = swap;
    }
}`,
    skeletonCode: `public class Selection {
    public static void sort(Comparable[] a) {
        int N = a.length;
        for (int i = 0; i < N; i++) {
            int min = ___;
            for (int j = ___; j < N; j++) {
                if (less(a[j], a[min])) min = ___;
            }
            exch(a, ___, ___);
        }
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable swap = a[i]; a[i] = a[j]; a[j] = swap;
    }
}`,
    modelCode: `public class Selection {
    public static void sort(Comparable[] a) {
        int N = a.length;
        for (int i = 0; i < N; i++) {
            int min = i;
            for (int j = i + 1; j < N; j++) {
                if (less(a[j], a[min])) min = j;
            }
            exch(a, i, min);
        }
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable swap = a[i];
        a[i] = a[j];
        a[j] = swap;
    }
}`,
    lineExplanations: [
      { lineRange: '2-3', snippet: 'public static void sort(Comparable[] a)', javaSyntax: '`static` gọi trực tiếp qua tên lớp `Selection.sort(a)` không cần `new`.', algoRole: 'Lấy độ dài N = a.length.' },
      { lineRange: '5-7', snippet: 'int min = i; for (int j = i + 1; j < N; j++)', javaSyntax: 'Vòng lặp lồng tìm chỉ số nhỏ nhất.', algoRole: 'Tìm phần tử nhỏ nhất trong phần chưa sắp xếp bên phải i.' },
      { lineRange: '9', snippet: 'exch(a, i, min);', javaSyntax: 'Gọi hàm hoán đổi nằm NGOÀI vòng for j.', algoRole: 'Đưa phần tử nhỏ nhất về đúng vị trí i.' },
    ],
    rubricChecks: [
      { id: 'outer', label: 'Vòng ngoài duyệt i và gán min = i', patterns: ['int\\s+min\\s*=\\s*i'], points: 3, hintIfMissing: 'Đặt int min = i đầu mỗi vòng lặp i.' },
      { id: 'inner', label: 'Vòng trong j từ i+1 đến N cập nhật min = j', patterns: ['j\\s*=\\s*i\\s*\\+\\s*1', 'min\\s*=\\s*j'], points: 4, hintIfMissing: 'So sánh a[j] với a[min], nếu nhỏ hơn thì min = j.' },
      { id: 'swap', label: 'Hoán đổi a[i] và a[min] sau vòng trong', patterns: ['exch\\s*\\(\\s*a\\s*,\\s*i\\s*,\\s*min\\s*\\)', 'a\\[i\\]\\s*=\\s*a\\[min\\]'], points: 3, hintIfMissing: 'Hoán đổi i và min ngoài vòng for j.' },
    ],
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort (Sắp xếp chèn)',
    topic: 'Elementary Sorts',
    week: 'Tuần 4',
    priority: 'Bắt buộc',
    timeComplexity: 'Best: N-1 | Avg: ~N²/4 | Worst: ~N²/2',
    spaceComplexity: 'O(1) in-place | Stable',
    summary: 'Duyệt i từ 0 đến N-1, đẩy ngược a[i] sang trái chừng nào còn nhỏ hơn phần tử đứng trước (j > 0 && less(a[j], a[j-1])).',
    paperTips: [
      'Nếu mảng đã sắp xếp sẵn: chạy tuyến tính N-1 phép so sánh, 0 phép đổi chỗ.',
      'Nếu mảng xếp ngược: tệ nhất ~N²/2 so sánh và ~N²/2 đổi chỗ.',
      'Số lần đổi chỗ đúng bằng số cặp nghịch thế (inversions) trong mảng. Rất hay dùng cho mảng gần như đã sắp xếp hoặc mảng con nhỏ (cutoff của Mergesort/Quicksort)!',
    ],
    javaIdioms: [
      { token: 'j > 0 && less(a[j], a[j-1])', meaning: 'Đánh giá ngắn mạch (short-circuit): phải check `j > 0` TRƯỚC để không bị lỗi ArrayIndexOutOfBounds khi truy cập `a[j-1]`.' },
    ],
    starterCode: `public class Insertion {
    public static void sort(Comparable[] a) {
        int N = a.length;
        // Duyet i tu 0 den N-1, day lui j ve ben trai
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable swap = a[i]; a[i] = a[j]; a[j] = swap;
    }
}`,
    skeletonCode: `public class Insertion {
    public static void sort(Comparable[] a) {
        int N = a.length;
        for (int i = 0; i < N; i++) {
            for (int j = i; j > 0; j--) {
                if (less(a[j], a[___]))
                    exch(a, j, ___);
                else ___;
            }
        }
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable swap = a[i]; a[i] = a[j]; a[j] = swap;
    }
}`,
    modelCode: `public class Insertion {
    public static void sort(Comparable[] a) {
        int N = a.length;
        for (int i = 0; i < N; i++) {
            for (int j = i; j > 0; j--) {
                if (less(a[j], a[j - 1]))
                    exch(a, j, j - 1);
                else
                    break;
            }
        }
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable swap = a[i];
        a[i] = a[j];
        a[j] = swap;
    }
}`,
    lineExplanations: [
      { lineRange: '5', snippet: 'for (int j = i; j > 0; j--)', javaSyntax: 'Vòng lặp lùi từ vị trí i về 1.', algoRole: 'Đoạn [0..i-1] đã có thứ tự, ta chèn a[i] vào đúng khe.' },
      { lineRange: '6-7', snippet: 'if (less(a[j], a[j - 1])) exch(a, j, j - 1);', javaSyntax: 'So sánh phần tử hiện tại với phần tử liền trước.', algoRole: 'Nếu nhỏ hơn (không phải <= nên giữ tính ổn định Stable!), hoán đổi lùi.' },
      { lineRange: '8-9', snippet: 'else break;', javaSyntax: 'Thoát ngay vòng for j bên trong.', algoRole: 'Vì bên trái đã có thứ tự, gặp a[j] >= a[j-1] là dừng ngay -> giúp Best Case đạt O(N).' },
    ],
    rubricChecks: [
      { id: 'loop-j', label: 'Vòng trong j chạy lùi từ i với j > 0', patterns: ['j\\s*=\\s*i', 'j\\s*>\\s*0'], points: 3, hintIfMissing: 'Vòng j phải bắt đầu từ i và điều kiện j > 0.' },
      { id: 'cmp', label: 'So sánh a[j] < a[j-1] và hoán đổi', patterns: ['less\\s*\\(\\s*a\\[j\\]\\s*,\\s*a\\[j\\s*-\\s*1\\]\\s*\\)', 'exch\\s*\\(\\s*a\\s*,\\s*j\\s*,\\s*j\\s*-\\s*1\\s*\\)'], points: 4, hintIfMissing: 'Nếu less(a[j], a[j-1]) thì exch(a, j, j-1).' },
      { id: 'break', label: 'Dừng sớm (break) khi không nhỏ hơn', patterns: ['break', 'less\\(a\\[j\\],\\s*a\\[j\\s*-\\s*1\\]\\)'], points: 3, hintIfMissing: 'Cần else break (hoặc đặt điều kiện less trong while/for) để có Best Case O(N).' },
    ],
  },
  {
    id: 'mergesort',
    title: 'Mergesort (Top-Down + Merge)',
    topic: 'Mergesort',
    week: 'Tuần 5',
    priority: 'Bắt buộc',
    timeComplexity: 'Best/Avg/Worst: <= N lg N compares (~6N lg N array accesses)',
    spaceComplexity: 'O(N) mảng phụ aux[] | Stable',
    summary: 'Chia đôi mảng [lo..hi], đệ quy sắp xếp 2 nửa [lo..mid] và [mid+1..hi], rồi trộn 2 nửa đã sắp xếp qua mảng phụ aux[].',
    paperTips: [
      'Cực hay ra thi phần `merge(a, aux, lo, mid, hi)` — xem đề cuối kỳ 2024-2025 Câu 1!',
      'Nhớ đúng thứ tự 4 nhánh `if / else if` trong `merge`: (1) `i > mid` hết nửa trái -> lấy `aux[j++]`; (2) `j > hi` hết nửa phải -> lấy `aux[i++]`; (3) `less(aux[j], aux[i])` -> lấy `aux[j++]`; (4) `else` -> lấy `aux[i++]`.',
      'Tối ưu hay hỏi: `if (!less(a[mid+1], a[mid])) return;` giúp mảng đã sắp xếp không cần trộn; và cấp phát `aux = new Comparable[a.length]` MỘT lần ở `sort(a)`, KHÔNG cấp phát trong `merge()`!',
    ],
    javaIdioms: [
      { token: 'int mid = lo + (hi - lo) / 2;', meaning: 'Tính chỉ số giữa an toàn (tránh tràn số nguyên `lo + hi`).' },
      { token: 'aux[j++]', meaning: 'Dùng giá trị tại `j` trước, sau đó mới tăng `j` lên 1.' },
    ],
    starterCode: `public class Merge {
    private static void merge(Comparable[] a, Comparable[] aux, int lo, int mid, int hi) {
        // 1. Copy [lo..hi] sang aux[]
        // 2. Tron nguoc tu aux[] ve a[] voi 2 con tro i = lo, j = mid + 1
    }

    private static void sort(Comparable[] a, Comparable[] aux, int lo, int hi) {
        // Chia de quy va goi merge
    }

    public static void sort(Comparable[] a) {
        Comparable[] aux = new Comparable[a.length];
        sort(a, aux, 0, a.length - 1);
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }
}`,
    skeletonCode: `public class Merge {
    private static void merge(Comparable[] a, Comparable[] aux, int lo, int mid, int hi) {
        for (int k = lo; k <= hi; k++)
            aux[k] = a[k];

        int i = lo, j = mid + 1;
        for (int k = lo; k <= hi; k++) {
            if      (i > mid)              a[k] = aux[___];
            else if (j > hi)               a[k] = aux[___];
            else if (less(aux[j], aux[i])) a[k] = aux[___];
            else                           a[k] = aux[___];
        }
    }

    private static void sort(Comparable[] a, Comparable[] aux, int lo, int hi) {
        if (hi <= lo) return;
        int mid = lo + (hi - lo) / 2;
        sort(a, aux, lo, ___);
        sort(a, aux, ___, hi);
        merge(a, aux, lo, mid, hi);
    }

    public static void sort(Comparable[] a) {
        Comparable[] aux = new Comparable[a.length];
        sort(a, aux, 0, a.length - 1);
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }
}`,
    modelCode: `public class Merge {
    private static void merge(Comparable[] a, Comparable[] aux, int lo, int mid, int hi) {
        for (int k = lo; k <= hi; k++)
            aux[k] = a[k];

        int i = lo, j = mid + 1;
        for (int k = lo; k <= hi; k++) {
            if      (i > mid)              a[k] = aux[j++];
            else if (j > hi)               a[k] = aux[i++];
            else if (less(aux[j], aux[i])) a[k] = aux[j++];
            else                           a[k] = aux[i++];
        }
    }

    private static void sort(Comparable[] a, Comparable[] aux, int lo, int hi) {
        if (hi <= lo) return;
        int mid = lo + (hi - lo) / 2;
        sort(a, aux, lo, mid);
        sort(a, aux, mid + 1, hi);
        merge(a, aux, lo, mid, hi);
    }

    public static void sort(Comparable[] a) {
        Comparable[] aux = new Comparable[a.length];
        sort(a, aux, 0, a.length - 1);
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }
}`,
    lineExplanations: [
      { lineRange: '3-4', snippet: 'for (int k = lo; k <= hi; k++) aux[k] = a[k];', javaSyntax: 'Sao chép đoạn đang xét sang mảng phụ aux[].', algoRole: 'Tốn 2*(hi-lo+1) truy nhập mảng cho bước copy.' },
      { lineRange: '6', snippet: 'int i = lo, j = mid + 1;', javaSyntax: 'Khai báo hai chỉ số chạy trên 2 nửa của aux[].', algoRole: 'i duyệt nửa trái [lo..mid], j duyệt nửa phải [mid+1..hi].' },
      { lineRange: '8-11', snippet: 'if (i > mid) ... else if (j > hi) ... else if (less(aux[j], aux[i])) ...', javaSyntax: 'Chuỗi 4 nhánh loại trừ lẫn nhau.', algoRole: 'Nhánh `else` lấy `aux[i++]` khi `aux[i] <= aux[j]` -> giữ nguyên thứ tự gốc => Stable!' },
      { lineRange: '16-20', snippet: 'if (hi <= lo) return; int mid = ...; sort(...); sort(...); merge(...);', javaSyntax: 'Đệ quy chia để trị với base case `hi <= lo`.', algoRole: 'Cây đệ quy có chiều cao lg N, mỗi tầng trộn tốn <= N so sánh.' },
    ],
    rubricChecks: [
      { id: 'copy', label: 'Copy a[lo..hi] sang aux[lo..hi]', patterns: ['aux\\[k\\]\\s*=\\s*a\\[k\\]'], points: 2, hintIfMissing: 'Phải copy đoạn [lo..hi] từ a sang aux trước khi trộn.' },
      { id: 'merge-bounds', label: 'Kiểm tra hết nửa i > mid và j > hi', patterns: ['i\\s*>\\s*mid', 'j\\s*>\\s*hi'], points: 3, hintIfMissing: 'Thiếu điều kiện i > mid hoặc j > hi sẽ gây vượt chỉ số mảng.' },
      { id: 'merge-cmp', label: 'So sánh aux[j] < aux[i] lấy aux[j++] else aux[i++]', patterns: ['aux\\[j\\+\\+\\]', 'aux\\[i\\+\\+\\]'], points: 3, hintIfMissing: 'Nhớ lấy aux[j++] khi aux[j] < aux[i], ngược lại lấy aux[i++] để giữ Stable.' },
      { id: 'recurse', label: 'Điều kiện dừng hi <= lo và gọi 2 đệ quy + merge', patterns: ['hi\\s*<=\\s*lo', 'mid\\s*\\+\\s*1'], points: 2, hintIfMissing: 'Kiểm tra base case if (hi <= lo) return; và gọi sort(lo..mid), sort(mid+1..hi).' },
    ],
  },
  {
    id: 'quicksort',
    title: 'Quicksort + Partition (Hoare)',
    topic: 'Quicksort',
    week: 'Tuần 6',
    priority: 'Bắt buộc',
    timeComplexity: 'Avg: ~1.39 N lg N | Worst: ~N²/2 (nếu không shuffle)',
    spaceComplexity: 'O(lg N) stack đệ quy | In-place | Unstable',
    summary: 'Chọn chốt `a[lo]`, dùng 2 con trỏ `i` (từ lo+1 đi phải) và `j` (từ hi đi trái) phân hoạch mảng thành [< v | v | > v], rồi đệ quy 2 bên.',
    paperTips: [
      'Cực kỳ nhớ `StdRandom.shuffle(a)` trước khi sort để tránh trường hợp xấu nhất O(N²) trên mảng đã sắp xếp!',
      'Trong `partition`: `while (less(a[++i], a[lo])) if (i == hi) break;` và `while (less(a[lo], a[--j])) if (j == lo) break;`. Nhớ kiểm tra `if (i >= j) break;` TRƯỚC `exch(a, i, j);`!',
      'Kết thúc `partition`: đổi chốt `exch(a, lo, j);` (đổi với `j`, KHÔNG phải `i`!) và `return j;`.',
    ],
    javaIdioms: [
      { token: 'a[++i]', meaning: 'Tăng i lên 1 TRƯỚC rồi mới lấy `a[i]` (vì i khởi tạo bằng `lo`).' },
      { token: 'a[--j]', meaning: 'Giảm j đi 1 TRƯỚC rồi mới lấy `a[j]` (vì j khởi tạo bằng `hi + 1`).' },
    ],
    starterCode: `public class Quick {
    private static int partition(Comparable[] a, int lo, int hi) {
        int i = lo, j = hi + 1;
        while (true) {
            // Tim i tu trai >= a[lo], j tu phai <= a[lo]
            // Neu i >= j thi break, nguoc lai exch(a, i, j)
        }
        // Doi chot a[lo] voi a[j] va return j
    }

    private static void sort(Comparable[] a, int lo, int hi) {
        if (hi <= lo) return;
        int j = partition(a, lo, hi);
        sort(a, lo, j - 1);
        sort(a, j + 1, hi);
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable t = a[i]; a[i] = a[j]; a[j] = t;
    }
}`,
    skeletonCode: `public class Quick {
    private static int partition(Comparable[] a, int lo, int hi) {
        int i = lo, j = hi + 1;
        while (true) {
            while (less(a[++i], a[lo]))
                if (i == hi) break;
            while (less(a[lo], a[--j]))
                if (j == lo) break;

            if (i >= ___) break;
            exch(a, i, j);
        }
        exch(a, lo, ___);
        return ___;
    }

    private static void sort(Comparable[] a, int lo, int hi) {
        if (hi <= lo) return;
        int j = partition(a, lo, hi);
        sort(a, lo, ___);
        sort(a, ___, hi);
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable t = a[i]; a[i] = a[j]; a[j] = t;
    }
}`,
    modelCode: `public class Quick {
    private static int partition(Comparable[] a, int lo, int hi) {
        int i = lo, j = hi + 1;
        while (true) {
            while (less(a[++i], a[lo]))
                if (i == hi) break;
            while (less(a[lo], a[--j]))
                if (j == lo) break;

            if (i >= j) break;
            exch(a, i, j);
        }
        exch(a, lo, j);
        return j;
    }

    private static void sort(Comparable[] a, int lo, int hi) {
        if (hi <= lo) return;
        int j = partition(a, lo, hi);
        sort(a, lo, j - 1);
        sort(a, j + 1, hi);
    }

    public static void sort(Comparable[] a) {
        StdRandom.shuffle(a);
        sort(a, 0, a.length - 1);
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
}`,
    lineExplanations: [
      { lineRange: '3', snippet: 'int i = lo, j = hi + 1;', javaSyntax: 'Khởi tạo ngoài biên 1 nấc để tương thích tiền tố `++i` và `--j`.', algoRole: 'Lần lặp đầu tiên i trỏ vào lo+1 và j trỏ vào hi.' },
      { lineRange: '5-8', snippet: 'while (less(a[++i], a[lo])) if (i == hi) break;', javaSyntax: 'Dừng lại khi gặp phần tử >= a[lo] (dù bằng vẫn dừng!).', algoRole: 'Dừng trên phần tử bằng chốt giúp chia đôi đều ngay cả khi có nhiều khóa trùng!' },
      { lineRange: '10-11', snippet: 'if (i >= j) break; exch(a, i, j);', javaSyntax: 'Kiểm tra hai con trỏ đã chạm/vượt nhau chưa.', algoRole: 'Khi i >= j, vùng trái và phải đã tách biệt hoàn toàn.' },
      { lineRange: '13-14', snippet: 'exch(a, lo, j); return j;', javaSyntax: 'Đưa chốt a[lo] vào đúng vị trí j.', algoRole: 'Sau lệnh này: [lo..j-1] <= a[j] <= [j+1..hi].' },
    ],
    rubricChecks: [
      { id: 'ptrs', label: 'Quét ++i và --j với kiểm tra biên hi, lo', patterns: ['\\+\\+i', '--j', 'i\\s*==\\s*hi'], points: 3, hintIfMissing: 'Dùng ++i (dừng khi i == hi) và --j (dừng khi j == lo).' },
      { id: 'cross', label: 'Kiểm tra if (i >= j) break trước exch(a, i, j)', patterns: ['i\\s*>=\\s*j', 'exch\\s*\\(\\s*a\\s*,\\s*i\\s*,\\s*j\\s*\\)'], points: 3, hintIfMissing: 'Phải break khi i >= j trước khi đổi chỗ a[i] và a[j].' },
      { id: 'pivot', label: 'Đưa chốt vào j: exch(a, lo, j) và return j', patterns: ['exch\\s*\\(\\s*a\\s*,\\s*lo\\s*,\\s*j\\s*\\)', 'return\\s+j'], points: 2, hintIfMissing: 'Cuối partition nhớ đổi a[lo] với a[j] và return j.' },
      { id: 'recurse', label: 'Đệ quy sort(a, lo, j-1) và sort(a, j+1, hi)', patterns: ['j\\s*-\\s*1', 'j\\s*\\+\\s*1'], points: 2, hintIfMissing: 'Sắp xếp 2 phía loại trừ vị trí j: [lo..j-1] và [j+1..hi].' },
    ],
  },
];
