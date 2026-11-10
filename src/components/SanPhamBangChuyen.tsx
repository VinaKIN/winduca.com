"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { asset } from "@/lib/asset";
import { KIEU_CUA } from "@/lib/site";

/** Băng chuyền "Hệ cửa nổi bật" (kiểu Winboss): thẻ tối, ảnh trái + thông số phải, mũi tên và chấm bên dưới. */

const ANH = [
  { src: "/images/products/lift-slide.webp", pos: "50% 50%" },
  { src: "/images/products/casement.webp", pos: "50% 50%" },
  { src: "/images/products/bi-fold.webp", pos: "50% 50%" },
  { src: "/images/products/window.webp", pos: "50% 50%" },
];

const TEN_EN: Record<string, string> = {
  "cua-truot-nang": "Lift & Slide",
  "cua-di-mo-quay": "Casement",
  "cua-xep-truot": "Bi-fold",
  "cua-so": "Window",
};

/** Ảnh thứ hai hiện khi rê chuột (góc nhìn khác của cùng hệ cửa). */
const ANH_HOVER = [
  { src: "/images/products/lift-slide-hover.webp", pos: "50% 50%" },
  { src: "/images/products/casement-hover.webp", pos: "50% 50%" },
  { src: "/images/products/bi-fold-hover.webp", pos: "50% 50%" },
  { src: "/images/products/window-hover.webp", pos: "50% 50%" },
];

export function SanPhamBangChuyen() {
  const ds = useRef<HTMLUListElement>(null);
  const [chiSo, setChiSo] = useState(0);
  const [dangKeo, setDangKeo] = useState(false);
  const keo = useRef({ giu: false, x: 0, trai: 0, daKeo: false, vx: 0, tx: 0 });

  /** Kéo bằng chuột: giữ và rê ngang, thả ra thì thẻ gần nhất tự về giữa (hoặc thẻ kế bên nếu vẩy nhanh). */
  function xuongChuot(e: RPointerEvent<HTMLUListElement>) {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = ds.current;
    if (!el) return;
    keo.current = { giu: true, x: e.clientX, trai: el.scrollLeft, daKeo: false, vx: 0, tx: e.clientX };
  }
  function diChuot(e: RPointerEvent<HTMLUListElement>) {
    const k = keo.current;
    const el = ds.current;
    if (!k.giu || !el) return;
    const dx = e.clientX - k.x;
    if (!k.daKeo && Math.abs(dx) > 6) {
      k.daKeo = true;
      setDangKeo(true);
      el.setPointerCapture(e.pointerId);
    }
    if (k.daKeo) {
      k.vx = e.clientX - k.tx;
      k.tx = e.clientX;
      el.scrollLeft = k.trai - dx;
    }
  }
  function thaChuot() {
    const k = keo.current;
    if (!k.giu) return;
    k.giu = false;
    if (!k.daKeo) return;
    setDangKeo(false);
    const nhanh = Math.abs(k.vx) > 12;
    toi(nhanh ? chiSo + (k.vx < 0 ? 1 : -1) : chiSo);
    // chặn cú bấm sau khi kéo, để không mở nhầm liên kết
    setTimeout(() => {
      keo.current.daKeo = false;
    }, 0);
  }

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
        onPointerDown={xuongChuot}
        onPointerMove={diChuot}
        onPointerUp={thaChuot}
        onPointerCancel={thaChuot}
        onClickCapture={(e) => {
          if (keo.current.daKeo) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        aria-label="Danh sách hệ cửa"
        className={`flex gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:gap-6 md:px-10 [&::-webkit-scrollbar]:hidden [&_img]:pointer-events-none [&_a]:[-webkit-user-drag:none] md:select-none ${
          dangKeo ? "cursor-grabbing [scroll-snap-type:none]" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {KIEU_CUA.map((k, n) => (
          <li
            key={k.slug}
            className="group relative grid w-[88%] shrink-0 snap-center overflow-hidden rounded-[28px] bg-than-chi text-white md:w-[78%] md:grid-cols-[1.15fr_1fr] md:rounded-[36px]"
          >
            <div className="relative min-h-[160px] md:min-h-[300px]">
              <Image
                src={asset(ANH[n % ANH.length].src)}
                alt={`${k.ten} trong không gian kiến trúc`}
                fill
                quality={60}
                sizes="(min-width: 768px) 45vw, 88vw"
                className="object-cover"
                draggable={false}
                style={{ objectPosition: ANH[n % ANH.length].pos }}
              />
              <Image
                src={asset(ANH_HOVER[n % ANH_HOVER.length].src)}
                alt=""
                fill
                quality={60}
                sizes="(min-width: 768px) 45vw, 88vw"
                className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                draggable={false}
                style={{ objectPosition: ANH_HOVER[n % ANH_HOVER.length].pos }}
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <p className="nhan-muc text-accent">
                Hệ cửa · {String(n + 1).padStart(2, "0")} / {String(KIEU_CUA.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl font-bold md:text-3xl">{k.ten}</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-white/60">{TEN_EN[k.slug]}</p>
              <p className="mt-3 text-[15px] font-light leading-relaxed text-white/80">{k.tagline}</p>
              <ul className="mt-4 space-y-1.5 border-t border-white/15 pt-4 text-sm">
                {k.dacDiem.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/he-cua/${k.slug}`} draggable={false} className="nut nut-chinh mt-6 self-start">
                Xem chi tiết
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-center gap-4">
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
