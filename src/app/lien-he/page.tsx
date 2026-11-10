import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, Section } from "@/components/ui";
import { DIA_CHI, EMAIL, HOTLINE, HOTLINE_TEL, MAPS_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Liên hệ | WINDUCA",
  description: "Liên hệ WINDUCA: hotline, Zalo và biểu mẫu. Chúng tôi không hỏi ngân sách và không đăng giá.",
};

export default function LienHe() {
  return (
    <>
      <PageHero nhan="Liên hệ" tieuDe="Trao đổi với chuyên viên WINDUCA." moTa="Chọn chủ đề để chúng tôi chuyển đến đúng người." />
      <Section tone="sang">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="nhan-muc text-than-chi/70">Kênh trực tiếp</p>
            <dl className="mt-6 space-y-6 text-sm">
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
          </div>
          <div>
            <LeadForm loai="lien-he" tone="sang" />
          </div>
        </div>
      </Section>
    </>
  );
}
