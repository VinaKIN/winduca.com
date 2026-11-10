import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, Section } from "@/components/ui";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Hợp tác đối tác | WINDUCA",
  description: "Trở thành đối tác của WINDUCA: đại lý, nhà thầu, kiến trúc sư và công ty thiết kế.",
};

const ANH_DT: Record<string, string> = {
  dealer: "/images/people/partner-dealer.webp",
  contractor: "/images/people/partner-contractor.webp",
  architect: "/images/people/partner-architect.webp",
};

const DOI_TAC = [
  {
    id: "dealer",
    en: "Dealer Partnership",
    t: "Đại lý và nhà phân phối",
    m: "Đồng hành cùng đội ngũ WINDUCA để đưa giải pháp cửa nhôm kính đến công trình trong khu vực của bạn.",
    quyenLoi: ["Trao đổi chương trình hợp tác phân phối theo khu vực", "Đào tạo sản phẩm và kỹ năng tư vấn", "Hỗ trợ trưng bày mẫu vật"],
    kyThuat: ["Tư vấn kỹ thuật theo từng công trình", "Phối hợp xử lý yêu cầu của khách hàng"],
    taiLieu: ["Catalog sản phẩm (đang hoàn thiện)", "Tài liệu bán hàng (đang hoàn thiện)"],
  },
  {
    id: "contractor",
    en: "Contractor Partnership",
    t: "Nhà thầu và đơn vị thi công",
    m: "Gửi bản vẽ, nhận bóc tách và hỗ trợ kỹ thuật từ đội ngũ WINDUCA trong suốt quá trình thi công.",
    quyenLoi: ["Bóc tách khối lượng theo bản vẽ", "Phối hợp tiến độ thi công", "Một đầu mối làm việc xuyên suốt"],
    kyThuat: ["Hỗ trợ kỹ thuật tại công trình", "Hướng dẫn lắp đặt (đang hoàn thiện)"],
    taiLieu: ["Hồ sơ kỹ thuật PDF (đang hoàn thiện)", "Mặt cắt DWG (đang hoàn thiện)"],
  },
  {
    id: "architect",
    en: "Architect Partnership",
    t: "Kiến trúc sư và công ty thiết kế",
    m: "Tài liệu kỹ thuật, mặt cắt và tư vấn chi tiết theo bản vẽ cho từng công trình.",
    quyenLoi: ["Tư vấn chi tiết theo bản vẽ", "Mẫu vật để chạm thử vật liệu", "Trao đổi trực tiếp với đội kỹ thuật"],
    kyThuat: ["Đề xuất chi tiết tham khảo cho hồ sơ thiết kế", "Gợi ý hệ cửa theo loại công trình"],
    taiLieu: ["Thư viện BIM, DWG (đang hoàn thiện)", "Bảng màu vật liệu"],
  },
];

const VUNG = ["Miền Bắc", "Miền Trung", "Miền Nam"];

export default function HopTac() {
  return (
    <>
      <PageHero
        anh="/images/thao-luan-mat-bang.jpg"
        nhan="Hợp tác"
        tieuDe="Trở thành đối tác của WINDUCA"
        moTa="Chúng tôi làm việc cùng đại lý, nhà thầu, kiến trúc sư và công ty thiết kế. Để lại thông tin, đội ngũ sẽ liên hệ trao đổi hình thức hợp tác phù hợp."
      />

      <Section tone="sang" nhan="Hệ sinh thái đối tác" tieuDe="Ba nhóm đối tác của WINDUCA">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
          {DOI_TAC.map((d, i) => (
            <article key={d.id} id={d.id} className="flex w-[85%] shrink-0 snap-center flex-col gap-4 rounded-[24px] border border-than-chi/10 bg-white p-6 lg:w-auto">
              <div className="relative -mx-6 -mt-6 h-[18svh] min-h-[120px] overflow-hidden rounded-t-[24px] bg-than-chi lg:h-[20svh]">
                <Image src={asset(ANH_DT[d.id])} alt={d.t} fill quality={60} sizes="(min-width: 1024px) 30vw, 85vw" className="object-cover" />
              </div>
              <div>
                <span className="text-4xl font-light text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="nhan-muc mt-4 text-than-chi/55">{d.en}</p>
                <h3 className="mt-1 text-xl font-bold">{d.t}</h3>
                <p className="mt-3 text-sm text-than-chi/75">{d.m}</p>
                <a href="#dang-ky-hop-tac" className="nut nut-chinh mt-4">
                  Đăng ký hợp tác
                </a>
              </div>
              <div className="grid gap-4">
                {[
                  ["Quyền lợi", d.quyenLoi],
                  ["Hỗ trợ kỹ thuật", d.kyThuat],
                  ["Tài liệu", d.taiLieu],
                ].map(([tt, ds]) => (
                  <div key={tt as string}>
                    <p className="nhan-muc text-accent">{tt as string}</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-than-chi/80">
                      {(ds as string[]).map((x) => (
                        <li key={x} className="flex items-start gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
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
