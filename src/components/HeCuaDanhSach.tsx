"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { CHUC_NANG, HE_CUA_DS, HE_THONG, THONG_SO_THU_TU, type HeCua } from "@/lib/he-cua-du-lieu";
import { phimNhomChon } from "@/lib/phim";

/**
 * Danh sách 43 hệ cửa kiểu Winboss (11/11/2026): 3 bộ lọc Hệ thống · Kết cấu · Chức năng, ô tìm kiếm,
 * thẻ có bản vẽ 2D, bấm thẻ mở cửa sổ chi tiết (bản vẽ + thông số). Không dùng tên hãng hoặc mã sản phẩm.
 */
const TAT_CA = "Tất cả";
const BUOC = 12;
const KET_CAU = [
  { id: "cn", ten: "Có cầu nhiệt" },
  { id: "kcn", ten: "Không cầu nhiệt" },
] as const;

function NhomLoc({ nhan, gt, chon, doi }: { nhan: string; gt: { id: string; ten: string }[]; chon: string; doi: (v: string) => void }) {
  const tatCa = [{ id: TAT_CA, ten: TAT_CA }, ...gt];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-than-chi/70" id={`loc-${nhan}`}>
        {nhan}
      </span>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby={`loc-${nhan}`} onKeyDown={phimNhomChon}>
        {tatCa.map((g) => {
          const b = chon === g.id;
          return (
            <button
              key={g.id}
              type="button"
              role="radio"
              aria-checked={b}
              tabIndex={b ? 0 : -1}
              onClick={() => doi(g.id)}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
                b ? "border-than-chi bg-than-chi text-white" : "border-than-chi/25 text-than-chi/80 hover:border-accent hover:text-accent"
              }`}
            >
              {g.ten}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BanVe({ h, lop }: { h: HeCua; lop: string }) {
  const a = h.banVe[0];
  return a ? (
    <Image src={asset(a)} alt={`Bản vẽ mặt cắt ${h.ten}`} fill quality={75} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className={lop} />
  ) : (
    <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-than-chi/65">Bản vẽ đang được cập nhật</p>
  );
}

function CuaSo({ h, dong }: { h: HeCua; dong: () => void }) {
  const id = useId();
  const [n, setN] = useState(0);
  const hop = useRef<HTMLDivElement>(null);
  const nutDong = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const truoc = document.activeElement as HTMLElement | null;
    const cu = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nutDong.current?.focus();
    const phim = (e: KeyboardEvent) => {
      if (e.key === "Escape") return dong();
      if (e.key !== "Tab" || !hop.current) return;
      const ds = Array.from(hop.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])")).filter((x) => !x.hasAttribute("disabled"));
      if (!ds.length) return;
      const dau = ds[0];
      const cuoi = ds[ds.length - 1];
      if (e.shiftKey && document.activeElement === dau) {
        e.preventDefault();
        cuoi.focus();
      } else if (!e.shiftKey && document.activeElement === cuoi) {
        e.preventDefault();
        dau.focus();
      }
    };
    window.addEventListener("keydown", phim);
    return () => {
      window.removeEventListener("keydown", phim);
      document.body.style.overflow = cu;
      truoc?.focus();
    };
  }, [dong]);

  const ts = THONG_SO_THU_TU.filter((k) => h.thongSo[k]);
  const anh = h.banVe[n];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-than-chi/70 p-4 backdrop-blur-sm" onClick={dong}>
      <div
        ref={hop}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-[12px] bg-white p-5 md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="nhan-muc text-accent">
              {h.heTen}
              {h.cauNhiet ? " · Có cầu nhiệt" : " · Không cầu nhiệt"}
            </p>
            <h3 id={id} className="mt-2 text-2xl font-bold md:text-3xl">
              {h.ten}
            </h3>
            {h.chucNang.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Chức năng">
                {h.chucNang.map((c) => (
                  <li key={c} className="rounded-full border border-than-chi/20 px-3 py-1 text-xs font-medium text-than-chi/80">
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button ref={nutDong} type="button" onClick={dong} aria-label="Đóng" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-than-chi/20 hover:border-accent hover:text-accent">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="dau-goc relative h-[clamp(260px,46svh,460px)] overflow-hidden rounded-[6px] border border-than-chi/10 bg-white">
              {anh ? <Image src={asset(anh)} alt={`Bản vẽ mặt cắt ${h.ten}${h.banVe.length > 1 ? `, hình ${n + 1} trên ${h.banVe.length}` : ""}`} fill quality={75} sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" /> : <BanVe h={h} lop="" />}
            </div>
            {h.banVe.length > 1 && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Chọn hình bản vẽ">
                {h.banVe.map((_, k) => (
                  <li key={k}>
                    <button
                      type="button"
                      aria-label={`Bản vẽ ${k + 1}`}
                      aria-current={k === n}
                      onClick={() => setN(k)}
                      className={`h-11 min-w-11 rounded-full border px-3 text-sm font-bold ${k === n ? "border-accent bg-accent text-white" : "border-than-chi/25 hover:border-accent hover:text-accent"}`}
                    >
                      {k + 1}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-than-chi/70">Thông số kỹ thuật</h4>
            {ts.length > 0 ? (
              <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-than-chi/15 bg-than-chi/15">
                {ts.map((k) => (
                  <div key={k} className="bg-white p-4">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-than-chi/70">{k}</dt>
                    <dd className="mt-1 text-sm font-semibold">{h.thongSo[k]}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-3 rounded-[6px] border border-dashed border-than-chi/30 p-4 text-sm text-than-chi/70">Thông số đang chờ xác nhận. Liên hệ để nhận hồ sơ kỹ thuật.</p>
            )}
            {h.ghiChu && <p className="mt-3 text-sm text-than-chi/75">{h.ghiChu}</p>}
            <p className="mt-4 text-xs leading-relaxed text-than-chi/70">
              Số liệu tham khảo do nhà sản xuất công bố, thay đổi theo kích thước và cấu hình. Liên hệ chuyên viên để xác nhận cho công trình của bạn.
            </p>
            <Link href="/#dang-ky" className="nut nut-chinh mt-5">
              Nhận hộp mẫu góc nhôm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeCuaDanhSach() {
  const [he, setHe] = useState(TAT_CA);
  const [kc, setKc] = useState(TAT_CA);
  const [cn, setCn] = useState(TAT_CA);
  const [tim, setTim] = useState("");
  const [mo, setMo] = useState<HeCua | null>(null);
  const [soLuong, setSoLuong] = useState(BUOC);
  const doi = (f: (v: string) => void) => (v: string) => {
    f(v);
    setSoLuong(BUOC);
  };

  const ds = useMemo(() => {
    const q = tim.trim().toLowerCase();
    return HE_CUA_DS.filter(
      (h) =>
        (he === TAT_CA || h.he === he) &&
        (kc === TAT_CA || (kc === "cn") === h.cauNhiet) &&
        (cn === TAT_CA || h.chucNang.includes(cn)) &&
        (q === "" || `${h.ten} ${h.heTen} ${h.chucNang.join(" ")}`.toLowerCase().includes(q)),
    );
  }, [he, kc, cn, tim]);

  const dem = (id: string) => HE_CUA_DS.filter((h) => h.he === id).length;
  const dangLoc = he !== TAT_CA || kc !== TAT_CA || cn !== TAT_CA || tim.trim() !== "";

  return (
    <div>
      <div className="grid gap-4 rounded-2xl bg-nga p-4 md:p-5">
        <NhomLoc nhan="Hệ thống" gt={HE_THONG.map((x) => ({ id: x.id, ten: `${x.ten} (${dem(x.id)})` }))} chon={he} doi={doi(setHe)} />
        <NhomLoc nhan="Kết cấu" gt={KET_CAU.map((x) => ({ ...x }))} chon={kc} doi={doi(setKc)} />
        <NhomLoc nhan="Chức năng" gt={CHUC_NANG.map((x) => ({ id: x, ten: x }))} chon={cn} doi={doi(setCn)} />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-than-chi/10 pt-4">
          <span role="status" aria-live="polite" className="text-sm text-than-chi/75">
            {ds.length} / {HE_CUA_DS.length} hệ cửa
          </span>
          <div className="flex items-center gap-3">
            {dangLoc && (
              <button
                type="button"
                onClick={() => {
                  setHe(TAT_CA);
                  setKc(TAT_CA);
                  setCn(TAT_CA);
                  setTim("");
                  setSoLuong(BUOC);
                }}
                className="text-xs font-bold uppercase tracking-[0.08em] text-accent-text underline underline-offset-4"
              >
                Xóa bộ lọc
              </button>
            )}
            <label className="sr-only" htmlFor="tim-he-cua">
              Tìm hệ cửa
            </label>
            <input
              id="tim-he-cua"
              type="search"
              value={tim}
              onChange={(e) => {
                setTim(e.target.value);
                setSoLuong(BUOC);
              }}
              placeholder="Tìm: lưới, ba lớp, xếp gấp…"
              className="w-52 rounded-full border border-than-chi/25 bg-white px-4 py-2 text-sm outline-none focus:border-accent md:w-64"
            />
          </div>
        </div>
      </div>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ds.slice(0, soLuong).map((h) => (
          <li key={h.slug}>
            <button
              type="button"
              onClick={() => setMo(h)}
              aria-haspopup="dialog"
              className="group dau-goc block h-full w-full overflow-hidden rounded-[6px] border border-than-chi/10 bg-white text-left transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[3/2] border-b border-than-chi/10 bg-white">
                <BanVe h={h} lop="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-5">
                <p className="nhan-muc text-accent">
                  {h.heTen} · {h.cauNhiet ? "Có cầu nhiệt" : "Không cầu nhiệt"}
                </p>
                <h3 className="mt-1 text-lg font-bold leading-snug group-hover:text-accent">{h.ten}</h3>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-than-chi/10 pt-3 text-sm">
                  {(["Áp lực gió", "Độ kín nước", "Độ kín khí", "Cách âm"] as const).map((k) => (
                    <div key={k}>
                      <dt className="text-[11px] uppercase tracking-[0.1em] text-than-chi/65">{k}</dt>
                      <dd className="font-semibold">{h.thongSo[k] ?? <span className="font-normal text-than-chi/60">Chờ xác nhận</span>}</dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-accent-text">
                  Xem bản vẽ và thông số <span aria-hidden="true">→</span>
                </span>
              </div>
            </button>
          </li>
        ))}
        {ds.length === 0 && <li className="text-than-chi/75 sm:col-span-2 lg:col-span-3">Chưa có hệ cửa phù hợp với bộ lọc.</li>}
      </ul>
      {ds.length > soLuong && (
        <div className="mt-8 text-center">
          <button type="button" onClick={() => setSoLuong((n) => n + BUOC)} className="nut nut-vien">
            Xem thêm {Math.min(BUOC, ds.length - soLuong)} hệ cửa ({ds.length - soLuong} còn lại)
          </button>
        </div>
      )}
      {mo && <CuaSo h={mo} dong={() => setMo(null)} />}
    </div>
  );
}
