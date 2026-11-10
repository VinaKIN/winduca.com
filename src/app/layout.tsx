import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NutLienHeNhanh } from "@/components/NutLienHeNhanh";
import { asset } from "@/lib/asset";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WINDUCA — Cửa nhôm kiến trúc cao cấp",
  description:
    "Hệ thống nhôm cầu cách nhiệt tiêu chuẩn châu Âu cho biệt thự và penthouse. Nhận hộp mẫu góc nhôm, đặt lịch trải nghiệm.",
  icons: { icon: asset("/brand/WINDUCA-bieu-tuong-mau.svg") },
  // Bản xem thử nội bộ: chặn công cụ tìm kiếm cho tới ngày go-live.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#231f20",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={roboto.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <NutLienHeNhanh />
      </body>
    </html>
  );
}
