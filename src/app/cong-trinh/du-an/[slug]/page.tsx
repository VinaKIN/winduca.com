import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/ui";
import { asset } from "@/lib/asset";
import { DU_AN } from "@/lib/du-an";

/** Trang Case Study cho công trình WINDUCA thực hiện. Chưa có dự án thật nên danh sách đang rỗng. */
export const dynamicParams = false;

export function generateStaticParams() {
  // Khi chưa có dự án, trả về một chỗ giữ để bản xuất tĩnh không lỗi; trang này sẽ gọi notFound().
  return DU_AN.length ? DU_AN.map((d) => ({ slug: d.slug })) : [{ slug: "chua-co-du-an" }];
}

export async function generateMetadata({ params }: PageProps<"/cong-trinh/du-an/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = DU_AN.find((x) => x.slug === slug);
  return d ? { title: `${d.ten} | Case Study WINDUCA`, description: `${d.loai} · ${d.khuVuc}` } : { robots: { index: false } };
}

export default async function CaseStudy({ params }: PageProps<"/cong-trinh/du-an/[slug]">) {
  const { slug } = await params;
  const d = DU_AN.find((x) => x.slug === slug);
  if (!d) notFound();

  return (
    <>
      <PageHero nhan={`${d.loai} · ${d.khuVuc}`} tieuDe={d.ten} anh={d.anhTongThe} />
      <Section tone="sang" nhan="Case Study" tieuDe="Tổng quan công trình">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-than-chi md:max-h-[50svh] md:w-full">
          <Image src={asset(d.anhTongThe)} alt={d.ten} fill quality={70} sizes="100vw" className="object-cover" priority />
        </div>
        <dl className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <dt className="nhan-muc text-than-chi/60">Loại công trình</dt>
            <dd className="mt-2 text-base">{d.loai}</dd>
          </div>
          <div>
            <dt className="nhan-muc text-than-chi/60">Hệ cửa sử dụng</dt>
            <dd className="mt-2 text-base">{d.heCua.join(" · ")}</dd>
          </div>
          <div>
            <dt className="nhan-muc text-than-chi/60">Khu vực</dt>
            <dd className="mt-2 text-base">{d.khuVuc}</dd>
          </div>
        </dl>
      </Section>
      <Section tone="nga" nhan="Yêu cầu và giải pháp" tieuDe="Từ bản vẽ đến công trình">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["Yêu cầu kiến trúc", d.yeuCauKienTruc],
            ["Giải pháp triển khai", d.giaiPhap],
            ["Kết quả thực tế", d.ketQua],
          ].map(([t, m]) => (
            <div key={t}>
              <h3 className="text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-than-chi/75">{m}</p>
            </div>
          ))}
        </div>
      </Section>
      {d.anhChiTiet.length > 0 && (
        <Section tone="sang" nhan="Chi tiết" tieuDe="Ảnh chi tiết cửa sau thi công">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {d.anhChiTiet.map((a) => (
              <li key={a} className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-than-chi">
                <Image src={asset(a)} alt={`${d.ten}: chi tiết cửa`} fill quality={65} sizes="(min-width: 768px) 30vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </Section>
      )}
      <Section tone="toi" nhan="Công trình của bạn" tieuDe="Trao đổi về công trình của bạn.">
        <Link href="/lien-he" className="nut nut-chinh">
          Liên hệ tư vấn
        </Link>
      </Section>
    </>
  );
}
