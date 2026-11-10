import type { Metadata } from "next";
import { CrossSection } from "@/components/CrossSection";
import { GiaiPhapDongBo } from "@/components/GiaiPhapDongBo";
import { DaiChuChay, DichVuKhoi, DoiTacKhoi, GioiThieuKhoi, ViSaoKhoi } from "@/components/TrangChuKhoi";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Giới thiệu | WINDUCA",
  description: "WINDUCA: giải pháp cửa nhôm kính cao cấp châu Âu đồng bộ, từ hệ nhôm, phụ kiện đến thi công.",
};

/** Trang Giới thiệu theo bố cục Winboss: hero ảnh → giới thiệu → mặt cắt → dịch vụ → dải chữ → vì sao chọn. */
export default function GioiThieu() {
  return (
    <>
      <PageHero
        nhan="Giới thiệu"
        tieuDe="WINDUCA – Premium Window & Door"
        moTa="Thương hiệu mang đến giải pháp cửa nhôm kính cao cấp châu Âu đồng bộ — từ hệ nhôm, phụ kiện đến thi công."
      />
      <GioiThieuKhoi />
      <CrossSection />
      <GiaiPhapDongBo />
      <DichVuKhoi />
      <DaiChuChay />
      <ViSaoKhoi />
      <DoiTacKhoi />
    </>
  );
}
