import Image from "next/image";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import { NenParallax } from "./HieuUng";
import { Wrap } from "./ui";

/**
 * Khối nền ảnh tối kiểu "kính mờ" (10/11/2026): ảnh toàn khung làm tối bằng nhiều lớp chuyển sắc,
 * quầng đỏ rất nhẹ, lưới bản vẽ mờ; nội dung đặt trên thẻ kính (.the-kinh).
 */
export function NenAnh({
  anh,
  viTri = "center",
  id,
  children,
  className = "",
}: {
  anh: string;
  viTri?: string;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`nen-ky-thuat relative isolate overflow-hidden bg-[#121011] text-white ${className}`}>
      <NenParallax>
        <Image src={asset(anh)} alt="" fill quality={60} sizes="100vw" className="scale-105 object-cover opacity-40 blur-[4px]" style={{ objectPosition: viTri }} aria-hidden="true" />
      </NenParallax>
      <div className="nen-anh-phu absolute inset-0" aria-hidden="true" />
      <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <Wrap className="relative khoi-doc">{children}</Wrap>
    </section>
  );
}
