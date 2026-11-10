import Image from "next/image";
import Link from "next/link";
import { HERO_ANH, HERO_VIDEO } from "@/lib/site";

/**
 * Hero khung bo góc (theo mẫu tham chiếu 10/11/2026).
 * - Nền Trắng, ảnh nằm trong khung bo góc lớn; thanh header Ngà nổi phía trên ảnh.
 * - Lớp phủ Than chì phẳng nhẹ (không gradient) chỉ đủ để chữ đọc rõ, ảnh vẫn sáng.
 * - Hai tấm cửa Ngà trượt mở sang hai phía khi tải trang (1 lần, CSS thuần).
 *   Tôn trọng prefers-reduced-motion: cửa mở sẵn, không hoạt ảnh.
 */

function MuiTen({ lop = "" }: { lop?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={lop} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function HeroDoors() {
  return (
    <section id="hero" aria-label="Giới thiệu WINDUCA" className="bg-white px-3 pb-3 pt-3 md:px-6 md:pb-6 md:pt-5">
      <div className="relative mx-auto h-[calc(100svh-1.5rem)] min-h-[620px] max-w-[1440px] overflow-hidden rounded-[28px] bg-than-chi md:h-[calc(100svh-2.75rem)] md:rounded-[40px]">
        {/* ẢNH / VIDEO NỀN */}
        <div className="absolute inset-0" aria-hidden="true">
          {HERO_ANH && <Image src={HERO_ANH} alt="" fill priority quality={60} sizes="(min-width: 1440px) 1392px, 100vw" className="object-cover" />}
          {HERO_VIDEO && (
            <video
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
              src={HERO_VIDEO}
              poster={HERO_ANH ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}
        </div>

        {/* Lớp phủ phẳng, nhẹ */}
        <div className="absolute inset-0 bg-than-chi/40" aria-hidden="true" />

        {/* HAI TẤM CỬA mở khi tải */}
        <div className="pointer-events-none absolute inset-0 flex" aria-hidden="true">
          <div className="hero-cua hero-cua-trai relative h-full w-1/2 border-r border-inox bg-nga">
            <span className="absolute right-6 top-1/2 h-24 w-[3px] -translate-y-1/2 bg-champagne" />
          </div>
          <div className="hero-cua hero-cua-phai relative h-full w-1/2 border-l border-inox bg-nga">
            <span className="absolute left-6 top-1/2 h-24 w-[3px] -translate-y-1/2 bg-champagne" />
          </div>
        </div>

        {/* CHỮ — góc dưới trái */}
        <div className="hero-hien absolute inset-x-0 bottom-0">
          <div className="px-6 pb-8 md:px-14 md:pb-14">
            <div className="flex items-center gap-4">
              <span className="block h-px w-10 bg-champagne md:w-14" aria-hidden="true" />
              <p className="nhan-muc text-champagne">Premium Window &amp; Door</p>
            </div>
            <h1 className="tieu-de mt-5 max-w-6xl text-[clamp(2rem,4.8vw,4.25rem)] text-white [text-shadow:0_2px_28px_rgba(43,43,45,0.35)] [text-wrap:balance]">
              <span className="block">Kiến tạo không gian sống</span>
              <span className="block text-champagne">xứng tầm đẳng cấp</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-light text-white/95 [text-shadow:0_1px_16px_rgba(43,43,45,0.4)] md:text-lg">
              Hệ thống nhôm cầu cách nhiệt tiêu chuẩn châu Âu. Tận hưởng sự tĩnh lặng và tầm nhìn tràn viền cho biệt thự và penthouse.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/trai-nghiem#sample-box"
                className="group inline-flex items-center justify-between gap-5 rounded-full bg-nga py-2 pl-6 pr-2 text-sm font-semibold text-than-chi transition-colors hover:bg-champagne"
              >
                Đăng ký trải nghiệm Hộp Mẫu Góc Nhôm tận nơi
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-than-chi text-nga transition-transform duration-300 group-hover:rotate-45">
                  <MuiTen />
                </span>
              </Link>
              <Link
                href="/trai-nghiem#showroom"
                className="group inline-flex items-center justify-between gap-5 rounded-full border border-white/70 py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-than-chi"
              >
                Đặt lịch trải nghiệm Showroom thực tế
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:rotate-45">
                  <MuiTen />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Gợi ý cuộn */}
        <a
          href="#tuyen-ngon"
          className="hero-hien absolute bottom-8 right-10 hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white md:flex md:bottom-14 md:right-14"
        >
          Cuộn xuống
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
