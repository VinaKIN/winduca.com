import type { ReactNode } from "react";

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1440px] px-5 md:px-10 ${className}`}>{children}</div>;
}

/**
 * Khối trang. Nền trắng là mặc định (anh Huy 09/11/2026), có lưới kỹ thuật rất mờ:
 *  - "sang": nền trắng
 *  - "nga": nền Ngà (#F4F1EA) xen kẽ
 *  - "toi": nền Than chì — dải tương phản
 * Tiêu đề bố cục kiểu tạp chí: nhãn + vạch Champagne bên trái, tiêu đề bên phải, số thứ tự lớn rỗng ruột làm điểm nhấn.
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
  const nen = toi
    ? "bg-than-chi text-nga nen-luoi-toi"
    : tone === "nga"
      ? "bg-nga text-than-chi nen-luoi"
      : "bg-white text-than-chi nen-luoi";
  const so = nhan?.match(/^(\d{2})/)?.[1];
  const nhanChu = so ? nhan!.replace(/^\d{2}\s*\/\s*\d{2}\s*·\s*/, "").replace(/^\d{2}\s*·\s*/, "") : nhan;
  return (
    <section id={id} className={`relative overflow-hidden ${nen} ${className}`}>
      {so && (
        <span
          aria-hidden="true"
          className={`so-lon pointer-events-none absolute -top-4 right-4 hidden select-none md:block md:right-10 ${toi ? "so-lon-toi" : ""}`}
        >
          {so}
        </span>
      )}
      <Wrap className="relative py-20 md:py-32">
        {(nhan || tieuDe || moTa) && (
          <div className="grid gap-5 md:grid-cols-[14rem_1fr] md:gap-12">
            <div>
              {nhanChu && (
                <>
                  <p className={`nhan-muc ${toi ? "text-champagne" : "text-than-chi/70"}`}>{nhanChu}</p>
                  <div className="mt-4 h-px w-14 bg-champagne" />
                </>
              )}
            </div>
            <div>
              {tieuDe && <h2 className="tieu-de max-w-3xl text-[clamp(1.75rem,3.4vw,3rem)]">{tieuDe}</h2>}
              {moTa && (
                <p className={`mt-5 max-w-2xl text-base font-light md:text-lg ${toi ? "text-nga/80" : "text-than-chi/75"}`}>
                  {moTa}
                </p>
              )}
            </div>
          </div>
        )}
        {children && <div className={nhan || tieuDe || moTa ? "mt-14 md:mt-16" : ""}>{children}</div>}
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
    <section className="relative overflow-hidden bg-than-chi text-nga nen-luoi-toi">
      <Wrap className="relative pb-16 pt-40 md:pb-24 md:pt-52">
        <p className="nhan-muc text-champagne">{nhan}</p>
        <div className="mt-4 h-px w-14 bg-champagne" />
        <h1 className="tieu-de mt-8 max-w-4xl text-[clamp(2rem,5vw,3.75rem)]">{tieuDe}</h1>
        {moTa && <p className="mt-6 max-w-2xl text-base font-light text-nga/80 md:text-lg">{moTa}</p>}
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
