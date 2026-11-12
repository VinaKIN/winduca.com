import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hien, NutHut } from "@/components/HieuUng";
import { TieuDeTrang } from "@/components/TrangMau";
import { Wrap } from "@/components/ui";
import { asset } from "@/lib/asset";
import { GIAI_PHAP } from "@/lib/giai-phap";
import { ANH_THEO_KIEU, MA_LOC_THEO_KIEU, SO_HE_THEO_KIEU } from "@/lib/san-pham";
import { KIEU_CUA, TEN_EN_HE_CUA } from "@/lib/site";

/**
 * Trang kiểu cửa, gọn lại 11/11/2026 (đợt 2 rà soát UI/UX): chỉ còn phần giới thiệu và là điểm vào của trang /he-cua đã lọc sẵn.
 * Danh sách hệ và thông số thật nằm ở /he-cua, nên không còn dòng "đang chờ xác nhận" ở đây. Không nêu tên hãng ở trang này.
 */
export function generateStaticParams() {
  return KIEU_CUA.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: PageProps<"/he-cua/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const k = KIEU_CUA.find((x) => x.slug === slug);
  if (!k) return {};
  return { title: `${k.ten} | WINDUCA`, description: `${k.ten} WINDUCA: ${k.tagline}` };
}

export default async function KieuCuaPage({ params }: PageProps<"/he-cua/[slug]">) {
  const { slug } = await params;
  const k = KIEU_CUA.find((x) => x.slug === slug);
  if (!k) notFound();

  const ma = MA_LOC_THEO_KIEU[k.slug];
  const so = SO_HE_THEO_KIEU[k.slug];
  const gp = GIAI_PHAP.filter((g) => g.heCua.includes(k.slug));
  const khac = KIEU_CUA.filter((x) => x.slug !== k.slug);

  return (
    <>
      <TieuDeTrang tieuDe={k.ten} moTa={k.tagline} />

      <section className="bg-white pb-14 md:pb-20">
        <Wrap>
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Hien>
              <div className="dau-goc relative aspect-[4/3] overflow-hidden rounded-[12px] bg-than-chi">
                <Image src={asset(ANH_THEO_KIEU[k.slug].src)} alt={`${k.ten} trong không gian kiến trúc`} fill priority quality={70} sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-than-chi/70">{TEN_EN_HE_CUA[k.slug]}</p>
            </Hien>
            <Hien tre={100}>
              <h2 className="text-[1.6rem] font-bold leading-tight md:text-[1.9rem]">Tổng quan</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-than-chi/80">{k.tongQuan}</p>
              <dl className="mt-6 grid gap-px overflow-hidden border border-than-chi/15 bg-than-chi/15 sm:grid-cols-2">
                <div className="bg-white p-4">
                  <dt className="text-[12px] font-medium uppercase tracking-[0.14em] text-than-chi/70">Cách mở</dt>
                  <dd className="mt-1 text-[15px] font-bold">{k.cachMo}</dd>
                </div>
                <div className="bg-white p-4">
                  <dt className="text-[12px] font-medium uppercase tracking-[0.14em] text-than-chi/70">Khẩu độ</dt>
                  <dd className="mt-1 text-[15px] font-bold">{k.khauDo}</dd>
                </div>
              </dl>
              <ul className="mt-6 space-y-2 text-[15.5px] text-than-chi/85">
                {k.dacDiem.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-5 shrink-0 bg-accent" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/he-cua?h=${ma}`} className="nut nut-chinh">
                  Xem {so} hệ {k.ten.toLowerCase()}
                </Link>
                <NutHut href="/lien-he" className="nut nut-dac">
                  Tư vấn chọn hệ
                </NutHut>
              </div>
            </Hien>
          </div>
        </Wrap>
      </section>

      <section className="nen-nga py-12 md:py-16">
        <Wrap>
          <Hien>
            <h2 className="text-[1.4rem] font-bold leading-tight md:text-[1.6rem]">Không gian phù hợp</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {k.khongGian.map((x) => (
                <li key={x} className="rounded-full border border-than-chi/25 bg-white px-4 py-2 text-[14px]">
                  {x}
                </li>
              ))}
            </ul>
            {gp.length > 0 && (
              <>
                <h3 className="mt-8 text-[1.1rem] font-bold">Giải pháp theo loại công trình</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {gp.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/giai-phap/${g.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-than-chi/25 px-4 text-[14px] transition-colors hover:border-accent hover:text-accent">
                        {g.ten}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Hien>
        </Wrap>
      </section>

      <section className="bg-white py-12 md:py-16">
        <Wrap>
          <h2 className="text-[1.4rem] font-bold leading-tight md:text-[1.6rem]">Các kiểu cửa khác</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {khac.map((x) => (
              <li key={x.slug}>
                <Link href={`/he-cua/${x.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-than-chi/25 px-5 text-[14px] transition-colors hover:border-accent hover:text-accent">
                  {x.ten}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/he-cua" className="inline-flex min-h-11 items-center rounded-full bg-than-chi px-5 text-[14px] font-bold text-white transition-colors hover:bg-accent">
                Toàn bộ hệ cửa
              </Link>
            </li>
          </ul>
        </Wrap>
      </section>
    </>
  );
}
