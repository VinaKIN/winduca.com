import Image from "next/image";
import { asset } from "@/lib/asset";

export type AnhKhung = { src: string; alt: string; chuThich?: string; viTri?: string };

/** Khung ảnh thống nhất: tỉ lệ cố định, bo góc, dấu góc đỏ, lớp phủ chuyển sắc và nhãn chú thích. */
export function KhungAnh({
  src,
  alt,
  chuThich,
  viTri = "center",
  tyLe = "aspect-[4/3]",
  className = "",
  uuTien = false,
  sizes = "(min-width: 1024px) 45vw, 100vw",
}: AnhKhung & { tyLe?: string; className?: string; uuTien?: boolean; sizes?: string }) {
  return (
    <figure className={`dau-goc group relative overflow-hidden rounded-[6px] bg-than-chi ${tyLe} ${className}`}>
      <Image
        src={asset(src)}
        alt={alt}
        fill
        quality={72}
        sizes={sizes}
        priority={uuTien}
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        style={{ objectPosition: viTri }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-than-chi/55 via-transparent to-than-chi/10" aria-hidden="true" />
      {chuThich && (
        <figcaption className="absolute bottom-3 left-3 z-[3] flex items-center gap-2 rounded-full bg-than-chi/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {chuThich}
        </figcaption>
      )}
    </figure>
  );
}

/** Bố cục hai ảnh chồng lệch: ảnh lớn phía sau, ảnh nhỏ viền trắng phía trước ở góc dưới phải. */
export function KhungAnhChong({ chinh, phu, className = "" }: { chinh: AnhKhung; phu: AnhKhung; className?: string }) {
  return (
    <div className={`relative pb-8 pr-6 sm:pr-10 ${className}`}>
      <KhungAnh {...chinh} tyLe="aspect-[16/10]" />
      <div className="absolute bottom-0 right-0 w-[44%] overflow-hidden rounded-[8px] border-4 border-white shadow-[0_24px_50px_-18px_rgba(35,31,32,0.55)]">
        <KhungAnh {...phu} tyLe="aspect-[4/3]" sizes="(min-width: 1024px) 20vw, 40vw" className="!rounded-none" />
      </div>
    </div>
  );
}
