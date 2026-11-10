import type { MetadataRoute } from "next";
import { CONG_TRINH_MINH_HOA, KIEU_CUA } from "@/lib/site";

export const dynamic = "force-static";

const GOC = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinakin.github.io/winduca.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const tinh = ["", "/gioi-thieu", "/he-cua", "/nang-luc-xuong", "/cong-trinh", "/hop-tac", "/tin-tuc", "/trai-nghiem", "/danh-cho-kts", "/lien-he"];
  const trang = [
    ...tinh,
    ...KIEU_CUA.map((k) => `/he-cua/${k.slug}`),
    ...CONG_TRINH_MINH_HOA.map((c) => `/cong-trinh/${c.slug}`),
  ];
  return trang.map((p) => ({ url: `${GOC}${p}/`.replace(/\/\/$/, "/") }));
}
