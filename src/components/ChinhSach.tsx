import type { ReactNode } from "react";
import { PageHero, Wrap } from "./ui";

/** Khung trang chính sách. Nội dung là BẢN NHÁP, chờ bộ phận pháp chế duyệt trước khi công khai. */
export function ChinhSach({ tieuDe, capNhat, children }: { tieuDe: string; capNhat: string; children: ReactNode }) {
  return (
    <>
      <PageHero nhan="Pháp lý" tieuDe={tieuDe} moTa={`Cập nhật: ${capNhat}`} />
      <section className="bg-nga">
        <Wrap className="py-16 md:py-24">
          <p className="mb-10 max-w-3xl border border-do-do/60 p-4 text-sm text-do-do">
            Bản nháp chờ bộ phận pháp chế duyệt. Nội dung có thể thay đổi trước khi website chính thức đi vào hoạt động.
          </p>
          <div className="max-w-3xl space-y-5 leading-relaxed text-than-chi/90 [&_h2]:tieu-de [&_h2]:mt-12 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
        </Wrap>
      </section>
    </>
  );
}
