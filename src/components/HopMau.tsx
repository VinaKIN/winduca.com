"use client";

import { useState } from "react";

const MON = [
  { ten: "Góc nhôm các màu", mota: "Các góc nhôm anode hóa và sơn tĩnh điện nhiều màu để anh chị chạm và so với không gian nhà mình.", x: 36, y: 150 },
  { ten: "Lát cắt thanh nhôm cầu cách nhiệt", mota: "Mẫu lát cắt thu nhỏ, nhìn rõ hai nửa khung nhôm và thanh cầu cách nhiệt ở giữa.", x: 130, y: 150 },
  { ten: "Mẫu kính", mota: "Mảnh kính mẫu để cảm nhận độ trong và độ dày của kính hộp.", x: 224, y: 150 },
  { ten: "Đoạn gioăng và tay nắm", mota: "Đoạn gioăng EPDM và mẫu tay nắm — chạm thử độ êm và cảm giác cầm nắm.", x: 318, y: 150 },
];

/** Hộp mẫu minh họa (SVG phẳng): nắp mở, bấm từng món để xem mô tả. */
export function HopMau() {
  const [chon, setChon] = useState(0);
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="relative border border-inox/25 bg-[#232325] p-4">
        <svg viewBox="0 0 440 280" className="h-[clamp(200px,34svh,300px)] w-full" role="img" aria-label="Hộp mẫu góc nhôm mở nắp, minh họa">
          {/* nắp hộp mở */}
          <polygon points="30,40 410,40 392,96 48,96" fill="#2b2b2d" stroke="#c8c9c6" strokeOpacity="0.45" />
          <rect x="196" y="58" width="48" height="22" fill="none" stroke="#bfa678" strokeWidth="1" />
          {/* thân hộp */}
          <rect x="30" y="100" width="380" height="150" fill="#1a1a1c" stroke="#c8c9c6" strokeOpacity="0.45" />
          {/* các ngăn */}
          {MON.map((m, i) => (
            <g key={m.ten} onClick={() => setChon(i)} style={{ cursor: "pointer" }}>
              <rect
                x={m.x}
                y={m.y - 34}
                width="76"
                height="84"
                fill={chon === i ? "#3a342b" : "#242426"}
                stroke={chon === i ? "#bfa678" : "#c8c9c6"}
                strokeOpacity={chon === i ? 1 : 0.3}
              />
              {i === 0 && (
                <>
                  <rect x={m.x + 10} y={m.y - 20} width="26" height="26" fill="#bfa678" />
                  <rect x={m.x + 40} y={m.y - 20} width="26" height="26" fill="#2b2b2d" stroke="#c8c9c6" strokeOpacity="0.5" />
                  <rect x={m.x + 10} y={m.y + 12} width="26" height="26" fill="#6b5848" />
                  <rect x={m.x + 40} y={m.y + 12} width="26" height="26" fill="#c8c9c6" />
                </>
              )}
              {i === 1 && (
                <>
                  <rect x={m.x + 8} y={m.y - 18} width="24" height="50" fill="none" stroke="#bfa678" />
                  <rect x={m.x + 44} y={m.y - 18} width="24" height="50" fill="none" stroke="#bfa678" />
                  <rect x={m.x + 32} y={m.y - 2} width="12" height="14" fill="#f4f1ea" />
                </>
              )}
              {i === 2 && <rect x={m.x + 14} y={m.y - 22} width="48" height="62" fill="#dde3df" fillOpacity="0.5" stroke="#dde3df" strokeOpacity="0.6" />}
              {i === 3 && (
                <>
                  <rect x={m.x + 10} y={m.y - 14} width="56" height="9" fill="#4a4a4e" />
                  <rect x={m.x + 28} y={m.y + 4} width="5" height="34" fill="#bfa678" />
                  <rect x={m.x + 14} y={m.y + 4} width="34" height="5" fill="#bfa678" />
                </>
              )}
              <text x={m.x + 38} y={m.y + 68} textAnchor="middle" fontSize="9" fill="#f4f1ea" fillOpacity="0.8" fontFamily="sans-serif">
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <ul className="divide-y divide-than-chi/15 border-y border-than-chi/15">
        {MON.map((m, i) => (
          <li key={m.ten}>
            <button
              type="button"
              onClick={() => setChon(i)}
              aria-pressed={chon === i}
              className="flex w-full items-start gap-4 py-2.5 text-left"
            >
              <span className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold">
                  {String(i + 1).padStart(2, "0")} · {m.ten}
                </span>
                {chon === i && <span className="mt-1 block text-sm text-than-chi/80">{m.mota}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
