"use client";

import { useSyncExternalStore } from "react";

/** Theo dõi media query mà không gọi setState trong effect. Phía máy chủ trả false. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

let coWebGL: boolean | undefined;

/** Kiểm tra trình duyệt có WebGL không (tính một lần). */
export function useWebGL(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => {
      if (coWebGL === undefined) {
        const c = document.createElement("canvas");
        coWebGL = !!(c.getContext("webgl2") || c.getContext("webgl"));
      }
      return coWebGL;
    },
    () => true,
  );
}
