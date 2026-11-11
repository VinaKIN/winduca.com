# Bàn giao: trang Hệ cửa WINDUCA (cập nhật 11/11/2026)

Dành cho Claude (hoặc người) tiếp tục công việc. Đọc hết file này trước khi sửa. Người dùng nói tiếng Việt, luôn thích **được hỏi các câu hỏi chính trước khi làm** và **publish sau mỗi mốc để họ kiểm tra**.

## 1. Bối cảnh
- Dự án: website **winduca.com** (thuộc VinaKIN Group), Next.js 16.4 App Router + React 19 + Tailwind v4, xuất tĩnh lên GitHub Pages.
- Repo: `VinaKIN/winduca.com` (nhánh làm việc local `ghep-san-pham` đang trỏ `origin/main`). Bản xem thử: https://vinakin.github.io/winduca.com/he-cua/
- Thư mục máy: `D:\3 Cowork Demo\winduca.com` (Windows, shell Git Bash/PowerShell). File ở repo dùng CRLF, Git sẽ cảnh báo LF→CRLF, bỏ qua.
- Tài liệu thiết kế: `docs/DESIGN-SYSTEM.md` (mục **3.11.8** mô tả trang Hệ cửa hiện tại), `docs/BRIEF-UI-UX.md`.

## 2. Yêu cầu gần nhất của người dùng và quyết định đã chốt
Yêu cầu: "trình bày lại như trang https://winboss.biz/he-cua/ từ hiệu ứng, bố cục, giao diện và tính năng", kèm thư mục ảnh `D:\3 Cowork Demo\media-social-content-agent\02-INPUT\02-hinh-anh\` (Civro, Cmech, ROMADIO, Logo, masco vinakin).

Câu trả lời của người dùng:
- **Tab hãng như Winboss** (hiện tên Romadio / Civro / Ponzio và mã hệ như XW98, WS 75 THI). Đây là ngoại lệ **chỉ cho trang `/he-cua`**; trước đó người dùng đã chốt WINDUCA **không dùng tên hãng** ở các trang khác, giữ nguyên.
- **Ảnh: chỉ dùng ảnh không có logo hãng.**
- Cái còn thiếu: tính năng của Winboss, hệ còn thiếu, ảnh 3D/thực tế, hiệu ứng và bố cục. "Bỏ hết nội dung trong trang cũ thay bằng trang mới."
- Phạm vi: **dựng lại cả trang `/he-cua`** (chỉ còn một khung danh sách như Winboss).

## 3. Trạng thái hiện tại (đã push, commit `7204b67`)
Trang `/he-cua` = một khung duy nhất:
- Tiêu đề, tab hãng có số đếm (radiogroup), ô tìm kiếm, "Lọc theo" 3 danh sách thả xuống chọn nhiều (Hệ thống · Kết cấu · Chức năng), lưới thẻ 3 cột, phân trang 12/8/4, so sánh tối đa 3 hệ (thanh nổi + bảng), hộp chi tiết (thư viện ảnh Mẫu góc/Bản vẽ 2D, phóng to, 3 chỉ số lớn, bảng thông số, nguồn, CTA).
- Bộ lọc đồng bộ lên địa chỉ trang (`?b=&k=&f=&h=&q=&p=`).
- **115 hệ**: 106 từ bảng của trang Winboss (Civro 30, Romadio 43, Ponzio 33) + 9 hệ bổ sung (cờ `them: true`): Civro ACW120, AWG140/NWG110, USL, USW, AMAZA UID16; Romadio FineLine 59WO, FineLine 62DO, OVERSKY 23S Double, OVERSKY 23S Triple.
- Header trang không phải trang chủ là thanh **Than đen** (`bg-than-chi`) đè trên cùng, nên trang bắt đầu bằng `pt-28/md:pt-36`.

File chính:
| File | Vai trò |
|---|---|
| `src/app/he-cua/page.tsx` | Khung trang, metadata |
| `src/components/HeCuaDanhSach.tsx` | Toàn bộ UI và tính năng (client component, ~700 dòng) |
| `src/lib/he-cua-du-lieu.ts` | **Dữ liệu 115 hệ, tự sinh, đừng sửa tay** (sinh bằng `cong-cu/gen3.cjs`) |
| `src/app/globals.css` (cuối file) | `.grid-giay` (nền giấy kẻ ô + dấu góc), `.the-hien` (thẻ hiện dần) |
| `public/images/he-cua/ban-ve/` | 125 bản vẽ 2D webp (tên `<hang>-<ma>-<n>.webp`) |
| `public/images/he-cua/mau-goc/` | 2 ảnh 3D không logo (`romadio-panorama-19h-g1.webp`, `romadio-rct65-g1.webp`) |
| `src/lib/phim.ts` | `phimNhomChon` cho radiogroup (mũi tên, Home/End) |

Đã gỡ `CauHinhCua.tsx`, `SoSanhHeCua.tsx`, `MauCua.tsx`, `src/lib/mau-cua.ts` (11/11/2026, không còn nơi nào import). `src/lib/san-pham.ts` vẫn dùng (trang chủ qua `SanPhamBangChuyen`, 4 trang con). 4 trang `/he-cua/[slug]` (cua-truot-nang, cua-di-mo-quay, cua-xep-truot, cua-so) vẫn chạy bình thường.

## 4. Mô hình dữ liệu (`HeCua`)
`id, hang (romadio|civro|ponzio), ma, loai, he, ketCau (t|n|tn|""), tags (cn an de sm), u, kinKhi, cachAm, kinNuoc, chiuGio, chongTrom, ghiChu, anh {c: ảnh 3D, d: bản vẽ 2D}, them`.
- `he` có thể ghép ký tự: `w` cửa sổ, `d` cửa đi, `s` trượt, `l` nâng trượt, `f` xếp gấp, `v` vách kính; `ws` (cửa sổ trượt) khớp cả Cửa sổ và Trượt (lọc theo `includes`, giống trang gốc).
- Lọc Kết cấu: hệ `tn` khớp cả "có" lẫn "không" cầu nhiệt. Hệ `ketCau=""` chỉ hiện khi không lọc Kết cấu.
- Cột nguồn của trang gốc (`D[i]`): `[0]hãng [1]mã [2]loại [3]he [4]ketCau [5]tags [6]U-value(W/m²K) [7]kín khí [8]cách âm [9]kín nước [10]chịu gió [11]chống đột nhập [12]ghi chú [13]ảnh{c,d,p}`.

## 5. Ảnh: quy tắc và kết quả kiểm tra
- **Bản vẽ 2D** (`d`): đã xem ảnh ghép. Loại bỏ: bản vẽ vách kính Romadio RCT65 (có mã profile RMG… in nhỏ), 4 bản vẽ chi tiết phụ kiện Ponzio (chỉ số 59–62 trong `other.json`, có logo "Ponzio"). Bản vẽ Civro (52 hình) có **dải đỏ ghi mã sản phẩm ở đáy**, `gen3.cjs` cắt tự động (`catDai`).
- **Ảnh 3D** (`c`) và ảnh thực tế (`p`) của Winboss/Romadio/Civro đều có logo → **chưa dùng**. Riêng 2 ảnh 3D lấy từ thư mục `ROMADIO` của người dùng và đã xem tận mắt là sạch: `INFINITY 19H_nobg.png` (dùng cho hệ PANORAMA 19H, `idx 30`) và `RCT65 3_nobg.png` (dùng cho RCT65, `idx 31`). Cấu hình ở biến `RENDER_SACH` trong `gen3.cjs`.
- Hầu hết ảnh 3D trong thư mục `ROMADIO` (601 ảnh png/jpg, nhiều góc và bản "Tách nền" `_nobg`) **có logo ROMADIO ở mọi góc**. Bộ dò logo tự động `logo-det.cjs` chỉ bắt được khoảng 40% (bỏ sót nhiều logo nhỏ/xoay), **không đủ tin cậy**; chỉ dùng làm bước lọc thô, vẫn phải xem mắt.
- Hệ không có ảnh hợp lệ hiển thị hình minh họa SVG theo loại cửa (`HinhMinhHoa`).
- **Rà ảnh 11/11/2026 (đã xem tận mắt bằng bảng ảnh ghép và phóng to):** trong ~600 ảnh ROMADIO, phần lớn render 3D có chữ **"ROMADIO" in nhỏ ngay trên thanh nhôm** (không phải ở góc ảnh như ghi trước đó; bốn góc thường sạch), nên đã loại: OVERSKY 23S, RD120/150/190/225/230LS, RD65, RW*, MD65/190, MW*, FineLine bản có nhãn, bản "tách nền" của chúng. Bộ dò màu xanh navy chỉ để lọc thô, **luôn phải xem mắt**. Ảnh sạch dùng được và đã gán (script `cong-cu/them-anh-3d.cjs`): RD80FD, MD80FD (render tách nền), FineLine 59WO (6), FineLine 62DO (3), LD16IN, LD16OU, LD16SB-F, LD16ST, LD16ST-F (ảnh phối cảnh thư mục L SERIES; tab/ô hiển thị gọi chung "Mẫu góc"). Cộng với PANORAMA 19H và RCT65 có sẵn, đó là 11 hệ có ảnh **không logo**; thêm 27 hệ có ảnh có logo (xem ngay dưới).
- **Quyết định mới 11/11/2026 (người dùng):** cho phép dùng **ảnh mẫu góc CÓ logo hãng** (chữ ROMADIO nhỏ trên thanh nhôm) cho những hệ có ảnh, thay cho việc chỉ để bản vẽ 2D. Đã gán 27 hệ Romadio nữa (R/M Series, PANORAMA 19S 2/3 ray, OVERSKY 23S), tối đa 3 góc nhìn mỗi hệ (ưu tiên bản tách nền `_nobg`), cấu hình ở mảng `CO_LOGO` trong `cong-cu/them-anh-3d.cjs`. Tổng **38/47 hệ Romadio có mẫu góc**. Chưa có: RW100IN + FW40G (tên tệp là "RW100IN MESH", chưa chắc cùng hệ nên không đoán), 8 hệ LID (không có ảnh). **Civro và Ponzio không có ảnh 3D nào trong thư mục (Civro chỉ có PDF, Ponzio không có)** nên vẫn là bản vẽ 2D. Không cắt hay làm mờ logo.
- Ảnh Entrance door (78 ảnh) chưa xét vì không phải hệ cửa trong danh sách.
- Cắt/làm mờ logo trên ảnh là phương án người dùng đã được hỏi nhưng **không chọn** (họ chọn "chỉ ảnh không logo"). Đừng tự làm.

## 6. Thư mục ảnh của người dùng (nguồn bổ sung)
`D:\3 Cowork Demo\media-social-content-agent\02-INPUT\02-hinh-anh\`
- `Civro/`: 41 PDF tài liệu hệ (XW, XD, MW, ND, NW, PW80, ORAMA, ACW120, AWG140NWG110, USL, USW, AMAZA, retail booklet 2026, Selected Products, Surface finishes, catalog phụ kiện Cmech 92 MB…). PDF viết liền chữ, bảng thông số **lệch cột**; công cụ có sẵn: `pdftotext -layout` (poppler) và PyMuPDF (`fitz`).
- `Cmech/`: **trống** (chưa có hệ nào để thêm).
- `ROMADIO/`: 605 file: `1. R SERIES` (cầu nhiệt), `2. M SERIES` (không cầu nhiệt), `3. L SERIES` (cửa slim nội thất), `4. F SERIES` (lan can, mái kính), `5. B SERIES` (vách tắm), `6. D SERIES` (phễu thoát sàn), `7. Entrance door`, `FineLine`, `RANORAMA 19S`, `250314 B&D`, `250314 R&M`, `260314 FineLine`. Các thư mục **"Chưa có Logo / Đã có Logo"** chỉ có ở B, D, Entrance door (không phải hệ cửa chính).
- `masco vinakin/`, `Logo/`: mascot và logo VinaKIN/WINDUCA, không liên quan trang này.

## 7. Cách sinh lại dữ liệu và ảnh
Thư mục `cong-cu/` (Node, chạy từ **gốc repo**, vì dùng `node_modules/sharp`). Các script nhận tham số `S` = thư mục làm việc có cấu trúc:
```
S/wb-he-cua/he-cua.html      (snapshot trang Winboss, có sẵn trong du-lieu-lam-viec/)
S/wb-he-cua/all.json         (đã parse; sinh bằng parse-all.cjs)
S/wb-he-cua/other.json       (URL bản vẽ Civro + Ponzio theo thứ tự)
S/wb-img-romadio/            (ảnh Romadio tải từ winboss.biz; có trong file zip)
S/wb-img-other/              (bản vẽ Civro + Ponzio; có trong file zip)
S/local-list.json            (danh sách đường dẫn ảnh ROMADIO trên máy; tạo bằng sheet-local.cjs)
```
Lệnh:
```bash
cd "D:/3 Cowork Demo/winduca.com"
S="<đường dẫn thư mục làm việc>"
node docs/ban-giao-he-cua/cong-cu/parse-all.cjs "$S"        # parse trang Winboss -> all.json
node docs/ban-giao-he-cua/cong-cu/dl-wb.mjs "$S/wb-he-cua/other.json" "$S/wb-img-other"   # tải ảnh (chỉ khi cần)
node docs/ban-giao-he-cua/cong-cu/sheet-local.cjs "$S" "INFINITY 19H"   # cũng tạo local-list.json
node docs/ban-giao-he-cua/cong-cu/gen3.cjs "$S"             # ghi src/lib/he-cua-du-lieu.ts + public/images/he-cua/**
node docs/ban-giao-he-cua/cong-cu/them-anh-3d.cjs "<thư mục ROMADIO>"   # CHẠY SAU gen3: gen3 xóa public/images/he-cua nên mất các ảnh 3D thêm sau (36 hệ); script này làm lại
```
`gen3.cjs` xóa và tạo lại `public/images/he-cua/`. 9 hệ bổ sung được khai báo ngay trong `gen3.cjs` (hàm `them(...)`). Lưu ý đường dẫn trong `sheet-local.cjs`/`gen3.cjs` đang trỏ thẳng vào thư mục `ROMADIO` trên máy người dùng.

## 8. Việc còn lại / đề xuất (theo thứ tự ưu tiên)
1. **Xin hãng ảnh 3D bản không logo** (hoặc bộ "Chưa có Logo" cho R/M series). Đã tận dụng hết ảnh sạch hiện có (11 hệ Romadio) và, theo quyết định mới, cả ảnh có logo (thêm 27 hệ; xem mục 5). Toàn bộ Civro (chỉ có PDF) và Ponzio vẫn chưa có ảnh 3D nào. Đây vẫn là chỗ khác biệt lớn nhất so với Winboss.
2. **Xác nhận quyền dùng** số liệu, bản vẽ và tên hãng trên WINDUCA trước khi công bố chính thức (người dùng đã được nhắc nhiều lần, chưa trả lời dứt khoát).
3. ~~Kiểm tra số ACW120 và AWG140~~ **Đã kiểm 11/11/2026 bằng cách xem trang PDF thật** (không dùng chữ trích): ACW120 U 2.2, cách âm 35 dB, kín khí 0.21, kín nước 700 Pa, chịu gió **≤ 4.0 kPa** (đã sửa từ "4.0 kPa"); AWG140 U 2.2 và cách âm 35 dB, NWG110 ghi "/" (không công bố), PDF không có kín khí, kín nước, chịu gió cho cụm này. 7 hệ bổ sung còn lại chưa có bảng thông số ("Hãng chưa công bố thông số").
4. **Cmech**: thư mục trống; khi có tài liệu thì thêm hệ như `them(...)`.
5. Cân nhắc hệ Romadio khác chưa vào danh sách: MCL20, MCW-120H/S, SEMI (chưa rõ loại cửa nên **chưa thêm**, đừng đoán).
6. Nhóm sản phẩm ngoài hệ cửa trong thư mục (F lan can/mái kính, B vách tắm, D phễu sàn, Entrance door) nếu muốn đưa lên site thì nên làm trang riêng, không trộn vào danh sách hệ cửa.
7. ~~Dọn mã cũ không dùng~~ Đã làm 11/11/2026 (người dùng đồng ý).
8. ~~Nút "Bộ lọc" dạng dock trên mobile~~ Đã làm 11/11/2026 (xem DESIGN-SYSTEM 3.11.8). Bẫy: các phần tử `fixed` trong `HeCuaDanhSach` phải qua `Cong` (portal ra `<body>`), vì thẻ bao ngoài có `backdrop-filter`.
9. Mảng khác còn dang dở từ trước: thay ảnh stock Pexels bằng ảnh/video thật, số liệu chính thức cho thẻ, đưa lên Vercel, và **điều tra Winboss.biz (WordPress) mất sản phẩm** (danh mục Winboss/Civro rỗng, sản phẩm là bài viết, 10 trong "Sản phẩm": Ponzio 6, Romadio 4; 7 bản nháp, 1 thùng rác; chưa rõ nguyên nhân; đã tạm dừng theo ý người dùng).

## 9. Quy tắc và bẫy kỹ thuật
Quy tắc nội dung WINDUCA: **không giá**, **không bịa số liệu**, số chưa xác nhận để "chờ xác nhận"/"Hãng chưa công bố"; trang khác không nêu tên hãng (trừ ngoại lệ `/he-cua`).

Bẫy đã gặp:
- **Fetch trước khi sửa và trước khi push**: từng bị push từ chối vì nhánh `origin/main` có 65 commit mới từ luồng khác. Đẩy bằng `git push origin HEAD:main` (nhánh local `ghep-san-pham`). Không force.
- Xây bản tĩnh: `GITHUB_PAGES=true npm run build` (basePath `/winduca.com`, ảnh `unoptimized`, `quality` chỉ 60 hoặc 75, dùng `asset()` cho mọi đường dẫn ảnh). Xóa `.next` rồi chạy `tsc` sẽ báo lỗi `PageProps` giả: chạy `npm run build` (hoặc `next typegen`) trước.
- **Đừng bọc khối quá cao bằng `<Hien>`** (hiệu ứng hiện dần dùng IntersectionObserver ngưỡng, khối cao ~8000px không bao giờ hiện).
- ESLint bật `react-hooks/set-state-in-effect`: không `setState` trực tiếp trong `useEffect`. Bộ lọc nạp từ URL bằng `useSyncExternalStore`.
- Edit file CRLF: chuỗi nhiều dòng hay không khớp, dùng thay thế từng dòng hoặc regex `\r?\n`. Tool Edit báo "file modified since read" thì đọc lại.
- Khung xem trước trong ứng dụng có thể có `innerWidth=0` hoặc render nền; dùng `resize_window` đặt 1440x900 hoặc preset mobile, đợi vài giây cho ảnh tải (dev server tối ưu ảnh lần đầu chậm).
- Truy cập: kết quả lọc có vùng `role="status"`, hộp thoại giữ focus và trả focus, vùng bấm tối thiểu 44px. Giữ nguyên các mẫu này khi thêm tính năng.

## 10. Kiểm tra nhanh trước khi giao lại
```bash
npx tsc --noEmit && npx eslint src && GITHUB_PAGES=true npm run build
```
Mở `/he-cua`: 115 hệ (Romadio 47, Civro 35, Ponzio 33), lọc "Civro + Cửa đi" ra 6, trang 2 có `?p=2`, tick 3 ô so sánh rồi tick ô thứ 4 báo "Chỉ so sánh tối đa 3 hệ", mở thẻ PANORAMA 19H có tab "Mẫu góc" và "Bản vẽ 2D".
