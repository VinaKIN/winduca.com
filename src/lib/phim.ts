import type { KeyboardEvent } from "react";

/**
 * Điều hướng bàn phím cho nhóm nút chọn một (role="radiogroup" gồm các role="radio"):
 * ← → ↑ ↓ chuyển chọn và đưa focus theo, Home/End về đầu/cuối. Dùng cùng `tabIndex` kiểu "roving"
 * (chỉ mục đang chọn là 0, còn lại -1). Gắn vào phần tử bọc nhóm: onKeyDown={phimNhomChon}.
 */
export function phimNhomChon(e: KeyboardEvent<HTMLElement>) {
  const k = e.key;
  if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(k)) return;
  const nut = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]'));
  const i = nut.findIndex((b) => b === document.activeElement);
  if (i < 0) return;
  e.preventDefault();
  const tien = k === "ArrowRight" || k === "ArrowDown";
  const n = k === "Home" ? 0 : k === "End" ? nut.length - 1 : (i + (tien ? 1 : -1) + nut.length) % nut.length;
  nut[n].focus();
  nut[n].click();
}
