import type { Metadata } from "next";
import { TrangDangCapNhat } from "@/components/TrangDangCapNhat";

export const metadata: Metadata = { title: "Tài liệu & tải về | WINDUCA", description: "Catalog, hồ sơ kỹ thuật và bảng màu của WINDUCA." };

export default function TaiLieu() {
  return (
    <TrangDangCapNhat
      nhan="Tin tức"
      tieuDe="Tài liệu & tải về"
      moTa="Tệp chỉ hiện nút tải khi tài liệu đã được kiểm duyệt và có quyền phân phối."
      anh="/images/materials/showroom-display.webp"
      se_co={["Catalog các hệ cửa.", "Hồ sơ kỹ thuật PDF.", "Mặt cắt DWG và mô hình BIM cho kiến trúc sư.", "Bảng màu vật liệu và hướng dẫn lắp đặt."]}
      lienKet={[
        { href: "/danh-cho-kts", nhan: "Thư viện kỹ thuật cho KTS" },
        { href: "/lien-he", nhan: "Đăng ký nhận tài liệu" },
      ]}
    />
  );
}
