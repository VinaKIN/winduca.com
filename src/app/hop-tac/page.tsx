import type { Metadata } from "next";
import { ChonNhomDoiTac } from "@/components/DoiTacTuongTac";
import { Hien } from "@/components/HieuUng";
import { TieuDeTrang } from "@/components/TrangMau";
import { Wrap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hợp tác đối tác | WINDUCA",
  description: "Trở thành đối tác của WINDUCA: đại lý, nhà thầu, kiến trúc sư và công ty thiết kế.",
};

/**
 * Trang Đối tác (11/11/2026, bổ sung 12/11/2026): ba nhóm đối tác, lý do hợp tác, lộ trình bốn bước dạng đường thời gian,
 * câu hỏi thường gặp, khu vực phụ trách (chưa có địa chỉ nên chỉ ghi "đang mở rộng"). Nội dung chỉ nêu nguyên tắc,
 * KHÔNG có số liệu, điều kiện hay cam kết chưa xác nhận. Form đăng ký nằm ở chân trang (#dang-ky-tham-quan).
 */
const LY_DO = [
  { t: "Một đầu mối kỹ thuật", m: "Mỗi đối tác có một đầu mối trao đổi, từ chọn hệ cửa, đọc bản vẽ đến xử lý phát sinh tại công trình." },
  { t: "Tài liệu và hộp mẫu", m: "Hộp mẫu góc nhôm, tài liệu kỹ thuật và hình ảnh để giới thiệu giải pháp với khách hàng của bạn." },
  { t: "Đào tạo sản phẩm", m: "Buổi giới thiệu về hệ cửa, cách mở và cách tư vấn lựa chọn theo từng loại công trình." },
  { t: "Phối hợp trên công trình", m: "Cùng khảo sát, bóc tách và triển khai để công trình đúng bản vẽ và đúng tiến độ đã trao đổi." },
];

const LO_TRINH = [
  { t: "Đăng ký", m: "Để lại thông tin và chọn nhóm hợp tác của bạn." },
  { t: "Trao đổi", m: "Chuyên viên liên hệ để hiểu nhu cầu và khu vực hoạt động." },
  { t: "Làm quen sản phẩm", m: "Nhận hộp mẫu, tài liệu và buổi giới thiệu giải pháp." },
  { t: "Cùng triển khai", m: "Phối hợp trên công trình thực tế với một đầu mối hỗ trợ." },
];

const HOI_DAP = [
  { h: "Ai có thể đăng ký làm đối tác?", d: "Đại lý và nhà phân phối, nhà thầu và đơn vị thi công, kiến trúc sư và công ty thiết kế. Chưa chắc thuộc nhóm nào vẫn có thể để lại thông tin để được tư vấn." },
  { h: "Sau khi đăng ký thì chuyện gì xảy ra?", d: "Chuyên viên liên hệ trong giờ làm việc để hiểu nhu cầu và khu vực của bạn, sau đó đề xuất hình thức hợp tác và tài liệu phù hợp." },
  { h: "Có điều kiện hay yêu cầu tối thiểu nào không?", d: "Điều kiện cụ thể tùy nhóm đối tác và khu vực. Chuyên viên sẽ trao đổi trực tiếp; trang này không công bố điều kiện chưa được xác nhận." },
  { h: "Tôi nhận được hỗ trợ gì khi đã là đối tác?", d: "Đầu mối kỹ thuật, tài liệu, hộp mẫu và buổi giới thiệu sản phẩm. Phạm vi chi tiết được thống nhất theo từng nhóm." },
  { h: "WINDUCA có hỏi ngân sách của tôi không?", d: "Không. Chúng tôi không hỏi ngân sách và không đăng giá trên website." },
];

const KHU_VUC = ["Miền Bắc", "Miền Trung", "Miền Nam"];

function Dau({ tieuDe, moTa }: { tieuDe: React.ReactNode; moTa?: string }) {
  return (
    <Hien>
      <h2 className="text-[1.6rem] font-bold leading-tight md:text-[1.9rem]">{tieuDe}</h2>
      <hr className="mt-4 border-0 border-t border-than-chi/70" />
      {moTa && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-than-chi/75">{moTa}</p>}
    </Hien>
  );
}

export default function HopTac() {
  return (
    <>
      <TieuDeTrang tieuDe="Trở thành đối tác của WINDUCA" moTa="Chúng tôi làm việc cùng đại lý, nhà thầu, kiến trúc sư và công ty thiết kế. Để lại thông tin, đội ngũ sẽ liên hệ trao đổi." />

      <section className="luoi-ban-ve nen-sang py-14 md:py-20">
        <Wrap>
          <Dau tieuDe="Ba nhóm đối tác của WINDUCA" />
          <Hien tre={100} className="mt-6">
            <ChonNhomDoiTac />
          </Hien>
        </Wrap>
      </section>

      <section className="nen-nga py-14 md:py-20">
        <Wrap>
          <Dau tieuDe="Vì sao hợp tác với WINDUCA" moTa="Bốn điều đối tác nhận được khi làm việc cùng chúng tôi." />
          <ul className="mt-8 grid gap-px overflow-hidden border border-than-chi/15 bg-than-chi/15 sm:grid-cols-2 lg:grid-cols-4">
            {LY_DO.map((x, i) => (
              <Hien key={x.t} as="li" tre={i * 90} className="bg-white p-6">
                <span className="text-[13px] font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-[17px] font-bold leading-snug">{x.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-than-chi/75">{x.m}</p>
              </Hien>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="bg-white py-14 md:py-20">
        <Wrap>
          <Dau tieuDe="Bốn bước từ đăng ký đến triển khai" />
          <ol className="relative mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
            <div className="absolute left-0 right-0 top-[0.62rem] hidden h-px bg-than-chi/25 md:block" aria-hidden="true" />
            {LO_TRINH.map((x, i) => (
              <Hien key={x.t} as="li" tre={i * 100} className="relative">
                <span className="relative z-10 mb-4 block h-[1.25rem] w-[1.25rem] rounded-full border border-accent bg-white after:absolute after:inset-[4px] after:rounded-full after:bg-accent" aria-hidden="true" />
                <span className="text-[13px] font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-[17px] font-bold">{x.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-than-chi/75">{x.m}</p>
              </Hien>
            ))}
          </ol>
        </Wrap>
      </section>

      <section className="nen-nga py-14 md:py-20">
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
            <Hien>
              <h2 className="text-[1.6rem] font-bold leading-tight md:text-[1.9rem]">Câu hỏi thường gặp</h2>
              <hr className="mt-4 border-0 border-t border-than-chi/70" />
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-than-chi/75">Những điều đối tác tiềm năng hay hỏi. Cần biết thêm, để lại thông tin ở cuối trang.</p>
            </Hien>
            <Hien tre={100}>
              <div className="border-t border-than-chi/25">
                {HOI_DAP.map((f) => (
                  <details key={f.h} className="group border-b border-than-chi/15">
                    <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.05rem] font-bold leading-snug marker:hidden [&::-webkit-details-marker]:hidden">
                      {f.h}
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-than-chi/30 text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-than-chi/80">{f.d}</p>
                  </details>
                ))}
              </div>
            </Hien>
          </div>
        </Wrap>
      </section>

      <section className="bg-white py-14 md:py-20">
        <Wrap>
          <Dau tieuDe="Khu vực phụ trách" moTa="Chúng tôi đang mở rộng mạng lưới đối tác theo ba miền. Để lại thông tin để biết khu vực của bạn đã có đầu mối hỗ trợ chưa." />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {KHU_VUC.map((v, i) => (
              <Hien key={v} as="li" tre={i * 90} className="flex items-center justify-between gap-4 rounded-[12px] border border-than-chi/15 px-6 py-5">
                <span className="text-[17px] font-bold">{v}</span>
                <span className="rounded-full border border-than-chi/20 px-3 py-1 text-[12px] text-than-chi/75">Đang mở rộng</span>
              </Hien>
            ))}
          </ul>
        </Wrap>
      </section>
    </>
  );
}
