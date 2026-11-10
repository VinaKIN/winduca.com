"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

export type DichVu = { so: string; t: string; m: string; anh: string; pos: string };

function MuiTen({ huong }: { huong: "trai" | "phai" }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={huong === "phai" ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} />
    </svg>
  );
}

/** Thanh trượt dịch vụ có chấm chuyển thẻ và mũi tên trước/sau. */
export function DichVuTruot({ muc }: { muc: DichVu[] }) {
  const ds = useRef<HTMLUListElement>(null);
  const [i, setI] = useState(0);

  const khiCuon = useCallback(() => {
    const ul = ds.current;
    if (!ul) return;
    const giua = ul.scrollLeft + ul.clientWidth / 2;
    let gan = 0;
    let kc = Infinity;
    Array.from(ul.children).forEach((c, k) => {
      const h = c as HTMLElement;
      const d = Math.abs(h.offsetLeft + h.clientWidth / 2 - giua);
      if (d < kc) {
        kc = d;
        gan = k;
      }
    });
    setI(gan);
  }, []);

  useEffect(() => {
    khiCuon();
  }, [khiCuon]);

  function toi(k: number) {
    const ul = ds.current;
    if (!ul) return;
    const n = (k + muc.length) % muc.length;
    const the = ul.children[n] as HTMLElement | undefined;
    if (the) ul.scrollTo({ left: the.offsetLeft - ul.offsetLeft, behavior: "smooth" });
  }

  return (
    <div className="min-w-0">
      <ul
        ref={ds}
        onScroll={khiCuon}
        aria-label="Danh sách dịch vụ"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {muc.map((d) => (
          <li key={d.so} className="w-full shrink-0 snap-center">
            <Link href="/lien-he" className="group relative block min-h-[220px] overflow-hidden rounded-[24px] bg-than-chi text-white md:h-[clamp(300px,50svh,420px)] md:min-h-0 md:rounded-[32px]">
              <Image src={asset(d.anh)} alt={d.t} fill quality={60} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ objectPosition: d.pos }} />
              <div className="absolute inset-0 bg-than-chi/55" aria-hidden="true" />
              <div className="relative flex h-full min-h-[220px] flex-col justify-between p-6 md:min-h-0 md:p-8">
                <span className="text-sm font-bold text-white/80">{d.so}</span>
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold md:text-2xl">{d.t}</h3>
                    <p className="mt-2 max-w-md text-sm font-light text-white/85">{d.m}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:translate-x-1">
                    <MuiTen huong="phai" />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button type="button" aria-label="Dịch vụ trước" onClick={() => toi(i - 1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-than-chi text-white transition-colors hover:bg-accent">
          <MuiTen huong="trai" />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Chọn dịch vụ">
          {muc.map((d, k) => (
            <button
              key={d.so}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={`Dịch vụ ${d.so}: ${d.t}`}
              onClick={() => toi(k)}
              className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-accent" : "w-2 bg-than-chi/25 hover:bg-than-chi/50"}`}
            />
          ))}
        </div>
        <button type="button" aria-label="Dịch vụ sau" onClick={() => toi(i + 1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-than-chi text-white transition-colors hover:bg-accent">
          <MuiTen huong="phai" />
        </button>
      </div>
    </div>
  );
}
