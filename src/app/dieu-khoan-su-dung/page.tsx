import type { Metadata } from "next";
import { ChinhSach } from "@/components/ChinhSach";

export const metadata: Metadata = { title: "Điều khoản sử dụng | WINDUCA" };

export default function DieuKhoan() {
  return (
    <ChinhSach tieuDe="Điều khoản sử dụng" capNhat="09/11/2026 (bản nháp)">
      <p>Khi truy cập winduca.com, anh chị đồng ý với các điều khoản dưới đây.</p>

      <h2>1. Nội dung website</h2>
      <p>
        Nội dung trên website nhằm giới thiệu sản phẩm và dịch vụ của WINDUCA, không phải báo giá hay cam kết hợp đồng. Chi phí
        phụ thuộc vào bản vẽ và yêu cầu cụ thể, được xác nhận trực tiếp với anh chị.
      </p>

      <h2>2. Hình ảnh minh họa</h2>
      <p>
        Hình ảnh và nội dung có nhãn “Minh họa” chỉ nhằm gợi ý, không phải công trình hay sản
        phẩm thực tế. Màu sắc thực tế có thể khác tùy màn hình và lô hoàn thiện.
      </p>

      <h2>3. Thông số kỹ thuật</h2>
      <p>
        Các thông số ghi “Đang chờ xác nhận” sẽ được công bố cùng nguồn kiểm định khi có kết quả. Chúng tôi không cam kết các
        giá trị chưa được xác nhận.
      </p>

      <h2>4. Tệp kỹ thuật (DWG, BIM, PDF)</h2>
      <ul>
        <li>Được dùng cho mục đích thiết kế và thi công công trình của anh chị.</li>
        <li>Không bán lại, không đăng lại công khai khi chưa có sự đồng ý của WINDUCA.</li>
        <li>Chi tiết và giải pháp là tham khảo; kiến trúc sư chịu trách nhiệm thiết kế cuối cùng.</li>
      </ul>

      <h2>5. Sở hữu trí tuệ</h2>
      <p>Tên WINDUCA, biểu tượng và nội dung trên website thuộc quyền của WINDUCA/VinaKIN Group. Vui lòng không sao chép khi chưa được phép.</p>

      <h2>6. Giới hạn trách nhiệm</h2>
      <p>
        Chúng tôi cố gắng giữ nội dung chính xác và cập nhật nhưng không đảm bảo website không có sai sót hay gián đoạn.
      </p>

      <h2>7. Thay đổi</h2>
      <p>Điều khoản có thể được cập nhật. Phiên bản mới có hiệu lực kể từ ngày đăng trên website.</p>
    </ChinhSach>
  );
}
