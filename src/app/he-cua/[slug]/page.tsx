import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DoorExplorer } from "@/components/DoorExplorer";
import { Faq } from "@/components/Faq";
import { HeroKieuCua } from "@/components/HeroKieuCua";
import { Hien } from "@/components/HieuUng";
import { KhungAnhChong } from "@/components/KhungAnh";
import { LeadForm } from "@/components/LeadForm";
import { ThanhHopMau } from "@/components/ThanhHopMau";
import { ThongSoBon } from "@/components/ThongSoBon";
import { Wrap } from "@/components/ui";
import { ANH_THEO_KIEU, SAN_PHAM } from "@/lib/san-pham";
import { asset } from "@/lib/asset";
import { CONG_TRINH_MINH_HOA, FAQ_CHUNG, KIEU_CUA, TEN_EN_HE_CUA, THONG_SO_BANG } from "@/lib/site";

/**
 * Trang kiểu cửa thiết kế lại (11/11/2026, 5 ý tưởng luxury): hero điện ảnh · tổng quan + sản phẩm · trải nghiệm + cấu tạo ·
 * thông số kiểu đồng hồ + chi tiết phụ kiện · không gian · câu hỏi + đăng ký. Mặt phẳng Than đen / Ngà xen kẽ, không gradient hồng.
 */
const DON_VI = ["mm", "mm", "—", "mm", "Pa", "W/m²K"];

function Nhan({ so, t, toi = false }: { so: string; t: string; toi?: boolean }) {
  return (
    <p className={`nhan-tinh ${toi ? "text-white/70" : "text-than-chi/70"}`}>
      <b>{so}</b>
      <i aria-hidden="true" />
      {t}
    </p>
  );
}

export function generateStaticParams() {
  return KIEU_CUA.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: PageProps<"/he-cua/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const k = KIEU_CUA.find((x) => x.slug === slug);
  if (!k) return {};
  return { title: `${k.ten} | WINDUCA`, description: `${k.ten} WINDUCA: ${k.tagline}` };
}

export default async function KieuCuaPage({ params }: PageProps<"/he-cua/[slug]">) {
  const { slug } = await params;
  const k = KIEU_CUA.find((x) => x.slug === slug);
  if (!k) notFound();

  const khac = KIEU_CUA.filter((x) => x.slug !== k.slug);
  const sanPham = SAN_PHAM.filter((p) => p.kieu === k.slug);
  const lienQuan = CONG_TRINH_MINH_HOA.filter((c) => c.kieuCua === k.ten).slice(0, 4);
  const anh = ANH_THEO_KIEU[k.slug].src;

  return (
    <>
      <HeroKieuCua
        ten={k.ten}
        tenEn={TEN_EN_HE_CUA[k.slug]}
        tagline={k.tagline}
        anh={anh}
        thongTin={[
          ["Cách mở", k.cachMo],
          ["Khẩu độ", k.khauDo],
          ["Không gian phù hợp", k.khongGian.slice(0, 3).join(" · ")],
        ]}
      />
      <ThanhHopMau ten={k.ten} />

      {/* 01 · Tổng quan + sản phẩm */}
      <section className="mat-sang khoi-doc">
        <Wrap>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Hien>
              <Nhan so="01" t="Tổng quan" />
              <h2 className="tieu-lon mt-6 max-w-xl">{k.tagline}</h2>
            </Hien>
            <Hien tre={100} className="self-end">
              <p className="max-w-xl text-lg font-light leading-relaxed text-than-chi/75">{k.tongQuan}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {k.khongGian.map((x) => (
                  <li key={x} className="rounded-full border border-than-chi/15 px-4 py-1.5 text-sm text-than-chi/75">
                    {x}
                  </li>
                ))}
              </ul>
            </Hien>
          </div>

          {sanPham.length > 0 && (
            <div className="mt-16 md:mt-20">
              <Hien className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-2xl font-light md:text-3xl">
                  Sản phẩm thuộc <span className="font-medium">{k.ten.toLowerCase()}</span>
                </h3>
                <p className="max-w-sm text-sm text-than-chi/65">Bốn chỉ số để so sánh nhanh; giá trị được công bố khi có xác nhận kiểm định.</p>
              </Hien>
              <ul className="mt-8 grid gap-px overflow-hidden rounded-[12px] border border-than-chi/10 bg-than-chi/10 md:grid-cols-2 lg:grid-cols-3">
                {sanPham.map((p, i) => (
                  <Hien key={p.slug} as="li" tre={i * 80} className="group bg-white p-7 transition-colors duration-500 hover:bg-[#faf8f4] md:p-9">
                    <p className="text-[11px] font-semibold tracking-[0.26em] text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <h4 className="mt-4 text-2xl font-light leading-snug">{p.ten}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-than-chi/65">{p.mota}</p>
                    <ThongSoBon sp={p} lop="mt-6 border-t border-than-chi/10 pt-6" />
                  </Hien>
                ))}
              </ul>
            </div>
          )}
        </Wrap>
      </section>

      {/* 02 · Trải nghiệm (màu, đóng/mở, không gian) + cấu tạo 3D */}
      <DoorExplorer tenKieuCua={k.ten} slug={k.slug} />

      {/* 03 · Thông số kiểu đồng hồ + chi tiết phụ kiện */}
      <section className="mat-toi khoi-doc">
        <Wrap>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Hien>
              <Nhan so="04" t="Thông số kỹ thuật" toi />
              <h2 className="tieu-lon mt-6 max-w-xl">Chính xác đến từng chi tiết.</h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">Các giá trị sẽ được công bố cùng nguồn kiểm định khi có kết quả xác nhận.</p>
              <dl className="mt-10 border-t border-white/15">
                {THONG_SO_BANG.map((ten, i) => (
                  <div key={ten} className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-white/10 py-4">
                    <dt className="col-span-2 grid grid-cols-subgrid">
                      <span className="text-[11px] font-semibold tracking-[0.2em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[15px] text-white/90">{ten}</span>
                    </dt>
                    <dd className="text-sm text-white/70">
                      Đang chờ xác nhận <span className="ml-1 text-xs text-white/70">{DON_VI[i]}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-8 flex flex-wrap gap-2">
                {["Mặt cắt DWG", "Mô hình BIM (RFA, IFC)", "Catalog kỹ thuật"].map((t) => (
                  <li key={t} className="flex items-center gap-3 rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/75">
                    {t}
                    <span className="text-white/70">Sắp có</span>
                  </li>
                ))}
              </ul>
            </Hien>

            <Hien tre={120}>
              <KhungAnhChong
                vienToi
                chinh={{
                  src: "/images/xuong/tay-nghe-phu-kien.webp",
                  alt: "Kiểm tra tay nắm cửa",
                  chuThich: "Tay nắm, bản lề, khóa",
                  so: "FIG. 03",
                  viTri: "center 35%",
                  diem: { x: "52%", y: "46%", nhan: "Tay nắm đồng bộ" },
                }}
                phu={{ src: "/images/xuong/thanh-nhom-tay-nam.webp", alt: "Góc nhôm và tay nắm", viTri: "center 30%" }}
              />
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
                Phụ kiện được chọn đồng bộ về màu và đường nét với khung nhôm. Tay nắm chỉ khắc duy nhất chữ WINDUCA; anh chị có thể chạm thử mẫu ngay trong hộp mẫu.
              </p>
            </Hien>
          </div>
        </Wrap>
      </section>

      {/* 04 · Không gian */}
      {lienQuan.length > 0 && (
        <section className="mat-nga khoi-doc">
          <Wrap>
            <Hien className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Nhan so="05" t="Cảm hứng" />
                <h2 className="tieu-lon mt-6">
                  Không gian dùng <span className="font-medium">{k.ten.toLowerCase()}</span>
                </h2>
              </div>
              <Link href="/cong-trinh" className="nut nut-vien-sang">
                Xem thêm không gian
              </Link>
            </Hien>
            <ul className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:grid-rows-2">
              {lienQuan.map((c, i) => {
                const idx = CONG_TRINH_MINH_HOA.findIndex((x) => x.slug === c.slug) + 1;
                const lon = i === 0 && lienQuan.length > 2;
                return (
                  <Hien key={c.slug} as="li" tre={i * 90} className={lon ? "col-span-2 row-span-2" : ""}>
                    <Link href={`/cong-trinh/${c.slug}`} className="group relative block h-full min-h-[190px] overflow-hidden rounded-[12px] bg-than-chi">
                      <Image
                        src={asset(`/images/architecture/cong-trinh-${String(idx).padStart(2, "0")}.webp`)}
                        alt={c.ten}
                        fill
                        quality={65}
                        sizes={lon ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                      />
                      <span className="absolute bottom-3 left-3 rounded-full bg-than-chi/75 px-3 py-1.5 text-xs text-white backdrop-blur-md">{c.ten}</span>
                    </Link>
                  </Hien>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-than-chi/65">Ảnh cảm hứng, không phải công trình do WINDUCA thực hiện.</p>
          </Wrap>
        </section>
      )}

      {/* 05 · Câu hỏi thường gặp */}
      <section className="mat-sang khoi-doc">
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
            <Hien>
              <Nhan so="06" t="Câu hỏi thường gặp" />
              <h2 className="tieu-lon mt-6">Điều anh chị thường hỏi.</h2>
            </Hien>
            <Hien tre={100}>
              <Faq muc={FAQ_CHUNG.slice(0, 4)} />
            </Hien>
          </div>
        </Wrap>
      </section>

      {/* 06 · Đăng ký hộp mẫu: ảnh nền + mặt phẳng tối */}
      <section id="dang-ky" className="relative isolate overflow-hidden bg-than-chi text-white khoi-doc">
        <Image src={asset(anh)} alt="" fill quality={60} sizes="100vw" className="-z-10 object-cover" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-than-chi/80" aria-hidden="true" />
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
            <Hien>
              <Nhan so="07" t="Hộp mẫu góc nhôm" toi />
              <h2 className="tieu-lon mt-6">
                Quan tâm <span className="font-medium">{k.ten.toLowerCase()}?</span>
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">Nhận hộp mẫu góc nhôm tại nhà. Chúng tôi không hỏi ngân sách và không đăng giá.</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {khac.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/he-cua/${x.slug}`} className="inline-block rounded-full border border-white/25 px-4 py-1.5 text-xs text-white/85 transition-colors hover:border-white hover:text-white">
                      {x.ten}
                    </Link>
                  </li>
                ))}
              </ul>
            </Hien>
            <Hien tre={100} className="rounded-[12px] bg-nga p-6 text-than-chi md:p-8">
              <LeadForm loai="sample-box" tone="sang" kieuCuaMacDinh={k.ten} cot={3} />
            </Hien>
          </div>
        </Wrap>
      </section>
    </>
  );
}
