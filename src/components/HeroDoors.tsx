import Image from "next/image";
import Link from "next/link";
import { HERO_ANH, HERO_VIDEO } from "@/lib/site";

/**
 * Hero ảnh tràn màn hình (10/11/2026, anh Huy chốt: xoá hết viền, ảnh tràn 4 mép, chữ trong thẻ Ngà).
 * - Ảnh phủ kín 100% khung nhìn, không còn vùng trắng/Ngà bao quanh.
 * - Chữ và nút nằm trong thẻ Ngà bo góc ở góc dưới trái, KHÔNG đặt trực tiếp lên ảnh.
 * - Lớp phủ Than chì phẳng rất nhẹ (không gradient) chỉ để ảnh trầm hơn, sang hơn.
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
    <section id="hero" aria-label="Giới thiệu WINDUCA" className="relative h-svh min-h-[680px] overflow-hidden bg-than-chi">
      {/* ẢNH / VIDEO NỀN — tràn 4 mép */}
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_ANH && <Image src={HERO_ANH} alt="" fill priority quality={60} sizes="100vw" className="object-cover" />}
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
      <div className="absolute inset-0 bg-than-chi/20" aria-hidden="true" />

      {/* THẺ NGÀ chứa chữ — góc dưới trái */}
      <div className="absolute inset-x-3 bottom-3 rounded-[28px] bg-nga p-6 text-than-chi md:inset-x-auto md:bottom-10 md:left-10 md:w-[600px] md:rounded-[36px] md:p-10 xl:bottom-12 xl:left-14">
        <div className="flex items-center gap-4">
          <span className="block h-px w-10 bg-champagne" aria-hidden="true" />
          <p className="nhan-muc text-than-chi/65">Premium Window &amp; Door</p>
        </div>
        <h1 className="tieu-de mt-4 text-[clamp(1.75rem,2.9vw,2.85rem)] [text-wrap:balance]">
          Kiến tạo không gian sống
          <span className="block text-than-chi/60">xứng tầm đẳng cấp</span>
        </h1>
        <p className="mt-4 max-w-md text-[0.9375rem] font-light leading-relaxed text-than-chi/80">
          Hệ thống nhôm cầu cách nhiệt tiêu chuẩn châu Âu. Tận hưởng sự tĩnh lặng và tầm nhìn tràn viền cho biệt thự và penthouse.
        </p>
        <div className="mt-6 flex flex-col items-start gap-3">
          <Link
            href="/trai-nghiem#sample-box"
            className="group inline-flex max-w-full items-center justify-between gap-5 rounded-full bg-than-chi py-2 pl-6 pr-2 text-sm font-semibold text-nga transition-colors hover:bg-champagne hover:text-than-chi"
          >
            Đăng ký trải nghiệm Hộp Mẫu Góc Nhôm tận nơi
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nga text-than-chi transition-transform duration-300 group-hover:rotate-45">
              <MuiTen />
            </span>
          </Link>
          <Link
            href="/trai-nghiem#showroom"
            className="group inline-flex max-w-full items-center justify-between gap-5 rounded-full border border-than-chi/40 py-2 pl-6 pr-2 text-sm font-semibold text-than-chi transition-colors hover:bg-than-chi hover:text-nga"
          >
            Đặt lịch trải nghiệm Showroom thực tế
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:rotate-45">
              <MuiTen />
            </span>
          </Link>
        </div>
      </div>

      {/* Gợi ý cuộn — viên Ngà nhỏ, góc dưới phải */}
      <a
        href="#tuyen-ngon"
        className="absolute bottom-10 right-10 hidden items-center gap-3 rounded-full bg-nga py-1.5 pl-5 pr-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-than-chi transition-colors hover:bg-champagne md:flex xl:bottom-12 xl:right-14"
      >
        Cuộn xuống
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-than-chi text-nga">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </span>
      </a>
    </section>
  );
}
