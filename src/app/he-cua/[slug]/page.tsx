import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CanhMinhHoa } from "@/components/Illustration";
import { DoorExplorer } from "@/components/DoorExplorer";
import { Faq } from "@/components/Faq";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, Section, ChoXacNhan } from "@/components/ui";
import { CONG_TRINH_MINH_HOA, FAQ_CHUNG, KIEU_CUA, THONG_SO_BANG } from "@/lib/site";

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
  const lienQuan = CONG_TRINH_MINH_HOA.filter((c) => c.kieuCua === k.ten).slice(0, 3);

  return (
    <>
      <PageHero nhan={`Hệ cửa · ${k.ten}`} tieuDe={`${k.ten} WINDUCA`} moTa={k.tagline}>
        <Link href="#dang-ky" className="nut nut-chinh">
          Nhận hộp mẫu góc nhôm
        </Link>
        <Link href="/danh-cho-kts#thu-vien" className="nut nut-vien">
          Tài liệu cho KTS
        </Link>
      </PageHero>

      <Section tone="sang" nhan="Tổng quan" tieuDe={k.tagline} moTa={k.tongQuan}>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="nhan-muc text-than-chi/70">Cách mở</p>
            <p className="mt-2">{k.cachMo}</p>
          </div>
          <div>
            <p className="nhan-muc text-than-chi/70">Khẩu độ</p>
            <p className="mt-2">{k.khauDo}</p>
          </div>
          <div>
            <p className="nhan-muc text-than-chi/70">Không gian phù hợp</p>
            <p className="mt-2">{k.khongGian.join(" · ")}</p>
          </div>
        </div>
      </Section>

      <DoorExplorer tenKieuCua={k.ten} />

      <Section tone="nga" nhan="Thông số" tieuDe="Thông số kỹ thuật" moTa="Các giá trị sẽ được công bố cùng nguồn kiểm định khi có kết quả xác nhận.">
        <dl className="border border-than-chi/15 bg-white grid divide-y divide-than-chi/15 rounded-sm sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
          {THONG_SO_BANG.map((ten) => (
            <div key={ten} className="border-than-chi/15 p-5 sm:border-b">
              <dt className="nhan-muc text-than-chi/70">{ten}</dt>
              <dd className="mt-2">
                <ChoXacNhan />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="sang" nhan="Phụ kiện WINDUCA" tieuDe="Tay nắm, bản lề, khóa — đồng bộ với khung cửa.">
        <p className="max-w-2xl text-than-chi/80">
          Phụ kiện được chọn đồng bộ về màu và đường nét với khung nhôm. Tay nắm chỉ khắc duy nhất chữ WINDUCA. Anh chị có thể
          chạm thử mẫu phụ kiện ngay trong hộp mẫu.
        </p>
      </Section>

      <Section tone="nga" nhan="Tài liệu kỹ thuật" tieuDe="Tài liệu cho kiến trúc sư">
        <ul className="grid gap-4 md:grid-cols-3">
          {["Mặt cắt DWG", "Mô hình BIM (RFA, IFC)", "Catalog / hồ sơ kỹ thuật"].map((t) => (
            <li key={t} className="flex items-center justify-between border border-than-chi/20 p-5 opacity-80">
              <span className="text-sm font-semibold">{t}</span>
              <span className="rounded-sm border border-than-chi/30 px-2 py-1 text-xs">Sắp có</span>
            </li>
          ))}
        </ul>
      </Section>

      {lienQuan.length > 0 && (
        <Section tone="sang" nhan="Cảm hứng" tieuDe={`Không gian dùng ${k.ten.toLowerCase()}`} moTa="Hình minh họa; công trình thực tế đang được cập nhật.">
          <ul className="grid gap-4 md:grid-cols-3">
            {lienQuan.map((c, i) => (
              <li key={c.slug}>
                <CanhMinhHoa seed={i + 5} className="aspect-[4/3]" />
                <p className="mt-3 text-sm font-semibold">{c.ten}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="sang" nhan="Câu hỏi" tieuDe="Câu hỏi thường gặp" className="border-t border-than-chi/10">
        <Faq muc={FAQ_CHUNG.slice(0, 4)} />
      </Section>

      <Section id="dang-ky" tone="nga" tieuDe={`Quan tâm ${k.ten.toLowerCase()}?`} moTa="Nhận hộp mẫu góc nhôm tại nhà. Chúng tôi không hỏi ngân sách và không đăng giá.">
        <LeadForm loai="sample-box" tone="sang" kieuCuaMacDinh={k.ten} />
      </Section>

      <Section tone="sang" nhan="Kiểu cửa khác">
        <ul className="grid gap-4 md:grid-cols-3">
          {khac.map((x) => (
            <li key={x.slug}>
              <Link href={`/he-cua/${x.slug}`} className="block border border-than-chi/20 p-6 hover:border-champagne">
                <span className="tieu-de text-lg">{x.ten}</span>
                <span className="mt-2 block text-sm text-than-chi/75">{x.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
