import type { Metadata } from "next";
import Link from "next/link";
import { CongTrinhLuoi } from "@/components/CongTrinhLuoi";
import { Hien, NutHut } from "@/components/HieuUng";
import { PageHero, Wrap } from "@/components/ui";
import { DU_AN } from "@/lib/du-an";

export const metadata: Metadata = {
  title: "Công trình & cảm hứng kiến trúc | WINDUCA",
  description: "Công trình thực tế của WINDUCA và bộ sưu tập cảm hứng kiến trúc.",
};

/**
 * Hai nhóm nội dung (đề xuất 10/11/2026, mục 5.3), thiết kế lại kiểu công nghệ luxury:
 *  - WINDUCA Projects: công trình đã thực hiện, có dữ liệu và hình ảnh xác thực (chưa có → trạng thái đang cập nhật).
 *  - Architectural Inspiration: bộ sưu tập cảm hứng, KHÔNG nhận là công trình của WINDUCA.
 */
const STROKE = "![-webkit-text-stroke:1px_rgba(227,25,55,0.55)]";

function Dau({ so, nhan }: { so: string; nhan: string }) {
  return (
    <div className="flex items-end gap-4">
      <span className={`so-lon !text-[clamp(3.5rem,7vw,6rem)] leading-[0.85] ${STROKE}`} aria-hidden="true">
        {so}
      </span>
      <p className="nhan-muc pb-2 text-accent">{nhan}</p>
    </div>
  );
}

export default function CongTrinh() {
  return (
    <>
      <PageHero congNghe nhan="Công trình" tieuDe="Dấu ấn kiến trúc qua những không gian sống." anh="/images/architecture/cong-trinh-01.webp" />

      <section className="luoi-ban-ve bg-white py-10 md:py-14">
        <Wrap>
          <Hien>
            <Dau so="01" nhan="WINDUCA Projects" />
            <h2 className="mt-4 text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">
              Công trình <span className="font-bold">WINDUCA đã thực hiện</span>
            </h2>
          </Hien>
          {DU_AN.length > 0 ? (
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {DU_AN.map((d) => (
                <li key={d.slug}>
                  <Link href={`/cong-trinh/du-an/${d.slug}`} className="dau-goc block rounded-[6px] border border-than-chi/10 bg-white p-6 hover:border-accent">
                    <p className="nhan-muc text-accent">
                      {d.loai} · {d.khuVuc}
                    </p>
                    <h3 className="mt-2 text-xl font-bold">{d.ten}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Hien tre={100} className="dau-goc mt-6 grid gap-6 rounded-[6px] border border-dashed border-than-chi/25 p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
              <div>
                <p className="max-w-2xl text-base text-than-chi/80">
                  Công trình thực tế đang được cập nhật. Mỗi công trình sẽ có ảnh tổng thể, ảnh chi tiết cửa, loại công trình, hệ cửa sử dụng, yêu cầu kiến
                  trúc, giải pháp triển khai và kết quả thực tế, khi có hình ảnh và sự đồng ý của chủ đầu tư.
                </p>
                <p className="mt-3 text-sm text-than-chi/60">Khi có ảnh trước và sau thi công cùng góc chụp, bạn sẽ kéo ngang để so sánh ngay trên trang Case Study.</p>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <NutHut href="/lien-he" className="nut nut-chinh">
                  Liên hệ tư vấn
                </NutHut>
                <NutHut href="/giai-phap" className="nut nut-vien-sang">
                  Giải pháp theo công trình
                </NutHut>
              </div>
            </Hien>
          )}
        </Wrap>
      </section>

      <section id="cam-hung" className="bg-nga py-10 md:py-14">
        <Wrap>
          <Hien>
            <Dau so="02" nhan="Architectural Inspiration" />
            <h2 className="mt-4 text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em]">
              Cảm hứng <span className="font-bold">kiến trúc</span>
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-than-chi/65">Bộ sưu tập cảm hứng về không gian có mặt kính lớn. Đây không phải là công trình do WINDUCA thực hiện.</p>
          </Hien>
          <div className="mt-5">
            <CongTrinhLuoi />
          </div>
        </Wrap>
      </section>
    </>
  );
}
