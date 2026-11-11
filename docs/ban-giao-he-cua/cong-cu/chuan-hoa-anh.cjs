/**
 * Chuẩn hóa kích thước ảnh mẫu góc để các thẻ trên trang /he-cua có sản phẩm to bằng nhau (11/11/2026).
 * Chạy từ GỐC repo, SAU các script them-anh-*.cjs (chạy lại các script đó trước khi chuẩn hóa lại, để không làm mờ dần):
 *   node docs/ban-giao-he-cua/cong-cu/chuan-hoa-anh.cjs
 *
 * Với mỗi ảnh WebP trong public/images/he-cua/mau-goc/ có nền trong suốt:
 *   1) đo "khối lượng" sản phẩm M = số điểm ảnh đặc (alpha > 12; nền bán trong suốt thì > 200) và hộp bao sát sản phẩm,
 *   2) phóng/thu sao cho sqrt(M) bằng nhau ở mọi ảnh (cùng "diện tích nhìn thấy", nên mẫu mảnh nghiêng không bị nhỏ hơn mẫu vuông),
 *   3) nhưng không để hộp bao vượt 94% khung, đặt giữa trên khung W x H (tỉ lệ 1 : 0,9, khớp "sân khấu" của thẻ).
 * Khung: Romadio 1200x1080; Civro, Ponzio 640x576 (ảnh gốc chỉ ~500 px).
 * Bỏ qua: ảnh hoàn toàn đục, và tệp có hậu tố -p<số> (ảnh chụp, hiển thị kiểu phủ kín).
 */
const fs = require("fs");
const sharp = require("sharp");

const THU_MUC = "public/images/he-cua/mau-goc/";
const MUC_TIEU = 0.52; // sqrt(M) sau chuẩn hóa = 52% chiều cao khung
const TRAN = 0.94;

async function doSanPham(buf, nguong) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  let x0 = w, y0 = h, x1 = -1, y1 = -1, M = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * c + (c - 1)] > nguong) {
        M++;
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  return x1 < 0 ? null : { hop: { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }, M };
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
    const kq = await doSanPham(buf, alphaMin > 20 ? 200 : 12);
    if (!kq) continue;
    const W = m.width >= 1000 ? 1200 : 640;
    const H = Math.round(W * 0.9);
    let he = (MUC_TIEU * H) / Math.sqrt(kq.M);
    let nw = kq.hop.width * he;
    let nh = kq.hop.height * he;
    const f = Math.min(1, (TRAN * W) / nw, (TRAN * H) / nh);
    nw = Math.max(1, Math.round(nw * f));
    nh = Math.max(1, Math.round(nh * f));
    const sp = await sharp(buf).extract(kq.hop).resize({ width: nw, height: nh, fit: "fill", kernel: "lanczos3" }).toBuffer();
    const out = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: sp, left: Math.round((W - nw) / 2), top: Math.round((H - nh) / 2) }])
      .webp({ quality: 82, alphaQuality: 90 })
      .toBuffer();
    fs.writeFileSync(duong, out);
    n++;
  }
  console.log("Đã chuẩn hóa", n, "ảnh; bỏ qua", boQua);
})();
