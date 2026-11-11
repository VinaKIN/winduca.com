"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";

/**
 * Bố cục trang con theo mẫu Winboss (11/11/2026): tiêu đề giữa trang cỡ vừa, một dòng mô tả; tiêu đề mục bên trái cùng các tab lọc
 * ngăn bằng chấm tròn; đường kẻ; lưới thẻ ảnh ba cột. Chỉ dùng Roboto, tiêu đề thường (không viết hoa, không giãn chữ).
 */

export function TieuDeTrang({ tieuDe, moTa }: { tieuDe: string; moTa?: string }) {
  return (
    <header className="bg-white pb-6 pt-28 text-center md:pb-10 md:pt-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <h1 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-bold leading-tight">{tieuDe}</h1>
        {moTa && <p className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-relaxed text-than-chi/75 md:text-[15px]">{moTa}</p>}
      </div>
    </header>
  );
}

export type TheAnh = {
  id: string;
  /** Các tab mà thẻ thuộc về (ngoài "Tất cả"). */
  tab: string[];
  ten: string;
  mota: string;
  anh: string;
  pos?: string;
  href?: string;
};

export function LuoiLoc({ tieuDe, tabs, the, ghiChu, tatCa = "Tất cả" }: { tieuDe: string; tabs: string[]; the: TheAnh[]; ghiChu?: ReactNode; tatCa?: string }) {
  const [tab, setTab] = useState(tatCa);
  const idLuoi = useId();
  const ds = tab === tatCa ? the : the.filter((t) => t.tab.includes(tab));
  const moi = [tatCa, ...tabs];

  return (
    <section className="bg-white pb-16 md:pb-24" aria-labelledby={`${idLuoi}-h`}>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id={`${idLuoi}-h`} className="text-[1.6rem] font-bold leading-none md:text-[1.9rem]">
            {tieuDe}
          </h2>
          <div role="group" aria-label={`Lọc ${tieuDe.toLowerCase()}`} className="flex flex-wrap items-center gap-y-2 text-[14px]">
            {moi.map((t, k) => (
              <span key={t} className="flex items-center">
                {k > 0 && <i className="mx-4 h-[5px] w-[5px] rounded-full bg-than-chi/70" aria-hidden="true" />}
                <button
                  type="button"
                  aria-pressed={tab === t}
                  onClick={() => setTab(t)}
                  className={`inline-flex min-h-11 items-center transition-colors ${tab === t ? "font-bold text-accent" : "text-than-chi/80 hover:text-accent"}`}
                >
                  {t}
                </button>
              </span>
            ))}
          </div>
        </div>
        <hr className="mt-4 border-0 border-t border-than-chi/70" />
        {ghiChu && <p className="mt-3 text-[13px] text-than-chi/70">{ghiChu}</p>}

        <ul className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {ds.map((t) => {
            const noiDung = (
              <>
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[12px] bg-than-chi/10">
                  <Image src={asset(t.anh)} alt="" fill quality={65} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ objectPosition: t.pos ?? "50% 50%" }} />
                </span>
                <span className="mt-3 block text-[15.5px] font-bold leading-snug transition-colors group-hover:text-accent">{t.ten}</span>
                <span className="mt-1 line-clamp-2 block text-[13px] leading-relaxed text-than-chi/75">{t.mota}</span>
              </>
            );
            return (
              <li key={t.id}>
                {t.href ? (
                  <Link href={t.href} className="group block">
                    {noiDung}
                  </Link>
                ) : (
                  <div className="group block">{noiDung}</div>
                )}
              </li>
            );
          })}
        </ul>
        {ds.length === 0 && <p className="mt-10 text-center text-than-chi/70">Chưa có nội dung trong mục này.</p>}
      </div>
    </section>
  );
}
