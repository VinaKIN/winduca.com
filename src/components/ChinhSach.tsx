import type { ReactNode } from "react";
import { MucLucChinhSach } from "./MucLucChinhSach";
import { PageHero, Wrap } from "./ui";

/** Khung trang chính sách. Nội dung là BẢN NHÁP, chờ bộ phận pháp chế duyệt trước khi công khai. */
export function ChinhSach({ tieuDe, capNhat, children }: { tieuDe: string; capNhat: string; children: ReactNode }) {
  return (
    <>
      <PageHero nhan="Pháp lý" tieuDe={tieuDe} moTa={`Cập nhật: ${capNhat}`} />
      <section className="luoi-ban-ve bg-white">
        <Wrap className="grid gap-8 py-10 md:py-14 lg:grid-cols-[0.7fr_2fr] lg:gap-14">
          <MucLucChinhSach />
          <div className="min-w-0">
            <p className="mb-8 max-w-3xl rounded-[6px] border border-do-do/50 p-4 text-sm text-do-do">
              Bản nháp chờ bộ phận pháp chế duyệt. Nội dung có thể thay đổi trước khi website chính thức đi vào hoạt động.
            </p>
            <div className="max-w-3xl space-y-5 text-base leading-[1.75] text-than-chi/90 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-than-chi [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">{children}</div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
