import type { Metadata } from "next";
import { Hien, NutHut } from "@/components/HieuUng";
import { LuoiLoc, TieuDeTrang, type TheAnh } from "@/components/TrangMau";
import { Wrap } from "@/components/ui";
import { GIAI_PHAP, QUY_TRINH_5_BUOC } from "@/lib/giai-phap";

export const metadata: Metadata = {
  title: "Giải pháp theo loại công trình | WINDUCA",
  description: "Biệt thự, penthouse, căn hộ, nhà phố, khách sạn, văn phòng, nhà hàng và công trình đặc thù: cách chọn hệ cửa nhôm kính và cách WINDUCA tư vấn, triển khai.",
};

/**
 * Trang Giải pháp theo mẫu Winboss (11/11/2026, lần 3): tiêu đề giữa trang, tab lọc theo nhóm công trình, lưới thẻ ảnh ba cột
 * bấm vào xem bài; quy trình năm bước và kêu gọi. Ảnh minh họa Pexels, không phải công trình của WINDUCA.
 */
const NHOM: Record<string, string> = {
  "biet-thu": "Nhà ở",
  penthouse: "Nhà ở",
  "can-ho-cao-cap": "Nhà ở",
  "nha-pho-cao-cap": "Nhà ở",
  "khach-san-resort": "Thương mại và lưu trú",
  "van-phong-hang-a": "Thương mại và lưu trú",
  "nha-hang-quan-ca-phe": "Thương mại và lưu trú",
  "cong-trinh-dac-thu": "Công trình đặc thù",
};

const THE: TheAnh[] = GIAI_PHAP.map((g) => ({ id: g.slug, tab: [NHOM[g.slug]], ten: g.tenDai, mota: g.tomTat, anh: g.anh, pos: g.pos, href: `/giai-phap/${g.slug}` }));

export default function GiaiPhap() {
  return (
    <>
      <TieuDeTrang tieuDe="Giải pháp theo loại công trình" moTa="Mỗi không gian có nhu cầu riêng. Chọn loại công trình để xem điều cần cân nhắc, hệ cửa gợi ý và cách WINDUCA tư vấn, triển khai." />
      <LuoiLoc tieuDe="Giải pháp" tabs={["Nhà ở", "Thương mại và lưu trú", "Công trình đặc thù"]} the={THE} ghiChu="Ảnh minh họa, nguồn Pexels. Không phải công trình của WINDUCA." />

      <section className="nen-nga py-14 md:py-20">
        <Wrap>
          <Hien>
            <h2 className="text-[1.6rem] font-bold leading-tight md:text-[1.9rem]">Từ bản vẽ đến nghiệm thu</h2>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-than-chi/75">Năm bước với một đầu mối. Giải pháp WINDUCA đề xuất mang tính tham khảo; kiến trúc sư chịu trách nhiệm thiết kế cuối cùng của công trình.</p>
          </Hien>
          <ol className="relative mt-10 grid gap-8 md:grid-cols-5 md:gap-6">
            <div className="absolute left-0 right-0 top-[0.62rem] hidden h-px bg-than-chi/25 md:block" aria-hidden="true" />
            {QUY_TRINH_5_BUOC.map((b, i) => (
              <Hien key={b.t} as="li" tre={i * 80} className="relative">
                <span className="relative z-10 mb-4 block h-[1.25rem] w-[1.25rem] rounded-full border border-accent bg-nga after:absolute after:inset-[4px] after:rounded-full after:bg-accent" aria-hidden="true" />
                <span className="text-[13px] font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-[17px] font-bold">{b.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-than-chi/75">{b.m}</p>
              </Hien>
            ))}
          </ol>
        </Wrap>
      </section>

      <section className="relative overflow-hidden nen-toi py-14 text-white md:py-20">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <Hien>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <h2 className="max-w-2xl text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold leading-tight">Gửi bản vẽ, nhận đề xuất giải pháp phù hợp</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80">Đội kỹ thuật WINDUCA xem bản vẽ và phản hồi hướng triển khai.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <NutHut href="/danh-cho-kts#tu-van" className="nut nut-chinh">
                  Gửi bản vẽ để tư vấn
                </NutHut>
                <NutHut href="/lien-he" className="nut nut-vien">
                  Liên hệ tư vấn
                </NutHut>
              </div>
            </div>
          </Hien>
        </Wrap>
      </section>
    </>
  );
}
