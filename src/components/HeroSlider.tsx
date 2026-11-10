"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { HERO_ANH } from "@/lib/site";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Hero băng chuyền (kiểu Winboss, 11/11/2026): 2–3 slide tự chuyển, tiêu đề hoa căn giữa, 2 nút viên thuốc,
 * chấm tròn bên dưới. Tạm dừng khi rê chuột/focus; không tự chuyển nếu người dùng chọn giảm chuyển động.
 */

type Slide = {
  anh: string | null;
  dong: [string, string];
  phu: string;
  nut1: { nhan: string; href: string };
  nut2: { nhan: string; href: string };
};

const SLIDES: Slide[] = [
  {
    anh: HERO_ANH,
    dong: ["Kiến tạo không gian", "mở ra chuẩn sống mới."],
    phu: "Giải pháp cửa nhôm kính kiến trúc cao cấp, đồng bộ từ hệ nhôm, kính, phụ kiện đến thi công hoàn thiện",
    nut1: { nhan: "Khám phá hệ cửa", href: "/he-cua" },
    nut2: { nhan: "Tư vấn giải pháp", href: "/lien-he" },
  },
  {
    anh: asset("/images/chu-nha.jpg"),
    dong: ["Mở rộng tầm nhìn", "giữ trọn sự tĩnh lặng"],
    phu: "Cửa trượt nâng khổ lớn cho biệt thự và penthouse",
    nut1: { nhan: "Xem các hệ cửa", href: "/he-cua" },
    nut2: { nhan: "Nhận hộp mẫu góc nhôm", href: "/trai-nghiem#sample-box" },
  },
  {
    anh: asset("/images/biet-thu-go-kinh.jpg"),
    dong: ["Từ bản vẽ đến công trình", "một đầu mối đồng bộ"],
    phu: "Tư vấn · Cung cấp · Thi công",
    nut1: { nhan: "Xem công trình", href: "/cong-trinh" },
    nut2: { nhan: "Trở thành đối tác", href: "/hop-tac" },
  },
];

function MuiTenTron({ kieu }: { kieu: "do" | "vien" }) {
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${
        kieu === "do" ? "bg-accent text-white" : "bg-accent text-white"
      }`}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
      </svg>
    </span>
  );
}

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [tamDung, setTamDung] = useState(false);
  const giamChuyenDong = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (tamDung || giamChuyenDong) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [tamDung, giamChuyenDong]);

  return (
    <section
      id="hero"
      aria-roledescription="băng chuyền"
      aria-label="Giới thiệu WINDUCA"
      className="relative h-svh min-h-[640px] overflow-hidden bg-than-chi"
      onMouseEnter={() => setTamDung(true)}
      onMouseLeave={() => setTamDung(false)}
      onFocusCapture={() => setTamDung(true)}
      onBlurCapture={() => setTamDung(false)}
    >
      {SLIDES.map((s, k) => (
        <div
          key={s.dong[0]}
          role="group"
          aria-roledescription="slide"
          aria-label={`${k + 1} / ${SLIDES.length}`}
          aria-hidden={k !== i}
          className={`absolute inset-0 transition-opacity duration-700 ${k === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          {s.anh && <Image src={s.anh} alt="Không gian sống với cửa nhôm kính khổ lớn" fill priority={k === 0} quality={60} sizes="100vw" className="object-cover" />}
          <div className="absolute inset-0 bg-than-chi/45" aria-hidden="true" />

          <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-[14svh] text-center text-white md:pb-[16svh]">
            {k === 0 ? (
              <h1 className="max-w-5xl text-[clamp(1.6rem,3.6vw,3.6rem)] font-bold uppercase leading-[1.15] [text-wrap:balance]">
                {s.dong[0]} <span className="block">{s.dong[1]}</span>
              </h1>
            ) : (
              <p className="max-w-5xl text-[clamp(1.6rem,3.6vw,3.6rem)] font-bold uppercase leading-[1.15] [text-wrap:balance]">
                {s.dong[0]} <span className="block">{s.dong[1]}</span>
              </p>
            )}
            <p className="mt-4 max-w-3xl text-sm font-light text-white/95 md:mt-5 md:text-lg">{s.phu}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4">
              <Link
                href={s.nut1.href}
                tabIndex={k === i ? 0 : -1}
                className="group inline-flex items-center gap-4 rounded-full bg-white py-1.5 pl-7 pr-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-than-chi transition-colors hover:bg-nga"
              >
                {s.nut1.nhan}
                <MuiTenTron kieu="do" />
              </Link>
              <Link
                href={s.nut2.href}
                tabIndex={k === i ? 0 : -1}
                className="group inline-flex items-center gap-4 rounded-full border border-white/85 py-1.5 pl-7 pr-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-white hover:text-than-chi"
              >
                {s.nut2.nhan}
                <MuiTenTron kieu="vien" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* chấm tròn */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2.5 md:bottom-8" role="tablist" aria-label="Chọn slide">
        {SLIDES.map((s, k) => (
          <button
            key={s.dong[0]}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-label={`Slide ${k + 1}`}
            onClick={() => setI(k)}
            className={`h-2.5 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}
