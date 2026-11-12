import type { HeCua } from "./he-cua-du-lieu";

/**
 * Ảnh công trình thực tế dùng cho hộp chi tiết hệ cửa (12/11/2026). Anh Huy chịu trách nhiệm bản quyền ảnh lấy từ web;
 * mỗi ảnh vẫn ghi nguồn để dễ kiểm tra và gỡ. Ảnh gắn theo hãng và kiểu hệ (w cửa sổ, d cửa đi, s trượt, l nâng trượt, f xếp gấp,
 * v vách kính), KHÔNG khẳng định công trình dùng đúng mã hệ trừ khi nguồn ghi rõ (`dungMa`).
 */
export type AnhCongTrinh = { src: string; chuThich: string; nguon: string; tenNguon: string; dungMa?: string };

export const ANH_CONG_TRINH: Record<string, AnhCongTrinh[]> = {};

export function anhCongTrinh(r: HeCua): AnhCongTrinh[] {
  const rieng = ANH_CONG_TRINH[`${r.hang}:${r.ma}`];
  if (rieng) return rieng;
  return ANH_CONG_TRINH[`${r.hang}:${r.he.charAt(0)}`] ?? [];
}
