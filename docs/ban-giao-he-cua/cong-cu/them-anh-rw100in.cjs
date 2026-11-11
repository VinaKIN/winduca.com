/**
 * RW100IN + FW40G: ảnh render studio từ trang chính thức romadio.com (11/11/2026). Chạy từ GỐC repo, sau gen3:
 *   node docs/ban-giao-he-cua/cong-cu/them-anh-rw100in.cjs
 * Nền studio (không tách nền) nên đặt tên hậu tố -p<số> (hiển thị kiểu phủ kín, chuan-hoa-anh.cjs bỏ qua). Có chữ ROMADIO in trên thanh nhôm.
 */
const fs = require("fs");
const sharp = require("sharp");
(async () => {
  const dir = "public/images/he-cua/mau-goc/";
  const c = [];
  for (const i of [1, 2]) {
    const r = await fetch(`https://romadio.com/wp-content/uploads/2024/03/RW100IN-FW40G-${i}.jpg`, { headers: { "User-Agent": "Mozilla/5.0" } });
    const buf = Buffer.from(await r.arrayBuffer());
    await sharp(buf).resize({ width: 1000 }).webp({ quality: 80 }).toFile(`${dir}romadio-rw100in-fw40g-p${i}.webp`);
    c.push(`/images/he-cua/mau-goc/romadio-rw100in-fw40g-p${i}.webp`);
  }
  const P = "src/lib/he-cua-du-lieu.ts";
  const s = fs.readFileSync(P, "utf8");
  const a = s.indexOf("[", s.indexOf("HE_CUA_DS: HeCua[]") + 18);
  const b = s.lastIndexOf("]");
  const arr = JSON.parse(s.slice(a, b + 1));
  const r = arr.find((x) => x.hang === "romadio" && x.ma === "RW100IN + FW40G");
  r.anh.c = c;
  fs.writeFileSync(P, s.slice(0, a) + JSON.stringify(arr, null, 1) + s.slice(b + 1));
  console.log("ok", c);
})();
