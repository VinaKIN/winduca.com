import json, os, re, hashlib, io, collections
from PIL import Image

PJ = r"C:\Users\OS\AppData\Local\Temp\claude\02adf92ca638e211\7e41c11d-5e45-4f58-996e-41dd1edfc4db\scratchpad\pj"
GOC = r"D:\3 Cowork Demo\winduca.com"
os.chdir(PJ)
cases = {c["slug"]: c for c in json.load(open("civro-cases.json", encoding="utf-8"))}
chon = json.load(open("civro-chon.json", encoding="utf-8"))

# bỏ ảnh giữ chỗ (cùng một tệp lặp lại ở nhiều dự án)
dem = collections.Counter()
bam = {}
for s, v in chon.items():
    for x in v:
        h = hashlib.md5(open(x["tep"], "rb").read()).hexdigest()
        bam[x["tep"]] = h
        dem[h] += 1
tot = {}
for s, v in chon.items():
    ok = []
    for x in v:
        if dem[bam[x["tep"]]] >= 3:
            continue
        im = Image.open(x["tep"])
        w, h = im.size
        if w < h * 1.1:  # ảnh dọc
            continue
        ok.append({**x, "w": w, "h": h})
    if ok:
        tot[s] = ok

# dữ liệu hệ cửa
src = open(GOC + r"\src\lib\he-cua-du-lieu.ts", encoding="utf-8").read()
a = src.index("[", src.index("HE_CUA_DS: HeCua[]") + 18)
arr = json.loads(src[a:src.rindex("]") + 1])
civro = [r for r in arr if r["hang"] == "civro"]

def khop(r, c):
    toks = [t.split("_")[0] for t in re.findall(r"[A-Z]{2,3}\d{2,3}[A-Z]*(?:_[A-Z]+)?", r["ma"])]
    for cc in c["codes"]:
        k = cc.replace(" ", "").split("_")[0]
        if any(k.startswith(t) for t in toks):
            return True
    return False

TEN_DA = {}
for s, c in cases.items():
    TEN_DA[s] = re.sub(r"\s*[-|–]\s*CIVRO.*$", "", c["title"]).strip()

def lay_anh(slug, n=1):
    return [(slug, x) for x in tot.get(slug, [])[:n]]

ket_qua = {}   # ma hoặc he -> list (slug, x)
for r in civro:
    ms = [s for s, c in cases.items() if s in tot and khop(r, c)]
    ds = []
    for s in ms:
        ds += lay_anh(s, 1)
    ket_qua[r["ma"]] = ds[:3]
# dự phòng theo kiểu hệ
theo_he = collections.defaultdict(list)
for r in civro:
    for s, x in ket_qua[r["ma"]]:
        k = r["he"][0]
        if all(s != y[0] for y in theo_he[k]):
            theo_he[k].append((s, x))

out_dir = GOC + r"\public\images\he-cua\cong-trinh"
os.makedirs(out_dir, exist_ok=True)
da = {}
def luu(s, x):
    if s in da:
        return da[s]
    im = Image.open(x["tep"]).convert("RGB")
    if im.width > 1400:
        im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
    ten = f"civro-{s}.webp"
    im.save(os.path.join(out_dir, ten), "WEBP", quality=74)
    da[s] = "/images/he-cua/cong-trinh/" + ten
    return da[s]

du_lieu = {}
def muc(s, x, dung=None):
    d = {"src": luu(s, x), "chuThich": TEN_DA[s], "nguon": f"https://www.civro.com/case/{s}/", "tenNguon": "civro.com"}
    if dung:
        d["dungMa"] = dung
    return d

for r in civro:
    ds = ket_qua[r["ma"]]
    if ds:
        du_lieu[f"civro:{r['ma']}"] = [muc(s, x, r["ma"]) for s, x in ds]
for k, ds in theo_he.items():
    du_lieu[f"civro:{k}"] = [muc(s, x) for s, x in ds[:3]]
# kiểu hệ chưa có dự án riêng: dùng mẫu chung cho cửa sổ/cửa đi/trượt
chung = [(s, x) for s, v in tot.items() for x in v[:1]]
for k in "wdslfv":
    if f"civro:{k}" not in du_lieu:
        du_lieu[f"civro:{k}"] = [muc(s, x) for s, x in chung[:3]]

json.dump(du_lieu, open("civro-du-lieu.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("anh:", len(da), "he co du an rieng:", sum(1 for k in du_lieu if k.startswith("civro:") and len(k) > 7), "/", len(civro))
