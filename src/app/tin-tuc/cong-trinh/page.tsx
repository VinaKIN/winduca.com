import type { Metadata } from "next";
import { TinTucTrang } from "@/components/TinTucTrang";

export const metadata: Metadata = { title: "Câu chuyện công trình | WINDUCA", description: "Công trình và giải pháp triển khai của WINDUCA." };

export default function MucCongTrinh() {
  return <TinTucTrang muc="cong-trinh" />;
}
