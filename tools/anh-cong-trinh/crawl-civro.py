import re, html, json, urllib.request, urllib.parse
from concurrent.futures import ThreadPoolExecutor

H = {"User-Agent": "Mozilla/5.0"}
slugs = """erya-villa tianan-villa zhongjiandaguan-residence xiangxieyipin-residence xiangshuwan-villa whale-hill-villa no-1-jiangshan-residence rose-garden-villa sanqing-moutain-villa shangri-la-villa tea-hill-house delong-villa central-apartments 10-nguyen-tuyen fuchun-river-flat gong-residence jade-bay-residence wuxi-villa hawaii-1039 vietnam-chuong-my dianchi-villa yinhaichangyuan ban-villa sharjah-tamm-cafe oriental-electric-heating-building the-six-season-vacation-manor""".split()

def get(s):
    u = f"https://www.civro.com/case/{s}/"
    try:
        t = urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30).read().decode("utf-8", "ignore")
    except Exception as e:
        return {"slug": s, "err": str(e)}
    title = html.unescape(re.sub(r"\s+", " ", (re.search(r"<title>(.*?)</title>", t, re.S) or [None, ""])[1]))[:90]
    og = (re.search(r'property="og:image" content="([^"]+)"', t) or [None, ""])[1]
    body = re.sub(r"<script.*?</script>|<style.*?</style>", " ", t, flags=re.S)
    txt = html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", body)))
    codes = sorted(set(re.findall(r"\b(?:XW|XD|MW|MD|PW|PD|ND|NW|AD|AW|XWS|UD|XVE|ACW|AWG|NWG|XD\d+LS)\s?-?\d{2,3}[A-Z_]*\b", txt)))
    imgs = []
    for m in re.findall(r'(?:data-src|data-lg-src|href|src)="((?:https?:)?//www\.civro\.com/wp-content/uploads/[^"]+\.(?:jpg|jpeg|png|webp))"', t):
        m = ("https:" + m) if m.startswith("//") else m
        if re.search(r"-\d+x\d+\.", m):  # bản thu nhỏ
            continue
        if m not in imgs:
            imgs.append(m)
    i = txt.find("Project")
    return {"slug": s, "title": title, "og": og, "codes": codes, "n": len(imgs), "imgs": imgs[:12], "snip": txt[txt.find("Location"):txt.find("Location") + 260] if "Location" in txt else ""}

with ThreadPoolExecutor(6) as ex:
    out = list(ex.map(get, slugs))
json.dump(out, open("civro-cases.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for o in out:
    print(o.get("slug"), "|", o.get("title", o.get("err"))[:50], "|", o.get("codes"), "|", o.get("n"))
