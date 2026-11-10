import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Kiến thức & tin tức | WINDUCA",
  description: "Kiến thức kiến trúc, công nghệ cửa, vật liệu và câu chuyện công trình từ WINDUCA.",
};

/**
 * Knowledge Center (đề xuất 10/11/2026, mục 5.6): 4 chuyên mục. Bài viết chuyên môn cần số liệu đã xác minh nên
 * đang để trạng thái "Sắp có"; cần tối thiểu 6 bài nền tảng trước khi quảng bá chuyên mục.
 */
const CHUYEN_MUC = [
  { en: "Architecture & Design", t: "Kiến trúc & thiết kế", m: "Xu hướng không gian mở, mặt kính lớn và cách cửa tham gia vào ngôn ngữ kiến trúc.", bai: [] as string[], anh: "/images/khung-cua-nhom-xem.jpg" },
  { en: "Window Technology", t: "Công nghệ cửa", m: "Cách vận hành, cấu tạo và lựa chọn kiểu cửa.", bai: ["Cửa trượt nâng khác gì cửa trượt thường?"], anh: "/images/cua-so-lat.jpg" },
  { en: "Material & Engineering", t: "Vật liệu & kỹ thuật", m: "Nhôm, kính, phụ kiện và bề mặt hoàn thiện.", bai: ["Cách đọc chỉ số Uw của cửa cách nhiệt", "Anode hóa hay sơn tĩnh điện: chọn thế nào?"], anh: "/images/bang-mau-vat-lieu-2.jpg" },
  { en: "Project Stories", t: "Câu chuyện công trình", m: "Công trình và giải pháp triển khai khi có hình ảnh và sự đồng ý của chủ đầu tư.", bai: [] as string[], anh: "/images/thao-luan-mat-bang.jpg" },
];

export default function TinTuc() {
  return (
    <>
      <PageHero
        nhan="Kiến thức"
        tieuDe="Kiến thức chuyên môn và câu chuyện công trình"
        moTa="Bốn chuyên mục đang được biên soạn. Bài viết đầu tiên sẽ sớm có mặt tại đây."
      />
      <Section tone="sang" nhan="Knowledge Center" tieuDe="Bốn chuyên mục">
        <ul className="grid gap-5 md:grid-cols-2">
          {CHUYEN_MUC.map((c) => (
            <li key={c.en} className="overflow-hidden rounded-[24px] border border-than-chi/10 bg-white">
              <div className="relative h-24 bg-than-chi md:h-28">
                <Image src={asset(c.anh)} alt={c.t} fill quality={60} sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5 md:p-6">
              <p className="nhan-muc text-accent">{c.en}</p>
              <h2 className="mt-2 text-2xl font-bold">{c.t}</h2>
              <p className="mt-2 text-sm text-than-chi/70">{c.m}</p>
              <ul className="mt-4 space-y-2 border-t border-than-chi/10 pt-4">
                {c.bai.length === 0 && <li className="text-sm text-than-chi/50">Đang chuẩn bị bài viết.</li>}
                {c.bai.map((b) => (
                  <li key={b} className="flex items-baseline justify-between gap-4">
                    <span className="text-base font-medium">{b}</span>
                    <span className="shrink-0 text-xs text-than-chi/50">Sắp có</span>
                  </li>
                ))}
              </ul>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
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
