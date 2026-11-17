import type { NextConfig } from "next";

/**
 * Ba chế độ build:
 *  - Mặc định (dev, Vercel, máy chủ): có API /api/lead, tối ưu ảnh của Next.js.
 *  - GITHUB_PAGES=true (workflow .github/workflows/pages.yml): xuất bản TĨNH lên GitHub Pages
 *    tại https://vinakin.github.io/winduca.com/ — không có API, ảnh không tối ưu.
 *    Workflow tự loại thư mục src/app/api trước khi build vì xuất tĩnh không hỗ trợ route handler.
 *  - STATIC_EXPORT=true (npm run dong-goi): xuất bản TĨNH cho hosting dùng chung (cPanel/Apache) đặt ở GỐC tên miền
 *    (không có basePath). Script tools/trien-khai/dong-goi.mjs tự tạm gỡ src/app/api và đặt các biến NEXT_PUBLIC_*.
 */
const pages = process.env.GITHUB_PAGES === "true";
const goc = process.env.STATIC_EXPORT === "true"; // hosting dùng chung, đặt ở gốc tên miền
const tinh = pages || goc;
const basePath = pages ? "/winduca.com" : "";

const nextConfig: NextConfig = {
  // Xuất bản tĩnh (export) không hỗ trợ PPR, nên tắt hai tùy chọn này ở chế độ GitHub Pages.
  cacheComponents: !tinh,
  partialPrefetching: !tinh,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Ảnh hero dùng chất lượng 60 để nhẹ hơn; cần khai báo thì Next.js mới tối ưu đúng.
  images: { qualities: [60, 75], ...(tinh ? { unoptimized: true } : {}) },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_PREVIEW: tinh ? "true" : "",
  },
  ...(tinh
    ? {
        output: "export" as const,
        ...(pages ? { basePath } : {}),
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
