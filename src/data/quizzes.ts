import { EssayQuestion, McqQuestion } from '../types';

export const MCQ_QUESTIONS: McqQuestion[] = [
  {
    id: 'mcq-1',
    topic: 'Mergesort & Complexity',
    source: 'COS226 Midterm f25, 5a',
    type: 'tf',
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
    question: 'Đúng hay Sai: Xét bài toán sắp xếp một mảng n phần tử mà các khóa chỉ gồm 4 giá trị phân biệt. Có thể thiết kế thuật toán dùng không quá 4n phép so sánh trong trường hợp xấu nhất.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'ĐÚNG! Ví dụ quicksort 3-way partition 3 lần (hoặc tạo 4 bucket / so sánh mỗi phần tử với tối đa 3 chốt để phân vào 4 nhóm 0, 1, 2, 3) chỉ mất tối đa 3n phép so sánh (<= 4n)!',
    trapNote: 'Đừng nhầm với cận dưới Ω(n log n) — cận dưới chỉ áp dụng khi n khóa phân biệt!',
  },
  {
    id: 'mcq-4',
    topic: 'Priority Queue & Heap',
    source: 'COS226 Midterm f25, 5d',
    type: 'tf',
    question: 'Đúng hay Sai: Xét một Max-Heap có ít nhất 8 key. Gọi x là key tại nút ở độ sâu 2 (gốc ở độ sâu 0) và y là key tại nút ở độ sâu 4. Khi đó, chắc chắn x >= y.',
    options: ['Đúng', 'Sai'],
    correctIndex: 1,
    explanation: 'SAI! Tính chất Heap chỉ đảm bảo cha >= con (tức là theo quan hệ TỔ TIÊN - CON CHÁU trên cùng nhánh). Nếu x và y nằm ở 2 nhánh khác nhau, x hoàn toàn có thể nhỏ hơn y! (Ví dụ gốc=100, con trái=90, con phải=20 ở độ sâu 1 -> con ở độ sâu 2 bên nhánh phải có thể nhỏ hơn cháu ở độ sâu 4 bên nhánh trái).',
    trapNote: 'Cạm bẫy kinh điển nhất về Heap: KHÔNG có thứ tự giữa các nhánh anh em!',
  },
  {
    id: 'mcq-5',
    topic: 'BST',
    source: 'COS226 Midterm f25, 5e',
    type: 'tf',
    question: 'Đúng hay Sai: Cho hai BST, mỗi cây chứa n key (2n key phân biệt). Có thể tạo 1 BST chứa 2n key đó bằng không quá 2n phép so sánh.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'ĐÚNG! Duyệt Inorder cả 2 BST để thu 2 mảng đã sắp xếp (0 phép so sánh), trộn 2 mảng trong tối đa 2n-1 phép so sánh thành 1 mảng tăng dần, rồi dựng lại BST cân bằng từ mảng đã sắp xếp (0 phép so sánh!). Tổng <= 2n phép so sánh.',
    trapNote: 'Không chèn từng phần tử từ cây này sang cây kia (sẽ tốn n log n), mà dùng Inorder + Merge + Build!',
  },
  {
    id: 'mcq-6',
    topic: 'Balanced Trees (LLRB)',
    source: 'COS226 Midterm f25, 5f',
    type: 'tf',
    question: 'Đúng hay Sai: Khi chèn 1 key vào cây BST đỏ-đen nghiêng trái (LLRB), có thể xảy ra chuỗi liên tiếp 2 (hoặc hơn) bước `rotateLeft` mà không có `flipColors` hay `rotateRight` xen giữa.',
    options: ['Đúng', 'Sai'],
    correctIndex: 1,
    explanation: 'SAI! Tại mỗi tầng h: nếu h là con trái, quay lên cha thì liên kết đỏ nằm bên trái nên cha chỉ có thể kích hoạt `rotateRight` hoặc `flipColors`; nếu h là con phải, trong LLRB ban đầu không có liên kết đỏ nghiêng phải nên h bắt buộc có màu ĐEN, sau `rotateLeft(h)` gốc mới kế thừa màu ĐEN của h nên cha phía trên vẫn có con phải ĐEN (trừ khi `flipColors(h)` chạy xen giữa) — do đó KHÔNG thể kích hoạt `rotateLeft` liên tiếp ngay được!',
    trapNote: 'Nhớ 3 bước ở mỗi tầng: rotateLeft -> rotateRight -> flipColors.',
  },
  {
    id: 'mcq-7',
    topic: 'Stack & Queue / Resizing Array',
    source: 'COS226 Midterm s25, 5b',
    type: 'tf',
    question: 'Đúng hay Sai: Một mảng co giãn chứa n giá trị kiểu double, tăng kích thước gấp 4 khi đầy và giảm một nửa khi chỉ chứa 1/3 dung lượng. Khi đó bộ nhớ mảng trong trường hợp xấu nhất là ~24n bytes.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'ĐÚNG! Mỗi `double` tốn 8 bytes. Trường hợp xấu nhất là ngay trước khi thu gọn: mảng đang chứa đúng > 1/3 dung lượng (tức dung lượng M gần bằng 3n), nên kích thước bộ nhớ mảng là 3n * 8 = 24n bytes!',
    trapNote: '1 double = 8 bytes; 1 int = 4 bytes; tham chiếu đối tượng 64-bit = 8 bytes.',
  },
  {
    id: 'mcq-8',
    topic: 'Balanced Trees (LLRB)',
    source: 'COS226 Midterm s25, 5e',
    type: 'tf',
    question: 'Đúng hay Sai: Khi thêm 1 key vào cây LLRB, mỗi phép `rotateRight` đều có một phép `flipColors` thực hiện ngay sau đó.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'ĐÚNG! Phép `rotateRight(h)` chỉ chạy khi `isRed(h.left) && isRed(h.left.left)`. Sau khi xoay phải `h`, nút gốc mới sẽ có CẢ con trái VÀ con phải màu ĐỎ! Do đó câu lệnh `if (isRed(h.left) && isRed(h.right)) flipColors(h);` ngay bên dưới CHẮC CHẮN sẽ chạy!',
    trapNote: 'Đoạn mã 3 if của LLRB: rotateRight luôn kéo theo flipColors tại chính nút đó.',
  },
  {
    id: 'mcq-9',
    topic: 'Union-Find',
    source: 'algs4 Tuần 1',
    type: 'mcq',
    question: 'Với WeightedQuickUnionUF có N = 1024 phần tử (không dùng path compression), chiều cao tối đa của một cây bất kỳ là bao nhiêu?',
    options: ['10 (tức lg N)', '512 (tức N/2)', '1024 (tức N)', '32 (tức sqrt(N))'],
    correctIndex: 0,
    explanation: 'Chiều cao của cây gốc x chỉ tăng thêm 1 khi nó bị ghép vào gốc một cây khác có kích thước >= sz[x], tức kích thước cây mới tăng ít nhất gấp ĐÔI. Bắt đầu từ 1, nhân đôi tối đa lg N lần -> chiều cao <= lg(1024) = 10.',
    trapNote: 'QuickUnion thường có chiều cao tối đa N-1; WeightedQuickUnion giảm xuống <= lg N.',
  },
  {
    id: 'mcq-10',
    topic: 'Sorting Properties',
    source: 'algs4 Tuần 4-7',
    type: 'mcq',
    question: 'Cặp thuật toán nào sau đây ĐỀU có tính ỔN ĐỊNH (Stable) trong cài đặt chuẩn của Sedgewick?',
    options: [
      'Insertion Sort và Mergesort',
      'Selection Sort và Quicksort',
      'Heapsort và Mergesort',
      'Shellsort và Insertion Sort',
    ],
    correctIndex: 0,
    explanation: 'Insertion Sort (chỉ đổi khi thực sự nhỏ hơn) và Mergesort (khi bằng lấy nửa trái aux[i++]) đều STABLE. Selection Sort, Shellsort, Quicksort, Heapsort đều KHÔNG ổn định vì hoán đổi phần tử ở khoảng cách xa.',
    trapNote: 'Mẹo nhớ: "In-Merge" ổn định (Insertion, Mergesort). Còn lại (Selection, Shell, Quick, Heap) đều Unstable.',
  },
  {
    id: 'mcq-11',
    topic: 'Hash Tables',
    source: 'algs4 Tuần 10',
    type: 'mcq',
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
    id: 'mcq-12',
    topic: 'Graphs (DFS & BFS)',
    source: 'algs4 Tuần 11',
    type: 'mcq',
    question: 'Độ phức tạp thời gian của DFS và BFS trên đồ thị vô hướng có V đỉnh và E cạnh khi biểu diễn bằng Danh sách kề (Adjacency List) là:',
    options: ['O(V + E)', 'O(V²)', 'O(E log V)', 'O(V log E)'],
    correctIndex: 0,
    explanation: 'Mỗi đỉnh được thăm tối đa 1 lần và mỗi cạnh trong danh sách kề được xét tối đa 2 lần (do đồ thị vô hướng lưu 2 chiều) -> O(V + E). Nếu dùng Ma trận kề (Adjacency Matrix) sẽ là O(V²).',
    trapNote: 'Chú ý phân biệt Danh sách kề O(V + E) và Ma trận kề O(V²).',
  },
];

export const ESSAY_QUESTIONS: EssayQuestion[] = [
  {
    id: 'essay-1',
    topic: 'Độ phức tạp & Mergesort',
    source: 'Đề cuối kỳ UET HK1 2024-2025 — Câu 1',
    maxScore: 1.5,
    estimatedMinutes: 6,
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
      'Đếm đúng vòng 2 trường hợp tốt nhất (hết một nửa sớm sau ~N/2 bước, chính xác với mid = N/2 là nửa phải gồm N/2 - 1 phần tử): ~N/2 bước đầu đọc 2 (aux[j] < aux[i]) + chép 2 = ~2N; ~N/2 bước sau rơi vào i > mid hoặc j > hi không so sánh aux nên chỉ chép 2 = ~N. Tổng toán học chính xác ~5N (đáp án chuẩn UET ghi nhận khoảng ~4N đến ~6N).',
      'Đếm đúng trường hợp tồi nhất (hai nửa xen kẽ nhau gần hết): gần N bước phải so sánh aux[j] < aux[i] (2 lần) + chép (2 lần) = ~4N. Cộng vòng 1 -> ~6N.',
      'Kết luận tổng quát: Cả best-case và worst-case đều có thời gian chạy tuyến tính Θ(N) (khoảng ~4N–5N đến ~6N truy nhập mảng).',
    ],
    modelAnswer: `1. Vòng lặp 1 (copy a sang aux): chạy N lần, mỗi lần thực hiện 1 lần đọc a[k] và 1 lần ghi aux[k] => 2N lần truy nhập mảng.

2. Vòng lặp 2 (trộn từ aux về a): chạy N lần.
- Trường hợp tốt nhất (khi một nửa hết sớm trước, chẳng hạn toàn bộ nửa phải [N/2+1..N-1] nhỏ hơn aux[0]):
  + Khoảng N/2 bước đầu: so sánh aux[j] < aux[i] (2 đọc) + gán a[k] = aux[...] (1 đọc + 1 ghi) = 4*(N/2) = 2N.
  + Khoảng N/2 bước sau: rơi vào nhánh i > mid hoặc j > hi nên bỏ qua phép so sánh aux, chỉ tốn a[k] = aux[...] (2 truy nhập) = N.
  => Tổng chính xác về mặt toán học: 2N + 3N = ~5N (cụ thể 5N - 2 với N chẵn; lưu ý đáp án chấm thi chính thức của UET chấp nhận khoảng ~4N đến ~6N).

- Trường hợp tồi nhất (phần tử hai nửa xen kẽ nhau tới tận phần tử cuối cùng):
  + Gần như cả N bước đều chạy qua phép so sánh aux[j] < aux[i] (2 truy nhập) + phép gán a[k] = aux[...] (2 truy nhập) = ~4N.
  => Tổng tồi nhất: 2N + 4N = ~6N truy nhập mảng.

Kết luận: Cả trường hợp tốt nhất và tồi nhất đều có độ phức tạp tuyến tính Θ(N) (từ ~4N–5N đến ~6N lần truy nhập mảng).`,
    keyPoints: ['2n', '6n', '4n|5n', 'tuyến tính|θ(n)|o(n)'],
  },
  {
    id: 'essay-2',
    topic: 'Stack & Queue',
    source: 'Đề cuối kỳ UET HK1 2024-2025 — Câu 2',
    maxScore: 2,
    estimatedMinutes: 7,
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
    keyPoints: ['[1, 2]|[1,2]', 'true', 's.push(q.dequeue())', 'q.enqueue(s.pop())'],
  },
  {
    id: 'essay-3',
    topic: 'Max-Heap (Priority Queue)',
    source: 'Đề cuối kỳ UET HK1 2024-2025 — Câu 3',
    maxScore: 1.5,
    estimatedMinutes: 6,
    prompt: `Cho Max-Heap nhị phân hiện nằm trong mảng (1-based) có giá trị lần lượt là: [9, 8, 7, 2, 4, 3].
a. Minh họa từng bước quá trình thêm key 10 vào heap (nêu rõ vị trí chèn và các bước swim/đổi chỗ).
b. Từ heap ban đầu [9, 8, 7, 2, 4, 3], hãy minh họa từng bước quá trình xóa key lớn nhất (delMax).`,
    hints: [
      'Mảng [9, 8, 7, 2, 4, 3] tương ứng cây: gốc 9(1), con 8(2) & 7(3); con của 8 là 2(4) & 4(5); con trái của 7 là 3(6).',
      'Khi thêm 10: đặt vào vị trí 7 (con phải của 7), rồi swim lên.',
      'Khi delMax trên [9, 8, 7, 2, 4, 3]: đổi gốc 9(1) với phần tử cuối 3(6), xóa 9, rồi sink(1) với 3.',
    ],
    rubricCriteria: [
      'Câu a: Đặt 10 vào vị trí 7 (con phải của 7): [9, 8, 7, 2, 4, 3, 10].',
      'Câu a: Swim bước 1: 10 > cha là 7 (vị trí 3) -> đổi chỗ 10 và 7 -> [9, 8, 10, 2, 4, 3, 7].',
      'Câu a: Swim bước 2: 10 > cha là 9 (vị trí 1) -> đổi chỗ 10 và 9 -> [10, 8, 9, 2, 4, 3, 7].',
      'Câu b: Đổi gốc 9 với cuối 3 và loại 9 -> [3, 8, 7, 2, 4].',
      'Câu b: Sink 3: so sánh 2 con 8 và 7 -> chọn con lớn hơn là 8 -> đổi 3 và 8 -> [8, 3, 7, 2, 4].',
      'Câu b: Sink 3 tiếp: con của 3 là 2 và 4 -> chọn con lớn hơn là 4 -> đổi 3 và 4 -> [8, 4, 7, 2, 3].',
    ],
    modelAnswer: `a. Thêm key 10 vào heap [9, 8, 7, 2, 4, 3]:
- Bước 1 (Chèn vào cuối - chỉ số 7, là con phải của 7): [9, 8, 7, 2, 4, 3, 10]
- Bước 2 (Swim - so sánh 10 với cha ở vị trí 7/2 = 3 là 7): vì 10 > 7, đổi chỗ -> [9, 8, 10, 2, 4, 3, 7]
- Bước 3 (Swim - so sánh 10 với cha ở vị trí 3/2 = 1 là 9): vì 10 > 9, đổi chỗ -> [10, 8, 9, 2, 4, 3, 7]. Đạt gốc, dừng.

b. Xóa key lớn nhất khỏi heap ban đầu [9, 8, 7, 2, 4, 3]:
- Bước 1 (Lấy 9 ra, đưa phần tử cuối là 3 lên gốc 1): [3, 8, 7, 2, 4]
- Bước 2 (Sink vị trí 1 - giá trị 3): hai con là 8 (vị trí 2) và 7 (vị trí 3). Con lớn hơn là 8. Vì 3 < 8, đổi chỗ 3 và 8 -> [8, 3, 7, 2, 4]
- Bước 3 (Sink vị trí 2 - giá trị 3): hai con là 2 (vị trí 4) và 4 (vị trí 5). Con lớn hơn là 4. Vì 3 < 4, đổi chỗ 3 và 4 -> [8, 4, 7, 2, 3].
- Nút 3 giờ ở vị trí 5 (lá, 2*5 = 10 > 5) nên dừng. Kết quả: [8, 4, 7, 2, 3].`,
    keyPoints: ['[10, 8, 9, 2, 4, 3, 7]|[10,8,9,2,4,3,7]', '[8, 4, 7, 2, 3]|[8,4,7,2,3]', 'swim', 'sink'],
  },
  {
    id: 'essay-4',
    topic: 'BST & Cây Cân Bằng (AVL)',
    source: 'Đề cuối kỳ UET HK1 2024-2025 — Câu 4',
    maxScore: 2,
    estimatedMinutes: 9,
    prompt: `Cho chuỗi khóa: 80, 20, 40, 30, 10, 100, 70, 90, 50 (thêm lần lượt vào cây rỗng).
a. Mô tả cấu trúc cây tìm kiếm nhị phân (BST thường) kết quả (liệt kê cha-con từng nút hoặc vẽ dạng cây thụt lề).
b. Làm lại với cây AVL (chỉ rõ các bước chèn làm mất cân bằng và phép xoay LL / RR / LR / RL tương ứng).`,
    hints: [
      'Dùng tab "Tổng kết & Mô phỏng" -> Chọn "BST & AVL Tree Simulator" để tự kiểm chứng trực quan từng phép xoay!',
      'Chú ý bước chèn 40 sau khi đã có 80 -> left 20 -> right 40: nút 80 bị lệch LR (trái-phải)!',
    ],
    rubricCriteria: [
      'Câu a (BST thường): Gốc 80; 20 là trái của 80, 100 là phải của 80; 10 là trái 20, 40 là phải 20; 30 là trái 40, 70 là phải 40; 50 là trái 70; 90 là trái 100.',
      'Câu b (AVL): Khi chèn 80, 20, 40 -> nút 80 mất cân bằng dạng LR -> Xoay trái tại 20 rồi xoay phải tại 80 -> Gốc mới là 40 (trái 20, phải 80).',
      'Câu b (AVL): Chèn 30 (phải 20), 10 (trái 20), 100 (phải 80), 70 (trái 80) -> cây vẫn cân bằng.',
      'Câu b (AVL): Chèn 90 (trái 100), 50 (trái 70) -> kiểm tra balance factor toàn cây vẫn thuộc {-1, 0, 1} => Gốc cuối là 40!',
    ],
    modelAnswer: `a. Cây BST thường (gốc 80):
- 80: left=20, right=100
- 20: left=10, right=40
- 40: left=30, right=70
- 70: left=50, right=null
- 100: left=90, right=null

b. Cây AVL từng bước:
1. Chèn 80 -> [80]
2. Chèn 20 -> 80.left = 20 (bf(80)=1, cân bằng)
3. Chèn 40 -> 20.right = 40. Lúc này bf(80) = +2 và bf(20) = -1 (lệch LR: Trái-Phải).
   -> Thực hiện xoay kép LR: Xoay trái tại 20 (40 lên thay 20, 20 thành trái 40), sau đó Xoay phải tại 80.
   -> Cây mới: Gốc 40 (left=20, right=80).
4. Chèn 30 -> 20.right = 30 (cân bằng)
5. Chèn 10 -> 20.left = 10 (cân bằng)
6. Chèn 100 -> 80.right = 100 (cân bằng)
7. Chèn 70 -> 80.left = 70 (cân bằng)
8. Chèn 90 -> 100.left = 90 (bf(80) = 1 - 2 = -1, vẫn cân bằng)
9. Chèn 50 -> 70.left = 50 (bf(70)=+1, bf(80)=2-2=0, bf(40)=2-3=-1 -> toàn cây cân bằng!).
Kết quả cây AVL: Gốc 40; left=20(10, 30); right=80(70(50, -), 100(90, -)).`,
    keyPoints: ['lr|trái-phải|xoay trái.*xoay phải', '40', '80', '70', '90'],
  },
  {
    id: 'essay-5',
    topic: 'Bảng băm (Hash Table)',
    source: 'Đề cuối kỳ UET HK1 2024-2025 — Câu 5',
    maxScore: 2,
    estimatedMinutes: 7,
    prompt: `Cho hàm băm h(x) = x mod 11 và bảng băm kích thước M = 11 (chỉ số 0..10). Thêm lần lượt chuỗi khóa: 34, 45, 14, 11, 0, 28, 22, 78, 20, 5, 33.
a. Vẽ trạng thái bảng theo phương pháp Separate Chaining (chuỗi tách biệt).
b. Vẽ trạng thái bảng theo phương pháp Linear Probing (địa chỉ mở).
c. So sánh tình trạng hai bảng, bảng nào có hiệu năng tìm kiếm trung bình tốt hơn?`,
    hints: [
      'Tính trước x mod 11 cho từng số: 34->1, 45->1, 14->3, 11->0, 0->0, 28->6, 22->0, 78->1, 20->9, 5->5, 33->0.',
      'Chú ý có 11 phần tử đưa vào bảng cỡ 11 (tức mảng Linear Probing đầy 100%, hệ số tải alpha = 1!).',
    ],
    rubricCriteria: [
      'Tính đúng h(x): 34%11=1, 45%11=1, 14%11=3, 11%11=0, 0%11=0, 28%11=6, 22%11=0, 78%11=1, 20%11=9, 5%11=5, 33%11=0.',
      'Separate Chaining đúng các bucket: [0]: 11->0->22->33, [1]: 34->45->78, [3]: 14, [5]: 5, [6]: 28, [9]: 20.',
      'Linear Probing đúng đủ 11 ô [0..10]: 0:11, 1:34, 2:45, 3:14, 4:0, 5:22, 6:28, 7:78, 8:5, 9:20, 10:33.',
      'So sánh: Separate Chaining tốt hơn rõ rệt khi alpha = N/M = 1 (trung bình ~1-2 bước, trong khi Linear Probing bị dồn cục nặng, đặc biệt chuỗi dài 11 ô liên tiếp khiến tìm thất bại/khóa mới mất rất nhiều bước).',
    ],
    modelAnswer: `Giá trị băm h(x) = x mod 11:
34->1, 45->1, 14->3, 11->0, 0->0, 28->6, 22->0, 78->1, 20->9, 5->5, 33->0.

a. Separate Chaining (mỗi ô là danh sách các khóa cùng hash — vẽ nối đuôi theo thứ tự chèn; nếu dùng SequentialSearchST chèn đầu thì danh sách đảo ngược như [0]: 33->22->0->11, cả hai đều đúng):
[0]: 11 -> 0 -> 22 -> 33
[1]: 34 -> 45 -> 78
[2]: rỗng
[3]: 14
[4]: rỗng
[5]: 5
[6]: 28
[7]: rỗng
[8]: rỗng
[9]: 20
[10]: rỗng

b. Linear Probing (dò tuyến tính (i+1)%11):
- 34->1, 45->2, 14->3, 11->0, 0->0(đầy)->1..3(đầy)->4
- 28->6, 22->0..4(đầy)->5, 78->1..6(đầy)->7, 20->9
- 5->5..7(đầy)->8, 33->0..9(đầy)->10
Mảng kết quả [0..10]: [11, 34, 45, 14, 0, 22, 28, 78, 5, 20, 33].

c. So sánh: Khi N = 11 và M = 11 (hệ số tải alpha = 1.0), Separate Chaining cho hiệu năng trung bình tốt hơn hẳn (mỗi chuỗi dài tối đa 4, trung bình ~1.8 bước), trong khi Linear Probing đầy 100% tạo thành một cụm liên tiếp khổng lồ (primary clustering) khiến tìm kiếm phần tử mới/không có phải duyệt gần hết bảng.`,
    keyPoints: ['[11, 34, 45, 14, 0, 22, 28, 78, 5, 20, 33]', 'separate chaining', 'dồn cục|clustering|alpha'],
  },
  {
    id: 'essay-6',
    topic: 'Đồ thị vô hướng & BFS',
    source: 'Đề cuối kỳ UET HK1 2024-2025 — Câu 7',
    maxScore: 2,
    estimatedMinutes: 8,
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
      'Truy vết đúng ví dụ: dist 1 = {3, 5}; dist 2 từ 3/5 = {2, 4, 1}. Tuyến đường ngắn nhất: 1: 0->5->1, 2: 0->3->2, 3: 0->3, 4: 0->3->4 (hoặc 0->5->4 — chỉ 2 chặng, tối ưu hơn ví dụ in nhầm 0->5->1->4 trong đề), 5: 0->5.',
      'Độ phức tạp thời gian: O(N + E) hay O(V + E) tổng quát (O(E) nếu đồ thị liên thông).',
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

4. Minh họa ví dụ (N=6):
- Lớp 0 (q=[0]): đỉnh 0
- Lớp 1 (kề 0): 3, 5 -> edgeTo[3]=0, edgeTo[5]=0 (dist=1)
- Lớp 2 (từ 3 -> 2, 4; từ 5 -> 1): edgeTo[2]=3, edgeTo[4]=3, edgeTo[1]=5 (dist=2)
Tuyến đường ngắn nhất: 1: 0->5->1; 2: 0->3->2; 3: 0->3; 4: 0->3->4 (hoặc 0->5->4, ngắn hơn ví dụ 0->5->1->4 trong đề); 5: 0->5.

5. Độ phức tạp: Thời gian O(N + E) (hay O(E) với đồ thị liên thông theo đáp án UET), Bộ nhớ O(N + E).`,
    keyPoints: ['bfs|chiều rộng', 'queue', 'edgeto', 'o(n + e)|o(v + e)|tuyến tính'],
  },
  {
    id: 'essay-7',
    topic: 'Thuật toán thiết kế (COS226 Midterm)',
    source: 'COS226 Midterm f25, 7 — UniStack',
    maxScore: 2,
    estimatedMinutes: 10,
    prompt: `Thiết kế cấu trúc dữ liệu UniStack chứa String với push(String s) và pop(), sao cho nếu push một chuỗi đã tồn tại trong stack thì bản cũ bị XÓA khỏi vị trí cũ và bản mới lên đỉnh stack.
Yêu cầu: Bộ nhớ O(n), mỗi thao tác push/pop tốn O(log n) ở trường hợp tồi nhất! Trình bày cách kết hợp các CTDL đã học.`,
    hints: [
      'Để vừa xóa phần tử bất kỳ ở giữa trong O(log n) hoặc O(1), vừa lấy được phần tử mới nhất (top) trong O(log n), ta cần 2 CTDL phối hợp với nhau!',
      'Gợi ý 1: Balanced BST (Red-Black / TreeMap) ánh xạ <String, Node> hoặc <String, Timestamp> + LinkedList đôi hoặc BST thứ 2 theo thứ tự chèn!',
    ],
    rubricCriteria: [
      'Chọn được cấu trúc kết hợp đạt Worst-case O(log n) (CHÚ Ý: HashMap bình thường chỉ O(1) average, worst-case là O(n)! Để đảm bảo O(log n) WORST-CASE nên dùng Balanced BST / RedBlackBST!).',
      'Cách 1 (2 LLRB BST): st1 ánh xạ String -> timestamp (tăng dần t++); st2 ánh xạ timestamp -> String. Khi push(s): nếu st1.contains(s) thì lấy t_old = st1.get(s), xóa t_old khỏi st2; sau đó chèn (s, t_now) vào st1 và (t_now, s) vào st2.',
      'Cách 2 (LLRB BST + Doubly Linked List): st ánh xạ String -> Node trong DLL. Xóa Node ở giữa DLL mất O(1), tìm Node trong BST mất O(log n).',
      'Thao tác pop(): lấy maxKey của st2 (hoặc head của DLL), xóa ở cả hai cấu trúc -> O(log n) worst-case, bộ nhớ O(n).',
    ],
    modelAnswer: `Để đảm bảo O(log n) TRONG TRƯỜNG HỢP TỒI NHẤT (worst-case, không dùng bảng băm vì hash table có worst-case O(n)), ta kết hợp hai cấu trúc dữ liệu (bộ nhớ tổng O(n)):

Cách tối ưu (Red-Black BST + Doubly Linked List hoặc 2 Red-Black BST):
- Dùng biến đếm thời gian tăng dần \`int time = 0;\`.
- Dùng 2 cây Red-Black BST (hoặc TreeMap):
  1. \`keyToTime\`: ánh xạ \`String -> Integer\` (tìm theo tên chuỗi trong O(log n)).
  2. \`timeToKey\`: ánh xạ \`Integer -> String\` (lấy phần tử đỉnh stack bằng \`max()\` trong O(log n)).

Hoạt động:
- \`push(String s)\`:
  + Nếu \`keyToTime.contains(s)\`: lấy \`oldTime = keyToTime.get(s)\`, gọi \`timeToKey.delete(oldTime)\` (O(log n)).
  + Tăng \`time++\`, gọi \`keyToTime.put(s, time)\` và \`timeToKey.put(time, s)\` (O(log n)).
- \`pop()\`:
  + Tìm \`maxTime = timeToKey.max()\`, lấy \`s = timeToKey.get(maxTime)\`.
  + Xóa cả hai: \`timeToKey.delete(maxTime)\` và \`keyToTime.delete(s)\` (tổng O(log n)).
  + Trả về \`s\`.

Cả bộ nhớ lẫn thời gian worst-case đều đạt O(n) và O(log n).`,
    keyPoints: ['red-black|cân bằng|bst|treemap', 'doubly|timestamp|2 cây|hai cây', 'o(log n)', 'delete'],
  },
];
