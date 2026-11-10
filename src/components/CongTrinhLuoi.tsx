"use client";

import Link from "next/link";
import { useState } from "react";
import { CanhMinhHoa } from "./Illustration";
import { CONG_TRINH_MINH_HOA, KIEU_CUA, LOAI_DU_AN } from "@/lib/site";

export function CongTrinhLuoi() {
  const [loai, setLoai] = useState("Tất cả");
  const [kieu, setKieu] = useState("Tất cả");
  const [khuVuc, setKhuVuc] = useState("Tất cả");
  const [soHien, setSoHien] = useState(9);

  const ds = CONG_TRINH_MINH_HOA.filter(
    (c) =>
      (loai === "Tất cả" || c.loai === loai) &&
      (kieu === "Tất cả" || c.kieuCua === kieu) &&
      (khuVuc === "Tất cả" || c.khuVuc === khuVuc),
  );

  const chip = (b: boolean) =>
    `rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
      b ? "border-accent bg-accent text-white" : "border-than-chi/25 hover:border-accent hover:text-accent"
    }`;
  const nhom = (nhan: string, ds2: string[], cur: string, set: (v: string) => void) => (
    <div>
      <p className="nhan-muc mb-3 text-than-chi/60">{nhan}</p>
      <div className="flex flex-wrap gap-2">
        {["Tất cả", ...ds2].map((t) => (
          <button key={t} type="button" aria-pressed={cur === t} onClick={() => { set(t); setSoHien(9); }} className={chip(cur === t)}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-5 flex flex-wrap gap-x-8 gap-y-4 border-b border-than-chi/10 bg-nga/95 px-5 py-4 backdrop-blur md:top-20 md:-mx-10 md:px-10">
        {nhom("Loại hình", LOAI_DU_AN, loai, setLoai)}
        {nhom("Kiểu cửa", KIEU_CUA.map((k) => k.ten), kieu, setKieu)}
        {nhom("Khu vực", ["Miền Bắc", "Miền Trung", "Miền Nam"], khuVuc, setKhuVuc)}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ds.slice(0, soHien).map((c, i) => (
          <li key={c.slug} className={i === 0 && ds.length > 2 ? "sm:col-span-2" : ""}>
            <Link href={`/cong-trinh/${c.slug}`} className="group block">
              <CanhMinhHoa
                seed={CONG_TRINH_MINH_HOA.findIndex((x) => x.slug === c.slug) + 1}
                className={`${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/2]"} transition-transform duration-500 group-hover:scale-[1.01]`}
              />
              <p className="mt-3 text-sm font-semibold">{c.ten}</p>
              <p className="text-xs text-than-chi/70">
                {c.loai} · {c.khuVuc} · {c.kieuCua}
              </p>
            </Link>
          </li>
        ))}
        {ds.length === 0 && (
          <li className="text-than-chi/70 sm:col-span-2 lg:col-span-3">
            Chưa có mục phù hợp. Anh chị có thể{" "}
            <Link href="/lien-he" className="underline">
              nhờ chuyên gia tư vấn
            </Link>
            .
          </li>
        )}
      </ul>

      {ds.length > soHien && (
        <div className="mt-10 text-center">
          <button type="button" onClick={() => setSoHien((n) => n + 9)} className="nut nut-vien-sang">
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
}
