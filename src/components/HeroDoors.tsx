import Image from "next/image";
import Link from "next/link";
import { HERO_ANH, HERO_VIDEO } from "@/lib/site";

/**
 * Hero ảnh tràn màn hình (10/11/2026, anh Huy chốt: xoá hết viền, ảnh tràn 4 mép; hướng C: dải kính tối ngang đáy).
 * - Ảnh phủ kín 100% khung nhìn, không còn vùng trắng/Ngà bao quanh.
 * - Chữ, 3 ý định tính và 2 nút nằm trong dải kính Than chì bo góc ở đáy, KHÔNG đặt trực tiếp lên ảnh.
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

      {/* DẢI KÍNH TỐI ngang đáy màn hình — chữ không đè lên ảnh */}
      <div className="absolute inset-x-3 bottom-3 md:inset-x-8 md:bottom-8 xl:inset-x-12 xl:bottom-10">
        <div className="relative overflow-hidden rounded-[24px] border border-nga/15 bg-than-chi/85 px-6 py-6 text-nga backdrop-blur-xl md:rounded-[32px] md:px-10 md:py-8 lg:grid lg:grid-cols-[minmax(0,1.5fr)_auto_auto] lg:items-center lg:gap-12 xl:gap-16 xl:px-14">
          {/* Cột 1: nhãn + tiêu đề + mô tả */}
          <div>
            <div className="flex items-center gap-4">
              <span className="block h-px w-10 bg-champagne" aria-hidden="true" />
              <p className="nhan-muc text-champagne">Premium Window &amp; Door</p>
            </div>
            <h1 className="tieu-de mt-3 text-[clamp(1.6rem,2.7vw,2.7rem)]">
              Kiến tạo không gian sống
              <span className="block text-champagne">xứng tầm đẳng cấp</span>
            </h1>
          </div>

          {/* Cột 2: 3 ý ngắn định tính (không có số liệu chưa xác nhận) */}
          <ul className="mt-5 hidden space-y-3 border-l border-nga/20 pl-8 text-sm text-nga/90 lg:mt-0 lg:block">
            {["Nhôm cầu cách nhiệt", "Tiêu chuẩn châu Âu", "Kính hộp"].map((y, i) => (
              <li key={y} className="flex items-center gap-4">
                <span className="w-6 text-[11px] font-semibold tracking-[0.12em] text-champagne">{String(i + 1).padStart(2, "0")}</span>
                {y}
              </li>
            ))}
          </ul>

          {/* Cột 3: hai nút */}
          <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-0 lg:flex-col lg:items-stretch">
            <Link
              href="/he-cua"
              className="group inline-flex items-center justify-between gap-4 rounded-full bg-champagne py-1.5 pl-6 pr-1.5 text-sm font-semibold text-than-chi transition-colors hover:bg-nga"
            >
              Khám phá ngay
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-than-chi text-nga transition-transform duration-300 group-hover:rotate-45">
                <MuiTen />
              </span>
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-nga/40 px-6 text-sm font-semibold text-nga transition-colors hover:bg-nga hover:text-than-chi"
            >
              Liên hệ nhận thông tin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
