import Image from "next/image";
import Link from "next/link";
import { HERO_ANH, HERO_VIDEO } from "@/lib/site";

/**
 * Hero ảnh tràn màn hình (10/11/2026, anh Huy chốt: xoá hết viền, ảnh tràn 4 mép; kiểu căn giữa).
 * - Ảnh phủ kín 100% khung nhìn, không còn vùng trắng/Ngà bao quanh.
 * - Chữ căn giữa kiểu Winboss (11/11/2026): tiêu đề hoa, dòng phụ 3 ý định tính, 2 nút viên thuốc; lớp phủ phẳng 35%.
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
      <div className="absolute inset-0 bg-than-chi/35" aria-hidden="true" />

      {/* CHỮ CĂN GIỮA — kiểu Winboss: gọn, sáng, ảnh lộ rõ */}
      <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-[11svh] text-center text-white md:pb-[13svh]">
        <h1 className="tieu-de max-w-5xl text-[clamp(1.6rem,3.5vw,3.5rem)] uppercase [text-shadow:0_2px_24px_rgba(43,43,45,0.45)] [text-wrap:balance]">
          Kiến tạo không gian sống
          <span className="block">xứng tầm đẳng cấp</span>
        </h1>
        <p className="mt-4 text-[0.8125rem] font-light uppercase tracking-[0.12em] text-white/95 [text-shadow:0_1px_14px_rgba(43,43,45,0.5)] md:mt-5 md:text-base">
          Nhôm cầu cách nhiệt · Tiêu chuẩn châu Âu · Kính hộp
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4">
          <Link
            href="/he-cua"
            className="group inline-flex items-center gap-4 rounded-full bg-white py-1.5 pl-7 pr-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-than-chi transition-colors hover:bg-nga"
          >
            Khám phá ngay
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-champagne text-than-chi transition-transform duration-300 group-hover:translate-x-0.5">
              <MuiTen />
            </span>
          </Link>
          <Link
            href="/lien-he"
            className="group inline-flex items-center gap-4 rounded-full border border-white/80 py-1.5 pl-7 pr-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-white hover:text-than-chi"
          >
            Liên hệ nhận thông tin
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-0.5">
              <MuiTen />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
