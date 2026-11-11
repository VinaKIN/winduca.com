"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Số liệu chạy (count-up) khi cuộn tới. GIÁ TRỊ LÀ GIẢ ĐỊNH do anh Huy yêu cầu (10/11/2026), xem SO_LIEU_GIA_DINH trong lib/site.ts.
 * Thay bằng số thật khi có xác nhận. Người dùng chọn giảm chuyển động thì hiện số cuối ngay.
 */
export type SoLieu = { nhan: string; gia_tri: number; hau_to?: string; do_dai?: number };

function Dem({ gia_tri, hau_to = "", do_dai = 1 }: { gia_tri: number; hau_to?: string; do_dai?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setV(gia_tri), 0);
      return () => clearTimeout(t);
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const buoc = (now: number) => {
          const k = Math.min(1, (now - t0) / 1600);
          setV(Math.round(gia_tri * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(buoc);
        };
        raf = requestAnimationFrame(buoc);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [gia_tri]);

  return (
    <span ref={ref} aria-label={`${gia_tri}${hau_to}`}>
      {String(v).padStart(do_dai, "0")}
      {hau_to}
    </span>
  );
}

export function SoLieuChay({ muc }: { muc: SoLieu[] }) {
  return (
    <dl className="mt-8 grid max-w-xl grid-cols-3 gap-6 border-t border-inox pt-6 md:mt-12 md:pt-8">
      {muc.map((s) => (
        <div key={s.nhan}>
          <dt className="text-xs font-medium uppercase tracking-[0.12em] text-than-chi/65">{s.nhan}</dt>
          <dd className="mt-2 text-4xl font-bold tabular-nums text-than-chi md:text-5xl">
            <Dem gia_tri={s.gia_tri} hau_to={s.hau_to} do_dai={s.do_dai} />
          </dd>
          <dd className="mt-1 text-xs text-than-chi/65">Số liệu ước tính</dd>
        </div>
      ))}
    </dl>
  );
}
