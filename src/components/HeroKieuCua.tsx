import Image from "next/image";
import { NenParallax, NutHut } from "./HieuUng";
import { Wrap } from "./ui";
import { asset } from "@/lib/asset";

/**
 * Hero điện ảnh toàn màn hình cho trang kiểu cửa (11/11/2026): ảnh phủ 100% chiều cao, tên kiểu cửa lớn dạng light,
 * dải kính mỏng ghi 3 thông tin chính và nút. Lớp phủ phẳng (không gradient).
 */
export function HeroKieuCua({
  ten,
  tenEn,
  tagline,
  anh,
  thongTin,
}: {
  ten: string;
  tenEn: string;
  tagline: string;
  anh: string;
  thongTin: [string, string][];
}) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-than-chi text-white">
      <NenParallax>
        <Image src={asset(anh)} alt={`${ten} trong không gian kiến trúc`} fill priority quality={75} sizes="100vw" className="object-cover" />
      </NenParallax>
      <div className="absolute inset-0 bg-than-chi/45" aria-hidden="true" />
      <Wrap className="relative pb-6 pt-40 md:pb-10">
        <p className="nhan-tinh text-white/80">
          <b>Hệ cửa</b>
          <i aria-hidden="true" />
          {tenEn}
        </p>
        <h1 className="mt-6 max-w-5xl text-[clamp(2.75rem,7.2vw,6.5rem)] font-light uppercase leading-[0.98] tracking-[-0.02em] [text-wrap:balance]">{ten}</h1>
        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/85 md:text-xl">{tagline}</p>

        <div className="mt-10 grid overflow-hidden rounded-[10px] border border-white/15 bg-than-chi/70 backdrop-blur-xl md:mt-14 md:grid-cols-[1fr_1fr_1.4fr_auto]">
          {thongTin.map(([t, v]) => (
            <div key={t} className="border-b border-white/10 p-5 md:border-b-0 md:border-r md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">{t}</p>
              <p className="mt-2 text-[15px] font-medium leading-snug">{v}</p>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3 p-5 md:p-6">
            <NutHut href="#dang-ky" className="nut nut-chinh">
              Nhận hộp mẫu góc nhôm
            </NutHut>
            <NutHut href="/danh-cho-kts#thu-vien" className="nut nut-vien">
              Tài liệu KTS
            </NutHut>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
