import type { NextConfig } from "next";

/**
 * Hai chế độ build:
 *  - Mặc định (dev, Vercel, máy chủ): có API /api/lead, tối ưu ảnh của Next.js.
 *  - GITHUB_PAGES=true (workflow .github/workflows/pages.yml): xuất bản TĨNH lên GitHub Pages
 *    tại https://vinakin.github.io/winduca.com/ — không có API, ảnh không tối ưu.
 *    Workflow tự loại thư mục src/app/api trước khi build vì xuất tĩnh không hỗ trợ route handler.
 */
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? "/winduca.com" : "";

const nextConfig: NextConfig = {
  // Xuất bản tĩnh (export) không hỗ trợ PPR, nên tắt hai tùy chọn này ở chế độ GitHub Pages.
  cacheComponents: !pages,
  partialPrefetching: !pages,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_PREVIEW: pages ? "true" : "",
  },
  ...(pages
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
