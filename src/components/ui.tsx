import type { ReactNode } from "react";

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1440px] px-5 md:px-10 ${className}`}>{children}</div>;
}

/**
 * Khối trang. Nền trắng là mặc định (anh Huy 09/11/2026):
 *  - "sang": nền trắng
 *  - "nga": nền Ngà (#F4F1EA) xen kẽ
 *  - "toi": nền Than chì — chỉ dành cho khối cần tương phản (ví dụ khung 3D)
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
  const nen = toi ? "bg-than-chi text-nga" : tone === "nga" ? "bg-nga text-than-chi" : "bg-white text-than-chi";
  return (
    <section id={id} className={`${nen} ${className}`}>
      <Wrap className="py-20 md:py-32">
        {nhan && <p className={`nhan-muc ${toi ? "text-champagne" : "text-than-chi/70"}`}>{nhan}</p>}
        {tieuDe && <h2 className="tieu-de mt-4 max-w-3xl text-3xl md:text-5xl">{tieuDe}</h2>}
        {moTa && (
          <p className={`mt-5 max-w-2xl text-base font-light md:text-lg ${toi ? "text-nga/85" : "text-than-chi/80"}`}>
            {moTa}
          </p>
        )}
        {children && <div className={tieuDe || moTa ? "mt-12" : ""}>{children}</div>}
      </Wrap>
    </section>
  );
}

/** Hero ngắn cho trang con (nền Than chì, sẽ nhận ảnh/video khi có) */
export function PageHero({
  nhan,
  tieuDe,
  moTa,
  children,
}: {
  nhan: string;
  tieuDe: string;
  moTa?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-than-chi text-nga">
      {/* lưới 10x10 mờ (chữ ký "bản vẽ sống") */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="luoi-10" width="10%" height="25%" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 0 1000 M 0 0 L 4000 0" fill="none" stroke="#c8c9c6" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#luoi-10)" />
      </svg>
      <Wrap className="relative pb-16 pt-40 md:pb-24 md:pt-52">
        <p className="nhan-muc text-champagne">{nhan}</p>
        <h1 className="tieu-de mt-5 max-w-4xl text-4xl md:text-6xl">{tieuDe}</h1>
        {moTa && <p className="mt-6 max-w-2xl text-base font-light text-nga/85 md:text-lg">{moTa}</p>}
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </Wrap>
    </section>
  );
}

/** Huy hiệu cố định trên ảnh/mục minh họa — không bao giờ ẩn */
export function NhanMinhHoa({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 rounded-sm bg-than-chi/85 px-2 py-1 text-[11px] font-medium text-nga ${className}`}
    >
      Minh họa
    </span>
  );
}

/** Nhãn trạng thái. Champagne CHỈ dùng trên nền tối (brand kit: không dùng làm chữ trên nền sáng). */
export function ChoXacNhan({
  children = "Đang chờ xác nhận",
  tone = "sang",
}: {
  children?: ReactNode;
  tone?: "sang" | "toi";
}) {
  return tone === "toi" ? (
    <span className="text-sm font-medium text-champagne">{children}</span>
  ) : (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-than-chi/80">
      <span className="h-1.5 w-1.5 rotate-45 bg-champagne" aria-hidden="true" />
      {children}
    </span>
  );
}
