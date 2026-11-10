import type { ReactNode } from "react";
import { MANG_XA_HOI } from "@/lib/site";

const ICON: Record<string, ReactNode> = {
  facebook: (
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1z" fill="currentColor" stroke="none" />
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: <path d="M14 4v10.2a3.2 3.2 0 1 1-3.2-3.2M14 4c.4 2.4 2 3.8 4.5 4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />,
  zalo: (
    <>
      <path d="M5 6.5C5 5.7 5.7 5 6.5 5h11c.8 0 1.5.7 1.5 1.5v8c0 .8-.7 1.5-1.5 1.5H11l-3.5 3v-3h-1C5.7 16 5 15.3 5 14.5z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 9h4l-4 4.5h4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

/** Hàng icon mạng xã hội. Mạng chưa có đường dẫn hiển thị mờ (chưa bấm được) cho tới khi anh Huy cung cấp link. */
export function MangXaHoi({ lop = "" }: { lop?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${lop}`} aria-label="Mạng xã hội">
      {MANG_XA_HOI.map((m) => {
        const bieuTuong = (
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            {ICON[m.id]}
          </svg>
        );
        const chung = "flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-colors";
        return (
          <li key={m.id}>
            {m.url ? (
              <a href={m.url} target="_blank" rel="noopener noreferrer" aria-label={m.ten} className={`${chung} text-white hover:border-accent hover:bg-accent`}>
                {bieuTuong}
              </a>
            ) : (
              <span title={`${m.ten}: đang cập nhật liên kết`} aria-label={`${m.ten} (đang cập nhật liên kết)`} role="img" className={`${chung} cursor-not-allowed text-white/35`}>
                {bieuTuong}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
