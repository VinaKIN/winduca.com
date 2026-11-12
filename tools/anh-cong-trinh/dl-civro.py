import json, os, urllib.request, urllib.parse, io
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

H = {"User-Agent": "Mozilla/5.0"}
cases = json.load(open("civro-cases.json", encoding="utf-8"))
os.makedirs("civro", exist_ok=True)

def q(u):
    return urllib.parse.quote(u, safe=":/%?=&+")

def lay(u):
    try:
        return urllib.request.urlopen(urllib.request.Request(q(u), headers=H), timeout=60).read()
    except Exception:
        return None

def xuly(c):
    cand = [c["og"]] if c.get("og") else []
    cand += [u for u in c.get("imgs", []) if u not in cand]
    ok = []
    for u in cand[:10]:
        d = lay(u)
        if not d or len(d) < 70000:
            continue
        try:
            im = Image.open(io.BytesIO(d))
            w, h = im.size
        except Exception:
            continue
        if w < 900 or h < 500:
            continue
        ok.append((u, d, w * h, u == c.get("og")))
    ok.sort(key=lambda x: (not x[3], -x[2]))
    kq = []
    for i, (u, d, _, _) in enumerate(ok[:3]):
        out = f"civro/{c['slug']}-{i + 1}.bin"
        open(out, "wb").write(d)
        kq.append({"tep": out, "url": u})
    return c["slug"], kq

with ThreadPoolExecutor(6) as ex:
    res = dict(ex.map(xuly, cases))
json.dump(res, open("civro-chon.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(sum(len(v) for v in res.values()), "ảnh;", sum(1 for v in res.values() if v), "/", len(res), "case có ảnh")
