import Image from "next/image";
import Link from "next/link";
import { BanDoChanTrang } from "./BanDoChanTrang";
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
        <Wrap className="relative py-8 md:py-10">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-white md:rounded-[36px]">
            <div className="bg-than-chi px-6 py-6 text-white md:px-12 md:py-8">
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
              <p className="mt-4 max-w-2xl text-base font-light text-white/80">
                Tham gia cùng chúng tôi để trải nghiệm hộp mẫu góc nhôm, chạm vào chất liệu và trao đổi với chuyên viên tư vấn.
              </p>
            </div>
            <div className="grid gap-6 px-6 py-6 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:px-12 md:py-7">
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
      <div className="footer-sau text-white">
        <Wrap className="pb-6 pt-10 md:pt-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div className="flex flex-col gap-4">
              <div className="w-fit">
                <Image
                  src={asset("/brand/WINDUCA-ngang-am-ban-trong.svg")}
                  alt="WINDUCA"
                  width={677}
                  height={102}
                  className="h-auto w-[280px] md:w-[360px]"
                />
                <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.5em] text-white/70 md:text-[13px]">Premium Window &amp; Door</p>
              </div>
              <nav aria-label="Liên kết chân trang">
                <ul className="grid max-w-md grid-flow-col grid-cols-2 grid-rows-3 gap-x-6 gap-y-5 text-[14px] uppercase tracking-[0.18em]">
                  {[
                    ["/", "Trang chủ"],
                    ["/gioi-thieu", "Giới thiệu"],
                    ["/he-cua", "Hệ cửa"],
                    ["/giai-phap", "Giải pháp"],
                    ["/cong-trinh", "Công trình"],
                    ["/hop-tac", "Hợp tác"],
                  ].map(([h, t], i) => (
                    <li key={h}>
                      <Link href={h} className={`link-gach ${i === 0 ? "font-bold text-white" : "font-medium text-white/75"}`}>
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            <ul className="space-y-2.5 text-[16px] font-light">
              <li className="flex items-start gap-3">
                <BieuTuong lop="mt-0.5 h-5 w-5 shrink-0 text-white/90">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </BieuTuong>
                <a href={HOTLINE_TEL} className="hover:text-accent">
                  {HOTLINE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <BieuTuong lop="mt-0.5 h-5 w-5 shrink-0 text-white/90">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </BieuTuong>
                <a href={`mailto:${EMAIL}`} className="hover:text-accent">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <BieuTuong lop="mt-0.5 h-5 w-5 shrink-0 text-white/90">
                  <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </BieuTuong>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="leading-snug hover:text-accent">
                  {DIA_CHI}
                </a>
              </li>
            </ul>
              <MangXaHoi kieu="dac" />
            </div>

            <div>
              <BanDoChanTrang diaChi={DIA_CHI} mapsUrl={MAPS_URL} lop="h-[300px] lg:h-full lg:min-h-[340px]" />

            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-5 text-[15px] font-light text-white/70 before:mb-0 before:block before:h-px before:w-full before:bg-gradient-to-r before:from-white/30 before:via-white/10 before:to-transparent">
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
