import Image from "next/image";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import { Hien, NenParallax } from "./HieuUng";
import { KhungAnh } from "./KhungAnh";

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
  gon = false,
}: {
  id?: string;
  tone?: "sang" | "nga" | "toi";
  nhan?: string;
  tieuDe?: string;
  moTa?: string;
  children?: ReactNode;
  className?: string;
  gon?: boolean;
}) {
  const toi = tone === "toi";
  const nen = toi ? "nen-toi text-white" : tone === "nga" ? "nen-nga text-than-chi" : "nen-sang text-than-chi";
  const nhanChu = nhan?.replace(/^\d{2}\s*\/\s*\d{2}\s*·\s*/, "").replace(/^\d{2}\s*·\s*/, "");
  const co = Boolean(nhanChu || tieuDe || moTa);
  return (
    <section id={id} className={`relative overflow-hidden ${nen} ${tone === "sang" ? "luoi-ban-ve" : ""} ${nhanChu ? "muc-so" : ""} ${className}`}>
      <Wrap className={`relative ${gon ? "khoi-doc-gon" : "khoi-doc"}`}>
        {co && (
          <Hien>
            {nhanChu && <p className={`nhan-muc nhan-so ${toi ? "text-accent" : "text-accent"}`}>{nhanChu}</p>}
            {tieuDe && <h2 className="mt-4 max-w-3xl text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">{tieuDe}</h2>}
            {moTa && <p className={`mt-3 max-w-2xl text-base font-light leading-relaxed ${toi ? "text-white/80" : "text-than-chi/75"}`}>{moTa}</p>}
          </Hien>
        )}
        {children && (
          <Hien tre={80} className={co ? (gon ? "mt-6" : "mt-8 md:mt-10") : ""}>
            {children}
          </Hien>
        )}
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
  congNghe = true,
  viTriAnh = "center",
  anhPhai,
  chuThichAnh,
  soAnh,
}: {
  nhan: string;
  tieuDe: string;
  moTa?: string;
  children?: ReactNode;
  anh?: string | null;
  /** Hero kiểu công nghệ: parallax, lưới bản vẽ, dấu góc khung. */
  congNghe?: boolean;
  /** Vị trí cắt ảnh nền (object-position), để giữ khuôn mặt trong khung. */
  viTriAnh?: string;
  /** Ảnh đặt trong khung bên phải (hero chia đôi), thay cho ảnh nền toàn khung. */
  anhPhai?: string;
  chuThichAnh?: string;
  soAnh?: string;
}) {
  return (
    <section className="hero-gradient relative overflow-hidden text-white">
      {anh &&
        !anhPhai &&
        (congNghe ? (
          <NenParallax>
            <Image src={asset(anh)} alt="" fill quality={60} sizes="100vw" className="object-cover" style={{ objectPosition: viTriAnh }} aria-hidden="true" priority />
          </NenParallax>
        ) : (
          <Image src={asset(anh)} alt="" fill quality={60} sizes="100vw" className="object-cover" style={{ objectPosition: viTriAnh }} aria-hidden="true" priority />
        ))}
      <div className="hero-phu absolute inset-0" aria-hidden="true" />
      <div className="hero-anh-sang pointer-events-none absolute inset-0" aria-hidden="true" />
      {congNghe && (
        <>
          <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
          {["left-5 top-24 border-l border-t", "right-5 top-24 border-r border-t", "bottom-5 left-5 border-b border-l", "bottom-5 right-5 border-b border-r"].map((c) => (
            <span key={c} className={`pointer-events-none absolute hidden h-5 w-5 border-accent md:block ${c}`} aria-hidden="true" />
          ))}
        </>
      )}
      <div className="hero-duong-sang pointer-events-none absolute inset-x-0 bottom-0 h-px" aria-hidden="true" />
      <p className="pointer-events-none absolute bottom-4 right-10 hidden items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-white/45 md:flex" aria-hidden="true">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        Premium Window &amp; Door
      </p>
      <Wrap className="relative flex min-h-[46svh] flex-col justify-end pb-10 pt-28 md:min-h-[56svh] md:pb-14 md:pt-36">
        <div className={anhPhai ? "grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14" : "w-full"}>
          <div>
            <p className="nhan-muc text-accent">{nhan}</p>
            <h1 className="mt-3 max-w-4xl text-[clamp(1.875rem,3.6vw,3.25rem)] font-medium uppercase leading-[1.12] tracking-[0.01em] [text-wrap:balance]">{tieuDe}</h1>
            {moTa && <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/85 md:text-lg">{moTa}</p>}
            {children && <div className="mt-6 flex flex-col gap-3 sm:flex-row">{children}</div>}
          </div>
          {anhPhai && (
            <div className="relative w-full max-w-xl lg:max-w-none">
              <div className="absolute inset-x-3 -bottom-3 top-3 -right-3 hidden rounded-[8px] border border-accent/60 sm:block" aria-hidden="true" />
              <KhungAnh src={anhPhai} alt="" chuThich={chuThichAnh} so={soAnh} viTri={viTriAnh} tyLe="aspect-[16/9]" uuTien className="shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]" />
            </div>
          )}
        </div>
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
