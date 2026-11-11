"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThongSoBon } from "./ThongSoBon";
import { asset } from "@/lib/asset";
import { ANH_THEO_KIEU, NHOM_SAN_PHAM, SAN_PHAM } from "@/lib/san-pham";

/** Danh sách sản phẩm kiểu Winboss: tab lọc theo kiểu cửa, ô tìm kiếm, lưới thẻ có 4 dòng thông số (không tên hãng). */
export function HeCuaDanhSach() {
  const [tab, setTab] = useState("Tất cả");
  const [tim, setTim] = useState("");

  const ds = SAN_PHAM.filter(
    (p) => (tab === "Tất cả" || p.nhom === tab) && (tim.trim() === "" || `${p.ten} ${p.mota} ${p.nhom}`.toLowerCase().includes(tim.trim().toLowerCase())),
  );

  const chip = (b: boolean) =>
    `rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
      b ? "border-than-chi bg-than-chi text-white" : "border-than-chi/20 text-than-chi/80 hover:border-accent hover:text-accent"
    }`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-nga p-3 md:p-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo kiểu cửa">
          {["Tất cả", ...NHOM_SAN_PHAM].map((t) => (
            <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)} className={chip(tab === t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-than-chi/60">
            {ds.length} / {SAN_PHAM.length} sản phẩm
          </span>
          <label className="sr-only" htmlFor="tim-san-pham">
            Tìm sản phẩm
          </label>
          <input
            id="tim-san-pham"
            value={tim}
            onChange={(e) => setTim(e.target.value)}
            placeholder="Tìm: slim, xếp gấp…"
            className="w-44 rounded-full border border-than-chi/20 bg-white px-4 py-2 text-sm outline-none focus:border-accent md:w-56"
          />
        </div>
      </div>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ds.map((p) => {
          const a = ANH_THEO_KIEU[p.kieu];
          return (
            <li key={p.slug}>
              <Link
                href={`/he-cua/${p.kieu}`}
                className="group dau-goc block h-full overflow-hidden rounded-[6px] border border-than-chi/10 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[3/2] bg-than-chi">
                  <Image src={asset(a.src)} alt={`${p.ten} trong không gian kiến trúc`} fill quality={60} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition-opacity duration-700 group-hover:opacity-0" />
                  <Image src={asset(a.hover)} alt="" fill quality={60} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
                <div className="p-5">
                  <p className="nhan-muc text-accent">{p.nhom}</p>
                  <h3 className="mt-1 text-xl font-bold group-hover:text-accent">{p.ten}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-than-chi/70">{p.mota}</p>
                  <ThongSoBon sp={p} lop="mt-4 border-t border-than-chi/10 pt-4" />
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-accent">
                    Xem kiểu cửa <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
        {ds.length === 0 && <li className="text-than-chi/70 sm:col-span-2 lg:col-span-3">Chưa có sản phẩm phù hợp với bộ lọc.</li>}
      </ul>
    </div>
  );
}
