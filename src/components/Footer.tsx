import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "./LeadForm";
import { Wrap } from "./ui";
import { asset } from "@/lib/asset";
import { HOTLINE, HOTLINE_TEL } from "@/lib/site";

/**
 * Chân trang kiểu Winboss (11/11/2026): khối "Trải nghiệm không gian" + form đăng ký tham quan trên ảnh tối,
 * rồi chân trang Than đen: logo lớn, liên kết, liên hệ, khung bản đồ.
 */
export function Footer() {
  return (
    <footer>
      {/* Đăng ký tham quan */}
      <section className="relative overflow-hidden bg-than-chi">
        <Image src={asset("/images/hero.jpg")} alt="" fill quality={60} sizes="100vw" className="object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-than-chi/70" aria-hidden="true" />
        <Wrap className="relative py-16 md:py-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-white md:rounded-[36px]">
            <div className="bg-than-chi px-6 py-8 text-white md:px-12 md:py-10">
              <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
                <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight">
                  Trải nghiệm
                  <span className="block">không gian WINDUCA</span>
                </h2>
                <ul className="grid gap-3 text-sm sm:grid-cols-2">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <a href={HOTLINE_TEL} className="hover:underline">
                      Hotline: {HOTLINE}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-white/80">Email: [CHỖ TRỐNG]</span>
                  </li>
                  <li className="flex items-center gap-3 sm:col-span-2">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-white/80">Showroom: [CHỜ XÁC NHẬN] địa chỉ và giờ làm việc</span>
                  </li>
                </ul>
              </div>
              <p className="mt-6 max-w-2xl text-sm font-light text-white/70">
                Tham gia cùng chúng tôi để trải nghiệm hộp mẫu góc nhôm, chạm vào chất liệu và trao đổi với chuyên viên tư vấn.
              </p>
            </div>
            <div className="grid gap-8 px-6 py-8 md:grid-cols-[0.8fr_1.2fr] md:px-12 md:py-10">
              <div>
                <h3 className="text-xl font-bold">Đăng ký tham quan</h3>
                <p className="mt-2 text-sm text-than-chi/70">Chúng tôi liên hệ lại để xác nhận lịch trải nghiệm và giải đáp thắc mắc của anh chị.</p>
              </div>
              <LeadForm loai="lien-he" tone="sang" gon />
            </div>
          </div>
        </Wrap>
      </section>

      {/* Chân trang */}
      <div className="bg-than-chi text-white">
        <Wrap className="py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr_1.2fr]">
            <div>
              <Image
                src={asset("/brand/WINDUCA-chinh-slogan-am-ban.svg")}
                alt="WINDUCA — Premium Window & Door"
                width={220}
                height={190}
                className="h-auto w-48 md:w-56"
              />
              <p className="mt-6 max-w-sm text-sm font-light text-white/70">WINDUCA là thương hiệu thuộc VinaKIN Group.</p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="font-bold hover:text-accent">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="/gioi-thieu" className="text-white/80 hover:text-accent">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link href="/he-cua" className="text-white/80 hover:text-accent">
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link href="/hop-tac" className="text-white/80 hover:text-accent">
                    Hợp tác
                  </Link>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <Link href="/cong-trinh" className="text-white/80 hover:text-accent">
                    Công trình
                  </Link>
                </li>
                <li>
                  <Link href="/tin-tuc" className="text-white/80 hover:text-accent">
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link href="/danh-cho-kts" className="text-white/80 hover:text-accent">
                    Dành cho KTS
                  </Link>
                </li>
                <li>
                  <Link href="/lien-he" className="text-white/80 hover:text-accent">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex aspect-[16/8] items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-sm text-white/60">
                Bản đồ showroom: [CHỜ XÁC NHẬN]
              </div>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li>
                  <a href={HOTLINE_TEL} className="hover:text-accent">
                    {HOTLINE}
                  </a>
                </li>
                <li>Email: [CHỖ TRỐNG]</li>
                <li>[CHỖ TRỐNG] Tên pháp nhân · MST · Địa chỉ</li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/60">
            <p>© 2026 WINDUCA.</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
