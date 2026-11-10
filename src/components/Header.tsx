"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";
import { HERO_ANH, HOTLINE, HOTLINE_TEL, KIEU_CUA, MENU } from "@/lib/site";

/**
 * Header theo mẫu tham chiếu NexaHome (10/11/2026):
 * - Từ xl: "tai" Ngà bên trái (logo) và bên phải (nút hành động), giữa là ô khuyết để lộ ảnh hero,
 *   điều hướng chữ trắng nằm trên ảnh. Header nằm ở đầu trang và cuộn đi cùng trang.
 *   Khi cuộn xuống, một thanh Ngà bo tròn nổi lên cố định để vẫn bấm được menu.
 * - Dưới xl: một thanh Ngà bo tròn cố định (logo · nút đăng ký · nút menu).
 * - Menu toàn màn hình: khung Ngà bo góc, bảng trắng chứa danh sách trang + thẻ ảnh kèm liên hệ.
 */

const MUC = [
  { href: "/", label: "Trang chủ" },
  { href: "/he-cua", label: "Hệ cửa", con: true },
  { href: "/cong-trinh", label: "Công trình" },
  { href: "/nang-luc-xuong", label: "Năng lực & Xưởng" },
  { href: "/danh-cho-kts", label: "Dành cho KTS" },
  { href: "/trai-nghiem", label: "Trải nghiệm" },
  { href: "/lien-he", label: "Liên hệ" },
];

function BieuTuong({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const IconDienThoai = () => (
  <BieuTuong>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </BieuTuong>
);
const IconThu = () => (
  <BieuTuong>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </BieuTuong>
);
const IconViTri = () => (
  <BieuTuong>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </BieuTuong>
);

function MuiTen({ lop = "" }: { lop?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={lop} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function Logo({ lop }: { lop: string }) {
  return (
    <Link href="/" aria-label="WINDUCA — trang chủ" className="block shrink-0">
      {/* Bản màu, nền trong suốt, đặt trên nền Ngà */}
      <Image src={asset("/brand/WINDUCA-ngang-mau-trong.svg")} alt="WINDUCA" width={677} height={102} priority className={lop} />
    </Link>
  );
}

function DieuHuongGiua({ tren, dangO }: { tren: boolean; dangO: (href: string) => boolean }) {
  return (
    <nav aria-label="Điều hướng chính">
      <ul className="flex items-center">
        {MENU.map((m) => {
          const coCon = m.href === "/he-cua";
          const hien = dangO(m.href);
          return (
            <li key={m.href} className="group relative">
              <Link
                href={m.href}
                aria-current={hien ? "page" : undefined}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-[0.8125rem] font-medium transition-colors ${
                  tren
                    ? `text-nga hover:bg-white/10 ${hien ? "bg-white/15" : ""}`
                    : `hover:bg-than-chi/[0.06] ${hien ? "bg-than-chi/[0.06] text-than-chi" : "text-than-chi/80"}`
                }`}
              >
                {m.label}
                {coCon && (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </Link>
              {coCon && (
                <ul className="invisible absolute left-0 top-full z-10 mt-2 w-64 rounded-2xl border border-inox/60 bg-white p-2 opacity-0 shadow-[0_16px_40px_rgba(43,43,45,0.16)] transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {KIEU_CUA.map((k) => (
                    <li key={k.slug}>
                      <Link href={`/he-cua/${k.slug}`} className="block rounded-xl px-4 py-2.5 text-sm text-than-chi/85 hover:bg-than-chi/[0.06] hover:text-than-chi">
                        {k.ten}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Header() {
  const duongDan = usePathname();
  const [daCuon, setDaCuon] = useState(false);
  const [moMenu, setMoMenu] = useState(false);
  const [duongDanMo, setDuongDanMo] = useState(duongDan);

  // Đóng menu khi chuyển trang (so sánh khi render, không setState trong effect)
  if (duongDanMo !== duongDan) {
    setDuongDanMo(duongDan);
    setMoMenu(false);
  }

  useEffect(() => {
    const onScroll = () => setDaCuon(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Khóa cuộn nền và đóng bằng phím Esc khi menu mở
  useEffect(() => {
    if (!moMenu) return;
    const cu = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoMenu(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = cu;
      window.removeEventListener("keydown", onKey);
    };
  }, [moMenu]);

  const dangO = (href: string) => (href === "/" ? duongDan === "/" : duongDan.startsWith(href));

  const nutMenu = (
    <button
      type="button"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-than-chi text-nga transition-colors hover:bg-champagne hover:text-than-chi"
      aria-expanded={moMenu}
      aria-controls="menu-toan-man-hinh"
      aria-label="Mở menu"
      onClick={() => setMoMenu(true)}
    >
      <span className="flex flex-col gap-[5px]">
        <span className="block h-[2px] w-5 bg-current" />
        <span className="block h-[2px] w-5 bg-current" />
        <span className="block h-[2px] w-3.5 bg-current" />
      </span>
    </button>
  );

  return (
    <>
      {/* ===== TỪ xl: header dạng "tai" nằm ở đầu trang, đè lên ảnh hero ===== */}
      <header className="absolute inset-x-0 top-0 z-40 hidden xl:block">
        <div className="relative h-[84px] w-full">
          {/* Tai trái: logo, dính sát góc màn hình */}
          <div className="absolute left-0 top-0 flex h-full w-[280px] items-center rounded-br-[32px] bg-nga pl-12">
            <Logo lop="h-7 w-auto" />
          </div>

          {/* Điều hướng giữa, trên nền đặc của hero */}
          <div className="absolute inset-y-0 left-[280px] right-[352px] flex items-center justify-center">
            <DieuHuongGiua tren dangO={dangO} />
          </div>

          {/* Tai phải: nút hành động, dính sát góc màn hình */}
          <div className="absolute right-0 top-0 flex h-full w-[352px] items-center justify-end gap-2 rounded-bl-[32px] bg-nga pr-5">

            <Link
              href="/trai-nghiem"
              className="inline-flex items-center rounded-full bg-than-chi px-6 py-3 text-[0.8125rem] font-semibold text-nga transition-colors hover:bg-champagne hover:text-than-chi"
            >
              Đăng ký trải nghiệm
            </Link>
            <button
              type="button"
              aria-label="Mở menu"
              aria-expanded={moMenu}
              aria-controls="menu-toan-man-hinh"
              onClick={() => setMoMenu(true)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-than-chi text-nga transition-colors hover:bg-champagne hover:text-than-chi"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-[2px] w-5 bg-current" />
                <span className="block h-[2px] w-5 bg-current" />
                <span className="block h-[2px] w-3.5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== Thanh Ngà bo tròn cố định: luôn hiện dưới xl; từ xl chỉ hiện sau khi cuộn ===== */}
      <div
        className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-300 md:px-6 md:pt-5 ${
          daCuon ? "" : "xl:invisible xl:-translate-y-[160%] xl:opacity-0"
        }`}
      >
        <div
          className={`mx-auto mt-2 flex h-16 max-w-[1420px] items-center justify-between gap-4 rounded-full bg-nga/95 pl-6 pr-2 backdrop-blur-md md:mt-2.5 md:h-[72px] md:pl-8 ${
            daCuon ? "shadow-[0_8px_30px_rgba(43,43,45,0.14)]" : "shadow-none"
          }`}
        >
          <Logo lop="h-6 w-auto md:h-7" />
          <div className="hidden xl:block">
            <DieuHuongGiua tren={false} dangO={dangO} />
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/trai-nghiem"
              className="hidden items-center rounded-full bg-than-chi px-6 py-3 text-[0.8125rem] font-semibold text-nga transition-colors hover:bg-champagne hover:text-than-chi sm:inline-flex"
            >
              Đăng ký trải nghiệm
            </Link>
            {nutMenu}
          </div>
        </div>
      </div>

      {/* ===== MENU TOÀN MÀN HÌNH ===== */}
      {moMenu && (
        <div
          id="menu-toan-man-hinh"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] overflow-y-auto bg-white px-3 py-3 md:px-6 md:py-5"
        >
          <div className="mx-auto flex min-h-full max-w-[1440px] flex-col rounded-[28px] bg-nga p-2 md:rounded-[40px] md:p-2.5">
            {/* Thanh trên: logo · nút Đóng */}
            <div className="flex h-16 items-center justify-between pl-5 pr-1 md:h-[72px] md:pl-8 md:pr-2">
              <Logo lop="h-6 w-auto md:h-7" />
              <button
                type="button"
                aria-label="Đóng menu"
                onClick={() => setMoMenu(false)}
                className="group flex items-center gap-2 rounded-full bg-than-chi py-1 pl-6 pr-1 text-[0.8125rem] font-semibold text-nga transition-colors hover:bg-champagne hover:text-than-chi"
              >
                Đóng
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-nga text-than-chi">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </span>
              </button>
            </div>

            <div className="grid flex-1 gap-2 md:gap-2.5 lg:grid-cols-[1.15fr_1fr]">
              {/* Bảng trắng: danh sách trang */}
              <nav aria-label="Điều hướng chính" className="rounded-[22px] bg-white px-6 py-6 md:rounded-[32px] md:px-12 md:py-10">
                <p className="nhan-muc text-than-chi/60">Điều hướng</p>
                <ul className="mt-4">
                  {MUC.map((m, i) => (
                    <li key={m.href} className="border-b border-inox/60">
                      <Link
                        href={m.href}
                        aria-current={dangO(m.href) ? "page" : undefined}
                        className={`group flex items-baseline gap-4 py-4 transition-colors md:py-5 ${
                          dangO(m.href) ? "text-than-chi" : "text-than-chi/70 hover:text-than-chi"
                        }`}
                      >
                        <span className="w-6 text-xs font-semibold text-than-chi/45">{String(i + 1).padStart(2, "0")}</span>
                        <span className="tieu-de text-[1.6rem] md:text-[2.25rem]">{m.label}</span>
                        <span className="ml-auto self-center text-than-chi opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                          <MuiTen />
                        </span>
                      </Link>
                      {m.con && (
                        <ul className="mb-5 ml-10 flex flex-wrap gap-2">
                          {KIEU_CUA.map((k) => (
                            <li key={k.slug}>
                              <Link
                                href={`/he-cua/${k.slug}`}
                                className="inline-flex rounded-full border border-inox px-4 py-2 text-sm text-than-chi/85 transition-colors hover:border-than-chi hover:bg-than-chi hover:text-nga"
                              >
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

              {/* Thẻ ảnh + liên hệ */}
              <div className="relative min-h-[420px] overflow-hidden rounded-[22px] bg-than-chi md:rounded-[32px]">
                {HERO_ANH && <Image src={HERO_ANH} alt="" fill quality={60} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" aria-hidden="true" />}
                <div className="absolute inset-0 bg-than-chi/20" aria-hidden="true" />
                <div className="absolute inset-x-3 bottom-3 rounded-[22px] bg-nga p-5 md:inset-x-4 md:bottom-4 md:rounded-[26px] md:p-6">
                  <p className="tieu-de text-xl text-than-chi">Liên hệ</p>
                  <ul className="mt-4 space-y-3 text-[0.9rem] text-than-chi/85">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-than-chi/70">
                        <IconViTri />
                      </span>
                      <span>Địa chỉ showroom: [CHỜ XÁC NHẬN]</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-than-chi/70">
                        <IconDienThoai />
                      </span>
                      <a href={HOTLINE_TEL} className="font-medium hover:underline">
                        Hotline: {HOTLINE}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-than-chi/70">
                        <IconThu />
                      </span>
                      <span>Email: [CHỖ TRỐNG]</span>
                    </li>
                  </ul>
                  <Link
                    href="/trai-nghiem"
                    className="group mt-5 inline-flex w-full items-center justify-between gap-4 rounded-full bg-than-chi py-1.5 pl-6 pr-1.5 text-sm font-semibold text-nga transition-colors hover:bg-champagne hover:text-than-chi sm:w-auto"
                  >
                    Đăng ký trải nghiệm
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-nga text-than-chi transition-transform duration-300 group-hover:rotate-45">
                      <MuiTen />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
