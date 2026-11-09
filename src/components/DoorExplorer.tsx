"use client";

import { useState } from "react";
import { CrossSection } from "./CrossSection";
import { MAU_HOAN_THIEN } from "@/lib/site";

/** Chọn màu hoàn thiện → đổi màu khung trong mặt cắt 3D (bản nhẹ). Mã màu nhà cung cấp: [CHỖ TRỐNG]. */
export function DoorExplorer({ tenKieuCua }: { tenKieuCua: string }) {
  const [chon, setChon] = useState(0);
  return (
    <>
      <CrossSection
        nhan={`Cấu tạo · ${tenKieuCua}`}
        tieuDe="Xem tận mắt cấu tạo"
        mauNhom={MAU_HOAN_THIEN[chon].hex}
      />
      <section className="bg-nga" aria-label="Màu hoàn thiện">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
          <p className="nhan-muc text-than-chi/70">Màu hoàn thiện</p>
          <h2 className="tieu-de mt-4 text-2xl md:text-4xl">Chọn màu cho khung nhôm</h2>
          <p className="mt-3 max-w-xl text-than-chi/80">
            Bề mặt anode hóa hoặc sơn tĩnh điện. Chọn một màu để xem khung trong mặt cắt phía trên đổi theo.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {MAU_HOAN_THIEN.map((m, i) => (
              <li key={m.ten}>
                <button
                  type="button"
                  onClick={() => setChon(i)}
                  aria-pressed={chon === i}
                  className={`block w-full text-left ${chon === i ? "outline outline-2 outline-offset-4 outline-champagne" : ""}`}
                >
                  <span className="block h-20 w-full border border-than-chi/20" style={{ background: m.hex }} />
                  <span className="mt-3 block text-sm font-semibold">{m.ten}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-than-chi/60">
            Màu thực tế có thể khác tùy màn hình và lô hoàn thiện. Mã màu: [CHỖ TRỐNG].
          </p>
        </div>
      </section>
    </>
  );
}
