import json, os, io
from PIL import Image

PJ = r"C:\Users\OS\AppData\Local\Temp\claude\02adf92ca638e211\7e41c11d-5e45-4f58-996e-41dd1edfc4db\scratchpad\pj"
GOC = r"D:\3 Cowork Demo\winduca.com"
os.chdir(PJ)
OUT = GOC + r"\public\images\he-cua\cong-trinh"
os.makedirs(OUT, exist_ok=True)

du_lieu = json.load(open("civro-du-lieu.json", encoding="utf-8"))

def luu(nguon, ten):
    im = Image.open(nguon).convert("RGB")
    if im.width > 1400:
        im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, ten), "WEBP", quality=74)
    return "/images/he-cua/cong-trinh/" + ten

DRIVE = "https://drive.google.com/drive/folders/"
ROM = {
    "vanda": ("rom/vanda-villa-nam-viet-a-01.jpg", "Vanda Villa Nam Việt Á · Riverside", "1ArYkk88boOs6dByjQlcW1XMN6MYyYy20"),
    "dpp1": ("rom/dong-phuong-plus-01.jpg", "Fideco Villa, Thảo Điền (Đông Phương Plus)", "1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH"),
    "dpp4": ("rom/dong-phuong-plus-04.jpg", "Fideco Villa, Thảo Điền (Đông Phương Plus)", "1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH"),
    "vml3": ("rom/viet-minh-long-03.jpg", "Công trình Việt Minh Long", "12LvvCa0hOOmDgSKT4rFSJ4kJFqBdWyCz"),
    "vml5": ("rom/viet-minh-long-05.jpg", "Công trình Việt Minh Long", "12LvvCa0hOOmDgSKT4rFSJ4kJFqBdWyCz"),
}
rom = {}
for k, (f, ct, fid) in ROM.items():
    rom[k] = {"src": luu(f, f"romadio-{k}.webp"), "chuThich": ct, "nguon": DRIVE + fid, "tenNguon": "Thư viện dự án Romadio"}
POOL = {
    "w": ["dpp1", "dpp4", "vml3"],
    "d": ["vanda", "vml5", "dpp4"],
    "s": ["dpp4", "vanda", "vml3"],
    "l": ["dpp4", "vanda", "dpp1"],
    "f": ["vanda", "dpp4", "vml3"],
    "v": ["dpp1", "dpp4", "vanda"],
}
for he, ks in POOL.items():
    du_lieu[f"romadio:{he}"] = [rom[k] for k in ks]

PZ = {
    "pz1": ("ponzio/01.bin", "Cửa trượt SL1600 TT trong không gian ở", "SL1600 TT"),
    "pz2": ("ponzio/02.bin", "Cửa trượt SL1300 TT, vách kính khung ẩn", "SL1300 TT"),
    "pz3": ("ponzio/03.bin", "Cửa trượt SL1300 TT, mặt kính lớn nhìn ra hồ bơi", "SL1300 TT"),
}
pz = {}
for k, (f, ct, ma) in PZ.items():
    pz[k] = {"src": luu(f, f"ponzio-{k}.webp"), "chuThich": ct, "nguon": "https://ponzioaluminium.com/en/sliding-windows/", "tenNguon": "ponzioaluminium.com", "dungMa": ma}
du_lieu["ponzio:SL1600 TT"] = [pz["pz1"]]
du_lieu["ponzio:SL1300 TT"] = [pz["pz2"], pz["pz3"]]
gen = [{**pz[k], "dungMa": None} for k in ("pz3", "pz2", "pz1")]
for he in ("s", "l"):
    du_lieu[f"ponzio:{he}"] = [{k: v for k, v in x.items() if k != "dungMa"} for x in gen]

# ---- ghi tệp TypeScript ----
dong = []
for khoa in sorted(du_lieu):
    ds = du_lieu[khoa]
    muc = []
    for x in ds:
        t = f'{{ src: {json.dumps(x["src"])}, chuThich: {json.dumps(x["chuThich"], ensure_ascii=False)}, nguon: {json.dumps(x["nguon"])}, tenNguon: {json.dumps(x["tenNguon"], ensure_ascii=False)}'
        if x.get("dungMa"):
            t += f', dungMa: {json.dumps(x["dungMa"], ensure_ascii=False)}'
        t += " }"
        muc.append("    " + t + ",")
    dong.append(f"  {json.dumps(khoa, ensure_ascii=False)}: [\n" + "\n".join(muc) + "\n  ],")

p = GOC + r"\src\lib\he-cua-cong-trinh.ts"
s = open(p, encoding="utf-8").read().replace("\r\n", "\n")
a = s.index("export const ANH_CONG_TRINH")
b = s.index("export function anhCongTrinh")
s = s[:a] + "export const ANH_CONG_TRINH: Record<string, AnhCongTrinh[]> = {\n" + "\n".join(dong) + "\n};\n\n" + s[b:]
open(p, "w", encoding="utf-8", newline="\r\n").write(s)
print("khoa:", len(du_lieu), "tep:", len(os.listdir(OUT)))
