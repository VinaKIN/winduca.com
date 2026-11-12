# winduca.com

Website **WINDUCA — Premium Window & Door**: cửa nhôm cầu cách nhiệt cao cấp tiêu chuẩn châu Âu, dành cho kiến trúc sư, nhà thầu và chủ nhà.

> Trạng thái: **mốc 1 — bản xem thử nội bộ** (khung trang, hero cửa trượt, mặt cắt nhôm 3D tách lớp). Chưa phải bản công khai: `robots` đang chặn công cụ tìm kiếm.

## Tài liệu

- [`docs/BRIEF-UI-UX.md`](docs/BRIEF-UI-UX.md) — brief UI/UX bàn giao: định vị, nhận diện, sitemap, quy tắc nội dung, form, mốc.

## Chạy trên máy

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

Yêu cầu: Node 20+ (đã thử trên Node 26), npm.

## Công nghệ

Next.js (App Router) · TypeScript · Tailwind CSS v4 · react-three-fiber + three · `next/font` (Roboto).

## Quy tắc bắt buộc

- **Màu và font theo Bộ nhận diện v1.4**: token ở `src/app/globals.css`. Không gradient, không ánh kim giả, không xanh dương công nghiệp.
- **Không giá, không chiết khấu, không tên đối thủ, không tên hãng gốc, không số liệu chưa xác nhận.** Chỗ chưa có dữ liệu: `[CHỖ TRỐNG]` hoặc "Đang chờ xác nhận".
- **Không lưu dữ liệu khách trong repo hay trên máy chủ web.** Không commit `.env`, khóa API, tệp có thông tin khách.
- **Ảnh minh họa luôn gắn nhãn**; ảnh tạm chỉ từ nguồn cho dùng thương mại, ghi nguồn vào `public/images/NGUON-ANH.md`.
- **Push lên GitHub chỉ sau khi chủ dự án duyệt** mốc có nội dung công khai.

## Mở bằng Visual Studio Code

1. Giải nén gói mã nguồn, mở thư mục `winduca.com` bằng VS Code (File > Open Folder). VS Code sẽ gợi ý cài ESLint, Tailwind CSS IntelliSense, Prettier và Claude Code.
2. Chạy `npm install` rồi `npm run dev`, mở http://localhost:3000.
3. Đọc `CLAUDE.md` trước (bản đồ trang, dữ liệu, giao diện, quyết định, ranh đỏ nội dung), sau đó `docs/DESIGN-SYSTEM.md` và `docs/BAN-GIAO.md`.
4. Build bản xem thử tĩnh giống GitHub Pages: xem mục "Lệnh" trong `CLAUDE.md` (phải tạm chuyển `src/app/api` ra ngoài).
5. Gói này không chứa `node_modules`, `.next`, `out` và `.git`. Khóa API, `.env` không được đóng gói; dùng `.env.example` làm mẫu.
