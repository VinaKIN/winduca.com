import type { Metadata } from "next";
import Link from "next/link";
import { TieuDeTrang } from "@/components/TrangMau";
import { Wrap } from "@/components/ui";

export const metadata: Metadata = { title: "Chính sách | WINDUCA", description: "Các chính sách của WINDUCA: bảo mật, điều khoản, cookie, bảo hành và đối tác." };

const DS = [
  { href: "/chinh-sach-bao-mat", t: "Chính sách bảo mật", m: "Cách chúng tôi thu thập, sử dụng và bảo vệ thông tin." },
  { href: "/dieu-khoan-su-dung", t: "Điều khoản sử dụng", m: "Quy định khi sử dụng website WINDUCA." },
  { href: "/chinh-sach-cookie", t: "Chính sách cookie", m: "Cookie cần thiết và cookie đo lường (chỉ khi đồng ý)." },
  { href: "/chinh-sach-bao-hanh", t: "Bảo hành và hậu mãi", m: "Thời hạn, điều kiện và quy trình hỗ trợ sau bàn giao." },
  { href: "/chinh-sach-doi-tac", t: "Đối tác và đại lý", m: "Điều kiện và quyền lợi hợp tác." },
];

/** Trang Chính sách theo mẫu Winboss (11/11/2026, lần 3): tiêu đề giữa trang, danh sách văn bản gọn. */
export default function ChinhSachHub() {
  return (
    <>
      <TieuDeTrang tieuDe="Chính sách của WINDUCA" moTa="Các văn bản đang là bản nháp chờ bộ phận pháp chế duyệt." />
      <section className="bg-white pb-16 md:pb-24">
        <Wrap>
          <h2 className="text-[1.6rem] font-bold leading-none md:text-[1.9rem]">Văn bản</h2>
          <hr className="mt-4 border-0 border-t border-than-chi/70" />
          <ul className="mt-2 divide-y divide-than-chi/15">
            {DS.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="group grid gap-1 py-5 md:grid-cols-[1fr_1.4fr_auto] md:items-center md:gap-8">
                  <h3 className="text-[17px] font-bold transition-colors group-hover:text-accent">{d.t}</h3>
                  <p className="text-[14.5px] leading-relaxed text-than-chi/75">{d.m}</p>
                  <span className="text-[13px] font-bold text-accent" aria-hidden="true">
                    Xem →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>
    </>
  );
}
