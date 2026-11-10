import type { Metadata } from "next";
import { ChinhSach } from "@/components/ChinhSach";

export const metadata: Metadata = { title: "Chính sách bảo hành và hậu mãi | WINDUCA" };

/** Khung chính sách: thời hạn và điều kiện bảo hành CHƯA có xác nhận nên để chỗ trống. */
export default function ChinhSachBaoHanh() {
  return (
    <ChinhSach tieuDe="Chính sách bảo hành và hậu mãi" capNhat="10/11/2026 (bản nháp)">
      <p>Chính sách này mô tả cách WINDUCA hỗ trợ anh chị sau khi bàn giao bộ cửa.</p>

      <h2>1. Phạm vi bảo hành</h2>
      <p>Thời hạn và phạm vi bảo hành cho khung nhôm, bề mặt, kính và phụ kiện: [CHỜ XÁC NHẬN].</p>

      <h2>2. Điều kiện bảo hành</h2>
      <ul>
        <li>Điều kiện lắp đặt và sử dụng: [CHỜ XÁC NHẬN].</li>
        <li>Các trường hợp không thuộc phạm vi bảo hành: [CHỜ XÁC NHẬN].</li>
      </ul>

      <h2>3. Hậu mãi</h2>
      <p>Bảo trì, hiệu chỉnh và hỗ trợ kỹ thuật sau bàn giao. Anh chị liên hệ hotline 0947 686 668 hoặc info@winduca.com để được hỗ trợ.</p>

      <h2>4. Quy trình tiếp nhận yêu cầu</h2>
      <p>Thời gian phản hồi và quy trình xử lý: [CHỜ XÁC NHẬN].</p>
    </ChinhSach>
  );
}
