import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { TieuDeTrang } from "@/components/TrangMau";
import { Wrap } from "@/components/ui";
import { DIA_CHI, EMAIL, HOTLINE, HOTLINE_TEL, MAPS_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Liên hệ | WINDUCA",
  description: "Liên hệ WINDUCA: hotline, Zalo và biểu mẫu. Chúng tôi không hỏi ngân sách và không đăng giá.",
};

export default function LienHe() {
  return (
    <>
      <TieuDeTrang tieuDe="Trao đổi với chuyên viên WINDUCA" moTa="Chọn chủ đề để chúng tôi chuyển đến đúng người." />
      <section className="bg-white pb-16 md:pb-24">
        <Wrap>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="nhan-muc text-than-chi/70">Kênh trực tiếp</p>
            <dl className="mt-5 space-y-4 text-base">
              <div>
                <dt className="font-semibold">Hotline</dt>
                <dd>
                  <a href={HOTLINE_TEL} className="underline">
                    {HOTLINE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Zalo</dt>
                <dd className="text-than-chi/70">[CHỜ LINK] Zalo OA</dd>
              </div>
              <div>
                <dt className="font-semibold">Email</dt>
                <dd className="text-than-chi/70"><a href={`mailto:${EMAIL}`} className="hover:underline">{EMAIL}</a></dd>
              </div>
              <div>
                <dt className="font-semibold">Showroom</dt>
                <dd className="text-than-chi/70"><a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">{DIA_CHI}</a></dd>
              </div>
            </dl>
            <dl className="mt-4 space-y-4 text-base">
              <div>
                <dt className="font-semibold">Thời gian làm việc</dt>
                <dd className="text-than-chi/70">[CHỜ XÁC NHẬN]</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="nut nut-vien-sang">
                Chỉ đường
              </a>
              <Link href="/trai-nghiem#showroom" className="nut nut-dac">
                Đặt lịch tư vấn
              </Link>
            </div>
          </div>
          <div>
            <p className="nhan-muc text-than-chi/70">Chọn nhu cầu của bạn</p>
            <ul className="mb-5 mt-4 flex flex-wrap gap-2 text-[15px]">
              {[
                ["Tư vấn sản phẩm", "/he-cua"],
                ["Nhận hộp mẫu", "/trai-nghiem#sample-box"],
                ["Gửi bản vẽ kỹ thuật", "/danh-cho-kts#tu-van"],
                ["Đăng ký đại lý, nhà thầu", "/hop-tac#dang-ky-hop-tac"],
                ["Hợp tác kiến trúc sư", "/hop-tac#architect"],
              ].map(([t, h]) => (
                <li key={t}>
                  <Link href={h} className="inline-block rounded-full border border-than-chi/25 px-4 py-2 transition-colors hover:border-accent hover:text-accent">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
            <LeadForm loai="lien-he" tone="sang" />
          </div>
        </div>
        </Wrap>
      </section>
    </>
  );
}
