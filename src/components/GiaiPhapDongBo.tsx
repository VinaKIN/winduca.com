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

/**
 * Năm cảnh 2D nét mảnh, mỗi cảnh ứng với một thành phần. Chọn thành phần thì hình đổi theo và các nét vẽ lại dần.
 * Hình chỉ mang tính minh họa chung về vai trò của từng thành phần, không phải bản vẽ hay thông số sản phẩm.
 */
const NET = { fill: "none", stroke: "#ffffff", strokeOpacity: 0.85, strokeWidth: 1.2 } as const;
const DO = { fill: "none", stroke: "#e31937", strokeWidth: 2 } as const;
const CHU = { fill: "#ffffff", fillOpacity: 0.7, fontSize: 9, letterSpacing: 1.4, fontWeight: 600 } as const;

function Nhan({ x, y, t, d = false, small = false }: { x: number; y: number; t: string; d?: boolean; small?: boolean }) {
  return (
    <text x={x} y={y} {...CHU} fontSize={small ? 7.5 : 9} letterSpacing={small ? 0.6 : 1.4} fill={d ? "#e31937" : "#ffffff"} fillOpacity={d ? 1 : 0.7}>
      {t}
    </text>
  );
}
function Diem({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="4" fill="#e31937" stroke="none" />;
}

const CANH = [
  // 1 · Hệ profile nhôm: hai khoang nhôm nối bằng thanh cầu
  () => (
    <g>
      <rect x="60" y="64" width="110" height="92" {...NET} />
      <rect x="74" y="78" width="82" height="64" {...NET} />
      <path d="M74 110H156M115 78V142" {...NET} />
      <rect x="170" y="86" width="34" height="48" {...DO} />
      <path d="M170 98l34-12M170 112l34-12M170 126l34-12M170 134l34-10" {...DO} strokeWidth="1" />
      <rect x="204" y="64" width="110" height="92" {...NET} />
      <rect x="218" y="78" width="82" height="64" {...NET} />
      <path d="M218 110H300M259 78V142" {...NET} />
      <rect x="330" y="36" width="8" height="150" {...NET} />
      <path d="M314 96q10 8 0 16t0 16" {...NET} />
      <path d="M187 86L226 40H300" {...DO} strokeWidth="1" />
      <Diem x={187} y={86} />
      <Nhan x={232} y={34} t="THANH CẦU" d />
      <Nhan x={60} y={54} t="KHOANG NHÔM" />
      <Nhan x={300} y={206} t="RÃNH KÍNH" />
    </g>
  ),
  // 2 · Hệ kính: hai lớp kính ngăn bằng thanh giữ
  () => (
    <g>
      <rect x="140" y="30" width="12" height="170" {...NET} />
      <rect x="248" y="30" width="12" height="170" {...NET} />
      <rect x="152" y="30" width="96" height="14" {...NET} />
      <rect x="152" y="186" width="96" height="14" {...NET} />
      <path d="M152 44l14-14M152 58l28-28M152 72l42-42M152 86l56-56M152 100l70-70" {...NET} strokeOpacity="0.35" strokeWidth="1" />
      <path d="M160 115H240M160 108v14M240 108v14" {...DO} />
      <path d="M160 115l8-4v8zM240 115l-8-4v8z" fill="#e31937" stroke="none" />
      <Nhan x={162} y={142} t="KHOẢNG TRỐNG" d small />
      <Nhan x={60} y={112} t="KÍNH NGOÀI" />
      <Nhan x={272} y={112} t="KÍNH TRONG" />
    </g>
  ),
  // 3 · Phụ kiện đồng bộ: tay nắm và bản lề
  () => (
    <g>
      <circle cx="120" cy="115" r="26" {...NET} />
      <circle cx="120" cy="115" r="12" {...NET} />
      <path d="M132 107h120q12 0 12 8t-12 8H132z" {...DO} />
      <rect x="320" y="46" width="12" height="52" {...NET} />
      <rect x="320" y="132" width="12" height="52" {...NET} />
      <circle cx="326" cy="115" r="9" {...NET} />
      <path d="M326 98v8M326 124v8" {...NET} />
      <path d="M320 70h-10M320 160h-10" {...NET} strokeDasharray="3 3" />
      <Diem x={220} y={115} />
      <Nhan x={190} y={96} t="TAY NẮM" d />
      <Nhan x={296} y={206} t="BẢN LỀ" />
      <Nhan x={86} y={166} t="ĐẾ TAY NẮM" />
    </g>
  ),
  // 4 · Gioăng và vật liệu kết nối: gioăng ôm kính, góc liên kết
  () => (
    <g>
      <path d="M70 60h140v110" {...NET} />
      <path d="M70 76h124v94" {...NET} />
      <rect x="248" y="34" width="10" height="150" {...NET} />
      <path d="M214 56q14 12 0 24t0 24 0 24 0 24 0 24" {...DO} />
      <path d="M70 170h54v-54" {...NET} strokeDasharray="4 3" />
      <circle cx="84" cy="156" r="3" {...NET} />
      <circle cx="108" cy="156" r="3" {...NET} />
      <path d="M232 70l16 0M232 150l16 0" {...NET} />
      <Diem x={214} y={92} />
      <Nhan x={270} y={96} t="GIOĂNG" d />
      <Nhan x={70} y={196} t="GÓC LIÊN KẾT" />
    </g>
  ),
  // 5 · Giải pháp lắp đặt: khung cố định vào tường bằng neo
  () => (
    <g>
      <rect x="50" y="34" width="100" height="150" {...NET} />
      <path d="M50 64l30-30M50 94l60-60M50 124l90-90M50 154l100-100M62 184l88-88M92 184l58-58M122 184l28-28" {...NET} strokeOpacity="0.35" strokeWidth="1" />
      <rect x="150" y="54" width="54" height="110" {...NET} />
      <path d="M204 76h34M204 142h34" {...NET} />
      <path d="M110 82h64M110 136h64" {...DO} />
      <circle cx="110" cy="82" r="3.5" fill="#e31937" stroke="none" />
      <circle cx="110" cy="136" r="3.5" fill="#e31937" stroke="none" />
      <path d="M150 206H204M150 198v16M204 198v16" {...NET} />
      <Nhan x={64} y={26} t="TƯỜNG" />
      <Nhan x={218} y={112} t="KHUNG CỬA" />
      <Nhan x={216} y={150} t="NEO CỐ ĐỊNH" d />
    </g>
  ),
];

export function GiaiPhapDongBo() {
  const [i, setI] = useState(0);
  return (
    <section className="nen-toi py-6 text-white">
      <Wrap>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="min-w-0">
            <p className="nhan-muc text-accent">Giải pháp đồng bộ</p>
            <h2 className="mt-3 text-[clamp(1.4rem,2.6vw,2.25rem)] font-medium uppercase leading-[1.15] tracking-[0.01em]">
              Một giải pháp.
              <span className="block font-light">Đồng bộ từng thành phần.</span>
            </h2>
            <ol className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:mt-6 md:block md:divide-y md:divide-white/15 md:overflow-visible md:border-y md:border-white/15 md:pb-0 [&::-webkit-scrollbar]:hidden">
              {TP.map((x, k) => (
                <li key={x.t}>
                  <button
                    type="button"
                    onClick={() => setI(k)}
                    onMouseEnter={() => setI(k)}
                    aria-pressed={i === k}
                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-left transition-colors md:w-full md:gap-4 md:rounded-none md:border-0 md:px-0 md:py-3 ${i === k ? "border-accent text-accent" : "border-white/25 text-white/80 hover:text-white"}`}
                  >
                    <span className="w-6 text-sm font-semibold">{String(k + 1).padStart(2, "0")}</span>
                    <span className="text-base font-medium">{x.t}</span>
                  </button>
                </li>
              ))}
            </ol>
            <Link href="/nang-luc-xuong" className="nut nut-chinh mt-5 md:mt-7">
              Xem năng lực và xưởng
            </Link>
          </div>

          <div className="rounded-[24px] border border-white/15 p-5 md:p-6">
            <svg viewBox="30 14 340 208" className="h-[clamp(150px,28svh,280px)] w-full" role="img" aria-label={`Hình 2D minh họa: ${TP[i].t}`}>
              <g key={i} className="canh-2d">
                {CANH[i]()}
              </g>
            </svg>
            <div className="mt-3 border-t border-white/15 pt-4">
              <h3 className="text-lg font-semibold">{TP[i].t}</h3>
              <p className="mt-2 max-w-md text-[15px] font-light leading-relaxed text-white/75">{TP[i].m}</p>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
