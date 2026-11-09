import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { MatCat2D } from "@/components/Illustration";
import { SaoChep } from "@/components/SaoChep";
import { ThuVienKts } from "@/components/ThuVienKts";
import { Faq } from "@/components/Faq";
import { PageHero, Section } from "@/components/ui";
import { KIEU_CUA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dành cho kiến trúc sư | Thư viện kỹ thuật WINDUCA",
  description: "Thư viện kỹ thuật, mô tả kỹ thuật mẫu và tư vấn chi tiết theo bản vẽ dành cho kiến trúc sư và nhà thiết kế.",
};

/** Mô tả kỹ thuật mẫu: CHỈ định tính. Số liệu chỉ thêm khi có phiếu kiểm định. */
function moTaKyThuat(ten: string, cachMo: string): string {
  return [
    `${ten} — hệ nhôm cầu cách nhiệt tiêu chuẩn châu Âu, thương hiệu WINDUCA.`,
    `Cách mở: ${cachMo.toLowerCase()}.`,
    "Khung nhôm gồm hai nửa liên kết bằng thanh cầu cách nhiệt polyamide.",
    "Bề mặt hoàn thiện: anode hóa hoặc sơn tĩnh điện, màu theo chỉ định của chủ đầu tư.",
    "Kính hộp, gioăng EPDM ôm sát khung và kính.",
    "Phụ kiện đồng bộ màu và đường nét với khung cửa; tay nắm khắc chữ WINDUCA.",
    "Gia công chính xác theo bản vẽ kiến trúc tại xưởng WINDUCA; lắp đặt tại công trình.",
    "Thông số kỹ thuật (hệ số truyền nhiệt, độ kín, tải gió): theo kết quả kiểm định khi có xác nhận.",
  ].join("\n");
}

const FAQ_KTS = [
  {
    q: "Tôi có thể tải tệp DWG ngay không?",
    a: "Các tệp DWG, BIM và catalog đang được hoàn thiện cùng đội kỹ thuật. Anh chị đăng ký ở mục Thư viện để được báo khi có tệp.",
  },
  {
    q: "WINDUCA hỗ trợ kiến trúc sư những gì?",
    a: "Quyền lợi dành cho kiến trúc sư là tài liệu kỹ thuật, hỗ trợ kỹ thuật theo bản vẽ và mẫu vật để chạm thử.",
  },
  {
    q: "Bản vẽ của tôi được xử lý thế nào?",
    a: "Bản vẽ chỉ dùng để tư vấn cho đúng công trình đó, không chia sẻ cho bên thứ ba, được xóa sau 30 ngày. Anh chị có thể yêu cầu xóa sớm.",
  },
  {
    q: "Chi tiết WINDUCA đề xuất có thay thế thiết kế của tôi không?",
    a: "Không. Đó là chi tiết và giải pháp tham khảo. Kiến trúc sư chịu trách nhiệm thiết kế cuối cùng của công trình.",
  },
];

export default function DanhChoKts() {
  return (
    <>
      <PageHero
        nhan="Kiến trúc sư & nhà thiết kế"
        tieuDe="Tài liệu kỹ thuật, sẵn sàng cho bản vẽ của bạn."
        moTa="Thư viện mặt cắt, mô hình BIM, hồ sơ kỹ thuật và tư vấn chi tiết theo bản vẽ cho từng kiểu cửa."
      >
        <a href="#thu-vien" className="nut nut-chinh">
          Tải thư viện kỹ thuật
        </a>
        <a href="#tu-van" className="nut nut-vien">
          Gửi bản vẽ để tư vấn
        </a>
      </PageHero>

      <Section id="thu-vien" tone="toi" nhan="Thư viện kỹ thuật" tieuDe="DWG · PDF · BIM" moTa="Các tệp đang được hoàn thiện. Đăng ký để được báo khi có tệp.">
        <ThuVienKts />
        <div className="mt-14 max-w-3xl border-t border-inox/20 pt-10">
          <h3 className="tieu-de text-xl">Đăng ký nhận tài liệu</h3>
          <div className="mt-6">
            <LeadForm loai="tai-lieu" tone="toi" />
          </div>
        </div>
      </Section>

      <Section tone="sang" nhan="Xem trước mặt cắt 2D" tieuDe="Mặt cắt nét mảnh, có đường kích thước." moTa="Đây là hình minh họa. Giá trị kích thước sẽ hiển thị khi có bản vẽ kỹ thuật được xác nhận.">
        <MatCat2D className="mx-auto aspect-[4/3] max-w-3xl" />
      </Section>

      <Section tone="toi" nhan="Mô tả kỹ thuật mẫu" tieuDe="Mô tả để dán vào thuyết minh hoặc hồ sơ mời thầu." moTa="Văn bản định tính, chưa có số liệu kỹ thuật. Số liệu sẽ được bổ sung cùng nguồn kiểm định.">
        <div className="grid gap-6 lg:grid-cols-2">
          {KIEU_CUA.map((k) => {
            const nd = moTaKyThuat(k.ten, k.cachMo);
            return (
              <article key={k.slug} className="border border-inox/25 p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="tieu-de text-lg">{k.ten}</h3>
                  <SaoChep noiDung={nd} />
                </div>
                <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-nga/85">{nd}</pre>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="tu-van" tone="sang" nhan="Tư vấn chi tiết theo bản vẽ" tieuDe="Gửi bản vẽ, nhận đề xuất giải pháp và chi tiết.">
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            ["Gửi bản vẽ", "PDF, DWG, JPG hoặc PNG, tối đa 30MB."],
            ["Đội kỹ thuật đề xuất", "Giải pháp và chi tiết tham khảo theo bản vẽ."],
            ["Trao đổi, hoàn thiện", "Qua điện thoại, Zalo, email hoặc họp online."],
          ].map(([t, m], i) => (
            <li key={t} className="border-t border-champagne pt-6">
              <span className="nhan-muc text-than-chi/60">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="tieu-de mt-3 text-lg">{t}</h3>
              <p className="mt-2 text-sm text-than-chi/80">{m}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-sm text-than-chi/70">
          Chi tiết WINDUCA đề xuất mang tính tham khảo; kiến trúc sư chịu trách nhiệm thiết kế cuối cùng.
        </p>
      </Section>

      <Section tone="toi" tieuDe="Gửi bản vẽ để tư vấn" moTa="Chúng tôi không hỏi ngân sách.">
        <LeadForm loai="ban-ve" tone="toi" />
      </Section>

      <Section tone="sang" nhan="Trao đổi trực tiếp" tieuDe="Đặt lịch trao đổi 1-1 hoặc đưa khách đến showroom.">
        <p className="max-w-2xl text-than-chi/80">
          Anh chị có thể đặt lịch trao đổi trực tuyến hoặc tại showroom.{" "}
          <Link href="/trai-nghiem#showroom" className="underline">
            Đặt lịch
          </Link>
          , và ghi chú “Đặt lịch cho khách của tôi” nếu anh chị muốn dẫn khách đến xem.
        </p>
      </Section>

      <Section tone="sang" nhan="Câu hỏi" tieuDe="Câu hỏi thường gặp" className="border-t border-than-chi/10">
        <Faq muc={FAQ_KTS} />
      </Section>
    </>
  );
}
