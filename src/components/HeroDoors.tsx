"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HERO_ANH, HERO_VIDEO } from "@/lib/site";
import { useMediaQuery } from "@/lib/hooks";

/** Nền hero bằng ảnh hoặc video (muted, lặp). Video chỉ phát khi không giảm chuyển động và không bật tiết kiệm dữ liệu. */
function HeroMedia({ anh, video }: { anh: string | null; video: string | null }) {
  return (
    <>
      {anh && <Image src={anh} alt="" fill priority quality={60} sizes="100vw" className="object-cover" />}
      {video && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={video}
          poster={anh ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}
    </>
  );
}

/**
 * Hero cửa trượt (câu 101, 413, 431, 433, 441).
 * - Hai tấm cửa trượt ngang ra hai phía, mở giữa.
 * - Tự mở nhẹ ~1,5s khi tải, sau đó gắn với cuộn.
 * - Cửa nhích ±2% theo con trỏ (chỉ desktop có chuột).
 * - Tôn trọng prefers-reduced-motion: cửa mở sẵn, không hoạt ảnh.
 * - Cảnh phía sau là minh họa phẳng (không gradient) cho đến khi có ảnh/video thật.
 */
export function HeroDoors() {
  const khung = useRef<HTMLDivElement>(null);
  const [tienDoCuon, setTienDoCuon] = useState(0);
  const [tuMoDong, setTuMo] = useState(0);
  const [lech, setLech] = useState(0);
  const giamChuyenDong = useMediaQuery("(prefers-reduced-motion: reduce)");
  const tietKiemDuLieu = useMediaQuery("(prefers-reduced-data: reduce)");
  // Khi giảm chuyển động: cửa mở sẵn, không hoạt ảnh
  const tuMo = giamChuyenDong ? 0.7 : tuMoDong;

  // Tự mở nhẹ khi tải
  useEffect(() => {
    if (giamChuyenDong) return;
    const thoiLuong = 1500;
    const batDau = performance.now() + 600; // chờ khung cửa hiện
    let raf = 0;
    const chay = (now: number) => {
      const t = Math.min(Math.max((now - batDau) / thoiLuong, 0), 1);
      const muot = 1 - Math.pow(1 - t, 3); // ease-out
      setTuMo(muot * 0.45);
      if (t < 1) raf = requestAnimationFrame(chay);
    };
    raf = requestAnimationFrame(chay);
    return () => cancelAnimationFrame(raf);
  }, [giamChuyenDong]);

  // Gắn tiến độ mở với cuộn
  useEffect(() => {
    const onScroll = () => {
      const el = khung.current;
      if (!el) return;
      const tong = el.offsetHeight - window.innerHeight;
      const p = tong > 0 ? Math.min(Math.max(-el.getBoundingClientRect().top / tong, 0), 1) : 0;
      setTienDoCuon(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Con trỏ chuột nhích ±2%
  useEffect(() => {
    if (giamChuyenDong || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      setLech((e.clientX / window.innerWidth - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [giamChuyenDong]);

  // tuMo = mức tự mở (tối đa 0,45); cuộn đẩy tiếp tới 1 (mở hết)
  const mo = Math.min(1, tuMo + tienDoCuon * 0.55);
  const dich = mo * 100; // % chiều rộng mỗi tấm
  const doMo = Math.min(1, mo);
  const chuMo = Math.max(0, 1 - Math.max(0, tienDoCuon - 0.15) / 0.5);

  return (
    <section ref={khung} id="hero" aria-label="Giới thiệu WINDUCA" className="relative h-[220vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-than-chi">
        {/* CẢNH PHÍA SAU — minh họa phẳng (không gradient) */}
        <div
          className="absolute inset-[-3%]"
          style={{
            transform: `translate3d(${lech * -0.8}%, 0, 0) scale(${1 + doMo * 0.06})`,
            transition: "transform 0.4s ease-out",
          }}
          aria-hidden="true"
        >
          {HERO_ANH || HERO_VIDEO ? (
            <HeroMedia anh={HERO_ANH} video={giamChuyenDong || tietKiemDuLieu ? null : HERO_VIDEO} />
          ) : (
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
            {/* Trời chạng vạng: các dải phẳng, không gradient */}
            <rect width="1600" height="900" fill="#2d2b2c" />
            <rect y="250" width="1600" height="70" fill="#352f2d" />
            <rect y="320" width="1600" height="60" fill="#40372f" />
            <rect y="380" width="1600" height="55" fill="#4e4136" />
            <rect y="435" width="1600" height="65" fill="#645241" />
            {/* Mặt trời thấp (nửa vòng) */}
            <circle cx="1210" cy="500" r="96" fill="#bfa678" opacity="0.5" />
            {/* Mặt biển */}
            <rect y="500" width="1600" height="230" fill="#33383a" />
            <rect y="500" width="1600" height="3" fill="#7a6f5f" />
            <rect x="1130" y="512" width="160" height="4" fill="#bfa678" opacity="0.4" />
            <rect x="1150" y="530" width="120" height="3" fill="#bfa678" opacity="0.32" />
            <rect x="1170" y="552" width="80" height="3" fill="#bfa678" opacity="0.26" />
            <rect x="1185" y="580" width="50" height="3" fill="#bfa678" opacity="0.2" />
            <rect y="600" width="1600" height="2" fill="#464b4d" />
            <rect y="660" width="1600" height="2" fill="#3d4244" />
            {/* Biệt thự: mái đua mảnh + khối kính lớn */}
            <rect x="200" y="410" width="1200" height="24" fill="#111113" />
            <rect x="240" y="434" width="1120" height="210" fill="#19191b" />
            {/* Mặt kính sáng đèn, chia ô bằng nan mảnh */}
            <rect x="290" y="456" width="1020" height="168" fill="#bfa678" opacity="0.5" />
            {[290, 460, 630, 800, 970, 1140, 1304].map((x) => (
              <rect key={x} x={x} y="456" width="6" height="168" fill="#19191b" />
            ))}
            {/* Nội thất bóng */}
            <rect x="380" y="570" width="220" height="54" fill="#3d3228" />
            <rect x="380" y="546" width="220" height="26" fill="#2c2520" />
            <rect x="860" y="540" width="14" height="84" fill="#2c2520" />
            <circle cx="867" cy="534" r="26" fill="#f4f1ea" opacity="0.22" />
            <rect x="1020" y="580" width="170" height="44" fill="#3d3228" />
            {/* Sân hiên và hồ nước phản chiếu */}
            <rect y="644" width="1600" height="256" fill="#1b1b1d" />
            <rect x="240" y="690" width="1120" height="64" fill="#3b4244" />
            <rect x="240" y="690" width="1120" height="3" fill="#7a6f5f" opacity="0.7" />
            <rect x="330" y="710" width="300" height="3" fill="#bfa678" opacity="0.35" />
            <rect x="900" y="722" width="260" height="3" fill="#bfa678" opacity="0.28" />
            <rect y="780" width="1600" height="120" fill="#141416" />
          </svg>
          )}
        </div>

        {/* LỚP PHỦ PHẲNG Than chì để chữ đọc rõ (không gradient) */}
        <div className="absolute inset-0 bg-than-chi/45" aria-hidden="true" />

        {/* HAI TẤM CỬA TRƯỢT */}
        <div className="pointer-events-none absolute inset-0 flex" aria-hidden="true">
          {(["trai", "phai"] as const).map((ben) => {
            const dau = ben === "trai" ? -1 : 1;
            return (
              <div
                key={ben}
                className="relative h-full w-1/2"
                style={{
                  transform: `translate3d(${dau * dich + lech * 2}%, 0, 0)`,
                  transition: giamChuyenDong ? "none" : "transform 0.15s linear",
                }}
              >
                {/* Kính mờ + khung nhôm Than chì mảnh */}
                <div className="absolute inset-0 border border-inox/30 bg-kinh-suong/10" />
                <div
                  className={`absolute inset-y-0 ${ben === "trai" ? "right-0" : "left-0"} w-3 bg-than-chi`}
                />
                <div
                  className={`absolute inset-y-0 ${ben === "trai" ? "left-0" : "right-0"} w-2 bg-than-chi`}
                />
                <div className="absolute inset-x-0 top-0 h-2 bg-than-chi" />
                <div className="absolute inset-x-0 bottom-0 h-3 bg-than-chi" />
                {/* Tay nắm nhỏ */}
                <div
                  className={`absolute top-1/2 h-24 w-[3px] -translate-y-1/2 bg-champagne ${
                    ben === "trai" ? "right-6" : "left-6"
                  }`}
                />
                {/* Vệt sáng phẳng lướt qua kính */}
                <div
                  className="absolute inset-y-0 w-10 bg-nga/10"
                  style={{ left: `${(ben === "trai" ? 20 : 55) + doMo * 20}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* KHUNG BAO mảnh 1px lùi 24px (gợi khung cửa) */}
        <div className="pointer-events-none absolute inset-4 border border-inox/40 md:inset-6" aria-hidden="true" />

        {/* CHỮ — góc dưới trái, kiểu poster phim */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ opacity: chuMo, transform: `translateY(${(1 - chuMo) * 24}px)` }}
        >
          <div className="mx-auto max-w-[1440px] px-8 pb-10 md:px-14 md:pb-16">
            <p className="nhan-muc text-champagne">Premium Window &amp; Door</p>
            <h1 className="tieu-de mt-4 max-w-3xl text-[clamp(1.75rem,4.4vw,3.75rem)] text-nga lg:max-w-5xl lg:uppercase [text-wrap:balance]">
              <span className="block">Kiến tạo không gian sống</span>
              <span className="block">xứng tầm đẳng cấp</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-light text-nga/90 md:text-lg">
              Hệ thống nhôm cầu cách nhiệt tiêu chuẩn châu Âu. Tận hưởng sự tĩnh lặng và tầm nhìn
              tràn viền cho biệt thự và penthouse.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/trai-nghiem#sample-box" className="nut nut-chinh sm:max-w-sm">
                Đăng Ký Trải Nghiệm Hộp Mẫu Góc Nhôm Tận Nơi
              </Link>
              <Link href="/trai-nghiem#showroom" className="nut nut-vien sm:max-w-sm">
                Đặt Lịch Trải Nghiệm Showroom Thực Tế
              </Link>
            </div>
          </div>
        </div>

        {/* Nhãn minh họa + chỉ số kiểu tạp chí */}
        <p className="absolute right-8 top-24 text-[11px] font-light text-nga/70 md:right-14">
          01 / 09
        </p>
        <p className="absolute bottom-3 right-8 text-[11px] font-light text-nga/70 md:right-14 md:bottom-5">
          Hình ảnh mang tính minh họa
        </p>

        {/* Vạch cuộn */}
        <div
          className="absolute bottom-24 right-8 hidden h-20 w-px bg-inox/40 md:block"
          style={{ opacity: chuMo }}
          aria-hidden="true"
        >
          <div className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-champagne" style={{ top: `${tienDoCuon * 90}%` }} />
        </div>
      </div>
    </section>
  );
}
