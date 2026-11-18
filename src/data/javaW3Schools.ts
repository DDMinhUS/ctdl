import { JavaLesson } from '../types';

export const JAVA_W3SCHOOLS_LESSONS: JavaLesson[] = [
  // =========================================================================
  // 1. JAVA CĂN BẢN (JAVA BASICS / TUTORIAL)
  // =========================================================================
  {
    id: 'java-intro-syntax',
    title: 'Cú pháp cơ bản & Cấu trúc chương trình Java',
    category: 'basics',
    isMidtermCore: true,
    tags: ['cơ bản', 'main', 'class', 'in ra màn hình', 'println', 'print'],
    summary:
      'Mọi mã lệnh Java đều phải nằm bên trong một Class (Lớp). Tên lớp phải trùng khớp chính xác với tên tệp tin `.java`. Điểm khởi đầu thực thi của mọi chương trình Java độc lập luôn là hàm `main`.',
    syntax: `public class TenLop {
    public static void main(String[] args) {
        // Lệnh thực thi ở đây
        System.out.println("Nội dung");
    }
}`,
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("Chào mừng bạn đến với CTDL&GT UET!");
        System.out.print("Dòng này không xuống dòng. ");
        System.out.println("Dòng này in tiếp theo.");
    }
}`,
    dsaExamTip:
      'Thi giấy UET: Không bao giờ được quên từ khóa `public static void main(String[] args)`. Lưu ý `System` viết hoa chữ S; `String` viết hoa chữ S; kết thúc mỗi câu lệnh PHẢI có dấu chấm phẩy `;`.',
  },
  {
    id: 'java-variables-datatypes',
    title: 'Biến & 8 Kiểu dữ liệu nguyên thủy (Primitive Data Types)',
    category: 'basics',
    isMidtermCore: true,
    tags: ['biến', 'kiểu dữ liệu', 'primitive', 'int', 'double', 'boolean', 'char', 'bộ nhớ'],
    summary:
      'Java là ngôn ngữ định kiểu tĩnh (statically-typed): mọi biến phải được khai báo kiểu dữ liệu rõ ràng trước khi dùng. Java có 8 kiểu nguyên thủy lưu giá trị trực tiếp trên Stack, không tốn phụ phí đối tượng.',
    syntax: `kieuDuLieu tenBien = giaTri;

// 8 Kiểu nguyên thủy:
byte (1B), short (2B), int (4B), long (8B)
float (4B), double (8B), boolean (1B/jvm), char (2B Unicode)`,
    codeExample: `public class DataTypesDemo {
    public static void main(String[] args) {
        int count = 1000;               // 4 bytes: -2^31 đến 2^31 - 1
        long largeNumber = 9876543210L; // 8 bytes: có hậu tố L
        double price = 19.99;           // 8 bytes: số thực độ chính xác kép
        char grade = 'A';               // 2 bytes: ký tự trong nháy đơn ''
        boolean isConnected = true;     // 1 byte trên mảng boolean

        System.out.println("Count: " + count + ", Grade: " + grade);
    }
}`,
    dsaExamTip:
      'Trọng tâm thi đếm bộ nhớ 64-bit JVM: Kiểu nguyên thủy KHÔNG có 16 bytes overhead của đối tượng! Ví dụ `int x` tốn đúng 4B; mảng `int[N]` tốn 24B overhead + 4N bytes.',
  },
  {
    id: 'java-type-casting',
    title: 'Ép kiểu dữ liệu (Type Casting: Widening & Narrowing)',
    category: 'basics',
    isMidtermCore: true,
    tags: ['ép kiểu', 'casting', 'narrowing', 'widening', 'chia nguyên'],
    summary:
      'Ép kiểu là chuyển đổi giá trị từ kiểu dữ liệu này sang kiểu khác. Ép kiểu nới rộng (Widening: nhỏ sang lớn) xảy ra tự động. Ép kiểu thu hẹp (Narrowing: lớn sang nhỏ) phải ghi rõ tên kiểu trong ngoặc tròn `(kieu)`.',
    syntax: `// Tự động (Widening): byte -> short -> char -> int -> long -> float -> double
double d = 10; // d = 10.0

// Thủ công (Narrowing):
int i = (int) 9.78; // i = 9 (bị chặt cụt phần thập phân)`,
    codeExample: `public class CastingDemo {
    public static void main(String[] args) {
        int a = 5;
        int b = 2;
        // Bẫy phép chia nguyên: 5 / 2 = 2!
        double wrong = a / b;
        // Đúng: Ép một toán hạng sang double trước khi chia
        double correct = (double) a / b;

        System.out.println("Sai: " + wrong);     // In ra: 2.0
        System.out.println("Đúng: " + correct); // In ra: 2.5
    }
}`,
    dsaExamTip:
      'Bẫy tính trung bình cộng hoặc mid trong Binary Search: Viết `int mid = lo + (hi - lo) / 2;` để tránh tràn số nguyên nếu `lo + hi` vượt quá 2 tỷ (`Integer.MAX_VALUE`).',
  },
  {
    id: 'java-operators',
    title: 'Toán tử: Số học, Gán, So sánh & Logic',
    category: 'basics',
    isMidtermCore: true,
    tags: ['toán tử', 'operators', 'tiền tố', 'hậu tố', 'logic', 'short-circuit'],
    summary:
      'Toán tử thực hiện các phép tính trên biến và giá trị. Cần đặc biệt phân biệt toán tử tiền tố `++i` và hậu tố `i++`, cũng như cơ chế ngắt mạch (short-circuit) của `&&` và `||`.',
    syntax: `// Số học: +  -  *  /  %  ++  --
// So sánh: ==  !=  >  <  >=  <=
// Logic: && (AND ngắt mạch), || (OR ngắt mạch), ! (NOT)`,
    codeExample: `public class OperatorsDemo {
    public static void main(String[] args) {
        int i = 5;
        int a = i++; // a = 5, i thành 6 (dùng giá trị cũ rồi mới tăng)
        int b = ++i; // i thành 7, b = 7 (tăng trước rồi mới dùng)

        // Ngắt mạch: nếu x == null thì không bao giờ gọi x.next (tránh NullPointerException)
        Node x = null;
        if (x != null && x.item.equals("UET")) {
            System.out.println("Tìm thấy!");
        }
    }
}`,
    dsaExamTip:
      'Đề thi algs4: Mergesort dùng `aux[j++]` (lấy giá trị j rồi mới tăng); Quicksort partition dùng `++i` và `--j` (tăng/giảm trước rồi mới so sánh phần tử mảng).',
  },
  {
    id: 'java-strings',
    title: 'Xử lý Chuỗi (Strings, String Pool, .equals vs ==)',
    category: 'basics',
    isMidtermCore: true,
    tags: ['string', 'chuỗi', 'equals', 'string pool', 'bất biến', 'immutable'],
    summary:
      'Trong Java, `String` là đối tượng bất biến (immutable), không phải kiểu nguyên thủy. Chuỗi lưu trong String Pool. So sánh nội dung chuỗi BẮT BUỘC dùng `.equals()`, không dùng toán tử `==`.',
    syntax: `String s = "Hello";
int len = s.length();               // Độ dài chuỗi (có ngoặc tròn!)
char c = s.charAt(0);               // Lấy ký tự tại vị trí index
String sub = s.substring(0, 4);     // Cắt chuỗi từ 0 đến 3
boolean eq = s1.equals(s2);         // So sánh nội dung (ĐÚNG)
int cmp = s1.compareTo(s2);         // < 0 nếu s1 < s2, 0 nếu bằng, > 0 nếu s1 > s2`,
    codeExample: `public class StringDemo {
    public static void main(String[] args) {
        String s1 = new String("UET");
        String s2 = new String("UET");

        // Bẫy so sánh địa chỉ bộ nhớ:
        System.out.println(s1 == s2);      // false (2 vùng nhớ khác nhau!)
        System.out.println(s1.equals(s2));  // true  (nội dung ký tự giống hệt nhau)
    }
}`,
    dsaExamTip:
      'BẪY TRỪ ĐIỂM SỐ 1 KỲ THI UET: Học sinh viết `if (key == x.key)` với kiểu String. Thầy cô trừ 50% số điểm của hàm! Bắt buộc phải viết `if (key.equals(x.key))` hoặc `key.compareTo(x.key) == 0`. Ngoài ra, mảng dùng `a.length` (không ngoặc), còn String dùng `s.length()` (có ngoặc).',
  },
  {
    id: 'java-math',
    title: 'Lớp tiện ích Math (Math.max, Math.min, Math.pow, Math.sqrt, Math.abs)',
    category: 'basics',
    isMidtermCore: true,
    tags: ['math', 'toán học', 'lũy thừa', 'căn bậc hai', 'trị tuyệt đối'],
    summary:
      'Lớp `java.lang.Math` cung cấp các phương thức toán học tĩnh (static), có thể gọi trực tiếp qua `Math.tenHam()` mà không cần khởi tạo đối tượng `new Math()`.',
    syntax: `Math.max(a, b);   // Trả về số lớn hơn
Math.min(a, b);   // Trả về số nhỏ hơn
Math.sqrt(x);     // Căn bậc hai (trả về double)
Math.abs(x);      // Trị tuyệt đối
Math.pow(a, b);   // a mũ b (trả về double)`,
    codeExample: `public class MathDemo {
    public static void main(String[] args) {
        int a = 15, b = 28;
        int maxVal = Math.max(a, b);
        int diff = Math.abs(a - b);
        double root = Math.sqrt(64); // 8.0

        System.out.println("Max: " + maxVal + ", Độ lệch: " + diff);
    }
}`,
    dsaExamTip:
      'Ứng dụng thi giữa kỳ: Tính chiều cao cây AVL: `x.height = 1 + Math.max(height(x.left), height(x.right));`.',
  },
  {
    id: 'java-conditions-ifelse-switch',
    title: 'Cấu trúc điều kiện (If...Else, Toán tử 3 ngôi `?:` & Switch Case)',
    category: 'basics',
    isMidtermCore: true,
    tags: ['if', 'else', 'switch', 'điều kiện', 'toán tử ba ngôi'],
    summary:
      'Điều khiển luồng chương trình dựa trên các biểu thức logic boolean. Toán tử ba ngôi `condition ? valTrue : valFalse` giúp viết mã rút gọn trong các biểu thức gán.',
    syntax: `if (dieuKien1) {
    // lệnh
} else if (dieuKien2) {
    // lệnh
} else {
    // lệnh
}

// Toán tử 3 ngôi:
int max = (a > b) ? a : b;`,
    codeExample: `public class ConditionDemo {
    public static void main(String[] args) {
        int score = 85;
        char grade;

        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else {
            grade = 'C';
        }

        System.out.println("Xếp loại: " + grade);
    }
}`,
    dsaExamTip:
      'Trong code Quick-Union: Luôn viết điều kiện kiểm tra sớm `if (i == j) return;` trước khi thực hiện ghép nối cây để tránh sai lệch số lượng phần tử `sz[]`.',
  },
  {
    id: 'java-loops-while-for',
    title: 'Vòng lặp (While, Do-While, For, For-Each & Break/Continue)',
    category: 'basics',
    isMidtermCore: true,
    tags: ['vòng lặp', 'loop', 'for', 'while', 'for-each', 'break', 'continue'],
    summary:
      'Vòng lặp thực hiện lặp đi lặp lại một khối lệnh khi điều kiện còn đúng. `for` dùng khi biết trước số lần lặp; `while` dùng khi lặp theo điều kiện dừng; `for-each` dùng để duyệt qua các mảng hoặc tập hợp Iterable.',
    syntax: `// Vòng lặp For truyền thống:
for (int i = 0; i < N; i++) { ... }

// Vòng lặp While:
while (dieuKien) { ... }

// Vòng lặp For-Each:
for (Type item : collection) { ... }`,
    codeExample: `public class LoopDemo {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};

        // For duyệt chỉ số mảng
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == 30) continue; // Bỏ qua 30
            System.out.print(arr[i] + " ");
        }

        // For-each duyệt giá trị
        for (int val : arr) {
            if (val > 40) break; // Thoát vòng lặp khi gặp số > 40
        }
    }
}`,
    dsaExamTip:
      'Duyệt danh sách kề đồ thị: Viết `for (int w : G.adj(v))` ngắn gọn và chuẩn xác hơn duyệt chỉ số mảng truyền thống.',
  },
  {
    id: 'java-arrays',
    title: 'Mảng 1 chiều & Mảng 2 chiều (Arrays & Multidimensional Arrays)',
    category: 'basics',
    isMidtermCore: true,
    tags: ['mảng', 'array', 'mảng 2 chiều', 'length', 'khởi tạo', 'matrix'],
    summary:
      'Mảng là cấu trúc dữ liệu lưu trữ tập hợp các phần tử có cùng kiểu dữ liệu tại các ô nhớ liền kề. Kích thước mảng cố định sau khi khởi tạo. Chỉ số mảng chạy từ `0` đến `a.length - 1`.',
    syntax: `// Khởi tạo mảng 1D:
int[] a = new int[N];              // Các phần tử mặc định = 0
String[] s = new String[N];        // Mặc định = null

// Mảng 2 chiều (Ma trận kề đồ thị):
int[][] matrix = new int[V][V];
int val = matrix[row][col];`,
    codeExample: `public class ArrayDemo {
    public static void main(String[] args) {
        int N = 5;
        int[] id = new int[N];
        for (int i = 0; i < N; i++) {
            id[i] = i; // Khởi tạo Quick-Find
        }

        // Mảng 2D biểu diễn ma trận kề
        int V = 4;
        boolean[][] adj = new boolean[V][V];
        adj[0][1] = true; // Cạnh (0, 1)
        adj[1][0] = true;

        System.out.println("Độ dài mảng id: " + id.length);
    }
}`,
    dsaExamTip:
      'Thi giấy: Mảng lấy kích thước bằng thuộc tính `a.length` (KHÔNG có dấu ngoặc tròn). Viết `a.length()` sẽ bị trừ điểm cú pháp!',
  },

  // =========================================================================
  // 2. JAVA PHƯƠNG THỨC & ĐỆ QUY (METHODS & RECURSION)
  // =========================================================================
  {
    id: 'java-methods-overloading',
    title: 'Phương thức, Tham số & Nạp chồng (Method Overloading)',
    category: 'methods',
    isMidtermCore: true,
    tags: ['phương thức', 'hàm', 'overloading', 'nạp chồng', 'tham số', 'return'],
    summary:
      'Phương thức là một khối lệnh chỉ thực thi khi được gọi. Nạp chồng phương thức (Overloading) cho phép nhiều phương thức có CÙNG TÊN nhưng KHÁC BIỆT về danh sách tham số (kiểu dữ liệu hoặc số lượng tham số).',
    syntax: `modifier returnType methodName(param1, param2) {
    // thân hàm
    return value;
}`,
    codeExample: `public class MethodDemo {
    // Phương thức 1: tính tổng 2 số nguyên
    public static int plus(int a, int b) {
        return a + b;
    }

    // Nạp chồng: tính tổng 2 số thực
    public static double plus(double a, double b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(plus(10, 20));       // 30
        System.out.println(plus(4.5, 3.2));     // 7.7
    }
}`,
    dsaExamTip:
      'Áp dụng trong cây BST / Mergesort: Viết hàm public làm giao diện gọi hàm private đệ quy: `public void sort(Comparable[] a) { sort(a, 0, a.length - 1); }`.',
  },
  {
    id: 'java-recursion',
    title: 'Đệ quy (Recursion: Điều kiện dừng & Bước đệ quy trong DSA)',
    category: 'methods',
    isMidtermCore: true,
    tags: ['đệ quy', 'recursion', 'base case', 'call stack', 'quicksort', 'mergesort', 'bst'],
    summary:
      'Đệ quy là kỹ thuật một phương thức tự gọi lại chính nó để giải quyết một bài toán con nhỏ hơn. BẮT BUỘC phải có Điều kiện dừng (Base Case) để tránh tràn ngăn xếp gọi hàm (StackOverflowError).',
    syntax: `returnType recursiveMethod(params) {
    if (dieuKienDung) {
        return giaTriCoSo; // Base Case
    }
    return recursiveMethod(paramsNhoHon); // Recursive Step
}`,
    codeExample: `public class RecursionDemo {
    // Tính giai thừa n!
    public static long factorial(int n) {
        if (n <= 1) return 1; // Base case
        return n * factorial(n - 1); // Recursive step
    }

    // Duyệt cây BST In-Order (Đệ quy)
    public static void printInOrder(Node x) {
        if (x == null) return;
        printInOrder(x.left);
        System.out.print(x.key + " ");
        printInOrder(x.right);
    }
}`,
    dsaExamTip:
      'Trong mọi câu hỏi tự luận thuật toán chia để trị (Mergesort, Quicksort, BST put/get, DFS): DÒNG ĐẦU TIÊN CỦA HÀM ĐỆ QUY LUÔN PHẢI LÀ KIỂM TRA ĐIỀU KIỆN DỪNG (`if (hi <= lo) return;` hoặc `if (x == null) return ...`). Quên dòng này coi như thuật toán chạy vô tận!',
  },

  // =========================================================================
  // 3. LẬP TRÌNH HƯỚNG ĐỐI TƯỢNG (JAVA OOP)
  // =========================================================================
  {
    id: 'java-oop-classes-objects',
    title: 'Lớp & Đối tượng (Classes, Objects, Attributes & Constructors)',
    category: 'oop',
    isMidtermCore: true,
    tags: ['oop', 'lớp', 'đối tượng', 'constructor', 'khởi tạo', 'hàm tạo'],
    summary:
      'Lớp (Class) là bản thiết kế khuôn mẫu; Đối tượng (Object) là một thực thể cụ thể được sinh ra từ khuôn mẫu đó thông qua toán tử `new`. Hàm dựng (Constructor) có cùng tên với lớp và không có kiểu trả về.',
    syntax: `public class SinhVien {
    String name;
    int id;

    // Constructor:
    public SinhVien(String name, int id) {
        this.name = name;
        this.id = id;
    }
}`,
    codeExample: `public class StudentDemo {
    public static void main(String[] args) {
        // Tạo đối tượng cụ thể
        SinhVien sv1 = new SinhVien("Minh", 23020001);
        System.out.println("Tên: " + sv1.name + ", MSV: " + sv1.id);
    }
}`,
    dsaExamTip:
      'Hàm tạo trong CTDL: Ví dụ hàm tạo `public QuickFindUF(int N)` khởi tạo mảng `id = new int[N];` và chạy vòng lặp gán `id[i] = i;`.',
  },
  {
    id: 'java-oop-modifiers',
    title: 'Bổ từ truy cập & Từ khóa đặc biệt (public, private, static, final)',
    category: 'oop',
    isMidtermCore: true,
    tags: ['modifier', 'public', 'private', 'static', 'final', 'hằng số', 'truy cập'],
    summary:
      '`private` giới hạn chỉ trong lớp; `public` cho phép truy cập từ mọi nơi. `static` gắn thuộc tính/phương thức với Lớp (dùng chung cho mọi đối tượng). `final` biến thành hằng số không thể sửa đổi sau khi gán.',
    syntax: `private int count;          // Chỉ lớp này thấy
public void display() { }   // Ai cũng gọi được
public static final double PI = 3.14159; // Hằng số tĩnh`,
    codeExample: `public class Counter {
    private static int totalInstances = 0; // Biến static dùng chung
    private final int id;                  // Hằng số gán 1 lần

    public Counter() {
        this.id = ++totalInstances;
    }

    public int getId() { return this.id; }
    public static int getTotal() { return totalInstances; }
}`,
    dsaExamTip:
      'Trong cấu trúc dữ liệu: Luôn để thuộc tính dữ liệu là `private` (như `private int[] id;`, `private Node first;`) để đảm bảo tính đóng gói (Encapsulation). Đề thi UET chấm điểm tính đóng gói rất khắt khe!',
  },
  {
    id: 'java-oop-inner-classes',
    title: 'Lớp lồng nhau (Inner Classes: Cấu trúc Nút `Node` trong Linked List & BST)',
    category: 'oop',
    isMidtermCore: true,
    tags: ['inner class', 'node', 'linked list', 'bst', 'con trỏ', 'lớp lồng'],
    summary:
      'Lớp lồng nhau (Inner Class) là lớp được định nghĩa bên trong một lớp khác. Đây là cách chuẩn mực duy nhất trong Java để biểu diễn cấu trúc Con trỏ (Nút / Node) của Danh sách liên kết, Cây nhị phân và Đồ thị.',
    syntax: `public class MyLinkedList<Item> {
    // Lớp Node lồng bên trong:
    private class Node {
        Item item;
        Node next;
    }
    private Node first;
}`,
    codeExample: `public class BST<Key extends Comparable<Key>, Value> {
    // Cấu trúc Node cây nhị phân tìm kiếm
    private class Node {
        private Key key;
        private Value val;
        private Node left, right;
        private int count; // Số nút cây con

        public Node(Key key, Value val, int count) {
            this.key = key;
            this.val = val;
            this.count = count;
        }
    }
    private Node root;
}`,
    dsaExamTip:
      'Đề thi viết giấy: Khi đề yêu cầu "Cài đặt Stack bằng danh sách liên kết" hoặc "Cài đặt cây BST", 100% trường hợp PHẢI khai báo lớp con `private class Node` ở đầu chương trình. Thiếu lớp này sẽ bị mất 2-3 điểm cấu trúc dữ liệu!',
  },
  {
    id: 'java-oop-interface-comparable',
    title: 'Giao diện & Giao diện Comparable (implements Comparable, compareTo)',
    category: 'oop',
    isMidtermCore: true,
    tags: ['interface', 'comparable', 'compareto', 'sắp xếp', 'giao diện'],
    summary:
      'Giao diện `Comparable<T>` trong gói `java.lang` là trái tim của mọi thuật toán sắp xếp (Sorting) và tìm kiếm (Searching). Nó định nghĩa phương thức duy nhất `int compareTo(T that)`.',
    syntax: `public class MyClass implements Comparable<MyClass> {
    @Override
    public int compareTo(MyClass that) {
        // Trả về < 0 nếu this < that
        // Trả về 0   nếu this == that
        // Trả về > 0 nếu this > that
    }
}`,
    codeExample: `public class Point implements Comparable<Point> {
    private final int x, y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public int compareTo(Point that) {
        if (this.y < that.y) return -1;
        if (this.y > that.y) return +1;
        if (this.x < that.x) return -1;
        if (this.x > that.x) return +1;
        return 0;
    }
}`,
    dsaExamTip:
      'Cực kỳ quan trọng thi giữa kỳ: Không bao giờ được dùng toán tử so sánh `v < w` trên mảng `Comparable[] a`! Luôn viết hàm bổ trợ `private static boolean less(Comparable v, Comparable w) { return v.compareTo(w) < 0; }`.',
  },
  {
    id: 'java-user-input-scanner',
    title: 'Nhập xuất dữ liệu (Scanner, System.in, hasNextInt)',
    category: 'oop',
    isMidtermCore: true,
    tags: ['scanner', 'input', 'nhập dữ liệu', 'system.in', 'đọc file'],
    summary:
      '`Scanner` trong gói `java.util.Scanner` dùng để đọc dữ liệu từ bàn phím (`System.in`) hoặc từ file. Trong giáo trình Princeton algs4, thư viện `StdIn` bọc lại Scanner với cú pháp tương tự.',
    syntax: `import java.util.Scanner;

Scanner sc = new Scanner(System.in);
int n = sc.nextInt();          // Đọc số nguyên tiếp theo
double d = sc.nextDouble();    // Đọc số thực
String s = sc.nextLine();      // Đọc cả dòng văn bản
while (sc.hasNextInt()) { ... } // Đọc đến khi hết dữ liệu (EOF)`,
    codeExample: `import java.util.Scanner;

public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhập số phần tử N: ");
        if (scanner.hasNextInt()) {
            int N = scanner.nextInt();
            System.out.println("N = " + N);
        }
        scanner.close();
    }
}`,
    dsaExamTip:
      'Đề thi trắc nghiệm algs4: Ký hiệu đọc đồ thị từ luồng dữ liệu: `int V = in.readInt(); int E = in.readInt();` tương đương với `scanner.nextInt()`.',
  },

  // =========================================================================
  // 4. CẤU TRÚC DỮ LIỆU & COLLECTIONS (COLLECTIONS FRAMEWORK)
  // =========================================================================
  {
    id: 'java-collections-arraylist',
    title: 'ArrayList (Mảng động tự động tăng kích thước)',
    category: 'collections',
    isMidtermCore: true,
    tags: ['arraylist', 'mảng động', 'collections', 'co giãn', 'list'],
    summary:
      '`ArrayList` là một danh sách động có thể co giãn kích thước tự động khi thêm phần tử (Resizing Array). Cho phép truy xuất ngẫu nhiên phần tử theo chỉ số với thời gian $O(1)$.',
    syntax: `import java.util.ArrayList;

ArrayList<Type> list = new ArrayList<>();
list.add(item);         // Thêm vào cuối O(1) amortized
list.get(index);        // Lấy theo vị trí O(1)
list.set(index, val);   // Gán đè O(1)
list.remove(index);     // Xóa phần tử O(N)
int size = list.size(); // Số lượng phần tử`,
    codeExample: `import java.util.ArrayList;

public class ArrayListDemo {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("SelectionSort");
        names.add("Mergesort");
        names.add("Quicksort");

        System.out.println("Phần tử đầu: " + names.get(0));
        System.out.println("Kích thước: " + names.size());
    }
}`,
    dsaExamTip:
      'Cơ chế Resizing Array trong algs4: Nhân đôi mảng khi đầy (cost $O(N)$ nhưng amortized $O(1)$) và thu hẹp còn một nửa khi số phần tử chạm 1/4 dung lượng mảng.',
  },
  {
    id: 'java-collections-linkedlist',
    title: 'LinkedList (Danh sách liên kết đôi chuẩn Java)',
    category: 'collections',
    isMidtermCore: true,
    tags: ['linkedlist', 'danh sách liên kết', 'queue', 'deque', 'collections'],
    summary:
      '`LinkedList` lưu trữ các phần tử dưới dạng các nút chứa liên kết đến nút trước và nút sau. Thao tác chèn/xóa ở đầu hoặc cuối tốn $O(1)$, nhưng truy xuất theo chỉ số tốn $O(N)$.',
    syntax: `import java.util.LinkedList;

LinkedList<Type> list = new LinkedList<>();
list.addFirst(item);    // Thêm vào đầu O(1)
list.addLast(item);     // Thêm vào cuối O(1)
list.removeFirst();     // Xóa đầu O(1)
list.removeLast();      // Xóa cuối O(1)`,
    codeExample: `import java.util.LinkedList;

public class LinkedListQueueDemo {
    public static void main(String[] args) {
        // Dùng LinkedList như một Hàng đợi (Queue FIFO)
        LinkedList<Integer> queue = new LinkedList<>();
        queue.addLast(10); // Enqueue
        queue.addLast(20);
        queue.addLast(30);

        int first = queue.removeFirst(); // Dequeue -> 10
        System.out.println("Phần tử vừa dequeue: " + first);
    }
}`,
    dsaExamTip:
      'Thi giữa kỳ: Đề thi UET thường yêu cầu tự viết danh sách liên kết từ đầu (`private class Node`) thay vì dùng `java.util.LinkedList` có sẵn, để kiểm tra kỹ năng thao tác con trỏ.',
  },
  {
    id: 'java-collections-hashmap-hashset',
    title: 'HashMap & HashSet (Bảng băm & Tập hợp phần tử duy nhất)',
    category: 'collections',
    isMidtermCore: false,
    tags: ['hashmap', 'hashset', 'bảng băm', 'key-value', 'set', 'tra cứu'],
    summary:
      '`HashMap` lưu trữ theo cặp Khóa - Giá trị (`Key -> Value`) với thời gian tìm kiếm trung bình $O(1)$. `HashSet` chỉ lưu trữ các phần tử duy nhất, tự động loại bỏ trùng lặp.',
    syntax: `import java.util.HashMap;
import java.util.HashSet;

HashMap<KeyType, ValueType> map = new HashMap<>();
map.put(key, value);           // Thêm/cập nhật O(1) average
ValueType v = map.get(key);     // Lấy giá trị O(1)
boolean has = map.containsKey(key);

HashSet<Type> set = new HashSet<>();
set.add(item);
boolean exists = set.contains(item);`,
    codeExample: `import java.util.HashMap;

public class HashMapDemo {
    public static void main(String[] args) {
        HashMap<String, Integer> wordCount = new HashMap<>();
        wordCount.put("DSA", 10);
        wordCount.put("Java", 8);

        if (wordCount.containsKey("DSA")) {
            System.out.println("Điểm DSA: " + wordCount.get("DSA"));
        }
    }
}`,
    dsaExamTip:
      'Trọng tâm thi cuối kỳ: Hiểu bản chất bên trong của HashMap là mảng các danh sách liên kết (Separate Chaining) hoặc mảng hở (Linear Probing). Lưu ý: Worst-case của HashMap là $O(N)$ khi tất cả khóa cùng băm vào 1 ô!',
  },
  {
    id: 'java-wrapper-classes',
    title: 'Lớp bao & Cơ chế Autoboxing/Unboxing (Integer, Double, Boolean)',
    category: 'collections',
    isMidtermCore: true,
    tags: ['wrapper', 'autoboxing', 'unboxing', 'integer', 'bộ nhớ', 'overhead'],
    summary:
      'Các bộ sưu tập Generics trong Java (như `ArrayList<Integer>`) không thể chứa kiểu nguyên thủy thô `int`. Java cung cấp các Lớp bao (Wrapper Classes) tương ứng: `int -> Integer`, `double -> Double`, `char -> Character`.',
    syntax: `// Autoboxing (Tự động bọc int thành Integer):
Integer obj = 100; // Integer.valueOf(100)

// Unboxing (Mở bọc Integer về int):
int val = obj;     // obj.intValue()`,
    codeExample: `public class WrapperDemo {
    public static void main(String[] args) {
        int primitiveInt = 42;
        Integer wrappedInt = primitiveInt; // Autoboxing
        int unboxed = wrappedInt;          // Unboxing

        // Chuyển chuỗi thành số nguyên
        int parsed = Integer.parseInt("2024");
        System.out.println("Năm: " + parsed);
    }
}`,
    dsaExamTip:
      'Cạm bẫy bộ nhớ 64-bit JVM: Một số `int` nguyên thủy tốn đúng 4 bytes. Nhưng một đối tượng `Integer` tốn tới 24 bytes (16 bytes overhead + 4 bytes dữ liệu int + 4 bytes padding)! Mảng `Integer[N]` tốn bộ nhớ gấp hơn 6 lần so với `int[N]`.',
  },
  {
    id: 'java-exceptions-try-catch',
    title: 'Xử lý ngoại lệ (Exceptions: try...catch...finally, throw & throws)',
    category: 'collections',
    isMidtermCore: true,
    tags: ['exception', 'try-catch', 'throw', 'ngoại lệ', 'lỗi runtime'],
    summary:
      'Xử lý ngoại lệ giúp chương trình không bị sập đột ngột khi gặp lỗi lúc chạy (Runtime). Khối `try` chứa mã có thể phát sinh lỗi; khối `catch` bắt và xử lý lỗi; khối `finally` luôn luôn thực thi.',
    syntax: `try {
    // Mã có nguy cơ ném Exception
} catch (ExceptionType e) {
    // Xử lý lỗi
} finally {
    // Luôn chạy (giải phóng tài nguyên)
}

// Tự ném ngoại lệ trong thuật toán:
if (isEmpty()) throw new NoSuchElementException("Stack rỗng!");`,
    codeExample: `import java.util.NoSuchElementException;

public class ExceptionDemo {
    public static int popFromEmpty(int size) {
        if (size == 0) {
            throw new NoSuchElementException("Lỗi: Không thể pop từ cấu trúc rỗng!");
        }
        return 42;
    }

    public static void main(String[] args) {
        try {
            popFromEmpty(0);
        } catch (NoSuchElementException e) {
            System.out.println("Bắt ngoại lệ thành công: " + e.getMessage());
        }
    }
}`,
    dsaExamTip:
      'Chuẩn API giáo trình algs4: Khi cấu trúc `Stack` hoặc `Queue` bị rỗng mà gọi `pop()` hoặc `dequeue()`, bắt buộc ném `new NoSuchElementException("...");`. Nếu tham số truyền vào là null thì ném `new IllegalArgumentException("...");`.',
  },
  {
    id: 'java-lambda-comparator',
    title: 'Biểu thức Lambda & Bộ so sánh Comparator (Java 8+)',
    category: 'collections',
    isMidtermCore: true,
    tags: ['lambda', 'comparator', 'so sánh', 'sắp xếp linh hoạt'],
    summary:
      'Biểu thức Lambda `(params) -> expression` cung cấp cách viết ngắn gọn cho các hàm vô danh. Được dùng chủ yếu với giao diện `Comparator<T>` để sắp xếp mảng/danh sách theo nhiều tiêu chí linh hoạt.',
    syntax: `// Cú pháp Lambda:
(a, b) -> a - b;

// Dùng trong Arrays.sort:
Arrays.sort(arr, (s1, s2) -> s1.length() - s2.length());`,
    codeExample: `import java.util.Arrays;
import java.util.Comparator;

public class LambdaSortDemo {
    public static void main(String[] args) {
        String[] words = {"QuickSort", "BST", "AVLTree", "Heap"};

        // Sắp xếp theo độ dài chuỗi tăng dần bằng Lambda:
        Arrays.sort(words, (a, b) -> a.length() - b.length());

        System.out.println(Arrays.toString(words));
        // Kết quả: [BST, Heap, AVLTree, QuickSort]
    }
}`,
    dsaExamTip:
      'Phân biệt Comparable và Comparator: `Comparable` định nghĩa thứ tự TỰ NHIÊN (Internal) bên trong lớp qua `compareTo()`; `Comparator` định nghĩa thứ tự TÙY BIẾN bên ngoài (External) qua phương thức `compare(a, b)`.',
  },
];
