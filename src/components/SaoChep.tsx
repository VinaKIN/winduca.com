"use client";

import { useState } from "react";

export function SaoChep({ noiDung }: { noiDung: string }) {
  const [daChep, setDaChep] = useState(false);
  return (
    <button
      type="button"
      className="nut nut-vien-sang !min-h-10 !py-2 text-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(noiDung);
          setDaChep(true);
          setTimeout(() => setDaChep(false), 2000);
        } catch {
          /* trình duyệt chặn clipboard: người dùng tự bôi đen để chép */
        }
      }}
    >
      {daChep ? "Đã sao chép" : "Sao chép"}
    </button>
  );
}
