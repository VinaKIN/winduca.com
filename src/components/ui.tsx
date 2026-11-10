import Image from "next/image";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";

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
      <Wrap className="relative py-16 md:py-24">
        {(nhanChu || tieuDe || moTa) && (
          <div>
            {nhanChu && <p className="nhan-muc text-accent">{nhanChu}</p>}
            {tieuDe && <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-light leading-[1.15]">{tieuDe}</h2>}
            {moTa && <p className={`mt-5 max-w-2xl text-base font-light md:text-lg ${toi ? "text-white/80" : "text-than-chi/75"}`}>{moTa}</p>}
          </div>
        )}
        {children && <div className={nhanChu || tieuDe || moTa ? "mt-12 md:mt-14" : ""}>{children}</div>}
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
}: {
  nhan: string;
  tieuDe: string;
  moTa?: string;
  children?: ReactNode;
  anh?: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-than-chi text-white">
      {anh && <Image src={asset(anh)} alt="" fill quality={60} sizes="100vw" className="object-cover" aria-hidden="true" priority />}
      <div className="absolute inset-0 bg-than-chi/70" aria-hidden="true" />
      <Wrap className="relative pb-16 pt-40 md:pb-24 md:pt-56">
        <p className="nhan-muc text-accent">{nhan}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(1.9rem,4.4vw,3.5rem)] font-bold uppercase leading-[1.12] [text-wrap:balance]">{tieuDe}</h1>
        {moTa && <p className="mt-6 max-w-2xl text-base font-light text-white/85 md:text-lg">{moTa}</p>}
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
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
