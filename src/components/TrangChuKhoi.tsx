import Image from "next/image";
import Link from "next/link";
import { DichVuTruot } from "./DichVuTruot";
import { SanPhamBangChuyen } from "./SanPhamBangChuyen";
import { SoLieuChay } from "./SoLieuChay";
import { NhanMinhHoa, Wrap } from "./ui";
import { asset } from "@/lib/asset";
import { BAI_VIET } from "@/lib/bai-viet";
import { LOAI_DU_AN, SO_LIEU_GIA_DINH } from "@/lib/site";

/**
 * Các khối trang chủ theo bố cục Winboss (11/11/2026). Nội dung là của WINDUCA; số liệu chưa xác nhận để "—".
 * Ảnh là ảnh stock tạm, có nhãn "Minh họa".
 */

const HERO = "/images/hero.jpg";
const NHA = "/images/chu-nha.jpg";
const BTHU = "/images/architecture/cong-trinh-05.webp";
const RESORT = "/images/architecture/cong-trinh-06.webp";
const RESORT2 = "/images/resort-ven-bien.jpg";
const NHAPHO = "/images/architecture/cong-trinh-04.webp";
const NHAO = "/images/nha-o-kinh.jpg";
const VILLA = "/images/villa-ban-cong.jpg";

function NhanDo({ children }: { children: string }) {
  return <p className="nhan-muc text-accent">{children}</p>;
}

function MuiTenDo() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

/* ---------- Giới thiệu ---------- */
export function GioiThieuKhoi() {
  const giaTri = [
    { so: "01", t: "European-inspired Engineering", m: "Kỹ thuật lấy cảm hứng từ tiêu chuẩn châu Âu, ưu tiên độ chính xác và độ bền." },
    { so: "02", t: "Integrated Window Solutions", m: "Từ hệ nhôm, kính, phụ kiện đến thi công: một đầu mối đồng bộ." },
    { so: "03", t: "Architectural Precision", m: "Cửa khổ lớn, đường nét mảnh, hoàn thiện theo bản vẽ kiến trúc sư." },
  ];
  return (
    <section className="nen-sang py-7">
      <Wrap>
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px]">
            <div className="relative h-[26svh] min-h-[190px] md:h-[clamp(340px,64svh,560px)]">
              <Image src={asset("/images/intro-chi-tiet.jpg")} alt="Cửa trượt kính khổ lớn mở ra khu vườn trong biệt thự hiện đại" fill quality={70} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: "50% 45%" }} />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-[28px] border border-white/30 bg-than-chi/45 p-5 text-white backdrop-blur-md md:inset-x-6 md:bottom-6 md:max-w-md md:p-6">
              <p className="text-lg font-light leading-snug md:text-xl">Đối tác đáng tin cậy của bạn trong việc tìm kiếm sản phẩm</p>
              <div className="mt-4 flex items-center gap-4 rounded-full bg-white p-2 pr-5 text-than-chi">
                <div className="flex shrink-0 items-center">
                  {["/images/avatar-1.jpg", "/images/avatar-2.jpg", "/images/avatar-3.jpg"].map((src) => (
                    <Image key={src} src={asset(src)} alt="" width={48} height={48} className="-mr-3 h-12 w-12 rounded-full border-2 border-white object-cover" />
                  ))}
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d8a93b] bg-than-chi text-sm font-bold text-white">6k+</span>
                </div>
                <span className="h-10 w-px shrink-0 bg-than-chi/15" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="flex gap-0.5" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((k) => (
                        <svg key={k} viewBox="0 0 24 24" width="18" height="18" fill="#d8a93b"><path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" /></svg>
                      ))}
                    </span>
                    <span className="text-base font-bold">4,9</span>
                  </div>
                  <p className="mt-0.5 text-xs text-than-chi/65">Đánh giá từ khách hàng</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <NhanDo>Giới thiệu</NhanDo>
            <h2 className="mt-0.5 text-[clamp(1.5rem,2.8vw,2.25rem)] font-light tracking-[-0.01em] leading-[1.05]">
              Không chỉ là một hệ cửa.
              <span className="block font-bold">Đó là giải pháp kiến trúc đồng bộ.</span>
            </h2>
            <p className="mt-4 hidden max-w-xl text-base text-than-chi/75 sm:block">
              WINDUCA mang đến giải pháp cửa nhôm kính cao cấp cho biệt thự, penthouse và các công trình cao cấp, từ tư vấn bản vẽ đến thi công hoàn thiện.
            </p>
            <ul className="mt-6 space-y-4">
              {giaTri.map((d) => (
                <li key={d.so} className="flex gap-5 border-t border-inox pt-4">
                  <span className="text-sm font-bold text-accent">{d.so}</span>
                  <div>
                    <p className="font-bold">{d.t}</p>
                    <p className="mt-1 hidden text-[15px] leading-relaxed text-than-chi/70 sm:block">{d.m}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/gioi-thieu" className="nut nut-chinh mt-7">
              Về chúng tôi <MuiTenDo />
            </Link>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Sản phẩm nổi bật ---------- */
export function SanPhamKhoi() {
  return (
    <section className="overflow-hidden nen-nga py-7">
      <div className="text-center">
        <NhanDo>Sản phẩm</NhanDo>
        <h2 className="mt-0.5 text-[clamp(1.625rem,2.6vw,2.5rem)] font-light tracking-[-0.01em] leading-[1.05]">Hệ cửa nổi bật</h2>
      </div>
      <div className="mt-5">
        <SanPhamBangChuyen />
      </div>
    </section>
  );
}

/* ---------- Dịch vụ + số liệu ---------- */
export function DichVuKhoi() {
  const dv = [
    { so: "01", t: "Tư vấn giải pháp kiến trúc, thiết kế", m: "Đội kỹ thuật cùng kiến trúc sư chọn kiểu cửa phù hợp từng công trình.", anh: HERO, pos: "30% 50%" },
    { so: "02", t: "Cung cấp và lắp đặt", m: "Cung cấp hệ nhôm, phụ kiện và thi công, kiểm soát chất lượng đến khi nghiệm thu.", anh: NHA, pos: "70% 50%" },
    { so: "03", t: "Dịch vụ hậu mãi", m: "Bảo trì, hiệu chỉnh và hỗ trợ sau bàn giao.", anh: RESORT2, pos: "50% 50%" },
    { so: "04", t: "Hỗ trợ đối tác", m: "Đào tạo kỹ thuật và bán hàng cho đại lý, nhà thầu.", anh: NHAO, pos: "50% 78%" },
  ];
  return (
    <section className="nen-sang py-7">
      <Wrap>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <NhanDo>Dịch vụ</NhanDo>
            <h2 className="mt-0.5 text-[clamp(1.625rem,2.6vw,2.5rem)] font-light tracking-[-0.01em] leading-[1.05]">Danh sách các dịch vụ</h2>
            <p className="mt-5 max-w-xl text-base text-than-chi/75">
              Cửa đi, cửa sổ, vách kính và phụ kiện đồng bộ, đi cùng dịch vụ tư vấn, thi công và hậu mãi. WINDUCA là đối tác cho chủ nhà, kiến trúc
              sư, công ty thiết kế và nhà thầu.
            </p>
            <Link href="/he-cua" className="nut nut-chinh mt-7">
              Khám phá ngay
            </Link>
            <SoLieuChay muc={SO_LIEU_GIA_DINH} />
          </div>

          <DichVuTruot muc={dv} />
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Công trình theo loại ---------- */
export function CongTrinhKhoi() {
  const anh = [
    { src: BTHU, pos: "50% 50%" },
    { src: NHAPHO, pos: "50% 50%" },
    { src: RESORT, pos: "50% 50%" },
  ];
  return (
    <section className="nen-nga py-7">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <NhanDo>Công trình</NhanDo>
            <h2 className="mt-0.5 text-[clamp(1.625rem,2.6vw,2.5rem)] font-light tracking-[-0.01em] leading-[1.05]">Không gian sống tiêu biểu</h2>
          </div>
          <Link href="/cong-trinh" className="nut nut-dac">
            Xem thêm
          </Link>
        </div>
        <ul className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-5 md:overflow-visible">
          {LOAI_DU_AN.map((l, i) => (
            <li key={l} className="w-[78%] shrink-0 snap-center md:w-auto">
              <Link href="/cong-trinh" className="group relative block aspect-[4/3] overflow-hidden md:aspect-auto md:h-[clamp(260px,52svh,480px)] rounded-[24px] bg-than-chi md:rounded-[32px]">
                <Image src={asset(anh[i].src)} alt={l} fill quality={60} sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" style={{ objectPosition: anh[i].pos }} />
                <div className="absolute inset-0 bg-than-chi/35" aria-hidden="true" />
                <NhanMinhHoa className="left-4 top-4" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-6 text-white md:p-8">
                  <h3 className="text-xl font-bold md:text-2xl">{l}</h3>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent transition-transform duration-300 group-hover:translate-x-1">
                    <MuiTenDo />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

/* ---------- Dải chữ chạy + Vì sao chọn ---------- */
export function DaiChuChay() {
  const chu = "PREMIUM ALUMINUM WINDOW";
  const mot = (
    <span className="flex shrink-0 items-center gap-10 pr-10">
      <span>{chu}</span>
      <span className="text-accent">*</span>
      <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.75)]">WINDUCA</span>
      <span className="text-accent">*</span>
    </span>
  );
  return (
    <div className="overflow-hidden bg-than-chi py-8 text-white md:py-12" aria-hidden="true">
      <div className="chay-chu flex w-max text-[clamp(2.5rem,7vw,6rem)] font-black leading-none">
        {mot}
        {mot}
        {mot}
        {mot}
      </div>
    </div>
  );
}

export function ViSaoKhoi() {
  const y = [
    { so: "01", t: "Hệ nhôm cầu cách nhiệt", m: "Khung nhôm cầu cách nhiệt cho không gian êm và bền." },
    { so: "02", t: "Tiêu chuẩn châu Âu", m: "Hệ nhôm, phụ kiện và quy trình tham chiếu tiêu chuẩn châu Âu." },
    { so: "03", t: "Đồng bộ đến thi công", m: "Một đầu mối từ hệ nhôm, phụ kiện đến lắp đặt và nghiệm thu." },
  ];
  return (
    <section className="nen-toi py-7 text-white">
      <Wrap>
        <NhanDo>Vì sao chọn WINDUCA</NhanDo>
        <h2 className="mt-0.5 max-w-3xl text-[clamp(1.625rem,2.6vw,2.5rem)] font-light tracking-[-0.01em] leading-[1.05]">Sự thật về WINDUCA</h2>
        <ul className="mt-5 grid gap-px overflow-hidden rounded-[20px] bg-white/15 md:grid-cols-3 md:rounded-[24px]">
          {y.map((i) => (
            <li key={i.so} className="bg-than-chi p-5 md:p-7">
              <span className="text-3xl font-bold leading-none text-accent md:text-5xl">{i.so}</span>
              <h3 className="mt-3 text-xl font-bold md:mt-4">{i.t}</h3>
              <p className="mt-2 text-[15px] font-light leading-relaxed text-white/75">{i.m}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/gioi-thieu" className="nut nut-chinh">
            Tìm hiểu thêm về WINDUCA
          </Link>
          <Link href="/hop-tac" className="nut nut-vien">
            Trở thành đối tác
          </Link>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Hệ sinh thái đối tác ---------- */
export function DoiTacKhoi() {
  const nhom = [
    { t: "Dành cho kiến trúc sư", m: "Thư viện kỹ thuật, bản vẽ mặt cắt và tư vấn theo bản vẽ.", href: "/danh-cho-kts" },
    { t: "Dành cho nhà thầu", m: "Bóc tách khối lượng, phối hợp thi công và hỗ trợ kỹ thuật.", href: "/hop-tac" },
    { t: "Dành cho đại lý", m: "Chương trình hợp tác phân phối, đào tạo sản phẩm và kỹ thuật.", href: "/hop-tac" },
  ];
  return (
    <section className="nen-sang py-7">
      <Wrap>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <NhanDo>Hệ sinh thái đối tác</NhanDo>
            <h2 className="mt-0.5 text-[clamp(1.625rem,2.6vw,2.5rem)] font-light tracking-[-0.01em] leading-[1.05]">
              Kết nối năng lực.
              <span className="block font-bold">Kiến tạo giá trị dài hạn.</span>
            </h2>
            <Link href="/hop-tac" className="nut nut-chinh mt-7">
              Khám phá chương trình hợp tác
            </Link>
          </div>
          <ul className="divide-y divide-than-chi/15 border-y border-than-chi/15">
            {nhom.map((x) => (
              <li key={x.t}>
                <Link href={x.href} className="group flex items-center justify-between gap-6 py-5">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-accent">{x.t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-than-chi/70">{x.m}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:translate-x-1">
                    <MuiTenDo />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Tin tức ---------- */
export const BAI_SAP_CO = [
  { loai: "Kiến thức", t: "Cửa trượt nâng khác gì cửa trượt thường?", anh: VILLA, pos: "50% 72%" },
  { loai: "Kỹ thuật", t: "Cách đọc chỉ số Uw của cửa cách nhiệt", anh: RESORT2, pos: "50% 50%" },
  { loai: "Hoàn thiện", t: "Anode hóa hay sơn tĩnh điện: chọn thế nào?", anh: NHAO, pos: "50% 80%" },
  { loai: "Cấu tạo", t: "Thanh cầu cách nhiệt trong khung nhôm hoạt động thế nào?", anh: "/images/mat-cat-khung-cua.jpg", pos: "50% 45%" },
];

export function TinTucKhoi() {
  return (
    <section className="nen-sang py-7">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <NhanDo>Tin tức</NhanDo>
            <h2 className="mt-0.5 text-[clamp(1.625rem,2.6vw,2.5rem)] font-light tracking-[-0.01em] leading-[1.05]">Kiến thức và câu chuyện công trình</h2>
          </div>
          <Link href="/tin-tuc" className="nut nut-dac">
            Xem thêm
          </Link>
        </div>
        {/* Bố cục bento 4 thẻ: một thẻ lớn bên trái; bên phải một thẻ ngang phía trên và hai thẻ nhỏ phía dưới; chữ đặt trên ảnh */}
        <ul className="mt-5 grid gap-3 md:grid-cols-2 md:gap-4 lg:h-[470px] lg:grid-cols-[1.25fr_1fr_1fr] lg:grid-rows-2">
          {BAI_SAP_CO.map((b, i) => {
            const bai = BAI_VIET.find((x) => x.tieuDe === b.t);
            const lon = i === 0;
            return (
              <li key={b.t} className={lon ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : i === 1 ? "md:col-span-2 lg:col-span-2" : ""}>
                <Link
                  href={`/tin-tuc/${bai?.slug ?? ""}`}
                  className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[18px] bg-than-chi p-4 text-white md:rounded-[22px] md:p-6 ${
                    lon ? "aspect-[4/3] lg:aspect-auto" : i === 1 ? "aspect-[16/9] md:aspect-[21/9] lg:aspect-auto" : "aspect-[16/10] lg:aspect-auto"
                  }`}
                >
                  <Image
                    src={asset(b.anh)}
                    alt=""
                    fill
                    quality={65}
                    sizes={lon ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 28vw, 100vw"}
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                    style={{ objectPosition: b.pos }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0b]/90 via-[#0c0a0b]/25 to-[#0c0a0b]/10" aria-hidden="true" />
                  <span className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {b.loai}
                  </span>
                  <div className="relative z-10 flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className={`font-medium leading-snug ${lon ? "text-[clamp(1.35rem,2.1vw,2rem)]" : "text-[clamp(1.1rem,1.5vw,1.375rem)]"}`}>{b.t}</h3>
                      {lon && bai && <p className="mt-2 hidden max-w-md text-[15px] font-light leading-relaxed text-white/75 md:block">{bai.tomTat}</p>}
                    </div>
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-colors duration-300 group-hover:border-accent group-hover:bg-accent"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </div>
                  <span className="sr-only">Đọc bài</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Wrap>
    </section>
  );
}
