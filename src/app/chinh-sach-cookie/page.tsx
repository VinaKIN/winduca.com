import type { Metadata } from "next";
import { ChinhSach } from "@/components/ChinhSach";

export const metadata: Metadata = { title: "Chính sách cookie | WINDUCA" };

export default function ChinhSachCookie() {
  return (
    <ChinhSach tieuDe="Chính sách cookie" capNhat="09/11/2026 (bản nháp)">
      <p>Cookie là các tệp nhỏ được lưu trên thiết bị của anh chị khi truy cập website.</p>

      <h2>1. Cookie cần thiết</h2>
      <p>
        Giúp website hoạt động đúng, ví dụ bảo vệ biểu mẫu khỏi spam. Loại này luôn bật.
      </p>

      <h2>2. Cookie không thiết yếu (chỉ khi anh chị đồng ý)</h2>
      <ul>
        <li>Đo lường lượt truy cập (Google Analytics) và quảng cáo (Meta Pixel).</li>
        <li>Bản đồ nhúng (Google Maps).</li>
      </ul>
      <p>
        Hiện website chưa bật các công cụ trên nên không đặt cookie loại này. Khi bật, chúng tôi sẽ hiển thị thông báo cookie
        và chỉ chạy sau khi anh chị đồng ý.
      </p>

      <h2>3. Thay đổi lựa chọn</h2>
      <p>Khi có thông báo cookie, anh chị có thể đổi lựa chọn bất cứ lúc nào bằng cách xóa dữ liệu trang trong trình duyệt.</p>
    </ChinhSach>
  );
}
