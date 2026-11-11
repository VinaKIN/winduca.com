import type { Metadata } from "next";
import { ChonCongTrinh } from "@/components/ChonCongTrinh";
import { HeroGiaiPhap } from "@/components/HeroGiaiPhap";
import { Hien, NutHut } from "@/components/HieuUng";
import { Wrap } from "@/components/ui";
import { GIAI_PHAP, QUY_TRINH_5_BUOC } from "@/lib/giai-phap";
import { KIEU_CUA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Giải pháp theo loại công trình | WINDUCA",
  description: "Biệt thự, penthouse, căn hộ, nhà phố, khách sạn, văn phòng, nhà hàng và công trình đặc thù: cách chọn hệ cửa nhôm kính và cách WINDUCA tư vấn, triển khai.",
};

/**
 * Trang Giải pháp (thiết kế lại lần 2, 11/11/2026): bản vẽ kỹ thuật kết hợp tạp chí tối giản, khoảng bốn màn hình.
 * Hero có số đếm và vệt sáng theo chuột; một khối chọn loại công trình với ảnh đổi tại chỗ; quy trình năm bước; kêu gọi.
 * Ảnh là minh họa Pexels, không phải công trình của WINDUCA.
 */
export default function GiaiPhap() {
  return (
    <>
      <HeroGiaiPhap
        soLieu={[
          { so: GIAI_PHAP.length, nhan: "Loại công trình" },
          { so: KIEU_CUA.length, nhan: "Kiểu cửa" },
          { so: QUY_TRINH_5_BUOC.length, nhan: "Bước triển khai" },
        ]}
      >
        <Wrap className="pb-10 pt-32 md:pb-14 md:pt-40">
          <p className="nhan-muc text-accent">Giải pháp theo công trình</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.2rem,5.2vw,4.6rem)] font-light uppercase leading-[1.06] tracking-[0.01em] [text-wrap:balance]">
            Mỗi không gian, <span className="font-bold">một cách mở cửa.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] font-light leading-relaxed text-white/80 md:text-[18px]">
            Chọn loại công trình để xem điều cần cân nhắc, hệ cửa gợi ý và cách WINDUCA tư vấn, triển khai.
          </p>
        </Wrap>
      </HeroGiaiPhap>

      <section className="luoi-ban-ve nen-sang py-12 md:py-20">
        <Wrap>
          <Hien>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <p className="nhan-muc text-accent">Chọn loại công trình</p>
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-than-chi/70">Rê chuột hoặc chạm để xem</p>
            </div>
            <ChonCongTrinh />
          </Hien>
        </Wrap>
      </section>

      <section className="nen-nga py-12 md:py-20">
        <Wrap>
          <Hien>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="nhan-muc text-accent">Từ bản vẽ đến nghiệm thu</p>
                <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-[1.12] tracking-[-0.01em]">
                  Năm bước, <span className="font-bold">một đầu mối.</span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-than-chi/70">Giải pháp WINDUCA đề xuất mang tính tham khảo; kiến trúc sư chịu trách nhiệm thiết kế cuối cùng của công trình.</p>
            </div>
          </Hien>
          <ol className="relative mt-10 grid gap-8 md:grid-cols-5 md:gap-6">
            <div className="absolute left-0 right-0 top-[0.62rem] hidden h-px bg-than-chi/25 md:block" aria-hidden="true" />
            {QUY_TRINH_5_BUOC.map((b, i) => (
              <Hien key={b.t} as="li" tre={i * 90} className="relative">
                <span className="relative z-10 mb-4 block h-[1.25rem] w-[1.25rem] rounded-full border border-accent bg-nga after:absolute after:inset-[4px] after:rounded-full after:bg-accent" aria-hidden="true" />
                <span className="font-mono text-[12px] tracking-[0.14em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-[17px] font-bold">{b.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-than-chi/75">{b.m}</p>
              </Hien>
            ))}
          </ol>
        </Wrap>
      </section>

      <section className="relative overflow-hidden nen-toi py-14 text-white md:py-20">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <Hien>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="nhan-muc text-accent">Bắt đầu từ bản vẽ</p>
                <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-[1.12] tracking-[-0.01em]">
                  Gửi bản vẽ, nhận <span className="font-bold">đề xuất giải pháp phù hợp.</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <NutHut href="/danh-cho-kts#tu-van" className="nut nut-chinh">
                  Gửi bản vẽ để tư vấn
                </NutHut>
                <NutHut href="/lien-he" className="nut nut-vien">
                  Liên hệ tư vấn
                </NutHut>
              </div>
            </div>
          </Hien>
        </Wrap>
      </section>
    </>
  );
}
