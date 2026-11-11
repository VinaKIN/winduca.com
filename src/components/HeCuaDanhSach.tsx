"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { asset } from "@/lib/asset";
import { HE_CUA_DS, TEN_HANG, TEN_HE, TEN_KET_CAU, TEN_TAG, type HeCua, type Hang } from "@/lib/he-cua-du-lieu";
import { phimNhomChon } from "@/lib/phim";
import { HOTLINE, HOTLINE_TEL } from "@/lib/site";

/**
 * Danh sách hệ cửa dựng lại theo trang hệ cửa của Winboss (11/11/2026):
 * tab theo hãng có đếm, ô tìm kiếm, lọc thả xuống chọn nhiều (Hệ thống · Kết cấu · Chức năng), thẻ có ô chọn so sánh,
 * phân trang 12/8/4, thanh so sánh tối đa 3 hệ, hộp chi tiết có thư viện ảnh, đồng bộ bộ lọc lên địa chỉ trang.
 */
type Loc = { b: Hang | ""; k: string[]; f: string[]; h: string[]; q: string; p: number };
const LOC_RONG: Loc = { b: "", k: [], f: [], h: [], q: "", p: 1 };

const TAB_HANG: { id: Hang | ""; ten: string }[] = [
  { id: "", ten: "Tất cả" },
  { id: "romadio", ten: "Romadio" },
  { id: "civro", ten: "Civro" },
  { id: "ponzio", ten: "Ponzio" },
];
const NHOM_LOC = [
  { k: "h", ten: "Hệ thống", o: [["w", "Cửa sổ"], ["d", "Cửa đi"], ["s", "Trượt"], ["l", "Nâng trượt"], ["f", "Xếp gấp"], ["v", "Vách kính"]] },
  { k: "k", ten: "Kết cấu", o: [["t", "Có cầu nhiệt"], ["n", "Không cầu nhiệt"]] },
  { k: "f", ten: "Chức năng", o: [["cn", "Cách nhiệt cao"], ["an", "An ninh cao"], ["de", "Dễ tiếp cận"], ["sm", "Thông minh / Động cơ"]] },
] as const;

/* ---------- Lọc và định dạng số liệu (theo logic của trang gốc) ---------- */
function khop(r: HeCua, l: Loc, boQuaHang = false) {
  if (!boQuaHang && l.b && r.hang !== l.b) return false;
  if (l.k.length && !l.k.some((k) => r.ketCau === k || r.ketCau === "tn")) return false;
  if (l.f.length && !l.f.some((f) => r.tags.includes(f))) return false;
  if (l.h.length && !l.h.some((h) => r.he.includes(h))) return false;
  if (l.q) {
    const t = `${TEN_HANG[r.hang]} ${r.ma} ${r.loai}`.toLowerCase();
    if (!t.includes(l.q.toLowerCase())) return false;
  }
  return true;
}
const so = (s: string) => (s.replace(/\([^)]*\)/g, "").match(/\d+[.,]\d+|\d+/g) ?? []) as string[];
function uVal(r: HeCua) {
  const s = r.u;
  if (!s) return "";
  if (s.startsWith("≥")) return s;
  const m = so(s);
  if (!m.length) return "";
  if (m.length === 1) return m[0];
  const a = [...m].sort((x, y) => parseFloat(x.replace(",", ".")) - parseFloat(y.replace(",", ".")));
  return a[0] === a[a.length - 1] ? a[0] : `${a[0]}–${a[a.length - 1]}`;
}
function dbVal(r: HeCua) {
  const n = r.cachAm.replace(/\s*dB/i, "").trim();
  if (!n) return "";
  return /^đến /i.test(n) ? `≤ ${n.replace(/^đến /i, "")}` : n;
}
const tenHe = (r: HeCua) => r.he.split("").map((c) => TEN_HE[c]).filter(Boolean);

/* ---------- Hình minh họa khi chưa có ảnh ---------- */
function HinhMinhHoa({ he, lop = "" }: { he: string; lop?: string }) {
  const c = he.charAt(0);
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 240 200" className={lop} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef2f5" />
          <stop offset="1" stopColor="#b4c2cb" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="188" rx="72" ry="5" fill="#000" opacity=".08" />
      {c === "s" || c === "l" ? (
        <>
          <rect x="28" y="164" width="184" height="8" rx="2" fill="#20242a" />
          <rect x="38" y="32" width="92" height="132" rx="3" fill="#20242a" />
          <rect x="46" y="40" width="76" height="116" fill={`url(#${id})`} />
          <rect x="110" y="42" width="92" height="122" rx="3" fill="#20242a" opacity=".94" />
          <rect x="118" y="50" width="76" height="106" fill={`url(#${id})`} />
          <path d={c === "l" ? "M120 22v12m-5-5 5-5 5 5M150 22v12m-5-5 5-5 5 5" : "M142 24h34m-8-6 8 6-8 6"} fill="none" stroke="#d6202f" strokeWidth="1.4" />
        </>
      ) : c === "f" ? (
        <>
          <polygon points="36,38 92,26 92,166 36,154" fill="#20242a" />
          <polygon points="92,26 148,38 148,154 92,166" fill="#3a4048" />
          <polygon points="148,38 204,26 204,166 148,154" fill="#20242a" />
          <polygon points="46,48 82,40 82,152 46,144" fill={`url(#${id})`} />
          <polygon points="158,48 194,40 194,152 158,144" fill={`url(#${id})`} />
        </>
      ) : c === "v" ? (
        <>
          <rect x="30" y="24" width="180" height="148" fill="#20242a" />
          {[0, 1, 2].map((i) => [0, 1].map((j) => <rect key={`${i}${j}`} x={36 + i * 58} y={30 + j * 72} width={52} height={66} fill={`url(#${id})`} />))}
        </>
      ) : c === "d" ? (
        <>
          <rect x="74" y="16" width="92" height="162" rx="3" fill="#20242a" />
          <rect x="86" y="28" width="68" height="138" fill={`url(#${id})`} />
          <path d="M86 28H132L86 74Z" fill="#fff" opacity=".45" />
          <rect x="146" y="98" width="5" height="30" rx="2.5" fill="#d6202f" />
        </>
      ) : (
        <>
          <rect x="50" y="26" width="140" height="146" rx="3" fill="#20242a" />
          <rect x="62" y="38" width="116" height="122" fill={`url(#${id})`} />
          <path d="M62 38H128L62 104Z" fill="#fff" opacity=".45" />
          <rect x="58" y="34" width="124" height="130" fill="none" stroke="#d6202f" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}

/** Nền "sân khấu" sáng cho ảnh mẫu góc: chiếu sáng giữa, tối dần ra mép, như ảnh chụp trong studio. */
const SAN_KHAU = "bg-[radial-gradient(ellipse_at_50%_36%,#ffffff_0%,#f2f5f9_50%,#dfe5ee_100%)]";

function AnhThe({ r, lopMau = "" }: { r: HeCua; lopMau?: string }) {
  const ten = `${TEN_HANG[r.hang]} ${r.ma}`;
  const c = r.anh.c;
  if (c[0])
    return (
      <>
        <span className="pointer-events-none absolute bottom-[9%] left-1/2 h-4 w-[46%] -translate-x-1/2 rounded-full bg-[#0f1115]/15 blur-md transition-all duration-500 group-hover:w-[52%] group-hover:bg-[#0f1115]/20" aria-hidden="true" />
        <Image
          src={asset(c[0])}
          alt={`Mẫu góc ${ten}`}
          fill
          quality={75}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"
          className={`object-contain p-3 transition-all duration-500 md:p-4 ${c[1] ? "group-hover:opacity-0" : ""} ${lopMau}`}
        />
        {c[1] && (
          <Image
            src={asset(c[1])}
            alt=""
            fill
            quality={75}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"
            className={`object-contain p-3 opacity-0 transition-all duration-500 group-hover:opacity-100 md:p-4 ${lopMau}`}
            aria-hidden="true"
          />
        )}
      </>
    );
  if (r.anh.d[0]) return <Image src={asset(r.anh.d[0])} alt={`Bản vẽ mặt cắt ${ten}`} fill quality={75} sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw" className={`object-contain p-4 ${lopMau}`} />;
  return <HinhMinhHoa he={r.he} lop="h-[78%] w-[56%]" />;
}

/* ---------- Cổng: đưa phần tử cố định ra <body> (thẻ bao ngoài có backdrop-filter nên "fixed" sẽ tính sai) ---------- */
const khongDangKy = () => () => {};
function Cong({ children }: { children: ReactNode }) {
  const sanSang = useSyncExternalStore(khongDangKy, () => true, () => false);
  return sanSang ? createPortal(children, document.body) : null;
}

/* ---------- Hộp thoại dùng chung: giữ focus, Esc đóng, trả focus ---------- */
function HopThoai({ dong, tieuDe, rong = true, duoi = false, children }: { dong: () => void; tieuDe: string; rong?: boolean; duoi?: boolean; children: ReactNode }) {
  const hop = useRef<HTMLDivElement>(null);
  const nutDong = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const truoc = document.activeElement as HTMLElement | null;
    const cu = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nutDong.current?.focus();
    const phim = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.getElementById("zoom-he-cua")) return;
        return dong();
      }
      if (e.key !== "Tab" || !hop.current) return;
      const ds = Array.from(hop.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])")).filter((x) => !x.hasAttribute("disabled") && x.offsetParent !== null);
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
  return (
    <div className={`fixed inset-0 z-[70] flex justify-center bg-[#0a0c0f]/70 backdrop-blur-[2px] ${duoi ? "items-end p-0" : "items-center p-4"}`} onClick={dong}>
      <div
        ref={hop}
        role="dialog"
        aria-modal="true"
        aria-label={tieuDe}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full overflow-auto bg-white ${duoi ? "max-h-[85svh] rounded-b-none rounded-t-[22px]" : "max-h-[90svh] rounded-[22px]"} ${rong ? "max-w-[1120px] md:grid md:grid-cols-[6fr_5fr]" : "max-w-[860px]"}`}
      >
        <button ref={nutDong} type="button" onClick={dong} aria-label="Đóng" className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-3xl leading-none text-[#697280] hover:text-than-chi">
          <span aria-hidden="true">×</span>
        </button>
        {children}
      </div>
    </div>
  );
}

const NHAN_NHO = "text-[12px] font-bold uppercase tracking-[0.14em] text-[#697280]";

function ThongSoLon({ r }: { r: HeCua }) {
  const ds: [string, string, string][] = [["U-value", uVal(r), "W/m²K"], ["Cách âm", dbVal(r), "dB"], ["Kín nước", r.kinNuoc, ""]];
  return (
    <dl className="mt-5 grid grid-cols-3 overflow-hidden rounded-[14px] border border-[#e3e7ec]">
      {ds.map(([t, v, dv]) => (
        <div key={t} className="border-r border-[#e3e7ec] p-3.5 last:border-r-0">
          <dt className={NHAN_NHO}>{t}</dt>
          <dd className="mt-1.5 text-[clamp(1.1rem,2vw,1.6rem)] font-light leading-tight tracking-[-0.02em]">
            {v || "—"}
            {v && dv && <small className="ml-1 text-xs text-[#697280]">{dv}</small>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CuaSoChiTiet({ r, dong }: { r: HeCua; dong: () => void }) {
  const loai: [string, string[]][] = [["Mẫu góc", r.anh.c], ["Bản vẽ 2D", r.anh.d]];
  const co = loai.filter(([, l]) => l.length > 0);
  const [tab, setTab] = useState(0);
  const [k, setK] = useState(0);
  const [phong, setPhong] = useState(false);
  const ten = `${TEN_HANG[r.hang]} ${r.ma}`;
  const anhDang = co[tab]?.[1][k];
  const dsSpec: [string, string][] = ([["U-value (W/m²K)", r.u], ["Kín khí", r.kinKhi], ["Cách âm", r.cachAm], ["Kín nước", r.kinNuoc], ["Chịu gió", r.chiuGio], ["Chống đột nhập", r.chongTrom]] as [string, string][]).filter(([, v]) => v);

  useEffect(() => {
    if (!phong) return;
    const phim = (e: KeyboardEvent) => e.key === "Escape" && setPhong(false);
    window.addEventListener("keydown", phim, true);
    return () => window.removeEventListener("keydown", phim, true);
  }, [phong]);

  return (
    <HopThoai dong={dong} tieuDe={`${ten}, ${r.loai}`}>
      <div className={`${SAN_KHAU} relative flex min-h-[300px] flex-col items-center justify-center border-b border-[#e3e7ec] p-5 md:min-h-[520px] md:border-b-0 md:border-r`}>
        <span className="absolute left-4 top-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">
          <i className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
          {TEN_HANG[r.hang]}
        </span>
        {anhDang ? (
          <>
            <button type="button" onClick={() => setPhong(true)} aria-label="Phóng to ảnh" className="relative mt-6 h-[clamp(260px,50svh,500px)] w-full cursor-zoom-in">
              <Image src={asset(anhDang)} alt={`${co[tab][0]} ${ten}`} fill quality={75} sizes="(min-width: 768px) 50vw, 92vw" className="object-contain drop-shadow-[0_22px_26px_rgba(15,17,21,0.22)]" />
            </button>
            {co.length > 1 && (
              <div role="tablist" aria-label="Loại hình" className="mt-3 flex gap-2">
                {co.map(([t], i) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === i}
                    onClick={() => {
                      setTab(i);
                      setK(0);
                    }}
                    className={`min-h-11 rounded-full border px-4 py-2 text-[13px] ${tab === i ? "border-than-chi bg-than-chi font-bold text-white" : "border-[#c9d0d9] bg-white text-[#4b5563] hover:border-than-chi"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
            {co[tab][1].length > 1 && (
              <ul className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Chọn hình">
                {co[tab][1].map((u, i) => (
                  <li key={u}>
                    <button type="button" onClick={() => setK(i)} aria-label={`Hình ${i + 1}`} aria-current={i === k} className={`relative h-14 w-16 overflow-hidden rounded-[8px] border bg-white ${i === k ? "border-accent" : "border-[#c9d0d9]"}`}>
                      <Image src={asset(u)} alt="" fill quality={60} sizes="64px" className="object-contain p-1" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <HinhMinhHoa he={r.he} lop="mt-6 h-[78%] w-[70%] max-h-[300px]" />
        )}
        {phong && anhDang && (
          <div id="zoom-he-cua" role="dialog" aria-modal="true" aria-label="Ảnh phóng to" className="fixed inset-0 z-[80] flex cursor-zoom-out items-center justify-center bg-white p-4" onClick={() => setPhong(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(anhDang)} alt={`${co[tab][0]} ${ten}`} className="max-h-full max-w-full object-contain" />
            <button type="button" autoFocus aria-label="Đóng ảnh phóng to" className="absolute right-4 top-3 flex h-11 w-11 items-center justify-center text-4xl text-than-chi">
              <span aria-hidden="true">×</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-6 md:p-9">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent-text">{tenHe(r).join(" / ")}</p>
        <h3 className="mt-2.5 text-[clamp(1.75rem,3vw,2.125rem)] font-light leading-[1.15] tracking-[-0.02em]">{r.ma}</h3>
        <p className="mt-1.5 text-[15px] text-[#697280]">
          {r.loai}
          {r.ketCau && ` · ${TEN_KET_CAU[r.ketCau]}`}
        </p>
        {r.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Chức năng">
            {r.tags.map((t) => (
              <li key={t} className="rounded-[7px] border border-[#e3e7ec] bg-[#f3f5f8] px-2.5 py-1 text-[12px] leading-snug text-[#4b5563]">
                {TEN_TAG[t]}
              </li>
            ))}
          </ul>
        )}
        <ThongSoLon r={r} />
        {dsSpec.length > 0 || r.ghiChu ? (
          <dl className="mt-3 grid gap-x-8 sm:grid-cols-2">
            {dsSpec.map(([t, v]) => (
              <div key={t} className="border-b border-[#e3e7ec] py-3">
                <dt className={NHAN_NHO}>{t}</dt>
                <dd className="mt-1 text-[15px] leading-normal">{v}</dd>
              </div>
            ))}
            {r.ghiChu && (
              <div className="border-b border-[#e3e7ec] py-3 sm:col-span-2">
                <dt className={NHAN_NHO}>Ghi chú</dt>
                <dd className="mt-1 text-[15px] leading-normal">{r.ghiChu}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="mt-5 text-[15px] text-[#697280]">Hãng chưa công bố thông số của hệ này trên trang công khai.</p>
        )}
        <p className="mt-4 text-[13px] leading-[1.75] text-[#697280]">
          {r.them ? "Thông tin lấy từ tài liệu hãng cung cấp" : "Số liệu do hãng công bố"}, mang tính tham khảo. Giá trị thực tế phụ thuộc kích thước, kính và cấu hình công trình; vui lòng liên hệ để được xác nhận.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/lien-he" className="nut nut-chinh">
            Nhận tư vấn
          </Link>
          <a href={HOTLINE_TEL} className="nut nut-vien">
            Gọi {HOTLINE}
          </a>
        </div>
      </div>
    </HopThoai>
  );
}

function CuaSoSoSanh({ ds, dong }: { ds: HeCua[]; dong: () => void }) {
  const dong6: [string, (r: HeCua) => string][] = [
    ["U-value (W/m²K)", (r) => r.u],
    ["Kín khí", (r) => r.kinKhi],
    ["Cách âm", (r) => r.cachAm],
    ["Kín nước", (r) => r.kinNuoc],
    ["Chịu gió", (r) => r.chiuGio],
    ["Chống đột nhập", (r) => r.chongTrom],
  ];
  return (
    <HopThoai dong={dong} tieuDe="So sánh các hệ đã chọn" rong={false}>
      <div className="p-6 md:p-9">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent-text">So sánh</p>
        <h3 className="mt-2.5 text-[clamp(1.75rem,3vw,2.125rem)] font-light leading-[1.15] tracking-[-0.02em]">Các hệ đã chọn</h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="p-3 text-left font-light text-[#697280]">
                  <span className="sr-only">Thông số</span>
                </th>
                {ds.map((r) => (
                  <th key={r.id} scope="col" className="border-b border-[#e3e7ec] p-3 text-left font-bold">
                    <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-[#697280]">{TEN_HANG[r.hang]}</span>
                    {r.ma}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dong6
                .filter(([, f]) => ds.some((r) => f(r)))
                .map(([t, f]) => (
                  <tr key={t}>
                    <th scope="row" className="border-b border-[#e3e7ec] p-3 text-left font-light text-[#697280]">
                      {t}
                    </th>
                    {ds.map((r) => (
                      <td key={r.id} className="border-b border-[#e3e7ec] p-3 align-top font-light">
                        {f(r) || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              <tr>
                <th scope="row" className="border-b border-[#e3e7ec] p-3 text-left font-light text-[#697280]">
                  Nhãn
                </th>
                {ds.map((r) => (
                  <td key={r.id} className="border-b border-[#e3e7ec] p-3 align-top font-light">
                    {r.tags.length ? r.tags.map((t) => TEN_TAG[t]).join(" · ") : "—"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[13px] leading-[1.75] text-[#697280]">Mọi số liệu do hãng công bố, điều kiện thử có thể khác nhau giữa các hệ. Liên hệ để được tư vấn theo công trình.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/lien-he" className="nut nut-chinh">
            Nhận tư vấn
          </Link>
          <a href={HOTLINE_TEL} className="nut nut-vien">
            Gọi {HOTLINE}
          </a>
        </div>
      </div>
    </HopThoai>
  );
}

/* ---------- Địa chỉ trang → bộ lọc ---------- */
function docLoc(search: string): Loc {
  const p = new URLSearchParams(search);
  const ds = (k: string) => (p.get(k) ?? "").split(",").filter(Boolean);
  const b = p.get("b") as Hang | null;
  return { b: b && b in TEN_HANG ? b : "", k: ds("k"), f: ds("f"), h: ds("h"), q: p.get("q") ?? "", p: Math.max(1, Number(p.get("p")) || 1) };
}
function dangKyUrl(cb: () => void) {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}

/* ---------- Số thẻ mỗi trang theo cỡ màn hình: 12 / 8 / 4 ---------- */
function dangKyCo(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}
const soThe = () => (window.innerWidth < 620 ? 4 : window.innerWidth < 850 ? 8 : 12);

function Chip({ bat, chon, children }: { bat: boolean; chon: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={bat} onClick={chon} className={`min-h-11 rounded-[8px] px-3 py-2 text-left text-[13px] ${bat ? "bg-accent font-bold text-white" : "text-[#e6e9ee] hover:bg-white/15"}`}>
      {children}
    </button>
  );
}

function ThongSoThe({ r }: { r: HeCua }) {
  const ds: [string, string][] = [["U-value", uVal(r)], ["Cách âm · dB", dbVal(r)], ["Kín nước", r.kinNuoc]];
  if (!ds.some(([, v]) => v)) return <p className="rounded-[12px] border border-dashed border-[#d5dbe3] px-3 py-3 text-[13px] text-[#697280]">Hãng chưa công bố thông số</p>;
  return (
    <dl className="grid grid-cols-3 overflow-hidden rounded-[12px] border border-[#e3e7ec]">
      {ds.map(([t, v]) => (
        <div key={t} className="min-w-0 border-r border-[#e3e7ec] px-3 py-2.5 last:border-r-0">
          <dt className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.1em] text-[#697280]">{t}</dt>
          <dd className={`mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] leading-tight md:text-base ${v ? "font-bold" : "font-light text-[#b7bec8]"}`}>{v || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

export function HeCuaDanhSach() {
  // Bộ lọc ban đầu đọc từ địa chỉ trang (link chia sẻ); sau khi người dùng chỉnh thì dùng bản chỉnh
  const search = useSyncExternalStore(dangKyUrl, () => window.location.search, () => "");
  const tuUrl = useMemo(() => docLoc(search), [search]);
  const [sua, setSua] = useState<Loc | null>(null);
  const loc = sua ?? tuUrl;
  const setLoc = useCallback((f: Loc | ((c: Loc) => Loc)) => setSua((c) => (typeof f === "function" ? f(c ?? tuUrl) : f)), [tuUrl]);
  const [cmp, setCmp] = useState<number[]>([]);
  const [mo, setMo] = useState<string>("");
  const [chiTiet, setChiTiet] = useState<HeCua | null>(null);
  const [soSanh, setSoSanh] = useState(false);
  const [tamLoc, setTamLoc] = useState(false);
  const [thongBao, setThongBao] = useState("");
  const dau = useRef<HTMLDivElement>(null);
  const idLoc = useId();
  const mot = useSyncExternalStore(dangKyCo, soThe, () => 12);

  // Ghi bộ lọc lên địa chỉ trang
  useEffect(() => {
    if (sua === null) return;
    const p = new URLSearchParams(window.location.search);
    for (const k of ["b", "k", "f", "h", "q", "p"]) p.delete(k);
    if (sua.b) p.set("b", sua.b);
    if (sua.k.length) p.set("k", sua.k.join(","));
    if (sua.f.length) p.set("f", sua.f.join(","));
    if (sua.h.length) p.set("h", sua.h.join(","));
    if (sua.q) p.set("q", sua.q);
    if (sua.p > 1) p.set("p", String(sua.p));
    const s = p.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${s ? `?${s}` : ""}${window.location.hash}`);
  }, [sua]);

  // Đóng danh sách thả xuống khi bấm ra ngoài hoặc nhấn Esc
  useEffect(() => {
    if (!mo) return;
    const ngoai = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-loc]")) setMo("");
    };
    const phim = (e: KeyboardEvent) => e.key === "Escape" && setMo("");
    document.addEventListener("mousedown", ngoai);
    document.addEventListener("keydown", phim);
    return () => {
      document.removeEventListener("mousedown", ngoai);
      document.removeEventListener("keydown", phim);
    };
  }, [mo]);

  const ketQua = useMemo(() => HE_CUA_DS.filter((r) => khop(r, loc)), [loc]);
  const soTrang = Math.max(1, Math.ceil(ketQua.length / mot));
  const trang = Math.min(loc.p, soTrang);
  const batDau = (trang - 1) * mot;
  const hien = ketQua.slice(batDau, batDau + mot);
  const demHang = (h: Hang | "") => HE_CUA_DS.filter((r) => khop(r, loc, true) && (h === "" || r.hang === h)).length;
  const soLoc = loc.k.length + loc.f.length + loc.h.length;
  const dangLoc = soLoc > 0 || loc.b !== "" || loc.q !== "";

  const doi = (p: Partial<Loc>) => setLoc((c) => ({ ...c, p: 1, ...p }));
  const bat = (k: "k" | "f" | "h", v: string) => doi({ [k]: loc[k].includes(v) ? loc[k].filter((x) => x !== v) : [...loc[k], v] });
  const chonSoSanh = useCallback((r: HeCua, co: boolean) => {
    setCmp((c) => {
      if (co) {
        if (c.length >= 3) {
          setThongBao("Chỉ so sánh tối đa 3 hệ.");
          return c;
        }
        return c.includes(r.id) ? c : [...c, r.id];
      }
      return c.filter((x) => x !== r.id);
    });
  }, []);
  const dsCmp = cmp.map((i) => HE_CUA_DS[i]);

  function sangTrang(p: number) {
    setLoc((c) => ({ ...c, p }));
    dau.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      {/* Khung công cụ: tab hãng, ô tìm kiếm, lọc */}
      <div className="rounded-[18px] border border-[#e3e7ec] bg-white/95 px-4 shadow-[0_10px_34px_rgba(15,17,21,0.06)] md:px-6">
      <div ref={dau} className="flex scroll-mt-24 flex-wrap items-center justify-between gap-5 border-b border-[#eef0f4] py-3.5">
        <div role="radiogroup" aria-label="Lọc theo hãng" onKeyDown={phimNhomChon} className="inline-flex w-full flex-wrap gap-0.5 rounded-[12px] bg-[#f3f5f8] p-1 md:w-auto">
          {TAB_HANG.map((t) => {
            const on = loc.b === t.id;
            return (
              <button
                key={t.id || "tat-ca"}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                onClick={() => doi({ b: t.id })}
                className={`flex min-h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-[9px] px-3 py-2 text-sm md:flex-none md:px-4 ${on ? "bg-white font-bold text-than-chi shadow-[0_1px_3px_rgba(15,17,21,0.12),0_0_0_1px_#e3e7ec]" : "text-[#4b5563] hover:text-than-chi"}`}
              >
                {t.ten}
                <em className={`text-xs not-italic ${on ? "text-accent-text" : "text-[#697280]"}`}>{demHang(t.id)}</em>
              </button>
            );
          })}
        </div>
        <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-3 md:w-auto">
          <span role="status" aria-live="polite" className="text-[13px] font-bold tracking-[0.04em] text-[#4b5563]">
            {ketQua.length} / {HE_CUA_DS.length} hệ
          </span>
          <div className="relative min-w-0 flex-1 md:flex-none">
            <label htmlFor={`${idLoc}-q`} className="sr-only">
              Tìm hệ cửa
            </label>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#697280]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              id={`${idLoc}-q`}
              type="search"
              value={loc.q}
              onChange={(e) => doi({ q: e.target.value })}
              placeholder="Tìm hệ: XW98, WS 75 THI…"
              className="w-full rounded-[12px] border border-[#e3e7ec] bg-white py-3 pl-10 pr-3.5 text-[15px] outline-none focus:border-than-chi md:w-[280px]"
            />
          </div>
          {dangLoc && (
            <button type="button" onClick={() => setLoc(LOC_RONG)} className="min-h-11 text-[13px] text-[#697280] underline underline-offset-4 hover:text-than-chi">
              × Xóa tất cả
            </button>
          )}
        </div>
      </div>

      {/* Lọc thả xuống, chọn nhiều */}
      <div className="hidden flex-wrap items-center gap-2.5 py-4 md:flex" data-loc>
        <span className="mr-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">
          <i className="h-px w-4 bg-accent" aria-hidden="true" />
          Lọc theo
        </span>
        {NHOM_LOC.map((g) => {
          const n = loc[g.k].length;
          const m = mo === g.k;
          return (
            <div key={g.k} className="relative">
              <button
                type="button"
                aria-expanded={m}
                aria-controls={`${idLoc}-${g.k}`}
                onClick={() => setMo(m ? "" : g.k)}
                className={`flex min-h-11 items-center gap-2 rounded-[10px] border px-4 py-2 text-[13px] ${n ? "border-than-chi bg-than-chi/5 font-bold" : "border-[#d5dbe3] bg-white hover:border-than-chi"}`}
              >
                {g.ten}
                {n > 0 && <em className="rounded-full bg-accent px-1.5 text-[11px] not-italic text-white">{n}</em>}
                <svg viewBox="0 0 12 8" className={`h-2 w-3 transition-transform ${m ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="m1 1.5 5 5 5-5" />
                </svg>
              </button>
              <div
                id={`${idLoc}-${g.k}`}
                role="group"
                aria-label={g.ten}
                hidden={!m}
                className="absolute left-0 top-[calc(100%+8px)] z-30 flex min-w-[220px] flex-col gap-0.5 rounded-[14px] bg-[#0f1115]/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur"
              >
                {g.o.map(([v, t]) => (
                  <Chip key={v} bat={loc[g.k].includes(v)} chon={() => bat(g.k, v)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          );
        })}
        {soLoc > 0 && (
          <button type="button" onClick={() => doi({ k: [], f: [], h: [] })} className="min-h-11 px-2 text-[13px] text-[#697280] underline underline-offset-4 hover:text-than-chi">
            Xóa lọc
          </button>
        )}
      </div>

      </div>

      <div className="h-3 md:hidden" aria-hidden="true" />

      {/* Lưới thẻ */}
      <ul key={`${loc.b}-${loc.k}-${loc.f}-${loc.h}-${loc.q}-${trang}`} className="mt-6 grid gap-x-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7">
        {hien.map((r, i) => {
          const chon = cmp.includes(r.id);
          return (
            <li key={r.id} style={{ animationDelay: `${i * 35}ms` }} className="the-hien group relative mb-5 grid grid-rows-subgrid row-span-3 gap-y-0 overflow-hidden rounded-[22px] lg:mb-7 border border-[#e3e7ec] bg-white shadow-[0_4px_18px_rgba(15,17,21,0.04)] transition-[border-color,box-shadow,transform] duration-300 focus-within:border-than-chi hover:-translate-y-1 hover:border-than-chi hover:shadow-[0_24px_50px_rgba(15,17,21,0.14)]">
              <div className={`${SAN_KHAU} relative flex aspect-[1/0.9] items-center justify-center border-b border-[#e3e7ec]`}>
                <span className="absolute left-[18px] top-4 z-[1] flex items-center gap-[7px] text-[12px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">
                  <i className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
                  {TEN_HANG[r.hang]}
                </span>
                <AnhThe r={r} lopMau="group-hover:scale-[1.05]" />
                <label className="absolute right-2 top-1.5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center" title="So sánh">
                  <input type="checkbox" checked={chon} onChange={(e) => chonSoSanh(r, e.target.checked)} aria-label={`So sánh ${TEN_HANG[r.hang]} ${r.ma}`} className="peer sr-only" />
                  <span className="relative block h-7 w-7 rounded-[8px] border border-[#b6bec9] bg-white peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-than-chi">
                    <span className={`absolute left-[9px] top-[4px] h-3 w-1.5 rotate-45 border-b-2 border-r-2 border-white ${chon ? "" : "hidden"}`} aria-hidden="true" />
                  </span>
                </label>
              </div>
              <div className="px-4 pt-4 md:px-5 md:pt-[18px]">
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#697280]">{r.loai}</p>
                <h3 className="mt-1.5 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-bold leading-tight tracking-[-0.01em]">
                  <button type="button" onClick={() => setChiTiet(r)} aria-haspopup="dialog" className="text-left after:absolute after:inset-0 after:z-[1] after:content-[''] focus-visible:outline-none">
                    <span className="sr-only">{TEN_HANG[r.hang]} </span>
                    {r.ma}
                  </button>
                </h3>
              </div>
              <div className="flex flex-col gap-3.5 px-4 pb-4 pt-3.5 md:px-5 md:pb-5">
                <ThongSoThe r={r} />
                <ul className="flex min-h-[26px] flex-wrap gap-1.5" aria-label="Chức năng">
                  {r.tags.map((t) => (
                    <li key={t} className="rounded-[7px] border border-[#e3e7ec] bg-[#f3f5f8] px-2 py-0.5 text-[12px] leading-snug text-[#4b5563]">
                      {TEN_TAG[t]}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
        {hien.length === 0 && (
          <li className="py-16 text-center text-[#697280] sm:col-span-2 lg:col-span-3">
            <p>Chưa có hệ phù hợp với bộ lọc này.</p>
            <Link href="/lien-he" className="nut nut-chinh mt-5">
              Liên hệ để được tư vấn
            </Link>
          </li>
        )}
      </ul>

      {/* Phân trang */}
      {ketQua.length > 0 && (
        <nav aria-label="Phân trang hệ cửa" className="mt-14 text-center">
          <p className="mb-4 text-[13px] tracking-[0.04em] text-[#697280]">
            Hiển thị {batDau + 1}–{Math.min(batDau + mot, ketQua.length)} / {ketQua.length} hệ
          </p>
          {soTrang > 1 && (
            <ul className="inline-flex flex-wrap items-center justify-center gap-2">
              <li>
                <button type="button" onClick={() => sangTrang(trang - 1)} disabled={trang < 2} aria-label="Trang trước" className="h-11 w-11 rounded-[10px] border border-[#e3e7ec] bg-white text-[15px] hover:border-than-chi disabled:opacity-35 disabled:hover:border-[#e3e7ec]">
                  ‹
                </button>
              </li>
              {Array.from({ length: soTrang }, (_, i) => i + 1).map((p) => (
                <li key={p}>
                  <button type="button" onClick={() => sangTrang(p)} aria-label={`Trang ${p}`} aria-current={p === trang ? "page" : undefined} className={`h-11 w-11 rounded-[10px] border text-[15px] ${p === trang ? "border-than-chi bg-than-chi text-white" : "border-[#e3e7ec] bg-white hover:border-than-chi"}`}>
                    {p}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => sangTrang(trang + 1)} disabled={trang >= soTrang} aria-label="Trang sau" className="h-11 w-11 rounded-[10px] border border-[#e3e7ec] bg-white text-[15px] hover:border-than-chi disabled:opacity-35 disabled:hover:border-[#e3e7ec]">
                  ›
                </button>
              </li>
            </ul>
          )}
        </nav>
      )}

      {/* Thanh so sánh */}
      <div role="status" aria-live="polite" className="sr-only">
        {thongBao}
      </div>
      {cmp.length > 0 && (
        <Cong>
        <div className="fixed bottom-[88px] left-1/2 z-40 flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-4 whitespace-nowrap rounded-[14px] bg-than-chi py-2 pl-5 pr-2.5 text-sm text-white shadow-[0_14px_36px_rgba(0,0,0,0.3)] md:bottom-[100px]">
          <span>Đã chọn {cmp.length}/3 hệ</span>
          <button type="button" onClick={() => setSoSanh(true)} disabled={cmp.length < 2} className="nut nut-chinh !min-h-0 !px-5 !py-2.5 disabled:opacity-50">
            So sánh
          </button>
          <button
            type="button"
            onClick={() => {
              setCmp([]);
              setThongBao("");
            }}
            className="min-h-11 pr-2 text-[#cfd5de] underline underline-offset-4"
          >
            Bỏ chọn
          </button>
        </div>
        </Cong>
      )}

      {/* Nút Bộ lọc cố định phía dưới (điện thoại), mở tấm chọn lọc như Winboss */}
      <Cong>
      <button
        type="button"
        onClick={() => setTamLoc(true)}
        aria-haspopup="dialog"
        className="fixed bottom-4 left-1/2 z-40 flex min-h-12 -translate-x-1/2 items-center gap-2.5 rounded-full bg-than-chi px-6 text-[14px] font-bold text-white shadow-[0_14px_36px_rgba(0,0,0,0.35)] md:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
        Bộ lọc
        {soLoc > 0 && <em className="rounded-full bg-accent px-2 py-0.5 text-[12px] not-italic">{soLoc}</em>}
      </button>
      {tamLoc && (
        <HopThoai dong={() => setTamLoc(false)} tieuDe="Bộ lọc hệ cửa" rong={false} duoi>
          <div className="px-5 pb-28 pt-5">
            <p className="text-[18px] font-bold">Bộ lọc</p>
            {NHOM_LOC.map((g) => (
              <fieldset key={g.k} className="mt-5">
                <legend className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">{g.ten}</legend>
                <div className="flex flex-wrap gap-2">
                  {g.o.map(([v, t]) => {
                    const on = loc[g.k].includes(v);
                    return (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={on}
                        onClick={() => bat(g.k, v)}
                        className={`min-h-11 rounded-[10px] border px-3.5 py-2 text-[14px] ${on ? "border-accent bg-accent font-bold text-white" : "border-[#d5dbe3] bg-white text-than-chi"}`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
          <div className="sticky bottom-0 flex items-center gap-3 border-t border-[#e3e7ec] bg-white px-5 py-3">
            {soLoc > 0 && (
              <button type="button" onClick={() => doi({ k: [], f: [], h: [] })} className="min-h-11 text-[14px] text-[#4b5563] underline underline-offset-4">
                Xóa lọc
              </button>
            )}
            <button type="button" onClick={() => setTamLoc(false)} className="nut nut-chinh ml-auto flex-1 md:flex-none">
              Xem {ketQua.length} hệ
            </button>
          </div>
        </HopThoai>
      )}
      </Cong>

      <Cong>
        {chiTiet && <CuaSoChiTiet r={chiTiet} dong={() => setChiTiet(null)} />}
        {soSanh && dsCmp.length > 1 && <CuaSoSoSanh ds={dsCmp} dong={() => setSoSanh(false)} />}
      </Cong>
    </div>
  );
}
