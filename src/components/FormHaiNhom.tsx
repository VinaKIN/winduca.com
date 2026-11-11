"use client";

import { useState } from "react";
import { LeadForm } from "./LeadForm";

/**
 * Thân khối đăng ký ở chân trang, theo khung Winboss: trái là tiêu đề, mô tả và công tắc nhóm khách,
 * phải là các ô nhập. Hai nhóm: khách hàng cá nhân (đăng ký tư vấn) và đối tác (đăng ký hợp tác, nhận tài liệu kỹ thuật).
 */
const NHOM = [
  { id: "ca-nhan", ten: "Khách hàng cá nhân", loai: "lien-he" as const, cta: "Đăng ký tư vấn · Nhận giải pháp theo công trình" },
  { id: "doi-tac", ten: "Đối tác", loai: "tai-lieu" as const, cta: "Đăng ký hợp tác · Nhận tài liệu kỹ thuật" },
];

export function FormHaiNhom() {
  const [i, setI] = useState(0);
  const n = NHOM[i];
  return (
    <div className="grid gap-6 px-1 pb-1 pt-6 md:grid-cols-[0.9fr_1.3fr] md:gap-10 md:px-4 md:pt-7">
      <div>
        <h3 className="text-xl font-bold md:text-2xl">Đăng ký tham quan</h3>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-than-chi/70">Chúng tôi liên hệ lại để xác nhận lịch trải nghiệm và giải đáp thắc mắc của anh chị.</p>
        <div role="tablist" aria-label="Nhóm khách hàng" className="mt-4 inline-flex rounded-full border border-than-chi/20 p-1">
          {NHOM.map((x, k) => (
            <button
              key={x.id}
              role="tab"
              type="button"
              aria-selected={i === k}
              onClick={() => setI(k)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${i === k ? "bg-than-chi text-white" : "text-than-chi/65 hover:text-than-chi"}`}
            >
              {x.ten}
            </button>
          ))}
        </div>
        <p className="mt-2.5 text-xs text-than-chi/65">{n.cta}</p>
      </div>
      <LeadForm key={n.id} loai={n.loai} tone="sang" gon />
    </div>
  );
}
