"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DS = [
  ["/chinh-sach-bao-mat", "Bảo mật"],
  ["/dieu-khoan-su-dung", "Điều khoản sử dụng"],
  ["/chinh-sach-cookie", "Cookie"],
  ["/chinh-sach-bao-hanh", "Bảo hành & hậu mãi"],
  ["/chinh-sach-doi-tac", "Đối tác & đại lý"],
];

/** Mục lục các chính sách: đánh dấu trang hiện tại. */
export function MucLucChinhSach() {
  const p = usePathname().replace(/\/$/, "");
  return (
    <nav aria-label="Các chính sách" className="min-w-0 lg:sticky lg:top-28">
      <p className="nhan-muc text-accent">Chính sách</p>
      <ul className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-y lg:border-than-chi/15 [&::-webkit-scrollbar]:hidden">
        {DS.map(([h, t], i) => (
          <li key={h} className="shrink-0 lg:border-b lg:border-than-chi/15 lg:last:border-b-0">
            <Link
              href={h}
              aria-current={p === h ? "page" : undefined}
              className={`flex items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2 text-[15px] transition-colors lg:rounded-none lg:border-0 lg:px-0 lg:py-3.5 ${p === h ? "border-accent font-semibold text-accent" : "border-than-chi/20 text-than-chi/75 hover:text-than-chi"}`}
            >
              <span className="text-xs font-bold tracking-[0.12em]">{String(i + 1).padStart(2, "0")}</span>
              {t}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
