"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { KhungAnhChong, type AnhKhung } from "./KhungAnh";

/**
 * Quy trình kiểm soát chất lượng tương tác (11/11/2026): bấm một bước thì ảnh và thông tin đổi theo.
 * Ảnh là ảnh minh họa; nội dung từng bước là bản nháp tham khảo, đội kỹ thuật sẽ xác nhận chi tiết.
 */
type Buoc = {
  t: string;
  m: string;
  diem: string[];
  chinh: AnhKhung;
  phu: AnhKhung;
};

const BUOC: Buoc[] = [
  {
    t: "Kiểm tra bản vẽ",
    m: "Rà soát bản vẽ và yêu cầu kiến trúc trước khi bóc tách.",
    diem: ["Đối chiếu kích thước từng ô cửa", "Xác nhận kiểu mở và hướng mở", "Ghi chú yêu cầu màu và hoàn thiện"],
    chinh: { src: "/images/xuong/ban-ve-chuyen-gia.webp", alt: "Chuyên viên giải thích mặt cắt trên bản vẽ", chuThich: "Rà soát bản vẽ", so: "FIG. 01", viTri: "center 40%", diem: { x: "40%", y: "36%", nhan: "Mặt cắt, kích thước" } },
    phu: { src: "/images/engineering/section-drawing-1.webp", alt: "Bản vẽ mặt cắt khung cửa", viTri: "center" },
  },
  {
    t: "Kiểm tra vật tư",
    m: "Đối chiếu hệ nhôm, kính và phụ kiện với đề xuất.",
    diem: ["Hệ nhôm đúng đề xuất", "Kính và gioăng đúng loại", "Phụ kiện đồng bộ màu với khung"],
    chinh: { src: "/images/materials/profile-samples.webp", alt: "Mẫu thanh nhôm profile", chuThich: "Đối chiếu vật tư", so: "FIG. 02", viTri: "center", diem: { x: "50%", y: "42%", nhan: "Mẫu thanh nhôm" } },
    phu: { src: "/images/materials/swatches.webp", alt: "Bảng mẫu màu vật liệu", viTri: "center" },
  },
  {
    t: "Kiểm soát gia công",
    m: "Gia công theo bản vẽ và kiểm tra trước khi xuất xưởng.",
    diem: ["Cắt, phay, khoan theo bản vẽ", "Kiểm tra góc ép và lắp cánh", "Kiểm tra trước khi xuất xưởng"],
    chinh: { src: "/images/xuong/may-khoan-nhom.webp", alt: "Gia công thanh nhôm tại xưởng", chuThich: "Gia công tại xưởng", so: "FIG. 03", viTri: "55% 50%", diem: { x: "46%", y: "34%", nhan: "Đầu khoan, phay" } },
    phu: { src: "/images/xuong/kiem-tra-gia-cong.webp", alt: "Kiểm tra chi tiết sau gia công", viTri: "center" },
  },
  {
    t: "Nghiệm thu",
    m: "Kiểm tra vận hành và hoàn thiện tại công trình.",
    diem: ["Chạy thử đóng mở từng cánh", "Kiểm tra độ kín và hoàn thiện", "Bàn giao và hướng dẫn sử dụng"],
    chinh: { src: "/images/products/lift-slide.webp", alt: "Cửa trượt nâng sau khi lắp đặt", chuThich: "Nghiệm thu tại công trình", so: "FIG. 04", viTri: "center", diem: { x: "58%", y: "46%", nhan: "Vận hành cánh cửa" } },
    phu: { src: "/images/products/lift-slide-hover.webp", alt: "Cửa trượt nâng nhìn từ góc khác", viTri: "center" },
  },
];

/** daoBen: đặt ảnh bên phải (xen kẽ với khối ảnh bên trái ở phía trên trang). */
export function QuyTrinhTuongTac({ daoBen = false }: { daoBen?: boolean }) {
  const [i, setI] = useState(0);
  const nut = useRef<(HTMLButtonElement | null)[]>([]);
  const b = BUOC[i];

  function phim(e: KeyboardEvent<HTMLButtonElement>, k: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (k + (e.key === "ArrowRight" ? 1 : BUOC.length - 1)) % BUOC.length;
    setI(n);
    nut.current[n]?.focus();
  }

  return (
    <div className={`grid gap-10 lg:gap-14 ${daoBen ? "lg:grid-cols-[1.1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1.1fr]"}`}>
      {/* Ảnh: bốn khung xếp chồng trong cùng một ô, chỉ khung của bước đang chọn hiện ra */}
      <div className={`grid ${daoBen ? "lg:order-2 lg:-mr-10" : ""}`} aria-live="polite">
        {BUOC.map((x, k) => (
          <div
            key={x.t}
            aria-hidden={k !== i}
            className={`[grid-area:1/1] transition-all duration-500 ease-out ${k === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
          >
            <KhungAnhChong chinh={x.chinh} phu={x.phu} />
          </div>
        ))}
      </div>

      <div className={`relative min-w-0 ${daoBen ? "lg:order-1" : ""}`}>
        <div className="absolute left-0 right-0 top-[1.6rem] hidden h-px bg-than-chi/20 lg:block" aria-hidden="true" />
        <div role="tablist" aria-label="Các bước kiểm soát chất lượng" className="relative grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-6">
          {BUOC.map((x, k) => {
            const dang = k === i;
            return (
              <button
                key={x.t}
                ref={(el) => {
                  nut.current[k] = el;
                }}
                type="button"
                role="tab"
                id={`buoc-${k}`}
                aria-selected={dang}
                aria-controls="buoc-chi-tiet"
                tabIndex={dang ? 0 : -1}
                onClick={() => setI(k)}
                onKeyDown={(e) => phim(e, k)}
                className="group flex flex-col items-start justify-start text-left"
              >
                <span
                  className={`relative z-10 flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full border text-sm font-bold transition-colors duration-300 ${
                    dang ? "border-accent bg-accent text-white" : "border-accent bg-white text-accent group-hover:bg-accent/10"
                  }`}
                >
                  {String(k + 1).padStart(2, "0")}
                </span>
                <span className={`mt-4 block text-xl font-bold transition-colors ${dang ? "text-than-chi" : "text-than-chi/70 group-hover:text-than-chi"}`}>{x.t}</span>
                <span className="mt-2 block text-[15px] leading-relaxed text-than-chi/70">{x.m}</span>
              </button>
            );
          })}
        </div>

        {/* Thông tin của bước đang chọn */}
        <div id="buoc-chi-tiet" role="tabpanel" aria-labelledby={`buoc-${i}`} className="dau-goc mt-8 rounded-[6px] border border-than-chi/10 bg-white p-5 md:p-6">
          <p className="nhan-muc text-accent">
            Bước {String(i + 1).padStart(2, "0")} · {b.t}
          </p>
          <ul key={i} className="mt-4 space-y-2.5 text-[15px] text-than-chi/80">
            {b.diem.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setI((v) => (v + BUOC.length - 1) % BUOC.length)}
              aria-label="Bước trước"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-than-chi/20 transition-colors hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setI((v) => (v + 1) % BUOC.length)}
              aria-label="Bước sau"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-than-chi/20 transition-colors hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
            <span className="text-xs text-than-chi/65">Quy trình tham khảo, đội kỹ thuật sẽ xác nhận chi tiết.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
