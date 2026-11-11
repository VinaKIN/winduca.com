/**
 * Thêm ảnh mẫu góc 3D của Civro (lấy từ trang sản phẩm chính thức https://www.civro.com/product/..., 11/11/2026).
 * Chạy từ GỐC repo:  node docs/ban-giao-he-cua/cong-cu/them-anh-civro.cjs
 *
 * Người dùng yêu cầu lấy ảnh từ trang của hãng cho các hệ chưa có ảnh. Ảnh là render 3D mẫu góc (png/webp nền trong suốt) ở
 * mục "Product" của từng hệ, đã xem tận mắt: không có logo hay chữ trên sản phẩm. Không lấy ảnh phối cảnh nội thất (.jpg).
 * Mỗi hệ tối đa 3 ảnh (góc trong/ngoài, ngưỡng thấp/cao...). Hệ USL, USW, AMAZA UID16, XD55 không có ảnh trên trang nên bỏ qua.
 * Tải về và đổi sang WebP tại public/images/he-cua/mau-goc/civro-<ma>-g<n>.webp, rồi gán vào anh.c trong src/lib/he-cua-du-lieu.ts.
 * QUAN TRỌNG: gen3.cjs xóa thư mục ảnh; chạy script này (và them-anh-3d.cjs) SAU gen3.
 */
const fs = require("fs");
const sharp = require("sharp");

const slug = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ma hệ (đúng như trong dữ liệu) -> địa chỉ ảnh trên civro.com
const CIVRO = {
 "PW80 · Enfini Pro Slender Frames": [
  "https://www.civro.com/wp-content/uploads/2025/11/PW80INPSW80-e1764311052568.png",
  "https://www.civro.com/wp-content/uploads/2025/11/PW80OUPSW80-e1764311011931.png",
  "https://www.civro.com/wp-content/uploads/2024/11/PW80IN.webp"
 ],
 "MW65": [
  "https://www.civro.com/wp-content/uploads/2026/01/MW65IN-拷贝-e1767840247381.png",
  "https://www.civro.com/wp-content/uploads/2026/01/MW65OU-拷贝-e1767840318921.png"
 ],
 "XW55": [
  "https://www.civro.com/wp-content/uploads/2024/11/XW55IN.png",
  "https://www.civro.com/wp-content/uploads/2024/11/XW55OU.png"
 ],
 "XW65": [
  "https://www.civro.com/wp-content/uploads/2024/11/XW65IN.png",
  "https://www.civro.com/wp-content/uploads/2024/11/XW65OU.png"
 ],
 "XW75": [
  "https://www.civro.com/wp-content/uploads/2024/11/XW75IN.png",
  "https://www.civro.com/wp-content/uploads/2024/11/XW75OU.png"
 ],
 "XW80": [
  "https://www.civro.com/wp-content/uploads/2024/11/XW80IN-.png"
 ],
 "XWS90": [
  "https://www.civro.com/wp-content/uploads/2024/11/XWS90IN.png"
 ],
 "XWS100": [
  "https://www.civro.com/wp-content/uploads/2024/11/XWS100IN.png"
 ],
 "XWS115": [
  "https://www.civro.com/wp-content/uploads/2024/11/XWS115OU.png"
 ],
 "XWS125": [
  "https://www.civro.com/wp-content/uploads/2024/11/XWS125OU.png"
 ],
 "Retro XW85_BC/XW95_BC": [
  "https://www.civro.com/wp-content/uploads/2024/11/XW85IN_BC.png",
  "https://www.civro.com/wp-content/uploads/2024/11/XW95IN_BC.png",
  "https://www.civro.com/wp-content/uploads/2025/09/XW85OU_BC-scaled-e1757906972684.webp"
 ],
 "XVE65 & XVE100": [
  "https://www.civro.com/wp-content/uploads/2024/11/XVE65IN.png",
  "https://www.civro.com/wp-content/uploads/2024/11/XVE100IN.png"
 ],
 "XW100PO/XW110PO": [
  "https://www.civro.com/wp-content/uploads/2024/11/XW100PO.png",
  "https://www.civro.com/wp-content/uploads/2024/11/平推窗XW110PO-1-scaled-e1730879813596.webp"
 ],
 "NW55_E": [
  "https://www.civro.com/wp-content/uploads/2024/11/NW55IN_E-内开窗-scaled-e1730793514114.webp",
  "https://www.civro.com/wp-content/uploads/2024/11/NW55OU_E-外开窗-scaled-e1730793472780.webp"
 ],
 "MD65": [
  "https://www.civro.com/wp-content/uploads/2026/01/MD65IN低门槛-e1767842314191.png",
  "https://www.civro.com/wp-content/uploads/2026/01/MD65OU低门槛-e1767842173678.png",
  "https://www.civro.com/wp-content/uploads/2026/01/MD65IN高门槛-e1767842349354.png"
 ],
 "XD65": [
  "https://www.civro.com/wp-content/uploads/2024/11/XD65IN-低门槛.png",
  "https://www.civro.com/wp-content/uploads/2024/11/XD65OU-低门槛.png",
  "https://www.civro.com/wp-content/uploads/2024/11/XD65IN-高门槛.png"
 ],
 "XD80": [
  "https://www.civro.com/wp-content/uploads/2024/11/XD80IN-低门槛.png",
  "https://www.civro.com/wp-content/uploads/2024/11/XD80OU-低门槛.png",
  "https://www.civro.com/wp-content/uploads/2024/11/XD80IN-高门槛.png"
 ],
 "Retro XD85_BC/XD95_BC": [
  "https://www.civro.com/wp-content/uploads/2025/09/XD95IN_BC-scaled-e1757915349955.webp",
  "https://www.civro.com/wp-content/uploads/2025/09/XD85OU_BC-scaled-e1757906097829.webp",
  "https://www.civro.com/wp-content/uploads/2025/09/XD95OU_BC-scaled-e1757915228950.webp"
 ],
 "ND55_E": [
  "https://www.civro.com/wp-content/uploads/2024/11/ND55IN_E-低门槛.png",
  "https://www.civro.com/wp-content/uploads/2024/11/ND55OU_E-低门槛.png"
 ],
 "PD65 · Enfini Pro": [
  "https://www.civro.com/wp-content/uploads/2024/11/PD65SS.png"
 ],
 "CIVRO-ORAMA UD137/UD207": [
  "https://www.civro.com/wp-content/uploads/2024/11/ORAMA-UD137SS.png",
  "https://www.civro.com/wp-content/uploads/2024/11/ORAMA-UD207SS.png"
 ],
 "MD45SS": [
  "https://www.civro.com/wp-content/uploads/2026/01/MD45SS-双轨平轨-e1767767419597.png",
  "https://www.civro.com/wp-content/uploads/2026/01/MD45SS-双轨高低轨-e1767767823646.png",
  "https://www.civro.com/wp-content/uploads/2026/01/MD45SS-三轨-e1767767567349.png"
 ],
 "XD63": [
  "https://www.civro.com/wp-content/uploads/2024/10/XD63LS_90单轨.png",
  "https://www.civro.com/wp-content/uploads/2024/10/XD63LS_90双轨.png",
  "https://www.civro.com/wp-content/uploads/2024/10/XD63LS_90三轨.png"
 ],
 "XD73LS": [
  "https://www.civro.com/wp-content/uploads/2024/11/XD73.png"
 ],
 "AD80FD": [
  "https://www.civro.com/wp-content/uploads/2024/11/AD80FD.png"
 ],
 "AW55SS": [
  "https://www.civro.com/wp-content/uploads/2024/11/AW55SS.png"
 ],
 "ND45SS": [
  "https://www.civro.com/wp-content/uploads/2024/11/ND115.png",
  "https://www.civro.com/wp-content/uploads/2024/11/ND175.png"
 ],
 "NW55SS": [
  "https://www.civro.com/wp-content/uploads/2024/11/NW55SS.png"
 ],
 "ACW120": [
  "https://www.civro.com/wp-content/uploads/2024/11/ACW120.png"
 ],
 "AWG140 / NWG110": [
  "https://www.civro.com/wp-content/uploads/2024/11/AWG140.png",
  "https://www.civro.com/wp-content/uploads/2024/11/NWG110.png"
 ],
 "XW98": [
  "https://www.civro.com/wp-content/uploads/2024/11/微信图片_20241105171008-e1730798287929.png"
 ]
};

const cho = (ms) => new Promise((r) => setTimeout(r, ms));
async function tai(u) {
  const url = encodeURI(u);
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (r.ok) return Buffer.from(await r.arrayBuffer());
    } catch (e) {}
    await cho(1500);
  }
  return null;
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
  for (const [ma, urls] of Object.entries(CIVRO)) {
    const r = arr.find((x) => x.hang === "civro" && x.ma === ma);
    if (!r) {
      console.log("KHÔNG THẤY hệ:", ma);
      continue;
    }
    const kq = [];
    for (let k = 0; k < urls.length; k++) {
      const buf = await tai(urls[k]);
      if (!buf) {
        console.log("LỖI tải", urls[k]);
        continue;
      }
      const ten = `civro-${slug(ma)}-g${kq.length + 1}.webp`;
      await sharp(buf).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 90 }).toFile("public/images/he-cua/mau-goc/" + ten);
      kq.push("/images/he-cua/mau-goc/" + ten);
      await cho(150);
    }
    if (kq.length) {
      r.anh.c = kq;
      n++;
      console.log("OK", ma, kq.length, "ảnh");
    }
  }
  const out = s.slice(0, a) + JSON.stringify(arr, null, 1) + s.slice(b + 1);
  fs.writeFileSync(f, out);
  console.log("Đã gán ảnh cho", n, "hệ Civro");
})();
