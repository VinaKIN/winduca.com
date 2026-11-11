"use client";

import Link from "next/link";
import { useState } from "react";
import { KIEU_CUA, TEN_EN_HE_CUA } from "@/lib/site";

/**
 * So sánh 2–3 kiểu cửa theo tiêu chí ĐỊNH TÍNH. Các thông số kỹ thuật vẫn ghi "đang chờ xác nhận".
 * Truy cập (11/11/2026): nút bật/tắt dùng aria-pressed; giới hạn 2–3 được nói ra bằng vùng role="status";
 * bảng có caption, scope hàng/cột và vùng cuộn ngang focus được.
 */
export function SoSanhHeCua() {
  const [chon, setChon] = useState<string[]>([KIEU_CUA[0].slug, KIEU_CUA[1].slug]);
  const [thongBao, setThongBao] = useState("");

  function bat(slug: string) {
    if (chon.includes(slug)) {
      if (chon.length <= 2) {
        setThongBao("Cần giữ tối thiểu 2 kiểu cửa để so sánh.");
        return;
      }
      const moi = chon.filter((x) => x !== slug);
      setChon(moi);
      setThongBao(`Đã bỏ ${KIEU_CUA.find((k) => k.slug === slug)?.ten}. Đang so sánh ${moi.length} kiểu cửa.`);
      return;
    }
    const k = KIEU_CUA.find((x) => x.slug === slug);
    if (chon.length >= 3) {
      const bo = KIEU_CUA.find((x) => x.slug === chon[0]);
      setChon([...chon.slice(1), slug]);
      setThongBao(`Tối đa 3 kiểu cửa: đã thay ${bo?.ten} bằng ${k?.ten}.`);
    } else {
      setChon([...chon, slug]);
      setThongBao(`Đã thêm ${k?.ten}. Đang so sánh ${chon.length + 1} kiểu cửa.`);
    }
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
        {KIEU_CUA.map((k) => {
          const dang = chon.includes(k.slug);
          return (
            <button
              key={k.slug}
              type="button"
              aria-pressed={dang}
              aria-disabled={dang && chon.length <= 2 ? true : undefined}
              onClick={() => bat(k.slug)}
              className={`rounded-full border px-5 py-2.5 text-xs font-bold transition-colors ${dang ? "border-accent bg-accent text-white" : "border-than-chi/25 hover:border-accent hover:text-accent"}`}
            >
              {k.ten}
            </button>
          );
        })}
        <span className="ml-2 text-xs text-than-chi/65">Chọn 2 đến 3 kiểu cửa</span>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-[1.25rem] text-xs text-than-chi/65">
        {thongBao}
      </p>

      <div
        role="region"
        aria-label="Bảng so sánh hệ cửa, cuộn ngang bằng phím mũi tên"
        tabIndex={0}
        className="mt-3 overflow-x-auto rounded-[6px] border border-than-chi/10 bg-white"
      >
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">So sánh {ds.map((k) => k.ten).join(", ")} theo cách mở, khẩu độ, không gian phù hợp, đặc điểm, cách nhiệt và cách âm.</caption>
          <thead>
            <tr className="border-b border-than-chi/15">
              <th scope="col" className="w-40 p-4">
                <span className="sr-only">Tiêu chí</span>
              </th>
              {ds.map((k) => (
                <th scope="col" key={k.slug} className="p-4 align-bottom">
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
                <th scope="row" className="p-4 text-xs font-medium uppercase tracking-[0.14em] text-than-chi/65">
                  {t}
                </th>
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
