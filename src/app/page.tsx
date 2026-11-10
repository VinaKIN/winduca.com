import { HeroSlider } from "@/components/HeroSlider";
import {
  CongTrinhKhoi,
  DaiChuChay,
  DichVuKhoi,
  GioiThieuKhoi,
  SanPhamKhoi,
  TinTucKhoi,
  ViSaoKhoi,
} from "@/components/TrangChuKhoi";

/**
 * Trang chủ theo bố cục Winboss (11/11/2026):
 * Hero băng chuyền · Giới thiệu · Hệ cửa nổi bật · Dịch vụ + số liệu · Công trình theo loại ·
 * Dải chữ chạy · Vì sao chọn · Tin tức. (Khối "Đăng ký tham quan" nằm ở chân trang, dùng chung mọi trang.)
 */
export default function Home() {
  return (
    <>
      <HeroSlider />
      <GioiThieuKhoi />
      <SanPhamKhoi />
      <DichVuKhoi />
      <CongTrinhKhoi />
      <DaiChuChay />
      <ViSaoKhoi />
      <TinTucKhoi />
    </>
  );
}
