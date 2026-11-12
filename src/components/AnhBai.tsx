import Image from "next/image";
import { asset } from "@/lib/asset";
import { mauChuDe } from "@/lib/bai-viet";

/**
 * Ruột khung ảnh bài viết, dùng chung cho thẻ, bài nổi bật và trang bài (12/11/2026). Đặt trong phần tử cha có
 * `relative overflow-hidden`. Ảnh kỹ thuật của WINDUCA (mẫu 3D, bản vẽ 2D nền trong) nằm trên nền tối kẻ lưới kiểu
 * bản vẽ, giữ nguyên tỉ lệ; ảnh còn lại phủ kín khung. Thanh mảnh dưới ảnh mang màu của chủ đề.
 */
export function AnhBai({ anh, kieu, chuDe, sizes, quality = 65, priority = false, zoom = "group-hover:scale-[1.06]" }: { anh: string; kieu?: "ky-thuat"; chuDe: string; sizes: string; quality?: number; priority?: boolean; zoom?: string }) {
  const kt = kieu === "ky-thuat";
  return (
    <>
      {kt && <span className="luoi-ban-ve-toi absolute inset-0 bg-than-chi" aria-hidden="true" />}
      <Image
        src={asset(anh)}
        alt=""
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={`${kt ? "object-contain p-[7%]" : "object-cover"} transition-transform duration-300 ease-out ${zoom}`}
      />
      {!kt && <span className="absolute inset-0 bg-[#1b1d22]/10 mix-blend-multiply" aria-hidden="true" />}
      {kt && (
        <>
          <span className="absolute left-2.5 top-2.5 h-3 w-3 border-l border-t border-white/45" aria-hidden="true" />
          <span className="absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-white/45" aria-hidden="true" />
        </>
      )}
      <span className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: mauChuDe(chuDe).thanh }} aria-hidden="true" />
    </>
  );
}
