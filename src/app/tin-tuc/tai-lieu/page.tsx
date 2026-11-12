import type { Metadata } from "next";
import { TinTucTrang } from "@/components/TinTucTrang";

export const metadata: Metadata = { title: "Tài liệu | WINDUCA", description: "Catalog, hồ sơ kỹ thuật và bảng màu của WINDUCA." };

export default function MucTaiLieu() {
  return <TinTucTrang muc="tai-lieu" />;
}
