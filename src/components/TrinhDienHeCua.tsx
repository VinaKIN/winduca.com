"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { GIAI_PHAP } from "@/lib/giai-phap";
import { MAU_NHOM } from "@/lib/site";
import { Wrap } from "./ui";

/**
 * Trải nghiệm hệ cửa (đề xuất 10/11/2026): Color Selector · Opening Experience · Architecture Application.
 * Hình vẽ là SƠ ĐỒ PHẲNG minh họa cách vận hành, KHÔNG phải bản vẽ hay mô hình kỹ thuật của WINDUCA.
 * Mã màu là màu minh họa, mã màu chính thức đang chờ xác nhận.
 */

type Tab = "mau" | "mo" | "khong-gian";
type Pt = [number, number];

const TOP = 20;
const BOT = 240;
const H = BOT - TOP;

/** Cánh cửa dạng hình thang: mép bản lề đủ cao, mép tự do thu nhỏ theo hệ số cao (hiệu ứng phối cảnh). */
function canhPoly(hx: number, fx: number, rHinge: number, rFree: number, top = TOP, h = H): Pt[] {
  const mid = top + h / 2;
  return [
    [hx, mid - (h * rHinge) / 2],
    [fx, mid - (h * rFree) / 2],
    [fx, mid + (h * rFree) / 2],
    [hx, mid + (h * rHinge) / 2],
  ];
}

const pts = (p: Pt[]) => p.map((q) => q.join(",")).join(" ");

/** Một cánh: khung màu + kính trong */
function Canh({ p, mau, kinh = "#cfe2ec", t = 8 }: { p: Pt[]; mau: string; kinh?: string; t?: number }) {
  const [a, b, c, d] = p;
  const rong = Math.abs(b[0] - a[0]);
  const trong: Pt[] = [
    [a[0] + Math.sign(b[0] - a[0]) * t, a[1] + t],
    [b[0] - Math.sign(b[0] - a[0]) * t, b[1] + t],
    [c[0] - Math.sign(c[0] - d[0]) * t, c[1] - t],
    [d[0] + Math.sign(c[0] - d[0]) * t, d[1] - t],
  ];
  return (
    <g>
      <polygon points={pts(p)} fill={mau} stroke="#00000030" strokeWidth="1" />
      {rong > 2 * t + 3 && <polygon points={pts(trong)} fill={kinh} fillOpacity="0.55" stroke="#00000022" strokeWidth="1" />}
    </g>
  );
}

function CuaSvg({ slug, p, mau }: { slug: string; p: number; mau: string }) {
  const a = p * Math.PI * 0.42; // góc mở tối đa ~75°
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const d = 1 - 0.2 * sin;
  const winCua = slug === "cua-so";
  const x0 = winCua ? 110 : 20;
  const x1 = winCua ? 290 : 380;
  const t0 = winCua ? 40 : TOP;
  const hh = winCua ? 180 : H;
  let canh: React.ReactNode = null;

  if (slug === "cua-truot-nang") {
    const nang = -3 * Math.sin(Math.PI * Math.min(1, p * 1.2));
    canh = (
      <>
        <Canh p={[[200, TOP], [380, TOP], [380, BOT], [200, BOT]]} mau={mau} />
        <g transform={`translate(${160 * p},${nang})`}>
          <Canh p={[[20, TOP], [200, TOP], [200, BOT], [20, BOT]]} mau={mau} />
        </g>
      </>
    );
  } else if (slug === "cua-di-mo-quay") {
    canh = (
      <>
        <Canh p={canhPoly(20, 20 + 180 * cos, 1, d)} mau={mau} />
        <Canh p={canhPoly(380, 380 - 180 * cos, 1, d)} mau={mau} />
      </>
    );
  } else if (slug === "cua-xep-truot") {
    const pw = 90 * cos;
    const ra = [0, 1, 2, 3].map((k) => {
      const right = 380 - k * pw;
      const left = right - pw;
      const rR = k % 2 === 0 ? 1 : d;
      const rL = k % 2 === 0 ? d : 1;
      return (
        <Canh key={k} p={[canhPoly(right, left, rR, rL)[0], canhPoly(right, left, rR, rL)[1], canhPoly(right, left, rR, rL)[2], canhPoly(right, left, rR, rL)[3]]} mau={mau} t={6} />
      );
    });
    canh = <>{ra}</>;
  } else {
    canh = <Canh p={canhPoly(x0, x0 + (x1 - x0) * cos, 1, d, t0, hh)} mau={mau} />;
  }

  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label={`Sơ đồ ${slug} đang ${p < 0.05 ? "đóng" : p > 0.95 ? "mở hoàn toàn" : "mở một phần"} (minh họa)`}>
      {/* khung cảnh phía sau: phẳng, không gradient */}
      <rect x="0" y="0" width="400" height="260" fill="#f1ede4" />
      <rect x={x0} y={t0} width={x1 - x0} height={hh} fill="#cfe2ec" />
      <circle cx={x0 + (x1 - x0) * 0.78} cy={t0 + hh * 0.22} r="14" fill="#f4e6b8" />
      <path d={`M${x0} ${t0 + hh * 0.72} L${x0 + (x1 - x0) * 0.3} ${t0 + hh * 0.5} L${x0 + (x1 - x0) * 0.6} ${t0 + hh * 0.68} L${x1} ${t0 + hh * 0.46} L${x1} ${t0 + hh} L${x0} ${t0 + hh} Z`} fill="#a7c1a0" />
      <rect x={x0} y={t0 + hh * 0.84} width={x1 - x0} height={hh * 0.16} fill="#8aa57e" />
      {/* khung cố định */}
      <rect x={x0 - 6} y={t0 - 6} width={x1 - x0 + 12} height={hh + 12} fill="none" stroke={mau} strokeWidth="12" />
      {canh}
    </svg>
  );
}

export function TrinhDienHeCua({ slug, ten, chon, setChon }: { slug: string; ten: string; chon: number; setChon: (i: number) => void }) {
  const [tab, setTab] = useState<Tab>("mau");
  const [p, setP] = useState(0);
  const raf = useRef<number | null>(null);
  const kg = GIAI_PHAP.filter((g) => g.heCua.includes(slug) && g.slug !== "cong-trinh-dac-thu");
  const [kgChon, setKgChon] = useState(0);
  const mau = MAU_NHOM[chon];

  useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  function chay(dich: number) {
    if (raf.current) cancelAnimationFrame(raf.current);
    const tu = p;
    const t0 = performance.now();
    const dai = 1100 * Math.abs(dich - tu) + 150;
    const buoc = (now: number) => {
      const k = Math.min(1, (now - t0) / dai);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; // ease in-out
      setP(tu + (dich - tu) * e);
      if (k < 1) raf.current = requestAnimationFrame(buoc);
    };
    raf.current = requestAnimationFrame(buoc);
  }

  const TABS: [Tab, string][] = [
    ["mau", "Màu hoàn thiện"],
    ["mo", "Đóng / Mở"],
    ["khong-gian", "Không gian"],
  ];
  const g = kg[Math.min(kgChon, Math.max(0, kg.length - 1))];

  return (
    <section className="bg-nga py-10 md:py-14" aria-label="Trải nghiệm hệ cửa">
      <Wrap>
        <p className="nhan-muc text-accent-chu">Trải nghiệm {ten.toLowerCase()}</p>
        <div role="tablist" aria-label="Chế độ xem" className="mt-3 flex flex-wrap gap-2">
          {TABS.map(([id, nhan]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${tab === id ? "border-accent bg-accent text-white" : "border-than-chi/25 hover:border-accent hover:text-accent"}`}
            >
              {nhan}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative h-[clamp(230px,40svh,400px)] overflow-hidden rounded-[20px] border border-than-chi/10 bg-white">
            {tab === "khong-gian" && g ? (
              <Image src={asset(g.anh)} alt={`${ten} trong ${g.ten.toLowerCase()}`} fill quality={70} sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" style={{ objectPosition: g.pos }} />
            ) : (
              <CuaSvg slug={slug} p={tab === "mo" ? p : 0} mau={mau.hex} />
            )}
          </div>

          <div>
            {tab === "mau" && (
              <>
                <h3 className="text-xl font-bold">Chọn màu khung nhôm</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-than-chi/70">
                  Chọn một màu để xem khung cửa đổi theo, cả trong mặt cắt 3D bên dưới. Đây là màu minh họa; mã màu chính thức đang chờ xác nhận.
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Màu khung nhôm">
                  {MAU_NHOM.map((m, i) => (
                    <li key={m.ten}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={chon === i}
                        onClick={() => setChon(i)}
                        className={`flex w-full items-center gap-3 rounded-[14px] border p-3 text-left transition-colors ${chon === i ? "border-accent bg-white" : "border-than-chi/15 hover:border-than-chi/40"}`}
                      >
                        <span className="h-9 w-9 shrink-0 rounded-full border border-than-chi/20" style={{ background: m.hex }} />
                        <span className="text-sm font-semibold">{m.ten}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {tab === "mo" && (
              <>
                <h3 className="text-xl font-bold">Cách {ten.toLowerCase()} vận hành</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-than-chi/70">{MO_TA[slug]}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => chay(1)} className="nut nut-chinh">
                    Mở cửa
                  </button>
                  <button type="button" onClick={() => chay(0)} className="nut nut-vien-sang">
                    Đóng cửa
                  </button>
                </div>
                <label className="mt-5 block text-sm font-medium" htmlFor="muc-mo">
                  Mức mở: {Math.round(p * 100)}%
                </label>
                <input
                  id="muc-mo"
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(p * 100)}
                  onChange={(e) => {
                    if (raf.current) cancelAnimationFrame(raf.current);
                    setP(Number(e.target.value) / 100);
                  }}
                  className="mt-2 w-full accent-[#e31937]"
                />
                <p className="mt-3 text-xs text-than-chi/60">Sơ đồ phẳng minh họa cách vận hành, không phải bản vẽ kỹ thuật.</p>
              </>
            )}

            {tab === "khong-gian" && (
              <>
                <h3 className="text-xl font-bold">Ứng dụng trong kiến trúc</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-than-chi/70">Chọn loại công trình để xem không gian phù hợp với {ten.toLowerCase()}.</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {kg.map((x, i) => (
                    <li key={x.slug}>
                      <button
                        type="button"
                        onClick={() => setKgChon(i)}
                        aria-pressed={kgChon === i}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${kgChon === i ? "border-accent bg-accent text-white" : "border-than-chi/25 hover:border-accent hover:text-accent"}`}
                      >
                        {x.ten.replace(/^Giải pháp (cửa )?(cho )?/, "").replace(/^./, (c) => c.toUpperCase())}
                      </button>
                    </li>
                  ))}
                </ul>
                {g && (
                  <>
                    <p className="mt-4 text-[15px] leading-relaxed text-than-chi/75">{g.tomTat}</p>
                    <Link href={`/giai-phap/${g.slug}`} className="nut nut-dac mt-5">
                      Xem giải pháp
                    </Link>
                    <p className="mt-3 text-xs text-than-chi/60">Ảnh không gian tham khảo, không phải công trình của WINDUCA.</p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

const MO_TA: Record<string, string> = {
  "cua-truot-nang": "Cánh được nâng nhẹ khỏi ray khi mở rồi trượt ngang sang bên, hạ xuống khi đóng để đóng kín chắc chắn.",
  "cua-di-mo-quay": "Hai cánh mở quay quanh bản lề, vào trong hoặc ra ngoài, cho lối đi rộng khi mở hết cỡ.",
  "cua-xep-truot": "Các cánh gập lại và xếp gọn về một phía, mở gần như toàn bộ khẩu độ.",
  "cua-so": "Cánh cửa sổ mở quay quanh bản lề, cho thông gió chủ động và vẫn đồng bộ đường nét với cửa đi.",
};
