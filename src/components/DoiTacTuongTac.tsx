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

function Cot({ tieuDe, ds }: { tieuDe: string; ds: string[] }) {
  return (
    <div>
      <p className="nhan-muc text-accent">{tieuDe}</p>
      <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-than-chi/80">
        {ds.map((x) => (
          <li key={x} className="flex items-start gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChonNhomDoiTac() {
  const [id, chon] = useNhom();
  const n = NHOM_DOI_TAC.find((x) => x.id === id) ?? NHOM_DOI_TAC[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[0.75fr_1.7fr] lg:gap-8">
      <div role="tablist" aria-label="Nhóm đối tác" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-y lg:border-than-chi/15 [&::-webkit-scrollbar]:hidden">
        {NHOM_DOI_TAC.map((x, k) => (
          <button
            key={x.id}
            id={`tab-${x.id}`}
            type="button"
            role="tab"
            aria-selected={id === x.id}
            onClick={() => chon(x.id)}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) chon(x.id);
            }}
            className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2 text-left transition-colors lg:w-full lg:gap-5 lg:rounded-none lg:border-0 lg:border-b lg:border-than-chi/15 lg:px-0 lg:py-4 lg:last:border-b-0 ${id === x.id ? "border-accent text-accent" : "border-than-chi/20 text-than-chi/75 hover:text-than-chi"}`}
          >
            <span className="text-xs font-bold tracking-[0.12em] lg:w-7">{String(k + 1).padStart(2, "0")}</span>
            <span className="text-sm font-semibold uppercase tracking-[0.04em] lg:text-base">{x.ten}</span>
          </button>
        ))}
      </div>

      <div id={n.id} role="tabpanel" aria-labelledby={`tab-${n.id}`} className="dau-goc overflow-hidden rounded-[6px] border border-than-chi/10 bg-white">
        <div className="relative h-[clamp(110px,17svh,160px)] bg-than-chi">
          <Image key={n.anh} src={asset(n.anh)} alt={n.ten} fill quality={65} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-than-chi/55" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{n.en}</p>
            <h3 className="mt-1 text-xl font-bold md:text-2xl">{n.ten}</h3>
          </div>
        </div>
        <div className="p-5 md:p-6">
          <p className="max-w-2xl text-[15px] leading-relaxed text-than-chi/75">{n.tomTat}</p>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            <Cot tieuDe="Quyền lợi" ds={n.quyenLoi} />
            <Cot tieuDe="Hỗ trợ kỹ thuật" ds={n.kyThuat} />
            <Cot tieuDe="Tài liệu" ds={n.taiLieu} />
          </div>
          <a href="#dang-ky-hop-tac" className="nut nut-chinh mt-5">
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
              className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${id === x.id ? "border-accent bg-accent text-white" : "border-white/30 text-white/80 hover:border-accent"}`}
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
