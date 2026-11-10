import type { Metadata } from "next";
import { TrangDangCapNhat } from "@/components/TrangDangCapNhat";

export const metadata: Metadata = { title: "Câu chuyện công trình | WINDUCA", description: "Công trình và giải pháp triển khai của WINDUCA." };

export default function CauChuyenCongTrinh() {
  return (
    <TrangDangCapNhat
      nhan="Tin tức"
      tieuDe="Câu chuyện công trình"
      moTa="Mỗi câu chuyện đi từ yêu cầu kiến trúc đến giải pháp và kết quả, khi có hình ảnh và sự đồng ý của chủ đầu tư."
      anh="/images/architecture/cong-trinh-05.webp"
      se_co={["Yêu cầu kiến trúc và bối cảnh công trình.", "Giải pháp cửa và cách triển khai.", "Ảnh tổng thể và ảnh chi tiết sau thi công.", "Kết quả thực tế, được chủ đầu tư đồng ý công bố."]}
      lienKet={[
        { href: "/cong-trinh", nhan: "Xem trang Công trình" },
        { href: "/giai-phap", nhan: "Giải pháp theo công trình" },
      ]}
    />
  );
}
