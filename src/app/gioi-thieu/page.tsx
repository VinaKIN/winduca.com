import type { Metadata } from "next";
import { CrossSection } from "@/components/CrossSection";
import { GiaiPhapDongBo } from "@/components/GiaiPhapDongBo";
import { Hien, KeoNgang, NutHut } from "@/components/HieuUng";
import { KhungAnhChong } from "@/components/KhungAnh";
import { NenAnh } from "@/components/NenAnh";
import { DoiTacKhoi } from "@/components/TrangChuKhoi";
import { PageHero, Wrap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Giới thiệu | WINDUCA",
  description: "WINDUCA: giải pháp cửa nhôm kính kiến trúc cao cấp, đồng bộ từ hệ nhôm, kính, phụ kiện đến thi công hoàn thiện.",
};

/**
 * Trang Giới thiệu thiết kế lại (10/11/2026): hero parallax + lưới bản vẽ, dấu góc khung, số thứ tự lớn,
 * hiện dần khi cuộn, danh sách kéo chuốt ngang, nút hút nhẹ. "Team & Expertise" chưa có tư liệu nên chưa dựng.
 * Nội dung Brand Story, Vision & Values, Quality Process là BẢN NHÁP chờ anh Huy duyệt.
 */
const GIA_TRI = [
  { t: "Tầm nhìn", m: "Trở thành đối tác giải pháp cửa nhôm kính kiến trúc đáng tin cậy của chủ nhà, kiến trúc sư và nhà thầu." },
  { t: "Sứ mệnh", m: "Mang đến giải pháp cửa đồng bộ, đúng bản vẽ, từ tư vấn đến thi công và hậu mãi." },
  { t: "Giá trị", m: "Chính xác trong từng chi tiết. Đồng bộ từ hệ nhôm đến thi công. Minh bạch trong thông tin." },
];

const QUY_TRINH = [
  { t: "Kiểm tra bản vẽ", m: "Rà soát bản vẽ và yêu cầu kiến trúc trước khi bóc tách." },
  { t: "Kiểm tra vật tư", m: "Đối chiếu hệ nhôm, kính và phụ kiện với đề xuất." },
  { t: "Kiểm soát gia công", m: "Gia công theo bản vẽ và kiểm tra trước khi xuất xưởng." },
  { t: "Nghiệm thu", m: "Kiểm tra vận hành và hoàn thiện tại công trình." },
];

function NhanSo({ so, nhan }: { so: string; nhan: string }) {
  return (
    <div className="flex items-end gap-4">
      <span className="so-lon !text-[clamp(3.5rem,7vw,6rem)] leading-[0.85] ![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]" aria-hidden="true">
        {so}
      </span>
      <p className="nhan-muc pb-2 text-accent">{nhan}</p>
    </div>
  );
}

export default function GioiThieu() {
  return (
    <>
      <PageHero
        congNghe
        nhan="Giới thiệu"
        tieuDe="WINDUCA – Premium Window & Door"
        moTa="Giải pháp cửa nhôm kính kiến trúc cao cấp, đồng bộ từ hệ nhôm, kính, phụ kiện đến thi công hoàn thiện."
        anh="/images/khung-cua-nhom-xem.jpg"
      />

      {/* 01 · Câu chuyện thương hiệu */}
      <section className="luoi-ban-ve-toi nen-toi py-7 text-white">
        <Wrap>
          <Hien>
            <NhanSo so="01" nhan="Câu chuyện thương hiệu" />
            <h2 className="mt-4 max-w-3xl text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">
              Cánh cửa là một phần của <span className="font-bold">kiến trúc.</span>
            </h2>
          </Hien>
          <div className="mt-6 grid items-center gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <Hien tre={100}>
              <KhungAnhChong
                vienToi
                chinh={{ src: "/images/mau-khung-nhom-den.jpg", alt: "Chi tiết khung cửa nhôm", chuThich: "Khung nhôm cầu cách nhiệt", so: "FIG. 01", diem: { x: "58%", y: "42%", nhan: "Thanh cầu cách nhiệt" } }}
                phu={{ src: "/images/mat-cat-khung-cua.jpg", alt: "Mặt cắt khung cửa nhôm" }}
              />
            </Hien>
            <Hien tre={200} className="space-y-4">
              <p className="text-lg text-white/90">
                WINDUCA theo đuổi cửa nhôm kính như một thành phần của kiến trúc: đường nét mảnh, khẩu độ lớn, vận hành êm và đồng bộ từ hệ nhôm đến thi công.
              </p>
              <p className="text-base text-white/70">
                Chúng tôi làm việc cùng chủ nhà, kiến trúc sư và nhà thầu để mỗi bộ cửa đúng với bản vẽ và đúng với không gian sống mà nó thuộc về.
              </p>
            </Hien>
          </div>
        </Wrap>
      </section>

      {/* 02 · Tầm nhìn & giá trị */}
      <NenAnh anh="/images/products/lift-slide.webp" viTri="center 40%">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Hien>
            <NhanSo so="02" nhan="Tầm nhìn & giá trị" />
            <h2 className="mt-4 text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">Điều chúng tôi theo đuổi</h2>
            <span className="gach-do mt-5" aria-hidden="true" />
            <p className="mt-5 max-w-md text-base font-light leading-relaxed text-white/75">
              Ba điều dẫn dắt cách WINDUCA làm việc với chủ nhà, kiến trúc sư và nhà thầu, từ bản vẽ đầu tiên đến ngày bàn giao.
            </p>
          </Hien>
          <ul className="space-y-4">
            {GIA_TRI.map((g, i) => (
              <Hien as="li" key={g.t} tre={i * 120} className="the-kinh flex items-start gap-5 p-5 md:p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/60 text-accent" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />}
                    {i === 1 && <path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z" />}
                    {i === 2 && <path d="m12 3 8 5v8l-8 5-8-5V8l8-5Zm0 0v18M4 8l8 5 8-5" />}
                  </svg>
                </span>
                <span>
                  <span className="text-xl font-light tracking-[-0.005em]">{g.t}</span>
                  <span className="mt-1.5 block text-[15px] leading-relaxed text-white/70">{g.m}</span>
                </span>
              </Hien>
            ))}
          </ul>
        </div>
      </NenAnh>

      {/* 03 · Cấu tạo và giải pháp đồng bộ */}
      <CrossSection nhan="03 · Cấu tạo" />
      <GiaiPhapDongBo />

      {/* 04 · Quy trình kiểm soát chất lượng */}
      <section className="luoi-ban-ve nen-sang py-7">
        <Wrap>
          <Hien>
            <NhanSo so="05" nhan="Quy trình kiểm soát chất lượng" />
            <h2 className="mt-4 text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">Bốn bước từ bản vẽ đến nghiệm thu</h2>
          </Hien>
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.4fr] lg:gap-10">
            <Hien tre={80}>
              <KhungAnhChong
                chinh={{ src: "/images/xuong/may-khoan-nhom.webp", alt: "Gia công thanh nhôm tại xưởng", chuThich: "Gia công tại xưởng", viTri: "55% 50%", so: "FIG. 02", diem: { x: "46%", y: "34%", nhan: "Đầu khoan, phay" } }}
                phu={{ src: "/images/xuong/tay-nghe-phu-kien.webp", alt: "Kiểm tra tay nắm", viTri: "center 35%" }}
              />
            </Hien>
            <div className="relative min-w-0">
              <div className="absolute left-0 right-0 top-[1.6rem] hidden h-px bg-than-chi/20 lg:block" aria-hidden="true" />
              <KeoNgang>
                {QUY_TRINH.map((x, i) => (
                  <Hien key={x.t} tre={i * 120} className="relative w-[70%] shrink-0 snap-start sm:w-[40%] lg:w-[calc((100%-3rem)/4)]">
                    <span className="relative z-10 flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full border border-accent bg-white text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-xl font-bold">{x.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-than-chi/70">{x.m}</p>
                  </Hien>
                ))}
              </KeoNgang>
              <p className="mt-3 text-xs text-than-chi/50 lg:hidden">Vuốt ngang để xem tiếp. Quy trình tham khảo, đội kỹ thuật sẽ xác nhận chi tiết.</p>
            </div>
          </div>
        </Wrap>
      </section>

      <DoiTacKhoi />

      {/* CTA */}
      <section className="relative overflow-hidden nen-toi py-7 text-white">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <Hien>
            <p className="nhan-muc text-accent">Kết nối với WINDUCA</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-[1.12] tracking-[-0.01em]">
              Cùng trao đổi về <span className="font-bold">công trình của bạn.</span>
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <NutHut href="/lien-he" className="nut nut-chinh">
                Liên hệ tư vấn
              </NutHut>
              <NutHut href="/giai-phap" className="nut nut-vien">
                Xem giải pháp theo công trình
              </NutHut>
            </div>
          </Hien>
        </Wrap>
      </section>
    </>
  );
}
