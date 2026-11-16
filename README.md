# INT2210 // UET DSA — Ôn thi cấp tốc Cấu trúc dữ liệu & Giải thuật

Ứng dụng web ôn thi giữa kỳ và cuối kỳ môn **Cấu trúc dữ liệu và Giải thuật (INT2210 - UET)** theo giáo trình **Princeton Algorithms 4th Edition (`algs4`)**.

## Tính năng chính
- **Lộ trình cấp tốc 5 giờ**: Danh sách công việc theo 4 chặng + Crash Course khôi phục cú pháp Java viết giấy.
- **Phòng luyện Code Java (`algs4` & `AVL`)**: 15 thuật toán cốt lõi với 3 chế độ (Điền khung `___`, Viết trên giấy, Xem code mẫu kèm highlight & giải thích từng dòng Java), hỗ trợ chấm điểm bằng **Gemini AI** hoặc **Rubric Engine Offline**.
- **Đấu trường Quiz**: 7 bài thi tự luận chuẩn đề UET & COS226 (chấm tự động bằng Gemini AI) + 12 câu Trắc nghiệm / Đúng-Sai bẫy kinh điển.
- **Tổng kết & Bộ mô phỏng từng bước**: Trình mô phỏng trực quan SVG cho **BST / AVL Tree (LL, RR, LR, RL)**, **Max-Heap (`swim`/`sink`)**, **Hash Table (Separate Chaining vs Linear Probing)** và **Đồ thị BFS / DFS**.
- **Light / Dark Mode** & hiệu ứng chuyển động mượt mà với Framer Motion.

## Chạy local
```bash
npm install
npm run dev
```

## Cấu hình Gemini API Key (tùy chọn)
Tạo file `.env.local` (đã được `.gitignore` bỏ qua) hoặc dán key trực tiếp trong tab **API & Deploy Web** trên giao diện:
```env
VITE_GEMINI_KEY_1=your_gemini_api_key
```
