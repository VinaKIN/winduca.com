"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";
import { HOTLINE, HOTLINE_TEL, KIEU_CUA } from "@/lib/site";

/**
 * Header kiểu Winboss: hai nút tròn (gọi, thư) bên trái · logo ở giữa · nút menu bên phải.
 * Bấm menu mở lớp phủ toàn màn hình: danh sách trang bên trái, thông tin liên hệ bên phải.
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
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

function NutTron({ href, nhan, children }: { href: string; nhan: string; children: ReactNode }) {
  const lienKetNgoai = href.startsWith("tel:") || href.startsWith("mailto:");
  const lop =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white text-than-chi transition-colors hover:bg-champagne md:h-14 md:w-14";
  return lienKetNgoai ? (
    <a href={href} aria-label={nhan} className={lop}>
      {children}
    </a>
  ) : (
    <Link href={href} aria-label={nhan} className={lop}>
      {children}
    </Link>
  );
}

function Logo({ lop }: { lop: string }) {
  return (
    <Link href="/" aria-label="WINDUCA — trang chủ" className="block">
      {/* Bản âm bản trong suốt (cắt sát logo) — chữ Ngà trên nền tối */}
      <Image src={asset("/brand/WINDUCA-ngang-am-ban-trong.svg")} alt="WINDUCA" width={677} height={102} priority className={lop} />
    </Link>
  );
}

export function Header() {
  const duongDan = usePathname();
  const [daCuon, setDaCuon] = useState(false);
  const [moMenu, setMoMenu] = useState(false);
  const [moHeCua, setMoHeCua] = useState(false);
  const [duongDanMo, setDuongDanMo] = useState(duongDan);

  // Đóng menu khi chuyển trang (so sánh khi render, không setState trong effect)
  if (duongDanMo !== duongDan) {
    setDuongDanMo(duongDan);
    setMoMenu(false);
  }

  useEffect(() => {
    const onScroll = () => setDaCuon(window.scrollY > 40);
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

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${daCuon ? "bg-than-chi/95" : "bg-transparent"}`}>
        <div className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:h-28 md:px-10">
          <div className="flex items-center gap-3 md:gap-4">
            <NutTron href={HOTLINE_TEL} nhan={`Gọi hotline ${HOTLINE}`}>
              <IconDienThoai />
            </NutTron>
            <NutTron href="/lien-he" nhan="Gửi liên hệ">
              <IconThu />
            </NutTron>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo lop="h-7 w-auto md:h-10" />
          </div>

          <button
            type="button"
            className="flex h-12 w-12 flex-col items-center justify-center gap-[7px]"
            aria-expanded={moMenu}
            aria-controls="menu-toan-man-hinh"
            aria-label="Mở menu"
            onClick={() => setMoMenu(true)}
          >
            <span className="block h-[2px] w-8 bg-white" />
            <span className="block h-[2px] w-8 bg-white" />
            <span className="block h-[2px] w-8 bg-white" />
          </button>
        </div>
      </header>

      {moMenu && (
        <div
          id="menu-toan-man-hinh"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] overflow-y-auto bg-than-chi text-nga"
        >
          <div className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:h-28 md:px-10">
            <div className="flex items-center gap-3 md:gap-4">
              <NutTron href={HOTLINE_TEL} nhan={`Gọi hotline ${HOTLINE}`}>
                <IconDienThoai />
              </NutTron>
              <NutTron href="/lien-he" nhan="Gửi liên hệ">
                <IconThu />
              </NutTron>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <Logo lop="h-7 w-auto md:h-10" />
            </div>
            <button
              type="button"
              aria-label="Đóng menu"
              onClick={() => setMoMenu(false)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-inox/70 text-than-chi transition-colors hover:bg-white"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" />
              </svg>
            </button>
          </div>

          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-16 pt-8 md:grid-cols-[1fr_1.1fr_1.2fr] md:px-10 md:pt-12">
            {/* biểu tượng vương miện lớn mờ, kiểu Winboss */}
            <div className="hidden items-start justify-center md:flex" aria-hidden="true">
              <Image src={asset("/brand/WINDUCA-bieu-tuong-am-ban-trong.svg")} alt="" width={400} height={260} className="w-64 opacity-[0.16]" />
            </div>

            <nav aria-label="Điều hướng chính">
              <ul className="space-y-5 md:space-y-6">
                {MUC.map((m) => (
                  <li key={m.href}>
                    <div className="flex items-center gap-4">
                      <Link
                        href={m.href}
                        className={`tieu-de text-2xl transition-colors hover:text-champagne md:text-[1.7rem] ${
                          dangO(m.href) ? "text-champagne" : "text-white"
                        }`}
                      >
                        {m.label}
                      </Link>
                      {m.con && (
                        <button
                          type="button"
                          aria-expanded={moHeCua}
                          aria-label="Mở danh sách kiểu cửa"
                          onClick={() => setMoHeCua((v) => !v)}
                          className="p-1"
                        >
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${moHeCua ? "rotate-180" : ""}`} aria-hidden="true">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {m.con && moHeCua && (
                      <ul className="mt-4 space-y-3 border-l border-champagne pl-5">
                        {KIEU_CUA.map((k) => (
                          <li key={k.slug}>
                            <Link href={`/he-cua/${k.slug}`} className="text-base text-nga/85 hover:text-champagne">
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

            <div>
              <p className="tieu-de text-2xl text-white">Liên hệ</p>
              <ul className="mt-6 space-y-5 text-[0.95rem]">
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 text-nga/80">
                    <IconViTri />
                  </span>
                  <span className="text-nga/85">Địa chỉ showroom: [CHỜ XÁC NHẬN]</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 text-nga/80">
                    <IconDienThoai />
                  </span>
                  <a href={HOTLINE_TEL} className="hover:text-champagne">
                    Hotline: {HOTLINE}
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 text-nga/80">
                    <IconThu />
                  </span>
                  <span className="text-nga/85">Email: [CHỖ TRỐNG]</span>
                </li>
              </ul>
              <Link href="/trai-nghiem" className="nut nut-chinh mt-10 w-full sm:w-auto">
                Đăng ký trải nghiệm
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
