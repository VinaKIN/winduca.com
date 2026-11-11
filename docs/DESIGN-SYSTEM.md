# WINDUCA — Hướng dẫn hệ thiết kế (token và linh kiện)

> Phiên bản 11/11/2026. Viết theo khung của bản mô tả "Window Product" mà anh Huy cung cấp, nhưng áp dụng cho **website WINDUCA** và dùng **token đang chạy trong mã** (`src/app/globals.css`). Chỉ mượn cấu trúc quy tắc của bản mô tả, không dùng token hay tên của trang nguồn.
> Quy ước: **must** = bắt buộc, kiểm tra được; **should** = khuyến nghị. Ngôn ngữ giao diện: tiếng Việt. Ranh đỏ VinaKIN áp dụng cho mọi ví dụ nội dung: không giá, không tên hãng hay đối thủ, không số liệu chưa xác nhận, không dữ liệu khách hàng.

---

## 1. Bối cảnh và mục tiêu

**Ý định thiết kế (một câu):** giao diện cửa nhôm kính cao cấp, gọn và chính xác như bản vẽ kỹ thuật, tối ưu để chủ nhà, kiến trúc sư và nhà thầu tìm được đúng hệ cửa và để lại thông tin liên hệ.

- **Sản phẩm:** website giới thiệu và thu lead (không bán hàng trực tiếp, không báo giá).
- **Đối tượng:** chủ nhà, kiến trúc sư, nhà thầu, đại lý.
- **Bề mặt:** website tĩnh (Next.js) trên GitHub Pages; biểu mẫu gửi qua Worker.
- **Mục tiêu:** (1) nhất quán token và linh kiện giữa các trang, (2) đạt WCAG 2.2 mức AA, (3) thêm trang hoặc khối mới mà không phát sinh ngoại lệ về khoảng cách và chữ.
- **Phạm vi:** các linh kiện đang có trong mã (mục 3). Không bao gồm trang quản trị hay cửa hàng.

---

## 2. Token và nền tảng

Token **must** được dùng theo tên ngữ nghĩa (cột "Dùng cho"), không dùng mã màu thô trong linh kiện. Giá trị lấy từ biến CSS trong `globals.css`.

### 2.1 Màu

| Token ngữ nghĩa | Biến CSS / lớp | Dùng cho |
|---|---|---|
| `color.text.primary` | `--than-chi` / `text-than-chi` | Chữ chính trên nền sáng |
| `color.text.secondary` | `text-than-chi` với độ mờ **≥ 0,7** | Chữ phụ trên nền sáng |
| `color.text.inverse` | `text-white` (độ mờ **≥ 0,7**) | Chữ trên nền tối |
| `color.text.accent` | `--accent-text` / `text-accent` (đổi theo bề mặt gần nhất) | Nhãn, số thứ tự, liên kết nhấn (xem 2.1.2) |
| `color.surface.base` | `#ffffff` / `.mat-sang` | Nền khối sáng |
| `color.surface.muted` | `--nga` / `.mat-nga` | Nền khối xen kẽ |
| `color.surface.inverse` | `.mat-toi` | Nền khối tối |
| `color.border.subtle` | `--inox`, `border-than-chi/10` | Đường kẻ mảnh |
| `color.action.primary` | `--accent` | Nút chính |
| `color.action.primary.hover` | `--accent-dam` | Nút chính khi rê chuột |
| `color.focus.ring` | `--accent` | Vòng focus |

#### 2.1.1 Tỷ lệ tương phản đã đo (WCAG 2.2)

| Cặp màu | Tỷ lệ | Chữ thường (≥ 4,5) | Chữ lớn / thành phần giao diện (≥ 3) |
|---|---|---|---|
| Chữ chính / nền trắng | 16,3 | đạt | đạt |
| Chữ chính / Ngà | 14,7 | đạt | đạt |
| Chữ trắng / nút nhấn | 4,71 | đạt (sát ngưỡng) | đạt |
| Chữ trắng / nút nhấn khi hover | 6,65 | đạt | đạt |
| Màu nhấn gốc (`--accent`) làm chữ / nền trắng | 4,71 | đạt (sát ngưỡng) | đạt |
| Màu nhấn gốc làm chữ / Ngà | **4,25** | **không đạt** | đạt |
| Màu nhấn gốc làm chữ / nền tối | **3,92** | **không đạt** | đạt |
| Chữ nhấn trên nền sáng (`--accent-text`, đỏ đậm) / trắng, Ngà | 5,88 / 5,08–5,31 | đạt | đạt |
| Chữ nhấn trên nền tối (`--accent-text`, đỏ sáng) / nền tối | 4,94–6,10 | đạt | đạt |
| Chữ trắng / nền tối | 18,46 | đạt | đạt |

#### 2.1.2 Quy tắc dùng màu nhấn
- Màu nhấn gốc (`--accent`) **must** chỉ dùng làm nền nút, nền chấm, đường kẻ, viền và vòng focus, không dùng làm chữ cỡ thường.
- Chữ nhấn **must** dùng `text-accent`, lớp này đã đọc biến `--accent-text` của **bề mặt gần nhất**: đỏ đậm trên nền trắng/Ngà, đỏ sáng trên nền tối (`.bg-than-chi`, `.mat-toi`, `.nen-toi`, `.hero-gradient`, `.kinh-mo`, `.text-white`). Linh kiện **must not** tự đặt màu chữ đỏ khác.
- Bề mặt mới có nền đặc **must** khai báo một trong các lớp bề mặt trên để chữ nhấn nhận đúng màu.
- Vòng focus màu nhấn trên nền tối (3,92) **should** giữ độ dày 2px và offset 3px để đạt ngưỡng 3:1 cho thành phần giao diện.
- Độ mờ của chữ **must** ≥ 0,65 trên nền sáng và ≥ 0,70 trên nền tối (đo được trên nền trắng: 0,5 → 3,21; 0,55 → 3,72; 0,6 → 4,33; 0,65 → 5,12; 0,7 → 6,03).

### 2.2 Chữ

| Token | Giá trị |
|---|---|
| `font.family.primary` | Roboto (300, 400, 500, 700, 900), dự phòng `system-ui, sans-serif` |
| `font.size.body` | 16px, `line-height 1,6` |
| `font.size.label` | 11–12px, chữ hoa, giãn chữ 0,14em (`.nhan-muc`) hoặc 0,28em (`.nhan-tinh`) |
| `font.size.title.lg` | `clamp(2rem, 3.8vw, 3.5rem)`, độ đậm 300 (`.tieu-lon`) |
| `font.size.title.md` | `clamp(1.625rem, 2.6vw, 2.5rem)`, độ đậm 300 kèm cụm nhấn 500–700 |
| `font.size.hero` | `clamp(2.75rem, 7.2vw, 6.5rem)`, độ đậm 300, chữ hoa |
| `font.weight.emphasis` | 500 cho cụm nhấn trong tiêu đề; 700 cho nhãn và nút |

- Nhãn 11px **must** chỉ dùng cho nhãn ngắn (dưới 4 từ) và **must** đạt tương phản 4,5:1 (xem 2.1.2).
- Cỡ chữ nội dung **must** ≥ 14px; **should** ≥ 15px cho đoạn mô tả.
- Tiêu đề dài **should** có `text-wrap: balance`.

### 2.3 Khoảng cách

| Token | Giá trị | Dùng cho |
|---|---|---|
| `space.section` | `clamp(3rem, 7vw, 5.5rem)` (`.khoi-doc`) | Khoảng đệm trên/dưới một khối trang |
| `space.section.compact` | `clamp(2.25rem, 5vw, 3.75rem)` (`.khoi-doc-gon`) | Dải mỏng, CTA |
| `space.container.x` | 20px (mobile), 40px (từ md) | Lề ngang, `max-width 1440px` |
| `space.title-content` | 32px (mobile), 40px (từ md) | Giữa tiêu đề khối và nội dung |
| `space.card` | 20–36px | Đệm trong thẻ |
| `space.gap.grid` | 12–16px; 1px cho lưới đường kẻ | Khoảng cách giữa thẻ |

Khối trang mới **must** dùng `.khoi-doc` hoặc `.khoi-doc-gon`, không tự đặt `py-*` riêng.

### 2.4 Bo góc, bóng, chuyển động

| Token | Giá trị |
|---|---|
| `radius.pill` | 999px (nút, chip, thanh nổi) |
| `radius.control` | 6–8px (ô nhập, thẻ kỹ thuật) |
| `radius.card` | 12–16px |
| `radius.panel` | 28–36px (khung ảnh lớn, hộp biểu mẫu) |
| `shadow.raised` | bóng nhẹ, không viền sáng giả |
| `motion.fast` | 300ms (màu, viền) |
| `motion.base` | 500–700ms (ảnh chuyển mờ, hiện dần) |
| `motion.slow` | tối đa 1400ms (zoom ảnh, parallax) |

- Mọi chuyển động **must** tắt hoặc rút còn tức thời khi người dùng bật `prefers-reduced-motion: reduce` (đã có quy tắc toàn cục, không được ghi đè).
- **Must not** dùng gradient trang trí và ánh kim giả trên bề mặt giao diện mới (nền khối dùng `.mat-*`).

---

## 3. Quy tắc theo linh kiện

### 3.0 Ma trận trạng thái dùng chung

Mọi linh kiện tương tác **must** định nghĩa đủ 7 trạng thái. Nếu một trạng thái không áp dụng, ghi "không áp dụng" kèm lý do.

| Trạng thái | Quy tắc chung |
|---|---|
| Mặc định | Dùng token mục 2; nhãn mô tả rõ hành động |
| Hover | Đổi màu nền/viền trong `motion.fast`; **must not** là cách duy nhất truyền đạt thông tin |
| Focus-visible | Vòng 2px màu `color.focus.ring`, offset 3px; **must** thấy rõ trên cả nền sáng và tối |
| Active (đang nhấn / đang chọn) | Nền hoặc viền đậm hơn; trạng thái chọn **must** có thêm `aria-selected` / `aria-pressed` / `aria-current` |
| Disabled | `disabled` hoặc `aria-disabled="true"`, độ mờ không dưới tương phản 3:1 cho viền; con trỏ `not-allowed` |
| Loading | Giữ nguyên kích thước, đổi nhãn ("Đang gửi…"), `aria-busy="true"`, chặn gửi trùng |
| Error | Thông báo văn bản gần trường/nút, không chỉ đổi màu; liên kết bằng `aria-describedby`, `aria-invalid="true"` |

Kích thước vùng chạm: mục tiêu con trỏ **must** ≥ 24×24px (WCAG 2.5.8); **should** ≥ 44×44px trên cảm ứng.

### 3.1 Nút (`.nut`)

- **Giải phẫu:** nhãn chữ hoa 13px đậm, giãn 0,04em; tùy chọn vòng tròn mũi tên. Nút dạng viên thuốc.
- **Biến thể:** `chinh` (nền nhấn, chữ trắng), `vien` (viền trắng, trên nền tối), `dac` (nền Than đen), `vien-sang` (viền Than đen, trên nền sáng).
- **Trạng thái:** mặc định, hover (`chinh` → `color.action.primary.hover`; `vien` → nền trắng chữ Than đen), focus-visible (có quy tắc riêng cho `.nut-chinh`), active, disabled (giảm độ mờ, không hover), loading (đổi nhãn, `aria-busy`), error (không áp dụng ở nút; lỗi hiện ở biểu mẫu).
- **Bàn phím:** `Enter` và `Space` kích hoạt `button`; `Enter` kích hoạt liên kết. **Cảm ứng:** vùng chạm cao ≥ 48px (đã có `min-height: 3rem`). **Con trỏ:** hiệu ứng "hút nhẹ" (`NutHut`) **must** tắt khi giảm chuyển động.
- **Nội dung dài:** nhãn **must** xuống dòng, không cắt bớt; nút không được tràn khung 320px.
- **Nhãn:** **must** nêu hành động và đối tượng ("Nhận hộp mẫu góc nhôm", "Liên hệ nhận thông tin"). **Must not** dùng nhãn mơ hồ đứng một mình như "Xem thêm", "Tìm hiểu".

### 3.2 Đầu trang và menu toàn màn hình

- **Giải phẫu:** hai nút tròn (gọi, thư) bên trái, logo giữa, nút ba gạch bên phải; nền chuyển Than đen khi cuộn.
- **Trạng thái:** nút tròn có hover đổi nền sang màu nhấn; focus-visible theo 3.0; disabled/loading/error không áp dụng.
- **Menu (hộp thoại):** `role="dialog"`, `aria-modal="true"`, đóng bằng `Esc` và nút "Đóng", khóa cuộn nền. **Must** đưa focus vào hộp thoại khi mở và trả focus về nút ba gạch khi đóng. **Must** giữ focus trong hộp thoại (focus trap).
- **Phản hồi:** dưới 1024px, mục con hiện sẵn dưới tiêu đề mục, không cần bấm mở.
- **Nội dung dài:** hộp thoại **must** cuộn dọc được khi nội dung vượt màn hình.

### 3.3 Hero băng chuyền (`HeroSlider`)

- **Giải phẫu:** nhiều slide ảnh toàn màn hình, tiêu đề chữ hoa căn giữa, hai nút, chấm chọn slide.
- **Trạng thái:** slide đang hiện (`aria-hidden=false`), slide ẩn (`aria-hidden=true`, nút bên trong `tabindex=-1`); hover/focus **must** dừng tự chuyển.
- **Chuyển động:** tự chuyển **must** tắt khi giảm chuyển động. Người dùng **must** có cách dừng và chuyển slide bằng bàn phím (các chấm là `button role="tab"`).
- **Ảnh:** slide đầu `priority`; ảnh khác tải trễ. Tiêu đề thật (`h1`) chỉ có ở slide đầu.

### 3.4 Băng chuyền sản phẩm (`SanPhamBangChuyen`)

- **Giải phẫu:** danh sách thẻ tối cuộn ngang có điểm dừng, mũi tên trước/sau, chấm vị trí.
- **Tương tác:** chuột kéo được (chỉ chuột, không ảnh hưởng cảm ứng); cảm ứng vuốt ngang; bàn phím dùng hai nút mũi tên và các chấm. **Must** có nhãn `aria-label` cho từng nút ("Sản phẩm trước", "Đến …").
- **Trạng thái:** nút mũi tên ở đầu/cuối danh sách **should** chuyển sang disabled thay vì không làm gì.
- **Nội dung dài:** tên sản phẩm xuống dòng; thẻ giữ chiều rộng 78% màn hình từ md, 88% dưới md.

### 3.5 Thẻ sản phẩm và 4 dòng thông số (`ThongSoBon`)

- **Giải phẫu:** ảnh, nhãn nhóm, tên, mô tả ngắn, lưới 2×2 (Áp lực gió · Độ kín nước · Độ kín khí · Chống trộm), liên kết "Xem kiểu cửa".
- **Giá trị chưa có số liệu:** **must** ghi "Đang chờ xác nhận"; riêng Chống trộm ghi "Liên hệ tư vấn". **Must not** điền số chưa có phiếu kiểm định.
- **Trạng thái:** hover nâng bóng nhẹ và đổi ảnh thứ hai; focus-visible bao quanh cả thẻ; thẻ là một liên kết duy nhất để tránh nhiều điểm dừng lặp.
- **Nhãn thông số:** 11px chữ hoa, **must** đạt 4,5:1 (độ mờ chữ ≥ 0,65 trên nền trắng).
- **Trống:** khi bộ lọc không có kết quả, hiện câu "Chưa có sản phẩm phù hợp với bộ lọc." trong danh sách.

### 3.6 Bộ lọc và tab (`HeCuaDanhSach`, `TrinhDienHeCua`, `QuyTrinhTuongTac`)

- **Giải phẫu:** hàng chip hoặc tab; ô tìm kiếm có nhãn `sr-only`.
- **Mẫu `tablist`:** cha `role="tablist"`, con `role="tab"` với `aria-selected`, vùng nội dung `role="tabpanel"` có `aria-labelledby`. Mũi tên trái/phải **must** chuyển tab và đưa focus theo (đã có ở `QuyTrinhTuongTac`); `Tab` chỉ dừng ở tab đang chọn (`tabIndex=0`, tab còn lại `-1`).
- **Chip lọc (nhóm nút bật/tắt):** dùng `aria-pressed`, không dùng `role="tab"`.
- **Trạng thái chọn:** nền đặc Than đen (hoặc nền nhấn) chữ trắng, không chỉ đổi màu viền.
- **Nội dung dài:** hàng chip **must** xuống dòng, không tràn ngang.
- **Kết quả:** số kết quả hiện trong vùng `aria-live="polite"` khi lọc (**should**).

### 3.7 Biểu mẫu (`LeadForm`)

- **Giải phẫu:** nhãn, ô nhập (họ tên, SĐT, email tùy chọn…), ô đồng ý, nút gửi, thông báo.
- **Quy tắc trường:** mọi ô **must** có `label` gắn qua `htmlFor`; trường bắt buộc **must** nói rõ; ô `tel` dùng `inputMode="tel"` và `autoComplete`.
- **Trạng thái:** mặc định; focus (viền màu nhấn); disabled (nút gửi khi đang gửi); loading ("Đang gửi…", chặn gửi trùng); error (thông báo dưới trường, thông báo chung dùng `role="alert"`).
- **Lỗi:** mỗi thông báo lỗi trường **must** gắn `aria-describedby` và trường lỗi **must** có `aria-invalid="true"` (đã có từ 11/11/2026, xem mục 7).
- **Quyền riêng tư:** câu đồng ý **must** hiện đủ; **must not** lưu hay ghi nhật ký họ tên/SĐT ở phía trình duyệt ngoài việc gửi.
- **Bản xem thử tĩnh:** hiện thông báo "bản xem thử, biểu mẫu chưa gửi được" kèm hotline.

### 3.8 Thanh nút cố định và liên hệ nhanh (`ThanhHopMau`, `NutLienHeNhanh`)

- **Thanh nút mỏng (`ThanhHopMau`):** hiện sau khi cuộn qua hero, ẩn khi form `#dang-ky` vào khung nhìn. Khi ẩn **must** là `aria-hidden` và nút `tabindex=-1`. **Must not** che nội dung quan trọng hay nút khác (đặt giữa dưới, chừa góc phải cho nút liên hệ nhanh).
- **Liên hệ nhanh:** nút tròn góc dưới phải mở danh sách; `aria-expanded`, `aria-controls`; `Esc` đóng. **Should** đưa focus về nút khi đóng.
- **Chạm:** vùng chạm ≥ 48px.

### 3.9 Hỏi đáp (FAQ)

- **Giải phẫu:** danh sách câu hỏi dạng nút mở/đóng (accordion), nội dung trả lời ẩn/hiện.
- **Quy tắc:** nút **must** có `aria-expanded` và `aria-controls`; `Enter`/`Space` mở/đóng. Câu hỏi dài xuống dòng. Nội dung ẩn **must** không còn tab được.

### 3.10 Khung ảnh và ảnh minh họa (`KhungAnh`)

- **Giải phẫu:** ảnh trong khung viền mỏng, thước kẻ, số FIG, điểm đánh dấu đỏ, chú thích.
- **Ảnh trang trí** (`alt=""`) **must** là nền hoặc lặp lại thông tin có sẵn; ảnh có ý nghĩa **must** có `alt` mô tả ngắn.
- **Điểm đánh dấu và chú thích:** **must** là thông tin bổ sung, không phải nguồn duy nhất của nội dung.
- **Ảnh minh họa:** ảnh stock hoặc ảnh tạm **must** ghi nguồn trong `public/images/NGUON-ANH.md`; nội dung cạnh ảnh **must** nói rõ khi không phải công trình hay sản phẩm của WINDUCA.

---

## 4. Yêu cầu truy cập và tiêu chí nghiệm thu kiểm tra được

Mức mục tiêu: **WCAG 2.2 AA**. Mỗi tiêu chí có cách kiểm tra đạt/không đạt.

| # | Tiêu chí (must) | Cách kiểm tra | Đạt khi |
|---|---|---|---|
| A1 | Tương phản chữ thường ≥ 4,5:1, chữ lớn ≥ 3:1 | Trình đo tương phản trên từng cặp màu (mục 2.1.1) | Không còn cặp "không đạt" trên bản dựng |
| A2 | Thành phần giao diện và vòng focus ≥ 3:1 | Đo viền, vòng focus trên cả nền sáng và tối | Mọi trạng thái focus nhìn rõ |
| A3 | Mọi chức năng dùng được bằng bàn phím | Chỉ dùng `Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`, mũi tên | Hoàn thành luồng: mở menu, lọc sản phẩm, đổi tab, gửi biểu mẫu |
| A4 | Thứ tự focus theo thứ tự đọc, không bẫy focus | Duyệt `Tab` hết trang | Không kẹt, không nhảy lộn xộn |
| A5 | Focus-visible hiện ở mọi điều khiển | Duyệt `Tab`, quan sát | Không điều khiển nào mất vòng focus |
| A6 | Không chỉ dùng màu để truyền đạt trạng thái | Xem ở chế độ thang xám | Trạng thái chọn, lỗi vẫn nhận ra |
| A7 | Hộp thoại menu: focus vào khi mở, về nút khi đóng, `Esc` đóng | Thao tác bằng bàn phím | Đủ 3 hành vi |
| A8 | Tab, băng chuyền, accordion có vai trò và trạng thái ARIA đúng | Kiểm tra cây truy cập | `aria-selected`/`aria-expanded`/`aria-label` khớp trạng thái thật |
| A9 | Biểu mẫu: nhãn, lỗi nhận diện được, gợi ý nhập tự động | Thử gửi trống và sai định dạng | Mỗi lỗi nêu rõ trường nào, vì sao, gắn đúng trường |
| A10 | Giảm chuyển động được tôn trọng | Bật `prefers-reduced-motion` | Băng chuyền không tự chuyển, chuyển động ≤ vài ms |
| A11 | Vùng chạm ≥ 24×24px (nên 44×44) | Đo bằng công cụ phát triển | Không điều khiển nhỏ hơn 24px |
| A12 | Phóng to 200% và rộng 320px không mất nội dung, không cuộn ngang | Thử ở 320px và 200% | Không tràn ngang |
| A13 | Ảnh có ý nghĩa có `alt`; ảnh trang trí `alt=""` | Duyệt ảnh | Không `alt` thừa/thiếu |
| A14 | Ngôn ngữ trang `lang="vi"` | Kiểm tra `<html>` | Có `lang="vi"` |

---

## 5. Nội dung và giọng điệu

- **Giọng:** chuyên gia, cao cấp, tự tin; câu ngắn, đúng việc.
- **Nhãn nút:** động từ + đối tượng. Đúng: "Nhận hộp mẫu góc nhôm", "Đặt lịch trải nghiệm showroom". Sai: "Xem thêm", "Bấm vào đây", "Gửi".
- **Tiêu đề:** nêu lợi ích hoặc đối tượng, không khoe thông số chưa xác nhận.
- **Thông số chưa có:** dùng đúng cụm "Đang chờ xác nhận" (hoặc "Liên hệ tư vấn" cho chống trộm).
- **Lỗi biểu mẫu:** nói rõ trường và cách sửa. Đúng: "Số điện thoại chưa đúng (10 số, hoặc +84)." Sai: "Dữ liệu không hợp lệ."
- **Ranh đỏ:** không báo giá, khoảng giá, chiết khấu; không tên hãng hoặc đối thủ; không bịa thông số hay chứng chỉ; không dữ liệu khách hàng trong ví dụ.

---

## 6. Điều cấm và cách làm sai

- **Must not** dùng chữ nhấn cỡ thường trên nền Ngà hay nền tối (mục 2.1.2).
- **Must not** dùng chữ có độ mờ dưới 0,65 trên nền trắng cho nội dung cần đọc.
- **Must not** ẩn hay bỏ vòng focus (`outline: none` không kèm thay thế).
- **Must not** thêm khoảng cách hoặc cỡ chữ riêng cho một khối (đặt `py-*`, `text-[..]` rời rạc) khi đã có token.
- **Must not** dùng gradient trang trí, ánh kim giả, hay lưới nền làm giảm độ đọc.
- **Must not** dùng nhãn nút mơ hồ hoặc nút chỉ có biểu tượng mà không có tên truy cập.
- **Must not** truyền đạt trạng thái chỉ bằng màu.
- **Must not** để băng chuyền tự chuyển không dừng được, hoặc bỏ qua giảm chuyển động.
- **Must not** nhồi số liệu, tên hãng, giá vào ví dụ hay nội dung.
- **Should not** dùng ảnh minh họa mà không có chú thích nguồn.

---

## 7. Ghi chú di chuyển (đã xử lý ngày 11/11/2026)

Bảy khoảng trống do đối chiếu mã đã được sửa. Ghi lại để biết cách kiểm tra lại:

1. **Tương phản chữ nhấn:** thêm biến `--accent-text` theo bề mặt (đỏ đậm trên nền sáng, đỏ sáng trên nền tối). Kiểm tra: mọi phần tử `.text-accent` có nền đặc đều ≥ 4,5:1 (đo trên trang kiểu cửa: thấp nhất 5,88).
2. **Chữ mờ:** `text-than-chi/30…60` nâng lên `/65`; `text-white/30…65` và `text-nga/…` nâng lên `/70` (trừ phần tử trang trí đánh dấu `aria-hidden`).
3. **Biểu mẫu:** `LeadForm` gắn `aria-invalid` và `aria-describedby` cho họ tên, SĐT, email, tệp, ô đồng ý; mỗi lỗi có `id` riêng; sau khi gửi lỗi, focus chuyển tới trường lỗi đầu tiên.
4. **Menu toàn màn hình:** focus vào nút "Đóng" khi mở, giữ focus trong hộp thoại bằng `Tab`/`Shift+Tab`, `Esc` đóng và trả focus về nút ba gạch.
5. **Tab trải nghiệm (`TrinhDienHeCua`):** có điều hướng `←` `→` `Home` `End`, focus đi theo tab, `tabIndex` chỉ ở tab đang chọn, vùng nội dung `role="tabpanel"` gắn `aria-labelledby`.
6. **Nhãn mơ hồ:** "Xem thêm" đổi thành "Xem thêm công trình" (khối Công trình trang chủ và nút tải thêm ở trang Công trình) và "Xem thêm bài viết" (Tin tức).
7. **Số kết quả lọc:** số sản phẩm (trang Hệ cửa) và số không gian (trang Công trình) nằm trong vùng `role="status"` `aria-live="polite"`.

Việc còn lại **should** làm: thông báo trạng thái khi bấm các nút mũi tên băng chuyền ở đầu/cuối danh sách (chuyển sang disabled), và đo lại tương phản trên các khối có nền ảnh.

---

## 8. Danh sách kiểm tra QA trước khi phát hành

**Token và bố cục**
- [ ] Khối mới dùng `.khoi-doc` / `.khoi-doc-gon`, không có `py-*` riêng.
- [ ] Chữ dùng đúng thang cỡ ở mục 2.2; không có `text-[..]` rời ngoài các token đã định.
- [ ] Không gradient trang trí, không lưới nền làm giảm độ đọc.

**Truy cập (mục 4)**
- [ ] A1–A14 đều đạt trên trang mới.
- [ ] Đã duyệt toàn trang chỉ bằng bàn phím.
- [ ] Đã thử `prefers-reduced-motion`, rộng 320px và phóng to 200%.

**Trạng thái linh kiện**
- [ ] Mỗi linh kiện mới có đủ 7 trạng thái (hoặc ghi "không áp dụng" kèm lý do).
- [ ] Thông báo lỗi biểu mẫu nêu rõ trường và cách sửa.

**Nội dung và ranh đỏ**
- [ ] Nhãn nút nêu rõ hành động và đối tượng, không "Xem thêm" đứng một mình.
- [ ] Không giá, không tên hãng/đối thủ, không số liệu chưa xác nhận, không dữ liệu khách.
- [ ] Ảnh minh họa có ghi nguồn và chú thích khi không phải công trình thật.

**Kỹ thuật**
- [ ] `npm run lint` không lỗi; `npm run build` (chế độ tĩnh) chạy được.
- [ ] Đã xem trên máy tính, điện thoại và trang nằm trên bản xem thử.
