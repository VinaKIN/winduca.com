import type { Metadata } from "next";
import { DangKyDoiTac, ChonNhomDoiTac } from "@/components/DoiTacTuongTac";
import { Hien, KeoNgang, NutHut } from "@/components/HieuUng";
import { PageHero, Wrap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hợp tác đối tác | WINDUCA",
  description: "Trở thành đối tác của WINDUCA: đại lý, nhà thầu, kiến trúc sư và công ty thiết kế.",
};

/** Trang Đối tác thiết kế lại (10/11/2026): chọn nhóm tương tác, lộ trình hợp tác, văn phòng khu vực, đăng ký liên kết nhóm. */
const STROKE = "![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]";
const LO_TRINH = [
  { t: "Đăng ký", m: "Để lại thông tin và chọn nhóm hợp tác của bạn." },
  { t: "Trao đổi", m: "Chuyên viên liên hệ để hiểu nhu cầu và khu vực hoạt động." },
  { t: "Làm quen sản phẩm", m: "Nhận hộp mẫu, tài liệu và buổi giới thiệu giải pháp." },
  { t: "Cùng triển khai", m: "Phối hợp trên công trình thực tế với một đầu mối hỗ trợ." },
];
const VUNG = ["Miền Bắc", "Miền Trung", "Miền Nam"];

function Dau({ so, nhan, tieuDe }: { so: string; nhan: string; tieuDe: React.ReactNode }) {
  return (
    <Hien>
      <div className="flex items-end gap-4">
        <span className={`so-lon !text-[clamp(3.5rem,7vw,6rem)] leading-[0.85] ${STROKE}`} aria-hidden="true">
          {so}
        </span>
        <p className="nhan-muc pb-2 text-accent">{nhan}</p>
      </div>
      <h2 className="mt-4 max-w-3xl text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">{tieuDe}</h2>
    </Hien>
  );
}

export default function HopTac() {
  return (
    <>
      <PageHero
        congNghe
        anh="/images/thao-luan-mat-bang.jpg"
        nhan="Đối tác"
        tieuDe="Trở thành đối tác của WINDUCA"
        moTa="Chúng tôi làm việc cùng đại lý, nhà thầu, kiến trúc sư và công ty thiết kế. Để lại thông tin, đội ngũ sẽ liên hệ trao đổi."
      >
        <NutHut href="#dang-ky-hop-tac" className="nut nut-chinh">
          Đăng ký hợp tác
        </NutHut>
        <NutHut href="/danh-cho-kts" className="nut nut-vien">
          Thư viện cho kiến trúc sư
        </NutHut>
      </PageHero>

      {/* 01 · Ba nhóm đối tác */}
      <section className="luoi-ban-ve bg-white py-10 md:py-14">
        <Wrap>
          <Dau so="01" nhan="Hệ sinh thái đối tác" tieuDe={<>Ba nhóm đối tác <span className="font-bold">của WINDUCA</span></>} />
          <Hien tre={100} className="mt-5">
            <ChonNhomDoiTac />
          </Hien>
        </Wrap>
      </section>

      {/* 02 · Lộ trình hợp tác */}
      <section className="bg-nga py-10 md:py-14">
        <Wrap>
          <Dau so="02" nhan="Lộ trình hợp tác" tieuDe={<>Bốn bước <span className="font-bold">từ đăng ký đến triển khai</span></>} />
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
      <section className="luoi-ban-ve bg-white py-10 md:py-14">
        <Wrap>
          <Dau so="03" nhan="Văn phòng khu vực" tieuDe={<>Gần công trình <span className="font-bold">của bạn</span></>} />
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {VUNG.map((v, i) => (
              <Hien key={v} as="li" tre={i * 100} className="dau-goc rounded-[6px] border border-than-chi/10 bg-white p-6">
                <p className="nhan-muc text-accent">{v}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-than-chi/75">Địa chỉ: [CHỜ XÁC NHẬN]</p>
                <p className="mt-1 text-[15px] leading-relaxed text-than-chi/75">Điện thoại: [CHỜ XÁC NHẬN]</p>
              </Hien>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* 04 · Đăng ký */}
      <section id="dang-ky-hop-tac" className="relative overflow-hidden bg-than-chi py-8 text-white md:py-10">
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
