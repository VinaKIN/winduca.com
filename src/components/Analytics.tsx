"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

/**
 * GA4 (10/11/2026): CHỈ nạp khi (1) đã đặt NEXT_PUBLIC_GA_ID và (2) khách bấm "Đồng ý" ở banner cookie.
 * Không có mã đo lường, không nạp gì. Sự kiện chuyển đổi gửi qua suKien() trong lib/analytics.ts.
 * Không gửi tên, số điện thoại hay email: chỉ gửi loại biểu mẫu và mã tiếp nhận.
 */
const KHOA = "winduca-cookie";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function dangKy(onChange: () => void) {
  window.addEventListener("winduca-cookie-doi", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("winduca-cookie-doi", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function doc(): string {
  try {
    return window.localStorage.getItem(KHOA) ?? "";
  } catch {
    return "";
  }
}

export function Analytics() {
  const luaChon = useSyncExternalStore(dangKy, doc, () => "");
  if (!GA_ID || luaChon !== "dong-y") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-khoi-tao" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
