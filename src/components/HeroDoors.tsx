import Image from "next/image";
import Link from "next/link";
import { HERO_ANH, HERO_VIDEO } from "@/lib/site";

/**
 * Hero tràn màn hình (10/11/2026, theo góp ý "tràn ra ngoài vùng trắng, chữ không đè nền").
 * - Nền Than chì đặc + lưới kỹ thuật rất mờ; KHÔNG có chữ nằm trên ảnh.
 * - Từ lg: cột chữ bên trái trên nền đặc, bảng ảnh bên phải tràn sát mép phải và mép dưới, bo góc trên trái.
 * - Dưới lg: chữ ở trên, bảng ảnh bên dưới, tràn hai bên.
 * - Không có hiệu ứng đóng/mở cửa (đã bỏ theo yêu cầu 10/11/2026).
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
    <section id="hero" aria-label="Giới thiệu WINDUCA" className="relative isolate overflow-hidden bg-than-chi text-nga nen-luoi-toi lg:h-svh lg:min-h-[680px]">
      <div className="flex min-h-svh flex-col lg:block lg:h-full lg:min-h-0">
        {/* CỘT CHỮ — trên nền đặc */}
        <div className="relative z-10 px-6 pb-10 pt-28 md:px-12 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[52%] lg:flex-col lg:justify-center lg:px-12 lg:pb-0 lg:pt-[100px] xl:px-16">
          <div>
            <div className="flex items-center gap-4">
              <span className="block h-px w-10 bg-champagne md:w-14" aria-hidden="true" />
              <p className="nhan-muc text-champagne">Premium Window &amp; Door</p>
            </div>
            <h1 className="tieu-de mt-5 text-[clamp(2rem,3.2vw,3.25rem)] text-white [text-wrap:balance]">
              Kiến tạo không gian sống
              <span className="block text-champagne">xứng tầm đẳng cấp</span>
            </h1>
            <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-nga/85">
              Hệ thống nhôm cầu cách nhiệt tiêu chuẩn châu Âu. Tận hưởng sự tĩnh lặng và tầm nhìn tràn viền cho biệt thự và penthouse.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3">
              <Link
                href="/trai-nghiem#sample-box"
                className="group inline-flex max-w-full items-center justify-between gap-5 rounded-full bg-nga py-2 pl-6 pr-2 text-sm font-semibold text-than-chi transition-colors hover:bg-champagne"
              >
                Đăng ký trải nghiệm Hộp Mẫu Góc Nhôm tận nơi
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-than-chi text-nga transition-transform duration-300 group-hover:rotate-45">
                  <MuiTen />
                </span>
              </Link>
              <Link
                href="/trai-nghiem#showroom"
                className="group inline-flex max-w-full items-center justify-between gap-5 rounded-full border border-nga/50 py-2 pl-6 pr-2 text-sm font-semibold text-nga transition-colors hover:bg-nga hover:text-than-chi"
              >
                Đặt lịch trải nghiệm Showroom thực tế
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:rotate-45">
                  <MuiTen />
                </span>
              </Link>
            </div>
          </div>

          <a
            href="#tuyen-ngon"
            className="absolute bottom-8 left-14 hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-nga/80 transition-colors hover:text-champagne lg:flex xl:left-20"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-nga/40">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </span>
            Cuộn xuống
          </a>
        </div>

        {/* BẢNG ẢNH — tràn sát mép phải và mép dưới */}
        <div className="relative h-[52svh] min-h-[340px] overflow-hidden rounded-t-[28px] bg-than-chi lg:absolute lg:bottom-0 lg:left-[52%] lg:right-0 lg:top-[100px] lg:h-auto lg:min-h-0 lg:rounded-t-none lg:rounded-tl-[40px]">
          <div className="absolute inset-0" aria-hidden="true">
            {HERO_ANH && <Image src={HERO_ANH} alt="" fill priority quality={60} sizes="(min-width: 1024px) 54vw, 100vw" className="object-cover" />}
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
        </div>
      </div>
    </section>
  );
}
