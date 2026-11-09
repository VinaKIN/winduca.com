import type { Metadata } from "next";
import Link from "next/link";
import { MatCat2D } from "@/components/Illustration";
import { PageHero, Section } from "@/components/ui";
import { KIEU_CUA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hệ cửa | WINDUCA",
  description: "Cửa trượt nâng, cửa đi mở quay, cửa xếp trượt và cửa sổ nhôm cầu cách nhiệt tiêu chuẩn châu Âu.",
};

export default function HeCua() {
  return (
    <>
      <PageHero
        nhan="Hệ cửa WINDUCA"
        tieuDe="Chọn kiểu cửa theo cách bạn muốn sống."
        moTa="Bốn kiểu cửa, một ngôn ngữ thiết kế: khung nhôm cầu cách nhiệt tiêu chuẩn châu Âu, hoàn thiện anode hóa hoặc sơn tĩnh điện."
      >
        <Link href="/trai-nghiem#sample-box" className="nut nut-chinh">
          Nhận hộp mẫu góc nhôm
        </Link>
      </PageHero>

      <Section tone="sang" nhan="Kiểu cửa">
        <ul className="grid gap-6 md:grid-cols-2">
          {KIEU_CUA.map((k, i) => (
            <li key={k.slug} className={i % 2 === 1 ? "md:mt-16" : ""}>
              <Link
                href={`/he-cua/${k.slug}`}
                className="group block border border-than-chi/20 transition-colors duration-300 hover:border-champagne"
              >
                <MatCat2D className="aspect-[16/10] border-0" />
                <div className="p-7">
                  <h2 className="tieu-de text-2xl">{k.ten}</h2>
                  <p className="mt-2 text-than-chi/80">{k.tagline}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {k.dacDiem.map((d) => (
                      <li key={d} className="border border-than-chi/20 px-2 py-1 text-xs">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold">
                    Xem kiểu cửa
                    <span className="h-2 w-2 rotate-45 bg-champagne transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="nga" nhan="Chọn theo nhu cầu" tieuDe="Kiểu cửa nào phù hợp với không gian của bạn?">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-than-chi/20 text-than-chi/70">
                <th className="py-3 pr-4 font-semibold">Kiểu cửa</th>
                <th className="py-3 pr-4 font-semibold">Không gian phù hợp</th>
                <th className="py-3 pr-4 font-semibold">Khẩu độ</th>
                <th className="py-3 font-semibold">Cách mở</th>
              </tr>
            </thead>
            <tbody>
              {KIEU_CUA.map((k) => (
                <tr key={k.slug} className="border-b border-than-chi/10 align-top">
                  <td className="py-4 pr-4 font-semibold">
                    <Link href={`/he-cua/${k.slug}`} className="underline">
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
          <Link href="/lien-he" className="underline">
            Nhờ chuyên gia tư vấn kiểu cửa phù hợp
          </Link>
          .
        </p>
      </Section>

      <Section tone="sang" nhan="Nhôm cầu cách nhiệt là gì?" tieuDe="Ba bước để nhiệt không đi thẳng vào nhà.">
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            ["Hai nửa khung nhôm", "Khung được chia thành một nửa phía ngoài và một nửa phía trong."],
            ["Thanh cầu cách nhiệt", "Một thanh polyamide nối hai nửa, ngăn nhiệt truyền thẳng qua kim loại."],
            ["Kính hộp và gioăng", "Kính hộp cùng gioăng ôm sát giúp bộ cửa kín và êm dịu hơn."],
          ].map(([t, m], i) => (
            <li key={t} className="border-t border-champagne pt-6">
              <span className="nhan-muc text-than-chi/60">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="tieu-de mt-3 text-xl">{t}</h3>
              <p className="mt-2 text-than-chi/80">{m}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
