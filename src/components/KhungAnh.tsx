import Image from "next/image";
import { asset } from "@/lib/asset";

/** diem: điểm đánh dấu đỏ trên ảnh (toạ độ % trong khung) kèm nhãn ngắn, như chú thích trên bản vẽ. */
export type AnhKhung = {
  src: string;
  alt: string;
  chuThich?: string;
  viTri?: string;
  so?: string;
  diem?: { x: string; y: string; nhan: string };
};

/**
 * Khung ảnh "Blueprint Luxury" (10/11/2026): viền kim loại bạc mảnh, thước kẻ trên đỉnh, số FIG, điểm đánh dấu đỏ,
 * tông màu ấm đồng nhất để ảnh nhiều nguồn trông cùng một bộ, vệt sáng quét khi rê chuột.
 */
export function KhungAnh({
  src,
  alt,
  chuThich,
  viTri = "center",
  so,
  diem,
  tyLe = "aspect-[4/3]",
  className = "",
  uuTien = false,
  tran = false,
  sizes = "(min-width: 1024px) 45vw, 100vw",
}: AnhKhung & { tyLe?: string; className?: string; uuTien?: boolean; tran?: boolean; sizes?: string }) {
  return (
    <div className={`${tran ? "" : "khung-kim-loai rounded-[9px] p-px"} ${className}`}>
      <figure className={`dau-goc group relative overflow-hidden ${tran ? "" : "rounded-[8px]"} bg-than-chi ${tyLe}`}>
        <Image
          src={asset(src)}
          alt={alt}
          fill
          quality={72}
          sizes={sizes}
          priority={uuTien}
          className="anh-dong-bo object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: viTri }}
        />
        <div className="anh-am pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-than-chi/60 via-transparent to-than-chi/25" aria-hidden="true" />
        <div className="anh-thuoc" aria-hidden="true" />
        <div className="anh-quet" aria-hidden="true" />
        {so && (
          <span className="absolute left-3 top-4 z-[3] text-[10px] tracking-[0.22em] text-white/75" aria-hidden="true">
            {so}
          </span>
        )}
        {diem && (
          <span className="absolute z-[3] flex items-center gap-2" style={{ left: diem.x, top: diem.y }}>
            <span className="diem-do" aria-hidden="true" />
            <span className="hidden items-center gap-2 sm:flex" aria-hidden="true">
              <span className="h-px w-8 bg-accent" />
              <span className="rounded-[3px] bg-than-chi/75 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">{diem.nhan}</span>
            </span>
          </span>
        )}
        {chuThich && (
          <figcaption className="absolute bottom-3 left-3 z-[3] flex items-center gap-2 rounded-full bg-than-chi/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {chuThich}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

/** Hai ảnh chồng lệch: ảnh lớn phía sau, ảnh nhỏ viền trắng phía trước ở góc dưới phải. */
export function KhungAnhChong({ chinh, phu, className = "", vienToi = false }: { chinh: AnhKhung; phu: AnhKhung; className?: string; vienToi?: boolean }) {
  return (
    <div className={`relative pb-8 pr-6 sm:pr-10 ${className}`}>
      <KhungAnh {...chinh} tyLe="aspect-[16/10]" />
      <div className={`absolute bottom-0 right-0 w-[44%] overflow-hidden rounded-[8px] border-4 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)] ${vienToi ? "border-[#2a2627]" : "border-white"}`}>
        <KhungAnh {...phu} tyLe="aspect-[4/3]" sizes="(min-width: 1024px) 20vw, 40vw" tran />
      </div>
    </div>
  );
}
