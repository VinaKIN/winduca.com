import type { Metadata } from "next";
import { ChinhSach } from "@/components/ChinhSach";

export const metadata: Metadata = { title: "Chính sách cookie | WINDUCA" };

export default function ChinhSachCookie() {
  return (
    <ChinhSach tieuDe="Chính sách cookie" capNhat="09/11/2026 (bản nháp)">
      <p>Cookie là các tệp nhỏ được lưu trên thiết bị của anh chị khi truy cập website.</p>

      <h2>1. Cookie cần thiết</h2>
      <p>
        Giúp website hoạt động đúng, ví dụ ghi nhớ lựa chọn cookie của anh chị và bảo vệ biểu mẫu khỏi spam. Loại này luôn bật.
      </p>

      <h2>2. Cookie không thiết yếu (chỉ khi anh chị đồng ý)</h2>
      <ul>
        <li>Đo lường lượt truy cập (Google Analytics) và quảng cáo (Meta Pixel).</li>
        <li>Bản đồ nhúng (Google Maps).</li>
      </ul>
      <p>Mặc định chúng tôi từ chối nhóm này. Hiện website chưa bật các công cụ trên.</p>

      <h2>3. Thay đổi lựa chọn</h2>
      <p>Anh chị có thể xóa dữ liệu trang trong trình duyệt để hiển thị lại thông báo cookie và chọn lại.</p>
    </ChinhSach>
  );
}
