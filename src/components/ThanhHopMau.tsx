"use client";

import { useEffect, useState } from "react";

/**
 * Thanh nút mỏng cố định phía dưới: hiện sau khi cuộn qua hero, ẩn khi form "dang-ky" đã vào khung nhìn
 * (11/11/2026, ý tưởng 5: thanh Nhận hộp mẫu cố định mỏng).
 */
export function ThanhHopMau({ ten }: { ten: string }) {
  const [qua, setQua] = useState(false);
  const [gan, setGan] = useState(false);

  useEffect(() => {
    const on = () => setQua(window.scrollY > window.innerHeight * 0.85);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const el = document.getElementById("dang-ky");
    const io = el ? new IntersectionObserver(([e]) => setGan(e.isIntersecting), { threshold: 0.05 }) : null;
    if (el && io) io.observe(el);
    return () => {
      window.removeEventListener("scroll", on);
      io?.disconnect();
    };
  }, []);

  const hien = qua && !gan;
  return (
    <div
      aria-hidden={!hien}
      className={`pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 transition-all duration-500 ${hien ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      <a
        href="#dang-ky"
        tabIndex={hien ? 0 : -1}
        className="pointer-events-auto flex items-center gap-4 rounded-full border border-white/15 bg-than-chi/85 py-1.5 pl-6 pr-1.5 text-[13px] font-medium text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md transition-colors hover:bg-than-chi"
      >
        <span className="hidden sm:inline text-white/70">{ten}</span>
        <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true" />
        Nhận hộp mẫu góc nhôm
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </span>
      </a>
    </div>
  );
}
