// Tải ảnh các hệ Romadio từ winboss.biz vào một thư mục mới (anh Huy đã đồng ý sao ảnh, 11/11/2026).
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { basename } from "node:path";

const [, , json, thuMuc] = process.argv;
const { urls } = JSON.parse(readFileSync(json, "utf8"));
mkdirSync(thuMuc, { recursive: true });
let ok = 0;
let loi = 0;
let byte = 0;
const hang = [...urls];
async function chay() {
  while (hang.length) {
    const u = hang.shift();
    try {
      const r = await fetch("https://winboss.biz" + u);
      if (!r.ok) throw new Error(String(r.status));
      const b = Buffer.from(await r.arrayBuffer());
      writeFileSync(`${thuMuc}/${basename(u)}`, b);
      byte += b.length;
      ok++;
    } catch (e) {
      loi++;
      console.log("LOI", u, e.message);
    }
  }
}
await Promise.all(Array.from({ length: 6 }, chay));
console.log(JSON.stringify({ ok, loi, MB: Math.round((byte / 1048576) * 10) / 10 }));
