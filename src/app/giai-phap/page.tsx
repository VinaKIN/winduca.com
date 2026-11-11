import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hien, NutHut } from "@/components/HieuUng";
import { MucLucTapChi } from "@/components/MucLucTapChi";
import { Wrap } from "@/components/ui";
import { asset } from "@/lib/asset";
import { GIAI_PHAP, QUY_TRINH_5_BUOC } from "@/lib/giai-phap";

export const metadata: Metadata = {
  title: "Giải pháp theo loại công trình | WINDUCA",
  description: "Biệt thự, penthouse, căn hộ, nhà phố, khách sạn, văn phòng, nhà hàng và công trình đặc thù: cách chọn hệ cửa nhôm kính và cách WINDUCA tư vấn, triển khai.",
};

const BA_CAU_HOI = [
  { t: "Không gian này cần gì ở cánh cửa?", m: "Khẩu độ, tầm nhìn, vận hành và thẩm mỹ khác nhau theo từng loại công trình." },
  { t: "Hệ cửa nào phù hợp?", m: "Cửa trượt nâng, cửa đi mở quay, cửa xếp trượt hay cửa sổ, tùy không gian và bản vẽ." },
  { t: "WINDUCA đồng hành đến đâu?", m: "Từ tiếp nhận bản vẽ, đề xuất, bóc tách đến gia công, lắp đặt và nghiệm thu." },
];

/**
 * Trang Giải pháp (thiết kế lại 11/11/2026, phong cách tạp chí): bìa, thư ngỏ, mục lục có ảnh đổi theo,
 * tám "bài" xen kẽ ảnh lớn, quy trình năm bước. Ảnh là minh họa Pexels, không phải công trình của WINDUCA.
 */
export default function GiaiPhap() {
  return (
    <>
      {/* ---------- BÌA ---------- */}
      <section className="relative isolate flex min-h-[94svh] flex-col justify-end overflow-hidden bg-than-chi text-white">
        <Image src={asset("/images/giai-phap/bia-1.webp")} alt="" fill priority quality={70} sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: "50% 55%" }} aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,17,18,0.55)_0%,rgba(20,17,18,0.45)_38%,rgba(20,17,18,0.88)_100%)]" aria-hidden="true" />
        <Wrap className="relative w-full pb-10 pt-36 md:pb-14">
          <div className="flex items-center justify-between gap-4 border-b border-white/25 pb-4 text-[12px] font-medium uppercase tracking-[0.24em] text-white/80">
            <span>WINDUCA · Tuyển tập giải pháp</span>
            <span className="hidden sm:inline">Tám loại công trình</span>
          </div>
          <h1 className="mt-8 max-w-[15ch] font-serif text-[clamp(3.1rem,9.5vw,8.6rem)] font-medium leading-[0.92] tracking-[-0.02em] [text-wrap:balance]">
            Mỗi không gian, <em className="font-normal italic text-white/90">một cách mở cửa.</em>
          </h1>
          <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <p className="max-w-xl text-[16px] font-light leading-relaxed text-white/85 md:text-[18px]">
              Biệt thự khác penthouse, quán cà phê khác văn phòng. Tuyển tập này đi qua tám loại công trình để chỉ ra điều cần cân nhắc khi chọn cửa nhôm kính.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <NutHut href="#muc-luc" className="nut nut-chinh">
                Xem mục lục
              </NutHut>
              <NutHut href="/danh-cho-kts#tu-van" className="nut nut-vien-sang">
                Gửi bản vẽ để tư vấn
              </NutHut>
            </div>
          </div>
          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-white/70">Ảnh minh họa, nguồn Pexels. Không phải công trình của WINDUCA.</p>
        </Wrap>
      </section>

      {/* ---------- THƯ NGỎ ---------- */}
      <section className="nen-nga khoi-doc">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Hien>
              <p className="nhan-muc text-accent">Thư ngỏ</p>
              <h2 className="mt-5 font-serif text-[clamp(2.2rem,4.4vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.015em]">
                Cánh cửa tốt là cánh cửa <em className="font-normal italic">biết nhường chỗ.</em>
              </h2>
            </Hien>
            <Hien tre={120}>
              <p className="font-serif text-[1.35rem] leading-[1.55] text-than-chi/90 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[5.2rem] first-letter:font-medium first-letter:leading-[0.8] first-letter:text-accent md:text-[1.55rem]">
                Chúng tôi làm cửa nhôm kính, nhưng điều khách hàng thật sự mua là một khoảng nhìn, một nhịp sống và một cảm giác ngôi nhà hoàn chỉnh. Vì thế mỗi loại công trình cần được nói bằng ngôn ngữ riêng: biệt thự cần đường nét mảnh, penthouse cần tầm nhìn, quán cà phê cần mặt tiền biết mời gọi.
              </p>
              <ul className="mt-10 grid gap-px overflow-hidden border border-than-chi/15 bg-than-chi/15 sm:grid-cols-3">
                {BA_CAU_HOI.map((c, i) => (
                  <li key={c.t} className="bg-white p-6">
                    <span className="font-serif text-[2.2rem] italic leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 text-[17px] font-bold leading-snug">{c.t}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-than-chi/75">{c.m}</p>
                  </li>
                ))}
              </ul>
            </Hien>
          </div>
        </Wrap>
      </section>

      {/* ---------- MỤC LỤC ---------- */}
      <section id="muc-luc" className="nen-sang khoi-doc scroll-mt-24">
        <Wrap>
          <Hien>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-serif text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-none tracking-[-0.02em]">
                Mục lục <em className="font-normal italic">tuyển tập</em>
              </h2>
              <p className="nhan-muc pb-1 text-than-chi/70">08 bài · chọn một loại công trình</p>
            </div>
          </Hien>
          <Hien tre={100} className="mt-10">
            <MucLucTapChi />
          </Hien>
        </Wrap>
      </section>

      {/* ---------- CÁC BÀI ---------- */}
      {GIAI_PHAP.map((g, k) => {
        const dao = k % 2 === 1;
        const toi = k % 3 === 2;
        return (
          <section key={g.slug} className={`${toi ? "nen-toi text-white" : k % 2 ? "nen-nga" : "nen-sang"} khoi-doc`} aria-labelledby={`bai-${g.slug}`}>
            <Wrap>
              <div className={`grid items-center gap-8 lg:gap-16 ${dao ? "lg:grid-cols-[0.8fr_1.2fr]" : "lg:grid-cols-[1.2fr_0.8fr]"}`}>
                <Hien className={dao ? "lg:order-2" : ""}>
                  <Link href={`/giai-phap/${g.slug}`} className="group block" aria-label={`Đọc bài: ${g.tenDai}`}>
                    <div className="dau-goc relative aspect-[4/3] overflow-hidden bg-than-chi lg:aspect-[5/4]">
                      <Image src={asset(g.anh)} alt={g.chuThich} fill quality={65} sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" style={{ objectPosition: g.pos }} />
                    </div>
                    <p className={`mt-3 flex items-baseline justify-between gap-4 text-[12px] uppercase tracking-[0.16em] ${toi ? "text-white/70" : "text-than-chi/70"}`}>
                      <span>
                        FIG. {String(k + 1).padStart(2, "0")} · {g.chuThich}
                      </span>
                      <span className="shrink-0">Ảnh minh họa</span>
                    </p>
                  </Link>
                </Hien>
                <Hien tre={120} className={dao ? "lg:order-1" : ""}>
                  <div className="flex items-end gap-4">
                    <span className={`font-serif text-[clamp(4.5rem,9vw,8rem)] font-medium italic leading-[0.78] ${toi ? "text-white/25" : "text-than-chi/15"}`} aria-hidden="true">
                      {String(k + 1).padStart(2, "0")}
                    </span>
                    <p className="nhan-muc pb-2 text-accent">{g.ten}</p>
                  </div>
                  <h2 id={`bai-${g.slug}`} className="mt-5 font-serif text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.015em] [text-wrap:balance]">
                    {g.dan}
                  </h2>
                  <p className={`mt-5 max-w-lg text-[16px] leading-relaxed ${toi ? "text-white/80" : "text-than-chi/75"}`}>{g.tomTat}</p>
                  <ul className={`mt-6 space-y-2 border-t pt-5 text-[15px] ${toi ? "border-white/20 text-white/85" : "border-than-chi/15 text-than-chi/80"}`}>
                    {g.khongGian.slice(0, 2).map((x) => (
                      <li key={x} className="flex gap-3">
                        <span className="mt-[0.7em] h-px w-5 shrink-0 bg-accent" aria-hidden="true" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/giai-phap/${g.slug}`} className={`mt-7 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-accent ${toi ? "text-white" : "text-than-chi"}`}>
                    Đọc bài <span aria-hidden="true">→</span>
                  </Link>
                </Hien>
              </div>
            </Wrap>
          </section>
        );
      })}

      {/* ---------- QUY TRÌNH ---------- */}
      <section className="luoi-ban-ve nen-sang khoi-doc">
        <Wrap>
          <Hien>
            <p className="nhan-muc text-accent">Từ bản vẽ đến nghiệm thu</p>
            <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.2rem,4.4vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.015em]">
              Năm bước, <em className="font-normal italic">một đầu mối.</em>
            </h2>
          </Hien>
          <ol className="mt-12 grid gap-px overflow-hidden border border-than-chi/15 bg-than-chi/15 md:grid-cols-5">
            {QUY_TRINH_5_BUOC.map((b, i) => (
              <Hien key={b.t} as="li" tre={i * 90} className="bg-white p-6 md:p-7">
                <span className="font-serif text-[3rem] italic leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-[17px] font-bold">{b.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-than-chi/75">{b.m}</p>
              </Hien>
            ))}
          </ol>
          <p className="mt-5 max-w-2xl text-sm text-than-chi/70">Giải pháp WINDUCA đề xuất mang tính tham khảo; kiến trúc sư chịu trách nhiệm thiết kế cuối cùng của công trình.</p>
        </Wrap>
      </section>

      {/* ---------- KẾT ---------- */}
      <section className="relative overflow-hidden nen-toi khoi-doc text-white">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <Hien>
            <p className="nhan-muc text-accent">Bắt đầu từ bản vẽ</p>
            <h2 className="mt-5 max-w-4xl font-serif text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.02em]">
              Gửi bản vẽ, nhận <em className="font-normal italic">đề xuất giải pháp phù hợp.</em>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
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
