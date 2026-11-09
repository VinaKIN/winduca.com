import type { Metadata } from "next";
import { CongTrinhLuoi } from "@/components/CongTrinhLuoi";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cảm hứng & tham chiếu | WINDUCA",
  description: "Cảm hứng từ những không gian sống. Các hình ảnh là minh họa; công trình thực tế của WINDUCA đang được cập nhật.",
};

/**
 * Chưa có công trình thật → mục "Cảm hứng & tham chiếu" gồm 12 hình MINH HỌA (quyết định 09/11/2026).
 * Đổi tên thành "Công trình" khi có từ 3 công trình thật đã được phép đăng.
 */
export default function CongTrinh() {
  return (
    <>
      <PageHero
        nhan="Cảm hứng & tham chiếu"
        tieuDe="Cảm hứng từ những không gian sống."
        moTa="Các hình dưới đây là hình minh họa. Công trình thực tế của WINDUCA đang được cập nhật."
      />
      <Section tone="sang">
        <CongTrinhLuoi />
      </Section>
    </>
  );
}
