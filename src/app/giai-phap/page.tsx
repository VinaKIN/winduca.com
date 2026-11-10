import type { Metadata } from "next";
import { ChonKhongGian } from "@/components/ChonKhongGian";
import { Hien, KeoNgang, NutHut } from "@/components/HieuUng";
import { PageHero, Wrap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Giải pháp theo loại công trình | WINDUCA",
  description: "Giải pháp cửa nhôm kính cho biệt thự, penthouse, nhà phố cao cấp, khách sạn, resort và công trình kiến trúc đặc thù.",
};

/** Trang Giải pháp thiết kế lại (10/11/2026): chọn không gian tương tác, ba câu hỏi chung, nút hút nhẹ. */
const BA_CAU_HOI = [
  { t: "Không gian này cần giải pháp cửa như thế nào?", m: "Mỗi loại công trình có nhu cầu riêng về khẩu độ, tầm nhìn, vận hành và thẩm mỹ." },
  { t: "Hệ cửa nào phù hợp?", m: "Cửa trượt nâng, cửa đi mở quay, cửa xếp trượt hay cửa sổ, tùy không gian và bản vẽ." },
  { t: "WINDUCA tư vấn và triển khai những gì?", m: "Từ tiếp nhận bản vẽ, đề xuất hệ cửa, bóc tách đến gia công, lắp đặt và nghiệm thu." },
];

export default function GiaiPhap() {
  return (
    <>
      <PageHero
        congNghe
        nhan="Giải pháp"
        tieuDe="Giải pháp cửa theo từng loại công trình."
        moTa="Mỗi không gian có nhu cầu riêng. Chọn loại công trình để xem cách chọn hệ cửa và cách WINDUCA tư vấn, triển khai."
        anh="/images/architecture/giai-phap-penthouse.webp"
      />

      <section className="luoi-ban-ve bg-white py-10 md:py-14">
        <Wrap>
          <Hien>
            <div className="flex items-end gap-4">
              <span className="so-lon !text-[clamp(3.5rem,7vw,6rem)] leading-[0.85] ![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]" aria-hidden="true">
                01
              </span>
              <p className="nhan-muc pb-2 text-accent">Chọn không gian của bạn</p>
            </div>
          </Hien>
          <Hien tre={100} className="mt-5">
            <ChonKhongGian />
          </Hien>
        </Wrap>
      </section>

      <section className="bg-nga py-10 md:py-14">
        <Wrap>
          <Hien>
            <div className="flex items-end gap-4">
              <span className="so-lon !text-[clamp(3.5rem,7vw,6rem)] leading-[0.85] ![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]" aria-hidden="true">
                02
              </span>
              <p className="nhan-muc pb-2 text-accent">Ba câu hỏi cho mọi công trình</p>
            </div>
          </Hien>
          <KeoNgang className="mt-6">
            {BA_CAU_HOI.map((c, i) => (
              <Hien key={c.t} tre={i * 120} className="dau-goc w-[82%] shrink-0 snap-start rounded-[6px] border border-than-chi/10 bg-white p-6 sm:w-[46%] md:p-8 lg:w-[calc((100%-2rem)/3)]">
                <span className="so-lon !text-[3.5rem] ![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-bold">{c.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-than-chi/75">{c.m}</p>
              </Hien>
            ))}
          </KeoNgang>
          <p className="mt-3 text-xs text-than-chi/50 lg:hidden">Vuốt ngang để xem tiếp</p>
        </Wrap>
      </section>

      <section className="relative overflow-hidden bg-than-chi py-10 text-white md:py-12">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <Hien>
            <p className="nhan-muc text-accent">Bắt đầu từ bản vẽ</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-[1.12] tracking-[-0.01em]">
              Gửi bản vẽ, nhận <span className="font-bold">đề xuất giải pháp phù hợp.</span>
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <NutHut href="/danh-cho-kts#tu-van" className="nut nut-chinh">
                Gửi bản vẽ để tư vấn
              </NutHut>
              <NutHut href="/lien-he" className="nut nut-vien">
                Liên hệ tư vấn
              </NutHut>
            </div>
          </Hien>
        </Wrap>
      </section>
    </>
  );
}
