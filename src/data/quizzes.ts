import { EssayQuestion, McqQuestion } from '../types';

export const MCQ_QUESTIONS: McqQuestion[] = [
  // =========================================================================
  // CHỦ ĐỀ 1: PHÂN TÍCH THUẬT TOÁN & BỘ NHỚ 64-BIT JVM (COMPLEXITY)
  // =========================================================================
  {
    id: 'mcq-1',
    topic: 'Mergesort & Complexity',
    source: 'COS226 Midterm f25, 5a',
    type: 'tf',
    isMidterm: true,
    question: 'Đúng hay Sai: Mergesort thực hiện ~2n log₂ n phép so sánh khi sắp xếp mảng bất kỳ gồm 2n phần tử (cả trường hợp tốt nhất và xấu nhất).',
    options: ['Đúng', 'Sai'],
    correctIndex: 1,
    explanation: 'SAI. Với mảng cỡ N = 2n: trường hợp xấu nhất tốn ~N lg N = ~2n lg(2n) ~ 2n lg n phép so sánh (đúng), NHƯNG trường hợp tốt nhất (khi 2 nửa có thứ tự rời nhau, hết 1 nửa sau N/2 bước) chỉ tốn ~1/2 N lg N = ~n lg n phép so sánh — không phải ~2n lg n cho cả hai trường hợp!',
    trapNote: 'Bẫy giữa "truy nhập mảng" (~6N lg N) và "phép so sánh" (1/2 N lg N đến N lg N).',
  },
  {
    id: 'mcq-2',
    topic: 'Lower Bound & Search',
    source: 'COS226 Midterm f25, 5b',
    type: 'tf',
    isMidterm: true,
    question: 'Đúng hay Sai: Để tìm một key trong một mảng đã được sắp xếp độ dài 3n, một thuật toán sử dụng so sánh phải thực hiện Ω(log n) phép so sánh trong trường hợp tồi nhất.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'ĐÚNG. Theo cây quyết định (decision tree), có 3n kết quả tìm kiếm phân biệt (hoặc 3n+1 vị trí không tìm thấy), nên chiều cao cây tối thiểu là log₂(3n) = log₂ 3 + log₂ n = Ω(log n).',
    trapNote: 'Hằng số 3 bên trong log(3n) tách ra thành + log 3 nên vẫn cùng bậc Ω(log n).',
  },
  {
    id: 'mcq-3',
    topic: 'Sorting Lower Bound',
    source: 'COS226 Midterm f25, 5c',
    type: 'tf',
    isMidterm: true,
    question: 'Đúng hay Sai: Xét bài toán sắp xếp một mảng n phần tử mà các khóa chỉ gồm 4 giá trị phân biệt. Có thể thiết kế thuật toán dùng không quá 4n phép so sánh trong trường hợp xấu nhất.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'ĐÚNG! Ví dụ quicksort 3-way partition 3 lần (hoặc tạo 4 bucket / so sánh mỗi phần tử với tối đa 3 chốt để phân vào 4 nhóm 0, 1, 2, 3) chỉ mất tối đa 3n phép so sánh (<= 4n)!',
    trapNote: 'Đừng nhầm với cận dưới Ω(n log n) — cận dưới chỉ áp dụng khi n khóa phân biệt!',
  },
  {
    id: 'mcq-memory-2d',
    topic: 'Bộ nhớ Java 64-bit',
    source: 'Đề thi giữa kỳ UET & algs4',
    type: 'mcq',
    isMidterm: true,
    question: 'Trên máy ảo Java (JVM) 64-bit, một mảng 2 chiều số nguyên `int[][] a = new int[M][N];` tiêu tốn xấp xỉ bao nhiêu bytes bộ nhớ?',
    options: [
      '~ 4MN + 32M + 24 bytes',
      '~ 4MN + 16 bytes',
      '~ 8MN + 24 bytes',
      '~ 4MN + 8M + 16 bytes',
    ],
    correctIndex: 0,
    explanation: 'Mảng 2 chiều trong Java là "mảng của các mảng":\n- Mảng ngoài chứa M tham chiếu: 16 (overhead) + 4 (length) + 4 (padding) + 8*M = 24 + 8M bytes.\n- Mỗi mảng con chứa N số nguyên int: 16 (overhead) + 4 (length) + 4 (padding) + 4*N = 24 + 4N bytes.\n- Có M mảng con -> Tổng cộng: (24 + 8M) + M*(24 + 4N) = 24 + 32M + 4MN bytes!',
    trapNote: 'Nhớ kỹ: Java KHÔNG cấp phát mảng 2D liên tục như C/C++ mà là mảng tham chiếu trỏ tới M mảng 1D độc lập!',
  },
  {
    id: 'mcq-memory-string',
    topic: 'Bộ nhớ Java 64-bit',
    source: 'algs4 Section 1.4',
    type: 'mcq',
    isMidterm: true,
    question: 'Một đối tượng `String` tiêu chuẩn trong Java gồm N ký tự tiêu tốn tổng cộng bao nhiêu bytes bộ nhớ?',
    options: [
      '~ 2N + 40 bytes (hoặc 2N + 48 bytes có padding)',
      '~ N bytes',
      '~ 4N + 24 bytes',
      '~ 8N + 16 bytes',
    ],
    correctIndex: 0,
    explanation: 'Đối tượng String gồm: 16B (overhead) + 8B (tham chiếu mảng char[]) + 4B (offset) + 4B (count) + 4B (hash) + 4B (padding) = 40 bytes. Mảng char[] gồm: 16B (overhead) + 4B (length) + 4B (padding) + 2N (mỗi char 2B) = 2N + 24 bytes. Tổng cộng ~ 2N + 64 bytes (hoặc ~ 2N + 40 bytes trong các bản Java cải tiến).',
    trapNote: 'char trong Java dùng chuẩn Unicode UTF-16, mỗi ký tự tốn 2 BYTES (không phải 1 byte như ASCII trong C)!',
  },
  {
    id: 'mcq-memory-node',
    topic: 'Bộ nhớ Java 64-bit',
    source: 'Đề thi giữa kỳ UET',
    type: 'mcq',
    isMidterm: true,
    question: 'Một đối tượng nút `private class Node { Item item; Node next; }` (là inner class không static) tiêu tốn bao nhiêu bytes trên JVM 64-bit?',
    options: ['40 bytes (16 overhead + 8 inner ref + 8 item + 8 next)', '24 bytes', '32 bytes', '16 bytes'],
    correctIndex: 0,
    explanation: 'Vì là non-static inner class, Node phải lưu thêm tham chiếu trỏ ngược về outer class: 16B (overhead) + 8B (tham chiếu outer this) + 8B (tham chiếu item) + 8B (tham chiếu next) = 40 bytes. Nếu khai báo `private static class Node` thì giảm còn 32 bytes (16 + 8 + 8).',
    trapNote: 'Bẫy cực sâu: non-static inner class tốn thêm 8B con trỏ lớp ngoài!',
  },
  {
    id: 'mcq-selection-cmp',
    topic: 'Độ phức tạp sắp xếp',
    source: 'Đề thi UET các năm',
    type: 'mcq',
    isMidterm: true,
    question: 'Khi chạy Selection Sort trên một mảng ĐÃ ĐƯỢC SẮP XẾP TĂNG DẦN gồm N phần tử, số phép so sánh phần tử thực hiện là:',
    options: ['Luôn bằng N(N - 1)/2 ~ N²/2', 'N - 1 phép so sánh', 'N log N phép so sánh', '0 phép so sánh'],
    correctIndex: 0,
    explanation: 'Selection Sort KHÔNG có cơ chế dừng sớm. Vòng lặp trong luôn chạy từ i+1 đến N-1 để quét toàn bộ phần còn lại nhằm tìm vị trí min. Do đó, dù mảng đã sắp xếp, nghịch đảo hay ngẫu nhiên, số phép so sánh LUÔN LÀ N(N-1)/2 ~ N²/2!',
    trapNote: 'Đừng nhầm với Insertion Sort (Insertion Sort mới có Best Case là N - 1 so sánh)!',
  },
  {
    id: 'mcq-insertion-inversion',
    topic: 'Sắp xếp & Nghịch thế',
    source: 'algs4 Tuần 4',
    type: 'mcq',
    isMidterm: true,
    question: 'Cho mảng A = [5, 4, 3, 2, 1]. Số nghịch thế (Inversions) của mảng này và số phép hoán đổi (swap) mà Insertion Sort cần thực hiện lần lượt là:',
    options: ['10 nghịch thế và 10 phép hoán đổi', '5 nghịch thế và 5 phép hoán đổi', '10 nghịch thế và 5 phép hoán đổi', '4 nghịch thế và 4 phép hoán đổi'],
    correctIndex: 0,
    explanation: 'Số nghịch thế của mảng nghịch đảo hoàn toàn cỡ N=5 là N(N-1)/2 = 5*4/2 = 10 cặp: (5,4), (5,3), (5,2), (5,1), (4,3), (4,2), (4,1), (3,2), (3,1), (2,1). Mỗi phép swap của Insertion Sort hoán đổi 2 phần tử kề nhau nên làm giảm ĐÚNG 1 nghịch thế -> Cần chính xác 10 phép hoán đổi!',
    trapNote: 'Số phép swap của Insertion Sort = Đúng bằng số nghịch thế (Inversions) của mảng!',
  },
  {
    id: 'mcq-quicksort-equal',
    topic: 'Quicksort & Phân hoạch Hoare',
    source: 'Sedgewick algs4 Tuần 6',
    type: 'mcq',
    isMidterm: true,
    question: 'Trong thuật toán phân hoạch 2 con trỏ Hoare của Quicksort, tại sao con trỏ i và j PHẢI DỪNG LẠI khi gặp phần tử BẰNG pivot (thay vì chạy vượt qua)?',
    options: [
      'Để chia đôi mảng đều nhau ở giữa khi mảng có nhiều phần tử trùng lặp, giữ thời gian O(N log N)',
      'Để thuật toán trở nên ổn định (stable)',
      'Để tránh lỗi tràn chỉ số mảng',
      'Để giảm số lần hoán đổi xuống mức 0',
    ],
    correctIndex: 0,
    explanation: 'Nếu chạy vượt qua các phần tử bằng pivot, khi gặp mảng chứa toàn bộ các phần tử bằng nhau (ví dụ [5, 5, 5, 5, 5]), con trỏ i sẽ chạy thẳng tới cuối mảng khiến phân hoạch bị lệch cực đại (1 mảng cỡ 0 và 1 mảng cỡ N-1) -> Thuật toán suy biến thành O(N²)! Dừng lại khi gặp phần tử bằng pivot sẽ đổi chỗ thừa nhưng chia đôi mảng chính xác ở giữa -> Giữ thời gian O(N log N)!',
    trapNote: 'Đây là lý do Quicksort trong thư viện java.util và algs4 bắt buộc dừng con trỏ khi gặp phần tử bằng pivot.',
  },

  // =========================================================================
  // CHỦ ĐỀ 2: STACK & QUEUE
  // =========================================================================
  {
    id: 'mcq-stack-resizing-thrashing',
    topic: 'Stack / Resizing Array',
    source: 'algs4 Tuần 3',
    type: 'mcq',
    isMidterm: true,
    question: 'Tại sao khi cài đặt Ngăn xếp bằng mảng co giãn (Resizing Array), ta chỉ thu hẹp mảng còn một nửa khi số phần tử giảm xuống 1/4 dung lượng (thay vì 1/2)?',
    options: [
      'Để tránh hiện tượng "thrashing" (luân phiên nhân đôi và chia đôi mảng tốn kém khi push/pop liên tiếp tại ngưỡng biên)',
      'Để tiết kiệm tối đa bộ nhớ RAM',
      'Vì Java không cho phép chia đôi mảng ở 1/2 dung lượng',
      'Để giữ ngăn xếp luôn có kích thước là lũy thừa của 2',
    ],
    correctIndex: 0,
    explanation: 'Nếu thu hẹp mảng tại 1/2: xét chuỗi thao tác push-pop-push-pop xen kẽ ngay tại ngưỡng biên đầy mảng -> Mọi thao tác push đều tốn O(N) để nhân đôi mảng, và mọi thao tác pop ngay sau đó đều tốn O(N) để chia đôi mảng! Giảm kích thước tại 1/4 đảm bảo sau khi co lại mảng vẫn đầy 1/2, cần ít nhất N/4 thao tác push hoặc pop nữa mới kích hoạt thay đổi dung lượng lần kế tiếp -> Amortized O(1).',
    trapNote: 'Khái niệm "Thrashing" (Rung lắc luân phiên) là câu hỏi trắc nghiệm kinh điển của Princeton và UET.',
  },
  {
    id: 'mcq-dijkstra-twostack',
    topic: 'Ngăn xếp / Thuật toán 2 Stack',
    source: 'algs4 Tuần 3 - Dijkstra Evaluation',
    type: 'mcq',
    isMidterm: true,
    question: 'Trong thuật toán 2 Stack của Dijkstra để tính giá trị biểu thức số học có ngoặc (ví dụ: `( 1 + ( ( 2 + 3 ) * 4 ) )`), khi gặp dấu đóng ngoặc `)`, thuật toán làm gì?',
    options: [
      'Pop toán tử từ stack ops, pop 2 toán hạng từ stack vals, tính kết quả rồi push lại vào vals',
      'Pop toán tử từ stack ops và in ra màn hình',
      'Xóa dấu mở ngoặc tương ứng trong stack',
      'Dừng toàn bộ thuật toán',
    ],
    correctIndex: 0,
    explanation: 'Thuật toán 2-Stack: Gặp số -> push vào vals; Gặp toán tử (+, -, *, /) -> push vào ops; Gặp mở ngoặc ( -> bỏ qua; Gặp đóng ngoặc ) -> pop 1 toán tử op, pop 2 giá trị v1, v2; tính kết quả = v2 op v1; push kết quả trở lại vals!',
    trapNote: 'Thứ tự lấy ra: v2 là toán tử bên trái, v1 là toán tử bên phải (quan trọng khi làm phép trừ và phép chia v2 - v1 hoặc v2 / v1).',
  },
  {
    id: 'mcq-queue-reverse-stack',
    topic: 'Hàng đợi & Ngăn xếp',
    source: 'Đề thi UET HK1 2024-2025 Câu 2b',
    type: 'mcq',
    isMidterm: true,
    question: 'Để đảo ngược thứ tự các phần tử trong một Hàng đợi (Queue) mà không dùng thêm mảng, cấu trúc dữ liệu bổ trợ tối ưu duy nhất cần dùng là:',
    options: ['Một Ngăn xếp (Stack)', 'Một Hàng đợi khác (Queue thứ hai)', 'Một Cây nhị phân tìm kiếm', 'Một Bảng băm'],
    correctIndex: 0,
    explanation: 'Queue có tính chất FIFO (vào trước ra trước), Stack có tính chất LIFO (vào trước ra sau - đảo ngược thứ tự). Đổ toàn bộ phần tử từ Queue sang Stack bằng `s.push(q.dequeue())`, sau đó đổ ngược từ Stack về Queue bằng `q.enqueue(s.pop())` sẽ đảo ngược hoàn toàn thứ tự trong Queue!',
    trapNote: 'Đề thi UET 2024-2025 vừa ra đúng dạng bài này ở Câu 2b (2.0 điểm)!',
  },

  // =========================================================================
  // CHỦ ĐỀ 3: HEAP & PRIORITY QUEUE
  // =========================================================================
  {
    id: 'mcq-heap-order',
    topic: 'Priority Queue & Heap',
    source: 'COS226 Midterm f25, 5d',
    type: 'tf',
    isMidterm: true,
    question: 'Đúng hay Sai: Xét một Max-Heap có ít nhất 8 key. Gọi x là key tại nút ở độ sâu 2 (gốc ở độ sâu 0) và y là key tại nút ở độ sâu 4. Khi đó, chắc chắn x >= y.',
    options: ['Đúng', 'Sai'],
    correctIndex: 1,
    explanation: 'SAI! Tính chất Heap chỉ đảm bảo cha >= con (tức là theo quan hệ TỔ TIÊN - CON CHÁU trên cùng nhánh). Nếu x và y nằm ở 2 nhánh khác nhau, x hoàn toàn có thể nhỏ hơn y! (Ví dụ gốc=100, con trái=90, con phải=20 ở độ sâu 1 -> con ở độ sâu 2 bên nhánh phải có thể nhỏ hơn cháu ở độ sâu 4 bên nhánh trái).',
    trapNote: 'Cạm bẫy kinh điển nhất về Heap: KHÔNG có thứ tự giữa các nhánh anh em!',
  },
  {
    id: 'mcq-heap-swim-trace',
    topic: 'Max-Heap thao tác insert',
    source: 'Đề thi giữa kỳ UET',
    type: 'mcq',
    isMidterm: true,
    question: 'Cho mảng 1-based biểu diễn Max-Heap: `[-, 90, 70, 80, 40, 50, 60, 30]`. Sau khi gọi `insert(75)`, giá trị 75 sẽ nằm ở chỉ số (index) nào trong mảng?',
    options: ['Chỉ số 3', 'Chỉ số 8', 'Chỉ số 4', 'Chỉ số 1'],
    correctIndex: 0,
    explanation: 'Ban đầu N = 7. Thêm 75 vào cuối: `pq[8] = 75`.\n1. So với cha tại 8/2 = 4 (giá trị 40): vì 75 > 40 nên đổi chỗ -> 75 lên index 4.\n2. So với cha mới tại 4/2 = 2 (giá trị 70): vì 75 > 70 nên đổi chỗ -> 75 lên index 2.\n3. So với cha tại 2/2 = 1 (giá trị 90): vì 75 < 90 nên dừng lại!\n-> 75 nằm ở vị trí index 2! (Lưu ý: nếu đề hỏi vị trí cuối của 75, đáp án là 2).',
    trapNote: 'Quy tắc leo cây: cha của vị trí k luôn là k / 2!',
  },
  {
    id: 'mcq-heapsort-build-cost',
    topic: 'Heapsort / Độ phức tạp',
    source: 'algs4 Tuần 7',
    type: 'mcq',
    isMidterm: true,
    question: 'Trong thuật toán Heapsort, giai đoạn 1 (Xây dựng Heap ban đầu từ mảng lộn xộn bằng cách gọi `sink()` từ k = N/2 về 1) tiêu tốn thời gian là:',
    options: ['O(N) tuyến tính', 'O(N log N)', 'O(N²)', 'O(log N)'],
    correctIndex: 0,
    explanation: 'Dù nhìn bề ngoài có N/2 lần gọi sink (mỗi lần sink tối đa log N), nhưng phần lớn các nút nằm ở các tầng dưới cùng của cây (chiều cao h nhỏ). Tổng chi phí toán học là ∑ (h * N / 2^(h+1)) <= N * ∑ (h / 2^h) <= 2N = O(N)! Toàn bộ thuật toán Heapsort tốn O(N log N) là do Giai đoạn 2 (Sortdown rút trích N lần).',
    trapNote: 'Heap construction (Bottom-up) chỉ tốn O(N), không phải O(N log N)!',
  },
  {
    id: 'mcq-heapsort-stability',
    topic: 'Heapsort đặc tính',
    source: 'Đề thi UET',
    type: 'mcq',
    isMidterm: true,
    question: 'Phát biểu nào sau đây là ĐÚNG về thuật toán Heapsort?',
    options: [
      'Heapsort là thuật toán in-place (O(1) bộ nhớ phụ) nhưng KHÔNG ổn định (not stable)',
      'Heapsort là thuật toán ổn định (stable) và in-place',
      'Heapsort tốn O(N) bộ nhớ phụ cho mảng heap',
      'Heapsort có trường hợp tồi nhất là O(N²)',
    ],
    correctIndex: 0,
    explanation: 'Heapsort sắp xếp trực tiếp trên mảng ban đầu (in-place) bằng cách hoán đổi gốc pq[1] với phần tử cuối pq[N--] nên bộ nhớ phụ O(1). Tuy nhiên các phép đổi chỗ khoảng cách xa làm đảo lộn thứ tự tương đối của các phần tử bằng nhau -> KHÔNG ổn định!',
    trapNote: 'Heapsort tối ưu bộ nhớ in-place và có cận trên O(N log N) đảm bảo, nhưng không được dùng làm sort mặc định trong Java vì thiếu tính Stable và cache locality kém.',
  },

  // =========================================================================
  // CHỦ ĐỀ 4: CÂY NHỊ PHÂN TÌM KIẾM (BST) & CÂY CÂN BẰNG AVL / LLRB
  // =========================================================================
  {
    id: 'mcq-avl-rotation-uet2024',
    topic: 'Cây AVL / Phép xoay',
    source: 'Đề thi cuối kỳ UET HK1 2024-2025 — Câu 4b',
    type: 'mcq',
    isMidterm: true,
    question: 'Chèn lần lượt các khóa 80, 20, 40 vào một cây AVL ban đầu rỗng. Khi phát hiện mất cân bằng, phép xoay nào được thực hiện và nút nào trở thành nút gốc mới?',
    options: [
      'Phép xoay kép Trái - Phải (LR rotation), nút gốc mới là 40',
      'Phép xoay đơn Phải (Rotate Right), nút gốc mới là 20',
      'Phép xoay đơn Trái (Rotate Left), nút gốc mới là 80',
      'Phép xoay kép Phải - Trái (RL rotation), nút gốc mới là 20',
    ],
    correctIndex: 0,
    explanation: '1. Chèn 80 (gốc), chèn 20 (con trái của 80), chèn 40 (con phải của 20).\n2. Tại nút 80: chiều cao cây con trái = 2, cây con phải = 0 -> Hệ số cân bằng BF = 2 - 0 = +2 (mất cân bằng).\n3. Vì nút 40 nằm bên PHẢI của con TRÁI (20) -> Đây là trường hợp LỆCH TRÁI - PHẢI (Left-Right / LR)!\n4. Phép xoay: Xoay trái tại 20 (đưa 40 lên làm con trái của 80, 20 làm con trái của 40), sau đó xoay phải tại 80 -> Nút 40 lên làm gốc mới, 20 là con trái, 80 là con phải!',
    trapNote: 'Đây là câu hỏi chuẩn 100% trong Đề thi chính thức của UET 2024-2025 Câu 4b!',
  },
  {
    id: 'mcq-bst-merge-bound',
    topic: 'BST',
    source: 'COS226 Midterm f25, 5e',
    type: 'tf',
    isMidterm: true,
    question: 'Đúng hay Sai: Cho hai BST, mỗi cây chứa n key (2n key phân biệt). Có thể tạo 1 BST chứa 2n key đó bằng không quá 2n phép so sánh.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'ĐÚNG! Duyệt Inorder cả 2 BST để thu 2 mảng đã sắp xếp (0 phép so sánh), trộn 2 mảng trong tối đa 2n-1 phép so sánh thành 1 mảng tăng dần, rồi dựng lại BST cân bằng từ mảng đã sắp xếp (0 phép so sánh!). Tổng <= 2n phép so sánh.',
    trapNote: 'Không chèn từng phần tử từ cây này sang cây kia (sẽ tốn n log n), mà dùng Inorder + Merge + Build!',
  },
  {
    id: 'mcq-bst-hibbard-deletion',
    topic: 'BST Hibbard Deletion',
    source: 'algs4 Tuần 9 & UET',
    type: 'mcq',
    isMidterm: true,
    question: 'Trong cây nhị phân tìm kiếm (BST), khi xóa một nút t có ĐỦ 2 CON bằng thuật toán Hibbard Deletion (1962), nút thay thế t là nút nào?',
    options: [
      'Nút nhỏ nhất của cây con bên phải (min của t.right)',
      'Nút lớn nhất của cây con bên phải (max của t.right)',
      'Nút gốc của toàn bộ cây',
      'Nút lá bất kỳ trong cây',
    ],
    correctIndex: 0,
    explanation: 'Thuật toán Hibbard: Để giữ tính chất BST (left < x < right), nút thay thế phải là phần tử kế tiếp ngay sau t theo thứ tự sắp xếp (Successor), tức là nút nhỏ nhất của cây con bên phải x = min(t.right). Sau đó xóa x khỏi cây con phải bằng x.right = deleteMin(t.right) và gán x.left = t.left.',
    trapNote: 'Nhược điểm của Hibbard: luôn chọn nhánh phải khiến cây bị bất đối xứng và chiều cao suy thoái về O(sqrt(N)) sau nhiều thao tác xóa ngẫu nhiên!',
  },
  {
    id: 'mcq-avl-height-bound',
    topic: 'Cây AVL / Cận trên chiều cao',
    source: 'algs4 & UET',
    type: 'mcq',
    isMidterm: true,
    question: 'Chiều cao h của cây AVL chứa N nút luôn thỏa mãn bất đẳng thức nào sau đây?',
    options: ['h < 1.44 log₂ N', 'h < log₂ N', 'h = N / 2', 'h < 2 log₂ N'],
    correctIndex: 0,
    explanation: 'Cây AVL kiểm soát nghiêm ngặt hệ số cân bằng |h_L - h_R| <= 1 tại mọi nút. Trường hợp xấu nhất của cây AVL tương ứng với Cây Fibonacci. Số nút tối thiểu N(h) = N(h-1) + N(h-2) + 1 ~ (phi)^h. Do đó chiều cao h <= 1.4404 log₂ N!',
    trapNote: 'Cây AVL cân bằng chặt hơn Red-Black Tree (Red-Black có chiều cao tối đa <= 2 lg N). Vì vậy AVL tìm kiếm nhanh hơn một chút, nhưng chèn/xóa tốn nhiều phép xoay hơn.',
  },
  {
    id: 'mcq-llrb-properties',
    topic: 'Cây LLRB (Left-Leaning Red-Black)',
    source: 'algs4 Tuần 10',
    type: 'mcq',
    isMidterm: true,
    question: 'Phát biểu nào sau đây SAI về cây Đỏ-Đen nghiêng trái (LLRB) của GS. Sedgewick?',
    options: [
      'Được phép có liên kết đỏ nghiêng sang phải',
      'Không bao giờ có 2 liên kết đỏ liên tiếp trên cùng một đường đi',
      'Mọi đường đi từ gốc đến các nút lá (null) đều có cùng số lượng liên kết ĐEN (Black Balance hoàn hảo)',
      'Chiều cao tối đa của cây không vượt quá 2 lg N',
    ],
    correctIndex: 0,
    explanation: 'Đặc trưng cốt lõi của LLRB (Left-Leaning Red-Black) là NGHIÊNG TRÁI: Tuyệt đối KHÔNG cho phép liên kết đỏ nghiêng sang phải! Nếu xuất hiện liên kết đỏ bên phải (`isRed(h.right)`), thuật toán lập tức gọi `rotateLeft(h)` để chuyển nó về bên trái.',
    trapNote: 'Nhớ 3 thao tác chuẩn hóa LLRB: rotateLeft (sửa nghiêng phải), rotateRight (sửa 2 đỏ liên tiếp), flipColors (tách nút 4).',
  },

  // =========================================================================
  // CHỦ ĐỀ 5: UNION-FIND (NỀN TẢNG GIỮA KỲ)
  // =========================================================================
  {
    id: 'mcq-wqu-height',
    topic: 'Union-Find',
    source: 'algs4 Tuần 1',
    type: 'mcq',
    isMidterm: true,
    question: 'Với WeightedQuickUnionUF có N = 1024 phần tử (không dùng path compression), chiều cao tối đa của một cây bất kỳ là bao nhiêu?',
    options: ['10 (tức lg N)', '512 (tức N/2)', '1024 (tức N)', '32 (tức sqrt(N))'],
    correctIndex: 0,
    explanation: 'Chiều cao của cây gốc x chỉ tăng thêm 1 khi nó bị ghép vào gốc một cây khác có kích thước >= sz[x], tức kích thước cây mới tăng ít nhất gấp ĐÔI. Bắt đầu từ 1, nhân đôi tối đa lg N lần -> chiều cao <= lg(1024) = 10.',
    trapNote: 'QuickUnion thường có chiều cao tối đa N-1; WeightedQuickUnion giảm xuống <= lg N.',
  },
  {
    id: 'mcq-wqu-cost-summary',
    topic: 'Union-Find / So sánh chi phí',
    source: 'Đề thi UET',
    type: 'mcq',
    isMidterm: true,
    question: 'Thuật toán Union-Find nào sau đây có chi phí khởi tạo O(N), thao tác find gần như O(1) và thao tác union gần như O(1) trên thực tế?',
    options: [
      'Weighted Quick-Union kết hợp Path Compression (Nén đường đi)',
      'Quick-Find',
      'Quick-Union thông thường',
      'Weighted Quick-Union không nén đường đi',
    ],
    correctIndex: 0,
    explanation: 'Weighted Quick-Union kết hợp Path Compression (thêm đúng 1 dòng `id[i] = id[id[i]];` trong hàm root) đạt độ phức tạp O(N + M * α(N)) với M thao tác trên N phần tử. Hàm Ackerman nghịch đảo α(N) <= 5 với mọi N trong vũ trụ, tức gần như là hằng số O(1)!',
    trapNote: 'Quick-Find có union O(N) quá chậm; Quick-Union có thể suy biến cây cao O(N).',
  },
  {
    id: 'mcq-mountain-array-sort',
    topic: 'Thuật toán sắp xếp mảng núi (Bitonic Sort)',
    source: 'COS226 Midterm f24, 8 & UET',
    type: 'tf',
    isMidterm: true,
    question: 'Đúng hay Sai: Cho mảng dạng núi (Mountain array) cỡ 2n, trong đó n phần tử đầu tăng dần và n phần tử sau giảm dần. Có thể sắp xếp mảng này tăng dần trong thời gian O(n) ở trường hợp xấu nhất.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'ĐÚNG! Nửa đầu đã tăng dần, nửa sau giảm dần. Ta chỉ cần dùng 2 con trỏ: con trỏ i = 0 chạy từ đầu mảng sang phải, con trỏ j = 2n - 1 chạy từ cuối mảng lùi về trái. So sánh a[i] và a[j], đưa phần tử nhỏ hơn vào mảng phụ aux[] tương tự như bước trộn merge() của Mergesort! Mỗi bước so sánh đưa được 1 phần tử về đúng vị trí, tổng cộng tốn đúng 2n bước = O(n) thời gian và O(n) bộ nhớ phụ!',
    trapNote: 'Không cần gọi Mergesort hay Quicksort tốn O(n log n), chỉ cần 1 bước trộn 2 con trỏ O(n)!',
  },
  {
    id: 'mcq-bst-to-heap-linear',
    topic: 'Chuyển đổi BST sang Max-Heap',
    source: 'COS226 Midterm s25, 5d & UET',
    type: 'tf',
    isMidterm: true,
    question: 'Đúng hay Sai: Cho một cây tìm kiếm nhị phân (BST) gồm n khóa phân biệt. Có thể tạo một Max-Heap chứa n khóa đó chỉ với O(n) phép so sánh trong trường hợp xấu nhất.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'ĐÚNG! Bước 1: Duyệt cây BST theo thứ tự In-Order (trung thứ tự) để đưa n phần tử vào một mảng đã sắp xếp. Phép duyệt này KHÔNG TỐN PHÉP SO SÁNH NÀO (0 phép so sánh)!\nBước 2: Sử dụng thuật toán xây dựng Heap Bottom-up (gọi sink từ n/2 về 1). Thuật toán này chỉ tốn tối đa 2n phép so sánh!\nTổng cộng <= 2n phép so sánh = O(n)!',
    trapNote: 'Nếu chèn từng phần tử vào Heap rỗng thì tốn n log n, nhưng dùng In-Order + Bottom-up sink chỉ tốn O(n)!',
  },
  {
    id: 'mcq-bisection-orange-black',
    topic: 'Tìm kiếm nhị phân phân đôi (Bisection)',
    source: 'COS226 Midterm s25, 7',
    type: 'mcq',
    isMidterm: true,
    question: 'Cho mảng a[] gồm n phần tử chỉ có màu Cam hoặc Đen, trong đó a[0] màu Cam và a[n-1] màu Đen. Để tìm một chỉ số i sao cho a[i] màu Cam và a[i+1] màu Đen, số phép kiểm tra màu ít nhất trong trường hợp xấu nhất là:',
    options: ['O(log n) bằng Tìm kiếm nhị phân phân đôi (Bisection)', 'O(n) vì phải quét tuyến tính', 'O(1)', 'O(n log n)'],
    correctIndex: 0,
    explanation: 'Bài toán tương tự định lý giá trị trung gian Bolzano: Tại mid = n/2, nếu a[mid] màu Cam, thì đoạn [mid .. n-1] bắt đầu bằng Cam và kết thúc bằng Đen, chắc chắn chứa ít nhất một điểm chuyển tiếp! Nếu a[mid] màu Đen, thì đoạn [0 .. mid] bắt đầu bằng Cam và kết thúc bằng Đen, chắc chắn chứa điểm chuyển tiếp! Mỗi bước chia đôi không gian tìm kiếm -> O(log n)!',
    trapNote: 'Áp dụng nguyên lý Tìm kiếm nhị phân (Binary Search) trên hàm đơn điệu hoặc tính chất đổi dấu/đổi màu.',
  },
  {
    id: 'mcq-infix-to-postfix-rule',
    topic: 'Ngăn xếp / Chuyển biểu thức Trung tố sang Hậu tố',
    source: 'Đề thi giữa kỳ UET',
    type: 'mcq',
    isMidterm: true,
    question: 'Biểu thức trung tố (Infix) `A + B * C - D` khi chuyển sang biểu thức hậu tố (Postfix / RPN) bằng Stack sẽ có dạng nào?',
    options: [
      'A B C * + D -',
      'A B + C * D -',
      '+ A * B C - D',
      'A B C D * + -',
    ],
    correctIndex: 0,
    explanation: 'Theo thứ tự độ ưu tiên toán tử:\n1. B * C tính trước -> thành B C *\n2. A + (B * C) tính tiếp -> thành A B C * +\n3. (A + B * C) - D tính cuối cùng -> thành A B C * + D -.',
    trapNote: 'Toán tử có độ ưu tiên cao hơn (*) được pop ra trước toán tử có độ ưu tiên thấp hơn (+, -).',
  },
  {
    id: 'mcq-tree-recon-pre-in',
    topic: 'Dựng cây nhị phân từ Preorder & Inorder',
    source: 'Đề thi giữa kỳ UET & algs4',
    type: 'mcq',
    isMidterm: true,
    question: 'Cho kết quả duyệt Tiền thứ tự (Preorder): `[A, B, D, E, C, F]` và Trung thứ tự (Inorder): `[D, B, E, A, F, C]`. Nút gốc (root) của cây và con trái của gốc lần lượt là:',
    options: [
      'Nút gốc là A, con trái của gốc là B',
      'Nút gốc là D, con trái của gốc là B',
      'Nút gốc là A, con trái của gốc là D',
      'Nút gốc là F, con trái của gốc là C',
    ],
    correctIndex: 0,
    explanation: '1. Trong Preorder (Root -> Left -> Right), phần tử đầu tiên LUÔN LÀ GỐC -> Nút gốc là A.\n2. Tìm A trong Inorder: `[D, B, E, A, F, C]` -> Toàn bộ mảng bên trái `[D, B, E]` thuộc cây con trái; `[F, C]` thuộc cây con phải.\n3. Phần tử đầu tiên của nhánh trái trong Preorder là B -> Con trái của A chính là B!',
    trapNote: 'Preorder cho biết Gốc; Inorder cho biết ranh giới cây con trái và cây con phải.',
  },

  // =========================================================================
  // CHỦ ĐỀ CUỐI KỲ: BẢNG BĂM & ĐỒ THỊ (FINAL EXAM ONLY)
  // =========================================================================
  {
    id: 'mcq-hash-delete',
    topic: 'Hash Tables',
    source: 'algs4 Tuần 10',
    type: 'mcq',
    isMidterm: false,
    question: 'Trong cài đặt LinearProbingHashST, để xóa một khóa (delete), tại sao không thể chỉ gán `keys[i] = null; vals[i] = null;`?',
    options: [
      'Vì sẽ làm đứt chuỗi dò tuyến tính, khiến các khóa phía sau không thể tìm thấy bằng get()',
      'Vì Java không cho gán null cho phần tử mảng',
      'Vì bảng băm sẽ tự động bị chia đôi kích thước',
      'Vì gây tràn số nguyên ở hàm hashCode()',
    ],
    correctIndex: 0,
    explanation: 'Hàm `get()` dừng lại ngay khi gặp ô `null`. Nếu đục một lỗ `null` ở giữa cụm, các khóa nằm sau lỗ đó bị băm đụng độ trước đây sẽ không bao giờ tìm thấy nữa! Phải re-hash (put lại) toàn bộ các khóa nằm liên tiếp ngay sau vị trí vừa xóa.',
    trapNote: 'Đây là nhược điểm khi xóa ở Linear Probing so với Separate Chaining.',
  },
  {
    id: 'mcq-graph-adjlist',
    topic: 'Graphs (DFS & BFS)',
    source: 'algs4 Tuần 11',
    type: 'mcq',
    isMidterm: false,
    question: 'Độ phức tạp thời gian của DFS và BFS trên đồ thị vô hướng có V đỉnh và E cạnh khi biểu diễn bằng Danh sách kề (Adjacency List) là:',
    options: ['O(V + E)', 'O(V²)', 'O(E log V)', 'O(V log E)'],
    correctIndex: 0,
    explanation: 'Mỗi đỉnh được thăm tối đa 1 lần và mỗi cạnh trong danh sách kề được xét tối đa 2 lần (do đồ thị vô hướng lưu 2 chiều) -> O(V + E). Nếu dùng Ma trận kề (Adjacency Matrix) sẽ là O(V²).',
    trapNote: 'Chú ý phân biệt Danh sách kề O(V + E) và Ma trận kề O(V²).',
  },
];

export const ESSAY_QUESTIONS: EssayQuestion[] = [
  // =========================================================================
  // BÀI TỰ LUẬN GIỮA KỲ 1: ĐẾM ĐỘ PHỨC TẠP & MERGESORT
  // =========================================================================
  {
    id: 'essay-1',
    topic: 'Độ phức tạp & Mergesort',
    source: 'Đề cuối kỳ UET HK1 2024-2025 — Câu 1',
    maxScore: 1.5,
    estimatedMinutes: 6,
    isMidterm: true,
    prompt: 'Hãy cho biết độ phức tạp tính toán theo N, tính theo SỐ LẦN TRUY NHẬP MẢNG trong trường hợp tồi nhất và tốt nhất của hàm sau. Giải thích vắn tắt.',
    codeSnippet: `void f(int a[], int aux[], int N) {
    int lo = 0, mid = N/2, hi = N-1;
    for (int k = lo; k <= hi; k++) aux[k] = a[k];

    int i = lo, j = mid+1;
    for (int k = lo; k <= hi; k++) {
        if (i > mid) a[k] = aux[j++];
        else if (j > hi) a[k] = aux[i++];
        else if (aux[j] < aux[i]) a[k] = aux[j++];
        else a[k] = aux[i++];
    }
}`,
    hints: [
      'Đếm từng vòng lặp theo biến k từ 0 đến N-1 (N lần lặp).',
      'Mỗi lần đọc a[k] hoặc aux[i] hoặc ghi aux[k] / a[k] tính là 1 lần truy nhập mảng.',
      'Chú ý nhánh `if (i > mid)` hoặc `else if (j > hi)` khi hết một nửa thì KHÔNG cần đọc `aux[j] < aux[i]` nữa!',
    ],
    rubricCriteria: [
      'Đếm đúng vòng 1 (copy): chạy N lần, mỗi bước 2 lần truy nhập (đọc a[k], ghi aux[k]) -> 2N lần.',
      'Đếm đúng vòng 2 trường hợp tốt nhất (hết một nửa sớm sau ~N/2 bước): ~N/2 bước đầu tốn 4*(N/2) = 2N; ~N/2 bước sau tốn 2*(N/2) = N. Tổng toán học ~5N (đáp án UET ghi nhận ~4N đến ~6N).',
      'Đếm đúng trường hợp tồi nhất (hai nửa xen kẽ nhau): cả N bước tốn 4N -> Tổng tồi nhất: 2N + 4N = ~6N truy nhập mảng.',
      'Kết luận tổng quát: Cả best-case và worst-case đều có thời gian chạy tuyến tính Θ(N).',
    ],
    modelAnswer: `1. Vòng lặp 1 (copy a sang aux): chạy N lần, mỗi lần thực hiện 1 lần đọc a[k] và 1 lần ghi aux[k] => 2N lần truy nhập mảng.

2. Vòng lặp 2 (trộn từ aux về a): chạy N lần.
- Trường hợp tốt nhất (khi một nửa hết sớm trước, chẳng hạn toàn bộ nửa phải nhỏ hơn aux[0]):
  + Khoảng N/2 bước đầu: so sánh aux[j] < aux[i] (2 đọc) + gán a[k] = aux[...] (1 đọc + 1 ghi) = 4*(N/2) = 2N.
  + Khoảng N/2 bước sau: rơi vào nhánh i > mid hoặc j > hi nên bỏ qua phép so sánh aux, chỉ tốn a[k] = aux[...] (2 truy nhập) = N.
  => Tổng chính xác: 2N + 3N = ~5N (đáp án chính thức UET chấp nhận từ ~4N đến ~6N).

- Trường hợp tồi nhất (hai nửa xen kẽ nhau tới tận phần tử cuối cùng):
  + Cả N bước đều chạy qua so sánh aux[j] < aux[i] (2 truy nhập) + phép gán a[k] = aux[...] (2 truy nhập) = ~4N.
  => Tổng tồi nhất: 2N + 4N = ~6N truy nhập mảng.

Kết luận: Cả trường hợp tốt nhất và tồi nhất đều có độ phức tạp tuyến tính Θ(N) (khoảng ~5N đến ~6N lần truy nhập mảng).`,
    keyPoints: ['2n', '6n', '4n|5n', 'tuyến tính|θ(n)|o(n)'],
  },

  // =========================================================================
  // BÀI TỰ LUẬN GIỮA KỲ 2: STACK & QUEUE
  // =========================================================================
  {
    id: 'essay-2',
    topic: 'Stack & Queue',
    source: 'Đề cuối kỳ UET HK1 2024-2025 — Câu 2',
    maxScore: 2,
    estimatedMinutes: 7,
    isMidterm: true,
    prompt: `a. Cho một queue rỗng và chuỗi thao tác: enqueue(3), dequeue(), isEmpty(), enqueue(2), enqueue(1), dequeue(). Cho biết tình trạng queue sau mỗi thao tác và giá trị trả về (quy ước bên phải là đầu ra của queue).
b. Cho queue q chứa các số double. Chỉ dùng 01 stack s và các hàm enqueue, dequeue, isEmpty của queue; push, pop, isEmpty của stack (cùng tối đa 1 biến double). Hãy viết đoạn lệnh Java để đảo ngược thứ tự các phần tử trong chính queue q.`,
    hints: [
      'Stack là LIFO (đảo ngược thứ tự), còn Queue là FIFO.',
      'Đổ hết từ q sang s (q rỗng, s chứa đảo ngược), rồi đổ hết từ s ngược về q!',
    ],
    rubricCriteria: [
      'Phần a: Theo dõi đúng trạng thái queue (đầu ra bên phải -> 3 vào [3], dequeue trả 3 còn [], isEmpty trả true, enqueue(2) -> [2], enqueue(1) -> [1, 2], dequeue trả 2 còn [1]).',
      'Phần b: Dùng vòng while (!q.isEmpty()) s.push(q.dequeue());',
      'Phần b: Dùng vòng while (!s.isEmpty()) q.enqueue(s.pop());',
    ],
    modelAnswer: `a. Trạng thái queue (bên phải là đầu ra):
1. enqueue(3) -> Queue: [3]          (trả về: void)
2. dequeue()  -> Queue: []           (trả về: 3)
3. isEmpty()  -> Queue: []           (trả về: true)
4. enqueue(2) -> Queue: [2]          (trả về: void)
5. enqueue(1) -> Queue: [1, 2]       (trả về: void)
6. dequeue()  -> Queue: [1]          (trả về: 2)

b. Đoạn lệnh đảo ngược queue q bằng 1 stack s:
while (!q.isEmpty()) {
    s.push(q.dequeue());
}
while (!s.isEmpty()) {
    q.enqueue(s.pop());
}`,
    keyPoints: ['push', 'pop', 'enqueue', 'dequeue', 'while'],
  },

  // =========================================================================
  // BÀI TỰ LUẬN GIỮA KỲ 3: CÂY AVL & CÁC PHÉP XOAY CÂN BẰNG
  // =========================================================================
  {
    id: 'essay-avl-rotation-trace',
    topic: 'Cây AVL (Xoay cây & Cân bằng)',
    source: 'Đề thi giữa kỳ UET & algs4',
    maxScore: 2.5,
    estimatedMinutes: 10,
    isMidterm: true,
    prompt: `Cho cây AVL ban đầu rỗng. Lần lượt chèn các khóa sau: 50, 20, 10, 40, 30.
Hãy trình bày từng bước chèn:
1. Xác định nút bị mất cân bằng đầu tiên sau mỗi lần chèn.
2. Nêu rõ loại xoay cần áp dụng (LL, RR, LR hay RL).
3. Vẽ hoặc mô tả cây kết quả sau mỗi phép xoay.`,
    hints: [
      'Chèn 10 vào cây (50-20) gây lệch Trái - Trái (LL) tại nút 50 -> Xoay phải (Rotate Right) tại 50.',
      'Chèn 30 vào cây gây lệch Trái - Phải (LR) tại nút 40 hoặc 50 -> Kiểm tra kỹ hệ số cân bằng BF = h_left - h_right!',
    ],
    rubricCriteria: [
      'Bước 1: Chèn 50, chèn 20 -> Cây cân bằng.',
      'Bước 2: Chèn 10 -> Nút 50 mất cân bằng (BF = +2), nút 20 có BF = +1 (lệch LL). Thực hiện xoay phải tại 50. Cây mới: gốc 20, con trái 10, con phải 50.',
      'Bước 3: Chèn 40 -> 40 vào con trái của 50. Cây vẫn cân bằng.',
      'Bước 4: Chèn 30 -> 30 vào con trái của 40. Tại nút 50: BF = +2, con trái của 50 là 40 có BF = +1 (lệch LL tại nút 50). Xoay phải tại 50. Cây mới tại nhánh này: 40 lên làm con phải của 20, con trái 40 là 30, con phải 40 là 50.',
      'Kết luận cấu trúc cây cuối cùng: Gốc 20, con trái 10, con phải 40; 40 có con trái 30 và con phải 50.',
    ],
    modelAnswer: `Bước 1: Chèn 50 -> Gốc là 50 (chiều cao 0).
Chèn 20 -> 20 là con trái của 50. Cây cân bằng (|BF| <= 1).

Bước 2: Chèn 10 -> 10 là con trái của 20.
- Tại nút 50: chiều cao cây con trái = 2, cây con phải = 0 => BF(50) = +2 (mất cân bằng).
- Con trái của 50 là 20 có BF(20) = +1 => Lệch Trái - Trái (LL case).
- Áp dụng: Xoay phải (rotateRight) tại nút 50.
- Kết quả: Nút 20 lên làm gốc, con trái là 10, con phải là 50. (Cây cân bằng hoàn hảo, chiều cao 1).

Bước 3: Chèn 40:
- So sánh: 40 > 20 (sang phải), 40 < 50 (sang trái). 40 trở thành con trái của 50.
- Kiểm tra cân bằng: BF(50) = +1, BF(20) = -1 (|BF| <= 1, cây cân bằng).

Bước 4: Chèn 30:
- So sánh: 30 > 20 (sang phải), 30 < 50 (sang trái), 30 < 40 (sang trái). 30 trở thành con trái của 40.
- Kiểm tra cân bằng từ dưới lên:
  + Tại nút 40: BF = +1 (chiều cao 1).
  + Tại nút 50: h(trái) = 2 (nhánh 40->30), h(phải) = 0 => BF(50) = +2 (MẤT CÂN BẰNG ĐẦU TIÊN TẠI 50!).
  + Con trái của 50 là 40 có BF(40) = +1 => Lệch Trái - Trái (LL case tại nút 50).
- Áp dụng: Xoay phải (rotateRight) tại nút 50.
- Nút 40 lên thay thế vị trí của 50: con trái của 40 là 30, con phải của 40 là 50.
- Cây toàn cục sau xoay:
        20
       /  \\
     10    40
          /  \\
        30    50
Cây hoàn toàn cân bằng với chiều cao = 2.`,
    keyPoints: ['rotateright|xoay phải', 'bf = 2|mất cân bằng', 'll|trái - trái', 'gốc 20'],
  },

  // =========================================================================
  // BÀI TỰ LUẬN GIỮA KỲ 4: HEAPSORT & BIỂU DIỄN MẢNG BINARY HEAP
  // =========================================================================
  {
    id: 'essay-heapsort-simulation',
    topic: 'Binary Heap & Heapsort',
    source: 'Đề thi giữa kỳ UET',
    maxScore: 2.0,
    estimatedMinutes: 8,
    isMidterm: true,
    prompt: `Cho mảng 1-based chưa có thứ tự heap gồm 6 phần tử:
pq = [-, 40, 20, 70, 80, 50, 90] (N = 6).
a. Trình bày quá trình xây dựng Max-Heap (Heap Construction) bằng phương pháp Bottom-up (gọi sink từ k = N/2 về 1). Ghi rõ trạng thái mảng sau mỗi lần gọi sink(k).
b. Thực hiện 01 thao tác delMax() trên Heap vừa tạo và cho biết trạng thái mảng sau khi hoàn thành.`,
    hints: [
      'Giai đoạn xây heap: duyệt k = 3, k = 2, k = 1.',
      'sink(k) so sánh phần tử k với con lớn hơn trong hai con 2k và 2k+1, nếu nhỏ hơn thì đổi chỗ.',
      'delMax(): đổi pq[1] với pq[N], giảm N--, sau đó gọi sink(1).',
    ],
    rubricCriteria: [
      'k = 3 (giá trị 70): con là 2k = 6 (giá trị 90). Vì 70 < 90, đổi chỗ -> mảng [-, 40, 20, 90, 80, 50, 70].',
      'k = 2 (giá trị 20): hai con là 4 (80) và 5 (50). Con lớn hơn là 80. Vì 20 < 80, đổi chỗ -> mảng [-, 40, 80, 90, 20, 50, 70].',
      'k = 1 (giá trị 40): hai con là 2 (80) và 3 (90). Con lớn hơn là 90. Vì 40 < 90, đổi chỗ với 3 -> mảng [-, 90, 80, 40, 20, 50, 70]. Tại vị trí 3, hai con là 6 (70). Vì 40 < 70, đổi chỗ tiếp -> mảng cuối [-, 90, 80, 70, 20, 50, 40].',
      'delMax(): Đổi 90 với phần tử cuối 40 -> mảng [-, 40, 80, 70, 20, 50, (90)]. N = 5. Gọi sink(1): con lớn hơn là 80, đổi với 80; tiếp theo đổi với 50 -> mảng [-, 80, 50, 70, 20, 40].',
    ],
    modelAnswer: `a. Xây dựng Max-Heap (Bottom-up Heapify từ k = 6/2 = 3 về 1):
1. k = 3 (giá trị pq[3] = 70):
   - Con duy nhất là 2k = 6 (pq[6] = 90).
   - Vì 70 < 90 -> Hoán đổi pq[3] và pq[6].
   -> Mảng: [-, 40, 20, 90, 80, 50, 70].

2. k = 2 (giá trị pq[2] = 20):
   - Hai con là 4 (pq[4] = 80) và 5 (pq[5] = 50). Con lớn hơn là 80.
   - Vì 20 < 80 -> Hoán đổi pq[2] và pq[4].
   -> Mảng: [-, 40, 80, 90, 20, 50, 70].

3. k = 1 (giá trị pq[1] = 40):
   - Hai con là 2 (pq[2] = 80) và 3 (pq[3] = 90). Con lớn hơn là 90.
   - Vì 40 < 90 -> Hoán đổi pq[1] và pq[3] (40 xuống vị trí 3).
   - Tại vị trí 3 (giá trị 40): có con tại 6 (pq[6] = 70). Vì 40 < 70 -> Hoán đổi pq[3] và pq[6].
   -> Mảng hoàn tất Max-Heap: [-, 90, 80, 70, 20, 50, 40].

b. Thao tác delMax():
- Giá trị max lấy ra = pq[1] = 90.
- Hoán đổi pq[1] với phần tử cuối pq[6] = 40, giảm N từ 6 xuống 5:
  pq = [-, 40, 80, 70, 20, 50, (90)].
- Gọi sink(1):
  + Hai con của 1 là 2 (80) và 3 (70). Con lớn nhất là 80.
  + Vì 40 < 80 -> Hoán đổi 40 với 80 (40 xuống vị trí 2).
  + Tại vị trí 2: hai con là 4 (20) và 5 (50). Con lớn nhất là 50.
  + Vì 40 < 50 -> Hoán đổi 40 với 50.
  -> Mảng sau delMax(): [-, 80, 50, 70, 20, 40] (với 90 đã đưa về cuối).`,
    keyPoints: ['sink(3)', 'sink(2)', 'sink(1)', '90', '80', 'hoán đổi'],
  },

  // =========================================================================
  // BÀI TỰ LUẬN GIỮA KỲ 5: THIẾT KẾ CTDL KẾT HỢP (UNISTACK)
  // =========================================================================
  {
    id: 'essay-unistack-midterm',
    topic: 'Thuật toán thiết kế (COS226 Midterm)',
    source: 'COS226 Midterm f25, 7 — UniStack',
    maxScore: 2,
    estimatedMinutes: 10,
    isMidterm: true,
    prompt: `Thiết kế cấu trúc dữ liệu UniStack chứa String với push(String s) và pop(), sao cho nếu push một chuỗi đã tồn tại trong stack thì bản cũ bị XÓA khỏi vị trí cũ và bản mới lên đỉnh stack.
Yêu cầu: Bộ nhớ O(n), mỗi thao tác push/pop tốn O(log n) ở trường hợp tồi nhất! Trình bày cách kết hợp các CTDL đã học.`,
    hints: [
      'Để vừa xóa phần tử bất kỳ ở giữa trong O(log n) hoặc O(1), vừa lấy được phần tử mới nhất (top) trong O(log n), ta cần 2 CTDL phối hợp với nhau!',
      'Gợi ý 1: Balanced BST (Red-Black / TreeMap) ánh xạ <String, Node> hoặc <String, Timestamp> + LinkedList đôi hoặc BST thứ 2 theo thứ tự chèn!',
    ],
    rubricCriteria: [
      'Chọn được cấu trúc kết hợp đạt Worst-case O(log n) (CHÚ Ý: HashMap bình thường chỉ O(1) average, worst-case là O(n)! Để đảm bảo O(log n) WORST-CASE nên dùng Balanced BST / RedBlackBST!).',
      'Dùng 2 cây Red-Black BST (hoặc TreeMap): st1 ánh xạ String -> timestamp; st2 ánh xạ timestamp -> String.',
      'Thao tác push(s): nếu st1.contains(s), xóa st2.delete(oldTime); sau đó chèn time mới vào cả 2 cây (O(log n)).',
      'Thao tác pop(): lấy maxKey của st2, xóa ở cả 2 cây (O(log n)).',
    ],
    modelAnswer: `Để đảm bảo O(log n) TRONG TRƯỜNG HỢP TỒI NHẤT (worst-case, không dùng bảng băm vì hash table có worst-case O(n)), ta kết hợp hai cấu trúc dữ liệu (bộ nhớ tổng O(n)):

Cách tối ưu (2 cây Red-Black BST / TreeMap):
- Dùng biến đếm thời gian tăng dần int time = 0;
- Dùng 2 cây Red-Black BST:
  1. keyToTime: ánh xạ String -> Integer (tìm theo tên chuỗi trong O(log n)).
  2. timeToKey: ánh xạ Integer -> String (lấy phần tử đỉnh stack bằng max() trong O(log n)).

Hoạt động:
- push(String s):
  + Nếu keyToTime.contains(s): lấy oldTime = keyToTime.get(s), gọi timeToKey.delete(oldTime) (O(log n)).
  + Tăng time++, gọi keyToTime.put(s, time) và timeToKey.put(time, s) (O(log n)).
- pop():
  + Tìm maxTime = timeToKey.max(), lấy s = timeToKey.get(maxTime).
  + Xóa cả hai: timeToKey.delete(maxTime) và keyToTime.delete(s) (tổng O(log n)).
  + Trả về s.

Cả bộ nhớ lẫn thời gian worst-case đều đạt O(n) và O(log n).`,
    keyPoints: ['red-black|cân bằng|bst|treemap', 'timestamp|2 cây', 'o(log n)', 'delete'],
  },

  // =========================================================================
  // BÀI TỰ LUẬN GIỮA KỲ 6: THIẾT KẾ THUẬT TOÁN SẮP XẾP MẢNG NÚI (MOUNTAIN SORT)
  // =========================================================================
  {
    id: 'essay-mountain-sort',
    topic: 'Thuật toán sắp xếp mảng dạng núi (COS226 Midterm)',
    source: 'COS226 Midterm f24, 8 — Mountain Array Sort',
    maxScore: 2.0,
    estimatedMinutes: 8,
    isMidterm: true,
    prompt: `Mảng dạng núi (Mountain array) là mảng độ dài 2n, trong đó n phần tử đầu được sắp xếp tăng dần và n phần tử sau được sắp xếp giảm dần.
Ví dụ n = 6: a = [4, 7, 8, 11, 18, 20  |  31, 7, 7, 4, 2, 1].
Hãy thiết kế thuật toán sắp xếp mảng trên tăng dần trong thời gian O(n) và bộ nhớ phụ O(n). Trình bày ý tưởng, mã giả/Java và phân tích độ phức tạp.`,
    hints: [
      'Nửa đầu đã tăng dần [0..n-1]. Nửa sau [n..2n-1] đang giảm dần -> nếu đọc từ cuối (2n-1) lùi về n thì nó cũng là dãy tăng dần!',
      'Dùng 2 con trỏ: i = 0 (quét tiến từ đầu) và j = 2n - 1 (quét lùi từ cuối). So sánh a[i] và a[j] rồi đưa vào mảng kết quả giống hàm merge()!',
    ],
    rubricCriteria: [
      'Nhận xét được tính chất: nửa đầu tăng dần, nửa sau duyệt ngược từ 2n-1 về n cũng là dãy tăng dần.',
      'Sử dụng thuật toán trộn 2 con trỏ (Two-pointer Merge) tương tự như Mergesort: con trỏ i = 0..n-1 và j = 2n-1..n.',
      'Mỗi bước: so sánh a[i] và a[j], đưa phần tử nhỏ hơn vào aux[k++] và dịch con trỏ tương ứng.',
      'Độ phức tạp thời gian: Đúng 2n lần so sánh/gán -> O(n) tuyến tính.',
      'Độ phức tạp không gian: Mảng phụ aux[] kích thước 2n -> O(n).',
    ],
    modelAnswer: `1. Ý tưởng thuật toán:
- Mảng dạng núi gồm:
  + Nửa đầu a[0..n-1] đã được sắp xếp tăng dần.
  + Nửa sau a[n..2n-1] được sắp xếp giảm dần. Nếu ta duyệt nửa sau theo chiều ngược lại từ j = 2n - 1 lùi dần về n, các phần tử sẽ có thứ tự TĂNG DẦN!
- Do đó, bài toán quy về việc TRỘN (Merge) hai mảng con đã tăng dần thành một mảng kết quả tăng dần duy nhất. Ta sử dụng kỹ thuật 2 con trỏ (Two Pointers) tương tự như hàm merge() của Mergesort.

2. Cài đặt thuật toán bằng Java:
public static int[] sortMountainArray(int[] a, int n) {
    int[] aux = new int[2 * n];
    int i = 0;          // Con trỏ chạy từ đầu nửa trái (tăng dần)
    int j = 2 * n - 1;  // Con trỏ chạy từ cuối nửa phải (tăng dần)
    int k = 0;          // Con trỏ ghi vào mảng kết quả aux

    while (k < 2 * n) {
        if (i >= n)             aux[k++] = a[j--]; // Nửa trái đã hết
        else if (j < n)         aux[k++] = a[i++]; // Nửa phải đã hết
        else if (a[i] <= a[j])  aux[k++] = a[i++];
        else                    aux[k++] = a[j--];
    }
    return aux;
}

3. Phân tích độ phức tạp:
- Thời gian: Vòng lặp while chạy đúng 2n lần, mỗi bước chỉ thực hiện 1 phép so sánh và 1 phép gán hằng số O(1) -> Tổng thời gian O(n) tuyến tính ở trường hợp xấu nhất!
- Không gian (Bộ nhớ phụ): Sử dụng mảng phụ aux[] kích thước 2n -> O(n) bộ nhớ.`,
    keyPoints: ['2 con trỏ|two-pointer', 'trộn|merge', 'o(n)|tuyến tính', 'aux', 'j--'],
  },

  // =========================================================================
  // BÀI TỰ LUẬN GIỮA KỲ 7: DỰNG CÂY NHỊ PHÂN TỪ PREORDER & INORDER
  // =========================================================================
  {
    id: 'essay-tree-reconstruction',
    topic: 'Cây nhị phân / Khôi phục cây từ Preorder & Inorder',
    source: 'Đề thi giữa kỳ UET truyền thống & algs4',
    maxScore: 2.0,
    estimatedMinutes: 8,
    isMidterm: true,
    prompt: `Cho kết quả duyệt của một Cây nhị phân gồm các ký tự phân biệt:
- Duyệt Tiền thứ tự (Preorder):  A  B  D  E  C  F  G
- Duyệt Trung thứ tự (Inorder):   D  B  E  A  F  C  G
Hãy:
a. Nêu nguyên lý xác định nút gốc, cây con trái và cây con phải từ 2 chuỗi trên.
b. Dựng lại cấu trúc cây nhị phân ban đầu (vẽ hoặc mô tả đầy đủ các nút và liên kết cha-con).
c. Cho biết kết quả duyệt Hậu thứ tự (Postorder) của cây vừa dựng.`,
    hints: [
      'Preorder có thứ tự: Gốc -> Trái -> Phải. Phần tử đầu tiên của Preorder luôn là Gốc!',
      'Tìm vị trí phần tử Gốc trong Inorder: toàn bộ các phần tử bên trái gốc thuộc Cây con trái; các phần tử bên phải gốc thuộc Cây con phải!',
      'Postorder có thứ tự: Trái -> Phải -> Gốc.',
    ],
    rubricCriteria: [
      'Phần a: Giải thích đúng nguyên lý: Preorder lấy phần tử đầu làm Root; Inorder tìm Root để chia đôi không gian thành Cây con trái và Cây con phải.',
      'Phần b: Dựng đúng cấu trúc cây: Gốc A; Con trái là B (B có con trái D, con phải E); Con phải là C (C có con trái F, con phải G).',
      'Phần c: Đưa ra đúng chuỗi duyệt Postorder: D  E  B  F  G  C  A.',
    ],
    modelAnswer: `a. Nguyên lý đệ quy khôi phục cây:
- Tiền thứ tự (Preorder = Root -> Left -> Right): Phần tử đầu tiên luôn luôn là NÚT GỐC (Root) của cây/cây con hiện tại.
- Trung thứ tự (Inorder = Left -> Root -> Right): Tìm vị trí của nút gốc vừa xác định trong chuỗi Inorder. Nút gốc sẽ chia Inorder thành hai phần riêng biệt:
  + Tất cả các phần tử nằm bên TRÁI nút gốc thuộc về CÂY CON TRÁI.
  + Tất cả các phần tử nằm bên PHẢI nút gốc thuộc về CÂY CON PHẢI.
- Đếm số lượng phần tử của cây con trái (k phần tử). Khi đó trong Preorder, k phần tử kế tiếp sau gốc sẽ thuộc cây con trái, và các phần tử còn lại thuộc cây con phải.
- Lặp lại quy trình đệ quy cho cây con trái và cây con phải.

b. Các bước dựng cây chi tiết:
1. Gốc toàn cây là A (phần tử đầu của Preorder).
2. Tìm A trong Inorder: [D, B, E] | A | [F, C, G].
   - Cây con trái gồm {D, B, E} (3 phần tử).
   - Cây con phải gồm {F, C, G} (3 phần tử).
3. Xét Cây con trái:
   - Trong Preorder, 3 phần tử tiếp theo là [B, D, E] -> Gốc cây con trái là B.
   - Trong Inorder [D, B, E]: D nằm bên trái B -> D là con trái của B; E nằm bên phải B -> E là con phải của B.
4. Xét Cây con phải:
   - Trong Preorder, 3 phần tử còn lại là [C, F, G] -> Gốc cây con phải là C.
   - Trong Inorder [F, C, G]: F nằm bên trái C -> F là con trái của C; G nằm bên phải C -> G là con phải của C.

Cấu trúc Cây nhị phân hoàn chỉnh:
         A
       /   \\
      B     C
     / \\   / \\
    D   E F   G

c. Kết quả duyệt Hậu thứ tự (Postorder = Left -> Right -> Root):
- Nhánh trái: D -> E -> B
- Nhánh phải: F -> G -> C
- Gốc: A
=> Chuỗi Postorder: D  E  B  F  G  C  A.`,
    keyPoints: ['preorder|tiền thứ tự', 'inorder|trung thứ tự', 'gốc a', 'postorder', 'd e b f g c a'],
  },

  // =========================================================================
  // BÀI TỰ LUẬN CUỐI KỲ: ĐỒ THỊ & BFS (FINAL EXAM ONLY)
  // =========================================================================
  {
    id: 'essay-graph-bfs',
    topic: 'Đồ thị vô hướng & BFS',
    source: 'Đề cuối kỳ UET HK1 2024-2025 — Câu 7',
    maxScore: 2,
    estimatedMinutes: 8,
    isMidterm: false,
    prompt: `Đảo quốc X có N đảo (0..N-1), quân đóng ở đảo 0. Trực thăng chỉ bay từng chặng an toàn giữa 2 đảo gần nhau (mỗi chặng mất thời gian như nhau = 1). Cho E chặng bay an toàn hai chiều.
Hãy thiết kế thuật toán lập kế hoạch chuyển quân từ đảo 0 tới tất cả các đảo sao cho thời gian chuyển quân đến từng đảo là ngắn nhất và truy vết được tuyến đường.
Ví dụ N=6, cạnh: (0,3), (0,5), (1,2), (1,4), (1,5), (2,3), (2,4), (3,4), (3,5), (4,5). Nêu ý tưởng, cấu trúc dữ liệu, độ phức tạp theo N và E.`,
    hints: [
      'Đồ thị vô hướng không trọng số -> đường đi thời gian ngắn nhất = ít chặng (cạnh) nhất -> BFS!',
      'Dùng Danh sách kề + Queue<Integer> + mảng marked[N], edgeTo[N], distTo[N].',
    ],
    rubricCriteria: [
      'Mô hình hóa được bài toán về Đồ thị vô hướng (đỉnh = đảo, cạnh = chặng bay an toàn).',
      'Chọn thuật toán BFS (Tìm kiếm theo chiều rộng) xuất phát từ đỉnh 0 trên Danh sách kề.',
      'Dùng mảng marked[], edgeTo[], distTo[] và Queue<Integer> để lưu cha truy vết tuyến đường.',
      'Độ phức tạp thời gian: O(N + E) hay O(V + E).',
    ],
    modelAnswer: `1. Mô hình hóa đồ thị:
- Đỉnh: N hòn đảo (0..N-1), đỉnh nguồn s = 0.
- Cạnh vô hướng: E chặng bay an toàn giữa hai đảo. Mỗi chặng có chi phí thời gian bằng 1 đơn vị.

2. Ý tưởng & Cấu trúc dữ liệu:
- Vì đồ thị vô hướng KHÔNG trọng số, đường đi ngắn nhất tính theo số chặng chính là kết quả của thuật toán Tìm kiếm theo chiều rộng (BFS) bắt đầu từ đỉnh 0.
- Biểu diễn đồ thị bằng Danh sách kề (adj[0..N-1]).
- Sử dụng Queue<Integer> q, mảng boolean marked[N], int edgeTo[N] (để truy vết đường đi), int distTo[N] (lưu số chặng).

3. Thuật toán:
- Khởi tạo marked[0]=true, distTo[0]=0, q.enqueue(0).
- Trong khi !q.isEmpty(): lấy v = q.dequeue(). Duyệt mọi w kề v: nếu !marked[w], gán marked[w]=true, edgeTo[w]=v, distTo[w]=distTo[v]+1, q.enqueue(w).
- Để in tuyến đường tới đảo v: lần ngược từ v về 0 qua edgeTo[x] và đẩy vào Stack.

4. Độ phức tạp: Thời gian O(N + E), Bộ nhớ O(N + E).`,
    keyPoints: ['bfs|chiều rộng', 'queue', 'edgeto', 'o(n + e)|o(v + e)'],
  },
];
