import type { Metadata } from "next";
import Link from "next/link";
import { CongTrinhLuoi } from "@/components/CongTrinhLuoi";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Công trình & cảm hứng kiến trúc | WINDUCA",
  description: "Công trình thực tế của WINDUCA và bộ sưu tập cảm hứng kiến trúc.",
};

/**
 * Hai nhóm nội dung (đề xuất 10/11/2026, mục 5.3):
 *  - WINDUCA Projects: công trình đã thực hiện, có dữ liệu và hình ảnh xác thực (chưa có → trạng thái đang cập nhật).
 *  - Architectural Inspiration: bộ sưu tập cảm hứng, KHÔNG nhận là công trình của WINDUCA.
 */
export default function CongTrinh() {
  return (
    <>
      <PageHero nhan="Công trình" tieuDe="Dấu ấn kiến trúc qua những không gian sống." />

      <Section tone="sang" nhan="WINDUCA Projects" tieuDe="Công trình WINDUCA đã thực hiện">
        <div className="rounded-[24px] border border-dashed border-than-chi/25 p-8 md:p-12">
          <p className="max-w-2xl text-base text-than-chi/80">
            Công trình thực tế đang được cập nhật. Mỗi công trình sẽ có ảnh tổng thể, ảnh chi tiết cửa, loại công trình, hệ cửa sử dụng, yêu cầu
            kiến trúc, giải pháp triển khai và kết quả thực tế, khi có hình ảnh và sự đồng ý của chủ đầu tư.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/lien-he" className="nut nut-chinh">
              Liên hệ tư vấn
            </Link>
            <Link href="/giai-phap" className="nut nut-vien-sang">
              Xem giải pháp theo công trình
            </Link>
          </div>
        </div>
      </Section>

      <Section
        tone="nga"
        nhan="Architectural Inspiration"
        tieuDe="Cảm hứng kiến trúc"
        moTa="Bộ sưu tập cảm hứng về không gian có mặt kính lớn. Đây không phải là công trình do WINDUCA thực hiện."
      >
        <CongTrinhLuoi />
      </Section>
    </>
  );
}
