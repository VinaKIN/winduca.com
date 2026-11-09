import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CanhMinhHoa } from "@/components/Illustration";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, Section } from "@/components/ui";
import { CONG_TRINH_MINH_HOA, KIEU_CUA } from "@/lib/site";

export function generateStaticParams() {
  return CONG_TRINH_MINH_HOA.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cong-trinh/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = CONG_TRINH_MINH_HOA.find((x) => x.slug === slug);
  return c ? { title: `${c.ten} (minh họa) | WINDUCA` } : {};
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
      <PageHero nhan={`${c.loai} · ${c.khuVuc} · Minh họa`} tieuDe={c.ten} moTa="Đây là hình ảnh và nội dung minh họa, không phải công trình thực tế của WINDUCA." />

      <Section tone="sang">
        <CanhMinhHoa seed={i + 1} className="aspect-[16/9]" />
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

      <Section tone="sang" nhan="Thêm hình minh họa" className="border-t border-than-chi/10">
        <ul className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li key={n}>
              <CanhMinhHoa seed={i + n * 3} className="aspect-[4/3]" />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="toi" tieuDe="Tôi muốn không gian như thế này" moTa="Chúng tôi ghi nhận tham chiếu để chuyên viên tư vấn đúng nhu cầu. Không hỏi ngân sách.">
        <LeadForm loai="lien-he" tone="toi" />
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
