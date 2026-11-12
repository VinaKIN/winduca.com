"use client";

import { useEffect, useState } from "react";

/**
 * Hỗ trợ đọc bài (12/11/2026): thanh tiến độ đỏ chạy theo mức cuộn và mục lục nổi bám theo, đánh dấu mục đang đọc.
 * Tắt hiệu ứng chuyển động khi người dùng chọn giảm chuyển động.
 */
export function ThanhTienDoDoc() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const cuon = () => {
      const a = document.getElementById("than-bai");
      if (!a) return;
      const r = a.getBoundingClientRect();
      const tong = r.height - window.innerHeight * 0.5;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(1, tong))));
    };
    cuon();
    window.addEventListener("scroll", cuon, { passive: true });
    window.addEventListener("resize", cuon);
    return () => {
      window.removeEventListener("scroll", cuon);
      window.removeEventListener("resize", cuon);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent" role="progressbar" aria-label="Tiến độ đọc" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(p * 100)}>
      <div className="h-full origin-left bg-accent motion-reduce:transition-none" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

export function MucLucNoi({ muc }: { muc: { id: string; h: string }[] }) {
  const [dang, setDang] = useState(muc[0]?.id ?? "");
  useEffect(() => {
    const els = muc.map((m) => document.getElementById(m.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const ob = new IntersectionObserver(
      (es) => {
        const thay = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (thay) setDang(thay.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((e) => ob.observe(e));
    return () => ob.disconnect();
  }, [muc]);

  return (
    <nav aria-label="Mục lục bài viết" className="lg:sticky lg:top-28">
      <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-than-chi/70">Trong bài này</p>
      <ol className="mt-4 space-y-1 border-l border-than-chi/20">
        {muc.map((m, i) => (
          <li key={m.id}>
            <a
              href={`#${m.id}`}
              aria-current={dang === m.id ? "true" : undefined}
              className={`-ml-px flex min-h-11 items-start gap-3 border-l-2 py-2 pl-4 text-[14.5px] leading-snug transition-colors ${dang === m.id ? "border-accent font-bold text-than-chi" : "border-transparent text-than-chi/70 hover:text-than-chi"}`}
            >
              <span className={`text-[12px] tabular-nums ${dang === m.id ? "text-accent" : "text-than-chi/45"}`}>{String(i + 1).padStart(2, "0")}</span>
              {m.h}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
