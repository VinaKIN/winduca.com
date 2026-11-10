import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DoorExplorer } from "@/components/DoorExplorer";
import { Faq } from "@/components/Faq";
import { Hien, KeoNgang, NutHut } from "@/components/HieuUng";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, Wrap } from "@/components/ui";
import { asset } from "@/lib/asset";
import { CONG_TRINH_MINH_HOA, FAQ_CHUNG, KIEU_CUA, TEN_EN_HE_CUA, THONG_SO_BANG } from "@/lib/site";

const STROKE = "![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]";
const ANH: Record<string, string> = {
  "cua-truot-nang": "/images/products/lift-slide.webp",
  "cua-di-mo-quay": "/images/products/casement.webp",
  "cua-xep-truot": "/images/products/bi-fold.webp",
  "cua-so": "/images/products/window.webp",
};

export function generateStaticParams() {
  return KIEU_CUA.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: PageProps<"/he-cua/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const k = KIEU_CUA.find((x) => x.slug === slug);
  if (!k) return {};
  return { title: `${k.ten} | WINDUCA`, description: `${k.ten} WINDUCA: ${k.tagline}` };
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

export default async function KieuCuaPage({ params }: PageProps<"/he-cua/[slug]">) {
  const { slug } = await params;
  const k = KIEU_CUA.find((x) => x.slug === slug);
  if (!k) notFound();

  const khac = KIEU_CUA.filter((x) => x.slug !== k.slug);
  const lienQuan = CONG_TRINH_MINH_HOA.filter((c) => c.kieuCua === k.ten).slice(0, 4);

  return (
    <>
      <PageHero congNghe nhan={`Hệ cửa · ${TEN_EN_HE_CUA[k.slug]}`} tieuDe={`${k.ten} WINDUCA`} moTa={k.tagline} anh={ANH[k.slug]}>
        <NutHut href="#dang-ky" className="nut nut-chinh">
          Nhận hộp mẫu góc nhôm
        </NutHut>
        <NutHut href="/danh-cho-kts#thu-vien" className="nut nut-vien">
          Tài liệu cho KTS
        </NutHut>
      </PageHero>

      {/* 01 · Tổng quan */}
      <section className="luoi-ban-ve nen-sang py-10 md:py-14">
        <Wrap>
          <Hien>
            <Dau so="01" nhan="Tổng quan" />
            <h2 className="mt-4 max-w-3xl text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">{k.tagline}</h2>
            <p className="mt-3 max-w-3xl text-base text-than-chi/75">{k.tongQuan}</p>
          </Hien>
          <dl className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Cách mở", k.cachMo],
              ["Khẩu độ", k.khauDo],
              ["Không gian phù hợp", k.khongGian.join(" · ")],
            ].map(([t, v], i) => (
              <Hien key={t} tre={i * 100} className="dau-goc rounded-[6px] border border-than-chi/10 bg-white p-5">
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-than-chi/55">{t}</dt>
                <dd className="mt-2 text-base font-semibold">{v}</dd>
              </Hien>
            ))}
          </dl>
        </Wrap>
      </section>

      {/* 02 · Trải nghiệm + 03 · Cấu tạo 3D */}
      <DoorExplorer tenKieuCua={k.ten} slug={k.slug} />

      {/* 04 · Thông số */}
      <section className="nen-nga py-10 md:py-14">
        <Wrap>
          <Hien>
            <Dau so="04" nhan="Thông số kỹ thuật" />
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-than-chi/65">Các giá trị sẽ được công bố cùng nguồn kiểm định khi có kết quả xác nhận.</p>
          </Hien>
          <dl className="mt-5 grid gap-px overflow-hidden rounded-[6px] border border-than-chi/15 bg-than-chi/15 sm:grid-cols-2 lg:grid-cols-3">
            {THONG_SO_BANG.map((ten) => (
              <div key={ten} className="bg-white p-4">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-than-chi/55">{ten}</dt>
                <dd className="mt-1 text-sm text-than-chi/50">Đang chờ xác nhận</dd>
              </div>
            ))}
          </dl>
        </Wrap>
      </section>

      {/* 05 · Phụ kiện + tài liệu */}
      <section className="luoi-ban-ve nen-sang py-10 md:py-14">
        <Wrap>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <Hien>
              <Dau so="05" nhan="Phụ kiện WINDUCA" />
              <h2 className="mt-4 text-[clamp(1.5rem,2.3vw,2.125rem)] font-light leading-[1.15]">Tay nắm, bản lề, khóa, <span className="font-bold">đồng bộ với khung cửa.</span></h2>
              <p className="mt-3 max-w-xl text-base text-than-chi/75">
                Phụ kiện được chọn đồng bộ về màu và đường nét với khung nhôm. Tay nắm chỉ khắc duy nhất chữ WINDUCA. Anh chị có thể chạm thử mẫu phụ kiện ngay trong hộp mẫu.
              </p>
            </Hien>
            <Hien tre={120}>
              <p className="nhan-muc text-accent">Tài liệu cho kiến trúc sư</p>
              <ul className="mt-4 space-y-3">
                {["Mặt cắt DWG", "Mô hình BIM (RFA, IFC)", "Catalog / hồ sơ kỹ thuật"].map((t) => (
                  <li key={t} className="flex items-center justify-between rounded-[6px] border border-than-chi/15 bg-white p-4">
                    <span className="text-sm font-semibold">{t}</span>
                    <span className="rounded-full border border-than-chi/25 px-3 py-1 text-xs text-than-chi/60">Sắp có</span>
                  </li>
                ))}
              </ul>
            </Hien>
          </div>
        </Wrap>
      </section>

      {/* 06 · Không gian cảm hứng */}
      {lienQuan.length > 0 && (
        <section className="nen-nga py-10 md:py-14">
          <Wrap>
            <Hien>
              <Dau so="06" nhan="Cảm hứng" />
              <h2 className="mt-4 text-[clamp(1.5rem,2.3vw,2.125rem)] font-light leading-[1.15]">Không gian dùng <span className="font-bold">{k.ten.toLowerCase()}</span></h2>
            </Hien>
            <KeoNgang className="mt-5">
              {lienQuan.map((c, i) => {
                const idx = CONG_TRINH_MINH_HOA.findIndex((x) => x.slug === c.slug) + 1;
                return (
                  <Hien key={c.slug} tre={i * 90} className="w-[72%] shrink-0 snap-start sm:w-[40%] lg:w-[calc((100%-3rem)/4)]">
                    <Link href={`/cong-trinh/${c.slug}`} className="group block">
                      <div className="dau-goc relative h-[clamp(130px,20svh,190px)] overflow-hidden rounded-[6px] bg-than-chi">
                        <Image src={asset(`/images/architecture/cong-trinh-${String(idx).padStart(2, "0")}.webp`)} alt={c.ten} fill quality={60} sizes="(min-width: 1024px) 24vw, 70vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                      </div>
                      <p className="mt-2 text-sm font-semibold group-hover:text-accent">{c.ten}</p>
                    </Link>
                  </Hien>
                );
              })}
            </KeoNgang>
            <p className="mt-2 text-xs text-than-chi/50">Ảnh cảm hứng, không phải công trình do WINDUCA thực hiện.</p>
          </Wrap>
        </section>
      )}

      {/* 07 · Câu hỏi thường gặp */}
      <section className="nen-sang py-10 md:py-14">
        <Wrap>
          <Hien>
            <Dau so="07" nhan="Câu hỏi thường gặp" />
          </Hien>
          <div className="mt-5">
            <Faq muc={FAQ_CHUNG.slice(0, 4)} />
          </div>
        </Wrap>
      </section>

      {/* Đăng ký hộp mẫu */}
      <section id="dang-ky" className="relative overflow-hidden nen-toi py-8 text-white md:py-10">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-12">
            <Hien>
              <p className="nhan-muc text-accent">Hộp mẫu góc nhôm</p>
              <h2 className="mt-3 text-[clamp(1.625rem,2.6vw,2.4rem)] font-light leading-[1.15] tracking-[-0.01em]">
                Quan tâm <span className="font-bold">{k.ten.toLowerCase()}?</span>
              </h2>
              <p className="mt-3 text-sm text-white/70">Nhận hộp mẫu góc nhôm tại nhà. Chúng tôi không hỏi ngân sách và không đăng giá.</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {khac.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/he-cua/${x.slug}`} className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs text-white/85 transition-colors hover:border-accent hover:text-white">
                      {x.ten}
                    </Link>
                  </li>
                ))}
              </ul>
            </Hien>
            <Hien tre={100} className="rounded-[6px] bg-nga p-5 text-than-chi md:p-6">
              <LeadForm loai="sample-box" tone="sang" kieuCuaMacDinh={k.ten} cot={3} />
            </Hien>
          </div>
        </Wrap>
      </section>
    </>
  );
}
