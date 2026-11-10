import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/** Bản xem thử: chặn công cụ tìm kiếm. Đổi NEXT_PUBLIC_INDEXABLE=true khi go-live (và bỏ noindex trong layout.tsx). */
export default function robots(): MetadataRoute.Robots {
  const mo = process.env.NEXT_PUBLIC_INDEXABLE === "true";
  const goc = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinakin.github.io/winduca.com";
  return mo ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${goc}/sitemap.xml` } : { rules: { userAgent: "*", disallow: "/" } };
}
