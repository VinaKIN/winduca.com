"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { LOP, type LopId } from "./CrossSection3D";
import { useMediaQuery, useWebGL } from "@/lib/hooks";

const Canvas3D = dynamic(() => import("./CrossSection3D"), {
  ssr: false,
  loading: () => <KhungCho />,
});

function KhungCho() {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm text-inox/70">
      Đang tải mặt cắt…
    </div>
  );
}

/** Ảnh tĩnh dự phòng (không WebGL / mobile chưa bấm "Xem 3D") */
function MatCatTinh() {
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full" role="img" aria-label="Mặt cắt nhôm minh họa">
      <g transform="translate(60 40)">
        <rect x="-34" y="-35" width="28" height="70" fill="none" stroke="#bfa678" strokeWidth="0.6" />
        <rect x="-28" y="-26" width="16" height="52" fill="none" stroke="#bfa678" strokeWidth="0.4" />
        <rect x="6" y="-35" width="28" height="70" fill="none" stroke="#bfa678" strokeWidth="0.6" />
        <rect x="12" y="-26" width="16" height="52" fill="none" stroke="#bfa678" strokeWidth="0.4" />
        <rect x="-6" y="19" width="12" height="6" fill="#f4f1ea" opacity="0.85" />
        <rect x="-6" y="-25" width="12" height="6" fill="#f4f1ea" opacity="0.85" />
        <rect x="34" y="24" width="5" height="6" fill="#4a4a4e" />
        <rect x="34" y="-30" width="5" height="6" fill="#4a4a4e" />
        <rect x="39" y="-29" width="2.5" height="58" fill="#dde3df" opacity="0.55" />
        <rect x="45" y="-29" width="2.5" height="58" fill="#dde3df" opacity="0.55" />
      </g>
    </svg>
  );
}

const THONG_SO = [
  "Bề rộng khung",
  "Độ dày thành nhôm",
  "Thanh cách nhiệt",
  "Độ dày kính tối đa",
  "Tải gió",
  "Hệ số truyền nhiệt khung (Uf)",
];

export function CrossSection({
  nhan = "04 / 09 · Cấu tạo",
  tieuDe = "Xem tận mắt cấu tạo",
  mauNhom = "#bfa678",
}: {
  nhan?: string;
  tieuDe?: string;
  mauNhom?: string;
}) {
  const khung = useRef<HTMLDivElement>(null);
  const [thayDuoc, setThayDuoc] = useState(false);
  const webgl = useWebGL();
  const manHinhNho = useMediaQuery("(max-width: 767px)");
  const giamChuyenDong = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [daBam, setDaBam] = useState(false);
  const [tach, setTach] = useState(0.45);
  const [chon, setChon] = useState<LopId | null>(null);
  const [nguoiDungDungXoay, setNguoiDungDungXoay] = useState(false);
  const tuXoay = !giamChuyenDong && !nguoiDungDungXoay;

  useEffect(() => {
    const el = khung.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setThayDuoc(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hien3D = webgl && thayDuoc && (!manHinhNho || daBam);

  return (
    <section id="mat-cat" className="relative overflow-hidden bg-white text-than-chi nen-luoi" aria-labelledby="tieu-de-mat-cat">
      {nhan.match(/^\d{2}/) && (
        <span aria-hidden="true" className="so-lon pointer-events-none absolute -top-4 right-4 hidden select-none md:right-10 md:block">
          {nhan.slice(0, 2)}
        </span>
      )}
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-5 md:grid-cols-[14rem_1fr] md:gap-12">
          <div>
            <p className="nhan-muc text-than-chi/70">{nhan.replace(/^\d{2}\s*\/\s*\d{2}\s*·\s*/, "")}</p>
            <div className="mt-4 h-px w-14 bg-accent" />
          </div>
          <div>
            <h2 id="tieu-de-mat-cat" className="tieu-de max-w-2xl text-[clamp(1.75rem,3.4vw,3rem)]">
              {tieuDe}
            </h2>
            <p className="mt-5 max-w-xl text-base font-light text-than-chi/75 md:text-lg">
              Tiêu chuẩn kỹ thuật châu Âu, trong từng lớp cấu tạo.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:mt-16 lg:grid-cols-[1.35fr_1fr]">
          {/* KHUNG 3D */}
          <div ref={khung} className="relative aspect-[4/3] overflow-hidden border border-inox/25 bg-[#232325]">
            {/* dấu góc khung kiểu bản vẽ */}
            {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-b border-l", "right-3 bottom-3 border-b border-r"].map((c) => (
              <span key={c} className={`pointer-events-none absolute h-4 w-4 border-accent ${c}`} />
            ))}

            <div className="absolute inset-0">
              {hien3D ? (
                <Canvas3D tach={tach} chon={chon} tuXoay={tuXoay} mauNhom={mauNhom} />
              ) : (
                <div className="relative h-full w-full">
                  <MatCatTinh />
                  {webgl && manHinhNho && (
                    <button
                      type="button"
                      onClick={() => setDaBam(true)}
                      className="nut nut-chinh absolute bottom-6 left-1/2 -translate-x-1/2"
                    >
                      Xem 3D
                    </button>
                  )}
                </div>
              )}
            </div>

            <p className="absolute left-5 top-5 rounded-sm bg-than-chi/80 px-2 py-1 text-[11px] text-nga/85">
              Minh họa — không phải bản vẽ kỹ thuật
            </p>
            <p className="absolute bottom-5 right-5 text-[11px] text-nga/60">Kéo để xoay</p>
          </div>

          {/* ĐIỀU KHIỂN + LỚP */}
          <div>
            <label htmlFor="tach-lop" className="nhan-muc block text-than-chi/80">
              Tách lớp
            </label>
            <input
              id="tach-lop"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={tach}
              onChange={(e) => setTach(parseFloat(e.target.value))}
              className="mt-3 w-full accent-[#bfa678]"
              aria-label="Tách các lớp cấu tạo"
            />
            <div className="mt-2 flex justify-between text-xs text-than-chi/60">
              <span>Liền khối</span>
              <span>Tách rời</span>
            </div>

            <ul className="mt-8 divide-y divide-than-chi/15 border-y border-than-chi/15">
              {LOP.map((l, i) => {
                const dangChon = chon === l.id;
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setChon(dangChon ? null : l.id);
                        setNguoiDungDungXoay(true);
                      }}
                      aria-pressed={dangChon}
                      className="flex w-full items-start gap-4 py-4 text-left"
                    >
                      <span
                        className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rotate-45"
                        style={{ background: l.mau, outline: "1px solid rgba(43,43,45,0.35)" }}
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block text-sm font-semibold">
                          {String(i + 1).padStart(2, "0")} · {l.ten}
                        </span>
                        <span
                          className={`mt-1 block text-sm font-light text-than-chi/80 transition-all ${
                            dangChon ? "max-h-40 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                          }`}
                        >
                          {l.moTa}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* BẢNG THÔNG SỐ — 6 hàng, mỗi ô nhãn "Đang chờ xác nhận" (chưa có phiếu kiểm định) */}
        <div className="mt-14 rounded-sm border border-than-chi/15 bg-nga">
          <div className="grid divide-y divide-than-chi/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
            {THONG_SO.map((ten) => (
              <div key={ten} className="border-than-chi/15 p-5 sm:border-b lg:[&:nth-last-child(-n+3)]:border-b-0">
                <p className="nhan-muc text-than-chi/70">{ten}</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-than-chi/80">
                  <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden="true" />
                  Đang chờ xác nhận
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-than-chi/60">
          Thông số kỹ thuật sẽ được công bố cùng nguồn kiểm định khi có kết quả xác nhận.
        </p>
      </div>
    </section>
  );
}
