/**
 * Tách nền bản vẽ 2D (12/11/2026). Chạy từ GỐC repo, SAU khi đã có ảnh bản vẽ trong public/images/he-cua/ban-ve/:
 *   node tools/tach-nen-ban-ve.cjs
 *
 * Bản vẽ gốc là ảnh RGB nền xám nhạt, nét đen. Với mỗi ảnh:
 *   1) ước lượng độ sáng nền từ viền ảnh (trung vị),
 *   2) alpha = độ tối so với nền (nét đậm thì đặc, nền và vùng tô trắng thì trong suốt),
 *   3) tô màu nét thành xám lam sáng (#e6ebf4) để hiện trên nền tối kiểu blueprint,
 *   4) cắt sát nét vẽ (chừa viền 4%) và phóng lên tối thiểu 1100 px cạnh dài (lanczos).
 * Ảnh đã có kênh alpha (đã xử lý) thì bỏ qua, nên chạy lại không làm hỏng.
 * Hiển thị trên nền sáng (thẻ): dùng bộ lọc CSS invert để nét sáng thành nét tối.
 */
const fs = require("fs");
const sharp = require("sharp");

const THU_MUC = "public/images/he-cua/ban-ve/";
const MAU = [230, 235, 244];

(async () => {
  let xong = 0;
  let boQua = 0;
  for (const ten of fs.readdirSync(THU_MUC).sort()) {
    if (!ten.endsWith(".webp")) continue;
    const duong = THU_MUC + ten;
    const buf = fs.readFileSync(duong);
    const meta = await sharp(buf).metadata();
    if (meta.hasAlpha) {
      boQua++;
      continue;
    }
    const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = info;
    const lum = (i) => 0.299 * data[i * 3] + 0.587 * data[i * 3 + 1] + 0.114 * data[i * 3 + 2];

    // độ sáng nền: trung vị các điểm ở viền
    const vien = [];
    for (let x = 0; x < w; x++) {
      vien.push(lum(x), lum((h - 1) * w + x));
    }
    for (let y = 0; y < h; y++) {
      vien.push(lum(y * w), lum(y * w + w - 1));
    }
    vien.sort((a, b) => a - b);
    const nen = vien[Math.floor(vien.length / 2)];

    const out = Buffer.alloc(w * h * 4);
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let i = 0; i < w * h; i++) {
      const l = lum(i);
      let a = (nen - l) / Math.max(1, nen - 30);
      a = a <= 0.06 ? 0 : Math.min(1, a * 1.15);
      out[i * 4] = MAU[0];
      out[i * 4 + 1] = MAU[1];
      out[i * 4 + 2] = MAU[2];
      out[i * 4 + 3] = Math.round(a * 255);
      if (a > 0.25) {
        const x = i % w, y = (i / w) | 0;
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
    if (x1 < 0) {
      boQua++;
      console.log("không thấy nét:", ten);
      continue;
    }
    const px = Math.round((x1 - x0 + 1) * 0.04) + 2;
    const py = Math.round((y1 - y0 + 1) * 0.04) + 2;
    const hop = { left: Math.max(0, x0 - px), top: Math.max(0, y0 - py) };
    hop.width = Math.min(w - hop.left, x1 - x0 + 1 + 2 * px);
    hop.height = Math.min(h - hop.top, y1 - y0 + 1 + 2 * py);
    let ps = sharp(out, { raw: { width: w, height: h, channels: 4 } }).extract(hop);
    const canhDai = Math.max(hop.width, hop.height);
    if (canhDai < 1100) ps = ps.resize({ width: Math.round(hop.width * (1100 / canhDai)), height: Math.round(hop.height * (1100 / canhDai)), kernel: "lanczos3" });
    await ps.webp({ quality: 88, alphaQuality: 92 }).toFile(duong + ".tmp");
    fs.renameSync(duong + ".tmp", duong);
    xong++;
  }
  console.log("Đã tách nền", xong, "bản vẽ; bỏ qua", boQua);
})();
