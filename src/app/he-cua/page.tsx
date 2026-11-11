import type { Metadata } from "next";
import Image from "next/image";
import { HeCuaDanhSach } from "@/components/HeCuaDanhSach";
import { Wrap } from "@/components/ui";
import { asset } from "@/lib/asset";
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
  { src: "/images/he-cua/mau-goc/ponzio-ws-65-thi-g1.webp", nhan: "Ponzio · WS 65 THI", lop: "left-[2%] top-[14%] w-[34%] -rotate-3 opacity-90", sizes: "20vw" },
  { src: "/images/he-cua/mau-goc/romadio-rd80fd-g1.webp", nhan: "Romadio · RD80FD", lop: "right-[0%] top-[18%] w-[34%] rotate-3 opacity-90", sizes: "20vw" },
  { src: "/images/he-cua/mau-goc/civro-xw65-g1.webp", nhan: "Civro · XW65", lop: "left-1/2 top-0 z-10 w-[42%] -translate-x-1/2", sizes: "30vw" },
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
              <h1 className="mt-3 max-w-3xl text-[clamp(1.875rem,3.6vw,3.25rem)] font-medium uppercase leading-[1.12] tracking-[0.01em] [text-wrap:balance]">
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
            <div className="relative mx-auto hidden h-[380px] w-full max-w-[560px] sm:block lg:h-[420px]" aria-hidden="true">
              <div className="absolute inset-x-[8%] bottom-[8%] top-[12%] rounded-full bg-accent/20 blur-[70px]" />
              {NOI_BAT.map((n) => (
                <figure key={n.src} className={`absolute drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)] ${n.lop}`}>
                  <Image src={asset(n.src)} alt="" width={700} height={900} quality={75} sizes={n.sizes} priority className="h-auto w-full" />
                </figure>
              ))}
              <div className="absolute inset-x-0 bottom-0 z-20 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                {NOI_BAT.map((n) => (
                  <span key={n.nhan} className="inline-flex items-center gap-2">
                    <i className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {n.nhan}
                  </span>
                ))}
              </div>
            </div>
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
