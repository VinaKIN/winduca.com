"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LeadForm } from "./LeadForm";
import { asset } from "@/lib/asset";
import { NHOM_DOI_TAC, type NhomDoiTac } from "@/lib/doi-tac";

/**
 * Chọn nhóm đối tác (đại lý, nhà thầu, kiến trúc sư) và đăng ký hợp tác. Hai khối dùng chung nhóm đang chọn qua sự kiện
 * "winduca-doitac" và hash trên địa chỉ (#dealer, #contractor, #architect), để các link menu mở đúng nhóm.
 */
const SU_KIEN = "winduca-doitac";

function docHash(): NhomDoiTac["id"] | null {
  const h = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
  return NHOM_DOI_TAC.find((n) => n.id === h)?.id ?? null;
}

function useNhom(): [NhomDoiTac["id"], (id: NhomDoiTac["id"]) => void] {
  const [id, setId] = useState<NhomDoiTac["id"]>("dealer");

  useEffect(() => {
    const t = setTimeout(() => {
      const h = docHash();
      if (h) setId(h);
    }, 0);
    const khiDoi = (e: Event) => setId((e as CustomEvent<NhomDoiTac["id"]>).detail);
    const khiHash = () => {
      const h = docHash();
      if (h) setId(h);
    };
    window.addEventListener(SU_KIEN, khiDoi);
    window.addEventListener("hashchange", khiHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener(SU_KIEN, khiDoi);
      window.removeEventListener("hashchange", khiHash);
    };
  }, []);

  const chon = (n: NhomDoiTac["id"]) => {
    setId(n);
    window.dispatchEvent(new CustomEvent(SU_KIEN, { detail: n }));
  };
  return [id, chon];
}

function Cot({ so, tieuDe, ds, tre }: { so: string; tieuDe: string; ds: string[]; tre: number }) {
  return (
    <div className="anh-doi bg-white p-6 md:p-7" style={{ animationDelay: `${tre}ms` }}>
      <div className="flex items-baseline justify-between gap-3 border-t-2 border-accent pt-4">
        <p className="text-[1.05rem] font-bold">{tieuDe}</p>
        <span className="text-[1.6rem] font-light leading-none text-than-chi/25">{so}</span>
      </div>
      <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-than-chi/85">
        {ds.map((x) => {
          const cho = /\(đang hoàn thiện\)/i.test(x);
          const chu = x.replace(/\s*\(đang hoàn thiện\)/i, "");
          return (
            <li key={x} className="flex items-start gap-3">
              <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
              <span>
                {chu}
                {cho && <em className="ml-2 inline-block rounded-full border border-than-chi/20 px-2 py-0.5 align-middle text-[12px] not-italic text-than-chi/70">Đang hoàn thiện</em>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ChonNhomDoiTac() {
  const [id, chon] = useNhom();
  const n = NHOM_DOI_TAC.find((x) => x.id === id) ?? NHOM_DOI_TAC[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[0.75fr_1.7fr] lg:gap-8">
      <div role="tablist" aria-label="Nhóm đối tác" className="flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] lg:grid lg:grid-rows-3 lg:gap-4 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {NHOM_DOI_TAC.map((x, k) => {
          const dang = id === x.id;
          return (
            <button
              key={x.id}
              id={`tab-${x.id}`}
              type="button"
              role="tab"
              aria-selected={dang}
              aria-controls={x.id}
              onClick={() => chon(x.id)}
              className={`group relative isolate flex min-h-[88px] w-[78%] shrink-0 snap-start items-center gap-4 overflow-hidden rounded-[14px] border p-5 text-left shadow-[0_6px_22px_rgba(15,17,21,0.05)] transition-[border-color,box-shadow,transform] duration-500 sm:w-[46%] lg:w-full ${
                dang ? "border-accent shadow-[0_14px_34px_rgba(227,25,55,0.25)] lg:translate-x-1" : "border-than-chi/15 bg-white hover:border-than-chi/40"
              }`}
            >
              {/* lớp màu trượt từ trái sang khi được chọn */}
              <span
                className={`absolute inset-0 -z-10 origin-left bg-gradient-to-r from-than-chi via-[#4a1620] to-accent transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${dang ? "scale-x-100" : "scale-x-0"}`}
                aria-hidden="true"
              />
              <span className={`text-[2rem] font-light leading-none transition-colors duration-500 ${dang ? "text-white/90" : "text-than-chi/30 group-hover:text-accent"}`}>{String(k + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className={`block text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ${dang ? "text-white/80" : "text-accent"}`}>{x.en}</span>
                <span className={`mt-1 block text-[16px] font-bold leading-snug transition-colors duration-500 ${dang ? "text-white" : "text-than-chi"}`}>{x.ten}</span>
              </span>
              <span className={`ml-auto hidden shrink-0 transition-all duration-500 sm:block ${dang ? "translate-x-0 text-white opacity-100" : "-translate-x-2 text-accent opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} aria-hidden="true">
                →
              </span>
            </button>
          );
        })}
      </div>

      <div id={n.id} role="tabpanel" aria-labelledby={`tab-${n.id}`} className="overflow-hidden rounded-[16px] border border-than-chi/10 bg-white shadow-[0_18px_44px_rgba(15,17,21,0.08)]">
        <div className="relative isolate min-h-[320px] overflow-hidden bg-than-chi md:min-h-[360px]">
          {NHOM_DOI_TAC.map((x) => (
            <Image
              key={x.id}
              src={asset(x.anh)}
              alt={x.id === n.id ? x.ten : ""}
              fill
              quality={65}
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority={x.id === NHOM_DOI_TAC[0].id}
              className={`-z-20 object-cover transition-[opacity,transform,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${x.id === n.id ? "scale-100 opacity-100 blur-0" : "scale-[1.08] opacity-0 blur-md"}`}
              aria-hidden={x.id !== n.id}
            />
          ))}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(18,16,17,0.78)_0%,rgba(18,16,17,0.35)_55%,rgba(120,10,30,0.35)_100%)]" aria-hidden="true" />
          <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
          <i className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-white/70" aria-hidden="true" />
          <i className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-white/70" aria-hidden="true" />
          <span className="pointer-events-none absolute right-6 top-4 hidden select-none text-[clamp(5rem,10vw,9rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.28)] sm:block md:right-10" aria-hidden="true">
            {String(NHOM_DOI_TAC.findIndex((x) => x.id === n.id) + 1).padStart(2, "0")}
          </span>

          {/* thẻ kính nổi */}
          <div key={n.id} className="anh-doi absolute bottom-5 left-5 right-5 rounded-[14px] border border-white/25 bg-white/10 p-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md md:bottom-7 md:left-7 md:right-auto md:max-w-[34rem] md:p-7">
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/80">{n.en}</p>
            <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2.2rem)] font-bold leading-tight">{n.ten}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/90">{n.tomTat}</p>
          </div>
        </div>

        <div key={`ct-${n.id}`} className="grid gap-px bg-than-chi/10 md:grid-cols-3">
          <Cot so="01" tieuDe="Quyền lợi" ds={n.quyenLoi} tre={0} />
          <Cot so="02" tieuDe="Hỗ trợ kỹ thuật" ds={n.kyThuat} tre={90} />
          <Cot so="03" tieuDe="Tài liệu" ds={n.taiLieu} tre={180} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 bg-nga px-6 py-5 md:px-7">
          <p className="text-[14px] text-than-chi/75">Chúng tôi không hỏi ngân sách. Để lại thông tin, chuyên viên sẽ liên hệ.</p>
          <a href="#dang-ky-hop-tac" className="nut nut-chinh">
            Đăng ký hợp tác nhóm này
          </a>
        </div>
      </div>
    </div>
  );
}

export function DangKyDoiTac() {
  const [id, chon] = useNhom();
  const n = NHOM_DOI_TAC.find((x) => x.id === id) ?? NHOM_DOI_TAC[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.5fr] lg:gap-12">
      <div>
        <p className="nhan-muc text-accent">Đăng ký hợp tác</p>
        <h2 className="mt-3 text-[clamp(1.625rem,2.6vw,2.4rem)] font-light leading-[1.15] tracking-[-0.01em]">
          Để lại thông tin, <span className="font-bold">chúng tôi liên hệ lại.</span>
        </h2>
        <p className="mt-3 text-sm text-white/70">Chọn nhóm của bạn. Chúng tôi không hỏi ngân sách.</p>
        <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Nhóm hợp tác">
          {NHOM_DOI_TAC.map((x) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={id === x.id}
              onClick={() => chon(x.id)}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-xs font-bold transition-colors ${id === x.id ? "border-accent bg-accent text-white" : "border-white/30 text-white/80 hover:border-accent"}`}
            >
              {x.ten.split(" và ")[0]}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-[6px] bg-nga p-5 text-than-chi md:p-6">
        <LeadForm key={n.id} loai="lien-he" tone="sang" cot={3} ghiChuMacDinh={`Đăng ký hợp tác, nhóm: ${n.ten}.`} />
      </div>
    </div>
  );
}
