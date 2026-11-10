"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { HOTLINE, HOTLINE_TEL, KIEU_CUA } from "@/lib/site";

/**
 * Header theo đề xuất 10/11/2026: logo trái · menu chính · CTA "Liên hệ tư vấn" phải.
 * Trong suốt trên hero trang chủ (chữ trắng), chuyển nền Ngà khi cuộn (chữ Than chì).
 * Menu "Hệ cửa" có mega menu kèm ảnh đại diện từng hệ cửa. Dưới 1024px dùng nút ba gạch.
 */

const MENU = [
  { href: "/gioi-thieu", label: "Giới thiệu", mega: false },
  { href: "/he-cua", label: "Hệ cửa", mega: true },
  { href: "/nang-luc-xuong", label: "Giải pháp", mega: false },
  { href: "/cong-trinh", label: "Công trình", mega: false },
  { href: "/hop-tac", label: "Đối tác", mega: false },
  { href: "/tin-tuc", label: "Kiến thức", mega: false },
];

const ANH_HE_CUA = ["/images/chu-nha.jpg", "/images/biet-thu-go-kinh.jpg", "/images/resort-ven-bien.jpg", "/images/nha-o-kinh.jpg"];

export function Header() {
  const duongDan = usePathname();
  const [daCuon, setDaCuon] = useState(false);
  const [moMenu, setMoMenu] = useState(false);
  const [moMega, setMoMega] = useState(false);
  const [duongDanMo, setDuongDanMo] = useState(duongDan);

  // Đóng menu khi chuyển trang (so sánh khi render, không setState trong effect)
  if (duongDanMo !== duongDan) {
    setDuongDanMo(duongDan);
    setMoMenu(false);
    setMoMega(false);
  }

  useEffect(() => {
    const onScroll = () => setDaCuon(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!moMenu && !moMega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoMenu(false);
        setMoMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moMenu, moMega]);

  useEffect(() => {
    if (!moMenu) return;
    const cu = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = cu;
    };
  }, [moMenu]);

  const dangO = (href: string) => duongDan.startsWith(href);
  const trongSuot = duongDan === "/" && !daCuon && !moMega && !moMenu;

  const chu = trongSuot ? "text-white" : "text-than-chi";
  const logo = trongSuot ? "/brand/WINDUCA-ngang-am-ban-trong.svg" : "/brand/WINDUCA-ngang-mau-trong.svg";
  const thanh = trongSuot ? "bg-white" : "bg-than-chi";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          trongSuot ? "border-b border-transparent bg-transparent" : "border-b border-than-chi/10 bg-nga/95 backdrop-blur-md"
        }`}
        onMouseLeave={() => setMoMega(false)}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:h-20 md:px-10">
          <Link href="/" aria-label="WINDUCA — trang chủ" className="block shrink-0">
            <Image src={asset(logo)} alt="WINDUCA" width={677} height={102} priority className="h-5 w-auto md:h-7" />
          </Link>

          <nav aria-label="Điều hướng chính" className="hidden items-center gap-8 lg:flex">
            {MENU.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                aria-haspopup={m.mega ? "true" : undefined}
                aria-expanded={m.mega ? moMega : undefined}
                aria-current={dangO(m.href) ? "page" : undefined}
                onMouseEnter={() => setMoMega(m.mega)}
                onFocus={() => setMoMega(m.mega)}
                className={`whitespace-nowrap text-[0.8125rem] font-medium uppercase tracking-[0.08em] transition-colors hover:text-accent ${
                  dangO(m.href) && !trongSuot ? "text-accent-chu" : chu
                }`}
              >
                {m.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/lien-he" className="nut nut-chinh whitespace-nowrap !min-h-10 !px-4 !py-2 !text-xs md:!px-5">
              Liên hệ tư vấn
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
              aria-expanded={moMenu}
              aria-controls="menu-di-dong"
              aria-label="Mở menu"
              onClick={() => setMoMenu(true)}
            >
              <span className={`block h-[2px] w-7 ${thanh}`} />
              <span className={`block h-[2px] w-7 ${thanh}`} />
              <span className={`block h-[2px] w-7 ${thanh}`} />
            </button>
          </div>
        </div>

        {/* ===== MEGA MENU HỆ CỬA ===== */}
        {moMega && (
          <div className="hidden border-t border-than-chi/10 bg-nga lg:block">
            <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-6 px-10 py-8">
              {KIEU_CUA.map((k, n) => (
                <Link key={k.slug} href={`/he-cua/${k.slug}`} className="group block text-than-chi">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-than-chi">
                    <Image
                      src={asset(ANH_HE_CUA[n % ANH_HE_CUA.length])}
                      alt=""
                      fill
                      quality={60}
                      sizes="22vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.06em] group-hover:text-accent-chu">{k.ten}</p>
                  <p className="mt-1 text-xs text-than-chi/65">{k.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ===== MENU DI ĐỘNG ===== */}
      {moMenu && (
        <div id="menu-di-dong" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] overflow-y-auto bg-nga px-5 py-5 lg:hidden">
          <div className="flex items-center justify-between">
            <Image src={asset("/brand/WINDUCA-ngang-mau-trong.svg")} alt="WINDUCA" width={677} height={102} className="h-5 w-auto" />
            <button type="button" aria-label="Đóng menu" onClick={() => setMoMenu(false)} className="flex h-10 w-10 items-center justify-center text-than-chi">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Menu di động" className="mt-8">
            <ul>
              {MENU.map((m) => (
                <li key={m.href} className="border-b border-than-chi/10">
                  <Link href={m.href} className={`block py-4 text-lg font-medium ${dangO(m.href) ? "text-accent-chu" : "text-than-chi"}`}>
                    {m.label}
                  </Link>
                  {m.mega && (
                    <ul className="pb-3 pl-4">
                      {KIEU_CUA.map((k) => (
                        <li key={k.slug}>
                          <Link href={`/he-cua/${k.slug}`} className="block py-2 text-sm text-than-chi/70">
                            {k.ten}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/lien-he" className="nut nut-chinh mt-8 w-full">
            Liên hệ tư vấn
          </Link>
          <a href={HOTLINE_TEL} className="mt-4 block text-center text-sm text-than-chi/70">
            Hotline {HOTLINE}
          </a>
        </div>
      )}
    </>
  );
}
