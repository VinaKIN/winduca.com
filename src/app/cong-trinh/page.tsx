import type { Metadata } from "next";
import { Hien, NutHut } from "@/components/HieuUng";
import { LuoiLoc, TieuDeTrang, type TheAnh } from "@/components/TrangMau";
import { Wrap } from "@/components/ui";
import { DU_AN } from "@/lib/du-an";
import { CONG_TRINH_MINH_HOA, LOAI_DU_AN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Công trình & cảm hứng kiến trúc | WINDUCA",
  description: "Công trình thực tế của WINDUCA và bộ sưu tập cảm hứng kiến trúc.",
};

/**
 * Trang Công trình theo mẫu Winboss (11/11/2026, lần 3): tiêu đề giữa trang, tab lọc theo loại hình, lưới thẻ ảnh ba cột.
 *  - Công trình thực tế (DU_AN): hiện khi có dữ liệu xác thực. Hiện danh sách rỗng nên chỉ có phần cảm hứng.
 *  - Cảm hứng kiến trúc: 12 mục MINH HỌA, KHÔNG nhận là công trình của WINDUCA.
 */
const THE_THAT: TheAnh[] = DU_AN.map((d) => ({ id: d.slug, tab: [d.loai], ten: d.ten, mota: `${d.loai} · ${d.khuVuc}`, anh: d.anhTongThe, href: `/cong-trinh/du-an/${d.slug}` }));

const THE_CAM_HUNG: TheAnh[] = CONG_TRINH_MINH_HOA.map((c, i) => ({
  id: c.slug,
  tab: [c.loai],
  ten: c.ten,
  mota: `${c.khuVuc} · ${c.kieuCua}. Ảnh cảm hứng kiến trúc.`,
  anh: `/images/architecture/cong-trinh-${String(i + 1).padStart(2, "0")}.webp`,
  href: `/cong-trinh/${c.slug}`,
}));

export default function CongTrinh() {
  const coThat = THE_THAT.length > 0;
  return (
    <>
      <TieuDeTrang tieuDe="Công trình tiêu biểu" moTa="Công trình thực tế của WINDUCA và những không gian có mặt kính lớn làm cảm hứng kiến trúc." />
      <LuoiLoc
        tieuDe="Công trình"
        tabs={[...LOAI_DU_AN]}
        the={[...THE_THAT, ...THE_CAM_HUNG]}
        ghiChu={coThat ? undefined : "Công trình thực tế của WINDUCA đang được cập nhật. Các ảnh dưới đây là cảm hứng kiến trúc, không phải công trình do WINDUCA thực hiện."}
      />

      <section className="relative overflow-hidden nen-toi py-14 text-white md:py-20">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <Hien>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <h2 className="max-w-2xl text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold leading-tight">Công trình của bạn là câu chuyện tiếp theo</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80">Chọn giải pháp theo loại công trình hoặc gửi bản vẽ để được tư vấn.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <NutHut href="/giai-phap" className="nut nut-chinh">
                  Giải pháp theo công trình
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
