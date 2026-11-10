import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CrossSection } from "@/components/CrossSection";
import { GiaiPhapDongBo } from "@/components/GiaiPhapDongBo";
import { DoiTacKhoi } from "@/components/TrangChuKhoi";
import { PageHero, Section } from "@/components/ui";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Giới thiệu | WINDUCA",
  description: "WINDUCA: giải pháp cửa nhôm kính kiến trúc cao cấp, đồng bộ từ hệ nhôm, kính, phụ kiện đến thi công hoàn thiện.",
};

/**
 * Trang Giới thiệu theo đề xuất 10/11/2026 (mục 5.1): Brand Hero → Brand Story → Vision & Values → Engineering →
 * Integrated Solutions → Quality Process → Partner Network → CTA. "Team & Expertise" chưa có tư liệu nên chưa dựng.
 * Nội dung Brand Story, Vision & Values, Quality Process là BẢN NHÁP triết lý/quy trình chung, chờ anh Huy duyệt.
 */
const GIA_TRI = [
  { t: "Tầm nhìn", m: "Trở thành đối tác giải pháp cửa nhôm kính kiến trúc đáng tin cậy của chủ nhà, kiến trúc sư và nhà thầu." },
  { t: "Sứ mệnh", m: "Mang đến giải pháp cửa đồng bộ, đúng bản vẽ, từ tư vấn đến thi công và hậu mãi." },
  { t: "Giá trị", m: "Chính xác trong từng chi tiết. Đồng bộ từ hệ nhôm đến thi công. Minh bạch trong thông tin." },
];

const QUY_TRINH_CL = [
  { t: "Kiểm tra bản vẽ", m: "Rà soát bản vẽ và yêu cầu kiến trúc trước khi bóc tách." },
  { t: "Kiểm tra vật tư", m: "Đối chiếu hệ nhôm, kính và phụ kiện với đề xuất." },
  { t: "Kiểm soát gia công", m: "Gia công theo bản vẽ và kiểm tra trước khi xuất xưởng." },
  { t: "Nghiệm thu", m: "Kiểm tra vận hành và hoàn thiện tại công trình." },
];

export default function GioiThieu() {
  return (
    <>
      <PageHero
        nhan="Giới thiệu"
        tieuDe="WINDUCA – Premium Window & Door"
        moTa="Giải pháp cửa nhôm kính kiến trúc cao cấp, đồng bộ từ hệ nhôm, kính, phụ kiện đến thi công hoàn thiện."
        anh="/images/khung-cua-nhom-xem.jpg"
      />

      <Section tone="sang" nhan="Câu chuyện thương hiệu" tieuDe="Cánh cửa là một phần của kiến trúc.">
        <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div className="grid grid-cols-2 gap-3">
            {["/images/mau-khung-nhom-den.jpg", "/images/mat-cat-khung-cua.jpg"].map((s) => (
              <div key={s} className="relative h-[28svh] min-h-[160px] overflow-hidden rounded-[20px] bg-than-chi md:h-[clamp(220px,40svh,340px)]">
                <Image src={asset(s)} alt="Chi tiết khung cửa nhôm" fill quality={65} sizes="(min-width: 1024px) 30vw, 45vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
          <p className="text-lg text-than-chi/80">
            WINDUCA theo đuổi cửa nhôm kính như một thành phần của kiến trúc: đường nét mảnh, khẩu độ lớn, vận hành êm và đồng bộ từ hệ nhôm đến thi công.
          </p>
          <p className="text-base text-than-chi/70">
            Chúng tôi làm việc cùng chủ nhà, kiến trúc sư và nhà thầu để mỗi bộ cửa đúng với bản vẽ và đúng với không gian sống mà nó thuộc về.
          </p>
          </div>
        </div>
      </Section>

      <Section tone="nga" nhan="Tầm nhìn & giá trị" tieuDe="Điều chúng tôi theo đuổi">
        <ul className="grid gap-5 md:grid-cols-3">
          {GIA_TRI.map((g, i) => (
            <li key={g.t} className="rounded-[24px] bg-white p-7 md:p-8">
              <span className="text-4xl font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-bold">{g.t}</h3>
              <p className="mt-2 text-sm text-than-chi/75">{g.m}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CrossSection />
      <GiaiPhapDongBo />

      <Section tone="sang" nhan="Quy trình kiểm soát chất lượng" tieuDe="Bốn bước từ bản vẽ đến nghiệm thu" moTa="Quy trình tham khảo, sẽ được đội kỹ thuật xác nhận chi tiết.">
        <div className="mb-6 grid grid-cols-2 gap-3">
          {["/images/do-nhom-xuong.jpg", "/images/khoan-rap-chi-tiet.jpg"].map((s) => (
            <div key={s} className="relative h-[22svh] min-h-[140px] overflow-hidden rounded-[20px] bg-than-chi md:h-[clamp(160px,26svh,240px)]">
              <Image src={asset(s)} alt="Gia công chi tiết nhôm tại xưởng" fill quality={65} sizes="(min-width: 768px) 45vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
        <ol className="grid gap-6 md:grid-cols-4">
          {QUY_TRINH_CL.map((x, i) => (
            <li key={x.t} className="border-t-2 border-accent pt-4">
              <span className="text-3xl font-light text-than-chi/35">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold">{x.t}</h3>
              <p className="mt-2 text-sm text-than-chi/70">{x.m}</p>
            </li>
          ))}
        </ol>
      </Section>

      <DoiTacKhoi />

      <Section tone="toi" nhan="Kết nối với WINDUCA" tieuDe="Cùng trao đổi về công trình của bạn.">
        <div className="flex flex-wrap gap-3">
          <Link href="/lien-he" className="nut nut-chinh">
            Liên hệ tư vấn
          </Link>
          <Link href="/giai-phap" className="nut nut-vien">
            Xem giải pháp theo công trình
          </Link>
        </div>
      </Section>
    </>
  );
}
