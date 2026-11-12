/**
 * Bổ sung tag chức năng suy ra từ số liệu hãng (11/11/2026). Chạy từ GỐC repo, sau gen3 và các script them-anh-*:
 *   node tools/bo-sung-tag.cjs
 * Quy tắc (đã đối chiếu với các hệ có sẵn tag từ trang gốc, không ghi đè tag có sẵn, chỉ thêm):
 *   cn  Cách nhiệt cao : U số cụ thể (không có dấu ≥) và số đầu tiên ≤ 1.4 W/m²K.
 *   an  An ninh cao    : chongTrom có cấp RC2 trở lên và KHÔNG ghi "(phụ kiện)" (cấp RC do riêng phụ kiện thì không tính);
 *                        bản "kèm phụ kiện chống đột nhập" vẫn tính (khớp WS 65 THI, SL1300 TT).
 *   sm  Thông minh     : ghiChu nói rõ vận hành bằng động cơ.
 *   de  Dễ tiếp cận    : KHÔNG suy ra được (không có số liệu ngưỡng), chỉ giữ tag từ nguồn.
 * Hệ thiếu số liệu thì để trống, không đoán.
 */
const fs = require("fs");
const P = "src/lib/he-cua-du-lieu.ts";
const s = fs.readFileSync(P, "utf8");
const a = s.indexOf("[", s.indexOf("HE_CUA_DS: HeCua[]") + 18);
const b = s.lastIndexOf("]");
const arr = JSON.parse(s.slice(a, b + 1));
const soDau = (x) => { const m = /(\d+)[.,](\d+)/.exec(x || ""); return m ? Number(m[1] + "." + m[2]) : null; };
const them = { cn: [], an: [], sm: [] };
for (const r of arr) {
  const t = new Set(r.tags);
  const u = soDau(r.u);
  if (u !== null && !/≥/.test(r.u) && u <= 1.4) t.add("cn");
  if (/RC[234]/.test(r.chongTrom) && !/\(phụ kiện\)/.test(r.chongTrom)) t.add("an");
  if (/động cơ/i.test(r.ghiChu)) t.add("sm");
  const moi = ["cn", "an", "de", "sm"].filter((k) => t.has(k));
  for (const k of moi) if (!r.tags.includes(k) && them[k]) them[k].push(r.ma);
  r.tags = moi;
}
fs.writeFileSync(P, s.slice(0, a) + JSON.stringify(arr, null, 1) + s.slice(b + 1));
console.log("Đã thêm:", Object.fromEntries(Object.entries(them).map(([k, v]) => [k, v.join("; ") || "-"])));
