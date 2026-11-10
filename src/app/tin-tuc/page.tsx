import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui";
import { asset } from "@/lib/asset";
import { BAI_VIET } from "@/lib/bai-viet";

export const metadata: Metadata = {
  title: "Kiến thức & tin tức | WINDUCA",
  description: "Kiến thức kiến trúc, công nghệ cửa, vật liệu và câu chuyện công trình từ WINDUCA.",
};

/**
 * Knowledge Center (đề xuất 10/11/2026, mục 5.6): 4 chuyên mục. 3 bài đầu là bản biên soạn chung, chờ đội kỹ thuật duyệt.
 * Cần tối thiểu 6 bài nền tảng trước khi quảng bá chuyên mục.
 */
const CHUYEN_MUC = [
  { en: "Architecture & Design", t: "Kiến trúc & thiết kế", m: "Xu hướng không gian mở, mặt kính lớn và cách cửa tham gia vào ngôn ngữ kiến trúc.", anh: "/images/khung-cua-nhom-xem.jpg" },
  { en: "Window Technology", t: "Công nghệ cửa", m: "Cách vận hành, cấu tạo và lựa chọn kiểu cửa.", anh: "/images/cua-so-lat.jpg" },
  { en: "Material & Engineering", t: "Vật liệu & kỹ thuật", m: "Nhôm, kính, phụ kiện và bề mặt hoàn thiện.", anh: "/images/bang-mau-vat-lieu-2.jpg" },
  { en: "Project Stories", t: "Câu chuyện công trình", m: "Công trình và giải pháp triển khai khi có hình ảnh và sự đồng ý của chủ đầu tư.", anh: "/images/thao-luan-mat-bang.jpg" },
];

export default function TinTuc() {
  return (
    <>
      <PageHero
        nhan="Kiến thức"
        tieuDe="Kiến thức chuyên môn và câu chuyện công trình"
        moTa="Bốn chuyên mục. Các bài đầu tiên đã có mặt, những bài còn lại sẽ được cập nhật dần."
      />
      <Section tone="sang" nhan="Knowledge Center" tieuDe="Bốn chuyên mục">
        <ul className="grid gap-5 md:grid-cols-2">
          {CHUYEN_MUC.map((c) => {
            const bai = BAI_VIET.filter((b) => b.chuyenMuc === c.en);
            return (
              <li key={c.en} className="overflow-hidden rounded-[24px] border border-than-chi/10 bg-white">
                <div className="relative h-24 bg-than-chi md:h-28">
                  <Image src={asset(c.anh)} alt={c.t} fill quality={60} sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                </div>
                <div className="p-5 md:p-6">
                  <p className="nhan-muc text-accent">{c.en}</p>
                  <h2 className="mt-2 text-2xl font-bold">{c.t}</h2>
                  <p className="mt-2 text-sm text-than-chi/70">{c.m}</p>
                  <ul className="mt-4 space-y-2 border-t border-than-chi/10 pt-4">
                    {bai.length === 0 && <li className="text-sm text-than-chi/50">Đang chuẩn bị bài viết.</li>}
                    {bai.map((b) => (
                      <li key={b.slug}>
                        <Link href={`/tin-tuc/${b.slug}`} className="flex items-baseline justify-between gap-4 hover:text-accent">
                          <span className="text-base font-medium">{b.tieuDe}</span>
                          <span className="shrink-0 text-xs font-bold uppercase tracking-[0.06em] text-accent">Đọc</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/he-cua" className="nut nut-dac">
            Xem các hệ cửa
          </Link>
          <Link href="/lien-he" className="nut nut-vien-sang">
            Liên hệ nhận thông tin
          </Link>
        </div>
      </Section>
    </>
  );
}
