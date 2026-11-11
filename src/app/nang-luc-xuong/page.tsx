import type { Metadata } from "next";
import Link from "next/link";
import { Hien } from "@/components/HieuUng";
import { KhungAnh, KhungAnhChong } from "@/components/KhungAnh";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Năng lực & Xưởng gia công | WINDUCA",
  description: "Xưởng gia công WINDUCA: từ bản vẽ đến bộ cửa hoàn chỉnh, gia công chính xác theo bản vẽ kiến trúc sư.",
};

// 7 bước (chốt 09/11/2026). Chỉ mô tả định tính; không số liệu, không thiết bị, không thời gian.
const BUOC = [
  ["Tiếp nhận bản vẽ", "Nhận bản vẽ kiến trúc và yêu cầu của công trình."],
  ["Bóc tách", "Đội kỹ thuật bóc tách theo bản vẽ và đề xuất giải pháp."],
  ["Cắt", "Cắt thanh nhôm theo kích thước đã bóc tách."],
  ["Gia công", "Gia công CNC/phay theo chi tiết từng bộ cửa."],
  ["Lắp ráp", "Ép góc, lắp ráp cánh, lắp kính và phụ kiện."],
  ["Kiểm tra", "Kiểm tra theo quy trình của xưởng trước khi giao."],
  ["Đóng gói & giao", "Bảo vệ bề mặt, dán dấu bảo hành và tem, giao đến công trình."],
];

const CONG_DOAN = [
  "Cắt và gia công CNC/phay",
  "Ép góc và lắp ráp cánh",
  "Lắp kính và phụ kiện",
  "Xử lý bề mặt: anode hóa, sơn tĩnh điện",
];

export default function NangLucXuong() {
  return (
    <>
      <PageHero
        anhPhai="/images/xuong/xuong-chan-dung.webp"
        viTriAnh="center 22%"
        chuThichAnh="Xưởng gia công WINDUCA"
        soAnh="FIG. 00"
        nhan="Xưởng gia công WINDUCA · Trung tâm sản xuất chính xác"
        tieuDe="Mỗi bộ cửa bắt đầu từ một bản vẽ."
        moTa="Gia công chính xác theo bản vẽ kiến trúc sư, rồi lắp đặt tại công trình."
      >
        <Link href="/danh-cho-kts#tu-van" className="nut nut-chinh">
          Gửi bản vẽ, nhận bóc tách
        </Link>
      </PageHero>

      <Section tone="sang" nhan="Từ bản vẽ đến bộ cửa" tieuDe="Bảy bước của một bộ cửa WINDUCA.">
        <ol className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {BUOC.map(([t, m], i) => (
            <li key={t} className="relative border-t border-accent pt-8">
              <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden="true" />
              <span className="nhan-muc text-than-chi/65">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="tieu-de mt-3 text-lg">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-than-chi/80">{m}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="toi" nhan="Công đoạn tại xưởng" tieuDe="Những gì được làm tại xưởng.">
        <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <Hien>
            <KhungAnhChong
              vienToi
              chinh={{ src: "/images/xuong/may-khoan-nhom.webp", alt: "Máy khoan gia công thanh nhôm", chuThich: "Khoan, phay thanh nhôm", viTri: "55% 50%", so: "FIG. 01", diem: { x: "46%", y: "34%", nhan: "Đầu khoan, phay" } }}
              phu={{ src: "/images/xuong/kiem-tra-gia-cong.webp", alt: "Thợ kiểm tra trong lúc gia công", viTri: "30% 40%" }}
            />
          </Hien>
          <ul className="space-y-3">
            {CONG_DOAN.map((c) => (
              <li key={c} className="flex items-center gap-4 the-kinh p-4 text-white md:p-5">
                <span className="h-2.5 w-2.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70">
          Thanh nhôm định hình là vật tư đầu vào; xưởng thực hiện các công đoạn gia công, lắp ráp và hoàn thiện nêu trên.
        </p>
      </Section>

      <Section tone="sang" nhan="Kiểm soát chất lượng" tieuDe="Ba điểm kiểm tra.">
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            ["Nhận vật tư", "Kiểm tra vật tư đầu vào trước khi đưa vào gia công."],
            ["Sau gia công", "Kiểm tra bộ cửa sau khi gia công và lắp ráp."],
            ["Trước giao", "Kiểm tra lần cuối trước khi đóng gói và giao."],
          ].map(([t, m], i) => (
            <li key={t} className="border-t border-accent pt-6">
              <span className="nhan-muc text-than-chi/65">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="tieu-de mt-3 text-lg">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-than-chi/80">{m}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-xs text-than-chi/65">
          Hạng mục kiểm tra chi tiết và kết quả thử nghiệm sẽ được công bố khi có xác nhận.
        </p>
      </Section>

      <Section tone="nga" nhan="Bảo vệ & bảo hành" tieuDe="Đến tay anh chị trong tình trạng nguyên vẹn.">
        <ul className="grid gap-4 md:grid-cols-3">
          {[
            ["Màng bảo vệ kính", "Bề mặt kính được bảo vệ trong quá trình vận chuyển và lắp đặt."],
            ["Băng bảo vệ thanh nhôm", "Bề mặt khung nhôm được bảo vệ cho đến khi bàn giao."],
            ["Dấu bảo hành & tem", "Mỗi bộ cửa có dấu bảo hành và tem. Thời hạn: theo chính sách công bố."],
          ].map(([t, m]) => (
            <li key={t} className="border border-than-chi/20 p-6">
              <h3 className="tieu-de text-lg">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-than-chi/80">{m}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sang" nhan="Tay nghề" tieuDe="Chính xác đến từng chi tiết.">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div>
            <p className="max-w-xl text-than-chi/80">
              Chúng tôi chọn sự bền bỉ thay vì phô trương. Từng bộ cửa được gia công theo bản vẽ, kiểm tra và hoàn thiện cẩn thận
              trước khi đến công trình.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/danh-cho-kts#tu-van" className="nut nut-chinh">
                Gửi bản vẽ, nhận bóc tách
              </Link>
              <Link href="/trai-nghiem#sample-box" className="nut nut-vien-sang">
                Nhận hộp mẫu góc nhôm
              </Link>
            </div>
          </div>
<Hien>
            <KhungAnh src="/images/xuong/tay-nghe-phu-kien.webp" alt="Kiểm tra tay nắm tại xưởng WINDUCA" chuThich="Kiểm tra bề mặt tay nắm" tyLe="aspect-[16/10]" viTri="center 35%" so="FIG. 02" diem={{ x: "44%", y: "48%", nhan: "Bề mặt tay nắm" }} />
          </Hien>
        </div>
      </Section>
    </>
  );
}
