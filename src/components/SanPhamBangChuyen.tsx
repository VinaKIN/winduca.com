"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { KIEU_CUA } from "@/lib/site";
import { NhanMinhHoa } from "./ui";

/** Băng chuyền "Hệ cửa nổi bật" (kiểu Winboss): thẻ tối, ảnh trái + thông số phải, mũi tên và chấm bên dưới. */

const ANH = [
  { src: "/images/chu-nha.jpg", pos: "70% 50%" },
  { src: "/images/hero.jpg", pos: "20% 50%" },
  { src: "/images/chu-nha.jpg", pos: "10% 60%" },
  { src: "/images/hero.jpg", pos: "80% 40%" },
];

export function SanPhamBangChuyen() {
  const ds = useRef<HTMLUListElement>(null);
  const [chiSo, setChiSo] = useState(0);

  function toi(k: number) {
    const el = ds.current;
    if (!el) return;
    const n = Math.max(0, Math.min(KIEU_CUA.length - 1, k));
    const the = el.children[n] as HTMLElement | undefined;
    if (the) el.scrollTo({ left: the.offsetLeft - (el.clientWidth - the.clientWidth) / 2, behavior: "smooth" });
    setChiSo(n);
  }

  function khiCuon() {
    const el = ds.current;
    if (!el) return;
    const giua = el.scrollLeft + el.clientWidth / 2;
    let gan = 0;
    let kc = Infinity;
    Array.from(el.children).forEach((c, k) => {
      const h = c as HTMLElement;
      const d = Math.abs(h.offsetLeft + h.clientWidth / 2 - giua);
      if (d < kc) {
        kc = d;
        gan = k;
      }
    });
    setChiSo(gan);
  }

  return (
    <div>
      <ul
        ref={ds}
        onScroll={khiCuon}
        aria-label="Danh sách hệ cửa"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:gap-6 md:px-[8vw] [&::-webkit-scrollbar]:hidden"
      >
        {KIEU_CUA.map((k, n) => (
          <li
            key={k.slug}
            className="relative grid w-[88%] shrink-0 snap-center overflow-hidden rounded-[28px] bg-than-chi text-white md:w-[78%] md:grid-cols-[1.15fr_1fr] md:rounded-[36px]"
          >
            <div className="relative min-h-[240px] md:min-h-[420px]">
              <Image
                src={asset(ANH[n % ANH.length].src)}
                alt=""
                fill
                quality={60}
                sizes="(min-width: 768px) 45vw, 88vw"
                className="object-cover"
                style={{ objectPosition: ANH[n % ANH.length].pos }}
              />
              <NhanMinhHoa className="left-4 top-4" />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="nhan-muc text-accent">
                Hệ cửa · {String(n + 1).padStart(2, "0")} / {String(KIEU_CUA.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl font-bold md:text-3xl">{k.ten}</h3>
              <p className="mt-2 text-sm font-light text-white/80">{k.tagline}</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 text-sm">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/55">Cách mở</dt>
                  <dd className="mt-1 font-medium leading-snug">{k.cachMo}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/55">Khẩu độ</dt>
                  <dd className="mt-1 font-medium leading-snug">{k.khauDo}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/55">Cách nhiệt</dt>
                  <dd className="mt-1 text-white/70">Đang chờ xác nhận</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/55">Cách âm</dt>
                  <dd className="mt-1 text-white/70">Đang chờ xác nhận</dd>
                </div>
              </dl>
              <Link href={`/he-cua/${k.slug}`} className="nut nut-chinh mt-8 self-start">
                Khám phá ngay
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Hệ cửa trước"
          onClick={() => toi(chiSo - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-than-chi text-white transition-colors hover:bg-accent"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
        <div className="flex gap-2">
          {KIEU_CUA.map((k, n) => (
            <button
              key={k.slug}
              type="button"
              aria-label={`Đến ${k.ten}`}
              aria-current={n === chiSo}
              onClick={() => toi(n)}
              className={`h-2 rounded-full transition-all ${n === chiSo ? "w-6 bg-accent" : "w-2 bg-than-chi/25 hover:bg-than-chi/50"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Hệ cửa sau"
          onClick={() => toi(chiSo + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-than-chi text-white transition-colors hover:bg-accent"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
