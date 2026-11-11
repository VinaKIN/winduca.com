/**
 * Chuẩn hóa kích thước ảnh mẫu góc để các thẻ trên trang /he-cua có sản phẩm to bằng nhau (11/11/2026).
 * Chạy từ GỐC repo, SAU các script them-anh-*.cjs:   node docs/ban-giao-he-cua/cong-cu/chuan-hoa-anh.cjs
 *
 * Việc làm với mỗi ảnh WebP trong public/images/he-cua/mau-goc/ có nền trong suốt thật sự:
 *   1) cắt sát phần sản phẩm (vùng có alpha > 12; nền bán trong suốt thì > 200),
 *   2) thu/phóng vừa khung vuông, chừa lề đều 6% mỗi cạnh, đặt giữa,
 *   3) ghi đè lại (Romadio 1200 px; Civro, Ponzio 640 px vì ảnh gốc chỉ ~500 px).
 * Bỏ qua: ảnh hoàn toàn đục (ảnh phối cảnh, FineLine...), và tệp có hậu tố -p<số> (ảnh chụp, hiển thị kiểu phủ kín).
 * Chạy lại nhiều lần vẫn cho kết quả như nhau.
 */
const fs = require("fs");
const sharp = require("sharp");

const THU_MUC = "public/images/he-cua/mau-goc/";
const LE = 0.06;

async function hopSanPham(buf, nguong) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * c + (c - 1)] > nguong) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  return x1 < 0 ? null : { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

(async () => {
  let n = 0;
  let boQua = 0;
  for (const ten of fs.readdirSync(THU_MUC).sort()) {
    if (!ten.endsWith(".webp") || /-p\d\.webp$/.test(ten)) continue;
    const duong = THU_MUC + ten;
    const buf = fs.readFileSync(duong);
    const m = await sharp(buf).metadata();
    const st = await sharp(buf).stats();
    const alphaMin = m.hasAlpha ? st.channels[st.channels.length - 1].min : 255;
    if (!m.hasAlpha || alphaMin >= 250) {
      boQua++;
      console.log("bỏ qua (không nền trong suốt):", ten);
      continue;
    }
    const hop = await hopSanPham(buf, alphaMin > 20 ? 200 : 12); // nền bán trong suốt: chỉ tính phần sản phẩm đặc
    if (!hop) continue;
    const K = m.width >= 1000 ? 1200 : 640;
    const ben = Math.round(K * (1 - 2 * LE));
    const sp = await sharp(buf).extract(hop).resize({ width: ben, height: ben, fit: "inside" }).toBuffer();
    const out = await sharp({ create: { width: K, height: K, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: sp, gravity: "center" }])
      .webp({ quality: 82, alphaQuality: 90 })
      .toBuffer();
    fs.writeFileSync(duong, out);
    n++;
  }
  console.log("Đã chuẩn hóa", n, "ảnh; bỏ qua", boQua);
})();
