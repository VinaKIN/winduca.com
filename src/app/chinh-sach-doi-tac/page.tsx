import type { Metadata } from "next";
import { ChinhSach } from "@/components/ChinhSach";

export const metadata: Metadata = { title: "Chính sách đối tác và đại lý | WINDUCA" };

/** Khung chính sách đối tác: điều kiện hợp tác CHƯA có xác nhận nên để chỗ trống. */
export default function ChinhSachDoiTac() {
  return (
    <ChinhSach tieuDe="Chính sách đối tác và đại lý" capNhat="10/11/2026 (bản nháp)">
      <p>WINDUCA hợp tác với đại lý, nhà thầu, kiến trúc sư và công ty thiết kế.</p>

      <h2>1. Đối tượng hợp tác</h2>
      <ul>
        <li>Đại lý và nhà phân phối.</li>
        <li>Nhà thầu và đơn vị thi công.</li>
        <li>Kiến trúc sư và công ty thiết kế.</li>
      </ul>

      <h2>2. Điều kiện và quyền lợi</h2>
      <p>Điều kiện hợp tác, quyền lợi, hỗ trợ kỹ thuật và tài liệu: [CHỜ XÁC NHẬN].</p>

      <h2>3. Đăng ký</h2>
      <p>Anh chị để lại thông tin tại trang Hợp tác, đội ngũ WINDUCA sẽ liên hệ trao đổi.</p>
    </ChinhSach>
  );
}
