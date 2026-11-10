import type { Metadata } from "next";
import { TrangDangCapNhat } from "@/components/TrangDangCapNhat";

export const metadata: Metadata = { title: "Tin hoạt động & sự kiện | WINDUCA", description: "Hoạt động, sự kiện và hợp tác của WINDUCA." };

export default function HoatDong() {
  return (
    <TrangDangCapNhat
      nhan="Tin tức"
      tieuDe="Tin hoạt động & sự kiện"
      moTa="Ra mắt, triển lãm, hợp tác và hoạt động của WINDUCA sẽ được cập nhật tại đây."
      anh="/images/thao-luan-mat-bang.jpg"
      se_co={["Thông tin ra mắt sản phẩm và giải pháp mới.", "Sự kiện, triển lãm và buổi giới thiệu cho kiến trúc sư.", "Hoạt động hợp tác với đối tác, đại lý và nhà thầu.", "Thông báo từ WINDUCA."]}
      lienKet={[
        { href: "/tin-tuc/kien-thuc", nhan: "Đọc bài kiến thức" },
        { href: "/lien-he", nhan: "Liên hệ nhận thông tin" },
      ]}
    />
  );
}
