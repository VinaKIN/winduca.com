import Image from "next/image";
import Link from "next/link";
import { FormHaiNhom } from "./FormHaiNhom";
import { MangXaHoi } from "./MangXaHoi";
import { Wrap } from "./ui";
import { asset } from "@/lib/asset";
import { DIA_CHI, EMAIL, HOTLINE, HOTLINE_TEL, MAPS_URL } from "@/lib/site";

/**
 * Chân trang kiểu Winboss (11/11/2026): khối "Trải nghiệm không gian" + form đăng ký tham quan trên ảnh tối,
 * rồi chân trang Than đen: logo lớn, liên kết, liên hệ, khung bản đồ.
 */
function BieuTuong({ children, lop = "mt-0.5 h-5 w-5 shrink-0 text-accent" }: { children: React.ReactNode; lop?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={lop} aria-hidden="true">
      {children}
    </svg>
  );
}

export function Footer() {
  return (
    <footer>
      {/* Đăng ký tham quan */}
      <section className="nen-ky-thuat relative overflow-hidden bg-[#121011]">
        <Image src={asset("/images/hero.jpg")} alt="" fill quality={60} sizes="100vw" className="scale-105 object-cover opacity-30 blur-[4px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e0c0d]/90 via-[#1a1617]/80 to-[#2a1014]/70" aria-hidden="true" />
        <Wrap className="relative py-12 md:py-16">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-white md:rounded-[36px]">
            <div className="bg-than-chi px-6 py-8 text-white md:px-12 md:py-10">
              <div className="grid gap-8 md:grid-cols-[0.9fr_1.3fr] md:items-center">
                <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-[1.12]">
                  Trải nghiệm
                  <span className="block">không gian WINDUCA</span>
                </h2>
                <ul className="grid gap-x-6 gap-y-4 text-[15px] font-medium sm:grid-cols-2">
                  {[
                    { h: HOTLINE_TEL, t: `Hotline: ${HOTLINE}`, ext: false, ic: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /> },
                    { h: `mailto:${EMAIL}`, t: `Email: ${EMAIL}`, ext: false, ic: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>) },
                    { h: MAPS_URL, t: DIA_CHI, ext: true, ic: (<><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>) },
                    { h: MAPS_URL, t: "Xem bản đồ", ext: true, ic: <path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14" /> },
                  ].map((x) => (
                    <li key={x.t}>
                      <a href={x.h} {...(x.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-3 hover:text-white">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform group-hover:scale-110">
                          <BieuTuong lop="h-[18px] w-[18px]">{x.ic}</BieuTuong>
                        </span>
                        <span className="leading-snug">{x.t}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 max-w-2xl text-base font-light text-white/80">
                Tham gia cùng chúng tôi để trải nghiệm hộp mẫu góc nhôm, chạm vào chất liệu và trao đổi với chuyên viên tư vấn.
              </p>
            </div>
            <div className="grid gap-8 px-6 py-8 md:grid-cols-[0.8fr_1.2fr] md:px-12 md:py-10">
              <div>
                <h3 className="text-xl font-bold">Đăng ký tham quan</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-than-chi/70">Chúng tôi liên hệ lại để xác nhận lịch trải nghiệm và giải đáp thắc mắc của anh chị.</p>
              </div>
              <FormHaiNhom />
            </div>
          </div>
        </Wrap>
      </section>

      {/* Chân trang (bố cục kiểu Winboss): trái logo, liên kết, mạng xã hội; phải bản đồ và liên hệ */}
      <div className="bg-than-chi text-white">
        <Wrap className="pb-8 pt-12 md:pt-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <Image
                src={asset("/brand/WINDUCA-chinh-slogan-am-ban-trong.svg")}
                alt="WINDUCA — Premium Window & Door"
                width={220}
                height={190}
                className="h-auto w-56 md:w-64"
              />
              <nav aria-label="Liên kết chân trang" className="mt-10">
                <ul className="grid grid-flow-col grid-cols-2 grid-rows-5 gap-x-6 gap-y-4 text-[17px]">
                  {[
                    ["/", "Trang chủ"],
                    ["/gioi-thieu", "Giới thiệu"],
                    ["/he-cua", "Hệ cửa"],
                    ["/giai-phap", "Giải pháp"],
                    ["/cong-trinh", "Công trình"],
                    ["/hop-tac", "Hợp tác"],
                    ["/tin-tuc", "Kiến thức"],
                    ["/danh-cho-kts", "Dành cho KTS"],
                    ["/lien-he", "Liên hệ"],
                  ].map(([h, t], i) => (
                    <li key={h}>
                      <Link href={h} className={`transition-colors hover:text-accent ${i === 0 ? "font-bold text-white" : "font-light text-white/90"}`}>
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <MangXaHoi lop="mt-10" kieu="dac" />
            </div>

            <div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mở bản đồ chỉ đường tới văn phòng WINDUCA"
                className="group relative block h-[240px] overflow-hidden rounded-[10px] border border-white/10 md:h-[320px]"
              >
                <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
                  <rect width="600" height="320" fill="#1d1a1b" />
                  <g stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1">
                    {Array.from({ length: 11 }, (_, k) => (
                      <path key={`v${k}`} d={`M${k * 60} 0V320`} />
                    ))}
                    {Array.from({ length: 6 }, (_, k) => (
                      <path key={`h${k}`} d={`M0 ${k * 64}H600`} />
                    ))}
                  </g>
                  <g stroke="#ffffff" strokeOpacity="0.2" strokeWidth="6" strokeLinecap="round">
                    <path d="M-10 230C120 210 180 150 300 140S480 110 620 60" />
                    <path d="M120 -10C140 90 210 150 250 330" />
                    <path d="M420 -10C400 80 380 140 400 330" />
                  </g>
                  <g stroke="#ffffff" strokeOpacity="0.1" strokeWidth="3" strokeLinecap="round">
                    <path d="M-10 120C80 120 160 90 240 60S400 20 620 30" />
                    <path d="M-10 290C100 280 220 300 330 270S520 250 620 280" />
                    <path d="M520 -10C500 90 540 200 560 330" />
                  </g>
                  <path d="M-10 190C100 190 210 175 300 140" stroke="#e31937" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="6 6" />
                </svg>
                <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-[4px] bg-than-chi/90 px-4 py-2.5 text-[15px] transition-colors group-hover:bg-accent">
                  Mở trong Maps
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </span>
                <span className="absolute left-[50%] top-[43%] z-10 -translate-x-1/2 -translate-y-full" aria-hidden="true">
                  <svg viewBox="0 0 24 32" width="34" height="44" className="drop-shadow-[0_8px_14px_rgba(227,25,55,0.55)]">
                    <path d="M12 0C5.4 0 0 5.2 0 11.6 0 20 12 32 12 32s12-12 12-20.4C24 5.2 18.6 0 12 0Z" fill="#e31937" />
                    <circle cx="12" cy="11.5" r="4.5" fill="#fff" />
                  </svg>
                </span>
                <span className="absolute bottom-3 right-4 z-10 text-xs text-white/50">Văn phòng WINDUCA</span>
              </a>

              <ul className="mt-8 grid gap-6 text-[17px] font-light sm:grid-cols-[auto_auto_1fr] sm:gap-x-8">
                <li className="flex items-start gap-3">
                  <BieuTuong lop="mt-0.5 h-6 w-6 shrink-0 text-white">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </BieuTuong>
                  <a href={HOTLINE_TEL} className="hover:text-accent">
                    {HOTLINE}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <BieuTuong lop="mt-0.5 h-6 w-6 shrink-0 text-white">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </BieuTuong>
                  <a href={`mailto:${EMAIL}`} className="hover:text-accent">
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <BieuTuong lop="mt-0.5 h-6 w-6 shrink-0 text-white">
                    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </BieuTuong>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="leading-snug hover:text-accent">
                    {DIA_CHI}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-[15px] font-light text-white/75">
            <p>Copyright © 2026 WINDUCA. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pr-16 text-sm">
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-white">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung" className="hover:text-white">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-cookie" className="hover:text-white">
                  Chính sách cookie
                </Link>
              </li>
            </ul>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}
