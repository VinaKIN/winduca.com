"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { asset } from "@/lib/asset";
import { GIAI_PHAP } from "@/lib/giai-phap";
import { KIEU_CUA } from "@/lib/site";

/**
 * Chọn loại công trình trong một màn hình (11/11/2026): danh sách bên trái, ảnh lớn bên phải đổi tại chỗ có lớp "bản vẽ"
 * (dấu góc, lưới chia ba, nhãn FIG.). Rê chuột hoặc chạm/bấm/phím mũi tên để đổi. Ảnh là minh họa Pexels.
 */
export function ChonCongTrinh() {
  const [i, setI] = useState(0);
  const dsRef = useRef<HTMLDivElement>(null);
  const g = GIAI_PHAP[i];
  const heCua = KIEU_CUA.filter((k) => g.heCua.includes(k.slug));

  function phim(e: KeyboardEvent<HTMLDivElement>) {
    const t = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!t) return;
    e.preventDefault();
    const k = (i + t + GIAI_PHAP.length) % GIAI_PHAP.length;
    setI(k);
    (dsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[k])?.focus();
  }

  return (
    <div className="grid overflow-hidden border border-white/15 bg-[#161314] text-white lg:grid-cols-[0.78fr_1.5fr]">
      {/* Danh sách */}
      <div
        ref={dsRef}
        role="tablist"
        aria-label="Loại công trình"
        aria-orientation="vertical"
        onKeyDown={phim}
        className="flex snap-x gap-px overflow-x-auto border-b border-white/15 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r [&::-webkit-scrollbar]:hidden"
      >
        {GIAI_PHAP.map((x, k) => (
          <button
            key={x.slug}
            type="button"
            role="tab"
            id={`tab-${x.slug}`}
            aria-selected={i === k}
            aria-controls="khung-cong-trinh"
            tabIndex={i === k ? 0 : -1}
            onClick={() => setI(k)}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setI(k);
            }}
            className={`group relative flex shrink-0 snap-start items-center gap-4 px-5 py-4 text-left transition-colors lg:w-full lg:flex-1 lg:px-6 ${i === k ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"} lg:border-b lg:border-white/10 lg:last:border-b-0`}
          >
            <span className={`absolute left-0 top-0 h-full w-[2px] bg-accent transition-transform duration-300 max-lg:top-auto max-lg:bottom-0 max-lg:h-[2px] max-lg:w-full ${i === k ? "scale-100" : "scale-0"} origin-top max-lg:origin-left`} aria-hidden="true" />
            <span className={`font-mono text-[12px] tracking-[0.1em] transition-colors ${i === k ? "text-accent" : "text-white/55"}`}>{String(k + 1).padStart(2, "0")}</span>
            <span className={`whitespace-nowrap text-[15px] font-medium uppercase tracking-[0.06em] transition-colors lg:whitespace-normal lg:text-[14px] ${i === k ? "text-white" : "text-white/75 group-hover:text-white"}`}>{x.ten}</span>
            <span className={`ml-auto hidden text-white/60 transition-all duration-300 lg:block ${i === k ? "translate-x-0 text-accent opacity-100" : "-translate-x-1 opacity-0"}`} aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>

      {/* Khung ảnh */}
      <div id="khung-cong-trinh" role="tabpanel" aria-labelledby={`tab-${g.slug}`} className="relative isolate min-h-[520px] overflow-hidden bg-than-chi lg:min-h-[600px]">
        {GIAI_PHAP.map((x, k) => (
          <Image
            key={x.slug}
            src={asset(x.anh)}
            alt={k === i ? x.chuThich : ""}
            fill
            quality={65}
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority={k === 0}
            className={`-z-20 object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${k === i ? "scale-100 opacity-100" : "scale-[1.07] opacity-0"}`}
            style={{ objectPosition: x.pos }}
            aria-hidden={k !== i}
          />
        ))}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(18,16,17,0.35)_0%,rgba(18,16,17,0.05)_32%,rgba(18,16,17,0.9)_100%)]" aria-hidden="true" />

        {/* lớp bản vẽ: lưới chia ba, dấu góc, nhãn */}
        <div className="pointer-events-none absolute inset-4 md:inset-6" aria-hidden="true">
          <i className="absolute left-0 top-0 h-5 w-5 border-l border-t border-white/70" />
          <i className="absolute right-0 top-0 h-5 w-5 border-r border-t border-white/70" />
          <i className="absolute inset-y-0 left-1/3 w-px bg-white/10" />
          <i className="absolute inset-y-0 left-2/3 w-px bg-white/10" />
          <i className="absolute inset-x-0 top-1/3 h-px bg-white/10" />
          <span className="absolute left-7 top-1 font-mono text-[11px] tracking-[0.14em] text-white/80 md:left-9">
            FIG. {String(i + 1).padStart(2, "0")} / {String(GIAI_PHAP.length).padStart(2, "0")}
          </span>
          <span className="absolute right-7 top-1 hidden font-mono text-[11px] uppercase tracking-[0.14em] text-white/70 sm:block md:right-9">Ảnh minh họa · Pexels</span>
        </div>

        {/* nội dung */}
        <div key={g.slug} className="anh-doi absolute inset-x-0 bottom-0 p-5 md:p-8">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">{g.ten}</p>
          <h2 className="mt-2 max-w-2xl text-[clamp(1.5rem,2.6vw,2.4rem)] font-light leading-[1.15] tracking-[-0.01em]">{g.dan}</h2>
          <p className="mt-3 hidden max-w-xl text-[15px] leading-relaxed text-white/80 md:block">{g.tomTat}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/20 pt-4">
            <ul className="flex flex-wrap gap-2" aria-label="Hệ cửa gợi ý">
              {heCua.map((k) => (
                <li key={k.slug}>
                  <Link href={`/he-cua/${k.slug}`} className="inline-block rounded-full border border-white/30 px-3 py-1 text-[12.5px] text-white/90 transition-colors hover:border-accent hover:text-white">
                    {k.ten}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/giai-phap/${g.slug}`} className="nut nut-chinh ml-auto">
              Đọc giải pháp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
