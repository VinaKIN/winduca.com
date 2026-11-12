import type { Metadata } from "next";
import { TinTucTrang } from "@/components/TinTucTrang";

export const metadata: Metadata = { title: "Tin hoạt động | WINDUCA", description: "Hoạt động, sự kiện và hợp tác của WINDUCA." };

export default function MucHoatDong() {
  return <TinTucTrang muc="hoat-dong" />;
}
