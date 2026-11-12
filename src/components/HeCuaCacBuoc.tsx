"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import { TEN_HANG, type HeCua } from "@/lib/he-cua-du-lieu";
import { HOTLINE, HOTLINE_TEL } from "@/lib/site";

/**
 * Các bước của trang /he-cua (12/11/2026): thanh số 1–5, bấm số nào hiện ngay bước đó, có nút Quay lại / Tiếp theo.
 *  1 Chọn hãng · 2 Chọn loại hệ · 3 Chọn đặc điểm · 4 Xem danh sách (thành phần cũ) · 5 So sánh và tư vấn.
 * Số hệ ở mỗi lựa chọn tính theo các bộ lọc còn lại, nên người xem thấy ngay lựa chọn nào còn kết quả.
 */
export const BUOC = [
  { so: 1, ten: "Hãng", dai: "Chọn hãng", goiY: "Bỏ trống để xem cả ba hãng." },
  { so: 2, ten: "Loại hệ", dai: "Chọn loại hệ", goiY: "Chọn một hoặc nhiều loại hệ cửa." },
  { so: 3, ten: "Đặc điểm", dai: "Chọn đặc điểm", goiY: "Kết cấu và chức năng bạn quan tâm, hoặc tìm theo mã hệ." },
  { so: 4, ten: "Danh sách", dai: "Danh sách hệ cửa", goiY: "Bấm thẻ để xem thông số, tích ô góc thẻ để so sánh." },
  { so: 5, ten: "So sánh", dai: "So sánh và tư vấn", goiY: "Đặt tối đa 3 hệ cạnh nhau hoặc nhận tư vấn." },
] as const;

const ANH_HANG: Record<string, string> = {
  "": "/images/he-cua/mau-goc/civro-xw65-g1.webp",
  romadio: "/images/he-cua/mau-goc/romadio-rd80fd-g1.webp",
  civro: "/images/he-cua/mau-goc/civro-xd65-g1.webp",
  ponzio: "/images/he-cua/mau-goc/ponzio-ws-65-thi-g1.webp",
};

const LOAI_HE: { ma: string; ten: string; anh: string }[] = [
  { ma: "w", ten: "Cửa sổ", anh: "/images/he-cua/mau-goc/civro-xw65-g1.webp" },
  { ma: "d", ten: "Cửa đi", anh: "/images/he-cua/mau-goc/civro-xd65-g1.webp" },
  { ma: "s", ten: "Cửa trượt", anh: "/images/he-cua/mau-goc/civro-pd65-enfini-pro-g1.webp" },
  { ma: "l", ten: "Nâng trượt", anh: "/images/he-cua/mau-goc/romadio-rd120ls-ss-g1.webp" },
  { ma: "f", ten: "Xếp gấp", anh: "/images/he-cua/mau-goc/romadio-rd80fd-g1.webp" },
  { ma: "v", ten: "Vách kính", anh: "/images/he-cua/mau-goc/romadio-rct65-g1.webp" },
];

const KET_CAU = [
  { ma: "t", ten: "Có cầu cách nhiệt", mota: "Khung nhôm có thanh cầu ngăn dẫn nhiệt." },
  { ma: "n", ten: "Không cầu nhiệt", mota: "Khung nhôm liền, gọn nhẹ." },
];
const CHUC_NANG = [
  { ma: "cn", ten: "Cách nhiệt cao", mota: "U-value thấp theo số liệu hãng." },
  { ma: "an", ten: "An ninh cao", mota: "Chống đột nhập từ cấp RC2 trở lên." },
  { ma: "de", ten: "Dễ tiếp cận", mota: "Ngưỡng thấp, dễ đi qua." },
  { ma: "sm", ten: "Thông minh / Có động cơ", mota: "Vận hành bằng động cơ." },
];

export type DemTheo = { hang: Record<string, number>; loai: Record<string, number>; ketCau: Record<string, number>; chucNang: Record<string, number> };

function Tick() {
  return (
    <span className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white shadow-[0_4px_12px_rgba(227,25,55,0.4)]" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 12 5 5 9-10" />
      </svg>
    </span>
  );
}

/* ---------- Thanh số 1–5 ---------- */
export function ThanhBuoc({ buoc, dat, tomTat }: { buoc: number; dat: (b: number) => void; tomTat: string[] }) {
  return (
    <nav aria-label="Các bước chọn hệ cửa" className="rounded-[18px] border border-[#e3e7ec] bg-white/95 px-3 py-4 shadow-[0_10px_34px_rgba(15,17,21,0.06)] md:px-6">
      <ol className="relative grid grid-cols-5 gap-1">
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-[21px] h-px bg-[#dfe3e9]" aria-hidden="true">
          <div className="h-full origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `scaleX(${(buoc - 1) / 4})` }} />
        </div>
        {BUOC.map((b) => {
          const dang = b.so === buoc;
          const qua = b.so < buoc;
          return (
            <li key={b.so} className="relative flex flex-col items-center text-center">
              <button
                type="button"
                onClick={() => dat(b.so)}
                aria-current={dang ? "step" : undefined}
                className="group flex min-h-11 w-full flex-col items-center gap-1.5 outline-none"
              >
                <span
                  className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border text-[15px] font-bold tabular-nums transition-all duration-300 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-than-chi ${
                    dang ? "scale-110 border-accent bg-accent text-white shadow-[0_8px_22px_rgba(227,25,55,0.35)]" : qua ? "border-accent bg-white text-accent" : "border-[#d5dbe3] bg-white text-[#697280] group-hover:border-than-chi group-hover:text-than-chi"
                  }`}
                >
                  {qua ? (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 12 5 5 9-10" />
                    </svg>
                  ) : (
                    b.so
                  )}
                  <span className="sr-only"> bước {b.so}</span>
                </span>
                <span className={`text-[12.5px] font-bold leading-tight transition-colors md:text-[14px] ${dang ? "text-than-chi" : "text-[#4b5563] group-hover:text-than-chi"} ${dang ? "" : "max-sm:hidden"}`}>{b.ten}</span>
                <span className="hidden max-w-[16ch] truncate text-[12px] leading-tight text-[#697280] md:block">{tomTat[b.so - 1]}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ---------- Khung chung của một bước ---------- */
export function KhungBuoc({ buoc, children }: { buoc: number; children: ReactNode }) {
  const b = BUOC[buoc - 1];
  return (
    <section aria-labelledby={`buoc-${buoc}`} className="anh-doi mt-6">
      <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent-text">Bước {buoc} / 5</p>
      <h2 id={`buoc-${buoc}`} className="mt-1.5 text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-tight">
        {b.dai}
      </h2>
      <p className="mt-1.5 text-[15px] text-[#697280]">{b.goiY}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/* ---------- Bước 1: hãng ---------- */
export function BuocHang({ chon, dat, dem }: { chon: string; dat: (h: string) => void; dem: DemTheo }) {
  const ds = [{ ma: "", ten: "Tất cả hãng" }, ...(["romadio", "civro", "ponzio"] as const).map((h) => ({ ma: h as string, ten: TEN_HANG[h] }))];
  return (
    <div role="radiogroup" aria-label="Hãng" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {ds.map((h) => {
        const on = chon === h.ma;
        return (
          <button
            key={h.ma || "tat-ca"}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => dat(h.ma)}
            className={`group relative overflow-hidden rounded-[20px] border bg-white text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,17,21,0.12)] ${on ? "border-accent shadow-[0_18px_44px_rgba(227,25,55,0.18)]" : "border-[#e3e7ec]"}`}
          >
            {on && <Tick />}
            <span className="relative block aspect-[4/3] bg-[radial-gradient(ellipse_at_50%_36%,#ffffff_0%,#f2f5f9_50%,#dfe5ee_100%)]">
              <Image src={asset(ANH_HANG[h.ma])} alt="" fill quality={65} sizes="(min-width: 1024px) 22vw, 46vw" className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.05]" />
            </span>
            <span className="flex items-baseline justify-between gap-3 px-5 py-4">
              <span className="text-[1.15rem] font-bold">{h.ten}</span>
              <span className="text-[13px] tabular-nums text-[#697280]">{dem.hang[h.ma] ?? 0} hệ</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Bước 2: loại hệ (chọn nhiều) ---------- */
export function BuocLoai({ chon, bat, dem }: { chon: string[]; bat: (m: string) => void; dem: DemTheo }) {
  return (
    <div role="group" aria-label="Loại hệ" className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {LOAI_HE.map((l) => {
        const on = chon.includes(l.ma);
        const n = dem.loai[l.ma] ?? 0;
        return (
          <button
            key={l.ma}
            type="button"
            aria-pressed={on}
            disabled={n === 0 && !on}
            onClick={() => bat(l.ma)}
            className={`group relative overflow-hidden rounded-[18px] border bg-white text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,17,21,0.12)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-none ${on ? "border-accent shadow-[0_16px_38px_rgba(227,25,55,0.18)]" : "border-[#e3e7ec]"}`}
          >
            {on && <Tick />}
            <span className="relative block aspect-[1/0.9] bg-[radial-gradient(ellipse_at_50%_36%,#ffffff_0%,#f2f5f9_50%,#dfe5ee_100%)]">
              <Image src={asset(l.anh)} alt="" fill quality={60} sizes="(min-width: 1024px) 14vw, 46vw" className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.06]" />
            </span>
            <span className="block px-4 py-3">
              <span className="block text-[1.02rem] font-bold">{l.ten}</span>
              <span className="block text-[13px] tabular-nums text-[#697280]">{n} hệ</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Bước 3: đặc điểm + tìm kiếm ---------- */
function Chon({ on, tat, ten, mota, n, bam }: { on: boolean; tat: boolean; ten: string; mota: string; n: number; bam: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={tat}
      onClick={bam}
      className={`relative flex min-h-[84px] items-start gap-3 rounded-[16px] border bg-white p-4 text-left transition-[border-color,box-shadow] duration-300 hover:border-than-chi disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-[#e3e7ec] ${on ? "border-accent shadow-[0_12px_30px_rgba(227,25,55,0.16)]" : "border-[#e3e7ec]"}`}
    >
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors ${on ? "border-accent bg-accent text-white" : "border-[#b6bec9]"}`} aria-hidden="true">
        {on && (
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5 9-10" />
          </svg>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-[1rem] font-bold">{ten}</span>
          <span className="text-[13px] tabular-nums text-[#697280]">{n} hệ</span>
        </span>
        <span className="mt-0.5 block text-[13.5px] leading-snug text-[#697280]">{mota}</span>
      </span>
    </button>
  );
}

export function BuocDacDiem({ k, f, bat, dem, q, doiQ }: { k: string[]; f: string[]; bat: (nhom: "k" | "f", m: string) => void; dem: DemTheo; q: string; doiQ: (v: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">Kết cấu</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {KET_CAU.map((x) => (
            <Chon key={x.ma} on={k.includes(x.ma)} tat={(dem.ketCau[x.ma] ?? 0) === 0 && !k.includes(x.ma)} ten={x.ten} mota={x.mota} n={dem.ketCau[x.ma] ?? 0} bam={() => bat("k", x.ma)} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">Chức năng</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {CHUC_NANG.map((x) => (
            <Chon key={x.ma} on={f.includes(x.ma)} tat={(dem.chucNang[x.ma] ?? 0) === 0 && !f.includes(x.ma)} ten={x.ten} mota={x.mota} n={dem.chucNang[x.ma] ?? 0} bam={() => bat("f", x.ma)} />
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="tim-ma-he" className="mb-2.5 block text-[12px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">
          Hoặc tìm theo mã hệ
        </label>
        <input
          id="tim-ma-he"
          type="search"
          value={q}
          onChange={(e) => doiQ(e.target.value)}
          placeholder="Ví dụ: XW98, WS 75 THI, RD80FD"
          className="min-h-11 w-full max-w-md rounded-[12px] border border-[#e3e7ec] bg-white px-4 text-[15px] outline-none focus:border-than-chi"
        />
      </div>
    </div>
  );
}

/* ---------- Bước 5: so sánh và tư vấn ---------- */
export function BuocSoSanh({ ds, bo, moBang, veDanhSach }: { ds: HeCua[]; bo: (r: HeCua) => void; moBang: () => void; veDanhSach: () => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div>
        {ds.length === 0 ? (
          <div className="rounded-[18px] border border-dashed border-[#c3cad4] bg-white/70 p-8 text-center">
            <p className="text-[1.1rem] font-bold">Chưa chọn hệ nào để so sánh</p>
            <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-[#697280]">Quay lại bước 4, tích ô vuông ở góc thẻ hoặc bấm &quot;So sánh&quot; trong hộp thông số để đặt tối đa 3 hệ cạnh nhau.</p>
            <button type="button" onClick={veDanhSach} className="nut nut-dac mt-5">
              Về danh sách
            </button>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-3">
            {ds.map((r) => (
              <li key={r.id} className="relative overflow-hidden rounded-[18px] border border-[#e3e7ec] bg-white">
                <span className="relative block aspect-[1/0.9] bg-[radial-gradient(ellipse_at_50%_36%,#ffffff_0%,#f2f5f9_50%,#dfe5ee_100%)]">
                  {r.anh.c[0] && <Image src={asset(r.anh.c[0])} alt="" fill quality={60} sizes="(min-width: 1024px) 18vw, 30vw" className="object-contain p-2" />}
                </span>
                <span className="block px-4 py-3">
                  <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-[#697280]">{TEN_HANG[r.hang]}</span>
                  <span className="mt-0.5 block text-[1.05rem] font-bold leading-snug">{r.ma}</span>
                  <button type="button" onClick={() => bo(r)} className="mt-2 min-h-11 text-[13px] text-[#697280] underline underline-offset-4 hover:text-than-chi">
                    Bỏ khỏi so sánh
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="rounded-[18px] border border-[#e3e7ec] bg-white p-6">
        <h3 className="text-[1.15rem] font-bold">Bước tiếp theo</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#697280]">Số liệu do hãng công bố, mang tính tham khảo. Chuyên viên WINDUCA giúp chọn đúng hệ theo bản vẽ và cấu hình công trình.</p>
        <div className="mt-5 flex flex-col gap-3">
          <button type="button" onClick={moBang} disabled={ds.length < 2} className="nut nut-chinh disabled:opacity-50">
            Mở bảng so sánh {ds.length > 1 ? `(${ds.length} hệ)` : ""}
          </button>
          <Link href="/lien-he" className="nut nut-dac">
            Nhận tư vấn
          </Link>
          <a href={HOTLINE_TEL} className="nut nut-vien-sang">
            Gọi {HOTLINE}
          </a>
        </div>
      </div>
    </div>
  );
}
