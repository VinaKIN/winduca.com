import type { Metadata } from "next";
import { DangKyDoiTac, ChonNhomDoiTac } from "@/components/DoiTacTuongTac";
import { Hien, KeoNgang } from "@/components/HieuUng";
import { TieuDeTrang } from "@/components/TrangMau";
import { Wrap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hợp tác đối tác | WINDUCA",
  description: "Trở thành đối tác của WINDUCA: đại lý, nhà thầu, kiến trúc sư và công ty thiết kế.",
};

/** Trang Đối tác thiết kế lại (10/11/2026): chọn nhóm tương tác, lộ trình hợp tác, văn phòng khu vực, đăng ký liên kết nhóm. */
const LO_TRINH = [
  { t: "Đăng ký", m: "Để lại thông tin và chọn nhóm hợp tác của bạn." },
  { t: "Trao đổi", m: "Chuyên viên liên hệ để hiểu nhu cầu và khu vực hoạt động." },
  { t: "Làm quen sản phẩm", m: "Nhận hộp mẫu, tài liệu và buổi giới thiệu giải pháp." },
  { t: "Cùng triển khai", m: "Phối hợp trên công trình thực tế với một đầu mối hỗ trợ." },
];
const VUNG = ["Miền Bắc", "Miền Trung", "Miền Nam"];

function Dau({ tieuDe }: { so?: string; nhan?: string; tieuDe: React.ReactNode }) {
  return (
    <Hien>
      <h2 className="text-[1.6rem] font-bold leading-tight md:text-[1.9rem]">{tieuDe}</h2>
      <hr className="mt-4 border-0 border-t border-than-chi/70" />
    </Hien>
  );
}

export default function HopTac() {
  return (
    <>
      <TieuDeTrang tieuDe="Trở thành đối tác của WINDUCA" moTa="Chúng tôi làm việc cùng đại lý, nhà thầu, kiến trúc sư và công ty thiết kế. Để lại thông tin, đội ngũ sẽ liên hệ trao đổi." />

      {/* 01 · Ba nhóm đối tác */}
      <section className="luoi-ban-ve nen-sang khoi-doc">
        <Wrap>
          <Dau tieuDe="Ba nhóm đối tác của WINDUCA" />
          <Hien tre={100} className="mt-5">
            <ChonNhomDoiTac />
          </Hien>
        </Wrap>
      </section>

      {/* 02 · Lộ trình hợp tác */}
      <section className="nen-nga khoi-doc">
        <Wrap>
          <Dau tieuDe="Bốn bước từ đăng ký đến triển khai" />
          <div className="relative mt-6">
            <div className="absolute left-0 right-0 top-[1.6rem] hidden h-px bg-than-chi/20 lg:block" aria-hidden="true" />
            <KeoNgang>
              {LO_TRINH.map((x, i) => (
                <Hien key={x.t} tre={i * 120} className="relative w-[70%] shrink-0 snap-start sm:w-[40%] lg:w-[calc((100%-3rem)/4)]">
                  <span className="relative z-10 flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full border border-accent bg-nga text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{x.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-than-chi/70">{x.m}</p>
                </Hien>
              ))}
            </KeoNgang>
          </div>
        </Wrap>
      </section>

      {/* 03 · Văn phòng khu vực */}
      <section className="luoi-ban-ve nen-sang khoi-doc">
        <Wrap>
          <Dau tieuDe="Văn phòng khu vực" />
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {VUNG.map((v, i) => (
              <Hien key={v} as="li" tre={i * 100} className="dau-goc rounded-[6px] border border-than-chi/10 bg-white p-6">
                <p className="text-[17px] font-bold">{v}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-than-chi/75">Địa chỉ: [CHỜ XÁC NHẬN]</p>
                <p className="mt-1 text-[15px] leading-relaxed text-than-chi/75">Điện thoại: [CHỜ XÁC NHẬN]</p>
              </Hien>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* 04 · Đăng ký */}
      <section id="dang-ky-hop-tac" className="relative overflow-hidden nen-toi khoi-doc-gon text-white">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <Hien>
            <DangKyDoiTac />
          </Hien>
        </Wrap>
      </section>
    </>
  );
}
