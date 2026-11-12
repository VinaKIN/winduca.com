import type { Metadata } from "next";
import { TinTucTrang } from "@/components/TinTucTrang";

export const metadata: Metadata = { title: "Kiến thức | WINDUCA", description: "Kiến thức kiến trúc, công nghệ cửa và vật liệu từ WINDUCA." };

export default function MucKienThuc() {
  return <TinTucTrang muc="kien-thuc" />;
}
