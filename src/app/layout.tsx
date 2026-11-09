import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { asset } from "@/lib/asset";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
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
  themeColor: "#2b2b2d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${montserrat.variable} ${beVietnamPro.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
