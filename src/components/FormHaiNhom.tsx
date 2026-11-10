"use client";

import { useState } from "react";
import { LeadForm } from "./LeadForm";

/**
 * Khối tư vấn chân trang tách hai nhóm khách (đề xuất 10/11/2026, mục 3.10):
 * khách hàng cá nhân (đăng ký tư vấn, nhận giải pháp theo công trình) và đối tác (đăng ký hợp tác, nhận tài liệu kỹ thuật).
 */
const NHOM = [
  { id: "ca-nhan", ten: "Khách hàng cá nhân", loai: "lien-he" as const, cta: "Đăng ký tư vấn · Nhận giải pháp theo công trình" },
  { id: "doi-tac", ten: "Đối tác", loai: "tai-lieu" as const, cta: "Đăng ký hợp tác · Nhận tài liệu kỹ thuật" },
];

export function FormHaiNhom() {
  const [i, setI] = useState(0);
  const n = NHOM[i];
  return (
    <div>
      <div role="tablist" aria-label="Nhóm khách hàng" className="mb-4 flex border-b border-than-chi/20">
        {NHOM.map((x, k) => (
          <button
            key={x.id}
            role="tab"
            type="button"
            aria-selected={i === k}
            onClick={() => setI(k)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${i === k ? "border-accent text-than-chi" : "border-transparent text-than-chi/55 hover:text-than-chi"}`}
          >
            {x.ten}
          </button>
        ))}
      </div>
      <p className="mb-4 text-xs text-than-chi/60">{n.cta}</p>
      <LeadForm key={n.id} loai={n.loai} tone="sang" gon />
    </div>
  );
}
