# WINDUCA.COM — Brief UI/UX (bản 09/11/2026)

> Tài liệu bàn giao cho designer và lập trình viên front-end. Tổng hợp từ ~1.000 câu hỏi và các quyết định của anh Huy (VinaKIN) ngày 09/11/2026. Bản đầy đủ từng quyết định nằm ở thư mục `02-INPUT/02-hinh-anh/Logo/WINDUCA/` của kho Content Agent (các file `quyet-dinh-*.md`).
> **Trạng thái:** mốc 1 (khung + hero + mặt cắt 3D) đã dựng; các khối còn lại là bản mô tả, chưa code.

## 1. Định vị

- **Thương hiệu:** WINDUCA — *Premium Window & Door*, thuộc VinaKIN Group. Cửa nhôm cầu cách nhiệt cao cấp tiêu chuẩn châu Âu.
- **Khách:** kiến trúc sư & nhà thiết kế · nhà thầu · chủ nhà (biệt thự, penthouse). Thứ tự cuộn trên trang chủ: KTS → Chủ nhà → Nhà thầu.
- **Mục tiêu:** lead 70% · thương hiệu 30%. CTA chính: **Nhận hộp mẫu góc nhôm** (chủ nhà), **Tải thư viện kỹ thuật** (KTS), **Gửi bản vẽ nhận bóc tách** (nhà thầu).
- **Cảm xúc:** Tinh xảo · Công nghệ · Sang trọng. "Công nghệ" = kỹ thuật chính xác (đường kích thước, lưới, dấu góc khung), **không** neon, không kiểu cyber.
- **Không phải:** trang đại lý thương mại, landing page giá rẻ.

## 2. Hệ thống nhận diện (theo Bộ nhận diện v1.4, 03/11/2026)

| Token | Mã | Dùng cho | Tỉ lệ |
|---|---|---|---|
| `nga` | `#F4F1EA` | Nền chính | ~55% |
| `than-chi` | `#2B2B2D` | Chữ, nền tối (hero, mặt cắt) | ~20% |
| `inox` | `#C8C9C6` | Viền, đường kẻ | ~9% |
| `kinh-suong` | `#DDE3DF` | Nền nhẹ, bảng thông số | ~7% |
| `champagne` | `#BFA678` | Nhấn, biểu tượng | ~6% |
| `do-do` | `#7B1E2B` | Vạch kẻ, lỗi form | ≤3%, **không làm nút** |

**Ràng buộc cứng:** không gradient · không ánh kim giả · không xanh dương công nghiệp · Champagne **không** làm chữ trên nền Ngà (tương phản 2,1:1) · tiêu đề không giãn chữ quá 0,05em · không chữ nghiêng cho tiêu đề · logo là hình vẽ, không gõ lại bằng font · bo góc ≤ 2px.

**Font:** Montserrat SemiBold (tiêu đề) + Be Vietnam Pro (văn bản), subset tiếng Việt, tự host qua `next/font`. Không thêm font mono; số dùng `tabular-nums`. Nhãn mục: chữ hoa, giãn 0,12em.

**Logo:** header dùng logo ngang (bản âm bản trên nền tối), cỡ tối thiểu 120px; slogan chỉ đi cùng logo chính (hero/footer); biểu tượng vương miện làm favicon. File ở `public/brand/`.

**Chữ ký thiết kế:** vạch Champagne mảnh · hình thoi (motif logo) làm bullet/chấm · dấu góc khung kiểu bản vẽ · lưới 10×10 mờ ở khu kỹ thuật.

**Kính mờ (glassmorphism):** chỉ ở header, thẻ thông số 3D, cửa sổ bật; blur nhẹ + viền 1px, không gradient.

## 3. Sitemap (V1)

1. **Trang chủ** `/`
2. **Hệ cửa** `/he-cua` + 4 trang kiểu cửa: `/he-cua/cua-truot-nang`, `/cua-di-mo-quay`, `/cua-xep-truot`, `/cua-so`
3. **Trải nghiệm** `/trai-nghiem` (Sample Box · Showroom · Tham quan xưởng — ẩn đến khi xác nhận)
4. **Công trình** `/cong-trinh` + `/cong-trinh/<slug>`
5. **Năng lực & Xưởng** `/nang-luc-xuong`
6. **Dành cho KTS** `/danh-cho-kts`
7. **Liên hệ** `/lien-he`
8. **Chính sách** `/chinh-sach-bao-mat`, `/dieu-khoan-su-dung`, `/chinh-sach-cookie`
9. **404** (cửa hé mở + 3 lối đi). Trang ẩn vào trực tiếp thì hiện 404.
+ `/cam-on` (dùng chung, tham số loại: sample-box / showroom / tai-lieu / ban-ve).

**Không tên hãng** (Romadio, Ponzio, Cmech, Winboss, Civro, Airflow) ở bất cứ đâu: nội dung, metadata, tên tệp, alt, tệp tải về. Kiểu cửa dùng tên WINDUCA (Cửa trượt nâng, Cửa đi mở quay, Cửa xếp trượt, Cửa sổ) + khối "Phụ kiện WINDUCA".

## 4. Trang chủ — 9 khối (bản chờ xác nhận)

1. **Hero cửa trượt** — cảnh toàn màn hình, chữ góc dưới trái; hai tấm cửa mở giữa, tự mở ~1,5s rồi theo cuộn, nhích ±2% theo chuột. *(đã dựng)*
2. **Ba thẻ lối tắt** KTS · Chủ nhà · Nhà thầu (cuộn tới khối tương ứng).
3. **Khối KTS** — thư viện kỹ thuật, mặt cắt 2D có đường kích thước.
4. **Mặt cắt 3D tách lớp** — điểm "wow" thứ hai. *(đã dựng)*
5. **Khối Chủ nhà** — nỗi đau, hoàn thiện & cảm giác chạm, Sample Box + Showroom.
6. **Khối Nhà thầu** — gửi bản vẽ nhận bóc tách (kéo-thả ≤ 20MB).
7. **Quy trình 5 bước.**
8. **Công trình & testimonial** (ảnh minh họa có nhãn "Minh họa").
9. **FAQ + form chung + footer.**

Nhãn số "01 / 09" kiểu tạp chí ở đầu mỗi khối. Hai điểm "wow" duy nhất: cửa trượt mở, mặt cắt tách lớp. Chuyển động "phong phú" nhưng giữ ngân sách hiệu năng.

## 5. Quy tắc nội dung (ranh đỏ)

- **Không giá, không khoảng giá, không chiết khấu/hoa hồng, không "ưu đãi", không "số lượng có hạn", không đếm ngược.**
- **Không tên đối thủ.** Không so hơn thua; dùng "phù hợp với…".
- **Không bịa số liệu.** Chưa có phiếu kiểm định → mọi con số kỹ thuật (độ ồn, U-Value, tải gió, tiết kiệm điện…) hiện **"Đang chờ xác nhận"** (ô bảng) hoặc ẩn; không dùng cách nói tuyệt đối ("triệt tiêu hoàn toàn", "tuyệt đối", "không bong tróc").
- **Không ngụ ý WINDUCA tự sản xuất hệ nhôm định hình.** Nguồn gốc chỉ nói: tiêu chuẩn châu Âu + gia công tại xưởng.
- **Dữ liệu khách (tên, SĐT)**: web **không lưu**; chuyển tiếp vào kho mã hóa/CRM của VinaKIN; thông báo nội bộ chỉ ghi mã (`SB-xxxx`, `SR-xxxx`, …), không SĐT; giữ 12 tháng, bản vẽ KTS 30 ngày; có yêu cầu xóa.
- **Ảnh minh họa luôn có nhãn** "Hình ảnh mang tính minh họa" (huy hiệu cố định, không ẩn khi phóng to). Ảnh tạm chỉ từ nguồn cho dùng thương mại (Unsplash/Pexels/Pixabay), ghi nguồn vào `public/images/NGUON-ANH.md`, **xem và đồng ý trước khi tải**.
- **Chỗ chưa có dữ liệu** để `[CHỖ TRỐNG]` / `[CHỜ XÁC NHẬN]` rõ ràng, không điền giả.

## 6. Form & dữ liệu

| Form | Trường |
|---|---|
| Sample Box / Tư vấn (trang chủ) | Họ tên · SĐT/Zalo · Email (tuỳ chọn) · Loại công trình (Biệt thự / Penthouse / Cải tạo nhà phố / Khác) · Tỉnh/thành (tuỳ chọn) · Kiểu cửa quan tâm (chọn sẵn theo trang) · tick đồng ý. **Không thu địa chỉ giao hộp** (sales hỏi qua điện thoại). |
| Đặt lịch showroom | Ngày · Sáng/Chiều · Số người · Nhu cầu + trường chung. Sales xác nhận; không lịch trống thời gian thực. |
| Gửi bản vẽ (nhà thầu/KTS) | Tên công trình · loại hình · kiểu cửa dự kiến · khối lượng (m²) · tỉnh · hạn mong muốn · kênh liên hệ · tệp ≤ 20MB (KTS ≤ 30MB). **Không hỏi ngân sách.** |
| Tải tài liệu KTS | Tên · SĐT/email · Vai trò. Tải ngay; catalog PDF không cần form. |
| Liên hệ | Tên · SĐT/Zalo · Email (tuỳ chọn) · Bạn là · Chủ đề (định tuyến) · Nội dung. |

Chống spam: Cloudflare Turnstile + giới hạn lượt. Đích gửi: email chung (chưa có, `[CHỖ TRỐNG]`) + Telegram. Nhãn mã: `SB`, `SR`, `BV`, `TL`, `LH`. Cookie: từ chối mặc định; GA4, Meta Pixel, Google Maps chỉ chạy sau khi đồng ý.

## 7. Công nghệ

Next.js (App Router) · TypeScript · Tailwind CSS v4 · react-three-fiber + three · tự host font · CMS Sanity (V1: team marketing tự sửa, 1 admin + 2–3 biên tập, chỉ admin xuất bản) · hosting Vercel (gói Pro của VinaKIN) · tên miền đứng tên pháp nhân VinaKIN (chưa mua).

Hiệu năng: LCP < 2,5s, CLS < 0,1, INP < 200ms trên mobile; Lighthouse mobile ≥ 90. Mobile tự giảm hiệu ứng (tắt mưa, parallax nặng; 3D chỉ tải khi bấm "Xem 3D"); tôn trọng `prefers-reduced-motion`; WCAG AA.

## 8. Việc đang chờ dữ liệu từ anh Huy

Cấu trúc 9 mục trang chủ bản đã sửa · chính sách Sample Box (phạm vi giao, phí, điều kiện) · địa chỉ + ảnh showroom + giờ làm việc · email chung · pháp nhân (tên, MST, địa chỉ) · đầu mối dữ liệu cá nhân · thông tin xưởng (tên pháp nhân, năm hoạt động, người xác nhận claim) · DWG mặt cắt + tệp kỹ thuật · bảo hành & giờ hỗ trợ · danh sách công trình thật + đồng ý · mã màu hoàn thiện · tên miền & tài khoản Vercel/Sanity.

## 9. Kế hoạch mốc

| Mốc | Nội dung | Trạng thái |
|---|---|---|
| 1 | Khung, token, header/footer, hero cửa trượt, mặt cắt 3D tách lớp | ✅ dựng (chờ anh duyệt) |
| 2 | Ba thẻ lối tắt, khối KTS/Chủ nhà/Nhà thầu, quy trình, công trình minh họa, FAQ, form | ⏳ |
| 3 | Trang Hệ cửa + 4 kiểu cửa, Trải nghiệm, Dành cho KTS | ⏳ |
| 4 | Công trình, Năng lực & Xưởng, Liên hệ, Chính sách, 404, `/cam-on` | ⏳ |
| 5 | Sanity CMS, form thật (email + Telegram), cookie, đo lường | ⏳ |
| 6 | Kiểm thử thiết bị, Lighthouse, kiểm duyệt ranh đỏ, Vercel, anh duyệt, trỏ tên miền | ⏳ |

**Quy tắc đẩy code:** commit cục bộ mỗi mốc; **chỉ push lên GitHub sau khi anh Huy duyệt** mốc có nội dung công khai (câu 197).
