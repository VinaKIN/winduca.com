"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";
import { DIA_CHI, EMAIL, HERO_ANH, HOTLINE, HOTLINE_TEL, MENU_CHINH } from "@/lib/site";

/**
 * Header kiểu Winboss (11/11/2026): hai nút tròn trắng (gọi, thư) bên trái · logo giữa · nút ba gạch bên phải.
 * Nằm trên ảnh/đầu trang, hóa nền Than đen khi cuộn. Bấm ba gạch mở menu toàn màn hình (5 mục theo mẫu).
 */

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

function NutTron({ href, nhan, children }: { href: string; nhan: string; children: ReactNode }) {
  const ngoai = href.startsWith("tel:") || href.startsWith("mailto:");
  const lop =
    "flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent transition-colors hover:bg-accent hover:text-white md:h-14 md:w-14";
  return ngoai ? (
    <a href={href} aria-label={nhan} className={lop}>
      {children}
    </a>
  ) : (
    <Link href={href} aria-label={nhan} className={lop}>
      {children}
    </Link>
  );
}

function Logo({ lop, tren }: { lop: string; tren: boolean }) {
  return (
    <Link href="/" aria-label="WINDUCA — trang chủ" className="block shrink-0 py-2">
      <Image
        src={asset(tren ? "/brand/WINDUCA-ngang-am-ban-trong.svg" : "/brand/WINDUCA-ngang-mau-trong.svg")}
        alt="WINDUCA"
        width={677}
        height={102}
        priority
        className={lop}
      />
    </Link>
  );
}

export function Header() {
  const duongDan = usePathname();
  const [moMenu, setMoMenu] = useState(false);
  const [mucMo, setMucMo] = useState<number | null>(null);
  const nutMo = useRef<HTMLButtonElement>(null);
  const hopThoai = useRef<HTMLDivElement>(null);
  const coHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const [duongDanMo, setDuongDanMo] = useState(duongDan);

  // Đóng menu khi chuyển trang (so sánh khi render, không setState trong effect)
  if (duongDanMo !== duongDan) {
    setDuongDanMo(duongDan);
    setMoMenu(false);
  }

  // Khóa cuộn nền và đóng bằng phím Esc khi menu mở
  useEffect(() => {
    if (!moMenu) return;
    const cu = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Đưa focus vào hộp thoại (nút Đóng), giữ focus trong hộp thoại khi bấm Tab, trả focus về nút mở khi đóng
    const nutMoHienTai = nutMo.current;
    window.setTimeout(() => hopThoai.current?.querySelector<HTMLElement>("[data-dau-tien]")?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoMenu(false);
        return;
      }
      if (e.key !== "Tab" || !hopThoai.current) return;
      const ds = Array.from(hopThoai.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((el) => el.offsetParent !== null);
      if (ds.length === 0) return;
      const dau = ds[0];
      const cuoi = ds[ds.length - 1];
      if (e.shiftKey && document.activeElement === dau) {
        e.preventDefault();
        cuoi.focus();
      } else if (!e.shiftKey && document.activeElement === cuoi) {
        e.preventDefault();
        dau.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      nutMoHienTai?.focus();
      document.body.style.overflow = cu;
      window.removeEventListener("keydown", onKey);
    };
  }, [moMenu]);

  const dangO = (href: string) => (href === "/" ? duongDan === "/" : duongDan.startsWith(href));

  return (
    <>
      <header className={`absolute inset-x-0 top-0 z-50 ${duongDan === "/" ? "bg-transparent" : "bg-than-chi"}`}>
        <div className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:h-[90px] md:px-10">
          <div className="flex items-center gap-2 md:gap-4">
            <NutTron href={HOTLINE_TEL} nhan={`Gọi hotline ${HOTLINE}`}>
              <IconDienThoai />
            </NutTron>
            <NutTron href="/lien-he" nhan="Gửi liên hệ">
              <IconThu />
            </NutTron>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo lop="h-5 w-auto md:h-9" tren />
          </div>

          <button
            type="button"
            className="flex h-12 w-12 flex-col items-center justify-center gap-[7px]"
            aria-expanded={moMenu}
            aria-controls={moMenu ? "menu-toan-man-hinh" : undefined}
            aria-label="Mở menu"
            ref={nutMo}
            onClick={() => setMoMenu(true)}
          >
            <span className="block h-[2px] w-8 bg-white" />
            <span className="block h-[2px] w-8 bg-white" />
            <span className="block h-[2px] w-8 bg-white" />
          </button>
        </div>
      </header>

      {/* ===== MENU TOÀN MÀN HÌNH ===== */}
      {moMenu && (
        <div
          id="menu-toan-man-hinh"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          ref={hopThoai}
          className="fixed inset-0 z-[60] overflow-y-auto bg-white px-3 py-3 md:px-6 md:py-5"
        >
          <div className="mx-auto flex min-h-full max-w-[1440px] flex-col rounded-[28px] bg-nga p-2 md:rounded-[40px] md:p-2.5">
            {/* Thanh trên: logo · nút Đóng */}
            <div className="flex h-16 items-center justify-between pl-5 pr-1 md:h-[72px] md:pl-8 md:pr-2">
              <Logo lop="h-6 w-auto md:h-7" tren={false} />
              <button
                type="button"
                aria-label="Đóng menu"
                data-dau-tien="true"
                onClick={() => setMoMenu(false)}
                className="group flex items-center gap-2 rounded-full bg-than-chi py-1 pl-6 pr-1 text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-accent"
              >
                Đóng
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </span>
              </button>
            </div>

            <div className="grid flex-1 gap-2 md:gap-2.5 lg:grid-cols-[1.15fr_1fr]">
              {/* Bảng trắng: danh sách trang */}
              <nav aria-label="Điều hướng chính" className="flex flex-col justify-center rounded-[22px] bg-white px-6 py-6 md:rounded-[32px] md:px-14 md:py-10">
                <ul>
                  {MENU_CHINH.map((m, i) => {
                    const mo = mucMo === i;
                    return (
                      <li
                        key={m.label}
                        className={`py-3 md:py-4 ${i > 0 ? "border-t border-inox/60" : ""}`}
                        onMouseEnter={() => {
                          if (coHover()) setMucMo(m.con ? i : null);
                        }}
                      >
                        <div className="flex items-center gap-5 text-than-chi">
                          <span className="w-6 text-xs font-bold tracking-[0.12em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                          <Link href={m.href} className="tieu-de text-[1.15rem] font-bold uppercase tracking-[0.02em] transition-colors hover:text-accent md:text-[1.45rem]">
                            {m.label}
                          </Link>
                          {m.con && (
                            <button
                              type="button"
                              aria-expanded={mo}
                              aria-controls={`muc-con-${i}`}
                              aria-label={`${mo ? "Thu gọn" : "Mở"} mục ${m.label}`}
                              onClick={() => setMucMo(mo ? null : i)}
                              className="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-accent transition-colors hover:bg-accent/10"
                            >
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                                <path d="M5 12h14" />
                                <path d="M12 5v14" className={`origin-center transition-transform duration-300 ${mo ? "scale-y-0" : "scale-y-100"}`} />
                              </svg>
                            </button>
                          )}
                        </div>
                        {m.con && (
                          <div id={`muc-con-${i}`} className={`grid transition-[grid-template-rows] duration-300 ${mo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                            <ul className="flex flex-wrap gap-x-6 gap-y-2 overflow-hidden pl-11 pt-0 aria-hidden:invisible" aria-hidden={!mo}>
                              {m.con.map((c) => (
                                <li key={c.label} className={mo ? "pt-3" : ""}>
                                  <Link
                                    href={c.href}
                                    tabIndex={mo ? 0 : -1}
                                    aria-current={dangO(c.href) ? "page" : undefined}
                                    className={`text-sm transition-colors hover:text-accent ${dangO(c.href) ? "font-bold text-accent" : "text-than-chi/65"}`}
                                  >
                                    {c.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Thẻ ảnh + liên hệ */}
              <div className="relative min-h-[420px] overflow-hidden rounded-[22px] bg-than-chi md:rounded-[32px]">
                {HERO_ANH && <Image src={HERO_ANH} alt="" fill quality={60} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" aria-hidden="true" />}
                <div className="absolute inset-0 bg-than-chi/20" aria-hidden="true" />
                <div className="absolute inset-x-3 bottom-3 rounded-[22px] bg-nga p-5 md:inset-x-4 md:bottom-4 md:rounded-[26px] md:p-6">
                  <p className="tieu-de text-xl font-bold text-than-chi">Liên hệ</p>
                  <ul className="mt-4 space-y-3 text-[0.9rem] text-than-chi/85">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-accent">
                        <IconViTri />
                      </span>
                      <span>Địa chỉ: {DIA_CHI}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-accent">
                        <IconDienThoai />
                      </span>
                      <a href={HOTLINE_TEL} className="font-medium hover:underline">
                        Hotline: {HOTLINE}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-accent">
                        <IconThu />
                      </span>
                      <a href={`mailto:${EMAIL}`} className="hover:underline">Email: {EMAIL}</a>
                    </li>
                  </ul>
                  <Link
                    href="/trai-nghiem"
                    className="group mt-5 inline-flex w-full items-center justify-between gap-4 rounded-full bg-than-chi py-1.5 pl-6 pr-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-accent sm:w-auto"
                  >
                    Đăng ký trải nghiệm
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:rotate-45">
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
