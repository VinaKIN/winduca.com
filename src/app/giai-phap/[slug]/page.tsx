import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/ui";
import { GIAI_PHAP, QUY_TRINH_TRIEN_KHAI } from "@/lib/giai-phap";
import { KIEU_CUA } from "@/lib/site";

export function generateStaticParams() {
  return GIAI_PHAP.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/giai-phap/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = GIAI_PHAP.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: `${g.ten} | WINDUCA`, description: g.tomTat };
}

export default async function GiaiPhapChiTiet({ params }: PageProps<"/giai-phap/[slug]">) {
  const { slug } = await params;
  const g = GIAI_PHAP.find((x) => x.slug === slug);
  if (!g) notFound();
  const heCua = KIEU_CUA.filter((k) => g.heCua.includes(k.slug));
  const khac = GIAI_PHAP.filter((x) => x.slug !== g.slug);

  return (
    <>
      <PageHero nhan="Giải pháp theo công trình" tieuDe={g.ten} moTa={g.tomTat} anh={g.anh}>
        <Link href="/lien-he" className="nut nut-chinh">
          Tư vấn giải pháp
        </Link>
        <Link href="/danh-cho-kts#tu-van" className="nut nut-vien">
          Gửi bản vẽ
        </Link>
      </PageHero>

      <Section tone="sang" nhan="Câu hỏi 1" tieuDe="Không gian này cần giải pháp cửa như thế nào?">
        <ul className="grid gap-5 md:grid-cols-2">
          {g.khongGian.map((x, i) => (
            <li key={x} className="flex gap-5 border-t border-inox pt-5">
              <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-base text-than-chi/85">{x}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="nga" nhan="Câu hỏi 2" tieuDe="Hệ cửa nào phù hợp?" moTa={g.ghiChuHeCua}>
        <ul className="grid gap-5 md:grid-cols-3">
          {heCua.map((k) => (
            <li key={k.slug}>
              <Link href={`/he-cua/${k.slug}`} className="group block rounded-[22px] bg-white p-6 transition-shadow hover:shadow-lg">
                <h3 className="text-xl font-bold group-hover:text-accent">{k.ten}</h3>
                <p className="mt-2 text-sm text-than-chi/70">{k.tagline}</p>
                <span className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.06em] text-accent">Xem chi tiết</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sang" nhan="Câu hỏi 3" tieuDe="WINDUCA tư vấn và triển khai những gì?">
        <ol className="grid gap-6 md:grid-cols-4">
          {QUY_TRINH_TRIEN_KHAI.map((x, i) => (
            <li key={x} className="border-t-2 border-accent pt-4">
              <span className="text-3xl font-light text-than-chi/35">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 text-base font-medium">{x}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-sm text-than-chi/70">
          Giải pháp và chi tiết WINDUCA đề xuất mang tính tham khảo; kiến trúc sư chịu trách nhiệm thiết kế cuối cùng của công trình.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/lien-he" className="nut nut-dac">
            Liên hệ tư vấn
          </Link>
          <Link href="/trai-nghiem#sample-box" className="nut nut-vien-sang">
            Nhận hộp mẫu góc nhôm
          </Link>
        </div>
      </Section>

      <Section tone="nga" nhan="Giải pháp khác" tieuDe="Xem các loại công trình khác">
        <ul className="flex flex-wrap gap-3">
          {khac.map((x) => (
            <li key={x.slug}>
              <Link href={`/giai-phap/${x.slug}`} className="nut nut-vien-sang">
                {x.ten}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
