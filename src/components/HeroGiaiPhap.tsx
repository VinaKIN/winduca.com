"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Hero trang Giải pháp (11/11/2026): nền tối có lưới bản vẽ, vệt sáng đỏ mờ đi theo chuột, số liệu đếm lên.
 * Chỉ đếm các con số về nội dung trang (số loại công trình, số bước, số kiểu cửa), không có số liệu kỹ thuật.
 * Tắt hiệu ứng khi người dùng chọn giảm chuyển động.
 */

function giamChuyenDong() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function SoDem({ den }: { den: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [so, setSo] = useState(den);

  useEffect(() => {
    const el = ref.current;
    if (!el || giamChuyenDong()) return;
    let raf = 0;
    const batDau = performance.now();
    const chay = (t: number) => {
      const p = Math.min(1, (t - batDau) / 1400);
      setSo(Math.round(den * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(chay);
    };
    raf = requestAnimationFrame(() => setSo(0));
    const dat = requestAnimationFrame(() => requestAnimationFrame(chay));
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(dat);
    };
  }, [den]);

  return (
    <span ref={ref} className="tabular-nums">
      {String(so).padStart(2, "0")}
    </span>
  );
}

export function HeroGiaiPhap({ children, soLieu }: { children: ReactNode; soLieu: { so: number; nhan: string }[] }) {
  const khung = useRef<HTMLElement>(null);

  function di(e: React.PointerEvent<HTMLElement>) {
    const el = khung.current;
    if (!el || e.pointerType !== "mouse" || giamChuyenDong()) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <section ref={khung} onPointerMove={di} className="relative isolate overflow-hidden bg-[#121011] text-white [--mx:70%] [--my:30%]">
      <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(560px_circle_at_var(--mx)_var(--my),rgba(227,25,55,0.22),transparent_62%)] transition-[background] duration-200" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" aria-hidden="true" />
      {children}
      <dl className="mx-auto grid max-w-[1440px] grid-cols-3 border-t border-white/15 px-5 md:px-10">
        {soLieu.map((s, i) => (
          <div key={s.nhan} className={`py-5 md:py-6 ${i > 0 ? "border-l border-white/15 pl-4 md:pl-8" : ""}`}>
            <dd className="font-mono text-[clamp(1.6rem,3.4vw,2.8rem)] font-light leading-none">
              <SoDem den={s.so} />
            </dd>
            <dt className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 md:text-[12px]">{s.nhan}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
