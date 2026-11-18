"""Chuyển <main> của các trang tĩnh (dist/winduca-hosting) thành nội dung UX Builder cho theme con Flatsome.
Chạy: python tao-trang.py <thư mục dist> <thư mục theme>"""
import json, os, re, sys, shutil
from html.parser import HTMLParser

DIST, THEME = sys.argv[1], sys.argv[2]
PUBLIC = os.path.join(os.path.dirname(os.path.dirname(DIST)), "public")
TRANG = ["gioi-thieu", "giai-phap", "cong-trinh", "hop-tac", "lien-he", "trai-nghiem", "danh-cho-kts", "nang-luc-xuong",
         "chinh-sach", "chinh-sach-bao-mat", "chinh-sach-bao-hanh", "chinh-sach-doi-tac", "chinh-sach-cookie", "dieu-khoan-su-dung"]
CHO_PHEP = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "li", "a", "strong", "b", "em", "i", "br", "img", "table", "thead", "tbody",
            "tr", "th", "td", "dl", "dt", "dd", "blockquote", "figure", "figcaption"}
BO_QUA = {"svg", "script", "style", "button", "form", "input", "select", "textarea", "nav", "iframe", "noscript", "template", "canvas", "video", "label"}
TU_DONG = {"br", "img"}
NOI_TUYEN = {"p", "li", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "a", "strong", "b", "em", "i", "dt", "dd", "figcaption", "blockquote"}
anh_dung = set()


def doi_anh(src):
    m = re.match(r"^/images/(.+)$", src or "")
    if not m:
        return None
    anh_dung.add(m.group(1))
    return "{{ANH:" + m.group(1) + "}}"


class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.skip = 0
        self.stack = []  # (tag, bo_qua)
        self.anh_nen = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        bo = tag in BO_QUA or a.get("aria-hidden") == "true" or "hidden" in (a.get("class") or "").split()
        if tag in TU_DONG:
            if self.skip == 0 and tag == "img" and a.get("aria-hidden") != "true":
                s = doi_anh(a.get("src"))
                if s:
                    self.out.append('<img src="%s" alt="%s"/>' % (s, (a.get("alt") or "").replace('"', "&quot;")))
            elif self.skip == 0 and tag == "br":
                self.out.append("<br/>")
            elif tag == "img" and self.anh_nen is None and a.get("aria-hidden") == "true":
                self.anh_nen = doi_anh(a.get("src"))
            return
        self.stack.append((tag, bo))
        if bo:
            self.skip += 1
            if tag == "div" or tag == "span":
                pass
            return
        if self.skip:
            return
        if tag not in CHO_PHEP:
            self.out.append(" ")
        if tag in CHO_PHEP:
            if tag == "a":
                h = a.get("href") or "#"
                self.out.append('<a href="%s">' % h.replace('"', "&quot;"))
            else:
                self.out.append("<%s>" % tag)

    def handle_endtag(self, tag):
        if tag in TU_DONG:
            return
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                t, bo = self.stack.pop(i)
                if bo:
                    self.skip -= 1
                elif self.skip == 0 and tag in CHO_PHEP:
                    self.out.append("</%s>" % tag)
                elif self.skip == 0:
                    self.out.append(" ")
                break

    def handle_data(self, d):
        if self.skip or not d.strip():
            if not self.skip and d and self.out and not self.out[-1].endswith(" "):
                self.out.append(" ")
            return
        trong = any(t in NOI_TUYEN for t, _ in self.stack)
        d = re.sub(r"\s+", " ", d).replace("&", "&amp;").replace("<", "&lt;")
        self.out.append(d if trong else "<p>%s</p>" % d.strip())


def lam_sach(h):
    h = "".join(h)
    h = re.sub(r"<(\w+)>\s*</\1>", "", h)
    h = re.sub(r"<(\w+)>\s*</\1>", "", h)
    h = re.sub(r"(<br/>\s*){2,}", "<br/>", h)
    h = re.sub(r"\n{3,}", "\n\n", h)
    h = re.sub(r"(</(?:p|h[1-6]|li|ul|ol|table|tr|figure|dl)>)", r"\1\n", h)
    return h.strip()


def chuyen_section(s, dau):
    p = P()
    p.feed(s)
    noi = lam_sach(p.out)
    if not noi:
        return ""
    # nhãn nhỏ đứng trước tiêu đề -> span nhãn
    noi = re.sub(r"<p>([^<]{2,40})</p>\s*(<h[12]>)", lambda m: '<span class="wd-nhan">' + m.group(1) + '</span>' + m.group(2), noi)
    if dau:
        bg = p.anh_nen or ""
        # hero: banner nền tối, chữ trái
        return ('[ux_banner height="420px" height__sm="360px" bg="%s" bg_overlay="rgba(35,31,32,0.62)" class="wd-hero"]\n'
                '[text_box text_align="left" position_x="5" position_y="50" width="70" width__sm="100"]\n%s\n[/text_box]\n[/ux_banner]\n') % (bg, noi)
    return '[section padding="60px"]\n[row]\n[col span="12"]\n%s\n[/col]\n[/row]\n[/section]\n' % noi


ds = []
for slug in TRANG:
    f = os.path.join(DIST, slug, "index.html")
    if not os.path.isfile(f):
        print("THIẾU", slug)
        continue
    s = open(f, encoding="utf8").read()
    tt = re.search(r"<title>(.*?)</title>", s, re.S)
    tieu_de = re.sub(r"\s*\|\s*WINDUCA\s*$", "", tt.group(1)).strip() if tt else slug
    m = re.search(r"<main[^>]*>(.*)</main>", s, re.S).group(1)
    phan = re.split(r"(?=<section[\s>])", m)
    phan = [x for x in phan if x.strip().startswith("<section")]
    kq = []
    for i, x in enumerate(phan):
        c = chuyen_section(x, i == 0 and "hero" in x[:200])
        if c:
            kq.append(c)
    nd = "\n".join(kq)
    nd = nd.replace("&amp;amp;", "&amp;")
    os.makedirs(os.path.join(THEME, "du-lieu", "trang"), exist_ok=True)
    open(os.path.join(THEME, "du-lieu", "trang", slug + ".txt"), "w", encoding="utf8", newline="\n").write(nd)
    ds.append({"slug": slug, "tieuDe": tieu_de})
    print(slug, len(nd))

json.dump(ds, open(os.path.join(THEME, "du-lieu", "trang", "_danh-sach.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
# chép ảnh được dùng
n = 0
for a in sorted(anh_dung):
    src = os.path.join(PUBLIC, "images", a)
    dst = os.path.join(THEME, "assets", "images", a)
    if os.path.isfile(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        if not os.path.isfile(dst):
            shutil.copy(src, dst)
        n += 1
    else:
        print("không thấy ảnh", a)
print("ảnh dùng:", len(anh_dung), "đã chép:", n)
