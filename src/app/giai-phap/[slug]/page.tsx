import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hien, KeoNgang, NutHut } from "@/components/HieuUng";
import { PageHero, Wrap } from "@/components/ui";
import { asset } from "@/lib/asset";
import { GIAI_PHAP, QUY_TRINH_TRIEN_KHAI } from "@/lib/giai-phap";
import { KIEU_CUA, TEN_EN_HE_CUA } from "@/lib/site";

const ANH_HE_CUA: Record<string, string> = {
  "cua-truot-nang": "/images/products/lift-slide.webp",
  "cua-di-mo-quay": "/images/products/casement.webp",
  "cua-xep-truot": "/images/products/bi-fold.webp",
  "cua-so": "/images/products/window.webp",
};

const STROKE = "![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]";

export function generateStaticParams() {
  return GIAI_PHAP.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/giai-phap/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = GIAI_PHAP.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: `${g.ten} | WINDUCA`, description: g.tomTat };
}

function Dau({ so, nhan }: { so: string; nhan: string }) {
  return (
    <div className="flex items-end gap-4">
      <span className={`so-lon !text-[clamp(3.5rem,7vw,6rem)] leading-[0.85] ${STROKE}`} aria-hidden="true">
        {so}
      </span>
      <p className="nhan-muc pb-2 text-accent">{nhan}</p>
    </div>
  );
}

export default async function GiaiPhapChiTiet({ params }: PageProps<"/giai-phap/[slug]">) {
  const { slug } = await params;
  const g = GIAI_PHAP.find((x) => x.slug === slug);
  if (!g) notFound();
  const heCua = KIEU_CUA.filter((k) => g.heCua.includes(k.slug));
  const khac = GIAI_PHAP.filter((x) => x.slug !== g.slug);

  return (
    <>
      <PageHero congNghe nhan="Giải pháp theo công trình" tieuDe={g.ten} moTa={g.tomTat} anh={g.anh}>
        <NutHut href="/lien-he" className="nut nut-chinh">
          Tư vấn giải pháp
        </NutHut>
        <NutHut href="/danh-cho-kts#tu-van" className="nut nut-vien">
          Gửi bản vẽ
        </NutHut>
      </PageHero>

      <section className="luoi-ban-ve nen-sang khoi-doc">
        <Wrap>
          <Hien>
            <Dau so="01" nhan="Câu hỏi 1" />
            <h2 className="mt-4 max-w-3xl text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">
              Không gian này cần giải pháp cửa <span className="font-bold">như thế nào?</span>
            </h2>
          </Hien>
          <KeoNgang className="mt-6">
            {g.khongGian.map((x, i) => (
              <Hien key={x} tre={i * 100} className="dau-goc w-[78%] shrink-0 snap-start rounded-[6px] border border-than-chi/10 bg-white p-6 sm:w-[44%] lg:w-[calc((100%-3rem)/4)]">
                <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-base text-than-chi/85">{x}</p>
              </Hien>
            ))}
          </KeoNgang>
        </Wrap>
      </section>

      <section className="nen-nga khoi-doc">
        <Wrap>
          <Hien>
            <Dau so="02" nhan="Câu hỏi 2" />
            <h2 className="mt-4 max-w-3xl text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">
              Hệ cửa nào <span className="font-bold">phù hợp?</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-than-chi/70">{g.ghiChuHeCua}</p>
          </Hien>
          <KeoNgang className="mt-6">
            {heCua.map((k, i) => (
              <Hien key={k.slug} tre={i * 100} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-3rem)/4)]">
                <Link href={`/he-cua/${k.slug}`} className="group block overflow-hidden rounded-[6px] border border-than-chi/10 bg-white">
                  <div className="dau-goc relative h-[clamp(130px,20svh,190px)] bg-than-chi">
                    <Image src={asset(ANH_HE_CUA[k.slug])} alt={k.ten} fill quality={60} sizes="(min-width: 1024px) 22vw, 70vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-than-chi/50">{TEN_EN_HE_CUA[k.slug]}</p>
                    <h3 className="mt-1 text-xl font-bold group-hover:text-accent">{k.ten}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-than-chi/70">{k.tagline}</p>
                  </div>
                </Link>
              </Hien>
            ))}
          </KeoNgang>
        </Wrap>
      </section>

      <section className="luoi-ban-ve nen-sang khoi-doc">
        <Wrap>
          <Hien>
            <Dau so="03" nhan="Câu hỏi 3" />
            <h2 className="mt-4 max-w-3xl text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">
              WINDUCA tư vấn và <span className="font-bold">triển khai những gì?</span>
            </h2>
          </Hien>
          <div className="relative mt-6">
            <div className="absolute left-0 right-0 top-[1.6rem] hidden h-px bg-than-chi/20 lg:block" aria-hidden="true" />
            <KeoNgang>
              {QUY_TRINH_TRIEN_KHAI.map((x, i) => (
                <Hien key={x} tre={i * 120} className="relative w-[70%] shrink-0 snap-start sm:w-[40%] lg:w-[calc((100%-3rem)/4)]">
                  <span className="relative z-10 flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full border border-accent bg-white text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-base font-medium">{x}</p>
                </Hien>
              ))}
            </KeoNgang>
          </div>
          <p className="mt-5 max-w-2xl text-sm text-than-chi/60">
            Giải pháp và chi tiết WINDUCA đề xuất mang tính tham khảo; kiến trúc sư chịu trách nhiệm thiết kế cuối cùng của công trình.
          </p>
        </Wrap>
      </section>

      <section className="relative overflow-hidden nen-toi khoi-doc text-white">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <Hien>
            <p className="nhan-muc text-accent">Giải pháp khác</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {khac.map((x) => (
                <li key={x.slug}>
                  <Link href={`/giai-phap/${x.slug}`} className="inline-block rounded-full border border-white/30 px-4 py-2 text-sm text-white/85 transition-colors hover:border-accent hover:text-white">
                    {x.ten.replace(/^Giải pháp (cửa )?(cho )?/, "").replace(/^./, (c) => c.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <NutHut href="/lien-he" className="nut nut-chinh">
                Liên hệ tư vấn
              </NutHut>
              <NutHut href="/trai-nghiem#sample-box" className="nut nut-vien">
                Nhận hộp mẫu góc nhôm
              </NutHut>
            </div>
          </Hien>
        </Wrap>
      </section>
    </>
  );
}
