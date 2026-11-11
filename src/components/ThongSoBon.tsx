import { CHO_XAC_NHAN, THONG_SO_SAN_PHAM, type SanPham } from "@/lib/san-pham";

/** Bốn dòng thông số của một sản phẩm (kiểu thẻ sản phẩm Winboss). */
export function ThongSoBon({ sp, toi = false, lop = "" }: { sp: SanPham; toi?: boolean; lop?: string }) {
  const gt = [sp.apLucGio, sp.kinNuoc, sp.kinKhi, sp.chongTrom];
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-4 text-sm ${lop}`}>
      {THONG_SO_SAN_PHAM.map((ten, i) => (
        <div key={ten}>
          <dt className={`text-[12px] font-bold uppercase tracking-[0.12em] ${toi ? "text-white/70" : "text-than-chi/65"}`}>{ten}</dt>
          <dd className={`mt-1 font-medium leading-snug ${gt[i] === CHO_XAC_NHAN ? (toi ? "text-white/70" : "text-than-chi/65") : ""}`}>{gt[i]}</dd>
        </div>
      ))}
    </dl>
  );
}
