import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BAI_SAP_CO } from "@/components/TrangChuKhoi";
import { NhanMinhHoa, PageHero, Section } from "@/components/ui";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Tin tức | WINDUCA",
  description: "Tin tức, kiến thức kỹ thuật và công trình mới từ WINDUCA.",
};

/** Trang Tin tức: lưới thẻ ảnh. Các bài đang để trạng thái "Sắp có" cho đến khi có nội dung thật. */
export default function TinTuc() {
  return (
    <>
      <PageHero
        nhan="Tin tức"
        tieuDe="Kiến thức và câu chuyện công trình"
        moTa="Chuyên mục đang được chuẩn bị. Bài viết đầu tiên sẽ sớm có mặt tại đây."
      />
      <Section tone="sang" nhan="Bài sắp đăng" tieuDe="Chủ đề chúng tôi đang biên soạn">
        <ul className="grid gap-6 md:grid-cols-3">
          {BAI_SAP_CO.map((b) => (
            <li key={b.t}>
              <div className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-than-chi md:rounded-[28px]">
                  <Image src={asset(b.anh)} alt="" fill quality={60} sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" style={{ objectPosition: b.pos }} />
                  <NhanMinhHoa className="left-3 top-3" />
                </div>
                <p className="nhan-muc mt-4 text-accent">{b.loai}</p>
                <h2 className="mt-2 text-lg font-bold leading-snug">{b.t}</h2>
                <p className="mt-1 text-sm text-than-chi/60">Sắp có</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
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
