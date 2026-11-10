"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { asset } from "@/lib/asset";
import { GIAI_PHAP } from "@/lib/giai-phap";

/** Chọn loại công trình: danh sách bên trái, ảnh và tóm tắt bên phải đổi theo (mobile: chip ngang). */
export function ChonKhongGian() {
  const [i, setI] = useState(0);
  const g = GIAI_PHAP[i];

  return (
    <div className="grid gap-4 lg:grid-cols-[0.8fr_1.6fr] lg:gap-8">
      <div role="tablist" aria-label="Loại công trình" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-y lg:border-than-chi/15 [&::-webkit-scrollbar]:hidden">
        {GIAI_PHAP.map((x, k) => (
          <button
            key={x.slug}
            type="button"
            role="tab"
            aria-selected={i === k}
            onClick={() => setI(k)}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setI(k);
            }}
            className={`group flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2 text-left transition-colors lg:w-full lg:gap-5 lg:rounded-none lg:border-0 lg:border-b lg:border-than-chi/15 lg:px-0 lg:py-4 lg:last:border-b-0 ${
              i === k ? "border-accent text-accent" : "border-than-chi/20 text-than-chi/75 hover:text-than-chi"
            }`}
          >
            <span className="text-xs font-bold tracking-[0.12em] lg:w-7">{String(k + 1).padStart(2, "0")}</span>
            <span className="text-sm font-semibold uppercase tracking-[0.04em] lg:text-base">{x.ten.replace(/^Giải pháp (cửa )?(cho )?/, "")}</span>
          </button>
        ))}
      </div>

      <div className="dau-goc relative overflow-hidden rounded-[6px] bg-than-chi">
        <div className="relative h-[clamp(260px,48svh,440px)]">
          {GIAI_PHAP.map((x, k) => (
            <Image
              key={x.slug}
              src={asset(x.anh)}
              alt={x.ten}
              fill
              quality={70}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className={`object-cover transition-opacity duration-700 ${i === k ? "opacity-100" : "opacity-0"}`}
              style={{ objectPosition: x.pos }}
              priority={k === 0}
            />
          ))}
          <div className="absolute inset-0 bg-than-chi/45" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-8">
            <p className="nhan-muc text-accent">Giải pháp {String(i + 1).padStart(2, "0")} / {String(GIAI_PHAP.length).padStart(2, "0")}</p>
            <h3 className="mt-2 max-w-xl text-2xl font-bold md:text-3xl">{g.ten}</h3>
            <p className="mt-2 hidden max-w-xl text-sm font-light text-white/85 md:block">{g.tomTat}</p>
            <ul className="mt-3 hidden gap-x-6 gap-y-1 text-sm text-white/80 md:grid md:grid-cols-2">
              {g.khongGian.slice(0, 2).map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <Link href={`/giai-phap/${g.slug}`} className="nut nut-chinh mt-4">
              Xem giải pháp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
