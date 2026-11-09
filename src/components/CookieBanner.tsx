"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const KHOA = "winduca-cookie";

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

/**
 * Cookie banner: từ chối mặc định cho cookie không thiết yếu.
 * Chưa có công cụ đo lường nào được bật ở mốc này; GA4, Meta Pixel và Google Maps
 * chỉ được nạp khi giá trị là "dong-y".
 */
export function CookieBanner() {
  const luaChon = useSyncExternalStore(dangKy, doc, () => "dong-bo");

  if (luaChon !== "") return null; // đã chọn, hoặc đang ở máy chủ

  const chon = (v: "dong-y" | "tu-choi") => {
    try {
      window.localStorage.setItem(KHOA, v);
    } catch {
      /* bỏ qua */
    }
    window.dispatchEvent(new Event("winduca-cookie-doi"));
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie"
      className="kinh-mo fixed bottom-4 left-4 z-[60] max-w-[22rem] rounded-sm p-4 text-sm text-nga"
    >
      <p>
        Chúng tôi chỉ dùng cookie cần thiết cho website. Cookie đo lường và bản đồ chỉ chạy khi anh chị đồng ý.{" "}
        <Link href="/chinh-sach-cookie" className="underline">
          Chính sách cookie
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => chon("tu-choi")} className="nut nut-vien !min-h-10 flex-1 !py-2">
          Từ chối
        </button>
        <button type="button" onClick={() => chon("dong-y")} className="nut nut-chinh !min-h-10 flex-1 !py-2">
          Đồng ý
        </button>
      </div>
    </div>
  );
}
