@AGENTS.md

# WINDUCA

Website WINDUCA thuộc VinaKIN Group. Giao diện và nội dung dùng tiếng Việt.

## Cấu trúc

```text
.
├── AGENTS.md
├── CLAUDE.md
├── .github/workflows/pages.yml
├── docs/
│   ├── BAN-GIAO.md
│   ├── BRIEF-UI-UX.md
│   ├── DESIGN-SYSTEM.md
│   └── ban-giao-he-cua/du-lieu-lam-viec/winboss-he-cua.css
├── tools/                 # Script dữ liệu và ảnh hệ cửa
├── _luu-tru/wb-he-cua/   # Snapshot và dữ liệu nguồn lưu trữ
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── public/
└── worker/
```

## Lệnh

Yêu cầu Node.js 20+ và npm:

```powershell
npm install
npm run dev
npm run lint
npm run build
```

Build tĩnh GitHub Pages trên PowerShell. Tạm chuyển API ra ngoài repo; `finally` luôn khôi phục thư mục, kể cả khi build lỗi:

```powershell
$apiBackup = Join-Path $env:TEMP ("winduca-api-" + [guid]::NewGuid().ToString())
Move-Item src/app/api $apiBackup
try {
  $env:GITHUB_PAGES = "true"
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "Static build failed: $LASTEXITCODE" }
} finally {
  Remove-Item Env:GITHUB_PAGES -ErrorAction SilentlyContinue
  if (Test-Path $apiBackup) { Move-Item $apiBackup src/app/api }
}
```

Build tĩnh xuất thư mục `out/`; bản này không có route API. Workflow Pages cũng loại `src/app/api` trước khi build.

## Git

- Trước khi sửa: `git fetch origin`, rồi kiểm tra `git status` và đối chiếu `origin/main`.
- Đẩy theo quy trình dự án: `git push origin HEAD:main`.
- Không force-push. Chỉ đẩy mốc đã được duyệt để xem bản live.

## Ranh đỏ nội dung

- Không báo giá, khoảng giá, chiết khấu hoặc ưu đãi.
- Không bịa số liệu, thông số hay chứng nhận. Thiếu xác nhận thì ghi “Đang chờ xác nhận” hoặc ẩn nội dung.
- Chỉ nêu tên hãng (Romadio, Civro, Ponzio) trên `/he-cua`; không nêu tên đối thủ.
- Không đưa dữ liệu khách hàng vào repo hoặc bản ghi công khai.

## Dữ liệu website (cập nhật 12/11/2026)

**Bản xem thử:** https://vinakin.github.io/winduca.com/ (GitHub Pages, build tĩnh từ nhánh `main` của `VinaKIN/winduca.com`). Công nghệ: Next.js 16.4 App Router, React 19, Tailwind v4, TypeScript; xuất tĩnh nên `basePath` là `/winduca.com` và ảnh dùng `asset()` (`src/lib/asset.ts`).

### Bản đồ trang (App Router, `src/app/`)

| Đường dẫn | Nội dung | Nguồn dữ liệu |
|---|---|---|
| `/` | Trang chủ: hero trượt, hệ cửa nổi bật, dịch vụ, tin tức, trải nghiệm | `components/TrangChuKhoi.tsx`, `HomeSections.tsx`, `lib/san-pham.ts` |
| `/gioi-thieu`, `/nang-luc-xuong`, `/trai-nghiem`, `/danh-cho-kts` | Trang thương hiệu, xưởng, hộp mẫu/showroom, tài liệu KTS | từng `page.tsx` + `components/` |
| `/he-cua` | **115 hệ cửa** (Romadio 47, Civro 35, Ponzio 33), giao diện lọc và lưới thẻ như cũ, nút **Chọn hệ** mở hộp thoại 5 bước bấm số 1–5 (1 Hãng, 2 Loại hệ, 3 Đặc điểm, 4 Kết quả, 5 So sánh và tư vấn) áp bộ lọc lên trang; popup chi tiết vừa một khung hình có tab Mẫu góc, Bản vẽ 2D, Công trình | `lib/he-cua-du-lieu.ts`, `components/HeCuaDanhSach.tsx`, `HeCuaCacBuoc.tsx` (các bước), `lib/he-cua-cong-trinh.ts` (ảnh công trình + nguồn), ảnh `public/images/he-cua/{mau-goc,ban-ve,cong-trinh}/` |
| `/he-cua/<kiểu>` | 4 trang kiểu cửa (nâng trượt, đi mở quay, xếp trượt, cửa sổ), là điểm vào của `/he-cua?h=` | `lib/site.ts` (`KIEU_CUA`), `lib/san-pham.ts` |
| `/giai-phap`, `/giai-phap/<slug>` | 8 loại công trình, bài chi tiết, hỏi đáp, quy trình 5 bước | `lib/giai-phap.ts`, ảnh `public/images/giai-phap/` (Pexels) |
| `/cong-trinh`, `/cong-trinh/<slug>` | Công trình tiêu biểu: 12 mục cảm hứng (minh họa), `DU_AN` thật hiện rỗng | `lib/site.ts` (`CONG_TRINH_MINH_HOA`), `lib/du-an.ts` |
| `/hop-tac` | Đối tác: 3 nhóm, lý do, lộ trình, hỏi đáp, khu vực; form ở chân trang `#dang-ky-tham-quan` | `lib/doi-tac.ts`, `components/DoiTacTuongTac.tsx` |
| `/tin-tuc`, `/tin-tuc/<bài>`, 4 chuyên mục con | Tạp chí tối giản: bài nổi bật, tìm kiếm, lọc, thanh tiến độ đọc, mục lục nổi | `lib/bai-viet.ts` (9 bài kiến thức), `components/TinTucDanhSach.tsx`, `AnhBai.tsx` (khung ảnh chung: bài có `kieu: "ky-thuat"` dùng mẫu 3D/bản vẽ 2D của WINDUCA trên nền tối kẻ lưới; thanh màu theo chủ đề qua `mauChuDe`), `TinTucTrang.tsx`, `DocBai.tsx` |
| `/chinh-sach*`, `/dieu-khoan-su-dung`, `/lien-he`, `/cam-on` | Pháp lý (bản nháp chờ pháp chế), liên hệ, cảm ơn | `page.tsx`, `components/LeadForm.tsx` |

Menu và hằng số chung ở `src/lib/site.ts` (`MENU_CHINH`, hotline 0947 686 668, email info@winduca.com, địa chỉ showroom). Menu "Hệ cửa" có 6 loại hệ kèm số hệ ghi tay (`so`), cập nhật khi thêm hệ.

### Thành phần dùng chung (`src/components/`)

- `ui.tsx` (`Wrap`, `Section`, `PageHero`), `HieuUng.tsx` (`Hien` hiện dần, `NutHut`, `KeoNgang`).
- `TrangMau.tsx`: `TieuDeTrang` + `LuoiLoc` (bố cục trang con theo mẫu Winboss).
- `Header.tsx`, `Footer.tsx` (có form `FormHaiNhom`), `LeadForm.tsx`, `CookieBanner.tsx`.

### Giao diện

- Chỉ phông **Roboto**; tiêu đề thường, đậm, không viết hoa, không giãn chữ; không chữ có chân, không monospace.
- Màu: Ngà `#f5f3ee`, Than đen `#231f20`, đỏ nhấn `#e31937` (hover `#b8122b`). Chữ nhấn dùng `text-accent` (tự đổi theo nền, xem DESIGN-SYSTEM mục 2.1). Đỏ gốc không làm chữ cỡ thường.
- Chữ tối thiểu 12px, ô chạm tối thiểu 44px, tôn trọng giảm chuyển động, ảnh đều có `alt`.
- Hai kiểu trang con đang song song: tiêu đề trắng giữa trang (Giải pháp, Công trình, Chính sách, Liên hệ, Đối tác) và hero ảnh tối cũ (Giới thiệu, Hệ cửa, Năng lực & Xưởng, Trải nghiệm, Dành cho KTS). Tin tức dùng kiểu tạp chí nền ngà. Thống nhất là việc còn lại (đợt 3 rà soát UI/UX).

### Quyết định của anh Huy (còn hiệu lực)

- Hiện đủ 115 hệ, không ẩn hệ thiếu ảnh 3D; ảnh Romadio có logo được dùng; ảnh Civro, Ponzio lấy từ trang chính thức của hãng; không cắt hay làm mờ logo.
- Ảnh minh họa dùng Pexels (miễn phí thương mại), luôn ghi "Ảnh minh họa"; ID ở `public/images/NGUON-ANH.md`.
- Hỏi câu hỏi quan trọng trước khi làm thay đổi lớn; đẩy lên sau mỗi mốc để anh xem bản live (bản live chậm vài phút sau khi đẩy).
- Trang `/he-cua` là nơi duy nhất được nêu tên hãng.

### Dữ liệu và công cụ

- `tools/` chạy từ gốc repo, theo thứ tự: `gen3` → `them-anh-civro` → `them-anh-ponzio` → `them-anh-3d "<thư mục ROMADIO>"` → `bo-sung-tag` → `chuan-hoa-anh` (cuối). Chi tiết ở `docs/BAN-GIAO.md`.
- Ảnh hệ cửa chuẩn hóa theo khối lượng điểm ảnh; tệp hậu tố `-p<số>` là ảnh chụp, hiển thị kiểu phủ kín và không bị chuẩn hóa.
- Thư mục `src/app/api` chỉ dùng bản chạy thật (Vercel); build GitHub Pages phải tạm chuyển ra ngoài (xem mục Lệnh).
- Xem thử cục bộ đã build: copy `out/` vào thư mục phục vụ tĩnh dưới đường dẫn `/winduca.com/`.

### Việc còn mở

- Đợt 3 rà soát UI/UX: thống nhất hero các trang còn kiểu cũ, rút gọn trang chủ trên mobile.
- 15 hệ chưa có ảnh 3D (Civro XD55, USL, USW, AMAZA UID16; Ponzio NT 75 TT HI cửa đi, SL65 In linea, SL65 Nâng trượt, Apexfine; Romadio LID45/58/102/115/172/230/67IN).
- Xác nhận quyền dùng ảnh và dữ liệu của hãng; công trình thật cho `DU_AN`; bài thuộc Tin hoạt động, Câu chuyện công trình, Tài liệu; chính sách bảo hành và pháp lý do pháp chế duyệt.

## Tài liệu

- Quy trình và dữ liệu Hệ cửa: [docs/BAN-GIAO.md](docs/BAN-GIAO.md)
- Token, linh kiện và quy tắc giao diện: [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)