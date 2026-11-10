import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, Section } from "@/components/ui";
import { CONG_TRINH_MINH_HOA, KIEU_CUA } from "@/lib/site";

const anhCT = (k: number) => `/images/architecture/cong-trinh-${String((k % 12) + 1).padStart(2, "0")}.webp`;

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
      <PageHero nhan={`${c.loai} · ${c.khuVuc}`} tieuDe={c.ten} />

      <Section tone="sang">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-than-chi md:max-h-[52svh] md:w-full">
          <Image src={asset(anhCT(i))} alt={c.ten} fill quality={70} sizes="100vw" className="object-cover" priority />
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div>
            <p className="nhan-muc text-than-chi/70">Tóm tắt</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold">Loại hình</dt>
                <dd>{c.loai}</dd>
              </div>
              <div>
                <dt className="font-semibold">Khu vực</dt>
                <dd>{c.khuVuc}</dd>
              </div>
              <div>
                <dt className="font-semibold">Kiểu cửa</dt>
                <dd>{c.kieuCua}</dd>
              </div>
            </dl>
          </div>
          <div className="md:col-span-2">
            <p className="nhan-muc text-than-chi/70">Ý tưởng không gian</p>
            <p className="mt-4 text-than-chi/85">
              Một không gian mở ra khoảng sân và tầm nhìn, nơi khung cửa mảnh nhường chỗ cho ánh sáng. Nội dung này chỉ mang tính
              gợi ý bố cục và vật liệu.
            </p>
            {kieu && (
              <p className="mt-6">
                <Link href={`/he-cua/${kieu.slug}`} className="text-sm font-semibold underline">
                  Xem {kieu.ten.toLowerCase()} WINDUCA
                </Link>
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section tone="sang" nhan="Thêm hình ảnh" className="border-t border-than-chi/10">
        <ul className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li key={n}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-than-chi">
                <Image src={asset(anhCT((i + n * 3) % 12))} alt={`${c.ten} · ảnh ${n}`} fill quality={60} sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="nga" tieuDe="Tôi muốn không gian như thế này" moTa="Chúng tôi ghi nhận tham chiếu để chuyên viên tư vấn đúng nhu cầu. Không hỏi ngân sách.">
        <LeadForm loai="lien-he" tone="sang" />
      </Section>

      <Section tone="sang">
        <div className="flex justify-between text-sm font-semibold">
          <Link href={`/cong-trinh/${truoc.slug}`}>← {truoc.ten}</Link>
          <Link href={`/cong-trinh/${sau.slug}`}>{sau.ten} →</Link>
        </div>
      </Section>
    </>
  );
}
