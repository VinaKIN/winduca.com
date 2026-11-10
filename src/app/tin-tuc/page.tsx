import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui";
import { asset } from "@/lib/asset";
import { BAI_VIET } from "@/lib/bai-viet";

export const metadata: Metadata = {
  title: "Tin tức | WINDUCA",
  description: "Kiến thức chuyên môn, tin hoạt động, câu chuyện công trình và tài liệu từ WINDUCA.",
};

/** Trang chủ mục Tin tức: dẫn tới 4 trang con. */
const MUC = [
  { href: "/tin-tuc/kien-thuc", t: "Kiến thức", m: "Bài chuyên môn về kiến trúc, công nghệ cửa, vật liệu và kỹ thuật.", anh: "/images/khung-cua-nhom-xem.jpg" },
  { href: "/tin-tuc/hoat-dong", t: "Tin hoạt động & sự kiện", m: "Ra mắt, triển lãm, hợp tác và hoạt động của WINDUCA.", anh: "/images/thao-luan-mat-bang.jpg" },
  { href: "/tin-tuc/cong-trinh", t: "Câu chuyện công trình", m: "Công trình và giải pháp triển khai, khi có sự đồng ý của chủ đầu tư.", anh: "/images/architecture/cong-trinh-05.webp" },
  { href: "/tin-tuc/tai-lieu", t: "Tài liệu & tải về", m: "Catalog, hồ sơ kỹ thuật và bảng màu khi đã được kiểm duyệt.", anh: "/images/materials/showroom-display.webp" },
];

export default function TinTuc() {
  return (
    <>
      <PageHero nhan="Tin tức" tieuDe="Tin tức và kiến thức WINDUCA" moTa="Chọn chuyên mục để đọc bài và tài liệu mới nhất." />
      <Section tone="sang" nhan="Chuyên mục" tieuDe="Bốn mục trong Tin tức">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MUC.map((m) => (
            <li key={m.href}>
              <Link href={m.href} className="group block overflow-hidden rounded-[22px] border border-than-chi/10 bg-white transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/3] bg-than-chi">
                  <Image src={asset(m.anh)} alt={m.t} fill quality={60} sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold">{m.t}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-than-chi/70">{m.m}</p>
                  <span className="mt-3 inline-block text-sm font-bold uppercase tracking-[0.06em] text-accent">Xem mục</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="nga" nhan="Mới nhất" tieuDe="Bài viết gần đây">
        <ul className="grid gap-4 md:grid-cols-3">
          {BAI_VIET.map((b) => (
            <li key={b.slug}>
              <Link href={`/tin-tuc/${b.slug}`} className="group block rounded-[20px] bg-white p-6">
                <p className="nhan-muc text-accent">{b.chuyenMuc}</p>
                <h3 className="mt-2 text-xl font-bold group-hover:text-accent">{b.tieuDe}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-than-chi/70">{b.tomTat}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
