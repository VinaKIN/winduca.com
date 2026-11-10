import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hien, KeoNgang, NutHut } from "@/components/HieuUng";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, Wrap } from "@/components/ui";
import { asset } from "@/lib/asset";
import { CONG_TRINH_MINH_HOA, KIEU_CUA } from "@/lib/site";

const anhCT = (k: number) => `/images/architecture/cong-trinh-${String((k % 12) + 1).padStart(2, "0")}.webp`;
const STROKE = "![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]";

export function generateStaticParams() {
  return CONG_TRINH_MINH_HOA.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cong-trinh/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = CONG_TRINH_MINH_HOA.find((x) => x.slug === slug);
  return c ? { title: `${c.ten} | WINDUCA` } : {};
}

export default async function ChiTiet({ params }: PageProps<"/cong-trinh/[slug]">) {
  const { slug } = await params;
  const i = CONG_TRINH_MINH_HOA.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const c = CONG_TRINH_MINH_HOA[i];
  const kieu = KIEU_CUA.find((k) => k.ten === c.kieuCua);
  const truoc = CONG_TRINH_MINH_HOA[(i - 1 + CONG_TRINH_MINH_HOA.length) % CONG_TRINH_MINH_HOA.length];
  const sau = CONG_TRINH_MINH_HOA[(i + 1) % CONG_TRINH_MINH_HOA.length];

  return (
    <>
      <PageHero congNghe nhan={`Cảm hứng · ${c.loai} · ${c.khuVuc}`} tieuDe={c.ten} anh={anhCT(i)} />

      <section className="luoi-ban-ve bg-white py-8 md:py-10">
        <Wrap>
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
            <Hien className="dau-goc relative h-[clamp(240px,46svh,420px)] overflow-hidden rounded-[6px] bg-than-chi">
              <Image src={asset(anhCT(i))} alt={c.ten} fill quality={70} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority />
            </Hien>
            <Hien tre={120}>
              <div className="flex items-end gap-4">
                <span className={`so-lon !text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.85] ${STROKE}`} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="nhan-muc pb-2 text-accent">Tóm tắt</p>
              </div>
              <dl className="mt-5 grid grid-cols-3 gap-4 border-y border-than-chi/15 py-4 text-sm lg:grid-cols-1 lg:gap-3">
                {[
                  ["Loại hình", c.loai],
                  ["Khu vực", c.khuVuc],
                  ["Kiểu cửa", c.kieuCua],
                ].map(([t, v]) => (
                  <div key={t}>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-than-chi/55">{t}</dt>
                    <dd className="mt-1 font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-than-chi/75">
                Một không gian mở ra khoảng sân và tầm nhìn, nơi khung cửa mảnh nhường chỗ cho ánh sáng. Nội dung này chỉ mang tính gợi ý bố cục và vật liệu; đây không phải
                công trình do WINDUCA thực hiện.
              </p>
              {kieu && (
                <Link href={`/he-cua/${kieu.slug}`} className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.06em] text-accent">
                  Xem {kieu.ten.toLowerCase()} WINDUCA
                </Link>
              )}
            </Hien>
          </div>
        </Wrap>
      </section>

      <section className="bg-nga py-8 md:py-10">
        <Wrap>
          <Hien>
            <p className="nhan-muc text-accent">Thêm hình ảnh</p>
          </Hien>
          <KeoNgang className="mt-4">
            {[1, 2, 3, 4].map((n) => (
              <Hien key={n} tre={n * 80} className="dau-goc relative h-[clamp(140px,24svh,220px)] w-[72%] shrink-0 snap-start overflow-hidden rounded-[6px] bg-than-chi sm:w-[40%] lg:w-[calc((100%-3rem)/4)]">
                <Image src={asset(anhCT((i + n * 3) % 12))} alt={`${c.ten} · ảnh ${n}`} fill quality={60} sizes="(min-width: 1024px) 24vw, 70vw" className="object-cover" />
              </Hien>
            ))}
          </KeoNgang>
        </Wrap>
      </section>

      <section className="relative overflow-hidden bg-than-chi py-8 text-white md:py-10">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-12">
            <Hien>
              <p className="nhan-muc text-accent">Tham chiếu của bạn</p>
              <h2 className="mt-3 text-[clamp(1.5rem,2.8vw,2.3rem)] font-light leading-[1.15] tracking-[-0.01em]">
                Tôi muốn không gian <span className="font-bold">như thế này</span>
              </h2>
              <p className="mt-3 text-sm text-white/70">Chúng tôi ghi nhận tham chiếu để chuyên viên tư vấn đúng nhu cầu. Không hỏi ngân sách.</p>
            </Hien>
            <Hien tre={100} className="rounded-[6px] bg-nga p-5 text-than-chi md:p-6">
              <LeadForm loai="lien-he" tone="sang" cot={3} />
            </Hien>
          </div>
        </Wrap>
      </section>

      <section className="bg-white py-6 md:py-8">
        <Wrap>
          <div className="flex items-center justify-between gap-4 text-sm font-semibold">
            <NutHut href={`/cong-trinh/${truoc.slug}`} className="nut nut-vien-sang">
              ← {truoc.ten}
            </NutHut>
            <NutHut href={`/cong-trinh/${sau.slug}`} className="nut nut-vien-sang">
              {sau.ten} →
            </NutHut>
          </div>
        </Wrap>
      </section>
    </>
  );
}
