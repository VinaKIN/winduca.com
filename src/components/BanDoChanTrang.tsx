"use client";

import { useState, useSyncExternalStore } from "react";

const KHOA = "winduca-cookie";

function dangKy(onChange: () => void) {
  window.addEventListener("winduca-cookie-doi", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("winduca-cookie-doi", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function docDongY(): boolean {
  try {
    return window.localStorage.getItem(KHOA) === "dong-y";
  } catch {
    return false;
  }
}

/**
 * Bản đồ chân trang. Theo chính sách cookie, Google Maps chỉ được nạp khi khách đã đồng ý cookie
 * hoặc bấm "Tải bản đồ". Trước đó hiện hình bản đồ vẽ sẵn (không gọi dịch vụ bên ngoài).
 * Nền bản đồ thật được đổi sang tông tối bằng bộ lọc màu để hợp giao diện.
 */
export function BanDoChanTrang({ diaChi, mapsUrl }: { diaChi: string; mapsUrl: string }) {
  const dongY = useSyncExternalStore(dangKy, docDongY, () => false);
  const [bam, setBam] = useState(false);
  const hienThat = dongY || bam;

  return (
    <div className="relative h-[260px] overflow-hidden rounded-[10px] border border-white/10 bg-[#1d1a1b] md:h-[340px]">
      {hienThat ? (
        <iframe
          title="Bản đồ văn phòng WINDUCA"
          src={`https://www.google.com/maps?q=${encodeURIComponent(diaChi)}&hl=vi&z=16&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.9)_contrast(0.92)_brightness(0.95)]"
        />
      ) : (
        <>
          <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            <rect width="600" height="320" fill="#1d1a1b" />
            <g stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1">
              {Array.from({ length: 11 }, (_, k) => (
                <path key={`v${k}`} d={`M${k * 60} 0V320`} />
              ))}
              {Array.from({ length: 6 }, (_, k) => (
                <path key={`h${k}`} d={`M0 ${k * 64}H600`} />
              ))}
            </g>
            <g stroke="#ffffff" strokeOpacity="0.2" strokeWidth="6" strokeLinecap="round">
              <path d="M-10 230C120 210 180 150 300 140S480 110 620 60" />
              <path d="M120 -10C140 90 210 150 250 330" />
              <path d="M420 -10C400 80 380 140 400 330" />
            </g>
            <g stroke="#ffffff" strokeOpacity="0.1" strokeWidth="3" strokeLinecap="round">
              <path d="M-10 120C80 120 160 90 240 60S400 20 620 30" />
              <path d="M-10 290C100 280 220 300 330 270S520 250 620 280" />
              <path d="M520 -10C500 90 540 200 560 330" />
            </g>
            <path d="M-10 190C100 190 210 175 300 140" stroke="#e31937" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
          <span className="absolute left-[50%] top-[40%] z-10 -translate-x-1/2 -translate-y-full" aria-hidden="true">
            <svg viewBox="0 0 24 32" width="34" height="44" className="drop-shadow-[0_8px_14px_rgba(227,25,55,0.55)]">
              <path d="M12 0C5.4 0 0 5.2 0 11.6 0 20 12 32 12 32s12-12 12-20.4C24 5.2 18.6 0 12 0Z" fill="#e31937" />
              <circle cx="12" cy="11.5" r="4.5" fill="#fff" />
            </svg>
          </span>
          <div className="absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-2 px-4 text-center">
            <button type="button" onClick={() => setBam(true)} className="nut nut-chinh !min-h-[2.5rem] !px-5 !py-2">
              Tải bản đồ
            </button>
            <p className="text-xs text-white/55">Bản đồ Google chỉ tải khi anh chị bấm hoặc đã đồng ý cookie.</p>
          </div>
        </>
      )}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-[4px] bg-than-chi/90 px-4 py-2.5 text-[15px] text-white transition-colors hover:bg-accent"
      >
        Mở trong Maps
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </svg>
      </a>
    </div>
  );
}
