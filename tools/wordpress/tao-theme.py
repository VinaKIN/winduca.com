"""Dựng theme WordPress `winduca` từ bản build tĩnh của site Next.js (dist/winduca-hosting).

Dùng lại CSS đã biên dịch (Tailwind), phông và ảnh; chuyển HTML dựng sẵn của từng trang thành mẫu PHP.
Chạy:  python tools/wordpress/tao-theme.py "C:\\Users\\OS\\Local Sites\\winduca\\app\\public\\wp-content\\themes\\winduca"
Trước đó phải có dist/winduca-hosting (npm run dong-goi -- --url https://winduca.com).
"""
import os, re, shutil, sys

GOC = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
NGUON = os.path.join(GOC, "dist", "winduca-hosting")
DICH = sys.argv[1]
MAU = os.path.join(GOC, "tools", "wordpress", "mau")  # tệp PHP/JS viết tay
URI = "<?php echo esc_url(get_template_directory_uri()); ?>"
HOME = "<?php echo esc_url(home_url('/')); ?>"


def doc(p):
    return open(p, encoding="utf-8").read()


def ghi(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, "w", encoding="utf-8", newline="\n").write(s)


def conv(h):
    """HTML dựng sẵn của Next.js -> đoạn PHP dùng được trong WordPress."""
    h = re.sub(r"<!--.*?-->", "", h, flags=re.S)
    h = re.sub(r'\sdata-nimg="[^"]*"', "", h)
    # đường dẫn ảnh/thương hiệu -> thư mục theme
    h = re.sub(r'(src|href)="/(images|brand)/', lambda m: f'{m.group(1)}="{URI}/assets/{m.group(2)}/', h)
    h = re.sub(r"url\((&quot;|['\"]?)/(images|brand)/", lambda m: f"url({m.group(1)}{URI}/assets/{m.group(2)}/", h)
    # liên kết nội bộ
    def lk(m):
        d = m.group(1)
        if d.startswith("_next") or d.startswith("images/") or d.startswith("brand/"):
            return m.group(0)
        return f'href="<?php echo esc_url(home_url(\'/{d}\')); ?>"'
    h = re.sub(r'href="/([^"]*)"', lk, h)
    return h


def main_cua(trang):
    s = doc(os.path.join(NGUON, trang, "index.html") if trang else os.path.join(NGUON, "index.html"))
    m = re.search(r"<main.*?</main>", s, flags=re.S).group(0)
    return conv(m), s


# --- tài sản tĩnh ---
for ten, dich in (("images", "assets/images"), ("brand", "assets/brand")):
    d = os.path.join(DICH, dich)
    if os.path.isdir(d):
        shutil.rmtree(d)
    shutil.copytree(os.path.join(NGUON, ten), d)
os.makedirs(os.path.join(DICH, "assets", "css"), exist_ok=True)
os.makedirs(os.path.join(DICH, "assets", "media"), exist_ok=True)
for f in os.listdir(os.path.join(NGUON, "_next", "static", "media")):
    shutil.copy(os.path.join(NGUON, "_next", "static", "media", f), os.path.join(DICH, "assets", "media", f))
css = ""
for f in sorted(os.listdir(os.path.join(NGUON, "_next", "static", "chunks"))):
    if f.endswith(".css"):
        css += doc(os.path.join(NGUON, "_next", "static", "chunks", f)) + "\n"
ghi(os.path.join(DICH, "assets", "css", "app.css"), css)
shutil.copy(os.path.join(NGUON, "favicon.ico"), os.path.join(DICH, "favicon.ico")) if os.path.exists(os.path.join(NGUON, "favicon.ico")) else None

# --- chân trang (lấy từ trang Tin tức) ---
_, tin = main_cua("tin-tuc")
foot = re.search(r"<footer.*?</footer>", tin, flags=re.S).group(0)
ghi(os.path.join(DICH, "footer.php"), conv(foot) + "\n" + doc(os.path.join(MAU, "footer-duoi.php")))

# --- trang chủ ---
mc, _ = main_cua("")
ghi(os.path.join(DICH, "front-page.php"), "<?php get_header(); ?>\n" + mc + "\n<?php get_footer(); ?>\n")

# --- tệp viết tay ---
for f in os.listdir(MAU):
    if f in ("footer-duoi.php",):
        continue
    src = os.path.join(MAU, f)
    if os.path.isfile(src):
        shutil.copy(src, os.path.join(DICH, f))
    else:
        shutil.copytree(src, os.path.join(DICH, f), dirs_exist_ok=True)
print("Đã dựng theme tại", DICH)
