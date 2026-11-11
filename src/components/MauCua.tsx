"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { HANG, MAU_CUA, type MauCua as Mau } from "@/lib/mau-cua";
import { THONG_SO_BANG } from "@/lib/site";

/** Mẫu cửa theo hãng: lọc theo hãng, bấm một mẫu mở cửa sổ có 3 tab Bản vẽ · Mẫu gốc · Thông số (dữ liệu chờ catalog). */
type Tab = "ban-ve" | "mau-goc" | "thong-so";

function Khung({ anh, nhan }: { anh: string | null; nhan: string }) {
  return (
    <div className="dau-goc relative flex h-[clamp(200px,36svh,340px)] items-center justify-center overflow-hidden rounded-[6px] border border-dashed border-than-chi/30 bg-nga">
      {anh ? (
        <Image src={asset(anh)} alt={nhan} fill quality={70} sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
      ) : (
        <p className="max-w-xs px-6 text-center text-sm text-than-chi/65">{nhan}: đang chờ tài liệu từ catalog.</p>
      )}
    </div>
  );
}

function CuaSo({ mau, dong }: { mau: Mau; dong: () => void }) {
  const [tab, setTab] = useState<Tab>("ban-ve");

  useEffect(() => {
    const phim = (e: KeyboardEvent) => e.key === "Escape" && dong();
    window.addEventListener("keydown", phim);
    const cu = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", phim);
      document.body.style.overflow = cu;
    };
  }, [dong]);

  const TABS: [Tab, string][] = [
    ["ban-ve", "Bản vẽ"],
    ["mau-goc", "Mẫu gốc"],
    ["thong-so", "Thông số"],
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-than-chi/70 p-4 backdrop-blur-sm" onClick={dong}>
      <div role="dialog" aria-modal="true" aria-label={`${mau.hang} ${mau.ten}`} onClick={(e) => e.stopPropagation()} className="max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-[12px] bg-white p-5 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="nhan-muc text-accent">{mau.hang}</p>
            <h3 className="mt-2 text-2xl font-bold">{mau.ten}</h3>
          </div>
          <button type="button" onClick={dong} aria-label="Đóng" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-than-chi/20 hover:border-accent hover:text-accent">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div role="tablist" aria-label="Thông tin mẫu" className="mt-5 flex gap-2">
          {TABS.map(([id, ten]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${tab === id ? "border-accent bg-accent text-white" : "border-than-chi/25 hover:border-accent hover:text-accent"}`}
            >
              {ten}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {tab === "ban-ve" && <Khung anh={mau.banVe} nhan="Bản vẽ" />}
          {tab === "mau-goc" && <Khung anh={mau.mauGoc} nhan="Mẫu gốc" />}
          {tab === "thong-so" && (
            <dl className="grid gap-px overflow-hidden rounded-[6px] border border-than-chi/15 bg-than-chi/15 sm:grid-cols-2">
              {THONG_SO_BANG.map((ten) => (
                <div key={ten} className="bg-white p-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.14em] text-than-chi/65">{ten}</dt>
                  <dd className="mt-1 text-sm font-semibold">{mau.thongSo[ten] ?? <span className="font-normal text-than-chi/65">Đang chờ xác nhận</span>}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <p className="mt-4 text-xs text-than-chi/65">Tên hãng và dòng mẫu cần được xác nhận quyền sử dụng trước khi công bố chính thức.</p>
      </div>
    </div>
  );
}

export function MauCua() {
  const [hang, setHang] = useState<string>("Tất cả");
  const [mo, setMo] = useState<Mau | null>(null);
  const ds = MAU_CUA.filter((m) => hang === "Tất cả" || m.hang === hang);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Lọc theo hãng">
        {["Tất cả", ...HANG].map((h) => (
          <button
            key={h}
            type="button"
            aria-pressed={hang === h}
            onClick={() => setHang(h)}
            className={`rounded-full border px-5 py-2 text-xs font-bold transition-colors ${hang === h ? "border-accent bg-accent text-white" : "border-than-chi/25 hover:border-accent hover:text-accent"}`}
          >
            {h}
          </button>
        ))}
        <span className="ml-2 text-xs text-than-chi/65">{ds.length} mẫu</span>
      </div>

      <ul className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible lg:grid-cols-3">
        {ds.map((m, i) => (
          <li key={m.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <button
              type="button"
              onClick={() => setMo(m)}
              className="group dau-goc relative block h-full w-full rounded-[6px] border border-than-chi/10 bg-white p-6 text-left transition-shadow hover:shadow-lg"
            >
              <span className="so-lon !text-[3rem] ![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="nhan-muc mt-3 text-accent">{m.hang}</p>
              <h3 className="mt-1 text-xl font-bold group-hover:text-accent">{m.ten}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-than-chi/70">{m.moTa}</p>
              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.08em] text-accent">Xem bản vẽ · mẫu gốc · thông số</span>
            </button>
          </li>
        ))}
      </ul>
      {mo && <CuaSo mau={mo} dong={() => setMo(null)} />}
    </div>
  );
}
