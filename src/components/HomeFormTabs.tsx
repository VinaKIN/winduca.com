"use client";

import { useState } from "react";
import { LeadForm } from "./LeadForm";

export function HomeFormTabs({ kieuCuaMacDinh }: { kieuCuaMacDinh?: string }) {
  const [tab, setTab] = useState<"sample-box" | "showroom">("sample-box");
  return (
    <div>
      <div role="tablist" aria-label="Chọn hình thức" className="mb-8 flex gap-0 border-b border-inox/30">
        {(
          [
            ["sample-box", "Nhận hộp mẫu"],
            ["showroom", "Tư vấn trực tiếp"],
          ] as const
        ).map(([id, ten]) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`-mb-px border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
              tab === id ? "border-champagne text-nga" : "border-transparent text-nga/60 hover:text-nga"
            }`}
          >
            {ten}
          </button>
        ))}
      </div>
      <LeadForm key={tab} loai={tab} tone="toi" kieuCuaMacDinh={kieuCuaMacDinh} />
    </div>
  );
}
