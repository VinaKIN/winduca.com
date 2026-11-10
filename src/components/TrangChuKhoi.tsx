import Image from "next/image";
import Link from "next/link";
import { SanPhamBangChuyen } from "./SanPhamBangChuyen";
import { NhanMinhHoa, Wrap } from "./ui";
import { asset } from "@/lib/asset";
import { LOAI_DU_AN } from "@/lib/site";

/**
 * Các khối trang chủ theo bố cục Winboss (11/11/2026). Nội dung là của WINDUCA; số liệu chưa xác nhận để "—".
 * Ảnh là ảnh stock tạm, có nhãn "Minh họa".
 */

const HERO = "/images/hero.jpg";
const NHA = "/images/chu-nha.jpg";
const BTHU = "/images/biet-thu-go-kinh.jpg";
const RESORT = "/images/resort-ho-boi.jpg";
const RESORT2 = "/images/resort-ven-bien.jpg";
const NHAPHO = "/images/nha-pho-dem.jpg";
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
  const diem = [
    { so: "01", t: "Tư vấn chuyên nghiệp", m: "Đội kỹ thuật bóc tách theo bản vẽ và tư vấn kiểu cửa đúng với từng công trình." },
    { so: "02", t: "Danh mục đa dạng", m: "Bốn kiểu cửa: trượt nâng, đi mở quay, xếp trượt và cửa sổ, cùng hệ phụ kiện đồng bộ." },
  ];
  return (
    <section className="bg-white py-8 md:py-10">
      <Wrap>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <NhanDo>Giới thiệu</NhanDo>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.5rem)] font-light leading-[1.1]">
              WINDUCA – <span className="block font-bold">Premium Window &amp; Door</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-than-chi/75 md:text-lg">
              WINDUCA mang đến giải pháp cửa nhôm kính cao cấp châu Âu đồng bộ — từ hệ nhôm, phụ kiện đến thi công — cho
              biệt thự, penthouse và các công trình cao cấp.
            </p>
            <ul className="mt-8 space-y-5">
              {diem.map((d) => (
                <li key={d.so} className="flex gap-5 border-t border-inox pt-5">
                  <span className="text-sm font-bold text-accent">{d.so}</span>
                  <div>
                    <p className="font-bold">{d.t}</p>
                    <p className="mt-1 text-sm text-than-chi/70">{d.m}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/gioi-thieu" className="nut nut-chinh mt-9">
              Về chúng tôi <MuiTenDo />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px]">
            <div className="relative aspect-[4/3] md:aspect-[5/4]">
              <Image src={asset(NHA)} alt="" fill quality={60} sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
            </div>
            <NhanMinhHoa className="left-4 top-4" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/85 p-5 backdrop-blur-md md:inset-x-6 md:bottom-6 md:max-w-sm">
              <p className="text-sm font-bold leading-snug">Đối tác đáng tin cậy của bạn trong việc tìm kiếm sản phẩm</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-than-chi/70">
                <span className="text-lg font-bold text-than-chi">—</span>
                <span>Đánh giá từ khách hàng · đang chờ xác nhận</span>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Sản phẩm nổi bật ---------- */
export function SanPhamKhoi() {
  return (
    <section className="overflow-hidden bg-nga py-8 md:py-10">
      <div className="text-center">
        <NhanDo>Sản phẩm</NhanDo>
        <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] font-light">Hệ cửa nổi bật</h2>
      </div>
      <div className="mt-6">
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
  const so = [
    { n: "Số dự án" },
    { n: "Số nhà máy" },
    { n: "Số quốc gia" },
  ];
  return (
    <section className="bg-white py-8 md:py-10">
      <Wrap>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <NhanDo>Dịch vụ</NhanDo>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] font-light">Danh sách các dịch vụ</h2>
            <p className="mt-5 max-w-xl text-base text-than-chi/75">
              Cửa đi, cửa sổ, vách kính và phụ kiện đồng bộ, đi cùng dịch vụ tư vấn, thi công và hậu mãi. WINDUCA là đối tác cho chủ nhà, kiến trúc
              sư, công ty thiết kế và nhà thầu.
            </p>
            <Link href="/he-cua" className="nut nut-chinh mt-7">
              Khám phá ngay
            </Link>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-inox pt-8">
              {so.map((s) => (
                <div key={s.n}>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-than-chi/55">{s.n}</dt>
                  <dd className="mt-2 text-4xl font-bold text-than-chi md:text-5xl">—</dd>
                  <dd className="mt-1 text-xs text-than-chi/60">Đang chờ xác nhận</dd>
                </div>
              ))}
            </dl>
          </div>

          <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {dv.map((d) => (
              <li key={d.so} className="w-full shrink-0 snap-center">
                <Link href="/lien-he" className="group relative block min-h-[340px] overflow-hidden rounded-[24px] bg-than-chi text-white md:h-[clamp(300px,52svh,440px)] md:min-h-0 md:rounded-[32px]">
                  <Image src={asset(d.anh)} alt="" fill quality={60} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ objectPosition: d.pos }} />
                  <div className="absolute inset-0 bg-than-chi/55" aria-hidden="true" />
                  <div className="relative flex h-full min-h-[340px] flex-col justify-between p-6 md:min-h-0 md:p-8">
                    <span className="text-sm font-bold text-white/80">{d.so}</span>
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <h3 className="text-xl font-bold md:text-2xl">{d.t}</h3>
                        <p className="mt-2 max-w-md text-sm font-light text-white/85">{d.m}</p>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:translate-x-1">
                        <MuiTenDo />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
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
    <section className="bg-nga py-8 md:py-10">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <NhanDo>Công trình</NhanDo>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] font-light">Không gian sống tiêu biểu</h2>
          </div>
          <Link href="/cong-trinh" className="nut nut-dac">
            Xem thêm
          </Link>
        </div>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {LOAI_DU_AN.map((l, i) => (
            <li key={l}>
              <Link href="/cong-trinh" className="group relative block aspect-[4/5] overflow-hidden md:aspect-auto md:h-[clamp(260px,52svh,480px)] rounded-[24px] bg-than-chi md:rounded-[32px]">
                <Image src={asset(anh[i].src)} alt="" fill quality={60} sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" style={{ objectPosition: anh[i].pos }} />
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
    <section className="bg-than-chi pb-20 text-white md:pb-28">
      <Wrap>
        <NhanDo>Vì sao chọn WINDUCA</NhanDo>
        <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-light">Sự thật về WINDUCA</h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[24px] bg-white/15 md:grid-cols-3 md:rounded-[32px]">
          {y.map((i) => (
            <li key={i.so} className="bg-than-chi p-8 md:p-10">
              <span className="text-5xl font-bold text-accent md:text-6xl">{i.so}</span>
              <h3 className="mt-6 text-xl font-bold">{i.t}</h3>
              <p className="mt-2 text-sm font-light text-white/75">{i.m}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
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

/* ---------- Tin tức ---------- */
export const BAI_SAP_CO = [
  { loai: "Kiến thức", t: "Cửa trượt nâng khác gì cửa trượt thường?", anh: VILLA, pos: "50% 72%" },
  { loai: "Kỹ thuật", t: "Cách đọc chỉ số Uw của cửa cách nhiệt", anh: RESORT2, pos: "50% 50%" },
  { loai: "Hoàn thiện", t: "Anode hóa hay sơn tĩnh điện: chọn thế nào?", anh: NHAO, pos: "50% 80%" },
];

export function TinTucKhoi() {
  return (
    <section className="bg-white py-8 md:py-10">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <NhanDo>Tin tức</NhanDo>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] font-light">Kiến thức và câu chuyện công trình</h2>
          </div>
          <Link href="/tin-tuc" className="nut nut-dac">
            Xem thêm
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {BAI_SAP_CO.map((b) => (
            <li key={b.t}>
              <Link href="/tin-tuc" className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-than-chi md:rounded-[28px]">
                  <Image src={asset(b.anh)} alt="" fill quality={60} sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" style={{ objectPosition: b.pos }} />
                  <NhanMinhHoa className="left-3 top-3" />
                </div>
                <p className="nhan-muc mt-4 text-accent">{b.loai}</p>
                <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-accent">{b.t}</h3>
                <p className="mt-1 text-sm text-than-chi/60">Sắp có</p>
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
