"use client";

import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/asset";

/**
 * So sánh Trước / Sau: kéo thanh trượt hoặc dùng phím mũi tên. CHỈ dùng với ảnh thật chụp cùng góc, trước và sau thi công.
 * Không dùng ảnh minh họa cho thành phần này.
 */
export function TruocSau({ truoc, sau, alt = "Công trình" }: { truoc: string; sau: string; alt?: string }) {
  const [p, setP] = useState(50);

  return (
    <div className="dau-goc relative aspect-[16/9] w-full select-none overflow-hidden rounded-[6px] bg-than-chi md:max-h-[56svh]">
      <Image src={asset(sau)} alt={`${alt}: sau thi công`} fill quality={70} sizes="100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}>
        <Image src={asset(truoc)} alt={`${alt}: trước thi công`} fill quality={70} sizes="100vw" className="object-cover" />
      </div>
      <span className="pointer-events-none absolute left-4 top-4 rounded-[3px] bg-than-chi/75 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-white">Trước</span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-[3px] bg-than-chi/75 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-white">Sau</span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${p}%` }} aria-hidden="true">
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-than-chi/70 text-white backdrop-blur-sm">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={p}
        onChange={(e) => setP(Number(e.target.value))}
        aria-label="Kéo để so sánh trước và sau thi công"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
