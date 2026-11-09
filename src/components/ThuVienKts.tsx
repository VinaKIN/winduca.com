"use client";

import { useState } from "react";
import { KIEU_CUA } from "@/lib/site";

type Tep = { ten: string; kieu: string; loai: "DWG" | "BIM" | "PDF"; dinhDang: string };

/** 3 thẻ mẫu (chốt 09/11/2026). Chưa có tệp thật → mọi thẻ "Sắp có". */
const TEP: Tep[] = [
  { ten: "Mặt cắt — Cửa trượt nâng", kieu: "Cửa trượt nâng", loai: "DWG", dinhDang: "DWG · PDF" },
  { ten: "Mô hình BIM", kieu: "Cửa trượt nâng", loai: "BIM", dinhDang: "RFA · IFC" },
  { ten: "Catalog kỹ thuật", kieu: "Tất cả", loai: "PDF", dinhDang: "PDF" },
];

export function ThuVienKts() {
  const [kieu, setKieu] = useState("Tất cả");
  const [loai, setLoai] = useState("Tất cả");
  const ds = TEP.filter(
    (t) => (kieu === "Tất cả" || t.kieu === kieu || t.kieu === "Tất cả") && (loai === "Tất cả" || t.loai === loai),
  );
  const chip = (dangChon: boolean) =>
    `border px-3 py-1.5 text-xs font-semibold transition-colors ${
      dangChon ? "border-champagne bg-champagne text-than-chi" : "border-inox/40 text-nga hover:border-champagne"
    }`;
  return (
    <div>
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="nhan-muc mb-3 text-nga/60">Kiểu cửa</p>
          <div className="flex flex-wrap gap-2">
            {["Tất cả", ...KIEU_CUA.map((k) => k.ten)].map((t) => (
              <button key={t} type="button" onClick={() => setKieu(t)} aria-pressed={kieu === t} className={chip(kieu === t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="nhan-muc mb-3 text-nga/60">Loại tệp</p>
          <div className="flex flex-wrap gap-2">
            {["Tất cả", "DWG", "BIM", "PDF"].map((t) => (
              <button key={t} type="button" onClick={() => setLoai(t)} aria-pressed={loai === t} className={chip(loai === t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {ds.map((t) => (
          <li key={t.ten} className="border border-inox/25 p-6">
            <p className="nhan-muc text-champagne">{t.dinhDang}</p>
            <p className="tieu-de mt-3 text-lg">{t.ten}</p>
            <p className="mt-1 text-xs text-nga/60">{t.kieu}</p>
            <p className="mt-6 inline-block rounded-sm border border-inox/40 px-2 py-1 text-xs">Sắp có</p>
          </li>
        ))}
        {ds.length === 0 && (
          <li className="border border-dashed border-inox/30 p-6 text-sm text-nga/70 md:col-span-3">
            Chưa có tệp cho lựa chọn này. Anh chị đăng ký bên dưới để được báo khi có.
          </li>
        )}
      </ul>
    </div>
  );
}
