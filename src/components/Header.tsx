"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MENU = [
  { href: "#he-cua", label: "Hệ cửa" },
  { href: "#cong-trinh", label: "Công trình" },
  { href: "#nang-luc", label: "Năng lực & Xưởng" },
  { href: "#danh-cho-kts", label: "Dành cho KTS" },
  { href: "#trai-nghiem", label: "Trải nghiệm" },
  { href: "#lien-he", label: "Liên hệ" },
];

export function Header() {
  const [daCuon, setDaCuon] = useState(false);
  const [moMenu, setMoMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setDaCuon(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        daCuon || moMenu ? "kinh-mo" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link href="/" aria-label="WINDUCA — trang chủ" className="shrink-0">
          {/* Logo ngang bản âm bản (Ngà) trên nền tối — brief: cỡ tối thiểu 120px */}
          <Image
            src="/brand/WINDUCA-ngang-am-ban.svg"
            alt="WINDUCA"
            width={168}
            height={28}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-8 lg:flex">
          {MENU.map((m) => (
            <a
              key={m.href}
              href={m.href}
              className="group relative text-sm font-medium text-nga"
            >
              {m.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:0947686668"
            className="hidden text-sm font-medium text-nga xl:block"
          >
            0947 686 668
          </a>
          <a href="#dang-ky" className="nut nut-chinh hidden !min-h-10 !px-4 !py-2 md:inline-flex">
            Đăng ký trải nghiệm
          </a>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-end justify-center gap-[7px] lg:hidden"
            aria-expanded={moMenu}
            aria-controls="menu-di-dong"
            aria-label={moMenu ? "Đóng menu" : "Mở menu"}
            onClick={() => setMoMenu((v) => !v)}
          >
            <span className="block h-px w-6 bg-nga" />
            <span className="block h-px w-4 bg-nga" />
          </button>
        </div>
      </div>

      {moMenu && (
        <div id="menu-di-dong" className="fixed inset-0 top-16 z-40 bg-than-chi px-5 pt-10 lg:hidden">
          <ul className="space-y-6">
            {MENU.map((m) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  onClick={() => setMoMenu(false)}
                  className="tieu-de block text-3xl text-nga"
                >
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="vach-champagne mt-10" />
          <a href="tel:0947686668" className="mt-6 block text-lg text-nga">
            0947 686 668
          </a>
        </div>
      )}
    </header>
  );
}
