import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hợp tác đối tác | WINDUCA",
  description: "Trở thành đối tác của WINDUCA: đại lý, nhà thầu, kiến trúc sư và công ty thiết kế.",
};

const DOI_TAC = [
  { so: "01", t: "Đại lý và nhà phân phối", m: "Đồng hành cùng đội ngũ WINDUCA để đưa hệ cửa nhôm cầu cách nhiệt đến công trình trong khu vực của bạn." },
  { so: "02", t: "Nhà thầu và đơn vị thi công", m: "Gửi bản vẽ, nhận bóc tách và hỗ trợ kỹ thuật từ đội ngũ WINDUCA." },
  { so: "03", t: "Kiến trúc sư và công ty thiết kế", m: "Tài liệu kỹ thuật, mặt cắt và tư vấn theo bản vẽ cho từng công trình." },
];

const VUNG = ["Miền Bắc", "Miền Trung", "Miền Nam"];

export default function HopTac() {
  return (
    <>
      <PageHero
        nhan="Hợp tác"
        tieuDe="Trở thành đối tác của WINDUCA"
        moTa="Chúng tôi làm việc cùng đại lý, nhà thầu, kiến trúc sư và công ty thiết kế. Để lại thông tin, đội ngũ sẽ liên hệ trao đổi hình thức hợp tác phù hợp."
      />

      <Section tone="sang" nhan="Dành cho ai" tieuDe="Ba nhóm đối tác của WINDUCA">
        <ul className="grid gap-px overflow-hidden rounded-[24px] bg-inox/70 md:grid-cols-3 md:rounded-[32px]">
          {DOI_TAC.map((d) => (
            <li key={d.so} className="bg-white p-8 md:p-10">
              <span className="text-5xl font-bold text-accent md:text-6xl">{d.so}</span>
              <h3 className="mt-6 text-xl font-bold">{d.t}</h3>
              <p className="mt-2 text-sm text-than-chi/75">{d.m}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="nga" nhan="Văn phòng khu vực" tieuDe="Gần công trình của bạn">
        <ul className="grid gap-5 md:grid-cols-3">
          {VUNG.map((v) => (
            <li key={v} className="rounded-[24px] bg-white p-7 md:rounded-[32px]">
              <p className="nhan-muc text-accent">{v}</p>
              <p className="mt-4 text-sm text-than-chi/75">Địa chỉ: [CHỜ XÁC NHẬN]</p>
              <p className="mt-1 text-sm text-than-chi/75">Điện thoại: [CHỜ XÁC NHẬN]</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sang" id="dang-ky-hop-tac" nhan="Đăng ký hợp tác" tieuDe="Để lại thông tin, chúng tôi liên hệ lại.">
        <div className="max-w-4xl">
          <LeadForm loai="lien-he" tone="sang" />
        </div>
      </Section>
    </>
  );
}
