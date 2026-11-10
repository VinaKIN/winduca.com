"use client";

import { useState } from "react";
import { LeadForm } from "./LeadForm";
import { KIEU_CUA, LOAI_CONG_TRINH, MAU_NHOM } from "@/lib/site";

/**
 * Cấu hình cửa → gửi yêu cầu tư vấn. KHÔNG báo giá: chỉ ghi nhận mong muốn để chuyên viên liên hệ.
 * Khẩu độ chỉ chọn mức gần đúng (định tính), không nhập số đo.
 */
const KHAU_DO = ["Nhỏ", "Vừa", "Lớn", "Rất lớn"];

export function CauHinhCua() {
  const [loai, setLoai] = useState(LOAI_CONG_TRINH[0]);
  const [kieu, setKieu] = useState(KIEU_CUA[0].ten);
  const [mau, setMau] = useState(MAU_NHOM[0].ten);
  const [kd, setKd] = useState(KHAU_DO[2]);
  const [gui, setGui] = useState(false);

  const tomTat = `Cấu hình quan tâm: công trình ${loai}; kiểu cửa ${kieu}; màu ${mau}; khẩu độ ${kd.toLowerCase()} (gần đúng).`;

  const nhom = (nhan: string, ds: string[], cur: string, set: (v: string) => void) => (
    <div>
      <p className="nhan-muc mb-2 text-than-chi/60">{nhan}</p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={nhan}>
        {ds.map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={cur === t}
            onClick={() => {
              set(t);
              setGui(false);
            }}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${cur === t ? "border-accent bg-accent text-white" : "border-than-chi/25 hover:border-accent hover:text-accent"}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dau-goc rounded-[6px] border border-than-chi/10 bg-white p-5 md:p-8">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {nhom("1 · Loại công trình", LOAI_CONG_TRINH, loai, setLoai)}
        {nhom("2 · Kiểu cửa", KIEU_CUA.map((k) => k.ten), kieu, setKieu)}
        {nhom("3 · Màu khung", MAU_NHOM.map((m) => m.ten), mau, setMau)}
        {nhom("4 · Khẩu độ (gần đúng)", KHAU_DO, kd, setKd)}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-than-chi/15 pt-5">
        <p className="max-w-2xl text-[15px] leading-relaxed text-than-chi/80">{tomTat}</p>
        <button type="button" onClick={() => setGui((v) => !v)} aria-expanded={gui} className="nut nut-chinh">
          {gui ? "Thu gọn" : "Gửi cấu hình để được tư vấn"}
        </button>
      </div>
      <p className="mt-2 text-xs text-than-chi/55">Chúng tôi không hỏi ngân sách và không đăng giá. Màu là màu minh họa, mã màu chính thức đang chờ xác nhận.</p>

      {gui && (
        <div className="mt-6 border-t border-than-chi/15 pt-6">
          <LeadForm key={tomTat} loai="lien-he" tone="sang" cot={3} ghiChuMacDinh={tomTat} kieuCuaMacDinh={kieu} />
        </div>
      )}
    </div>
  );
}
