"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { GIAI_PHAP } from "@/lib/giai-phap";
import { ANH_THEO_KIEU } from "@/lib/san-pham";
import { MAU_NHOM } from "@/lib/site";
import { Wrap } from "./ui";

/**
 * Trải nghiệm hệ cửa (11/11/2026, ý tưởng 2): tab Màu hoàn thiện dùng ẢNH LỚN tràn khung, đổi màu bằng lớp phủ mịn,
 * chip màu tròn + tên màu; tab Đóng/Mở và Không gian giữ nguyên.
 * Hình vẽ đóng/mở là SƠ ĐỒ PHẲNG minh họa, KHÔNG phải bản vẽ hay mô hình kỹ thuật của WINDUCA.
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
function Canh({ p, mau, kinh = "#a9bcc6", t = 8 }: { p: Pt[]; mau: string; kinh?: string; t?: number }) {
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
      {/* khung cảnh phía sau: tông tối, phẳng, không gradient */}
      <rect x="0" y="0" width="400" height="260" fill="#1d1a1b" />
      <rect x={x0} y={t0} width={x1 - x0} height={hh} fill="#8fa3ad" />
      <circle cx={x0 + (x1 - x0) * 0.78} cy={t0 + hh * 0.22} r="14" fill="#e8d9ae" />
      <path d={`M${x0} ${t0 + hh * 0.72} L${x0 + (x1 - x0) * 0.3} ${t0 + hh * 0.5} L${x0 + (x1 - x0) * 0.6} ${t0 + hh * 0.68} L${x1} ${t0 + hh * 0.46} L${x1} ${t0 + hh} L${x0} ${t0 + hh} Z`} fill="#4f6556" />
      <rect x={x0} y={t0 + hh * 0.84} width={x1 - x0} height={hh * 0.16} fill="#3f5246" />
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
  const anhCua = ANH_THEO_KIEU[slug]?.src;

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

  /** Điều hướng tab bằng bàn phím: ← → chuyển tab, Home/End về đầu/cuối; focus đi theo tab. */
  function phimTab(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    const nut = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const i = nut.findIndex((b) => b === document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const n = e.key === "Home" ? 0 : e.key === "End" ? nut.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + nut.length) % nut.length;
    nut[n].focus();
    setTab(TABS[n][0]);
  }

  return (
    <section className="mat-nga khoi-doc" aria-label="Trải nghiệm hệ cửa">
      <Wrap>
        <p className="nhan-tinh text-than-chi/70">
          <b>03</b>
          <i aria-hidden="true" />
          Trải nghiệm {ten.toLowerCase()}
        </p>
        <div role="tablist" aria-label="Chế độ xem" onKeyDown={phimTab} className="mt-6 flex flex-wrap gap-2">
          {TABS.map(([id, nhan]) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={tab === id}
              aria-controls="khung-trai-nghiem"
              tabIndex={tab === id ? 0 : -1}
              onClick={() => setTab(id)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${tab === id ? "border-than-chi bg-than-chi text-white" : "border-than-chi/20 hover:border-than-chi"}`}
            >
              {nhan}
            </button>
          ))}
        </div>

        <div id="khung-trai-nghiem" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-8 grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
          <div className="relative h-[clamp(320px,58svh,600px)] overflow-hidden rounded-[16px] bg-than-chi">
            {tab === "khong-gian" && g ? (
              <Image src={asset(g.anh)} alt={`${ten} trong ${g.ten.toLowerCase()}`} fill quality={72} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" style={{ objectPosition: g.pos }} />
            ) : tab === "mau" && anhCua ? (
              <>
                <Image src={asset(anhCua)} alt={`${ten} trong không gian kiến trúc`} fill quality={72} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                {/* lớp phủ màu mịn: đổi tông ảnh theo màu khung đang chọn (màu minh họa) */}
                <div className="pointer-events-none absolute inset-0 mix-blend-soft-light transition-[background-color] duration-700" style={{ backgroundColor: mau.hex, opacity: 0.6 }} aria-hidden="true" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-than-chi/75 py-1.5 pl-1.5 pr-5 text-sm text-white backdrop-blur-md">
                  <span className="h-8 w-8 rounded-full border border-white/30" style={{ background: mau.hex }} aria-hidden="true" />
                  {mau.ten}
                </div>
              </>
            ) : (
              <CuaSvg slug={slug} p={tab === "mo" ? p : 0} mau={mau.hex} />
            )}
          </div>

          <div className="flex flex-col justify-center">
            {tab === "mau" && (
              <>
                <h3 className="text-2xl font-light md:text-3xl">Chọn màu khung nhôm</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-than-chi/70">
                  Chọn một màu để cảm nhận tông của ảnh và mặt cắt 3D bên dưới đổi theo. Đây là màu minh họa; mã màu chính thức đang chờ xác nhận.
                </p>
                <ul className="mt-7 flex flex-wrap gap-3" role="radiogroup" aria-label="Màu khung nhôm">
                  {MAU_NHOM.map((m, i) => (
                    <li key={m.ten}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={chon === i}
                        onClick={() => setChon(i)}
                        className={`flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 text-left transition-colors ${chon === i ? "border-than-chi bg-white" : "border-than-chi/15 hover:border-than-chi/50"}`}
                      >
                        <span className="h-9 w-9 shrink-0 rounded-full border border-than-chi/20" style={{ background: m.hex }} />
                        <span className="text-sm font-medium">{m.ten}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {tab === "mo" && (
              <>
                <h3 className="text-2xl font-light md:text-3xl">Cách {ten.toLowerCase()} vận hành</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-than-chi/70">{MO_TA[slug]}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={() => chay(1)} className="nut nut-chinh">
                    Mở cửa
                  </button>
                  <button type="button" onClick={() => chay(0)} className="nut nut-vien-sang">
                    Đóng cửa
                  </button>
                </div>
                <label className="mt-6 block text-sm font-medium" htmlFor="muc-mo">
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
                <p className="mt-3 text-xs text-than-chi/65">Sơ đồ phẳng minh họa cách vận hành, không phải bản vẽ kỹ thuật.</p>
              </>
            )}

            {tab === "khong-gian" && (
              <>
                <h3 className="text-2xl font-light md:text-3xl">Ứng dụng trong kiến trúc</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-than-chi/70">Chọn loại công trình để xem không gian phù hợp với {ten.toLowerCase()}.</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {kg.map((x, i) => (
                    <li key={x.slug}>
                      <button
                        type="button"
                        onClick={() => setKgChon(i)}
                        aria-pressed={kgChon === i}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${kgChon === i ? "border-than-chi bg-than-chi text-white" : "border-than-chi/20 hover:border-than-chi"}`}
                      >
                        {x.ten.replace(/^Giải pháp (cửa )?(cho )?/, "").replace(/^./, (c) => c.toUpperCase())}
                      </button>
                    </li>
                  ))}
                </ul>
                {g && (
                  <>
                    <p className="mt-5 text-[15px] leading-relaxed text-than-chi/75">{g.tomTat}</p>
                    <Link href={`/giai-phap/${g.slug}`} className="nut nut-dac mt-6 self-start">
                      Xem giải pháp
                    </Link>
                    <p className="mt-3 text-xs text-than-chi/65">Ảnh không gian tham khảo, không phải công trình của WINDUCA.</p>
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
