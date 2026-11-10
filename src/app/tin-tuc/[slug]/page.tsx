import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/ui";
import { BAI_VIET } from "@/lib/bai-viet";

export function generateStaticParams() {
  return BAI_VIET.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = BAI_VIET.find((x) => x.slug === slug);
  if (!b) return {};
  return { title: `${b.tieuDe} | WINDUCA`, description: b.tomTat };
}

export default async function BaiVietPage({ params }: PageProps<"/tin-tuc/[slug]">) {
  const { slug } = await params;
  const b = BAI_VIET.find((x) => x.slug === slug);
  if (!b) notFound();
  const khac = BAI_VIET.filter((x) => x.slug !== b.slug);

  return (
    <>
      <PageHero nhan={b.chuyenMuc} tieuDe={b.tieuDe} moTa={b.tomTat} anh={b.anh} />
      <Section tone="sang">
        <article className="mx-auto max-w-3xl">
          {b.noiDung.map((m) => (
            <section key={m.h} className="mb-8">
              <h2 className="text-2xl font-bold">{m.h}</h2>
              {m.p.map((t) => (
                <p key={t} className="mt-3 text-base leading-relaxed text-than-chi/80">
                  {t}
                </p>
              ))}
            </section>
          ))}
          <p className="border-t border-than-chi/15 pt-6 text-base font-medium">{b.ketLuan}</p>
          <p className="mt-4 text-xs text-than-chi/55">Bài viết giải thích nguyên lý chung, không kèm thông số riêng của sản phẩm. Thông số chính thức sẽ được công bố khi có tài liệu kiểm định.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/lien-he" className="nut nut-chinh">
              Liên hệ tư vấn
            </Link>
            <Link href="/trai-nghiem#sample-box" className="nut nut-vien-sang">
              Nhận hộp mẫu
            </Link>
          </div>
        </article>
      </Section>
      <Section tone="nga" nhan="Đọc thêm" tieuDe="Các bài khác">
        <ul className="grid gap-4 md:grid-cols-2">
          {khac.map((x) => (
            <li key={x.slug}>
              <Link href={`/tin-tuc/${x.slug}`} className="group block rounded-[20px] bg-white p-6">
                <p className="nhan-muc text-accent">{x.chuyenMuc}</p>
                <h3 className="mt-2 text-lg font-bold group-hover:text-accent">{x.tieuDe}</h3>
                <p className="mt-2 text-sm text-than-chi/70">{x.tomTat}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
