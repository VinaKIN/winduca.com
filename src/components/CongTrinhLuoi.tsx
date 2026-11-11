"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { asset } from "@/lib/asset";
import { CONG_TRINH_MINH_HOA, KIEU_CUA, LOAI_DU_AN } from "@/lib/site";

/**
 * Cảm hứng kiến trúc: bộ lọc gọn một hàng, gallery lệch (ảnh đầu to), hover hiện chi tiết.
 * Đây là ảnh cảm hứng, KHÔNG phải công trình do WINDUCA thực hiện.
 */
export function CongTrinhLuoi() {
  const [loai, setLoai] = useState("Tất cả");
  const [kieu, setKieu] = useState("Tất cả");
  const [khuVuc, setKhuVuc] = useState("Tất cả");
  const [soHien, setSoHien] = useState(5);

  const ds = CONG_TRINH_MINH_HOA.filter(
    (c) =>
      (loai === "Tất cả" || c.loai === loai) &&
      (kieu === "Tất cả" || c.kieuCua === kieu) &&
      (khuVuc === "Tất cả" || c.khuVuc === khuVuc),
  );

  const chip = (b: boolean) =>
    `shrink-0 rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${b ? "border-accent bg-accent text-white" : "border-than-chi/25 hover:border-accent hover:text-accent"}`;
  const chon = "rounded-full border border-than-chi/25 bg-white px-4 py-1.5 text-xs font-medium outline-none focus:border-accent";
  const dat = () => setSoHien(5);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Loại hình">
          {["Tất cả", ...LOAI_DU_AN].map((t) => (
            <button key={t} type="button" aria-pressed={loai === t} onClick={() => { setLoai(t); dat(); }} className={chip(loai === t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <label className="sr-only" htmlFor="loc-kieu">Kiểu cửa</label>
          <select id="loc-kieu" value={kieu} onChange={(e) => { setKieu(e.target.value); dat(); }} className={chon}>
            <option>Tất cả</option>
            {KIEU_CUA.map((k) => (
              <option key={k.slug}>{k.ten}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor="loc-vung">Khu vực</label>
          <select id="loc-vung" value={khuVuc} onChange={(e) => { setKhuVuc(e.target.value); dat(); }} className={chon}>
            <option>Tất cả</option>
            {["Miền Bắc", "Miền Trung", "Miền Nam"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
        <p role="status" aria-live="polite" className="text-xs text-than-chi/65">{ds.length} không gian</p>
      </div>

      <ul className="mt-4 grid auto-rows-[clamp(110px,17svh,165px)] grid-cols-2 gap-3 md:grid-cols-4">
        {ds.slice(0, soHien).map((c, k) => {
          const idx = CONG_TRINH_MINH_HOA.findIndex((x) => x.slug === c.slug) + 1;
          const to = k === 0 && ds.length > 4;
          return (
            <li key={c.slug} className={to ? "col-span-2 row-span-2" : ""}>
              <Link href={`/cong-trinh/${c.slug}`} className="group relative block h-full overflow-hidden rounded-[6px] bg-than-chi">
                <Image
                  src={asset(`/images/architecture/cong-trinh-${String(idx).padStart(2, "0")}.webp`)}
                  alt={c.ten}
                  fill
                  quality={65}
                  sizes={to ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-than-chi/70 p-3 text-white transition-all duration-300 md:translate-y-[calc(100%-2.4rem)] md:group-hover:translate-y-0">
                  <p className="truncate text-sm font-semibold">{c.ten}</p>
                  <p className="mt-1 text-xs text-white/75">
                    {c.loai} · {c.khuVuc}
                  </p>
                  <p className="text-xs text-accent">{c.kieuCua}</p>
                </div>
              </Link>
            </li>
          );
        })}
        {ds.length === 0 && (
          <li className="col-span-full flex items-center text-than-chi/70">
            Chưa có mục phù hợp. Anh chị có thể&nbsp;
            <Link href="/lien-he" className="underline">
              nhờ chuyên gia tư vấn
            </Link>
            .
          </li>
        )}
      </ul>

      {ds.length > soHien && (
        <div className="mt-6 text-center">
          <button type="button" onClick={() => setSoHien((n) => n + 8)} className="nut nut-vien-sang">
            Xem thêm công trình
          </button>
        </div>
      )}
    </div>
  );
}
