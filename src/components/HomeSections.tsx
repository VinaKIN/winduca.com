import Image from "next/image";
import Link from "next/link";
import { CanhMinhHoa, MatCat2D } from "./Illustration";
import { Faq } from "./Faq";
import { LeadForm } from "./LeadForm";
import { HomeFormTabs } from "./HomeFormTabs";
import { Section, Wrap, ChoXacNhan, NhanMinhHoa } from "./ui";
import { asset } from "@/lib/asset";
import { CONG_TRINH_MINH_HOA, FAQ_CHUNG, KIEU_CUA } from "@/lib/site";

export function TuyenNgonVaBaThe() {
  const the = [
    { id: "khoi-kts", nhan: "Kiến trúc sư & nhà thiết kế", mota: "Tài liệu kỹ thuật, mặt cắt và tư vấn theo bản vẽ.", cta: "Xem tài liệu" },
    { id: "khoi-chu-nha", nhan: "Chủ nhà", mota: "Chạm vào chất liệu trước khi quyết định.", cta: "Xem trải nghiệm" },
    { id: "khoi-nha-thau", nhan: "Nhà thầu", mota: "Gửi bản vẽ, nhận bóc tách từ đội kỹ thuật.", cta: "Gửi bản vẽ" },
  ];
  return (
    <section id="tuyen-ngon" className="relative overflow-hidden bg-white text-than-chi nen-luoi">
      <span
        aria-hidden="true"
        className="so-lon pointer-events-none absolute -top-4 right-4 hidden select-none md:right-10 md:block"
      >
        02
      </span>
      <Wrap className="relative py-24 md:py-40">
        <div className="grid gap-5 md:grid-cols-[14rem_1fr] md:gap-12">
          <div>
            <p className="nhan-muc text-than-chi/60">Dành cho ai</p>
            <div className="mt-4 h-px w-14 bg-accent" />
          </div>
          <p className="tieu-de max-w-4xl text-[clamp(1.9rem,4.6vw,4rem)] [text-wrap:balance]">
            Chúng tôi chọn sự bền bỉ thay vì phô trương.
          </p>
        </div>

        {/* ba lối vào: lưới đường kẻ mảnh, hover có vạch Champagne chạy */}
        <ul className="mt-16 grid gap-px border border-inox/70 bg-inox/70 md:mt-24 md:grid-cols-3">
          {the.map((t, i) => (
            <li key={t.id} className="bg-white">
              <a
                href={`#${t.id}`}
                className="group relative flex h-full min-h-[17rem] flex-col justify-between p-8 transition-colors duration-500 hover:bg-nga md:p-10"
              >
                <span className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                <span className="so-lon !text-[3.5rem] leading-none">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="tieu-de block text-2xl">{t.nhan}</span>
                  <span className="mt-3 block text-sm font-light text-than-chi/75">{t.mota}</span>
                  <span className="mt-8 flex items-center gap-3 text-sm font-semibold text-than-chi">
                    {t.cta}
                    <span className="h-px w-8 bg-accent transition-all duration-500 group-hover:w-14" aria-hidden="true" />
                    <span className="h-2 w-2 rotate-45 bg-accent" aria-hidden="true" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

export function KhoiKTS() {
  const tep = [
    { ten: "Mặt cắt DWG — Cửa trượt nâng", loai: "DWG · PDF" },
    { ten: "Mô hình BIM (Revit, IFC)", loai: "RFA · IFC" },
    { ten: "Catalog kỹ thuật", loai: "PDF" },
  ];
  return (
    <Section
      id="khoi-kts"
      tone="nga"
      nhan="03 / 09 · Kiến trúc sư & nhà thiết kế"
      tieuDe="Tài liệu kỹ thuật, sẵn sàng cho bản vẽ của bạn."
      moTa="Thư viện mặt cắt, mô hình BIM và hồ sơ kỹ thuật cho từng kiểu cửa. Đang được hoàn thiện cùng đội kỹ thuật."
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <MatCat2D className="aspect-[4/3]" />
        <div>
          <ul className="divide-y divide-than-chi/15 border-y border-than-chi/15">
            {tep.map((t) => (
              <li key={t.ten} className="flex items-center justify-between gap-4 py-5">
                <span>
                  <span className="block text-sm font-semibold">{t.ten}</span>
                  <span className="mt-1 block text-xs text-than-chi/60">{t.loai}</span>
                </span>
                <span className="rounded-sm border border-than-chi/30 px-2 py-1 text-xs">Sắp có</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/danh-cho-kts#thu-vien" className="nut nut-dac">
              Tải thư viện kỹ thuật
            </Link>
            <Link href="/danh-cho-kts#tu-van" className="nut nut-vien-sang">
              Gửi bản vẽ để tư vấn
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function KhoiChuNha() {
  const noiDau = [
    { t: "Một căn phòng yên tĩnh hơn", m: "Mặt kính rộng mà vẫn giữ được sự êm dịu khi tiếng ồn bên ngoài bớt đi." },
    { t: "Mát mẻ, dễ chịu quanh năm", m: "Thanh cầu cách nhiệt giúp khung cửa không trở thành đường dẫn nhiệt thẳng vào nhà." },
    { t: "Kín khít trước mưa gió", m: "Gioăng ôm sát khung và kính giúp bộ cửa đóng kín khít hơn, nhất là ở vùng thời tiết khắc nghiệt." },
  ];
  return (
    <Section
      id="khoi-chu-nha"
      tone="nga"
      nhan="05 / 09 · Chủ nhà"
      tieuDe="Chạm vào chất liệu, trước khi quyết định."
      moTa="Nhận hộp mẫu góc nhôm tại nhà, hoặc đặt lịch trải nghiệm tại showroom WINDUCA."
    >
      <div className="grid gap-px border border-than-chi/15 bg-than-chi/15 md:grid-cols-3">
        {noiDau.map((n, i) => (
          <div key={n.t} className="bg-white p-8">
            <span className="nhan-muc text-than-chi/60">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="tieu-de mt-6 text-xl">{n.t}</h3>
            <p className="mt-3 text-sm text-than-chi/80">{n.m}</p>
            <p className="mt-5">
              <ChoXacNhan tone="sang">Số liệu kiểm định: đang chờ xác nhận</ChoXacNhan>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-than-chi">
          <Image
            src={asset("/images/chu-nha.jpg")}
            alt="Phòng khách mở ra hồ bơi qua cửa kính lớn (hình minh họa)"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <NhanMinhHoa className="left-3 top-3" />
        </div>
        <div>
          <p className="nhan-muc text-than-chi/70">Hoàn thiện &amp; cảm giác chạm</p>
          <h3 className="tieu-de mt-4 text-2xl md:text-3xl">Bề mặt anode hóa và sơn tĩnh điện</h3>
          <p className="mt-4 text-than-chi/80">
            Hai cách hoàn thiện cho khung nhôm, đồng bộ với phụ kiện và kính hộp tràn viền. Anh chị có thể chạm và so màu
            ngay trong hộp mẫu.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/trai-nghiem#sample-box" className="nut nut-dac">
              Nhận hộp mẫu góc nhôm
            </Link>
            <Link href="/trai-nghiem#showroom" className="nut nut-vien-sang">
              Đặt lịch xem showroom
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function KhoiNhaThau() {
  return (
    <Section
      id="khoi-nha-thau"
      tone="sang"
      nhan="06 / 09 · Nhà thầu"
      tieuDe="Gửi bản vẽ, nhận bóc tách."
      moTa="Đội kỹ thuật WINDUCA đề xuất giải pháp và bóc tách theo bản vẽ của công trình. Chúng tôi không hỏi ngân sách."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <ol className="space-y-8">
            {[
              ["Gửi bản vẽ", "PDF, DWG, JPG hoặc PNG, tối đa 30MB."],
              ["Đội kỹ thuật bóc tách", "Đề xuất giải pháp và chi tiết theo bản vẽ."],
              ["Trao đổi, hoàn thiện", "Qua điện thoại, Zalo, email hoặc họp online."],
            ].map(([t, m], i) => (
              <li key={t} className="flex gap-5">
                <span className="so-lon !text-[2.5rem] leading-none">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="tieu-de block text-lg">{t}</span>
                  <span className="mt-1 block text-sm text-than-chi/75">{m}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-10 border-t border-than-chi/15 pt-6 text-xs text-than-chi/65">
            Bản vẽ chỉ dùng để tư vấn cho đúng công trình này, không chia sẻ cho bên thứ ba và được xóa sau 30 ngày.
          </p>
        </aside>
        <div className="border border-than-chi/15 bg-white p-6 shadow-[0_1px_0_0_rgba(43,43,45,0.04)] md:p-10">
          <LeadForm loai="ban-ve" tone="sang" />
        </div>
      </div>
    </Section>
  );
}

export function QuyTrinh() {
  const buoc = [
    { t: "Tư vấn & khảo sát", m: "Trao đổi nhu cầu và đo đạc thực tế tại công trình." },
    { t: "Hộp mẫu tận nơi", m: "Mang góc nhôm và màu hoàn thiện đến để anh chị chạm, so." },
    { t: "Gia công chính xác", m: "Gia công theo bản vẽ tại xưởng WINDUCA." },
    { t: "Lắp đặt hoàn thiện", m: "Đội kỹ thuật lắp đặt tại công trình." },
    { t: "Bảo hành & bảo trì", m: "Theo chính sách công bố của WINDUCA." },
  ];
  return (
    <Section id="quy-trinh" tone="nga" nhan="07 / 09 · Quy trình" tieuDe="Từ buổi tư vấn đến ngày bàn giao.">
      <ol className="grid gap-0 md:grid-cols-5">
        {buoc.map((b, i) => (
          <li key={b.t} className="relative border-t border-accent pt-8 md:pr-6">
            <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rotate-45 bg-accent" aria-hidden="true" />
            <span className="nhan-muc text-than-chi/60">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="tieu-de mt-3 text-lg">{b.t}</h3>
            <p className="mt-2 text-sm text-than-chi/80">{b.m}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function CongTrinhMinhHoa() {
  return (
    <Section
      id="cong-trinh"
      tone="sang"
      nhan="08 / 09 · Cảm hứng & tham chiếu"
      tieuDe="Cảm hứng từ những không gian sống."
      moTa="Các hình dưới đây là hình minh họa. Công trình thực tế của WINDUCA đang được cập nhật."
    >
      {/* Ba hình tiêu biểu, đều nhau, thay vì lưới sáu ô lệch (gọn hơn) */}
      <ul className="grid gap-6 md:grid-cols-3">
        {CONG_TRINH_MINH_HOA.slice(0, 3).map((c, i) => (
          <li key={c.slug}>
            <Link href={`/cong-trinh/${c.slug}`} className="group block">
              <CanhMinhHoa seed={i + 1} className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.015]" />
              <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-than-chi/15 pb-3">
                <p className="text-sm font-semibold">{c.ten}</p>
                <p className="shrink-0 text-xs text-than-chi/65">{c.khuVuc}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10">
        <Link href="/cong-trinh" className="nut nut-vien-sang">
          Xem tất cả 12 hình minh họa
        </Link>
      </p>
    </Section>
  );
}

export function FaqVaForm() {
  return (
    <>
      <Section id="faq" tone="nga" nhan="09 / 09 · Câu hỏi thường gặp" tieuDe="Những điều anh chị thường hỏi.">
        <Faq muc={FAQ_CHUNG} />
      </Section>
      <Section
        id="dang-ky"
        tone="sang"
        nhan="Đăng ký"
        tieuDe="Bắt đầu cho ngôi nhà của bạn"
        moTa="Nhận hộp mẫu góc nhôm, hoặc đăng ký lịch tư vấn trực tiếp từ chuyên viên WINDUCA."
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="nhan-muc text-than-chi/70">Liên hệ trực tiếp</p>
            <a href="tel:0947686668" className="tieu-de mt-4 block text-3xl hover:text-accent md:text-4xl">
              0947 686 668
            </a>
            <ul className="mt-8 space-y-4 border-t border-than-chi/15 pt-6 text-sm text-than-chi/80">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                Chúng tôi không hỏi ngân sách và không đăng giá.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                Chuyên viên liên hệ trong giờ làm việc.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                Địa chỉ nhận hộp mẫu được hỏi qua điện thoại, không thu trên website.
              </li>
            </ul>
          </aside>
          <div className="border border-than-chi/15 bg-white p-6 md:p-10">
            <HomeFormTabs kieuCuaMacDinh={KIEU_CUA[0].ten} />
          </div>
        </div>
      </Section>
    </>
  );
}
