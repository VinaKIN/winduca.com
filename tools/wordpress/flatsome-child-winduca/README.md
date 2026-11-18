# WINDUCA: mã nguồn WordPress (theme con Flatsome)

Bản dựng lại website winduca.com trên WordPress, thiết kế bằng **Flatsome** (UX Builder), cấu trúc giống website Winboss: theme con + nội dung nhập bằng công cụ trong wp-admin. Dành cho đơn vị thiết kế tự cài lên hosting.

## Cần có
- WordPress 6.4 trở lên, PHP 7.4 trở lên (khuyến nghị 8.1+), HTTPS.
- Theme **Flatsome 3.20.x** bản chính thức, đơn vị thiết kế tự cung cấp theo bản quyền của mình. **Gói này không kèm Flatsome.**
- Plugin **Contact Form 7** (biểu mẫu Liên hệ). Tuỳ chọn như Winboss: WPS Hide Login, Secure Custom Fields.

## Cài đặt (khoảng 10 phút)
1. Cài WordPress mới. Cài và kích hoạt **Flatsome**, rồi cài Contact Form 7.
2. Giao diện → Thêm mới → Tải lên: chọn `winduca-flatsome-child.zip`, cài đặt và **kích hoạt** (thư mục theme là `winduca-flatsome-child`). Khi kích hoạt, theme tự đặt màu đỏ #e31937, Roboto, logo, header Than đen.
3. Vào **Công cụ → WINDUCA** và bấm **Làm tất cả**. Bước này:
   - tạo 16 trang (Trang chủ, Giới thiệu, Hệ cửa, Giải pháp, Công trình, Hợp tác, Liên hệ, Trải nghiệm, Dành cho KTS, Năng lực xưởng, 5 trang chính sách, Điều khoản);
   - nhập **115 hệ cửa** vào mục "Hệ cửa" ở menu trái;
   - nhập **9 bài viết** kèm ảnh đại diện;
   - đặt Trang chủ, trang Tin tức, menu chính, tạo biểu mẫu Liên hệ.
   Chạy lại được, không nhân đôi nội dung.
4. Cài Elementor **không cần**: các trang dựng bằng UX Builder của Flatsome. Mở từng trang → "Edit with UX Builder" để chỉnh.
5. Cài chứng chỉ HTTPS, đặt tên miền, tắt noindex khi mở chính thức: Cài đặt → Đọc → bỏ "Ngăn công cụ tìm kiếm".

## Cấu trúc
| Thư mục hoặc tệp | Vai trò |
|---|---|
| `style.css` | Màu, phông, nút, thẻ, lưới, hero, chân trang (token WINDUCA) |
| `functions.php` | Nạp CSS và phông Roboto, tắt Gutenberg như Winboss, shortcode `[site_menu]`, `[wd_anh]` |
| `inc/thiet-lap.php` | Thiết lập Flatsome (theme_mod) áp khi kích hoạt |
| `inc/cai-dat.php` | Công cụ → WINDUCA: nhập trang, hệ cửa, tin tức, thiết lập |
| `inc/he-cua.php` | Loại bài "Hệ cửa" và shortcode `[wd_he_cua]` (danh sách có bộ lọc) |
| `assets/js/he-cua.js`, `assets/css/he-cua.css` | Bộ lọc, phân trang, hộp chi tiết của trang Hệ cửa |
| `du-lieu/trang-chu.txt`, `du-lieu/trang/*.txt` | Nội dung các trang dạng shortcode UX Builder |
| `du-lieu/he-cua.json`, `du-lieu/bai-viet.json` | Dữ liệu 115 hệ cửa và 9 bài viết |
| `assets/images`, `assets/brand` | Ảnh và logo (khoảng 30 MB) |

## Chỉnh sửa
- **Màu, phông, header, chân trang:** Giao diện → Tùy biến (Flatsome) và `style.css`.
- **Hệ cửa:** sửa từng hệ ở menu "Hệ cửa". Số liệu để trống thì hiện "Hãng chưa công bố".
- **Thêm hệ cửa mới:** Thêm mới trong "Hệ cửa", điền các trường, ảnh đường dẫn bắt đầu bằng `/images/` (đặt trong `assets/images`).

## Lưu ý, chưa kiểm chứng
- Gói đã được chạy thử trên WordPress cục bộ (WordPress 7.x, PHP 8.2, Flatsome 3.20.9, **chưa có Contact Form 7**): kích hoạt theme, nhập 16 trang, 115 hệ cửa, 9 bài viết, hiển thị Trang chủ, Giới thiệu, Hệ cửa (lọc, hộp chi tiết), Tin tức. **Chưa thử** biểu mẫu Liên hệ (cần Contact Form 7), UX Builder trong wp-admin, và trên hosting thật. Đơn vị thiết kế nên chạy thử và chỉnh giao diện cho khớp thiết kế gốc (bản Next.js ở repo `VinaKIN/winduca.com`).
- Các trang khác Trang chủ và Hệ cửa được chuyển từ bản web hiện tại thành nội dung chữ và ảnh đơn giản, cần dàn lại bằng UX Builder để đẹp như thiết kế.
- Tên khóa thiết lập header/menu của Flatsome được lấy từ preset trong theme, có thể phải chỉnh bằng Tùy biến.
- Trang Hệ cửa: bản WordPress chưa có chức năng so sánh 3 hệ và hộp "Chọn hệ" 5 bước như bản Next.js.
- Trang Hệ cửa nêu tên hãng và số liệu của hãng: cần xác nhận quyền sử dụng trước khi công bố. Số liệu dịch vụ ở Trang chủ để "—" vì chưa xác nhận. Ảnh stock có nhãn "Minh họa".
- Biểu mẫu Liên hệ gửi thư qua Contact Form 7 tới email quản trị; không lưu dữ liệu khách ngoài kho nhận của WINDUCA. Chưa nối kho nhận lead.
