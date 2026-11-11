import type { Metadata } from "next";
import Link from "next/link";
import { LuoiLoc, TieuDeTrang, type TheAnh } from "@/components/TrangMau";
import { Wrap } from "@/components/ui";
import { BAI_VIET } from "@/lib/bai-viet";

export const metadata: Metadata = {
  title: "Tin tức | WINDUCA",
  description: "Kiến thức chuyên môn, tin hoạt động, câu chuyện công trình và tài liệu từ WINDUCA.",
};

/** Trang Tin tức theo mẫu Winboss (11/11/2026, lần 3): tiêu đề giữa trang, tab lọc theo chuyên mục, lưới thẻ bài viết ba cột. */
const MUC = [
  { href: "/tin-tuc/kien-thuc", t: "Kiến thức" },
  { href: "/tin-tuc/hoat-dong", t: "Tin hoạt động và sự kiện" },
  { href: "/tin-tuc/cong-trinh", t: "Câu chuyện công trình" },
  { href: "/tin-tuc/tai-lieu", t: "Tài liệu và tải về" },
];

const TAB = [...new Set(BAI_VIET.map((b) => b.chuyenMuc))];
const THE: TheAnh[] = BAI_VIET.map((b) => ({ id: b.slug, tab: [b.chuyenMuc], ten: b.tieuDe, mota: b.tomTat, anh: b.anh, href: `/tin-tuc/${b.slug}` }));

export default function TinTuc() {
  return (
    <>
      <TieuDeTrang tieuDe="Tin tức và kiến thức" moTa="Bài chuyên môn về kiến trúc, công nghệ cửa, vật liệu và hoạt động của WINDUCA." />
      <LuoiLoc tieuDe="Bài viết" tabs={TAB} the={THE} />
      <section className="nen-nga py-10 md:py-14">
        <Wrap>
          <h2 className="text-[1.25rem] font-bold">Các chuyên mục</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {MUC.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="inline-block rounded-full border border-than-chi/25 bg-white px-5 py-2 text-[14px] transition-colors hover:border-accent hover:text-accent">
                  {m.t}
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>
    </>
  );
}
