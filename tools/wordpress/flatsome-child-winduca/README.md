# Theme con Flatsome cho WINDUCA

Cấu trúc giống `flatsome-child` của Winboss: `style.css` + `functions.php` + thư mục `assets`, nội dung dựng bằng UX Builder.

## Cài đặt
1. Cài **Flatsome** (bản chính thức, bản 3.20.x) rồi kích hoạt: Giao diện → Thêm mới → Tải lên.
2. Tải `winduca-flatsome-child.zip` (zip thư mục này, tên thư mục `winduca-flatsome-child`) và **kích hoạt**. Khi kích hoạt, theme tự áp màu đỏ #e31937, phông Roboto, logo, header Than đen.
3. Nhập Trang chủ và menu: `wp eval-file wp-content/themes/winduca-flatsome-child/nhap-trang-chu.php` (WP-CLI). Nếu không có WP-CLI: tạo trang "Trang chủ" (mẫu "Page - Full Width"), mở UX Builder, dán nội dung `du-lieu/trang-chu.txt` vào chế độ mã, và thay `{{ANH:tên-tệp}}` bằng đường dẫn `.../wp-content/themes/winduca-flatsome-child/assets/images/tên-tệp`.
4. Cài plugin giống Winboss nếu cần: Contact Form 7 (biểu mẫu), Secure Custom Fields (trường tùy chỉnh), WPS Hide Login (đổi địa chỉ đăng nhập).

## Gồm
- `style.css`: token màu, phông, nút viên thuốc, thẻ, lưới, hero, chân trang.
- `functions.php`: tắt Gutenberg như Winboss, nạp Roboto, shortcode `[site_menu]` và `[wd_anh]`.
- `inc/thiet-lap.php`: thiết lập mặc định Flatsome (theme_mod) áp khi kích hoạt.
- `du-lieu/trang-chu.txt`: Trang chủ bằng shortcode UX Builder (hero 3 slide, giới thiệu, hệ cửa nổi bật, giải pháp, dịch vụ, công trình, vì sao chọn, tin tức).
- `assets/`: ảnh và logo dùng cho trang chủ.

## Chưa làm / chưa kiểm tra
- Chưa chạy thử trên WordPress thật (Local chưa bật): cần kiểm tra giao diện, các khóa `theme_mod` của header và menu.
- Chưa có Giới thiệu, Hệ cửa (115 hệ, dữ liệu ở `tools/wordpress/du-lieu/he-cua.json`), Giải pháp, Công trình, Tin tức (9 bài ở `du-lieu/bai-viet.json`), Liên hệ.
- Số liệu dịch vụ để "—" vì chưa xác nhận.
