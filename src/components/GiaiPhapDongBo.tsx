"use client";

import { useState } from "react";
import Link from "next/link";
import { Wrap } from "./ui";

/**
 * Giải pháp đồng bộ (đề xuất 10/11/2026): năm thành phần của một bộ cửa, chọn từng thành phần để xem mô tả ngắn.
 * Sơ đồ là hình tách lớp phẳng (không phải mô hình thật của sản phẩm); mô tả chỉ nêu vai trò chung, không số liệu.
 */
const TP = [
  { t: "Hệ profile nhôm", m: "Khung nhôm định hình cho cửa đi, cửa sổ và vách kính, tối ưu cho khẩu độ lớn và đường nét mảnh." },
  { t: "Hệ kính", m: "Kính được chọn theo công năng và vị trí lắp đặt của từng không gian." },
  { t: "Phụ kiện đồng bộ", m: "Bản lề, tay nắm, khóa và cơ cấu vận hành được chọn đồng bộ với hệ nhôm." },
  { t: "Gioăng và vật liệu kết nối", m: "Gioăng và vật liệu kết nối giúp các thành phần liên kết khít và gọn." },
  { t: "Giải pháp lắp đặt", m: "Đội kỹ thuật bóc tách theo bản vẽ và lắp đặt tại công trình, đến khi nghiệm thu." },
];

export function GiaiPhapDongBo() {
  const [i, setI] = useState(0);
  return (
    <section className="bg-than-chi py-8 text-white md:py-10">
      <Wrap>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <p className="nhan-muc text-accent">Giải pháp đồng bộ</p>
            <h2 className="mt-3 text-[clamp(1.4rem,2.6vw,2.25rem)] font-medium uppercase leading-[1.15] tracking-[0.01em]">
              Một giải pháp.
              <span className="block font-light">Đồng bộ từng thành phần.</span>
            </h2>
            <ol className="mt-6 divide-y divide-white/15 border-y border-white/15">
              {TP.map((x, k) => (
                <li key={x.t}>
                  <button
                    type="button"
                    onClick={() => setI(k)}
                    onMouseEnter={() => setI(k)}
                    aria-pressed={i === k}
                    className={`flex w-full items-center gap-4 py-3 text-left transition-colors ${i === k ? "text-accent" : "text-white/80 hover:text-white"}`}
                  >
                    <span className="w-6 text-sm font-semibold">{String(k + 1).padStart(2, "0")}</span>
                    <span className="text-base font-medium">{x.t}</span>
                  </button>
                </li>
              ))}
            </ol>
            <Link href="/nang-luc-xuong" className="nut nut-chinh mt-7">
              Xem năng lực và xưởng
            </Link>
          </div>

          <div className="rounded-[24px] border border-white/15 p-5 md:p-6">
            <svg viewBox="0 0 400 230" className="h-[clamp(130px,24svh,260px)] w-full" role="img" aria-label="Sơ đồ tách lớp năm thành phần của bộ cửa (minh họa phẳng)">
              {TP.map((_, k) => {
                const y = 24 + k * 38;
                const x = 40 + k * 22;
                const on = i === k;
                return (
                  <g key={k} className="transition-all duration-300" opacity={on ? 1 : 0.55}>
                    <path d={`M${x} ${y + 22} l30 -22 h250 l-30 22 z`} fill="none" stroke={on ? "#e31937" : "#ffffff"} strokeWidth={on ? 2 : 1} />
                    <path d={`M${x} ${y + 22} h250 v10 h-250 z`} fill={on ? "#e31937" : "none"} stroke={on ? "#e31937" : "#ffffff"} strokeWidth="1" />
                    <text x={x + 262} y={y + 18} fill={on ? "#e31937" : "#ffffff"} fontSize="11" fontWeight="600">{String(k + 1).padStart(2, "0")}</text>
                  </g>
                );
              })}
            </svg>
            <div className="mt-3 border-t border-white/15 pt-4">
              <h3 className="text-lg font-semibold">{TP[i].t}</h3>
              <p className="mt-2 max-w-md text-sm font-light text-white/75">{TP[i].m}</p>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
