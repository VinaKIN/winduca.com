"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Hero theo đề xuất 10/11/2026: ảnh kiến trúc tràn khung (~88svh), cửa kính là nhân vật chính,
 * chữ đặt lệch trái ở dưới, một dòng nhận diện nhỏ, hai CTA. Chuyển động nhẹ: ảnh phóng chậm và
 * chuyển cảnh mờ dần; tạm dừng khi rê chuột/focus và tắt khi người dùng chọn giảm chuyển động.
 */

const ANH = [
  { src: "/images/hero.jpg", pos: "50% 55%" },
  { src: "/images/chu-nha.jpg", pos: "50% 50%" },
  { src: "/images/nha-o-kinh.jpg", pos: "50% 50%" },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [tamDung, setTamDung] = useState(false);
  const giamChuyenDong = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (tamDung || giamChuyenDong) return;
    const t = setInterval(() => setI((v) => (v + 1) % ANH.length), 7000);
    return () => clearInterval(t);
  }, [tamDung, giamChuyenDong]);

  return (
    <section
      id="hero"
      aria-label="Giới thiệu WINDUCA"
      className="relative h-[88svh] min-h-[600px] overflow-hidden bg-than-chi"
      onMouseEnter={() => setTamDung(true)}
      onMouseLeave={() => setTamDung(false)}
      onFocusCapture={() => setTamDung(true)}
      onBlurCapture={() => setTamDung(false)}
    >
      {ANH.map((a, k) => (
        <div key={a.src} aria-hidden="true" className={`absolute inset-0 transition-opacity duration-[1400ms] ${k === i ? "opacity-100" : "opacity-0"}`}>
          <Image
            src={asset(a.src)}
            alt=""
            fill
            priority={k === 0}
            quality={75}
            sizes="100vw"
            className={`object-cover ${k === i && !giamChuyenDong ? "hero-zoom" : ""}`}
            style={{ objectPosition: a.pos }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-than-chi/35" aria-hidden="true" />

      <div className="absolute inset-0 mx-auto flex max-w-[1440px] flex-col justify-end px-5 pb-[12svh] text-white md:px-10">
        <p className="nhan-muc text-accent">Premium Window &amp; Door</p>
        <h1 className="mt-4 max-w-5xl text-[clamp(1.5rem,3.8vw,3.5rem)] font-semibold uppercase leading-[1.1]">
          Kiến tạo không gian
          <span className="block">mở ra chuẩn sống mới.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base font-light text-white/90 md:text-lg">
          Giải pháp cửa nhôm kính kiến trúc cao cấp, đồng bộ từ hệ nhôm, kính, phụ kiện đến thi công hoàn thiện.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
          <Link href="/he-cua" className="nut nut-chinh">
            Khám phá hệ cửa
          </Link>
          <Link href="/lien-he" className="nut nut-vien">
            Tư vấn giải pháp
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 right-5 flex gap-2.5 md:bottom-10 md:right-10" role="tablist" aria-label="Chọn ảnh">
        {ANH.map((a, k) => (
          <button
            key={a.src}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-label={`Ảnh ${k + 1}`}
            onClick={() => setI(k)}
            className={`h-[3px] rounded-[2px] transition-all duration-300 ${k === i ? "w-10 bg-accent" : "w-6 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}
