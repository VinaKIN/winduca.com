import type { Metadata } from "next";
import { TinTucTrang } from "@/components/TinTucTrang";

export const metadata: Metadata = {
  title: "Tin tức | WINDUCA",
  description: "Kiến thức chuyên môn, tin hoạt động, câu chuyện công trình và tài liệu từ WINDUCA.",
};

/** Trang Tin tức kiểu tạp chí tối giản (12/11/2026): bài nổi bật, lưới bài, lọc chuyên mục và tìm kiếm. */
export default function TinTuc() {
  return <TinTucTrang />;
}
