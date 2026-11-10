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

Next.js (App Router) · TypeScript · Tailwind CSS v4 · react-three-fiber + three · `next/font` (Montserrat, Be Vietnam Pro).

## Quy tắc bắt buộc

- **Màu và font theo Bộ nhận diện v1.4**: token ở `src/app/globals.css`. Không gradient, không ánh kim giả, không xanh dương công nghiệp.
- **Không giá, không chiết khấu, không tên đối thủ, không tên hãng gốc, không số liệu chưa xác nhận.** Chỗ chưa có dữ liệu: `[CHỖ TRỐNG]` hoặc "Đang chờ xác nhận".
- **Không lưu dữ liệu khách trong repo hay trên máy chủ web.** Không commit `.env`, khóa API, tệp có thông tin khách.
- **Ảnh minh họa luôn gắn nhãn**; ảnh tạm chỉ từ nguồn cho dùng thương mại, ghi nguồn vào `public/images/NGUON-ANH.md`.
- **Push lên GitHub chỉ sau khi chủ dự án duyệt** mốc có nội dung công khai.
