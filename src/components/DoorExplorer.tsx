"use client";

import { useState } from "react";
import { CrossSection } from "./CrossSection";
import { TrinhDienHeCua } from "./TrinhDienHeCua";
import { MAU_NHOM } from "@/lib/site";

/** Trải nghiệm hệ cửa (màu, đóng/mở, không gian) + mặt cắt 3D dùng chung màu đã chọn. */
export function DoorExplorer({ tenKieuCua, slug }: { tenKieuCua: string; slug: string }) {
  const [chon, setChon] = useState(0);
  return (
    <>
      <TrinhDienHeCua slug={slug} ten={tenKieuCua} chon={chon} setChon={setChon} />
      <CrossSection nhan={`Cấu tạo · ${tenKieuCua}`} tieuDe="Xem tận mắt cấu tạo" mauNhom={MAU_NHOM[chon].hex} />
    </>
  );
}
