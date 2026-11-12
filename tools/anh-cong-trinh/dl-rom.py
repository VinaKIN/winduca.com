import os, io, json, urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageDraw

H = {"User-Agent": "Mozilla/5.0"}
DU_AN = {
    "vanda-villa-nam-viet-a": ("VANDA VILLA NAM VIỆT Á – RIVERSIDE", "1nr7O4_YiR8o80MIKndOMvsf4c9tuEj3V,1eIgtkMuiYmUQotc6jYl1SoFPZIS_ygeH,1nMjM72_vsQFt7Wj1J30EJLuCWk5efWnY,1XmH-FNOMKkMdLkN_eHMziO3jmEeZFnI8,1bRwjKbPBzhcBQL7qGTcKarboA797UudO,15nrRa9NIdKxMDY8wU0uRY_Wm4qWDeQ_m,1QzsgB8sOyllRR5VL5vbkNXs3ceP2xrpG,17p9rXZ-WrWGJC0hVuFHAHvuiZ9QPMOIV,1mNqhBklafdowzbkTuoOhZjziORwwb_6F"),
    "villa-waterpoint": ("Villa Waterpoint – Việt Minh Long", "1jBtgqzzIkznU8v_VLc5Rr9WkiY3-Y6ww,1MrsZot5tHYPTYEPjbKVOTBC-hKHQP3w4,15tslgKUq7PnaDFO9pOAuNGUVSXloN4cB,1NARccGkWkxXB-bIy1YW39aG8jz9ZM0c7,1gNe_mISpP1Zc5BbIvwl4Fv0o3mkRPLZs,1SfAyUPXzvafYO7Z7GVYyt5ST2LDSrzyJ,1sNmppJDhnTbAy9gPCIp26z2DcyLmAuCP,1NXdWVZBgvmZmQiMPbiAZzg16ftTHaAYI,19qyB9zVxh23ty9FR2eZZmrgrNSh_ZV3-,1tOF9UyoY1yf5rpat5TNL3dQyDdI6IwmE,13StjWKTjCIozOP1-zfyVx-2IMrwO23bQ,11p43sUe_ezdVYVSvxj3cC6vYzNWL1Rx7,19ARJ6v66IyYNNWfUjzqtpQG-PJ1wcwTm,1L0ojmhS4Ae6fcwsJpL1wdRBfL_yrEmGm"),
    "viet-minh-long": ("Việt Minh Long", "11bZF8yTyBRvVQwnU3YIbsqRO-oybUck5,1jqIXTx1cwCRnnj81dQD0A1Gn8lyLur_s,1MgMjMUjeAqCkxalj87fIwUUh1FNeYVET,1xDlDnV1pB0JTH8TfT1LHcx6XD-ExgFOF,1mGcz6ET84LqlY7pW6RorgBsrj7kAhECR"),
    "dong-phuong-plus": ("Đông Phương Plus", "1_cy7Gwc21OxcIUxy4bSq5Bgb3Inrt65U,1LEd_73YnHWziGIa1_2aMPnqaRG3L1l6R,1P6JuMAtKWt2lE1I-_NeIsvJLpLCMfTCn,1l6SQJqvo62bwgRM1WHECHidGTWStRTDf,1VcoqONaLSbzkIDi5Rh8EhwL61QenGk4P,1YzzBuzXgv12rLqcra8nbHZKLrcJ8pwpw"),
    "sunspace": ("Sunspace", "1cKgfVKZEfMrkl60sZI1Sx5vukH0_sOGt,111_ntDvDnwauWDWu-RD5pEu49gyGy7If,1E2eTNVIIlRg04qIP4dl1sF6RUAjM_8p8,1OrTLRmAvXqiMb00vH7NasDFmQjrZq1xE,1y0KyEJAyN6obD6IvJ1R1VZjN-dDsE3aY,1lqmCqskftHkwQFZPFk0KkEk4EtwBBSGB,1Wxt__bv1f_rAGvlsUWWCs9obINrADXHe,1_sflE3Yc6NIWo5JS0d0zrpU9jF2NZkOb,1aZQ_I0yPmGE8jg47xQxDFHfuY-rI6psJ,1j8rrdsBsgH2bYX0fOkXXBLzrkPsva07H"),
    "villa-binh-phuoc": ("Villa Bình Phước", "1Y-qbGPQFRT3NJsE8K-i5PS08A0uSaFey,177jOZ7GUBi--vFtFvfntgWHBF15WXH1v,1LSJKXtHmaAeLulYbMhnvPxOUQd9BjCfz,1tmgh0vTM6gEXfz4IeRSm5Ug1yJrLpU0D,16ERS776Ezn3JSOuSwYKyxoS1Ybyqbjf6,1f_NMsYd8t9JwueRLxedtHWn_-vFbVmnd,1oYSpMcGzOynzye_rBM51F5IXAT_Z_jqJ"),
}
os.makedirs("rom", exist_ok=True)
jobs = []
for slug, (ten, ids) in DU_AN.items():
    for i, fid in enumerate(ids.split(","), 1):
        jobs.append((slug, i, fid))

def tai(j):
    slug, i, fid = j
    out = f"rom/{slug}-{i:02d}.jpg"
    if os.path.exists(out) and os.path.getsize(out) > 20000:
        return out, fid
    try:
        d = urllib.request.urlopen(urllib.request.Request(f"https://drive.google.com/thumbnail?id={fid}&sz=w1400", headers=H), timeout=90).read()
        Image.open(io.BytesIO(d)).convert("RGB").save(out, quality=82)
        return out, fid
    except Exception as e:
        return out, None

with ThreadPoolExecutor(6) as ex:
    kq = list(ex.map(tai, jobs))
json.dump({o: f for o, f in kq}, open("rom-ids.json", "w"), indent=1)
ok = [(o, f) for o, f in kq if f]
print(len(ok), "/", len(jobs))
cols = 8; W = 190; HH = 140
rows = (len(ok) + cols - 1) // cols
sh = Image.new("RGB", (cols * W, rows * HH), "white")
for n, (o, f) in enumerate(ok):
    try:
        im = Image.open(o).convert("RGB"); im.thumbnail((W, HH - 14))
    except Exception:
        continue
    x = (n % cols) * W; y = (n // cols) * HH
    sh.paste(im, (x, y + 14))
    ImageDraw.Draw(sh).text((x + 2, y + 1), os.path.basename(o)[:-4][:28], fill="red")
sh.save("sheet_rom.jpg", quality=65)
