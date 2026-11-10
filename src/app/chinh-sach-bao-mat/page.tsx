import type { Metadata } from "next";
import Link from "next/link";
import { ChinhSach } from "@/components/ChinhSach";
import { DIA_CHI, EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Chính sách bảo mật | WINDUCA" };

export default function ChinhSachBaoMat() {
  return (
    <ChinhSach tieuDe="Chính sách bảo mật" capNhat="09/11/2026 (bản nháp)">
      <p>
        Chính sách này giải thích chúng tôi thu thập, sử dụng và bảo vệ thông tin
        cá nhân của anh chị khi sử dụng website winduca.com, theo quy định về bảo vệ dữ liệu cá nhân của Việt Nam (Nghị định
        13/2023/NĐ-CP).
      </p>

      <h2>1. Thông tin chúng tôi thu thập</h2>
      <ul>
        <li>Họ tên, số điện thoại/Zalo, email (không bắt buộc), tỉnh/thành (không bắt buộc).</li>
        <li>Thông tin về công trình: loại công trình, kiểu cửa quan tâm, ghi chú anh chị cung cấp.</li>
        <li>Với lịch trải nghiệm: ngày, buổi và số người mong muốn.</li>
        <li>Bản vẽ và tệp anh chị tự nguyện gửi để được tư vấn.</li>
      </ul>
      <p>Chúng tôi không hỏi ngân sách và không thu địa chỉ nhận hộp mẫu trên website; chuyên viên sẽ hỏi qua điện thoại.</p>

      <h2>2. Mục đích sử dụng</h2>
      <ul>
        <li>Liên hệ xác nhận đăng ký hộp mẫu, lịch trải nghiệm showroom, yêu cầu tư vấn hoặc tài liệu.</li>
        <li>Tư vấn và bóc tách theo bản vẽ của công trình.</li>
        <li>Cải thiện website, chỉ khi anh chị đồng ý cookie đo lường.</li>
      </ul>
      <p>Chúng tôi không bán thông tin của anh chị cho bên thứ ba.</p>

      <h2>3. Nơi lưu trữ và thời hạn</h2>
      <p>
        Website không lưu thông tin liên hệ của anh chị trên máy chủ web. Thông tin được chuyển tiếp và lưu trong hệ thống nội
        bộ của WINDUCA có mã hóa, chỉ nhân sự được phân quyền mới truy cập. Thời hạn lưu: 12 tháng kể từ lần liên hệ cuối.
        Bản vẽ gửi để tư vấn được lưu 30 ngày rồi xóa; anh chị có thể yêu cầu xóa sớm.
      </p>

      <h2>4. Quyền của anh chị</h2>
      <p>
        Anh chị có quyền biết, truy cập, chỉnh sửa, yêu cầu xóa dữ liệu và rút lại sự đồng ý bất cứ lúc nào. Vui lòng gửi yêu
        cầu tới đầu mối xử lý dữ liệu cá nhân của chúng tôi: [CHỖ TRỐNG] (họ tên, email).
      </p>

      <h2>5. Cookie</h2>
      <p>
        Chúng tôi chỉ dùng cookie cần thiết mặc định. Cookie đo lường và bản đồ chỉ hoạt động khi anh chị đồng ý. Xem{" "}
        <Link href="/chinh-sach-cookie" className="underline">
          Chính sách cookie
        </Link>
        .
      </p>

      <h2>6. Thông tin liên hệ</h2>
      <p>
        WINDUCA — [CHỖ TRỐNG] tên pháp nhân, mã số thuế. Địa chỉ: {DIA_CHI}. Hotline: 0947 686 668. Email: {EMAIL}.
      </p>
    </ChinhSach>
  );
}
