import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui";
import { asset } from "@/lib/asset";
import { GIAI_PHAP } from "@/lib/giai-phap";

export const metadata: Metadata = {
  title: "Giải pháp theo loại công trình | WINDUCA",
  description: "Giải pháp cửa nhôm kính cho biệt thự, penthouse, nhà phố cao cấp, khách sạn, resort và công trình kiến trúc đặc thù.",
};

export default function GiaiPhap() {
  return (
    <>
      <PageHero
        nhan="Giải pháp"
        tieuDe="Giải pháp cửa theo từng loại công trình."
        moTa="Mỗi không gian có nhu cầu riêng. Chọn loại công trình để xem cách chọn hệ cửa và cách WINDUCA tư vấn, triển khai."
      />
      <Section tone="sang">
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-5">
          {GIAI_PHAP.map((g) => (
            <li key={g.slug} className="w-[72%] shrink-0 snap-center sm:w-auto">
              <Link href={`/giai-phap/${g.slug}`} className="group block overflow-hidden rounded-[22px] border border-than-chi/10 bg-white transition-shadow hover:shadow-lg md:rounded-[28px]">
                <div className="relative aspect-[4/3] bg-than-chi lg:aspect-[3/4]">
                  <Image src={asset(g.anh)} alt={g.ten} fill quality={60} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" style={{ objectPosition: g.pos }} />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold">{g.ten}</h2>
                  <p className="mt-2 text-sm text-than-chi/70">{g.tomTat}</p>
                  <span className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.06em] text-accent">Xem giải pháp</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
