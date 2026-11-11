import type { Metadata } from "next";
import { HeCuaDanhSach } from "@/components/HeCuaDanhSach";
import { Hien } from "@/components/HieuUng";
import { HE_CUA_DS } from "@/lib/he-cua-du-lieu";

export const metadata: Metadata = {
  title: "Hệ cửa | WINDUCA",
  description: "Chọn hệ cửa nhôm kính theo thông số kỹ thuật: lọc theo hãng, hệ thống, kết cấu và chức năng, so sánh tối đa 3 hệ để so nhanh.",
};

/**
 * Trang Hệ cửa dựng lại theo trang hệ cửa của Winboss (11/11/2026): một khung duy nhất gồm tiêu đề, tab hãng,
 * tìm kiếm, lọc thả xuống, lưới thẻ, phân trang, so sánh và hộp chi tiết. Các khối cũ của trang đã được gỡ.
 */
export default function HeCua() {
  return (
    <div className="relative overflow-hidden bg-[#f3f5f8]">
      <div className="pointer-events-none absolute -right-24 top-24 h-[420px] w-[520px] rounded-full bg-accent/10 blur-[110px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1250px] px-3 pb-24 pt-28 md:px-[15px] md:pb-32 md:pt-36">
        <Hien>
          <div className="rounded-[28px] border border-white bg-white/90 p-5 shadow-[0_24px_70px_rgba(15,17,21,0.07)] backdrop-blur md:p-9">
            <header className="pb-6 pt-3 md:pb-9">
              <p className="flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">
                <i className="h-0.5 w-7 bg-accent" aria-hidden="true" />
                Hệ cửa nhôm kính · Romadio · Civro · Ponzio
              </p>
              <h1 className="mt-4 max-w-[900px] text-[clamp(2rem,4.2vw,3.5rem)] font-light leading-[1.18] tracking-[-0.01em]">
                Chọn hệ cửa theo <b className="font-bold">thông số kỹ thuật</b>
              </h1>
              <p className="mt-5 max-w-[720px] text-base font-light leading-[1.7] text-[#4b5563] [text-wrap:balance] md:text-lg">
                Lọc theo kết cấu, chức năng và hệ thống.
                <br />
                Mỗi hệ hiển thị chỉ số do hãng công bố để so sánh nhanh. Hiện có {HE_CUA_DS.length} hệ.
              </p>
            </header>
            <HeCuaDanhSach />
          </div>
        </Hien>
      </div>
    </div>
  );
}
