# Hướng dẫn đóng gói và đưa website WINDUCA lên tên miền (hosting dùng chung với winboss.biz)

Cập nhật 17/11/2026. Dành cho người triển khai (bạn hoặc kỹ thuật viên). Không cần biết lập trình để làm các bước B đến E.

## 1. Cách làm, tóm tắt

- Website là **Next.js**. Hosting dùng chung (cPanel, Apache) không chạy được máy chủ Node, nên ta **xuất bản tĩnh**: một thư mục gồm HTML, CSS, JS và ảnh. Đưa thư mục này lên tên miền là xong, không cần cài gì trên hosting.
- Website của winboss.biz là WordPress trên cùng hosting. **winduca.com là một tên miền riêng, thư mục riêng**, không đụng tới WordPress, không cài vào WordPress.
- Việc cần Node chỉ làm **một lần trên máy tính của bạn** khi đóng gói (bước A).
- Biểu mẫu liên hệ trên hosting tĩnh không có máy chủ nhận. Có 2 cách: mặc định mở thư mailto, hoặc nối Cloudflare Worker (mục 7).

Tên gọi trong hướng dẫn: **gói hosting** = thư mục `dist/winduca-hosting` và tệp `dist/winduca-hosting.zip`.

## 2. Cần chuẩn bị

| Hạng mục | Ghi chú |
|---|---|
| Tên miền `winduca.com` | Quyền sửa DNS (hoặc đổi nameserver) |
| Hosting của winboss.biz | Vào được cPanel, còn tối thiểu 200 MB trống (gói giải nén khoảng 47 MB) |
| Máy tính có Node.js 22 và Git | Chỉ để đóng gói. Tải Node tại nodejs.org |
| Email `info@winduca.com` | Tạo trong cPanel, để nhận thư từ biểu mẫu (mục 7) |
| Chưa có, cần hỏi | Kho nhận lead (`LEAD_WEBHOOK_URL`), email chung, link mạng xã hội, ID Google Analytics |

## 3. Bước A. Đóng gói trên máy bạn

```bash
git clone https://github.com/VinaKIN/winduca.com.git
cd winduca.com
npm ci
npm run dong-goi -- --url https://winduca.com
```

Kết quả nằm ở `dist/`:
- `dist/winduca-hosting/`: thư mục đưa lên hosting
- `dist/winduca-hosting.zip`: bản nén của cùng thư mục (khoảng 47 MB), có sẵn `.htaccess`

Tuỳ chọn thêm sau `--url`:

| Tuỳ chọn | Ý nghĩa |
|---|---|
| `--lead https://winduca-lead.<tài-khoản>.workers.dev` | Nối biểu mẫu vào Cloudflare Worker (mục 7) |
| `--ga G-XXXXXXX` | Bật Google Analytics (chỉ nạp khi khách bấm "Đồng ý" ở banner cookie) |
| `--indexable` | Cho Google lập chỉ mục. **Chỉ dùng khi chính thức mở web.** Mặc định là chặn (noindex và robots Disallow) |

Lần đầu hãy đóng gói **không có `--indexable`** để kiểm tra trước, rồi đóng gói lại khi mở web chính thức.

Script tự kiểm tra: không còn đường dẫn `vinakin.github.io`, có `index.html`, `404.html`, `.htaccess`, `sitemap.xml`, `robots.txt`. Thư mục `src/app/api` được gỡ tạm khi build và luôn được trả lại.

Lưu ý: **không** dùng `GITHUB_PAGES=true` để đóng gói cho tên miền, vì chế độ đó thêm tiền tố `/winduca.com` vào mọi đường dẫn và làm mất ảnh, CSS.

## 4. Bước B. Tạo tên miền trên hosting (cPanel)

1. cPanel > **Domains** > **Create A New Domain** (hoặc "Addon Domains" ở bản cũ).
2. Nhập `winduca.com`. **Bỏ chọn** "Share document root". Đặt **Document Root** là một thư mục riêng, ví dụ `/home/<tài-khoản>/winduca.com` (nằm **ngoài** `public_html` của winboss.biz). Thư mục này chính là "thư mục gốc của tên miền" ở các bước sau.
3. Không chọn tạo bản WordPress. Đây là website tĩnh.
4. Tạo email `info@winduca.com` (cPanel > Email Accounts).

## 5. Bước C. Trỏ tên miền và bật HTTPS

1. Ở nơi quản lý tên miền, trỏ **A record** của `winduca.com` và `www` về **địa chỉ IP của hosting** (xem ở cPanel, mục "Shared IP Address"). Hoặc đổi nameserver theo thông tin nhà cung cấp hosting. Chờ vài phút đến vài giờ.
2. Khi tên miền đã trỏ đúng: cPanel > **SSL/TLS Status** > chọn `winduca.com` và `www.winduca.com` > **Run AutoSSL**.
3. Nếu `winduca.com` đang chạy ở nơi khác và có email, hãy sao chép bản ghi MX, SPF trước khi đổi DNS để không mất thư.

## 6. Bước D. Tải gói lên

1. cPanel > **File Manager** > vào thư mục gốc của `winduca.com` (bước B) > **Settings** > bật **Show Hidden Files**.
2. **Upload** `winduca-hosting.zip` > chuột phải > **Extract** ngay tại thư mục đó > xóa tệp zip.
3. Kiểm tra `index.html` và `.htaccess` nằm **trực tiếp** trong thư mục gốc (không nằm trong thư mục con `winduca-hosting`). Nếu nằm trong thư mục con, chọn tất cả và **Move** lên một cấp.
4. Hoặc dùng FTP: tải toàn bộ **nội dung** của `dist/winduca-hosting` (kể cả `.htaccess`) vào thư mục gốc.

## 7. Bước E. Kiểm tra sau khi lên mạng

Mở `https://winduca.com` và kiểm tra:
- Trang chủ, `/he-cua/`, `/tin-tuc/`, `/lien-he/` mở được, có ảnh và chữ đúng.
- `http://winduca.com` và `https://www.winduca.com` đều chuyển về `https://winduca.com`.
- Địa chỉ không tồn tại (ví dụ `/abc/`) hiện trang 404 của WINDUCA.
- Biểu mẫu "Nhận hộp mẫu" mở thư mailto hoặc gửi được (tuỳ cách ở mục 8).
- Xem trên điện thoại. Mở `https://winduca.com/sitemap.xml`, thấy địa chỉ bắt đầu `https://winduca.com/`.
- Ở bản xem thử, `view-source` của trang chủ có `<meta name="robots" content="noindex, nofollow">`.
- winboss.biz vẫn hoạt động bình thường.

## 8. Biểu mẫu liên hệ (đọc kỹ, liên quan quy tắc dữ liệu khách)

Quy tắc của WINDUCA: **website và hosting không lưu tên, số điện thoại, bản vẽ của khách**. Vì vậy không tự viết PHP lưu dữ liệu vào hosting hoặc gửi thư có số điện thoại qua hosting.

| Cách | Khi nào dùng | Làm thế nào |
|---|---|---|
| **1. Mở thư mailto (mặc định)** | Mở web trước, chưa có kho nhận lead | Không cần làm gì. Khách bấm gửi thì trình thư của họ mở sẵn thư tới `info@winduca.com`. Tệp bản vẽ khách phải tự đính kèm |
| **2. Cloudflare Worker** | Có kho nhận lead hoặc muốn thông báo Telegram | Làm theo `worker/README.md`. Đặt `ALLOWED_ORIGINS = "https://winduca.com,https://www.winduca.com"` trong `worker/wrangler.toml`, rồi đóng gói lại với `--lead https://winduca-lead.<tài-khoản>.workers.dev` |

Cách 2 cần kho nhận lead (`LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET`), **hiện chưa có**. Nếu chưa có thì dùng cách 1.

## 9. Mở web chính thức (go-live)

1. Đóng gói lại với `--indexable` (và `--lead`, `--ga` nếu đã có), tải lên đè.
2. Mở `https://winduca.com/robots.txt` thấy `Allow` và địa chỉ sitemap. Trang chủ không còn thẻ noindex.
3. Đăng ký **Google Search Console**, gửi `https://winduca.com/sitemap.xml`.
4. Thay các nội dung tạm trước khi mở: ảnh stock có nhãn "Minh họa", số liệu "—" ở trang chủ, link mạng xã hội, thông tin pháp lý ở các trang chính sách.
5. Bản xem thử `https://vinakin.github.io/winduca.com/` vẫn chặn Google, không cần xử lý.

## 10. Cập nhật website về sau

1. Sửa nội dung ở mã nguồn, `git pull`, `npm run dong-goi -- --url https://winduca.com ...` (cùng các tuỳ chọn như lần mở web).
2. Sao lưu: cPanel > **Backup** hoặc tải thư mục gốc `winduca.com` về máy.
3. Xóa nội dung cũ trong thư mục gốc (giữ lại `.well-known` nếu có, dùng cho SSL), tải gói mới lên. Cần xóa thư mục `_next` cũ để không tích rác.
4. Mở trang và nhấn Ctrl+F5 để thấy bản mới. Trang HTML luôn được trình duyệt kiểm tra lại, ảnh và JS có mã băm trong tên nên không bị kẹt bản cũ.

## 11. Dùng chung hosting với winboss.biz: lưu ý

- Hai tên miền độc lập về thư mục, `.htaccess` và SSL. Lỗi ở một bên không kéo theo bên kia, miễn là không đặt winduca.com vào thư mục WordPress.
- Website tĩnh rất nhẹ cho máy chủ. Thứ tốn băng thông nhất là ảnh (khoảng 35 MB). Nên đặt **Cloudflare (gói miễn phí)** phía trước để lưu đệm ảnh và giảm tải cho hosting. Làm sau khi web đã chạy ổn.
- Nếu hosting dùng **Nginx thuần** (không đọc `.htaccess`): cần cấu hình `try_files $uri $uri/ =404;`, `error_page 404 /404.html;`, chuyển http sang https, và đặt thời gian lưu đệm tương tự `.htaccess`. Hỏi nhà cung cấp hosting nếu không rõ.
- Các hosting chạy **LiteSpeed** đọc `.htaccess` như Apache, dùng được ngay.

## 12. Sự cố thường gặp

| Hiện tượng | Nguyên nhân và cách xử lý |
|---|---|
| Vào trang chủ thấy danh sách tệp hoặc 403 | `index.html` không nằm trực tiếp trong thư mục gốc. Xem bước 6.3 |
| Vào `/he-cua/` báo 404 | Thiếu `.htaccess` (tệp ẩn chưa được tải lên) hoặc host không cho dùng `.htaccess`. Bật Show Hidden Files, tải lại |
| Trang mất ảnh và CSS, đường dẫn có `/winduca.com/` | Đóng gói sai chế độ. Chạy lại `npm run dong-goi`, không đặt `GITHUB_PAGES` |
| Cảnh báo "không bảo mật" | AutoSSL chưa chạy hoặc DNS chưa trỏ đúng. Làm lại bước 5 |
| Lỗi 500 sau khi tải `.htaccess` | Hosting không có một mô-đun (ít gặp). Mở `.htaccess`, bỏ từng khối `<IfModule ...>` nghi ngờ (khối Expires hoặc Headers) |
| Google không thấy trang | Vẫn đang noindex. Đóng gói lại với `--indexable` |
| Biểu mẫu báo "Hệ thống tiếp nhận chưa sẵn sàng" | Đã build với `--lead` nhưng Worker chưa cấu hình. Kiểm tra `worker/README.md` hoặc đóng gói lại không có `--lead` |

## 13. Bàn giao mã nguồn

- Mã nguồn: https://github.com/VinaKIN/winduca.com (nhánh `main`). Có sẵn bản nén mã nguồn sạch `winduca-source-2026-11-17.zip` do `git archive` tạo ra (không có `node_modules`, `.next`, `out`, `dist`).
- Yêu cầu: Node.js 22, `npm ci`. Chạy thử: `npm run dev` (mở `http://localhost:3000`). Kiểm tra: `npx tsc --noEmit`, `npm run lint`.
- Cấu trúc chính:

| Thư mục | Nội dung |
|---|---|
| `src/app` | Các trang (App Router). `src/app/api/lead` chỉ dùng khi chạy trên Vercel hoặc máy chủ Node |
| `src/components` | Thành phần giao diện |
| `src/lib` | Dữ liệu: `site.ts` (hotline, email, địa chỉ), `he-cua-du-lieu.ts` (115 hệ cửa), `bai-viet.ts`, `giai-phap.ts` |
| `public` | Ảnh, logo (`public/brand`), biểu tượng |
| `worker` | Cloudflare Worker nhận biểu mẫu |
| `tools` | Công cụ xử lý ảnh và dữ liệu hệ cửa, `tools/trien-khai` là đóng gói |
| `docs` | `DESIGN-SYSTEM.md` (quy tắc thiết kế), `ban-giao-he-cua/` (bàn giao trang hệ cửa), tài liệu này |

- Biến môi trường (nạp lúc build): xem `.env.example`. Bản đóng gói tĩnh chỉ dùng `NEXT_PUBLIC_*`, không cần khóa bí mật.
- Quy tắc nội dung phải giữ: không báo giá, không bịa số liệu, số chưa xác nhận để "—" hoặc "Hãng chưa công bố", không dữ liệu khách trong mã. Trang `/he-cua` được phép nêu tên hãng, các trang khác không.
- Phương án khác nếu cần biểu mẫu chạy ngay trên cùng tên miền: triển khai bản **Vercel** (bản này có `/api/lead`) và trỏ tên miền về Vercel. Cách này không dùng hosting của winboss.biz.
