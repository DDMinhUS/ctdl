export interface SlideConcept {
  id: string;
  name: string;
  tag: string;
  intuition: string; // Trực giác, giải thích dễ hiểu như giảng viên kèm 1-1
  formulaOrRule: string; // Công thức, bất biến toán học hoặc quy tắc viết giấy
  explanation: string; // Chi tiết kỹ thuật
  codePreview?: string;
  badge?: 'Trọng tâm thi' | 'Dễ mất điểm' | 'Nền tảng' | 'Ăn điểm 10';
  visualType?: 'union-find' | 'memory-box' | 'stack-queue' | 'sort-compare' | 'merge-tree' | 'partition-hoare' | 'heap-array' | 'bst-hibbard' | 'avl-rotations' | 'hash-clustering' | 'graph-bfs-layers';
}

export interface WeekSlideData {
  weekNumber: number;
  title: string;
  subtitle: string;
  slideFileName: string;
  slidePageCount: number;
  summary: string;
  examWeight: string; // Tỷ trọng điểm thi (vd: "1.0 - 1.5 điểm")
  linkedTab: 'codelab' | 'cheatsheet' | 'quiz';
  linkedAlgoId?: string;
  concepts: SlideConcept[];
  javaCodeHighlight: {
    title: string;
    description: string;
    code: string;
  };
  examTraps: {
    trapTitle: string;
    trapDetail: string;
    howToAvoid: string;
  }[];
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  isMidterm?: boolean;
}

export const SLIDE_WEEKS_DATA: WeekSlideData[] = [
  {
    weekNumber: 1,
    title: 'Bài toán Union-Find (Liên thông động)',
    subtitle: 'Dynamic Connectivity, Quick-Find, Quick-Union, Weighted Quick-Union & Path Compression',
    slideFileName: '15UnionFind.pdf',
    slidePageCount: 58,
    summary:
      'Mô hình hóa bài toán kiểm tra xem 2 đối tượng có liên thông với nhau không qua quan hệ tương đương (phản xạ, đối xứng, bắc cầu). Trọng tâm là sự tiến hóa từ Quick-Find O(N) sang Weighted Quick-Union kết hợp Path Compression gần như O(1).',
    examWeight: '1.0 – 1.5 điểm (Code ngắn nhất đề thi)',
    linkedTab: 'codelab',
    linkedAlgoId: 'weighted-quick-union',
    concepts: [
      {
        id: 'w1-c1',
        name: 'Mô hình chi phí & Bài toán Dynamic Connectivity',
        tag: 'Khái niệm',
        badge: 'Nền tảng',
        intuition:
          'Tưởng tượng mạng máy tính hoặc mạng xã hội: mỗi khi có dây nối giữa 2 máy (p, q), ta gọi union(p, q). Khi muốn biết máy A có gửi tin được tới máy B không, ta gọi connected(p, q). Không cần lưu chi tiết đường đi, chỉ cần biết chúng có chung nhóm không.',
        formulaOrRule: 'Quan hệ tương đương: p ~ p; p ~ q <=> q ~ p; p ~ q & q ~ r => p ~ r.',
        explanation:
          'Chi phí thuật toán được đo bằng SỐ LẦN TRUY NHẬP MẢNG (array accesses). Ta cần xử lý N đối tượng với M thao tác union/find xen kẽ nhau khi N và M đều rất lớn.',
        visualType: 'union-find',
      },
      {
        id: 'w1-c2',
        name: 'Quick-Find vs Quick-Union: Điểm yếu chí tử',
        tag: 'So sánh thuật toán',
        badge: 'Dễ mất điểm',
        intuition:
          'Quick-Find giữ cây phẳng đét (mọi nút trỏ thẳng vào nhãn nhóm) -> find cực nhanh O(1), nhưng mỗi lần union phải duyệt cả mảng N ô đổi màu -> M thao tác tốn M*N (chậm cấp số nhân). Ngược lại, Quick-Union chỉ đổi gốc 1 phát -> union nhanh, nhưng nếu gặp cây suy biến thành sợi dây thẳng thì find mất O(N).',
        formulaOrRule: 'Quick-Find union: tối đa 2N + 2 truy nhập mảng. Quick-Union worst-case: chiều cao cây N - 1.',
        explanation:
          'Cả Quick-Find và Quick-Union thường đều quá chậm với tập dữ liệu lớn vì đều có ít nhất 1 thao tác tốn thời gian tuyến tính O(N).',
      },
      {
        id: 'w1-c3',
        name: 'Weighted Quick-Union & Path Compression',
        tag: 'Cải tiến tối ưu',
        badge: 'Trọng tâm thi',
        intuition:
          'Nguyên tắc vàng: Luôn bắt cây ÍT NÚT HƠN làm con của cây NHIỀU NÚT HƠN (dùng mảng sz[] đếm số nút). Cây chỉ tăng chiều cao thêm 1 khi bị ghép vào cây lớn hơn hoặc bằng nó -> kích thước cây tăng ít nhất gấp đôi -> chiều cao tối đa chỉ là log2(N)! Thêm nén đường đi (Path Halving: trỏ cách 1 nút lên ông nội) thì cây gần như phẳng lì.',
        formulaOrRule: 'Độ sâu của bất kỳ nút x nào trong Weighted Quick-Union luôn <= lg N. Với Path Compression: thời gian gần như tuyến tính O(N + M lg* N).',
        explanation:
          'lg* N (hàm log lặp) không bao giờ vượt quá 5 trong vũ trụ thực tế (lg*(2^65536) = 5). Đây là một trong những thuật toán kỳ diệu nhất khoa học máy tính.',
        visualType: 'union-find',
      },
    ],
    javaCodeHighlight: {
      title: 'Mã nguồn sống còn: root(i) có Path Halving và union(p, q)',
      description: 'Chỉ cần đúng 2 hàm này là ăn trọn điểm câu Union-Find khi thi giấy.',
      code: `// Tim goc kem nen duong di mot nua (Path Halving)
private int root(int i) {
    while (i != id[i]) {
        id[i] = id[id[i]]; // Nguon goc cay cuc phang (1 dong duy nhat!)
        i = id[i];
    }
    return i;
}

public void union(int p, int q) {
    int i = root(p);
    int j = root(q);
    if (i == j) return; // Da chung nhom thi thoat som!
    if (sz[i] < sz[j]) { id[i] = j; sz[j] += sz[i]; }
    else               { id[j] = i; sz[i] += sz[j]; }
}`,
    },
    examTraps: [
      {
        trapTitle: 'Quên lưu biến tạm trong Quick-Find',
        trapDetail: 'Viết thẳng `if (id[i] == id[p]) id[i] = id[q];`. Khi vòng lặp chạy tới phần tử p, `id[p]` bị đổi thành `id[q]`, các phần tử sau p sẽ không bao giờ được đổi!',
        howToAvoid: 'Luôn khai báo biến tạm `int pid = id[p]; int qid = id[q];` trước khi vào vòng for.',
      },
      {
        trapTitle: 'Quên `if (i == j) return;` trong Weighted Quick-Union',
        trapDetail: 'Nếu p và q đã cùng một nhóm từ trước, thiếu dòng kiểm tra này sẽ làm mảng `sz[]` bị cộng dồn gấp đôi sai lệch.',
        howToAvoid: 'Sau khi lấy `int i = root(p); int j = root(q);`, lập tức kiểm tra `if (i == j) return;`.',
      },
    ],
    quickCheck: {
      question: 'Với cây Weighted Quick-Union chứa N = 1024 phần tử (không path compression), chiều cao lớn nhất có thể của cây là bao nhiêu?',
      options: ['10 (bằng log2(1024))', '1024 (chuỗi thẳng đứng)', '512 (một nửa số phần tử)', '32 (căn bậc 2 của N)'],
      correctIndex: 0,
      explanation: 'Một nút chỉ tăng độ sâu thêm 1 khi cây chứa nó được gán vào cây có kích thước >= nó (kích thước nhân đôi ít nhất). Do đó độ sâu tối đa là lg(1024) = 10.',
    },
  },
  {
    weekNumber: 2,
    title: 'Phân tích thuật toán & Bộ nhớ Java 64-bit',
    subtitle: 'Mathematical Models, Tilde ~ Notation, Order of Growth & 64-bit JVM Memory Analysis',
    slideFileName: '14AnalysisOfAlgorithms.pdf',
    slidePageCount: 66,
    summary:
      'Phương pháp khoa học trong tin học: Đưa ra mô hình toán học dự đoán thời gian chạy, dùng ký hiệu Tilde (~) giữ lại hệ số cao nhất. Chi tiết cách tính từng byte bộ nhớ đối tượng Java (Object overhead 16B, tham chiếu 8B, mảng 24B, padding bội 8).',
    examWeight: '1.5 – 2.0 điểm (Câu 1 đếm truy nhập mảng & trắc nghiệm bộ nhớ)',
    linkedTab: 'cheatsheet',
    concepts: [
      {
        id: 'w2-c1',
        name: 'Ký hiệu Tilde (~) vs Big-Theta (Θ) vs Big-Oh (O)',
        tag: 'Toán học thuật toán',
        badge: 'Trọng tâm thi',
        intuition:
          'Ký hiệu Big-Oh O(N^2) chỉ cho biết chặn trên và vứt sạch hằng số (không phân biệt 1/2 N^2 hay 100 N^2). Nhưng ký hiệu Tilde ~f(N) giữ lại HỆ SỐ CỦA BẬC CAO NHẤT (ví dụ ~ 1/6 N^3), cho phép dự đoán chính xác thời gian chạy thực tế theo giây!',
        formulaOrRule: 'f(N) ~ g(N) <=> lim (N -> vô cùng) [f(N) / g(N)] = 1.',
        explanation:
          'Slide nhấn mạnh: Big-Oh thường bị hiểu nhầm là mô hình xấp xỉ. Trong môn học này, ta dùng Tilde ~ cho mô hình xấp xỉ chi tiết, và Big-Theta cho bậc tăng trưởng (order of growth).',
        visualType: 'sort-compare',
      },
      {
        id: 'w2-c2',
        name: 'Phân tích bộ nhớ Java 64-bit (Slide trang 62-64)',
        tag: 'Bộ nhớ JVM',
        badge: 'Dễ mất điểm',
        intuition:
          'Mỗi đối tượng trong Java đều tốn phí quản lý (overhead): 16 bytes cho header đối tượng; 8 bytes cho mỗi tham chiếu địa chỉ (reference). Riêng inner class tốn thêm 8 bytes tham chiếu lớp bao ngoài. Cuối cùng, tổng số bytes luôn được làm tròn lên bội số của 8 (Padding).',
        formulaOrRule: 'Mảng 1D: 24 bytes overhead (16 header + 4 length + 4 padding) + N * kích_thước_phần_tử.',
        explanation:
          'Ví dụ tính bộ nhớ `WeightedQuickUnionUF`: 16 (overhead) + 8 (id ref) + 8 (sz ref) + 4 (count int) + 4 (padding) + 2*(24 + 4N) = 8N + 88 bytes ~ 8N bytes!',
        visualType: 'memory-box',
      },
      {
        id: 'w2-c3',
        name: 'Chi phí Node danh sách liên kết = 40 bytes',
        tag: 'Công thức kinh điển',
        badge: 'Ăn điểm 10',
        intuition:
          'Tại sao 1 Node gồm `{ Item item; Node next; }` lại tốn tới 40 bytes? 16 bytes (object overhead) + 8 bytes (tham chiếu item) + 8 bytes (tham chiếu next) + 8 bytes (tham chiếu inner class enclosing) = đúng 40 bytes!',
        formulaOrRule: 'LinkedStack chứa N phần tử dùng ~ 40N bytes bộ nhớ (chưa kể bản thân dữ liệu Item).',
        explanation:
          'Đây là câu hỏi trắc nghiệm và tự luận cực kỳ phổ biến trong đề thi của Princeton và UET.',
        visualType: 'memory-box',
      },
    ],
    javaCodeHighlight: {
      title: 'Quy tắc tính bộ nhớ chuẩn slide Robert Sedgewick',
      description: 'Ghi nhớ bảng này để giải quyết mọi câu hỏi tính bytes bộ nhớ.',
      code: `Kiểu dữ liệu nguyên thủy:
- boolean, byte : 1 byte
- char, short   : 2 bytes
- int, float    : 4 bytes
- long, double  : 8 bytes

Quy tắc đối tượng 64-bit:
- Object overhead: 16 bytes
- Reference (con trỏ): 8 bytes
- Mảng overhead: 24 bytes (16 object + 4 length + 4 padding)
- Inner class: +8 bytes (tham chiếu tới outer instance)
- Padding: bội số của 8 bytes`,
    },
    examTraps: [
      {
        trapTitle: 'Nhầm lẫn giữa số phép so sánh và số lần truy nhập mảng',
        trapDetail: 'Đề hỏi "số lần truy nhập mảng" của 1 vòng for mà lại trả lời số phép so sánh `a[i] < a[j]`. Mỗi phép so sánh `a[i] < a[j]` đọc mảng 2 LẦN!',
        howToAvoid: 'Đọc kỹ từ khóa: "compares" (phép so sánh) hay "array accesses" (truy nhập mảng).',
      },
      {
        trapTitle: 'Quên tính mảng đối tượng chỉ chứa tham chiếu',
        trapDetail: 'Khởi tạo `String[] a = new String[N];` chỉ tạo mảng N tham chiếu (8N + 24 bytes), chưa hề tạo bất kỳ chuỗi String nào trong bộ nhớ!',
        howToAvoid: 'Phân biệt "Shallow memory" (bộ nhớ nông) và "Deep memory" (tính đệ quy đối tượng được trỏ tới).',
      },
    ],
    quickCheck: {
      question: 'Một mảng `double[] a = new double[N];` trên JVM 64-bit tiêu tốn bao nhiêu bytes bộ nhớ?',
      options: ['~ 8N + 24 bytes', '~ 4N + 16 bytes', '~ 8N + 16 bytes', '~ 16N + 32 bytes'],
      correctIndex: 0,
      explanation: 'Mỗi phần tử kiểu `double` tốn 8 bytes. Overhead của mảng trong Java 64-bit là 24 bytes (16B header + 4B length + 4B padding). Tổng là 8N + 24 bytes.',
    },
  },
  {
    weekNumber: 3,
    title: 'Ngăn xếp (Stack) & Hàng đợi (Queue)',
    subtitle: 'Linked List, Resizing Arrays, Generics, Iterators & Loitering',
    slideFileName: '13StacksAndQueues.pdf',
    slidePageCount: 52,
    summary:
      'Hai cấu trúc dữ liệu nền tảng nhất: Stack (LIFO) và Queue (FIFO). So sánh chuyên sâu giữa cài đặt Danh sách liên kết (mọi thao tác O(1) worst-case nhưng tốn bộ nhớ ~40N) và Mảng co giãn (ít tốn bộ nhớ ~8N đến ~32N, O(1) amortized, nhân 2 khi đầy và giảm 1/2 khi đầy đúng 1/4).',
    examWeight: '1.5 – 2.0 điểm (Câu 2 vẽ vết ngăn xếp/hàng đợi hoặc đảo ngược)',
    linkedTab: 'codelab',
    linkedAlgoId: 'linked-queue',
    concepts: [
      {
        id: 'w3-c1',
        name: 'Stack & Queue: Danh sách liên kết đơn',
        tag: 'Cấu trúc dữ liệu',
        badge: 'Trọng tâm thi',
        intuition:
          'Stack: Thêm ở đầu, lấy ở đầu (chỉ cần 1 con trỏ `first`). Queue: Thêm ở đuôi (`last`), lấy ở đầu (`first`). Lưu ý trường hợp rỗng: khi queue rỗng mà enqueue thì cả first và last đều trỏ vào nút mới; khi dequeue nút cuối cùng thì phải gán cả `last = null;`.',
        formulaOrRule: 'Tất cả thao tác push, pop, enqueue, dequeue đều O(1) worst-case thời gian.',
        explanation:
          'Trong đề thi cuối kỳ UET 2024-2025 Câu 2b: Yêu cầu đảo ngược Queue bằng 1 Stack. Cách làm: Dequeue toàn bộ đẩy vào Stack (đảo thứ tự), rồi Pop toàn bộ enqueue ngược lại Queue!',
        visualType: 'stack-queue',
      },
      {
        id: 'w3-c2',
        name: 'Mảng co giãn (Resizing Array) & Ngưỡng 1/4',
        tag: 'Kỹ thuật tối ưu',
        badge: 'Dễ mất điểm',
        intuition:
          'Tại sao không giảm kích thước khi mảng đầy đúng 1/2? Nếu mảng đang đầy n, ta push (nhân đôi 2n), rồi pop (giảm nửa n), rồi push (nhân đôi 2n)... mảng sẽ bị "thở dốc" (thrashing) liên tục tốn O(N) mỗi bước! Bằng cách đợi mảng giảm xuống đúng 1/4 dung lượng mới thu nhỏ về 1/2, ta đảm bảo mảng luôn có độ đệm, chi phí trung bình (amortized) chỉ là O(1)!',
        formulaOrRule: 'Khi đầy (N == a.length): resize(2 * a.length). Khi N > 0 && N == a.length / 4: resize(a.length / 2).',
        explanation:
          'Mảng co giãn sử dụng từ ~8N bytes (khi đầy 100%) đến ~32N bytes (khi chỉ chứa 25% dung lượng).',
        visualType: 'memory-box',
      },
      {
        id: 'w3-c3',
        name: 'Khái niệm "Loitering" (Lưu luyến rác)',
        tag: 'Bản chất Java',
        badge: 'Nền tảng',
        intuition:
          'Trong Java, Garbage Collector (bộ thu gom rác) chỉ giải phóng bộ nhớ khi không còn bất kỳ biến nào trỏ tới đối tượng đó. Khi pop phần tử trong mảng mà chỉ viết `return s[--N];` thì ô `s[N]` vẫn ngầm giữ con trỏ tới đối tượng cũ, khiến bộ nhớ không thể giải phóng! Ta phải viết `s[N] = null;` để xóa con trỏ lưu luyến.',
        formulaOrRule: 'Tránh loitering: `Item item = s[--N]; s[N] = null; return item;`',
        explanation: 'Khái niệm Loitering cực hay được hỏi trong các câu hỏi trắc nghiệm lý thuyết của Sedgewick.',
      },
    ],
    javaCodeHighlight: {
      title: 'Mã nguồn Queue bằng Danh sách liên kết (Chú ý 2 nhánh rỗng)',
      description: 'Lỗi mất điểm phổ biến nhất trên giấy thi là quên gán first hoặc last khi queue rỗng.',
      code: `public void enqueue(Item item) {
    Node oldlast = last;
    last = new Node();
    last.item = item;
    last.next = null;
    if (isEmpty()) first = last; // Queue tung rong: first phai tro vao last!
    else           oldlast.next = last;
}

public Item dequeue() {
    Item item = first.item;
    first = first.next;
    if (isEmpty()) last = null; // Khong de last luu luyen tro vao nut cu!
    return item;
}`,
    },
    examTraps: [
      {
        trapTitle: 'Quên `if (isEmpty()) last = null;` khi dequeue',
        trapDetail: 'Khi phần tử cuối cùng bị lấy ra, `first` thành `null` nhưng `last` vẫn trỏ vào nút cũ vừa bị xóa (loitering).',
        howToAvoid: 'Sau `first = first.next;`, luôn kiểm tra `if (isEmpty()) last = null;`.',
      },
      {
        trapTitle: 'Nhầm lẫn thứ tự đầu ra của Queue trong đề thi',
        trapDetail: 'Đề thi UET thường ghi chú rõ: "Quy ước bên phải là đầu ra của queue". Đọc không kỹ quy ước này sẽ viết ngược toàn bộ chuỗi trạng thái câu 2a!',
        howToAvoid: 'Đọc kỹ dòng chữ in nghiêng trong đề thi để biết đầu nào là enqueue, đầu nào là dequeue.',
      },
    ],
    quickCheck: {
      question: 'Một mảng co giãn chứa n số double, tăng gấp 4 khi đầy và giảm một nửa khi chỉ chứa 1/3 dung lượng. Kích thước bộ nhớ mảng xấu nhất là bao nhiêu?',
      options: ['~ 24n bytes', '~ 8n bytes', '~ 32n bytes', '~ 16n bytes'],
      correctIndex: 0,
      explanation: 'Mỗi double tốn 8 bytes. Trường hợp xấu nhất xảy ra ngay trước khi thu nhỏ: dung lượng mảng M xấp xỉ 3n. Bộ nhớ = 3n * 8 = 24n bytes (Câu 5b đề COS226 s25).',
    },
  },
  {
    weekNumber: 4,
    title: 'Các thuật toán sắp xếp cơ bản (Elementary Sorts)',
    subtitle: 'Selection Sort, Insertion Sort, Shellsort & Knuth Shuffling',
    slideFileName: '21ElementarySorts.pdf',
    slidePageCount: 46,
    summary:
      'Quy ước Comparable & compareTo trong Java. So sánh chi tiết Selection Sort (luôn ~N^2/2 so sánh, nhưng chỉ đúng N lần đổi chỗ) và Insertion Sort (phụ thuộc đầu vào: đã xếp tốn N-1 so sánh, 0 đổi chỗ; số lần đổi chỗ bằng đúng số cặp nghịch thế). Giới thiệu Shellsort bước nhảy 3x+1.',
    examWeight: '1.0 – 1.5 điểm (Trắc nghiệm tính ổn định Stable & bài toán mảng gần có thứ tự)',
    linkedTab: 'codelab',
    linkedAlgoId: 'insertion-sort',
    concepts: [
      {
        id: 'w4-c1',
        name: 'Selection Sort: Không nhạy cảm đầu vào',
        tag: 'Thuật toán sắp xếp',
        badge: 'Dễ mất điểm',
        intuition:
          'Mỗi bước i, dò tìm phần tử nhỏ nhất từ i đến cuối mảng rồi đổi chỗ với a[i]. Dù mảng đã sắp xếp sẵn hay đảo ngược, thuật toán vẫn ngây thơ duyệt hết mọi cặp: luôn tốn đúng ~N^2/2 so sánh. Điểm mạnh duy nhất: chỉ đổi chỗ đúng N lần.',
        formulaOrRule: 'Compares: ~ 1/2 N^2 cho mọi trường hợp. Exchanges: đúng N lần. Tính ổn định: KHÔNG ổn định (Unstable).',
        explanation: 'Selection Sort hoán đổi hai phần tử ở khoảng cách xa qua đầu các phần tử khác, do đó làm đảo lộn thứ tự tương đối của các phần tử bằng nhau.',
        visualType: 'sort-compare',
      },
      {
        id: 'w4-c2',
        name: 'Insertion Sort: Vô địch cho mảng gần có thứ tự',
        tag: 'Thuật toán sắp xếp',
        badge: 'Trọng tâm thi',
        intuition:
          'Giống như xếp bài tây trên tay: cầm lá bài mới, lùi dần sang trái và chèn vào đúng khe. Nếu mảng đã có thứ tự sẵn: chỉ so sánh 1 lần với lá liền trước rồi dừng ngay (Best case O(N)!). Số lần đổi chỗ bằng ĐÚNG SỐ CẶP NGHỊCH THẾ (inversions).',
        formulaOrRule: 'Best: N - 1 compares, 0 exchanges. Worst: ~ 1/2 N^2 compares và exchanges. Tính ổn định: CÓ ổn định (Stable).',
        explanation:
          'Một mảng là "partially sorted" nếu số nghịch thế <= c N. Insertion Sort chạy trong thời gian tuyến tính O(N) trên các mảng này. Đây là lý do Mergesort và Quicksort luôn chuyển sang Insertion Sort cho mảng con nhỏ (cutoff <= 10).',
        visualType: 'sort-compare',
      },
      {
        id: 'w4-c3',
        name: 'Knuth Shuffle (Tráo ngẫu nhiên O(N) đều đặn)',
        tag: 'Thuật toán ngẫu nhiên',
        badge: 'Ăn điểm 10',
        intuition:
          'Để xáo bài công bằng trong O(N): duyệt i từ 0 đến N-1, chọn ngẫu nhiên số nguyên r trong đoạn [0, i] (hoặc [i, N-1]), đổi chỗ a[i] và a[r]. Tuyệt đối KHÔNG chọn r ngẫu nhiên trong toàn bộ [0, N-1] vì sẽ gây ra thiên vị (bias, không đều)!',
        formulaOrRule: 'Mọi hoán vị N! đều có xác suất xuất hiện bằng nhau 1 / N! trong thời gian đúng tuyến tính Θ(N).',
        explanation: 'Knuth Shuffle là tiền đề cốt lõi bắt buộc phải chạy trước Quicksort để phá vỡ thế trận xấu nhất của dữ liệu.',
      },
    ],
    javaCodeHighlight: {
      title: 'Mã nguồn Insertion Sort chuẩn: Dừng sớm (else break) giữ Stable',
      description: 'Chú ý toán tử so sánh ít hơn nghiêm ngặt `<` để đảm bảo tính ổn định.',
      code: `public static void sort(Comparable[] a) {
    int N = a.length;
    for (int i = 0; i < N; i++) {
        for (int j = i; j > 0; j--) {
            if (less(a[j], a[j - 1])) {
                exch(a, j, j - 1);
            } else {
                break; // Dung som khi da dung vi tri -> giup Best Case dat O(N)!
            }
        }
    }
}`,
    },
    examTraps: [
      {
        trapTitle: 'Khẳng định Selection Sort chạy nhanh hơn khi mảng đã sắp xếp',
        trapDetail: 'Đây là cái bẫy kinh điển nhất! Selection Sort không có cơ chế dừng sớm, thời gian chạy hoàn toàn không phụ thuộc vào thứ tự ban đầu của mảng.',
        howToAvoid: 'Nhớ câu thần chú: Selection Sort KHÔNG nhạy cảm với đầu vào (input-insensitive).',
      },
      {
        trapTitle: 'Dùng `a[i] <= a[j]` làm mất tính Stable',
        trapDetail: 'Trong Insertion Sort, nếu đổi chỗ cả khi bằng nhau (`<=`), hai phần tử bằng nhau sẽ bị hoán vị cho nhau, biến thuật toán thành Unstable.',
        howToAvoid: 'Chỉ hoán đổi khi thực sự nhỏ hơn nghiêm ngặt: `less(a[j], a[j-1])`.',
      },
    ],
    quickCheck: {
      question: 'Thuật toán sắp xếp nào sau đây có số lần hoán đổi (exchanges) trong trường hợp xấu nhất là TUYẾN TÍNH O(N)?',
      options: ['Selection Sort', 'Insertion Sort', 'Quicksort', 'Mergesort'],
      correctIndex: 0,
      explanation: 'Selection Sort chỉ thực hiện đúng 1 lần hoán đổi ở mỗi vòng lặp ngoài, tổng cộng không quá N lần đổi chỗ trong mọi trường hợp!',
    },
  },
  {
    weekNumber: 5,
    title: 'Sắp xếp trộn (Mergesort) & Cận dưới sắp xếp',
    subtitle: 'Divide-and-Conquer, Counting Array Accesses, Sorting Lower Bound Ω(N lg N) & Stability',
    slideFileName: '22Mergesort.pdf',
    slidePageCount: 57,
    summary:
      'Thuật toán chia để trị kinh điển: chia đôi mảng, sắp xếp đệ quy, trộn 2 nửa bằng mảng phụ aux[]. Đếm chính xác số lần truy nhập mảng hàm merge (~4N đến ~6N). Chứng minh định lý cận dưới so sánh bằng Cây quyết định: mọi thuật toán so sánh đều tốn ít nhất ~N lg N.',
    examWeight: '2.0 – 2.5 điểm (Chắc chắn có: Câu 1 đếm truy nhập mảng & trắc nghiệm cận dưới)',
    linkedTab: 'codelab',
    linkedAlgoId: 'mergesort',
    concepts: [
      {
        id: 'w5-c1',
        name: 'Đếm số lần truy nhập mảng hàm merge() (Đề UET 2024-2025 Câu 1)',
        tag: 'Mô hình chi phí Tilde',
        badge: 'Trọng tâm thi',
        intuition:
          'Vòng lặp 1: copy a sang aux tốn 1 đọc + 1 ghi = 2N truy nhập. Vòng lặp 2: trộn từ aux về a tốn N lần lặp. Trường hợp tồi nhất: 2 nửa xen kẽ nhau -> mỗi bước phải đọc 2 lần so sánh `aux[j] < aux[i]` + đọc gán `a[k] = aux[...]` = 4N truy nhập. Tổng tồi nhất: 2N + 4N = ~6N! Trường hợp tốt nhất: 1 nửa hết sớm sau N/2 bước -> nửa sau không cần so sánh nữa -> tổng ~5N (đáp án chấm chấp nhận ~4N đến ~6N).',
        formulaOrRule: 'Mergesort toàn bộ mảng N phần tử tốn <= 6 N lg N lần truy nhập mảng và <= N lg N phép so sánh.',
        explanation: 'Cả trường hợp tốt nhất và tồi nhất đều có thời gian chạy tuyến tính Θ(N) cho một lần merge.',
        visualType: 'merge-tree',
      },
      {
        id: 'w5-c2',
        name: 'Cận dưới lý thuyết sắp xếp: Cây quyết định (Decision Tree)',
        tag: 'Lý thuyết thuật toán',
        badge: 'Ăn điểm 10',
        intuition:
          'Một mảng N phần tử có N! hoán vị kết quả khác nhau. Mỗi phép so sánh dạng câu hỏi Có/Không (chia đôi). Một cây nhị phân chiều cao h có tối đa 2^h lá. Để chứa đủ N! lá kết quả, chiều cao h phải thỏa mãn 2^h >= N! => h >= lg(N!) ~ N lg N (theo công thức Stirling).',
        formulaOrRule: 'Mọi thuật toán sắp xếp dựa trên so sánh đều phải thực hiện ít nhất lg(N!) ~ N lg N phép so sánh trong trường hợp xấu nhất.',
        explanation:
          'LƯU Ý BẪY: Cận dưới chỉ áp dụng khi CÁC KHÓA PHÂN BIỆT và DỰA TRÊN SO SÁNH. Nếu chỉ có 4 giá trị khóa, ta hoàn toàn có thể sắp xếp trong thời gian tuyến tính O(N) bằng 3-way partition hoặc counting sort!',
      },
      {
        id: 'w5-c3',
        name: 'Tính ổn định (Stability) của Mergesort',
        tag: 'Tính chất thuật toán',
        badge: 'Trọng tâm thi',
        intuition:
          'Thuật toán ổn định giữ nguyên thứ tự ban đầu của hai phần tử có khóa bằng nhau. Trong Mergesort, khi `aux[i]` và `aux[j]` bằng nhau, nhánh `else a[k] = aux[i++];` sẽ ưu tiên lấy phần tử bên nửa TRÁI (nửa đứng trước ban đầu). Do đó Mergesort TUYỆT ĐỐI ỔN ĐỊNH.',
        formulaOrRule: 'Stable sorts: Insertion Sort, Mergesort. Unstable sorts: Selection Sort, Shellsort, Quicksort, Heapsort.',
        explanation: 'Mẹo nhớ: "In-Merge" là ổn định (Insertion và Merge). Còn lại hầu hết là không ổn định.',
      },
    ],
    javaCodeHighlight: {
      title: 'Mã nguồn hàm merge chuẩn: 4 nhánh loại trừ nhau',
      description: 'Nhớ thứ tự kiểm tra biên trước rồi mới so sánh phần tử.',
      code: `private static void merge(Comparable[] a, Comparable[] aux, int lo, int mid, int hi) {
    // 1. Sao chep sang mang phu (2 * N array accesses)
    for (int k = lo; k <= hi; k++) aux[k] = a[k];

    // 2. Tron nguoc ve mang chinh
    int i = lo, j = mid + 1;
    for (int k = lo; k <= hi; k++) {
        if      (i > mid)              a[k] = aux[j++]; // Het nua trai
        else if (j > hi)               a[k] = aux[i++]; // Het nua phai
        else if (less(aux[j], aux[i])) a[k] = aux[j++]; // Nua phai nho hon
        else                           a[k] = aux[i++]; // Nua trai <= nua phai (giu Stable!)
    }
}`,
    },
    examTraps: [
      {
        trapTitle: 'Khởi tạo mảng phụ aux[] bên trong hàm đệ quy merge()',
        trapDetail: 'Viết `Comparable[] aux = new Comparable[hi - lo + 1];` trong merge sẽ liên tục cấp phát bộ nhớ rác trong đệ quy, làm chậm chương trình nghiêm trọng.',
        howToAvoid: 'Luôn khởi tạo `aux = new Comparable[a.length];` duy nhất một lần ở hàm ngoài `sort(a)` và truyền aux qua các lời gọi đệ quy.',
      },
      {
        trapTitle: 'Quên nhánh `less(aux[j], aux[i])` để nhánh `else` lấy nửa trái',
        trapDetail: 'Nếu viết `less(aux[i], aux[j])` lấy `aux[i++]`, khi hai khóa bằng nhau nhánh else sẽ lấy `aux[j++]` (nửa phải), làm mất hoàn toàn tính ổn định của Mergesort!',
        howToAvoid: 'Luôn viết `less(aux[j], aux[i])` để trường hợp bằng nhau rơi vào nhánh `else a[k] = aux[i++];`.',
      },
    ],
    quickCheck: {
      question: 'Sắp xếp một mảng n phần tử mà các khóa chỉ gồm 4 giá trị phân biệt. Có thể sắp xếp với không quá 4n phép so sánh trong trường hợp tồi nhất được không?',
      options: ['ĐƯỢC (không vi phạm cận dưới vì chỉ có 4 giá trị khóa)', 'KHÔNG ĐƯỢC (vì cận dưới luôn là Ω(n log n))', 'KHÔNG ĐƯỢC (vì phải tốn ít nhất 16n so sánh)', 'ĐƯỢC nhưng chỉ với thuật toán ngẫu nhiên'],
      correctIndex: 0,
      explanation: 'Đúng! Cận dưới Ω(n log n) chỉ áp dụng khi n khóa là phân biệt. Với 4 giá trị, ta có thể so sánh mỗi phần tử với tối đa 3 mốc để phân vào 4 nhóm trong không quá 3n phép so sánh <= 4n (Câu 5c Midterm f25).',
    },
  },
  {
    weekNumber: 6,
    title: 'Sắp xếp nhanh (Quicksort) & Phân hoạch 3 phía',
    subtitle: 'Hoare Partitioning, Shuffling, Quickselect in O(N), 3-Way Partitioning (Dutch National Flag)',
    slideFileName: '23Quicksort.pdf',
    slidePageCount: 64,
    summary:
      'Thuật toán sắp xếp nhanh nhất trên thực tế: Phân hoạch Hoare với 2 con trỏ ++i và --j. Bắt buộc Shuffle trước khi sort để đảm bảo O(N lg N) với xác suất cực cao. Biến thể Quickselect tìm phần tử thứ k trong thời gian tuyến tính O(N). Phân hoạch 3 phía (Dijkstra 3-way) tối ưu entropy khi mảng có nhiều khóa trùng.',
    examWeight: '1.5 – 2.0 điểm (Code partition và giải thích dừng trên phần tử bằng chốt)',
    linkedTab: 'codelab',
    linkedAlgoId: 'quicksort',
    concepts: [
      {
        id: 'w6-c1',
        name: 'Phân hoạch Hoare: Dừng trên khóa BẰNG chốt',
        tag: 'Cơ chế cốt lõi',
        badge: 'Trọng tâm thi',
        intuition:
          'Con trỏ i quét từ trái qua tìm phần tử >= chốt; con trỏ j quét từ phải qua tìm phần tử <= chốt. Câu hỏi triệu đô: Khi gặp phần tử BẰNG chốt thì dừng hay đi tiếp? BẮT BUỘC DỪNG CẢ HAI BÊN VÀ ĐỔI CHỖ! Nếu không dừng, khi mảng toàn các phần tử bằng nhau (ví dụ [7, 7, 7, 7]), chốt sẽ bị dồn lệch hoàn toàn về 1 bên -> thuật toán suy biến thành O(N^2)! Dừng lại giúp chốt rơi vào chính giữa mảng -> chia đều O(N lg N).',
        formulaOrRule: 'Average compares: ~ 2 N ln N ≈ 1.39 N lg N (~ 1/3 N ln N exchanges). Worst case: ~ 1/2 N^2 (khi không shuffle).',
        explanation: 'Partitioning chia mảng thành: a[lo..j-1] <= a[j] <= a[j+1..hi]. Chốt a[j] đã nằm ở vị trí cố định cuối cùng.',
        visualType: 'partition-hoare',
      },
      {
        id: 'w6-c2',
        name: 'Quickselect: Tìm phần tử nhỏ thứ k trong O(N)',
        tag: 'Thuật toán mở rộng',
        badge: 'Ăn điểm 10',
        intuition:
          'Để tìm trung vị (median) hoặc phần tử nhỏ thứ k, ta KHÔNG cần sắp xếp cả mảng! Sau khi partition được chốt j: nếu j == k, xong ngay! Nếu j > k, chỉ đệ quy sang nửa trái. Nếu j < k, chỉ đệ quy sang nửa phải. Tổng công việc: N + N/2 + N/4 + ... <= 2N phép so sánh!',
        formulaOrRule: 'Quickselect chạy trong thời gian TUYẾN TÍNH TRUNG BÌNH ~ 2N (với k = N/2 trung bình ~ (2 + 2 ln 2) N ≈ 3.38 N).',
        explanation: 'Được áp dụng trực tiếp trong Câu 6 Đề thi cuối kỳ UET 2024-2025: Tìm điểm của thí sinh đứng hạng k.',
      },
      {
        id: 'w6-c3',
        name: '3-Way Partitioning (Cờ Hà Lan Dijkstra)',
        tag: 'Tối ưu khóa trùng',
        badge: 'Nền tảng',
        intuition:
          'Chia mảng thành 3 khúc rõ rệt: `< v`, `= v`, và `> v`. Dùng 3 con trỏ `lt`, `i`, `gt`. Các phần tử bằng chốt được gom vào giữa một lần duy nhất và không bao giờ phải sờ tới nữa. Khi mảng chỉ có vài giá trị khóa trùng, thuật toán đạt tốc độ ánh sáng O(N) (entropy-optimal)!',
        formulaOrRule: 'Thời gian chạy tỷ lệ thuận với N * Entropy thông tin của dữ liệu. Nếu chỉ có số lượng hằng số khóa phân biệt: chạy O(N).',
        explanation: 'Đây là thuật toán phân hoạch được cài đặt làm chuẩn trong thư viện Arrays.sort của Java.',
      },
    ],
    javaCodeHighlight: {
      title: 'Mã nguồn Partition chuẩn của Robert Sedgewick',
      description: 'Ghi nhớ cách khởi tạo i = lo, j = hi + 1 và đổi chỗ với j ở cuối.',
      code: `private static int partition(Comparable[] a, int lo, int hi) {
    int i = lo, j = hi + 1;
    Comparable v = a[lo]; // Chot nam o lo
    while (true) {
        while (less(a[++i], v)) if (i == hi) break; // Dung khi >= v
        while (less(v, a[--j])) if (j == lo) break; // Dung khi <= v
        if (i >= j) break;                          // Con tro cham nhau thi thoat
        exch(a, i, j);
    }
    exch(a, lo, j); // Doi chot ve vi tri dung cua no la j!
    return j;
}`,
    },
    examTraps: [
      {
        trapTitle: 'Đổi chốt nhầm với `i` thay vì `j`',
        trapDetail: 'Khi vòng lặp kết thúc, `i >= j`, vùng bên trái `j` luôn `<= v`, nên đổi `a[lo]` với `a[j]` mới đúng. Đổi với `a[i]` sẽ đưa phần tử lớn hơn chốt về đầu mảng!',
        howToAvoid: 'Luôn kết thúc bằng `exch(a, lo, j); return j;`.',
      },
      {
        trapTitle: 'Quên kiểm tra `if (i >= j) break;` trước khi `exch(a, i, j)`',
        trapDetail: 'Nếu không break ngay khi hai con trỏ vượt nhau, bạn sẽ hoán đổi 2 phần tử đã được phân vùng đúng, phá hỏng toàn bộ cấu trúc.',
        howToAvoid: 'Đặt `if (i >= j) break;` nằm ngay trước lệnh `exch(a, i, j);`.',
      },
    ],
    quickCheck: {
      question: 'Tại sao Quicksort lại dừng cả 2 con trỏ khi gặp phần tử BẰNG giá trị chốt thay vì tiếp tục chạy qua?',
      options: [
        'Để đảm bảo mảng được chia đôi đều đặn khi có nhiều khóa trùng (tránh suy biến O(N²))',
        'Để giữ cho thuật toán có tính ổn định (Stable)',
        'Để giảm số lần đổi chỗ xuống bằng 0',
        'Để tránh lỗi tràn chỉ số mảng',
      ],
      correctIndex: 0,
      explanation: 'Nếu bỏ qua phần tử bằng chốt, trên mảng toàn phần tử bằng nhau chốt sẽ nằm ở mép mảng, tạo thành cây đệ quy suy biến sâu N tầng tốn O(N²) thời gian!',
    },
  },
  {
    weekNumber: 7,
    title: 'Hàng đợi ưu tiên (Priority Queues) & Heapsort',
    subtitle: 'Binary Heap, swim & sink, insert & delMax, Bottom-up Heap Construction in <= 2N compares',
    slideFileName: '24PriorityQueues.pdf',
    slidePageCount: 68,
    summary:
      'Biểu diễn cây nhị phân hoàn chỉnh trên mảng 1-based (cha k/2, con 2k và 2k+1). Hai thao tác nền tảng: swim (bơi lên) và sink (chìm xuống). Xây heap từ dưới lên (bottom-up) cực kỳ thần kỳ: chỉ tốn <= 2N phép so sánh (tuyến tính!). Thuật toán Heapsort: vừa O(N lg N) worst-case vừa In-place O(1) bộ nhớ.',
    examWeight: '2.0 – 2.5 điểm (Chắc chắn có: Câu 3 minh họa từng bước thêm 10 và xóa Max)',
    linkedTab: 'codelab',
    linkedAlgoId: 'max-pq',
    concepts: [
      {
        id: 'w7-c1',
        name: 'Biểu diễn Heap 1-based & Thứ tự bộ phận',
        tag: 'Cấu trúc dữ liệu',
        badge: 'Trọng tâm thi',
        intuition:
          'Không cần dùng con trỏ cây! Đặt vào mảng 1-based: gốc ở vị trí 1. Nút k có cha ở `k/2`, con trái ở `2k`, con phải ở `2k+1`. Nút lá bắt đầu từ `N/2 + 1` đến N. Tính chất duy nhất: Nút cha luôn lớn hơn hoặc bằng các con của nó. Chú ý: KHÔNG CÓ THỨ TỰ GIỮA CÁC NHÁNH ANH EM!',
        formulaOrRule: 'Insert: <= 1 + lg N so sánh. delMax: <= 2 lg N so sánh (1 so sánh 2 con + 1 so sánh với cha).',
        explanation: 'Trong đề thi COS226: Một nút ở độ sâu 2 hoàn toàn có thể NHỎ HƠN một nút ở độ sâu 4 nếu chúng nằm ở 2 nhánh khác nhau!',
        visualType: 'heap-array',
      },
      {
        id: 'w7-c2',
        name: 'Mô phỏng tay Insert & delMax (Đề UET 2024-2025 Câu 3)',
        tag: 'Kỹ năng thi giấy',
        badge: 'Trọng tâm thi',
        intuition:
          'Thêm key (Insert): Gắn vào đuôi mảng tại vị trí N+1, rồi cho nó "bơi lên" (`swim`): so với cha `k/2`, lớn hơn thì đổi chỗ tới khi gặp gốc hoặc cha >= nó. Xóa Max (delMax): Lấy gốc 1 ra, bốc phần tử cuối cùng ở vị trí N đặt lên gốc 1, giảm N đi 1, rồi cho nó "chìm xuống" (`sink`): so sánh 2 con `2k` và `2k+1`, chọn CON LỚN HƠN để đổi chỗ với cha.',
        formulaOrRule: 'Ví dụ [9, 8, 7, 2, 4, 3]: Thêm 10 vào vị trí 7 -> đổi 7 (vị trí 3) -> đổi 9 (vị trí 1) => [10, 8, 9, 2, 4, 3, 7]. delMax: đổi 3 lên gốc 1 -> đổi 8 (vị trí 2) -> đổi 4 (vị trí 5) => [8, 4, 7, 2, 3].',
        explanation: 'Nhớ luôn dùng tab "Tổng kết & Mô phỏng" -> Max-Heap Simulator để tự kiểm chứng lại từng bước vẽ.',
        visualType: 'heap-array',
      },
      {
        id: 'w7-c3',
        name: 'Xây Heap Bottom-up chỉ tốn O(N) (<= 2N compares)',
        tag: 'Độ phức tạp tinh vi',
        badge: 'Ăn điểm 10',
        intuition:
          'Tại sao duyệt k từ N/2 lùi về 1 gọi `sink(k)` lại chỉ tốn O(N) mà không phải N log N? Vì đa số các nút trong heap nằm ở tầng dưới cùng (nửa số nút là lá, chiều cao 0 không tốn bước nào; 1/4 số nút có chiều cao 1 chỉ tốn 1 bước...). Tổng chuỗi: N/4 * 1 + N/8 * 2 + N/16 * 3 + ... hội tụ về <= 2N!',
        formulaOrRule: 'Xây dựng Heap: <= 2N compares và <= N exchanges. Sắp xếp Heapsort toàn bộ: <= 2N lg N compares.',
        explanation: 'Heapsort là thuật toán duy nhất vừa đảm bảo O(N lg N) worst-case vừa In-place O(1) bộ nhớ (không cần mảng phụ aux như Mergesort).',
      },
    ],
    javaCodeHighlight: {
      title: 'Mã nguồn Heapsort hoàn chỉnh: Pha 1 xây Heap, Pha 2 rút Max',
      description: 'Lưu ý vòng for pha 1 bắt đầu từ N/2 lùi về 1.',
      code: `public static void sort(Comparable[] pq) {
    int N = pq.length;
    // Pha 1: Xay Max-Heap bottom-up chi mat O(N) (<= 2N compares)
    for (int k = N / 2; k >= 1; k--)
        sink(pq, k, N);

    // Pha 2: Rut tung phan tu Max ve cuoi mang (Sortdown)
    while (N > 1) {
        exch(pq, 1, N--); // Doi max (goc 1) voi phan tu cuoi heap va giam N
        sink(pq, 1, N);   // Khoi phuc Max-Heap cho phan tu con lai
    }
}`,
    },
    examTraps: [
      {
        trapTitle: 'Trong `sink()`, quên kiểm tra con phải có tồn tại không trước khi so sánh 2 con',
        trapDetail: 'Viết `if (less(j, j+1)) j++;` mà không có điều kiện `j < N` sẽ làm chương trình truy xuất phần tử ngoài biên mảng khi nút chỉ có đúng 1 con trái.',
        howToAvoid: 'Luôn viết: `if (j < N && less(j, j + 1)) j++;`.',
      },
      {
        trapTitle: 'Nhầm lẫn Heap có tính thứ tự toàn phần giữa các anh em',
        trapDetail: 'Nghĩ rằng nút ở độ sâu nhỏ hơn thì chắc chắn có giá trị lớn hơn nút ở độ sâu lớn hơn. Sai hoàn toàn!',
        howToAvoid: 'Quan hệ lớn hơn trong Heap chỉ đúng trên cùng một nhánh tổ tiên - con cháu.',
      },
    ],
    quickCheck: {
      question: 'Cho Max-Heap nhị phân hiện nằm trong mảng [9, 8, 7, 2, 4, 3]. Sau khi thực hiện delMax(), mảng kết quả là gì?',
      options: ['[8, 4, 7, 2, 3]', '[8, 3, 7, 2, 4]', '[8, 7, 4, 2, 3]', '[7, 8, 3, 2, 4]'],
      correctIndex: 0,
      explanation: 'Đổi gốc 9 với phần tử cuối 3 -> [3, 8, 7, 2, 4]. Sink 3: so sánh con 8 và 7, chọn 8 -> đổi 3 và 8 -> [8, 3, 7, 2, 4]. Sink 3 tiếp: so sánh con 2 và 4, chọn 4 -> đổi 3 và 4 -> [8, 4, 7, 2, 3] (Câu 3b đề UET 2024-2025).',
    },
  },
  {
    weekNumber: 8,
    title: 'Ôn tập giữa kỳ & Kỹ năng giải đề thi giấy',
    subtitle: 'Tổng kết 7 tuần đầu: Phân loại bài toán, Kỹ thuật viết code không bị trừ điểm, Chiến thuật phân bổ 90 phút',
    slideFileName: 'Bài tập ôn tập tổng hợp.docx',
    slidePageCount: 30,
    summary:
      'Chặng nghỉ chiến lược chuẩn bị cho kiểm tra giữa kỳ và tổng duyệt kỹ năng thi giấy. Chiến thuật 5 phần khi làm bài tự luận: Mô hình hóa, Cấu trúc dữ liệu, Mã giả / Java, Minh họa vết ví dụ, Đánh giá độ phức tạp.',
    examWeight: 'Trọng tâm đạt điểm 9-10 (Tránh bẫy trình bày)',
    linkedTab: 'quiz',
    concepts: [
      {
        id: 'w8-c1',
        name: 'Chiến thuật làm bài thi tự luận 90 phút UET',
        tag: 'Phương pháp thi cử',
        badge: 'Trọng tâm thi',
        intuition:
          'Đề thi cuối kỳ UET thường dài 3 trang gồm 7-8 câu. Câu 1 (1.5đ - độ phức tạp), Câu 2 (2đ - Stack/Queue), Câu 3 (1.5đ - Heap), Câu 4 (2đ - BST/AVL), Câu 5 (2đ - Bảng băm) là các câu PHẢI LÀM TRƯỚC để nắm chắc 7-8 điểm trong 50 phút đầu. Các câu thiết kế thuật toán (Câu 6-8) làm ở 40 phút cuối.',
        formulaOrRule: 'Tối ưu thời gian: 5 câu đầu = 10 phút/câu. Không bao giờ sa đà 25 phút vào 1 câu đồ thị khó lúc đầu giờ.',
        explanation: 'Nắm vững quy ước viết trên giấy: đặt tên biến rõ ràng, chú thích điều kiện dừng đệ quy, không viết tắt vô căn cứ.',
      },
      {
        id: 'w8-c2',
        name: 'Mẹo vẽ hình trung gian ăn trọn điểm',
        tag: 'Kỹ năng thi giấy',
        badge: 'Dễ mất điểm',
        intuition:
          'Đề thi UET Câu 4b luôn ghi rõ: "Vẽ các tình trạng trung gian để thấy các công đoạn xoay chỉnh cho cân bằng nếu có". Nếu bạn chỉ cặm cụi tính nhẩm rồi vẽ mỗi cái cây cuối cùng vào giấy thi, bạn sẽ bị TRỪ 50% SỐ ĐIỂM của câu đó!',
        formulaOrRule: 'Mỗi khi chèn làm mất cân bằng: Vẽ cây trước xoay -> Ghi rõ tên phép xoay (LL/RR/LR/RL) -> Vẽ cây ngay sau khi xoay.',
        explanation: 'Giảng viên chấm thi chấm theo từng bước biến đổi hình vẽ, không chỉ nhìn đáp số cuối.',
      },
    ],
    javaCodeHighlight: {
      title: 'Khung cấu trúc bài giải thuật toán 9-10 điểm chuẩn UET',
      description: 'Luôn trình bày đủ 5 mục này cho các câu thiết kế (như Đảo quốc X hay UniStack).',
      code: `1. Mô hình hóa bài toán:
   - Tập đỉnh V biểu diễn cái gì? Tập cạnh E biểu diễn cái gì?
   - Đồ thị có hướng hay vô hướng? Có trọng số hay không?

2. Cấu trúc dữ liệu sử dụng:
   - Biểu diễn đồ thị bằng Danh sách kề (Bag<Integer>[] adj).
   - Biến phụ trợ: marked[], edgeTo[], distTo[], Queue / Stack.

3. Thuật toán chi tiết (Mã giả / Java):
   - Nêu rõ điều kiện khởi tạo nguồn s.
   - Thân vòng lặp duyệt đỉnh kề.

4. Minh họa chạy thử trên ví dụ đề bài:
   - Liệt kê trạng thái từng bước.

5. Đánh giá độ phức tạp:
   - Thời gian: O(V + E)
   - Bộ nhớ: O(V + E)`,
    },
    examTraps: [
      {
        trapTitle: 'Chỉ ghi kết quả cuối cùng mà không vẽ bước trung gian',
        trapDetail: 'Bị trừ từ 0.5 đến 1.0 điểm vì thang điểm chấm giấy chia nhỏ theo từng bước trung gian.',
        howToAvoid: 'Luôn vẽ ít nhất 1 hình cây/mảng trung gian tại thời điểm diễn ra biến đổi quan trọng (như xoay cây, sink heap, rehash).',
      },
    ],
    quickCheck: {
      question: 'Khi làm bài vẽ cây AVL trên giấy thi, điều nào sau đây là quan trọng nhất để không bị trừ điểm?',
      options: [
        'Vẽ đầy đủ các tình trạng trung gian và ghi rõ tên phép xoay (LL, RR, LR, RL)',
        'Chỉ cần vẽ mỗi cây kết quả thật đẹp bằng thước kẻ',
        'Vẽ theo thứ tự giảm dần thay vì tăng dần',
        'Bỏ qua hệ số cân bằng balance factor',
      ],
      correctIndex: 0,
      explanation: 'Đề thi yêu cầu rõ "vẽ các tình trạng trung gian để thấy các công đoạn xoay chỉnh", đây là tiêu chí chấm điểm bắt buộc của UET.',
    },
  },
  {
    weekNumber: 9,
    title: 'Bảng tra cứu (Symbol Tables) & Cây tìm kiếm nhị phân (BST)',
    subtitle: 'Sequential Search, Binary Search in Ordered Array, BST get/put/min/floor/Hibbard Deletion',
    slideFileName: '32BinarySearchTrees.pdf',
    slidePageCount: 36,
    summary:
      'Cấu trúc Symbol Table (Key-Value). Tìm kiếm tuần tự O(N) vs Tìm kiếm nhị phân trên mảng O(log N search nhưng O(N) insert). Cây tìm kiếm nhị phân (BST): kết hợp tốc độ tìm kiếm nhanh của mảng và tốc độ chèn nhanh của liên kết. Kỹ thuật đệ quy gán ngược `x.left = put(...)` và phép xóa Hibbard Deletion.',
    examWeight: '2.0 điểm (Câu 4a vẽ cây BST thường & câu hỏi phép xóa)',
    linkedTab: 'codelab',
    linkedAlgoId: 'bst',
    concepts: [
      {
        id: 'w9-c1',
        name: 'Định nghĩa BST & Kỹ thuật đệ quy gán ngược',
        tag: 'Cấu trúc dữ liệu',
        badge: 'Trọng tâm thi',
        intuition:
          'BST: Mọi khóa bên cây con trái đều nhỏ hơn khóa nút hiện tại, mọi khóa bên cây con phải đều lớn hơn. Trong hàm `put(Node x, Key key, Value val)`, tại sao phải viết `x.left = put(x.left, key, val); return x;`? Vì khi đi xuống gặp null, nút mới được tạo ra ở đáy đệ quy; lệnh gán này tự động nối nút mới vào cha nó khi đệ quy quay lui lên!',
        formulaOrRule: 'Duyệt Inorder (Trái -> Gốc -> Phải) trên BST luôn cho một dãy khóa TĂNG DẦN.',
        explanation: 'Thời gian tìm kiếm và chèn trung bình: ~ 2 ln N ≈ 1.39 lg N. Chiều cao kỳ vọng: ~ 4.311 ln N. Trường hợp xấu nhất (chèn theo thứ tự tăng/giảm): suy biến thành danh sách sâu N tầng O(N).',
        visualType: 'bst-hibbard',
      },
      {
        id: 'w9-c2',
        name: 'Phép xóa Hibbard Deletion (Xóa nút có 2 con)',
        tag: 'Giải thuật kinh điển',
        badge: 'Ăn điểm 10',
        intuition:
          'Xóa nút 0 con (lá): gán null. Xóa nút 1 con: nối cha nó thẳng vào đứa con duy nhất. Nhưng xóa nút có CẢ 2 CON thì lấy ai thế chỗ? Ta tìm NÚT KẾ VỊ (successor): chính là phần tử NHỎ NHẤT BÊN CÂY CON PHẢI (`min(t.right)`). Đưa nút này lên thay thế nút cần xóa, rồi xóa nó khỏi vị trí cũ bằng `deleteMin(t.right)`.',
        formulaOrRule: '`Node t = x; x = min(t.right); x.right = deleteMin(t.right); x.left = t.left;`',
        explanation: 'Khuyết điểm của Hibbard: việc luôn chọn nút kế vị bên phải làm cây bị mất cân bằng bất đối xứng về bên trái sau nhiều phép chèn/xóa liên tiếp, chiều cao suy biến về O(sqrt(N)).',
        visualType: 'bst-hibbard',
      },
    ],
    javaCodeHighlight: {
      title: 'Mã nguồn Hibbard Deletion chuẩn trong giáo trình algs4',
      description: 'Lưu lại biến tạm t trước khi gán x = min(t.right).',
      code: `public void delete(Key key) { root = delete(root, key); }

private Node delete(Node x, Key key) {
    if (x == null) return null;
    int cmp = key.compareTo(x.key);
    if      (cmp < 0) x.left  = delete(x.left, key);
    else if (cmp > 0) x.right = delete(x.right, key);
    else {
        if (x.right == null) return x.left;  // 0 hoac 1 con trai
        if (x.left == null)  return x.right; // 0 hoac 1 con phai
        // 2 con: thay bang phan tu nho nhat ben phai (successor)
        Node t = x;
        x = min(t.right);
        x.right = deleteMin(t.right);
        x.left = t.left;
    }
    x.count = size(x.left) + size(x.right) + 1;
    return x;
}`,
    },
    examTraps: [
      {
        trapTitle: 'Quên cập nhật lại `x.count` hoặc chiều cao trên đường quay lui',
        trapDetail: 'Sau khi chèn hoặc xóa, số lượng phần tử `count` ở tất cả các nút tổ tiên phải được cập nhật lại.',
        howToAvoid: 'Luôn đặt `x.count = 1 + size(x.left) + size(x.right); return x;` ở cuối hàm đệ quy.',
      },
      {
        trapTitle: 'Vẽ nhầm nhánh cây BST thường từ dãy số',
        trapDetail: 'Đề cho dãy: 80, 20, 40, 30, 10, 100, 70, 90, 50. Số đầu tiên 80 là gốc, 20 nhỏ hơn rẽ trái, 40 lớn hơn 20 rẽ phải 20... Không được sắp xếp dãy trước khi vẽ!',
        howToAvoid: 'Cứ lấy từng số từ trái sang phải của đề bài, đi từ gốc xuống theo luật < rẽ trái, > rẽ phải.',
      },
    ],
    quickCheck: {
      question: 'Khi thực hiện phép xóa Hibbard trên một nút có 2 con trong BST, nút nào sẽ được đưa lên thay thế vị trí nút bị xóa?',
      options: [
        'Nút nhỏ nhất bên cây con phải (hoặc nút lớn nhất bên cây con trái)',
        'Nút con bên trái của nó',
        'Nút gốc của toàn bộ cây',
        'Một nút lá ngẫu nhiên',
      ],
      correctIndex: 0,
      explanation: 'Nút thay thế phải là nút có giá trị liền kề (kế vị successor: min của cây con phải, hoặc tiền nhiệm predecessor: max của cây con trái) để duy trì tính chất BST.',
    },
  },
  {
    weekNumber: 10,
    title: 'Cây tìm kiếm cân bằng (AVL, LLRB) & Bảng băm',
    subtitle: '2-3 Trees, Left-Leaning Red-Black (LLRB), AVL Rotations (LL, RR, LR, RL), Separate Chaining & Linear Probing',
    slideFileName: '33BalancedSearchTrees.pdf & 33Z_AVLTrees.ppt',
    slidePageCount: 60,
    summary:
      'Đỉnh cao của CTDL có thứ tự: Cây 2-3 và biểu diễn nhị phân tương đương LLRB (3 dòng chuẩn hóa rotateLeft, rotateRight, flipColors đảm bảo chiều cao <= 2 lg N). Cây AVL kiểm soát hệ số cân bằng |bf| <= 1 qua 4 phép xoay LL, RR, LR, RL. Bảng băm: băm phân tán (h(x) = x mod M), Separate Chaining giải quyết đụng độ bằng danh sách, Linear Probing bằng mảng hở (chú ý hiện tượng dồn cục primary clustering).',
    examWeight: '3.0 – 4.0 điểm (Câu 4b xoay cây AVL & Câu 5 bảng băm)',
    linkedTab: 'codelab',
    linkedAlgoId: 'avl-tree',
    concepts: [
      {
        id: 'w10-c1',
        name: 'Cây AVL: 4 Phép xoay chuẩn hóa (Đề UET 2024-2025 Câu 4b)',
        tag: 'Cây cân bằng',
        badge: 'Trọng tâm thi',
        intuition:
          'Hệ số cân bằng bf(x) = height(left) - height(right). Khi |bf| = 2 là mất cân bằng! 4 ca: 1) LL (lệch Trái-Trái, bf > 1 và bf(con trái) >= 0): Xoay phải đơn tại x. 2) RR (lệch Phải-Phải, bf < -1 và bf(con phải) <= 0): Xoay trái đơn tại x. 3) LR (lệch Trái-Phải, bf > 1 và bf(con trái) < 0): Xoay trái tại con trái, rồi Xoay phải tại x. 4) RL (lệch Phải-Trái, bf < -1 và bf(con phải) > 0): Xoay phải tại con phải, rồi Xoay trái tại x.',
        formulaOrRule: 'Chiều cao cây AVL luôn được đảm bảo nghiêm ngặt: h <= 1.44 lg N (chặt hơn LLRB <= 2 lg N).',
        explanation: 'Ví dụ đề UET chèn 80, 20, 40: tại 80 bị lệch Trái-Phải (LR) -> xoay trái 20 rồi xoay phải 80 -> Gốc mới là 40!',
        visualType: 'avl-rotations',
      },
      {
        id: 'w10-c2',
        name: 'LLRB: Cây Đỏ-Đen nghiêng trái (3 dòng thần thánh)',
        tag: 'Cây cân bằng',
        badge: 'Trọng tâm thi',
        intuition:
          'Ánh xạ 1-1 với cây 2-3: liên kết ĐỎ biểu diễn hai khóa nằm chung một "nút 3". Quy ước Sedgewick: Liên kết đỏ CHỈ NGHIÊNG TRÁI, không có 2 đỏ liên tiếp. Khi chèn đệ quy xong, trên đường quay lui chạy đúng 3 câu lệnh if độc lập: 1) Đỏ nghiêng phải -> rotateLeft. 2) Hai đỏ liên tiếp bên trái -> rotateRight. 3) Cả 2 con đều đỏ -> flipColors.',
        formulaOrRule: 'Bất biến: Mọi đường từ gốc đến con trỏ null đều có đúng số liên kết ĐEN bằng nhau (Black balance). Chiều cao <= 2 lg N.',
        explanation: 'Sau khi chèn ở gốc ngoài cùng, luôn gán `root.color = BLACK;`.',
      },
      {
        id: 'w10-c3',
        name: 'Bảng băm: Separate Chaining vs Linear Probing (Đề UET Câu 5)',
        tag: 'Bảng băm',
        badge: 'Trọng tâm thi',
        intuition:
          'Separate Chaining: Mỗi ô của bảng M là 1 danh sách liên kết. Đụng độ cứ móc thêm vào danh sách. Hệ số tải alpha = N/M có thể >= 1. Linear Probing: Toàn bộ nằm trên 1 mảng kích thước M. Đụng độ thì dò tuần tự sang ô kế tiếp (i + 1) % M. Hệ số tải BẮT BUỘC alpha = N/M < 1 (algs4 giữ alpha <= 1/2). Nếu alpha = 1 (11 phần tử vào mảng 11 ô) như đề 2024-2025, Linear Probing sẽ bị dồn cục nặng (primary clustering), các khóa sau phải dò rất nhiều bước!',
        formulaOrRule: 'Hàm băm Java chuẩn: `(key.hashCode() & 0x7fffffff) % M` (mặt nạ xóa bit dấu âm).',
        explanation: 'Đề UET cho h(x) = x mod 11: 34%11=1, 45%11=1, 14%11=3, 11%11=0, 0%11=0... Separate Chaining vượt trội hơn hẳn Linear Probing khi bảng đầy.',
        visualType: 'hash-clustering',
      },
    ],
    javaCodeHighlight: {
      title: 'Mã nguồn 3 dòng chuẩn hóa LLRB & Phép băm triệt tiêu số âm',
      description: 'Hai đoạn mã hay xuất hiện nhất trong các đề thi lý thuyết và thực hành.',
      code: `// 1. Ba dong chuan hoa LLRB (put quay lui tu duoi len)
if (isRed(h.right) && !isRed(h.left))     h = rotateLeft(h);
if (isRed(h.left)  && isRed(h.left.left)) h = rotateRight(h);
if (isRed(h.left)  && isRed(h.right))     flipColors(h);

// 2. Ham bam Java chuan (tranh so am Integer.MIN_VALUE)
private int hash(Key key) {
    return (key.hashCode() & 0x7fffffff) % M;
}`,
    },
    examTraps: [
      {
        trapTitle: 'Dùng `Math.abs(key.hashCode()) % M` thay vì `& 0x7fffffff`',
        trapDetail: 'Trong Java, `Math.abs(Integer.MIN_VALUE)` vẫn trả về chính số âm `Integer.MIN_VALUE` do tràn số! Khi chia lấy dư `% M` sẽ ra chỉ số mảng âm, gây crash `ArrayIndexOutOfBoundsException`!',
        howToAvoid: 'Luôn dùng phép AND bit với 31 số 1: `(key.hashCode() & 0x7fffffff) % M`.',
      },
      {
        trapTitle: 'Xóa phần tử trong Linear Probing bằng cách gán `null`',
        trapDetail: 'Nếu gán thẳng ô bị xóa = null, chuỗi dò tuyến tính phía sau sẽ bị đứt đoạn, khiến hàm get() không bao giờ tìm thấy các khóa băm đụng độ đứng sau nó nữa.',
        howToAvoid: 'Phải re-hash (put lại) toàn bộ các khóa nằm liên tiếp trong cụm ngay sau ô vừa xóa.',
      },
    ],
    quickCheck: {
      question: 'Khi chèn liên tiếp các khóa: 80, 20, 40 vào cây AVL rỗng, tại nút 80 xảy ra trường hợp mất cân bằng nào và cần xử lý ra sao?',
      options: [
        'Lệch LR (Trái-Phải) -> Xoay trái tại 20, sau đó Xoay phải tại 80',
        'Lệch LL (Trái-Trái) -> Xoay phải đơn tại 80',
        'Lệch RR (Phải-Phải) -> Xoay trái đơn tại 80',
        'Lệch RL (Phải-Trái) -> Xoay phải tại 40, sau đó Xoay trái tại 80',
      ],
      correctIndex: 0,
      explanation: '80 có con trái 20 (cao 1), 20 có con phải 40 (cao 0). bf(80) = +2 và bf(20) = -1 -> Lệch Trái-Phải (LR). Ta xoay trái tại 20 biến thành chuỗi thẳng 80 -> 40 -> 20, rồi xoay phải tại 80 -> Gốc mới là 40 (Câu 4b Đề UET 2024-2025).',
    },
  },
  {
    weekNumber: 11,
    title: 'Lý thuyết đồ thị (Graphs): DFS, BFS & Mô hình hóa',
    subtitle: 'Adjacency List, Depth-First Search, Breadth-First Search, Connected Components, Topological Sort & Đảo quốc X',
    slideFileName: 'Học liệu & Bài tập mẫu',
    slidePageCount: 45,
    summary:
      'Biểu diễn đồ thị bằng Danh sách kề `Bag<Integer>[] adj` tối ưu thời gian O(V + E) và bộ nhớ O(V + E). Thuật toán DFS (dùng đệ quy/Stack) tìm đường đi, thành phần liên thông, chu trình. Thuật toán BFS (dùng Queue) tìm ĐƯỜNG ĐI NGẮN NHẤT ÍT CẠNH NHẤT. Bài toán thực tế Đảo quốc X (Câu 7 Đề UET 2024-2025).',
    examWeight: '2.0 – 2.5 điểm (Câu 7-8 chốt điểm cao đề thi cuối kỳ)',
    linkedTab: 'codelab',
    linkedAlgoId: 'graph-dfs-bfs',
    concepts: [
      {
        id: 'w11-c1',
        name: 'Danh sách kề (Adjacency List) vs Ma trận kề (Adjacency Matrix)',
        tag: 'Biểu diễn đồ thị',
        badge: 'Trọng tâm thi',
        intuition:
          'Đồ thị thực tế thường rất thưa (E << V^2). Dùng ma trận kề V x V sẽ lãng phí O(V^2) bộ nhớ và duyệt đỉnh kề luôn tốn O(V) dù đỉnh chỉ có 1 cạnh. Dùng Danh sách kề: mỗi đỉnh lưu 1 danh sách các đỉnh nối với nó -> bộ nhớ đúng O(V + E), duyệt kề đúng bằng bậc của đỉnh!',
        formulaOrRule: 'Danh sách kề: Bộ nhớ O(V + E), duyệt DFS/BFS tốn thời gian O(V + E). Ma trận kề: Bộ nhớ O(V^2), thời gian O(V^2).',
        explanation: 'Trong Java, biểu diễn bằng mảng các Bag: `Bag<Integer>[] adj = (Bag<Integer>[]) new Bag[V];`.',
        visualType: 'graph-bfs-layers',
      },
      {
        id: 'w11-c2',
        name: 'BFS: Tìm đường ngắn nhất & Quy tắc "Đánh dấu trước khi Enqueue"',
        tag: 'Thuật toán tìm kiếm',
        badge: 'Dễ mất điểm',
        intuition:
          'BFS loang ra từng lớp khoảng cách: lớp 0 (nguồn s, dist=0), lớp 1 (các đỉnh kề s, dist=1), lớp 2 (kề lớp 1, dist=2)... Vì đi theo từng lớp cạnh tăng dần nên đỉnh nào được thăm trước CHẮC CHẮN có đường đi ít cạnh nhất! LƯU Ý SỐNG CÒN: Phải gán `marked[w] = true;` NGAY KHI `q.enqueue(w)`! Nếu chờ lấy ra khỏi queue mới đánh dấu, các đỉnh kề khác sẽ đẩy đỉnh w vào queue nhiều lần gây tràn bộ nhớ!',
        formulaOrRule: 'Queue FIFO, mảng boolean `marked[V]`, mảng truy vết `edgeTo[V]`, mảng khoảng cách `distTo[V]`.',
        explanation: 'Áp dụng cho Câu 7 Đảo quốc X: Tìm chặng bay chuyển quân ít nhất từ đảo 0 đến tất cả các đảo còn lại.',
        visualType: 'graph-bfs-layers',
      },
      {
        id: 'w11-c3',
        name: 'Mô hình hóa bài toán thực tế (Đảo quốc X & Đa nguồn)',
        tag: 'Thiết kế thuật toán',
        badge: 'Ăn điểm 10',
        intuition:
          'Câu 7: Đồ thị không trọng số, bay từng chặng = 1 đơn vị -> Đường đi ngắn nhất = ít chặng nhất -> Dùng BFS đơn nguồn từ đỉnh 0. Câu 8: Quân đóng ở M đảo lớn (nhiều nguồn) -> Kỹ thuật Multi-source BFS: Đẩy TẤT CẢ M đỉnh nguồn vào Queue ngay từ đầu với `distTo = 0` và `marked = true`! Hoặc tạo 1 "đỉnh ảo" S nối tới M đỉnh nguồn bằng cạnh trọng số 0.',
        formulaOrRule: 'Multi-source BFS / Dijkstra giải quyết bài toán tìm khoảng cách ngắn nhất tới tập nguồn gần nhất trong cùng độ phức tạp O(V + E)!',
        explanation: 'Đây là câu hỏi phân loại 9-10 điểm trong đề thi cuối kỳ UET năm học 2024-2025.',
      },
    ],
    javaCodeHighlight: {
      title: 'Mã nguồn BFS chuẩn algs4: Đánh dấu marked[w] = true ngay khi enqueue',
      description: 'Lưu đỉnh cha trong edgeTo[w] = v để truy vết lại đường đi bằng Stack.',
      code: `private void bfs(Graph G, int s) {
    Queue<Integer> q = new Queue<Integer>();
    marked[s] = true;
    distTo[s] = 0;
    q.enqueue(s);

    while (!q.isEmpty()) {
        int v = q.dequeue();
        for (int w : G.adj(v)) {
            if (!marked[w]) {
                edgeTo[w] = v;          // Luu vet cha
                distTo[w] = distTo[v] + 1; // Khoang cach tang 1 chang
                marked[w] = true;       // BAT BUOC danh dau truoc khi enqueue!
                q.enqueue(w);
            }
        }
    }
}`,
    },
    examTraps: [
      {
        trapTitle: 'Đồ thị vô hướng nhưng chỉ thêm cạnh 1 chiều',
        trapDetail: 'Viết `adj[v].add(w);` mà quên `adj[w].add(v);`. Đồ thị vô hướng là quan hệ 2 chiều, thiếu 1 chiều sẽ làm mất kết nối khi duyệt từ w về v.',
        howToAvoid: 'Trong hàm `addEdge(int v, int w)` của đồ thị vô hướng: luôn gọi cả 2 dòng `adj[v].add(w); adj[w].add(v);`.',
      },
      {
        trapTitle: 'Dùng DFS để tìm đường đi ngắn nhất trên đồ thị không trọng số',
        trapDetail: 'DFS đi sâu hết một nhánh rồi mới quay lui, đường đi tìm thấy ĐẦU TIÊN của DFS KHÔNG PHẢI là đường đi ngắn nhất!',
        howToAvoid: 'Đường đi ngắn nhất ít cạnh nhất (không trọng số) BẮT BUỘC dùng BFS.',
      },
    ],
    quickCheck: {
      question: 'Trong thuật toán BFS, tại sao bắt buộc phải gán `marked[w] = true;` ngay trước hoặc khi `q.enqueue(w)` thay vì chờ lúc `dequeue()`?',
      options: [
        'Để ngăn chặn việc một đỉnh bị đẩy vào Queue nhiều lần từ các đỉnh lân cận khác nhau',
        'Để thuật toán chạy theo thứ tự tô-pô',
        'Vì Java không cho phép đánh dấu sau khi dequeue',
        'Để giảm bộ nhớ của mảng edgeTo',
      ],
      correctIndex: 0,
      explanation: 'Nếu chờ dequeue mới đánh dấu, trong lúc w nằm trong queue, các đỉnh khác kề w cũng sẽ thấy w chưa marked và tiếp tục enqueue w nhiều lần, làm bùng nổ kích thước queue và thời gian chạy.',
    },
  },
  {
    weekNumber: 12,
    title: 'Mở rộng: Cây khung nhỏ nhất (MST) & Đường đi ngắn nhất (Dijkstra)',
    subtitle: 'Min Spanning Tree (Kruskal & Prim with IndexMinPQ), Dijkstra Shortest Paths & Câu 8 đề thi UET',
    slideFileName: 'Cấu trúc dữ liệu giải thuật - Bài giảng.docx',
    slidePageCount: 40,
    summary:
      'Chương nâng cao cuối cùng của học phần: Bài toán Cây khung nhỏ nhất (MST) trên đồ thị có trọng số vô hướng dùng giải thuật Kruskal (kết hợp Union-Find kiểm tra chu trình) và Prim. Thuật toán Dijkstra tìm đường đi ngắn nhất trên đồ thị trọng số không âm dùng IndexMinPQ, tiền đề cho Câu 8 Đề thi UET.',
    examWeight: '1.0 – 1.5 điểm (Câu phân loại điểm 10 cuối kỳ)',
    linkedTab: 'cheatsheet',
    concepts: [
      {
        id: 'w12-c1',
        name: 'Định lý Cắt (Cut Property) & Thuật toán Kruskal',
        tag: 'Cây khung nhỏ nhất',
        badge: 'Trọng tâm thi',
        intuition:
          'Một "lát cắt" chia tập đỉnh thành 2 nửa. Định lý cắt: Cạnh có trọng số nhỏ nhất nối giữa 2 nửa CHẮC CHẮN thuộc về Cây khung nhỏ nhất (MST). Giải thuật Kruskal cực kỳ thanh lịch: Sắp xếp tất cả các cạnh theo trọng số tăng dần. Lần lượt nhặt từng cạnh nhỏ nhất: nếu 2 đầu mút chưa liên thông (kiểm tra bằng Union-Find `!uf.connected(u, v)`), ta nạp cạnh đó vào MST và gọi `uf.union(u, v)`. Đủ V-1 cạnh thì dừng!',
        formulaOrRule: 'Kruskal tốn thời gian O(E log E) cho bước sắp xếp cạnh. Bộ nhớ O(E).',
        explanation: 'Sử dụng cấu trúc dữ liệu Union-Find đã học ở Tuần 1 để phát hiện chu trình trong O(1).',
      },
      {
        id: 'w12-c2',
        name: 'Thuật toán Dijkstra & Bài toán Đảo quốc X có thời gian bay (Câu 8)',
        tag: 'Đường đi ngắn nhất',
        badge: 'Ăn điểm 10',
        intuition:
          'Dijkstra là phiên bản mở rộng của BFS nhưng có trọng số: thay vì dùng Queue thường (FIFO), ta dùng Hàng đợi ưu tiên nhỏ nhất (IndexMinPQ). Luôn lấy đỉnh v có khoảng cách `distTo[v]` nhỏ nhất để "thư giãn" (relax) các cạnh kề `v -> w`: nếu `distTo[w] > distTo[v] + weight(e)`, cập nhật lại khoảng cách ngắn hơn!',
        formulaOrRule: 'Dijkstra chạy trong O(E log V) với IndexMinPQ. BẮT BUỘC TRỌNG SỐ KHÔNG ÂM.',
        explanation: 'Câu 8 đề UET: Các chặng bay có thời gian bay khác nhau (có trọng số) -> chuyển từ BFS Câu 7 sang Dijkstra!',
      },
    ],
    javaCodeHighlight: {
      title: 'Mã nguồn thao tác Relax cạnh trong thuật toán Dijkstra',
      description: 'Cốt lõi của việc cập nhật khoảng cách ngắn hơn qua đỉnh v.',
      code: `private void relax(DirectedEdge e) {
    int v = e.from(), w = e.to();
    if (distTo[w] > distTo[v] + e.weight()) {
        distTo[w] = distTo[v] + e.weight();
        edgeTo[w] = e;
        if (pq.contains(w)) pq.decreaseKey(w, distTo[w]);
        else                pq.insert(w, distTo[w]);
    }
}`,
    },
    examTraps: [
      {
        trapTitle: 'Áp dụng Dijkstra cho đồ thị có trọng số âm',
        trapDetail: 'Dijkstra tham lam chốt đỉnh một khi đã lấy ra khỏi Priority Queue. Nếu có trọng số âm, một đường đi vòng qua cạnh âm có thể ngắn hơn nhưng đã bị bỏ qua.',
        howToAvoid: 'Đồ thị có cạnh âm phải dùng thuật toán Bellman-Ford.',
      },
    ],
    quickCheck: {
      question: 'Thuật toán Kruskal sử dụng cấu trúc dữ liệu nào đã học ở Tuần 1 để kiểm tra xem một cạnh mới có tạo thành chu trình với các cạnh đã chọn hay không?',
      options: ['Union-Find (Disjoint Sets)', 'Stack', 'Linear Probing Hash Table', 'AVL Tree'],
      correctIndex: 0,
      explanation: 'Kruskal dùng `uf.connected(u, v)` để kiểm tra nếu 2 đỉnh u và v đã thuộc cùng thành phần liên thông thì bỏ qua, nếu chưa thì thêm cạnh và gọi `uf.union(u, v)`.',
    },
  },
];
