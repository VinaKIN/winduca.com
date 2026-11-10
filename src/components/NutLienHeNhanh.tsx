"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HOTLINE, HOTLINE_TEL } from "@/lib/site";

/** Nút tròn đỏ cố định góc dưới phải (kiểu Winboss): mở danh sách liên hệ nhanh. */
export function NutLienHeNhanh() {
  const [mo, setMo] = useState(false);

  useEffect(() => {
    if (!mo) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMo(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mo]);

  const muc = [
    { href: HOTLINE_TEL, nhan: `Gọi ${HOTLINE}`, ngoai: true },
    { href: "/lien-he", nhan: "Gửi liên hệ" },
    { href: "/trai-nghiem#sample-box", nhan: "Nhận hộp mẫu góc nhôm" },
    { href: "/trai-nghiem#showroom", nhan: "Đặt lịch showroom" },
    { href: "/hop-tac", nhan: "Hợp tác đối tác" },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8">
      {mo && (
        <ul
          id="lien-he-nhanh"
          className="absolute bottom-16 right-0 w-64 overflow-hidden rounded-[2px] bg-white p-2 shadow-[0_16px_48px_rgba(35,31,32,0.22)]"
        >
          {muc.map((m) => (
            <li key={m.nhan}>
              {m.ngoai ? (
                <a href={m.href} className="block rounded-[2px] px-4 py-3 text-sm font-medium text-than-chi hover:bg-nga">
                  {m.nhan}
                </a>
              ) : (
                <Link href={m.href} onClick={() => setMo(false)} className="block rounded-[2px] px-4 py-3 text-sm font-medium text-than-chi hover:bg-nga">
                  {m.nhan}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        aria-expanded={mo}
        aria-controls="lien-he-nhanh"
        aria-label={mo ? "Đóng liên hệ nhanh" : "Mở liên hệ nhanh"}
        onClick={() => setMo((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-[2px] bg-accent text-than-chi shadow-none transition-colors hover:bg-accent-dam md:h-14 md:w-14"
      >
        {mo ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            {[5, 12, 19].flatMap((x) => [5, 12, 19].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />))}
          </svg>
        )}
      </button>
    </div>
  );
}
