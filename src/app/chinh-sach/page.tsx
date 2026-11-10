import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Chính sách | WINDUCA", description: "Các chính sách của WINDUCA: bảo mật, điều khoản, cookie, bảo hành và đối tác." };

const DS = [
  { href: "/chinh-sach-bao-mat", t: "Chính sách bảo mật", m: "Cách chúng tôi thu thập, sử dụng và bảo vệ thông tin." },
  { href: "/dieu-khoan-su-dung", t: "Điều khoản sử dụng", m: "Quy định khi sử dụng website WINDUCA." },
  { href: "/chinh-sach-cookie", t: "Chính sách cookie", m: "Cookie cần thiết và cookie đo lường (chỉ khi đồng ý)." },
  { href: "/chinh-sach-bao-hanh", t: "Bảo hành và hậu mãi", m: "Thời hạn, điều kiện và quy trình hỗ trợ sau bàn giao." },
  { href: "/chinh-sach-doi-tac", t: "Đối tác và đại lý", m: "Điều kiện và quyền lợi hợp tác." },
];

export default function ChinhSachHub() {
  return (
    <>
      <PageHero nhan="Pháp lý" tieuDe="Chính sách của WINDUCA" moTa="Các văn bản đang là bản nháp chờ bộ phận pháp chế duyệt." />
      <Section tone="sang">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DS.map((d, i) => (
            <li key={d.href}>
              <Link href={d.href} className="group block h-full rounded-[22px] border border-than-chi/10 bg-white p-6 transition-shadow hover:shadow-lg">
                <span className="text-3xl font-light text-than-chi/30">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-2 text-xl font-bold group-hover:text-accent">{d.t}</h2>
                <p className="mt-2 text-sm text-than-chi/70">{d.m}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
