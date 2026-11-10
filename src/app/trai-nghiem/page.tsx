import type { Metadata } from "next";
import { HopMau } from "@/components/HopMau";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, Section } from "@/components/ui";
import { DIA_CHI, HOTLINE, HOTLINE_TEL, MAPS_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trải nghiệm WINDUCA — Hộp mẫu góc nhôm & Showroom",
  description: "Nhận hộp mẫu góc nhôm tại nhà, hoặc đặt lịch trải nghiệm tại showroom WINDUCA.",
};

export default function TraiNghiem() {
  return (
    <>
      <PageHero
        anhPhai="/images/xuong/thanh-nhom-tay-nam.webp"
        viTriAnh="center 58%"
        chuThichAnh="Mẫu góc nhôm và tay nắm"
        nhan="Trải nghiệm"
        tieuDe="Chạm vào chất liệu, trước khi quyết định."
        moTa="Nhận hộp mẫu góc nhôm tại nhà, hoặc đặt lịch trải nghiệm tại showroom WINDUCA."
      >
        <a href="#sample-box" className="nut nut-chinh">
          Nhận hộp mẫu góc nhôm
        </a>
        <a href="#showroom" className="nut nut-vien">
          Đặt lịch xem showroom
        </a>
      </PageHero>

      {/* Sample Box */}
      <Section gon id="sample-box" tone="sang" nhan="01 · Hộp mẫu" tieuDe="Hộp mẫu góc nhôm tận nơi" moTa="Bốn món trong hộp mẫu, để anh chị chạm và so với không gian nhà mình.">
        <HopMau />
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Chuyên viên liên hệ xác nhận", "Chúng tôi gọi hoặc nhắn Zalo để xác nhận đăng ký."],
            ["Hỏi địa chỉ nhận hộp", "Địa chỉ được hỏi qua điện thoại, không thu trên website."],
            ["Giao hộp mẫu", "Chính sách nhận hộp mẫu sẽ được công bố khi có xác nhận."],
          ].map(([t, m], i) => (
            <li key={t} className="border-t border-accent pt-6">
              <span className="nhan-muc text-than-chi/60">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="tieu-de mt-3 text-lg">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-than-chi/80">{m}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section gon tone="nga" tieuDe="Đăng ký nhận hộp mẫu" moTa="Chúng tôi không hỏi ngân sách và không đăng giá.">
        <LeadForm loai="sample-box" tone="sang" />
      </Section>

      {/* Showroom */}
      <Section gon id="showroom" tone="sang" nhan="02 · Showroom" tieuDe="Showroom WINDUCA" moTa="Xem cửa mẫu, chạm vật liệu và trao đổi bản vẽ cùng chuyên viên tư vấn.">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <ol className="space-y-6">
              {[
                ["Đón tiếp", "Chuyên viên tư vấn WINDUCA đón anh chị theo lịch đã hẹn."],
                ["Xem cửa mẫu", "Xem các kiểu cửa và cảm nhận vận hành."],
                ["Chạm mẫu & chọn màu", "So màu hoàn thiện và chi tiết phụ kiện."],
                ["Trao đổi bản vẽ & tư vấn", "Mang theo bản vẽ hoặc ảnh công trình để trao đổi."],
              ].map(([t, m], i) => (
                <li key={t} className="flex gap-4">
                  <span className="nhan-muc mt-1 text-than-chi/60">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="tieu-de block text-lg">{t}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-than-chi/80">{m}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="border border-than-chi/20 p-7">
            <p className="nhan-muc text-than-chi/70">Thông tin showroom</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-semibold">Địa chỉ</dt>
                <dd className="text-than-chi/70"><a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">{DIA_CHI}</a></dd>
              </div>
              <div>
                <dt className="font-semibold">Hotline</dt>
                <dd>
                  <a href={HOTLINE_TEL} className="underline">
                    {HOTLINE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Tham quan</dt>
                <dd className="text-than-chi/80">Theo lịch đặt trước.</dd>
              </div>
            </dl>
            {/* Bản đồ: chỉ tải sau khi khách đồng ý cookie / bấm "Xem bản đồ" — chờ địa chỉ thật */}
            <div className="mt-6 flex h-40 items-center justify-center border border-dashed border-than-chi/30 text-xs text-than-chi/60">
              Bản đồ sẽ hiển thị khi có địa chỉ showroom
            </div>
          </div>
        </div>
      </Section>

      <Section gon tone="nga" tieuDe="Đặt lịch trải nghiệm showroom" moTa="Chuyên viên sẽ xác nhận giờ cụ thể qua điện thoại.">
        <LeadForm loai="showroom" tone="sang" />
      </Section>

      <Section tone="sang" nhan="Dành cho kiến trúc sư">
        <p className="max-w-2xl text-than-chi/80">
          Anh chị là kiến trúc sư và muốn đưa khách đến showroom? Chọn “Tư vấn trực tiếp” ở form trên và ghi chú “Đặt lịch cho
          khách của tôi”, hoặc gọi hotline {HOTLINE}.
        </p>
      </Section>
    </>
  );
}
