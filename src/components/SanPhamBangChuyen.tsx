"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { ThongSoBon } from "./ThongSoBon";
import { asset } from "@/lib/asset";
import { ANH_THEO_KIEU, SAN_PHAM } from "@/lib/san-pham";

/**
 * Băng chuyền "Hệ cửa nổi bật" (kiểu Winboss): thẻ tối, ảnh trái + 4 dòng thông số phải, mũi tên và chấm bên dưới.
 * 11/11/2026: chuyển từ 4 kiểu cửa sang 9 sản phẩm theo chức năng (không tên hãng).
 */
export function SanPhamBangChuyen() {
  const ds = useRef<HTMLUListElement>(null);
  const [chiSo, setChiSo] = useState(0);
  const [dangKeo, setDangKeo] = useState(false);
  const keo = useRef({ giu: false, x: 0, trai: 0, daKeo: false, vx: 0, tx: 0 });
  const tong = SAN_PHAM.length;

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
    const n = Math.max(0, Math.min(tong - 1, k));
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
        aria-label="Danh sách sản phẩm nổi bật"
        className={`flex gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:gap-6 md:px-10 [&::-webkit-scrollbar]:hidden [&_img]:pointer-events-none [&_a]:[-webkit-user-drag:none] md:select-none ${
          dangKeo ? "cursor-grabbing [scroll-snap-type:none]" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {SAN_PHAM.map((p, n) => {
          const a = ANH_THEO_KIEU[p.kieu];
          return (
            <li
              key={p.slug}
              className="group relative grid w-[88%] shrink-0 snap-center overflow-hidden rounded-[28px] bg-than-chi text-white md:w-[78%] md:grid-cols-[1.1fr_1fr] md:rounded-[36px]"
            >
              <div className="relative min-h-[160px] md:min-h-[300px]">
                <Image src={asset(a.src)} alt={`${p.ten} trong không gian kiến trúc`} fill quality={60} sizes="(min-width: 768px) 45vw, 88vw" className="object-cover" draggable={false} />
                <Image src={asset(a.hover)} alt="" fill quality={60} sizes="(min-width: 768px) 45vw, 88vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" draggable={false} />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="nhan-muc text-accent">
                  {p.nhom} · {String(n + 1).padStart(2, "0")} / {String(tong).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl font-bold md:text-3xl">{p.ten}</h3>
                <p className="mt-2 text-[15px] font-light leading-relaxed text-white/80">{p.mota}</p>
                <ThongSoBon sp={p} toi lop="mt-4 border-t border-white/15 pt-4" />
                <Link href={`/he-cua/${p.kieu}`} draggable={false} className="nut nut-chinh mt-6 self-start">
                  Khám phá ngay
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Sản phẩm trước"
          aria-disabled={chiSo === 0 ? true : undefined}
          onClick={() => toi(chiSo - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-than-chi text-white transition-colors hover:bg-accent aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:bg-than-chi"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
        <div className="flex flex-wrap justify-center gap-2">
          {SAN_PHAM.map((p, n) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Đến ${p.ten}`}
              aria-current={n === chiSo}
              onClick={() => toi(n)}
              className={`h-2 rounded-full transition-all ${n === chiSo ? "w-6 bg-accent" : "w-2 bg-than-chi/25 hover:bg-than-chi/50"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Sản phẩm sau"
          aria-disabled={chiSo >= tong - 1 ? true : undefined}
          onClick={() => toi(chiSo + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-than-chi text-white transition-colors hover:bg-accent aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:bg-than-chi"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
