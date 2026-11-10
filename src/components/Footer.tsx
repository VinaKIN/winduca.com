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
      <section className="relative overflow-hidden bg-than-chi">
        <Image src={asset("/images/hero.jpg")} alt="" fill quality={60} sizes="100vw" className="object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-than-chi/70" aria-hidden="true" />
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

      {/* Chân trang */}
      <div className="bg-than-chi text-white">
        <Wrap className="py-10 md:py-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.1fr_1.4fr_1.2fr] lg:gap-10">
            <div>
              <Image
                src={asset("/brand/WINDUCA-chinh-slogan-am-ban-trong.svg")}
                alt="WINDUCA — Premium Window & Door"
                width={220}
                height={190}
                className="h-auto w-36 md:w-40"
              />
              <p className="mt-4 max-w-xs text-sm font-light text-white/70">Giải pháp cửa nhôm kính kiến trúc cao cấp, đồng bộ từ hệ nhôm đến thi công.</p>
              <MangXaHoi lop="mt-5" />
            </div>

            <nav aria-label="Liên kết chân trang">
              <p className="nhan-muc text-accent">Khám phá</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
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
                ].map(([h, t]) => (
                  <li key={h}>
                    <Link href={h} className="text-white/80 transition-colors hover:text-accent">
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="nhan-muc text-accent">Liên hệ</p>
              <ul className="mt-4 space-y-3 text-sm text-white/85">
                <li className="flex items-start gap-3">
                  <BieuTuong>
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </BieuTuong>
                  <a href={HOTLINE_TEL} className="hover:text-accent">
                    {HOTLINE}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <BieuTuong>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </BieuTuong>
                  <a href={`mailto:${EMAIL}`} className="hover:text-accent">
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <BieuTuong>
                    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </BieuTuong>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {DIA_CHI}
                  </a>
                </li>
              </ul>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[9rem] flex-col items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 text-center text-sm text-white/80 transition-colors hover:border-accent hover:text-white"
            >
              <BieuTuong lop="h-7 w-7 text-accent">
                <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </BieuTuong>
              <span className="font-bold uppercase tracking-[0.08em] text-accent">Xem bản đồ</span>
              <span className="text-xs text-white/60">Chỉ đường tới văn phòng</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5 text-xs text-white/60">
            <p>© 2026 WINDUCA.</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pr-16">
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
