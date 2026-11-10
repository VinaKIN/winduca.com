import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tin tức | WINDUCA",
  description: "Tin tức, kiến thức kỹ thuật và công trình mới từ WINDUCA.",
};

export default function TinTuc() {
  return (
    <>
      <PageHero
        nhan="Tin tức"
        tieuDe="Kiến thức và câu chuyện công trình."
        moTa="Chuyên mục đang được chuẩn bị. Bài viết đầu tiên sẽ sớm có mặt tại đây."
      />
      <Section tone="sang" nhan="Sắp có">
        <p className="max-w-xl text-base text-than-chi/80">
          Trong lúc chờ, anh chị có thể xem các kiểu cửa hoặc để lại thông tin để nhận cập nhật sớm nhất.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/he-cua" className="nut nut-dac">
            Xem các hệ cửa
          </Link>
          <Link href="/lien-he" className="nut nut-vien-sang">
            Liên hệ nhận thông tin
          </Link>
        </div>
      </Section>
    </>
  );
}
