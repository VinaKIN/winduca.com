import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hien, NutHut } from "@/components/HieuUng";
import { Wrap } from "@/components/ui";
import { asset } from "@/lib/asset";
import { GIAI_PHAP, QUY_TRINH_5_BUOC } from "@/lib/giai-phap";
import { KIEU_CUA, TEN_EN_HE_CUA } from "@/lib/site";

const ANH_HE_CUA: Record<string, string> = {
  "cua-truot-nang": "/images/products/lift-slide.webp",
  "cua-di-mo-quay": "/images/products/casement.webp",
  "cua-xep-truot": "/images/products/bi-fold.webp",
  "cua-so": "/images/products/window.webp",
};

export function generateStaticParams() {
  return GIAI_PHAP.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/giai-phap/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = GIAI_PHAP.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: `${g.tenDai} | WINDUCA`, description: g.tomTat };
}

/** Bài chi tiết theo phong cách tạp chí (11/11/2026): bìa ảnh, câu dẫn, thân bài có chữ cái đầu, câu trích, ảnh rộng, ba điều cần cân nhắc, hệ cửa, hỏi đáp, quy trình, bài tiếp theo. */
export default async function GiaiPhapChiTiet({ params }: PageProps<"/giai-phap/[slug]">) {
  const { slug } = await params;
  const k = GIAI_PHAP.findIndex((x) => x.slug === slug);
  if (k < 0) notFound();
  const g = GIAI_PHAP[k];
  const tiep = GIAI_PHAP[(k + 1) % GIAI_PHAP.length];
  const heCua = KIEU_CUA.filter((x) => g.heCua.includes(x.slug));
  const khac = GIAI_PHAP.filter((x) => x.slug !== g.slug && x.slug !== tiep.slug);
  const so = String(k + 1).padStart(2, "0");

  return (
    <>
      {/* ---------- BÌA BÀI ---------- */}
      <section className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-hidden bg-than-chi text-white">
        <Image src={asset(g.anh)} alt={g.chuThich} fill priority quality={70} sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: g.pos }} />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,17,18,0.5)_0%,rgba(20,17,18,0.42)_40%,rgba(20,17,18,0.9)_100%)]" aria-hidden="true" />
        <Wrap className="relative w-full pb-10 pt-36 md:pb-14">
          <nav aria-label="Đường dẫn" className="flex flex-wrap items-center gap-3 border-b border-white/25 pb-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white/80">
            <Link href="/giai-phap" className="transition-colors hover:text-white">
              Tuyển tập giải pháp
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">
              Bài {so} · {g.ten}
            </span>
          </nav>
          <h1 className="mt-8 max-w-[20ch] text-[clamp(2.8rem,8vw,7rem)] font-light leading-[0.95] tracking-[-0.02em] [text-wrap:balance]">{g.tenDai}</h1>
          <p className="mt-6 max-w-2xl text-[clamp(1.3rem,2.2vw,1.9rem)] leading-snug text-white/90">{g.dan}</p>
          <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/70">FIG. {so} · {g.chuThich} · Ảnh minh họa, nguồn Pexels</p>
        </Wrap>
      </section>

      {/* ---------- THÂN BÀI ---------- */}
      <section className="nen-sang khoi-doc">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:gap-20">
            <Hien as="section">
              <aside className="lg:sticky lg:top-28" aria-label="Thông tin nhanh">
                <p className="nhan-muc text-accent">Trong bài này</p>
                <ul className="mt-5 divide-y divide-than-chi/15 border-y border-than-chi/15 text-[15px]">
                  {[
                    ["Không gian điển hình", "#khong-gian"],
                    ["Ba điều cần cân nhắc", "#can-nhac"],
                    ["Hệ cửa gợi ý", "#he-cua"],
                    ["Câu hỏi thường gặp", "#hoi-dap"],
                    ["Quy trình triển khai", "#quy-trinh"],
                  ].map(([t, h]) => (
                    <li key={h}>
                      <a href={h} className="flex items-center justify-between gap-3 py-3 text-than-chi/80 transition-colors hover:text-accent">
                        {t}
                        <span aria-hidden="true">↓</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3">
                  <NutHut href="/lien-he" className="nut nut-chinh">
                    Tư vấn giải pháp
                  </NutHut>
                  <NutHut href="/danh-cho-kts#tu-van" className="nut nut-dac">
                    Gửi bản vẽ
                  </NutHut>
                </div>
              </aside>
            </Hien>

            <article>
              <Hien>
                {g.baiViet.map((d, i) => (
                  <p
                    key={d}
                    className={`mb-6 text-[1.15rem] font-light leading-[1.7] text-than-chi/90 md:text-[1.3rem] ${
                      i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:first-letter:text-[5.2rem] first-letter:font-medium first-letter:leading-[0.8] first-letter:text-accent" : ""
                    }`}
                  >
                    {d}
                  </p>
                ))}
              </Hien>

              <Hien className="my-12">
                <blockquote className="border-l-2 border-accent pl-6 md:pl-10">
                  <p className="text-[clamp(1.9rem,3.6vw,3.1rem)] font-light leading-[1.12] tracking-[-0.01em] [text-wrap:balance]">&ldquo;{g.trich}&rdquo;</p>
                  <footer className="mt-4 text-[12px] uppercase tracking-[0.2em] text-than-chi/70">WINDUCA · Góc nhìn thiết kế</footer>
                </blockquote>
              </Hien>

              <Hien>
                <div id="khong-gian" className="scroll-mt-28">
                  <p className="nhan-muc text-accent">Không gian điển hình</p>
                  <ul className="mt-5 grid gap-px overflow-hidden border border-than-chi/15 bg-than-chi/15 sm:grid-cols-2">
                    {g.khongGian.map((x, i) => (
                      <li key={x} className="bg-white p-5 md:p-6">
                        <span className="font-light text-[1.8rem] leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                        <p className="mt-3 text-[15.5px] leading-relaxed text-than-chi/85">{x}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Hien>
            </article>
          </div>
        </Wrap>
      </section>

      {/* ---------- ẢNH RỘNG ---------- */}
      <section className="nen-sang pb-0" aria-label="Ảnh minh họa thứ hai">
        <div className="relative h-[clamp(300px,58svh,640px)] w-full overflow-hidden bg-than-chi">
          <Image src={asset(g.anh2)} alt="" fill quality={65} sizes="100vw" className="object-cover" style={{ objectPosition: g.pos2 }} aria-hidden="true" />
        </div>
        <Wrap>
          <p className="py-3 text-[12px] uppercase tracking-[0.18em] text-than-chi/70">FIG. {so}-B · Ảnh minh họa, nguồn Pexels. Không phải công trình của WINDUCA.</p>
        </Wrap>
      </section>

      {/* ---------- BA ĐIỀU CẦN CÂN NHẮC ---------- */}
      <section id="can-nhac" className="nen-nga khoi-doc scroll-mt-20">
        <Wrap>
          <Hien>
            <p className="nhan-muc text-accent">Ba điều cần cân nhắc</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2.1rem,4vw,3.5rem)] font-light leading-[1.05] tracking-[-0.015em]">
              Trước khi chốt bản vẽ, <span className="font-bold">hãy hỏi ba câu này.</span>
            </h2>
          </Hien>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {g.canNhac.map((c, i) => (
              <Hien key={c.t} as="li" tre={i * 110} className="border-t border-than-chi/30 pt-6">
                <span className="font-light text-[3.4rem] leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-[1.7rem] font-light leading-tight">{c.t}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-than-chi/80">{c.m}</p>
              </Hien>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* ---------- HỆ CỬA GỢI Ý ---------- */}
      <section id="he-cua" className="nen-sang khoi-doc scroll-mt-20">
        <Wrap>
          <Hien>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="nhan-muc text-accent">Hệ cửa gợi ý</p>
                <h2 className="mt-5 max-w-2xl text-[clamp(2.1rem,4vw,3.5rem)] font-light leading-[1.05] tracking-[-0.015em]">
                  Kiểu cửa <span className="font-bold">phù hợp với không gian này.</span>
                </h2>
              </div>
              <Link href="/he-cua" className="text-[13px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-accent">
                Xem toàn bộ hệ cửa →
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-than-chi/75">{g.ghiChuHeCua}</p>
          </Hien>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {heCua.map((x, i) => (
              <Hien key={x.slug} as="li" tre={i * 90}>
                <Link href={`/he-cua/${x.slug}`} className="group block">
                  <div className="dau-goc relative aspect-[4/5] overflow-hidden bg-than-chi">
                    <Image src={asset(ANH_HE_CUA[x.slug])} alt={x.ten} fill quality={60} sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
                  </div>
                  <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.18em] text-than-chi/70">{TEN_EN_HE_CUA[x.slug]}</p>
                  <h3 className="mt-1 text-[1.7rem] font-light leading-tight transition-colors group-hover:text-accent">{x.ten}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-than-chi/75">{x.tagline}</p>
                </Link>
              </Hien>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* ---------- HỎI ĐÁP ---------- */}
      <section id="hoi-dap" className="nen-nga khoi-doc scroll-mt-20">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Hien>
              <p className="nhan-muc text-accent">Câu hỏi thường gặp</p>
              <h2 className="mt-5 text-[clamp(2.1rem,4vw,3.5rem)] font-light leading-[1.05] tracking-[-0.015em]">
                Giải đáp <span className="font-bold">ngắn gọn.</span>
              </h2>
              <p className="mt-5 max-w-sm text-[15.5px] leading-relaxed text-than-chi/75">Những điều chủ đầu tư và kiến trúc sư hay hỏi với loại công trình này. Chi tiết cụ thể phụ thuộc bản vẽ.</p>
            </Hien>
            <Hien tre={100}>
              <div className="border-t border-than-chi/25">
                {g.faq.map((f) => (
                  <details key={f.h} className="group border-b border-than-chi/15">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[1.35rem] font-light leading-snug marker:hidden md:text-[1.6rem] [&::-webkit-details-marker]:hidden">
                      {f.h}
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-than-chi/30 text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-than-chi/80">{f.d}</p>
                  </details>
                ))}
              </div>
            </Hien>
          </div>
        </Wrap>
      </section>

      {/* ---------- QUY TRÌNH ---------- */}
      <section id="quy-trinh" className="luoi-ban-ve nen-sang khoi-doc scroll-mt-20">
        <Wrap>
          <Hien>
            <p className="nhan-muc text-accent">Quy trình triển khai</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2.1rem,4vw,3.5rem)] font-light leading-[1.05] tracking-[-0.015em]">
              Từ bản vẽ đến <span className="font-bold">nghiệm thu.</span>
            </h2>
          </Hien>
          <ol className="mt-10 grid gap-px overflow-hidden border border-than-chi/15 bg-than-chi/15 md:grid-cols-5">
            {QUY_TRINH_5_BUOC.map((b, i) => (
              <Hien key={b.t} as="li" tre={i * 80} className="bg-white p-6">
                <span className="font-light text-[2.6rem] leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[16.5px] font-bold">{b.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-than-chi/75">{b.m}</p>
              </Hien>
            ))}
          </ol>
          <p className="mt-5 max-w-2xl text-sm text-than-chi/70">Giải pháp WINDUCA đề xuất mang tính tham khảo; kiến trúc sư chịu trách nhiệm thiết kế cuối cùng của công trình.</p>
        </Wrap>
      </section>

      {/* ---------- BÀI TIẾP THEO ---------- */}
      <section className="relative isolate overflow-hidden bg-than-chi text-white">
        <Image src={asset(tiep.anh)} alt="" fill quality={55} sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: tiep.pos }} aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,17,18,0.92)_0%,rgba(20,17,18,0.6)_55%,rgba(20,17,18,0.35)_100%)]" aria-hidden="true" />
        <Wrap className="py-16 md:py-24">
          <Hien>
            <p className="nhan-muc text-accent">Bài tiếp theo</p>
            <Link href={`/giai-phap/${tiep.slug}`} className="group mt-5 block max-w-3xl">
              <span className="block text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.02] tracking-[-0.02em] transition-colors group-hover:text-white/80">
                {tiep.tenDai}
              </span>
              <span className="mt-4 block max-w-xl text-[16px] leading-relaxed text-white/85">{tiep.tomTat}</span>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em]">
                Đọc bài <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Hien>
        </Wrap>
      </section>

      {/* ---------- KẾT ---------- */}
      <section className="relative overflow-hidden nen-toi khoi-doc text-white">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <Hien>
            <p className="nhan-muc text-accent">Các bài khác trong tuyển tập</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {khac.map((x) => (
                <li key={x.slug}>
                  <Link href={`/giai-phap/${x.slug}`} className="inline-block rounded-full border border-white/30 px-4 py-2 text-sm text-white/85 transition-colors hover:border-accent hover:text-white">
                    {x.ten}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-12 max-w-3xl text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.04] tracking-[-0.02em]">
              Bàn về công trình của bạn <span className="font-bold">cùng đội kỹ thuật WINDUCA.</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
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
