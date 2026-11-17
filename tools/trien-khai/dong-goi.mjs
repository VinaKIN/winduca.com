// Đóng gói website WINDUCA thành thư mục TĨNH để đưa lên hosting dùng chung (cPanel/Apache) ở GỐC tên miền.
// Chạy từ gốc repo:  npm run dong-goi -- --url https://winduca.com [--lead https://...workers.dev] [--ga G-XXXX] [--indexable]
// Kết quả: dist/winduca-hosting/ (đưa nội dung thư mục này lên hosting) và dist/winduca-hosting.zip.
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, renameSync, rmSync, writeFileSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { platform } from "node:os";

const goc = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
process.chdir(goc);

const arg = (ten) => {
  const i = process.argv.indexOf(ten);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
const url = (arg("--url") ?? "").replace(/\/+$/, "");
if (!/^https:\/\/[a-z0-9.-]+$/i.test(url)) {
  console.error("Thiếu hoặc sai --url. Ví dụ: npm run dong-goi -- --url https://winduca.com");
  process.exit(1);
}
const lead = arg("--lead") ?? "";
const ga = arg("--ga") ?? "";
const choIndex = process.argv.includes("--indexable");

const api = join("src", "app", "api");
const tam = join("dist", "_api-tam");
let daGo = false;

function chay(lenh, args, env = {}) {
  const r = spawnSync(lenh, args, { stdio: "inherit", shell: platform() === "win32", env: { ...process.env, ...env } });
  if (r.status !== 0) throw new Error(`Lệnh lỗi: ${lenh} ${args.join(" ")}`);
}

try {
  mkdirSync("dist", { recursive: true });
  rmSync("out", { recursive: true, force: true });
  rmSync(".next", { recursive: true, force: true });
  rmSync(join("dist", "winduca-hosting"), { recursive: true, force: true });

  // Xuất bản tĩnh không hỗ trợ route handler: tạm gỡ src/app/api, luôn trả lại khi xong
  if (existsSync(api)) {
    rmSync(tam, { recursive: true, force: true });
    renameSync(api, tam);
    daGo = true;
  }

  console.log(`\n== Build tĩnh cho ${url} ==`);
  chay("npx", ["next", "build"], {
    STATIC_EXPORT: "true",
    NEXT_PUBLIC_SITE_URL: url,
    NEXT_PUBLIC_LEAD_ENDPOINT: lead,
    NEXT_PUBLIC_GA_ID: ga,
    NEXT_PUBLIC_INDEXABLE: choIndex ? "true" : "",
  });
} finally {
  if (daGo && existsSync(tam)) renameSync(tam, api);
}

if (!existsSync(join("out", "index.html"))) {
  console.error("Không thấy out/index.html. Build chưa thành công.");
  process.exit(1);
}

const dich = join("dist", "winduca-hosting");
cpSync("out", dich, { recursive: true });
if (!existsSync(join(dich, "404.html")) && existsSync(join(dich, "_not-found", "index.html"))) cpSync(join(dich, "_not-found", "index.html"), join(dich, "404.html"));
cpSync(join("tools", "trien-khai", "htaccess.txt"), join(dich, ".htaccess"));
writeFileSync(
  join(dich, "DOC-TRUOC.txt"),
  `Thư mục này là bản tĩnh của ${url}. Đưa TOÀN BỘ nội dung (kể cả tệp .htaccess ẩn) vào thư mục gốc của tên miền trên hosting.\nHướng dẫn: docs/HUONG-DAN-TRIEN-KHAI.md\nBiểu mẫu: ${lead ? "gửi tới " + lead : "chưa nối Worker, biểu mẫu mở thư mailto"}\nChỉ mục Google: ${choIndex ? "BẬT" : "TẮT (bản xem thử)"}\nBuild lúc: ${new Date().toISOString()}\n`,
);

// Kiểm tra nhanh: không còn đường dẫn của GitHub Pages
let loi = 0;
(function quet(d) {
  for (const f of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, f.name);
    if (f.isDirectory()) quet(p);
    else if (/\.(html|txt|xml|json)$/.test(f.name) && statSync(p).size < 3e6) {
      const t = readFileSync(p, "utf8");
      if (t.includes("vinakin.github.io") || t.includes('"/winduca.com/')) {
        console.warn("Còn đường dẫn GitHub Pages trong:", p);
        loi++;
      }
    }
  }
})(dich);
if (loi) console.warn(`Có ${loi} tệp còn đường dẫn cũ, kiểm tra biến NEXT_PUBLIC_SITE_URL.`);

// Nén
const zip = join("dist", "winduca-hosting.zip");
rmSync(zip, { force: true });
if (platform() === "win32") chay("tar", ["-a", "-c", "-f", zip, "-C", dich, "."]); // tar.exe có sẵn từ Windows 10, nén zip gồm cả tệp ẩn
else chay("sh", ["-c", `cd ${dich} && zip -qr ../winduca-hosting.zip . -x '.DS_Store'`]);
console.log(`\nXong: ${dich} và ${zip}`);
