/**
 * Thêm ảnh 3D / ảnh thực tế KHÔNG LOGO của Romadio vào dữ liệu trang /he-cua (11/11/2026).
 * Chạy từ GỐC repo:  node docs/ban-giao-he-cua/cong-cu/them-anh-3d.cjs "<đường dẫn thư mục ROMADIO>"
 *
 * Việc làm: đổi ảnh nguồn sang WebP (public/images/he-cua/mau-goc/), rồi gán vào trường anh.c của hệ có mã tương ứng
 * trong src/lib/he-cua-du-lieu.ts. Chạy lại được nhiều lần (ghi đè, không nhân đôi).
 *
 * Hai danh sách:
 *  - DS (KHÔNG LOGO): ảnh đã xem tận mắt, sản phẩm không có chữ hãng. Một ảnh mỗi hệ.
 *  - CO_LOGO (CÓ LOGO HÃNG): ảnh mẫu góc có chữ "ROMADIO" in nhỏ trên thanh nhôm. Người dùng đồng ý dùng (11/11/2026, đổi
 *    quy tắc "chỉ ảnh không logo" cho các hệ chưa có ảnh sạch). Tối đa 3 góc nhìn mỗi hệ, ưu tiên bản tách nền (_nobg).
 * Hệ Civro và Ponzio không có ảnh 3D trong thư mục nên vẫn dùng bản vẽ 2D. Không cắt hay làm mờ logo.
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

// Hệ có ảnh mẫu góc CÓ logo hãng. stem = phần đầu tên tệp (bản tách nền: "<stem> 1_nobg.png", "<stem> 2_nobg.png", ...);
// tep = danh sách tên tệp cụ thể khi không có bản tách nền.
const CO_LOGO = [
  { ma: "RD120LS/SS", stem: "RD120LS" },
  { ma: "RD150LS/SS Triple Glass", stem: "RD150LS" },
  { ma: "RD190LS/SS", stem: "RD190LS" },
  { ma: "RD225LS/SS Triple Glass", stem: "RD225LS_SS" },
  { ma: "RD65IN", stem: "RD65IN" },
  { ma: "RD65OU", stem: "RD65OU" },
  { ma: "RP127OU + Fence", stem: "RP127OU" },
  { ma: "RVE100IN", stem: "RVE100IN" },
  { ma: "RVE65IN", stem: "RVE65IN" },
  { ma: "RW100SS", tep: ["RW100SS.png", "RW100SS (2).png", "RW100SS (3).png"] },
  { ma: "RW120OU + MESH", stem: "RW120OU MESH" },
  { ma: "RW65IN + Mesh", stem: "RW65IN MESH" },
  { ma: "RW65OU", stem: "RW65OU" },
  { ma: "MD120LS/SS", stem: "MD120LS" },
  { ma: "MD190LS/SS", stem: "MD190LS" },
  { ma: "MD55IN", stem: "MD55IN" },
  { ma: "MD55OU", stem: "MD55OU" },
  { ma: "MD65IN", tep: ["MD65IN.png", "MD65IN (2).png", "MD65IN (3).png"] },
  { ma: "MD65OU", stem: "MD65OU" },
  { ma: "MW55OU", stem: "MW55OU" },
  { ma: "MW65IN + Mesh", stem: "MW65IN" },
  { ma: "MW65OU + MESH", stem: "MW65OU" },
  { ma: "MW65SS + Mesh", stem: "MW65SS MESH" },
  { ma: "PANORAMA 19S \u00b7 2 ray", stem: "PANORAMA 19S 2 RAY" },
  { ma: "PANORAMA 19S \u00b7 3 ray", stem: "PANORAMA 19S 3 RAY" },
  { ma: "OVERSKY 23S Double", tep: ["OVERSKY 23S Double.png", "OVERSKY 23S Double 2).png", "OVERSKY 23S Double (3).png"] },
  { ma: "OVERSKY 23S Triple", tep: ["OVERSKY 23S Triple.png", "OVERSKY 23S Triple (2).png", "OVERSKY 23S Triple (3).png"] },
];
function tenNobg(stem) {
  return [`${stem}_nobg.png`, `${stem} 1_nobg.png`, `${stem} 2_nobg.png`, `${stem} 3_nobg.png`];
}

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
  let nl = 0;
  for (const m of CO_LOGO) {
    const r = arr.find((x) => x.hang === "romadio" && x.ma === m.ma);
    if (!r) {
      console.log("KHÔNG THẤY hệ:", m.ma);
      continue;
    }
    const ds = (m.tep || tenNobg(m.stem)).map((t) => tim(t)).filter(Boolean).slice(0, 3);
    if (!ds.length) {
      console.log("KHÔNG CÓ ảnh:", m.ma);
      continue;
    }
    const kq = [];
    for (let k = 0; k < ds.length; k++) {
      const ten = `romadio-${slug(m.ma)}-g${k + 1}.webp`;
      const dich = "public/images/he-cua/mau-goc/" + ten;
      await sharp(ds[k]).resize({ width: k === 0 ? 1400 : 1100, withoutEnlargement: true }).webp({ quality: 80, alphaQuality: 88 }).toFile(dich);
      kq.push("/images/he-cua/mau-goc/" + ten);
    }
    r.anh.c = kq;
    nl++;
    console.log("OK(logo)", m.ma, "->", kq.length, "ảnh");
  }
  console.log("Hệ ảnh có logo:", nl);
  let out = s.slice(0, a) + JSON.stringify(arr, null, 1) + s.slice(b + 1);
  out = out.replace("và 2 ảnh 3D đã kiểm tra không có logo", "và các ảnh 3D/ảnh thực tế đã kiểm tra không có logo");
  fs.writeFileSync(f, out);
  console.log("Đã gán", n, "ảnh");
})();
