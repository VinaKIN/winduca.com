"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { asset } from "@/lib/asset";
import { KIEU_CUA } from "@/lib/site";
import { NhanMinhHoa } from "./ui";

const ANH = [
  { src: "/images/chu-nha.jpg", pos: "70% 50%" },
  { src: "/images/hero.jpg", pos: "20% 50%" },
  { src: "/images/biet-thu-go-kinh.jpg", pos: "50% 50%" },
  { src: "/images/villa-ban-cong.jpg", pos: "50% 62%" },
];

/** Danh sách hệ cửa kiểu Winboss: thẻ trắng bo góc, tab lọc, ô tìm kiếm, lưới thẻ 3 cột. */
export function HeCuaDanhSach() {
  const [tab, setTab] = useState("Tất cả");
  const [tim, setTim] = useState("");

  const ds = KIEU_CUA.map((k, n) => ({ k, n })).filter(
    ({ k }) =>
      (tab === "Tất cả" || k.ten === tab) &&
      (tim.trim() === "" || `${k.ten} ${k.tagline} ${k.khongGian.join(" ")}`.toLowerCase().includes(tim.trim().toLowerCase())),
  );

  const chip = (b: boolean) =>
    `rounded-[2px] border px-4 py-2 text-xs font-semibold transition-colors ${
      b ? "border-than-chi bg-than-chi text-white" : "border-than-chi/20 text-than-chi/80 hover:border-accent hover:text-accent-chu"
    }`;

  return (
    <div className="rounded-[2px] bg-white p-5 shadow-[0_8px_40px_rgba(35,31,32,0.08)] md:rounded-[2px] md:p-10">
      <p className="nhan-muc text-accent-chu">Hệ cửa nhôm kính · WINDUCA</p>
      <h2 className="mt-3 text-[clamp(1.9rem,4vw,3.25rem)] font-light leading-[1.1]">
        Chọn hệ cửa theo <span className="font-semibold">thông số kỹ thuật</span>
      </h2>
      <p className="mt-4 max-w-2xl text-than-chi/70">Lọc theo kiểu cửa, không gian sử dụng và hệ thống. Mỗi hệ đều có thông số để so sánh nhanh.</p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[2px] bg-nga p-3 md:p-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo kiểu cửa">
          {["Tất cả", ...KIEU_CUA.map((k) => k.ten)].map((t) => (
            <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)} className={chip(tab === t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-than-chi/60">
            {ds.length} / {KIEU_CUA.length} hệ
          </span>
          <label className="sr-only" htmlFor="tim-he-cua">
            Tìm hệ cửa
          </label>
          <input
            id="tim-he-cua"
            value={tim}
            onChange={(e) => setTim(e.target.value)}
            placeholder="Tìm: trượt, sân vườn…"
            className="w-44 rounded-[2px] border border-than-chi/20 bg-white px-4 py-2 text-sm outline-none focus:border-accent md:w-56"
          />
        </div>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ds.map(({ k, n }) => (
          <li key={k.slug}>
            <Link href={`/he-cua/${k.slug}`} className="group block overflow-hidden rounded-[2px] border border-than-chi/10 bg-white transition-shadow hover:shadow-[0_12px_36px_rgba(35,31,32,0.12)]">
              <div className="relative aspect-[4/3] bg-than-chi">
                <Image
                  src={asset(ANH[n % ANH.length].src)}
                  alt=""
                  fill
                  quality={60}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  style={{ objectPosition: ANH[n % ANH.length].pos }}
                />
                <NhanMinhHoa className="left-3 top-3" />
              </div>
              <div className="p-5">
                <p className="nhan-muc text-accent-chu">Hệ cửa {String(n + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-xl font-semibold">{k.ten}</h3>
                <p className="mt-1 text-sm text-than-chi/70">{k.tagline}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-than-chi/10 pt-4 text-xs">
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.1em] text-than-chi/50">Khẩu độ</dt>
                    <dd className="mt-1 font-medium">{k.khauDo}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.1em] text-than-chi/50">Cách nhiệt</dt>
                    <dd className="mt-1 text-than-chi/60">Đang chờ xác nhận</dd>
                  </div>
                </dl>
              </div>
            </Link>
          </li>
        ))}
        {ds.length === 0 && <li className="text-than-chi/70 sm:col-span-2 lg:col-span-3">Chưa có hệ cửa phù hợp với bộ lọc.</li>}
      </ul>
    </div>
  );
}
