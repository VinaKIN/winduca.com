import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { NenTuongTac } from "@/components/NenTuongTac";
import { NutLienHeNhanh } from "@/components/NutLienHeNhanh";
import { asset } from "@/lib/asset";
import { HOTLINE } from "@/lib/site";

const GOC = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinakin.github.io/winduca.com";

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
  metadataBase: new URL(GOC),
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "WINDUCA",
    title: "WINDUCA — Cửa nhôm kiến trúc cao cấp",
    description: "Giải pháp cửa nhôm kính kiến trúc cao cấp, đồng bộ từ hệ nhôm, kính, phụ kiện đến thi công hoàn thiện.",
    images: [{ url: asset("/images/hero.jpg"), width: 1536, height: 1024, alt: "Cửa kính khổ lớn mở ra không gian sống" }],
  },
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
        <Analytics />
        <NenTuongTac />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                { "@type": "Organization", name: "WINDUCA", url: GOC, logo: `${GOC}/brand/WINDUCA-bieu-tuong-mau.svg`, telephone: HOTLINE, slogan: "Premium Window & Door" },
                { "@type": "WebSite", name: "WINDUCA", url: GOC, inLanguage: "vi" },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
