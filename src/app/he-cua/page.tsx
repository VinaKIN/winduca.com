import type { Metadata } from "next";
import Link from "next/link";
import { HeCuaDanhSach } from "@/components/HeCuaDanhSach";
import { PageHero, Section, Wrap } from "@/components/ui";
import { KIEU_CUA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hệ cửa | WINDUCA",
  description: "Cửa trượt nâng, cửa đi mở quay, cửa xếp trượt và cửa sổ nhôm cầu cách nhiệt tiêu chuẩn châu Âu.",
};

/** Trang Hệ cửa theo bố cục Winboss: hero ảnh → thẻ trắng bo góc có bộ lọc + lưới thẻ → bảng chọn → giải thích. */
export default function HeCua() {
  return (
    <>
      <PageHero
        nhan="Hệ cửa WINDUCA"
        tieuDe="Chọn kiểu cửa theo cách bạn muốn sống"
        moTa="Bốn kiểu cửa, một ngôn ngữ thiết kế: khung nhôm cầu cách nhiệt tiêu chuẩn châu Âu, hoàn thiện anode hóa hoặc sơn tĩnh điện."
      >
        <Link href="/trai-nghiem#sample-box" className="nut nut-chinh">
          Nhận hộp mẫu góc nhôm
        </Link>
      </PageHero>

      <section className="bg-nga py-12 md:py-20">
        <Wrap>
          <HeCuaDanhSach />
        </Wrap>
      </section>

      <Section tone="sang" nhan="Chọn theo nhu cầu" tieuDe="Kiểu cửa nào phù hợp với không gian của bạn?">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-than-chi/20 text-than-chi/70">
                <th className="py-3 pr-4 font-bold">Kiểu cửa</th>
                <th className="py-3 pr-4 font-bold">Không gian phù hợp</th>
                <th className="py-3 pr-4 font-bold">Khẩu độ</th>
                <th className="py-3 font-bold">Cách mở</th>
              </tr>
            </thead>
            <tbody>
              {KIEU_CUA.map((k) => (
                <tr key={k.slug} className="border-b border-than-chi/10 align-top">
                  <td className="py-4 pr-4 font-bold">
                    <Link href={`/he-cua/${k.slug}`} className="underline hover:text-accent">
                      {k.ten}
                    </Link>
                  </td>
                  <td className="py-4 pr-4 text-than-chi/85">{k.khongGian.join(" · ")}</td>
                  <td className="py-4 pr-4 text-than-chi/85">{k.khauDo}</td>
                  <td className="py-4 text-than-chi/85">{k.cachMo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-than-chi/70">
          Bảng chỉ mang tính tham khảo theo nhu cầu sử dụng.{" "}
          <Link href="/lien-he" className="underline hover:text-accent">
            Nhờ chuyên gia tư vấn kiểu cửa phù hợp
          </Link>
          .
        </p>
      </Section>

      <Section tone="nga" nhan="Nhôm cầu cách nhiệt là gì?" tieuDe="Ba bước để nhiệt không đi thẳng vào nhà.">
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            ["Hai nửa khung nhôm", "Khung được chia thành một nửa phía ngoài và một nửa phía trong."],
            ["Thanh cầu cách nhiệt", "Một thanh polyamide nối hai nửa, ngăn nhiệt truyền thẳng qua kim loại."],
            ["Kính hộp và gioăng", "Kính hộp cùng gioăng ôm sát giúp bộ cửa kín và êm dịu hơn."],
          ].map(([t, m], i) => (
            <li key={t} className="border-t-2 border-accent pt-6">
              <span className="nhan-muc text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-bold">{t}</h3>
              <p className="mt-2 text-than-chi/80">{m}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
