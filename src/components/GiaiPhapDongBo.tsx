"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
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
    <section className="nen-toi py-8 text-white md:py-10">
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
            <div className="relative h-[clamp(150px,28svh,280px)] overflow-hidden rounded-[12px] bg-white">
              <Image src={asset("/images/engineering/exploded-profiles.webp")} alt="Hình tách lớp các thành phần profile, kính và gioăng (hình minh họa)" fill quality={70} sizes="(min-width: 1024px) 45vw, 100vw" className="object-contain" />
            </div>
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
