# Ảnh công trình cho hộp chi tiết hệ cửa (12/11/2026)

Các script Python dùng một lần để tìm ảnh công trình, ghi lại để biết nguồn và làm lại được. Đường dẫn trong script là thư mục làm việc tạm của lần chạy đó, cần sửa lại khi chạy trên máy khác.

Thứ tự: `crawl-civro.py` (quét 26 trang dự án trên civro.com, lấy mã hệ ghi trong từng dự án) → `dl-civro.py` (tải ảnh lớn, bỏ ảnh giữ chỗ) → `build-civro.py` (ghép dự án với hệ Civro theo mã, ghi `civro-du-lieu.json`) → `dl-rom.py` (tải ảnh từ thư mục Drive "5. ẢNH CÔNG TRÌNH" của Romadio qua `drive.google.com/thumbnail`) → `build-all.py` (gộp Civro, Romadio, Ponzio, đổi sang WebP trong `public/images/he-cua/cong-trinh/` và ghi `src/lib/he-cua-cong-trinh.ts`).

Nguyên tắc: ảnh chỉ gắn theo hãng và kiểu hệ; chỉ ghi "Dự án có dùng hệ này theo hãng" (`dungMa`) khi trang dự án của hãng nêu đúng mã hệ. Anh Huy chịu trách nhiệm bản quyền ảnh, mỗi ảnh có link nguồn. Ponzio chỉ có ảnh cho cửa trượt SL1300 TT và SL1600 TT (trang chính thức của hãng không có thư viện dự án); Ponzio cửa sổ và cửa đi chưa có.
