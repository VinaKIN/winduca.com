"use client";

import Link from "next/link";
import { useState } from "react";
import { KIEU_CUA, TEN_EN_HE_CUA } from "@/lib/site";

/** So sánh 2–3 kiểu cửa theo tiêu chí ĐỊNH TÍNH. Các thông số kỹ thuật vẫn ghi "đang chờ xác nhận". */
export function SoSanhHeCua() {
  const [chon, setChon] = useState<string[]>([KIEU_CUA[0].slug, KIEU_CUA[1].slug]);

  function bat(slug: string) {
    setChon((c) => (c.includes(slug) ? (c.length > 2 ? c.filter((x) => x !== slug) : c) : c.length >= 3 ? [...c.slice(1), slug] : [...c, slug]));
  }
  const ds = KIEU_CUA.filter((k) => chon.includes(k.slug));
  const hang: [string, (k: (typeof KIEU_CUA)[number]) => string][] = [
    ["Cách mở", (k) => k.cachMo],
    ["Khẩu độ", (k) => k.khauDo],
    ["Không gian phù hợp", (k) => k.khongGian.join(" · ")],
    ["Đặc điểm", (k) => k.dacDiem.join(" · ")],
    ["Cách nhiệt", () => "Đang chờ xác nhận"],
    ["Cách âm", () => "Đang chờ xác nhận"],
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Chọn kiểu cửa để so sánh">
        {KIEU_CUA.map((k) => (
          <button
            key={k.slug}
            type="button"
            aria-pressed={chon.includes(k.slug)}
            onClick={() => bat(k.slug)}
            className={`rounded-full border px-5 py-2 text-xs font-bold transition-colors ${chon.includes(k.slug) ? "border-accent bg-accent text-white" : "border-than-chi/25 hover:border-accent hover:text-accent"}`}
          >
            {k.ten}
          </button>
        ))}
        <span className="ml-2 text-xs text-than-chi/65">Chọn 2 đến 3 kiểu cửa</span>
      </div>

      <div className="mt-5 overflow-x-auto rounded-[6px] border border-than-chi/10 bg-white">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-than-chi/15">
              <th className="w-40 p-4" />
              {ds.map((k) => (
                <th key={k.slug} className="p-4 align-bottom">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-than-chi/65">{TEN_EN_HE_CUA[k.slug]}</p>
                  <Link href={`/he-cua/${k.slug}`} className="text-xl font-bold hover:text-accent">
                    {k.ten}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hang.map(([t, f]) => (
              <tr key={t} className="border-b border-than-chi/10 align-top last:border-b-0">
                <th className="p-4 text-xs font-medium uppercase tracking-[0.14em] text-than-chi/65">{t}</th>
                {ds.map((k) => {
                  const v = f(k);
                  return (
                    <td key={k.slug} className={`p-4 ${v === "Đang chờ xác nhận" ? "text-than-chi/65" : "text-than-chi/85"}`}>
                      {v}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
