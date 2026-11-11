import type { Metadata } from "next";
import { HeCuaDanhSach } from "@/components/HeCuaDanhSach";
import { HeroBangChuyen } from "@/components/HeroBangChuyen";
import { Wrap } from "@/components/ui";
import { HE_CUA_DS } from "@/lib/he-cua-du-lieu";

export const metadata: Metadata = {
  title: "Hệ cửa | WINDUCA",
  description: "Chọn hệ cửa nhôm kính theo thông số kỹ thuật: lọc theo hãng, hệ thống, kết cấu và chức năng, so sánh tối đa 3 hệ để so nhanh.",
};

/**
 * Trang Hệ cửa (thiết kế lại 11/11/2026): banner tối có ba mẫu góc nổi, rồi một khung công cụ (tab hãng, tìm kiếm, lọc),
 * lưới thẻ có sân khấu sáng cho ảnh mẫu góc, phân trang, so sánh và hộp chi tiết.
 */
const NOI_BAT = [
  { src: "/images/he-cua/mau-goc/civro-xw65-g1.webp", hang: "Civro", ma: "XW65" },
  { src: "/images/he-cua/mau-goc/romadio-rd80fd-g1.webp", hang: "Romadio", ma: "RD80FD" },
  { src: "/images/he-cua/mau-goc/ponzio-ws-65-thi-g1.webp", hang: "Ponzio", ma: "WS 65 THI" },
  { src: "/images/he-cua/mau-goc/romadio-rct65-g1.webp", hang: "Romadio", ma: "RCT65" },
  { src: "/images/he-cua/mau-goc/civro-xd65-g1.webp", hang: "Civro", ma: "XD65" },
];

export default function HeCua() {
  const coMauGoc = HE_CUA_DS.filter((r) => r.anh.c.length > 0).length;
  return (
    <>
      <section className="hero-gradient relative overflow-hidden text-white">
        <div className="hero-phu absolute inset-0" aria-hidden="true" />
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="hero-duong-sang pointer-events-none absolute inset-x-0 bottom-0 h-px" aria-hidden="true" />
        <Wrap className="relative pb-10 pt-28 md:pb-12 md:pt-36">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div>
              <p className="nhan-muc text-accent">Hệ cửa nhôm kính · Romadio · Civro · Ponzio</p>
              <h1 className="mt-3 max-w-3xl text-[clamp(1.875rem,3.6vw,3.25rem)] font-bold leading-[1.15] [text-wrap:balance]">
                Chọn hệ cửa theo thông số kỹ thuật
              </h1>
              <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-white/80 md:text-lg">
                Lọc theo hãng, kết cấu, chức năng và hệ thống. Mỗi hệ hiển thị chỉ số do hãng công bố để so sánh nhanh.
              </p>
              <dl className="mt-7 flex flex-wrap gap-x-9 gap-y-4 border-t border-white/15 pt-6">
                {[
                  [String(HE_CUA_DS.length), "hệ cửa"],
                  ["3", "hãng"],
                  [String(coMauGoc), "hệ có mẫu góc 3D"],
                ].map(([so, nhan]) => (
                  <div key={nhan}>
                    <dd className="text-3xl font-light tabular-nums md:text-4xl">{so}</dd>
                    <dt className="mt-1 text-[12px] font-medium uppercase tracking-[0.16em] text-white/60">{nhan}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <HeroBangChuyen mau={NOI_BAT} />
          </div>
        </Wrap>
      </section>

      <section className="nen-sang luoi-ban-ve">
        <Wrap className="relative pb-20 pt-8 md:pb-28 md:pt-10">
          <HeCuaDanhSach />
        </Wrap>
      </section>
    </>
  );
}
