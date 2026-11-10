import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero, Section } from "./ui";

/** Khung trang con chưa có nội dung thật: nêu rõ sẽ có gì và dẫn người xem tới nơi hữu ích. */
export function TrangDangCapNhat({
  nhan,
  tieuDe,
  moTa,
  anh,
  se_co,
  lienKet,
  children,
}: {
  nhan: string;
  tieuDe: string;
  moTa: string;
  anh?: string;
  se_co: string[];
  lienKet: { href: string; nhan: string }[];
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero nhan={nhan} tieuDe={tieuDe} moTa={moTa} anh={anh} />
      <Section tone="sang" nhan="Đang cập nhật" tieuDe="Nội dung sẽ có tại đây">
        <ul className="grid gap-3 md:grid-cols-2">
          {se_co.map((x) => (
            <li key={x} className="flex items-start gap-3 border-t border-inox pt-4">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
              <span className="text-base text-than-chi/80">{x}</span>
            </li>
          ))}
        </ul>
        {children}
        <div className="mt-8 flex flex-wrap gap-3">
          {lienKet.map((l, i) => (
            <Link key={l.href} href={l.href} className={i === 0 ? "nut nut-chinh" : "nut nut-vien-sang"}>
              {l.nhan}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
