/**
 * Thêm ảnh mẫu góc 3D của Ponzio (lấy từ trang hệ chính thức https://ponzioaluminium.com/en/<hệ>/, 11/11/2026).
 * Chạy từ GỐC repo:  node docs/ban-giao-he-cua/cong-cu/them-anh-ponzio.cjs
 *
 * Người dùng yêu cầu lấy ảnh từ trang của hãng cho các hệ chưa có ảnh. Mỗi hệ một ảnh render 3D mẫu góc (png nền trong suốt,
 * 500 px) ở đầu trang hệ, đã xem tận mắt: không có logo hay chữ. WS 55 TT (cửa đi) dùng chung ảnh với WS 55 TT vì trang của
 * Ponzio gộp cả cửa sổ và cửa đi. Chưa có: NT 75 TT HI (cửa đi, liên kết trên trang hãng bị lỗi 404), SL65 In linea,
 * SL65 Nâng trượt, Apexfine (chưa tìm được trang). Ảnh của WS 45 TT trên trang hãng trùng ảnh của WS 55 TT (do hãng đặt).
 * Tải về và đổi sang WebP tại public/images/he-cua/mau-goc/ponzio-<ma>-g1.webp, rồi gán vào anh.c trong src/lib/he-cua-du-lieu.ts.
 * QUAN TRỌNG: gen3.cjs xóa thư mục ảnh; chạy script này (và them-anh-3d.cjs, them-anh-civro.cjs) SAU gen3.
 */
const fs = require("fs");
const sharp = require("sharp");

const slug = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ma hệ (đúng như trong dữ liệu) -> địa chỉ ảnh trên civro.com
const PONZIO = {
 "WS 45": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/01/WS45.png"
 ],
 "WS 45 TT": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/01/WS55TT.png"
 ],
 "WS 55 TT": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/03/WS55TT.png"
 ],
 "WS 65 THI": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/02/WS65THI.png"
 ],
 "WS 65 THI AS": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/03/WS65THI-as.png"
 ],
 "WS 75 THI": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/07/WS75THI.png"
 ],
 "WS 65/75 AS": [
  "https://ponzioaluminium.com/wp-content/uploads/2019/08/3D_DISEGNO-centrale.png"
 ],
 "WS 65/75 AD": [
  "https://ponzioaluminium.com/wp-content/uploads/2019/09/3D_DISEGNO-centrale.png"
 ],
 "WS 65/75 FL": [
  "https://ponzioaluminium.com/wp-content/uploads/2019/09/3D_DISEGNO-centrale-1.png"
 ],
 "WS 65/75 IL": [
  "https://ponzioaluminium.com/wp-content/uploads/2021/06/WS75IL_3D_DISEGNO-centrale-2.png"
 ],
 "NT 50": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/01/nt-50.png"
 ],
 "NT 52 TT": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/01/NT-52tt.png"
 ],
 "NT 60 F": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/01/nt60f.png"
 ],
 "NT 60 TT": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/01/NT-60tt.png"
 ],
 "NT 65 TT": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/01/NT-65tt.png"
 ],
 "SL600 Evo Freddo": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/05/SL600evoFREDDO.png"
 ],
 "SL600 TT Evo": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/05/SL600TTEVO-90gradi.png"
 ],
 "SL600 TT Evozero": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/05/SL600EVOZERO.png"
 ],
 "SL1300 TT": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/05/SL1300TT_nodo.png"
 ],
 "SL1600 TT": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/05/SL-1600TT.png"
 ],
 "WS 45 (cửa đi)": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/04/PortaWS45.png"
 ],
 "WS 45 TT (cửa đi)": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/04/porta-WS45TT.png"
 ],
 "WS 60 (cửa đi)": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/04/ws60doors.png"
 ],
 "NT 50 (cửa đi)": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/03/porta-nt-50.png"
 ],
 "NT 52 TT (cửa đi)": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/04/porta-nt-52tt.png"
 ],
 "NT 60 TT (cửa đi)": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/04/porta-NT60tt.png"
 ],
 "NT 65 TT (cửa đi)": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/04/porta-nt-65-tt.png"
 ],
 "NT 65 TT Panic (SAC 1)": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/04/PORTA-NT-65-con-soglia.png"
 ],
 "WS 55 TT (cửa đi)": [
  "https://ponzioaluminium.com/wp-content/uploads/2018/03/WS55TT.png"
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
  for (const [ma, urls] of Object.entries(PONZIO)) {
    const r = arr.find((x) => x.hang === "ponzio" && x.ma === ma);
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
      const ten = `ponzio-${slug(ma)}-g${kq.length + 1}.webp`;
      await sharp(buf).resize({ width: 700, withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 90 }).toFile("public/images/he-cua/mau-goc/" + ten);
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
  console.log("Đã gán ảnh cho", n, "hệ Ponzio");
})();
