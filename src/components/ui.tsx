import Image from "next/image";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import { NenParallax } from "./HieuUng";

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1440px] px-5 md:px-10 ${className}`}>{children}</div>;
}

/**
 * Khối trang (kiểu Winboss, 11/11/2026): nhãn đỏ nhỏ ở trên, tiêu đề Roboto Light căn trái.
 *  - "sang": nền trắng · "nga": nền Ngà · "toi": nền Than đen
 * Nhãn có thể ghi dạng "03 / 09 · Tên" (số thứ tự cũ sẽ bị bỏ).
 */
export function Section({
  id,
  tone = "sang",
  nhan,
  tieuDe,
  moTa,
  children,
  className = "",
}: {
  id?: string;
  tone?: "sang" | "nga" | "toi";
  nhan?: string;
  tieuDe?: string;
  moTa?: string;
  children?: ReactNode;
  className?: string;
}) {
  const toi = tone === "toi";
  const nen = toi ? "bg-than-chi text-white" : tone === "nga" ? "bg-nga text-than-chi" : "bg-white text-than-chi";
  const nhanChu = nhan?.replace(/^\d{2}\s*\/\s*\d{2}\s*·\s*/, "").replace(/^\d{2}\s*·\s*/, "");
  return (
    <section id={id} className={`relative overflow-hidden ${nen} ${className}`}>
      <Wrap className="relative py-8 md:py-10">
        {(nhanChu || tieuDe || moTa) && (
          <div>
            {nhanChu && <p className="nhan-muc text-accent">{nhanChu}</p>}
            {tieuDe && <h2 className="mt-3 max-w-3xl text-[clamp(1.5rem,2.6vw,2.25rem)] font-light leading-[1.15] tracking-[-0.01em]">{tieuDe}</h2>}
            {moTa && <p className={`mt-3 max-w-2xl text-base font-light ${toi ? "text-white/80" : "text-than-chi/75"}`}>{moTa}</p>}
          </div>
        )}
        {children && <div className={nhanChu || tieuDe || moTa ? "mt-6 md:mt-8" : ""}>{children}</div>}
      </Wrap>
    </section>
  );
}

/** Hero cho trang con: ảnh tối + lớp phủ phẳng, nhãn đỏ, tiêu đề hoa đậm (kiểu Winboss) */
export function PageHero({
  nhan,
  tieuDe,
  moTa,
  children,
  anh = "/images/hero.jpg",
  congNghe = false,
}: {
  nhan: string;
  tieuDe: string;
  moTa?: string;
  children?: ReactNode;
  anh?: string | null;
  /** Hero kiểu công nghệ: parallax, lưới bản vẽ, dấu góc khung. */
  congNghe?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-than-chi text-white">
      {anh &&
        (congNghe ? (
          <NenParallax>
            <Image src={asset(anh)} alt="" fill quality={60} sizes="100vw" className="object-cover" aria-hidden="true" priority />
          </NenParallax>
        ) : (
          <Image src={asset(anh)} alt="" fill quality={60} sizes="100vw" className="object-cover" aria-hidden="true" priority />
        ))}
      <div className="absolute inset-0 bg-than-chi/70" aria-hidden="true" />
      {congNghe && (
        <>
          <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
          {["left-5 top-24 border-l border-t", "right-5 top-24 border-r border-t", "bottom-5 left-5 border-b border-l", "bottom-5 right-5 border-b border-r"].map((c) => (
            <span key={c} className={`pointer-events-none absolute hidden h-5 w-5 border-accent md:block ${c}`} aria-hidden="true" />
          ))}
        </>
      )}
      <Wrap className="relative pb-8 pt-28 md:pb-10 md:pt-36">
        <p className="nhan-muc text-accent">{nhan}</p>
        <h1 className="mt-3 max-w-4xl text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium uppercase leading-[1.15] tracking-[0.01em] [text-wrap:balance]">{tieuDe}</h1>
        {moTa && <p className="mt-4 max-w-2xl text-base font-light text-white/85">{moTa}</p>}
        {children && <div className="mt-6 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </Wrap>
    </section>
  );
}

/** Huy hiệu "Minh họa" trên ảnh: anh Huy yêu cầu bỏ hiển thị (10/11/2026). Giữ hàm để các nơi gọi không phải sửa. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NhanMinhHoa(_props: { className?: string }) {
  return null;
}

/** Nhãn trạng thái chờ xác nhận */
export function ChoXacNhan({
  children = "Đang chờ xác nhận",
  tone = "sang",
}: {
  children?: ReactNode;
  tone?: "sang" | "toi";
}) {
  return tone === "toi" ? (
    <span className="text-sm font-medium text-white/70">{children}</span>
  ) : (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-than-chi/80">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
