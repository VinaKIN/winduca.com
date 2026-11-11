"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/**
 * Băng chuyền vòng cung cho hero /he-cua: năm mẫu góc quay quanh một quỹ đạo elip (mẫu trước to, mẫu sau nhỏ mờ).
 * Tự quay chậm; rê chuột vào mẫu bên cạnh thì mẫu đó lướt ra trước, các mẫu còn lại dịch vòng theo.
 * Tôn trọng "giảm chuyển động": không tự quay, chỉ đổi khi chạm hoặc bấm.
 */
export type MauNoiBat = { src: string; hang: string; ma: string };

/** Vị trí theo "khe": 0 giữa-trước, 1 phải-gần, 2 phải-xa (sau), 3 trái-xa (sau), 4 trái-gần. */
const KHE = [
  { x: 0, y: 0, s: 1, o: 1, z: 30 },
  { x: 54, y: -4, s: 0.62, o: 0.85, z: 20 },
  { x: 24, y: -16, s: 0.4, o: 0.32, z: 10 },
  { x: -24, y: -16, s: 0.4, o: 0.32, z: 10 },
  { x: -54, y: -4, s: 0.62, o: 0.85, z: 20 },
];

export function HeroBangChuyen({ mau }: { mau: MauNoiBat[] }) {
  const n = mau.length;
  const [dang, setDang] = useState(0);
  const dungTuQuay = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!dungTuQuay.current && !document.hidden) setDang((d) => (d + 1) % n);
    }, 4200);
    return () => clearInterval(t);
  }, [n]);

  const khe = (i: number) => (i - dang + n) % n;

  return (
    <div
      className="relative mx-auto hidden h-[380px] w-full max-w-[600px] select-none sm:block lg:h-[430px]"
      onMouseEnter={() => (dungTuQuay.current = true)}
      onMouseLeave={() => (dungTuQuay.current = false)}
      role="group"
      aria-roledescription="băng chuyền"
      aria-label="Mẫu góc nổi bật"
    >
      <div className="absolute inset-x-[10%] bottom-[16%] top-[10%] rounded-full bg-accent/20 blur-[70px]" aria-hidden="true" />
      {/* vòng elip dưới chân, gợi quỹ đạo */}
      <div className="absolute inset-x-[2%] bottom-[14%] h-[26%] rounded-[50%] border border-white/10" aria-hidden="true" />
      {mau.map((m, i) => {
        const k = khe(i);
        const v = KHE[k];
        return (
          <button
            key={m.src}
            type="button"
            tabIndex={k === 0 ? -1 : 0}
            aria-label={`${m.hang} ${m.ma}${k === 0 ? " (đang hiển thị)" : ""}`}
            onMouseEnter={() => k !== 0 && k !== 2 && k !== 3 && setDang(i)}
            onFocus={() => setDang(i)}
            onClick={() => setDang(i)}
            className="absolute left-1/2 top-[44%] w-[54%] cursor-pointer outline-none transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translate(calc(-50% + ${v.x}%), calc(-50% + ${v.y}%)) scale(${v.s})`,
              opacity: v.o,
              zIndex: v.z,
              filter: k === 0 ? "drop-shadow(0 34px 44px rgba(0,0,0,0.6))" : "drop-shadow(0 18px 24px rgba(0,0,0,0.5)) brightness(0.78)",
            }}
          >
            <Image src={asset(m.src)} alt="" width={640} height={576} quality={75} sizes="30vw" priority={i < 2} className="h-auto w-full" aria-hidden="true" />
          </button>
        );
      })}
      {/* chú thích kiểu bản vẽ */}
      <div className="absolute inset-x-0 bottom-0 z-40 flex items-end justify-between gap-4 border-t border-white/15 pt-3 text-white/70">
        <div aria-live="polite">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">FIG. {String(dang + 1).padStart(2, "0")}</p>
          <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.16em] text-white">
            {mau[dang].hang} · {mau[dang].ma}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-medium tabular-nums tracking-[0.14em]">
            {String(dang + 1).padStart(2, "0")} <i className="mx-1 inline-block h-px w-5 bg-white/40 align-middle" /> {String(n).padStart(2, "0")}
          </span>
          <span className="flex gap-1.5" aria-hidden="true">
            {mau.map((m, i) => (
              <i key={m.src} className={`h-1.5 rounded-full transition-all duration-500 ${i === dang ? "w-5 bg-accent" : "w-1.5 bg-white/30"}`} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
