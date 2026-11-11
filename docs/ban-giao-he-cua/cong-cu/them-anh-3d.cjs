/**
 * Thêm ảnh 3D / ảnh thực tế KHÔNG LOGO của Romadio vào dữ liệu trang /he-cua (11/11/2026).
 * Chạy từ GỐC repo:  node docs/ban-giao-he-cua/cong-cu/them-anh-3d.cjs "<đường dẫn thư mục ROMADIO>"
 *
 * Việc làm: đổi ảnh nguồn sang WebP (public/images/he-cua/mau-goc/), rồi gán vào trường anh.c của hệ có mã tương ứng
 * trong src/lib/he-cua-du-lieu.ts. Chạy lại được nhiều lần (ghi đè, không nhân đôi).
 *
 * QUY TẮC: chỉ dùng ảnh đã xem tận mắt và không có logo/tên hãng trên sản phẩm lẫn ở góc.
 * Danh sách dưới đây là kết quả rà 11/11/2026: nhiều ảnh Romadio có chữ "ROMADIO" in nhỏ trên thanh nhôm, nên đã loại
 * (ví dụ OVERSKY 23S, RD120/150/190LS, RW*, MD65, MW*, FineLine bản có nhãn). Đừng thêm ảnh nếu chưa xem kỹ.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const GOC = process.argv[2] || "D:/3 Cowork Demo/media-social-content-agent/02-INPUT/02-hinh-anh/ROMADIO";
const slug = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ma hệ trong dữ liệu -> tên tệp nguồn; kieu: "render" (nền trong suốt, giữ alpha) hoặc "anh" (ảnh chụp phối cảnh)
const DS = [
  { ma: "RD80FD", tep: "RD80FD_nobg.png", kieu: "render" },
  { ma: "MD80FD", tep: "MD80FD_nobg.png", kieu: "render" },
  { ma: "FineLine 59WO", tep: "FineLine 59WO (6).jpg", kieu: "anh" },
  { ma: "FineLine 62DO", tep: "FineLine 62DO (cửa đi) (3).jpg", kieu: "anh" },
  { ma: "LD16IN", tep: "LD16IN.png", kieu: "anh" },
  { ma: "LD16SB-F", tep: "LD16SB-F.png", kieu: "anh" },
  { ma: "LD16ST", tep: "LD16ST.png", kieu: "anh" },
  { ma: "LD16ST-F", tep: "LD16ST-F.png", kieu: "anh" },
  { ma: "LD16OU", tep: "LD67OU - LD16OU.png", kieu: "anh" }, // tên tệp ghi chung LD67OU và LD16OU: chỉ gán cho LD16OU
];

function tim(ten) {
  const ra = [];
  (function di(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) di(p);
      else if (e.name === ten) ra.push(p);
    }
  })(GOC);
  return ra.sort()[0];
}

(async () => {
  fs.mkdirSync("public/images/he-cua/mau-goc", { recursive: true });
  const f = "src/lib/he-cua-du-lieu.ts";
  const s = fs.readFileSync(f, "utf8").replace(/\r\n/g, "\n");
  const i = s.indexOf("HE_CUA_DS");
  const a = s.indexOf("[", s.indexOf("=", i));
  const b = s.lastIndexOf("]");
  const arr = JSON.parse(s.slice(a, b + 1));
  let n = 0;
  for (const m of DS) {
    const r = arr.find((x) => x.hang === "romadio" && x.ma === m.ma);
    if (!r) {
      console.log("KHÔNG THẤY hệ:", m.ma);
      continue;
    }
    const nguon = tim(m.tep);
    if (!nguon) {
      console.log("KHÔNG THẤY tệp:", m.tep);
      continue;
    }
    const ten = `romadio-${slug(m.ma)}-g1.webp`;
    const dich = "public/images/he-cua/mau-goc/" + ten;
    let ps = sharp(nguon);
    if (m.kieu === "render") ps = ps.resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 90 });
    else ps = ps.resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 });
    await ps.toFile(dich);
    r.anh.c = ["/images/he-cua/mau-goc/" + ten];
    n++;
    console.log("OK", m.ma, "->", ten, Math.round(fs.statSync(dich).size / 1024) + " KB");
  }
  let out = s.slice(0, a) + JSON.stringify(arr, null, 1) + s.slice(b + 1);
  out = out.replace("và 2 ảnh 3D đã kiểm tra không có logo", "và các ảnh 3D/ảnh thực tế đã kiểm tra không có logo");
  fs.writeFileSync(f, out);
  console.log("Đã gán", n, "ảnh");
})();
