"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent, type ReactNode } from "react";

/**
 * Hiệu ứng dùng chung (10/11/2026): hiện dần khi cuộn, kéo chuốt ngang, nút hút nhẹ, parallax nền.
 * Tất cả tắt khi người dùng chọn giảm chuyển động. Nội dung luôn hiển thị nếu JavaScript không chạy.
 */

const giamChuyenDong = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Hiện dần + trượt nhẹ khi phần tử vào khung nhìn. */
export function Hien({ children, className = "", tre = 0, as: Tag = "div" }: { children: ReactNode; className?: string; tre?: number; as?: "div" | "li" | "section" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tt, setTt] = useState<"" | "an" | "hien">("");

  useEffect(() => {
    const el = ref.current;
    if (!el || giamChuyenDong()) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) return; // đã nằm trong khung nhìn: không ẩn
    const t0 = setTimeout(() => setTt("an"), 0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTt("hien");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => {
      clearTimeout(t0);
      io.disconnect();
    };
  }, []);

  const kieu: CSSProperties | undefined = tre ? { transitionDelay: `${tre}ms` } : undefined;
  return (
    <Tag
      ref={ref as never}
      style={kieu}
      className={`${className} ${tt === "an" ? "translate-y-7 opacity-0" : tt === "hien" ? "translate-y-0 opacity-100 transition-[opacity,transform] duration-700 ease-out" : ""}`}
    >
      {children}
    </Tag>
  );
}

/** Danh sách vuốt/kéo chuốt ngang bằng chuột hoặc cảm ứng. */
export function KeoNgang({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const st = useRef({ giu: false, x: 0, trai: 0, keo: false });
  const [dangKeo, setDangKeo] = useState(false);

  function xuong(e: RPointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return; // cảm ứng đã vuốt được
    const el = ref.current;
    if (!el) return;
    st.current = { giu: true, x: e.clientX, trai: el.scrollLeft, keo: false };
  }
  function di(e: RPointerEvent<HTMLDivElement>) {
    const s = st.current;
    const el = ref.current;
    if (!s.giu || !el) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 5) {
      s.keo = true;
      setDangKeo(true);
    }
    el.scrollLeft = s.trai - dx;
  }
  function len() {
    st.current.giu = false;
    setDangKeo(false);
  }

  return (
    <div
      ref={ref}
      onPointerDown={xuong}
      onPointerMove={di}
      onPointerUp={len}
      onPointerLeave={len}
      onClickCapture={(e) => {
        if (st.current.keo) {
          e.preventDefault();
          e.stopPropagation();
          st.current.keo = false;
        }
      }}
      className={`flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:cursor-grab ${dangKeo ? "cursor-grabbing select-none md:snap-none" : "snap-x snap-mandatory"} ${className}`}
    >
      {children}
    </div>
  );
}

/** Nút/liên kết hút nhẹ về phía con trỏ (chỉ chuột, desktop). */
export function NutHut({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  // Bỏ hiệu ứng nút bám theo con trỏ (17/11/2026): nút đứng yên, chỉ đổi màu khi rê
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Nền parallax: dịch chậm hơn nội dung khi cuộn. */
export function NenParallax({ children, className = "" }: { children: ReactNode; className?: string }) {
  // Bỏ parallax nền (17/11/2026): ảnh nền đứng yên khi cuộn
  return <div className={`absolute inset-0 ${className}`}>{children}</div>;
}
