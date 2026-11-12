import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MucLucNoi, ThanhTienDoDoc } from "@/components/DocBai";
import { Hien, NutHut } from "@/components/HieuUng";
import { Wrap } from "@/components/ui";
import { asset } from "@/lib/asset";
import { BAI_VIET, MUC_TIN_TUC, chuDeCua, mucCua, ngayVN, phutDoc } from "@/lib/bai-viet";

export function generateStaticParams() {
  return BAI_VIET.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = BAI_VIET.find((x) => x.slug === slug);
  if (!b) return {};
  return { title: `${b.tieuDe} | WINDUCA`, description: b.tomTat };
}

/** Trang bài viết kiểu tạp chí tối giản (12/11/2026): thanh tiến độ đọc, mục lục nổi, thân bài, bài liên quan. */
export default async function BaiVietPage({ params }: PageProps<"/tin-tuc/[slug]">) {
  const { slug } = await params;
  const b = BAI_VIET.find((x) => x.slug === slug);
  if (!b) notFound();

  const muc = MUC_TIN_TUC.find((m) => m.id === mucCua(b));
  const mucLuc = b.noiDung.map((m, i) => ({ id: `muc-${i + 1}`, h: m.h }));
  const khac = BAI_VIET.filter((x) => x.slug !== b.slug);
  const lienQuan = [...khac.filter((x) => x.chuyenMuc === b.chuyenMuc), ...khac.filter((x) => x.chuyenMuc !== b.chuyenMuc)].slice(0, 3);

  return (
    <>
      <ThanhTienDoDoc />

      <header className="luoi-ban-ve nen-nga pb-10 pt-28 md:pb-14 md:pt-36">
        <Wrap>
          <nav aria-label="Đường dẫn" className="flex flex-wrap items-center gap-3 text-[12px] font-medium uppercase tracking-[0.2em] text-than-chi/70">
            <Link href="/tin-tuc" className="transition-colors hover:text-accent">
              Tin tức
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={muc?.href ?? "/tin-tuc"} className="transition-colors hover:text-accent">
              {muc?.ten}
            </Link>
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-14">
            <h1 className="text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1.1] tracking-[-0.015em] [text-wrap:balance]">{b.tieuDe}</h1>
            <div>
              <p className="text-[17px] leading-relaxed text-than-chi/80">{b.tomTat}</p>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-than-chi/70">
                <span className="font-bold uppercase tracking-[0.14em] text-accent">{chuDeCua(b)}</span>
                <i className="h-[3px] w-[3px] rounded-full bg-than-chi/40" aria-hidden="true" />
                <span>{phutDoc(b)} phút đọc</span>
                <i className="h-[3px] w-[3px] rounded-full bg-than-chi/40" aria-hidden="true" />
                <time dateTime={b.ngay}>{ngayVN(b.ngay)}</time>
              </p>
            </div>
          </div>
          <div className="dau-goc relative mt-9 aspect-[16/8] overflow-hidden rounded-[14px] bg-than-chi md:mt-12">
            <Image src={asset(b.anh)} alt="" fill priority quality={70} sizes="(min-width: 1440px) 1360px, 100vw" className="object-cover" />
          </div>
        </Wrap>
      </header>

      <section className="bg-white py-12 md:py-20">
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[0.3fr_0.7fr] lg:gap-20">
            <div className="hidden lg:block">
              <MucLucNoi muc={mucLuc} />
            </div>

            <article id="than-bai" className="max-w-[44rem]">
              {b.noiDung.map((m, i) => (
                <section key={m.h} id={mucLuc[i].id} className="mb-12 scroll-mt-28">
                  <p className="text-[13px] font-bold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-1 text-[1.55rem] font-bold leading-tight md:text-[1.9rem]">{m.h}</h2>
                  {m.p.map((t) => (
                    <p key={t} className="mt-4 text-[17px] font-light leading-[1.8] text-than-chi/90 md:text-[18px]">
                      {t}
                    </p>
                  ))}
                </section>
              ))}

              <aside className="rounded-[14px] border-l-2 border-accent bg-nga p-6 md:p-8">
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-than-chi/70">Tóm lại</p>
                <p className="mt-2 text-[1.15rem] font-medium leading-relaxed">{b.ketLuan}</p>
              </aside>
              <p className="mt-5 text-[13px] leading-relaxed text-than-chi/70">Bài viết giải thích nguyên lý chung, không kèm thông số riêng của sản phẩm. Thông số chính thức sẽ được công bố khi có tài liệu kiểm định.</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <NutHut href="/lien-he" className="nut nut-chinh">
                  Liên hệ tư vấn
                </NutHut>
                <NutHut href="/trai-nghiem#sample-box" className="nut nut-dac">
                  Nhận hộp mẫu góc nhôm
                </NutHut>
              </div>
            </article>
          </div>
        </Wrap>
      </section>

      <section className="nen-nga py-14 md:py-20">
        <Wrap>
          <Hien>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[1.6rem] font-bold leading-tight md:text-[1.9rem]">Đọc tiếp</h2>
              <Link href="/tin-tuc" className="text-[13px] font-bold uppercase tracking-[0.16em] transition-colors hover:text-accent">
                Tất cả bài viết →
              </Link>
            </div>
            <hr className="mt-4 border-0 border-t border-than-chi/70" />
          </Hien>
          <ul className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {lienQuan.map((x, i) => (
              <Hien key={x.slug} as="li" tre={i * 90}>
                <Link href={`/tin-tuc/${x.slug}`} className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-[14px] bg-than-chi/10 transition-[box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_44px_rgba(15,17,21,0.16)]">
                    <Image src={asset(x.anh)} alt="" fill quality={65} sizes="(min-width: 1024px) 31vw, 92vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]" />
                  </span>
                  <span className="mt-4 block text-[12.5px] font-bold uppercase tracking-[0.14em] text-accent">{chuDeCua(x)}</span>
                  <span className="mt-1 block text-[1.1rem] font-bold leading-snug transition-colors group-hover:text-accent">{x.tieuDe}</span>
                  <span className="mt-1 block text-[13px] text-than-chi/65">{phutDoc(x)} phút đọc</span>
                </Link>
              </Hien>
            ))}
          </ul>
        </Wrap>
      </section>
    </>
  );
}
