"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { asset } from "@/lib/asset";
import { GIAI_PHAP } from "@/lib/giai-phap";

/**
 * Mục lục kiểu tạp chí: hàng số lớn có chân, rê chuột hoặc focus vào hàng thì ảnh bên phải đổi theo (mobile: chỉ danh sách).
 * Ảnh là minh họa từ Pexels, không phải công trình của WINDUCA.
 */
export function MucLucTapChi() {
  const [i, setI] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
      <ol className="border-t border-than-chi/25">
        {GIAI_PHAP.map((g, k) => (
          <li key={g.slug} className="border-b border-than-chi/15">
            <Link
              href={`/giai-phap/${g.slug}`}
              onMouseEnter={() => setI(k)}
              onFocus={() => setI(k)}
              className="group grid grid-cols-[3.2rem_1fr_auto] items-baseline gap-x-4 py-5 transition-colors md:grid-cols-[5rem_1fr_auto] md:py-6"
            >
              <span className={`font-serif text-[1.6rem] italic leading-none transition-colors md:text-[2.4rem] ${i === k ? "text-accent" : "text-than-chi/45"}`}>{String(k + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-serif text-[1.55rem] font-medium leading-tight tracking-[-0.01em] md:text-[2.1rem]">{g.ten}</span>
                <span className="mt-1.5 block max-w-xl text-[14.5px] leading-relaxed text-than-chi/70 md:text-[15px]">{g.tomTat}</span>
              </span>
              <span className="hidden translate-x-0 text-sm font-medium uppercase tracking-[0.18em] text-than-chi/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent md:block" aria-hidden="true">
                Đọc bài →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="relative hidden lg:block">
        <div className="sticky top-28">
          <div className="dau-goc relative aspect-[4/5] overflow-hidden bg-than-chi">
            {GIAI_PHAP.map((g, k) => (
              <Image
                key={g.slug}
                src={asset(g.anh)}
                alt=""
                fill
                quality={60}
                sizes="30vw"
                className={`object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${i === k ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
                style={{ objectPosition: g.pos }}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-3 flex items-baseline justify-between gap-4 text-[12px] uppercase tracking-[0.16em] text-than-chi/65">
            <span>
              FIG. {String(i + 1).padStart(2, "0")} · {GIAI_PHAP[i].chuThich}
            </span>
            <span className="shrink-0">Ảnh minh họa</span>
          </p>
        </div>
      </div>
    </div>
  );
}
