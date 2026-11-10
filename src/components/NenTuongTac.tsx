"use client";

import { useEffect } from "react";

/**
 * Nền kỹ thuật tương tác chuột (10/11/2026): khi rê chuột trên khối nền tối, hình mặt cắt nhôm sáng lên quanh con trỏ.
 * Chỉ đặt hai biến CSS --mx và --my; không dùng trên màn hình cảm ứng; tôn trọng "giảm chuyển động".
 */
export function NenTuongTac() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let truoc: HTMLElement | null = null;
    let khung = 0;
    const roi = () => {
      if (truoc) {
        truoc.style.removeProperty("--mx");
        truoc.style.removeProperty("--my");
        truoc = null;
      }
    };
    const dichuyen = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as HTMLElement | null)?.closest?.(".nen-toi, .nen-ky-thuat") as HTMLElement | null;
      cancelAnimationFrame(khung);
      khung = requestAnimationFrame(() => {
        if (el !== truoc) roi();
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        truoc = el;
      });
    };
    document.addEventListener("pointermove", dichuyen, { passive: true });
    return () => {
      document.removeEventListener("pointermove", dichuyen);
      cancelAnimationFrame(khung);
      roi();
    };
  }, []);
  return null;
}
