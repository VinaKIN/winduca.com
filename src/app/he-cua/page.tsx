import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CauHinhCua } from "@/components/CauHinhCua";
import { Hien, NutHut } from "@/components/HieuUng";
import { HeCuaDanhSach } from "@/components/HeCuaDanhSach";
import { SoSanhHeCua } from "@/components/SoSanhHeCua";
import { PageHero, Wrap } from "@/components/ui";
import { asset } from "@/lib/asset";
import { KIEU_CUA, TEN_EN_HE_CUA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hệ cửa | WINDUCA",
  description: "Cửa trượt nâng, cửa đi mở quay, cửa xếp trượt và cửa sổ nhôm cầu cách nhiệt: so sánh, xem mẫu cửa và gửi cấu hình để được tư vấn.",
};

/** Trang Hệ cửa thiết kế lại (10/11/2026): 4 kiểu cửa, So sánh, Mẫu cửa theo hãng, Cấu hình cửa → tư vấn. */
const STROKE = "![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]";
const ANH: Record<string, [string, string]> = {
  "cua-truot-nang": ["/images/products/lift-slide.webp", "/images/products/lift-slide-hover.webp"],
  "cua-di-mo-quay": ["/images/products/casement.webp", "/images/products/casement-hover.webp"],
  "cua-xep-truot": ["/images/products/bi-fold.webp", "/images/products/bi-fold-hover.webp"],
  "cua-so": ["/images/products/window.webp", "/images/products/window-hover.webp"],
};

function Dau({ so, nhan, tieuDe }: { so: string; nhan: string; tieuDe: React.ReactNode }) {
  return (
    <Hien>
      <div className="flex items-end gap-4">
        <span className={`so-lon !text-[clamp(3.5rem,7vw,6rem)] leading-[0.85] ${STROKE}`} aria-hidden="true">
          {so}
        </span>
        <p className="nhan-muc pb-2 text-accent">{nhan}</p>
      </div>
      <h2 className="mt-4 max-w-3xl text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">{tieuDe}</h2>
    </Hien>
  );
}

export default function HeCua() {
  return (
    <>
      <PageHero
        congNghe
        nhan="Hệ cửa WINDUCA"
        tieuDe="Chọn kiểu cửa theo cách bạn muốn sống"
        moTa="Bốn kiểu cửa, một ngôn ngữ thiết kế: khung nhôm cầu cách nhiệt, hoàn thiện anode hóa hoặc sơn tĩnh điện."
        anh="/images/products/lift-slide.webp"
      >
        <NutHut href="#cau-hinh" className="nut nut-chinh">
          Cấu hình cửa của bạn
        </NutHut>
        <NutHut href="/trai-nghiem#sample-box" className="nut nut-vien">
          Nhận hộp mẫu góc nhôm
        </NutHut>
      </PageHero>

      {/* 01 · Bốn kiểu cửa */}
      <section className="luoi-ban-ve nen-sang khoi-doc">
        <Wrap>
          <Dau so="01" nhan="Bốn kiểu cửa" tieuDe={<>Chọn kiểu cửa phù hợp <span className="font-bold">với không gian</span></>} />
          <ul className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible lg:grid-cols-4">
            {KIEU_CUA.map((k, i) => (
              <Hien key={k.slug} as="li" tre={i * 90} className="w-[74%] shrink-0 snap-start sm:w-auto">
                <Link href={`/he-cua/${k.slug}`} className="group block overflow-hidden rounded-[6px] border border-than-chi/10 bg-white transition-shadow hover:shadow-lg">
                  <div className="dau-goc relative aspect-[4/3] bg-than-chi lg:aspect-[3/2]">
                    <Image src={asset(ANH[k.slug][0])} alt={`${k.ten} trong không gian kiến trúc`} fill quality={65} sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover transition-opacity duration-700 group-hover:opacity-0" />
                    <Image src={asset(ANH[k.slug][1])} alt="" fill quality={65} sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-than-chi/65">
                      {String(i + 1).padStart(2, "0")} · {TEN_EN_HE_CUA[k.slug]}
                    </p>
                    <h3 className="mt-1 text-xl font-bold group-hover:text-accent">{k.ten}</h3>
                    <p className="mt-1 hidden text-[15px] leading-relaxed text-than-chi/70 sm:block">{k.tagline}</p>
                  </div>
                </Link>
              </Hien>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* 02 · So sánh */}
      <section id="so-sanh" className="nen-nga khoi-doc">
        <Wrap>
          <Dau so="02" nhan="So sánh hệ cửa" tieuDe={<>Đặt hai đến ba kiểu cửa <span className="font-bold">cạnh nhau</span></>} />
          <Hien tre={100} className="mt-5">
            <SoSanhHeCua />
          </Hien>
        </Wrap>
      </section>

      {/* 03 · Sản phẩm theo chức năng (11/11/2026: thay mục Mẫu cửa theo hãng; không dùng tên hãng) */}
      <section id="san-pham" className="luoi-ban-ve nen-sang khoi-doc">
        <Wrap>
          <Dau so="03" nhan="Sản phẩm" tieuDe={<>Chọn sản phẩm theo <span className="font-bold">thông số kỹ thuật</span></>} />
          <div className="mt-5">
            <HeCuaDanhSach />
          </div>
        </Wrap>
      </section>

      {/* 04 · Cấu hình cửa */}
      <section id="cau-hinh" className="relative overflow-hidden nen-nga khoi-doc">
        <Wrap>
          <Dau so="04" nhan="Cấu hình cửa" tieuDe={<>Chọn cấu hình, <span className="font-bold">nhận tư vấn</span></>} />
          <Hien tre={100} className="mt-5">
            <CauHinhCua />
          </Hien>
        </Wrap>
      </section>
    </>
  );
}
