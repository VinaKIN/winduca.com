# winduca-lead — Cloudflare Worker nhận biểu mẫu

Thay `/api/lead` cho bản GitHub Pages (tĩnh). Triển khai:

```bash
cd worker
npx wrangler login
npx wrangler secret put LEAD_WEBHOOK_URL
npx wrangler secret put LEAD_WEBHOOK_SECRET
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler secret put TURNSTILE_SECRET_KEY   # khi đã tạo widget Turnstile
npx wrangler deploy
```

Sau khi deploy, đặt `NEXT_PUBLIC_LEAD_ENDPOINT=https://winduca-lead.<tài-khoản>.workers.dev` cho bước build Pages
(biến Actions) và, khi có Turnstile, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Cập nhật `ALLOWED_ORIGINS` nếu đổi tên miền.

Dữ liệu khách không lưu trên Worker; thông báo Telegram/email chỉ có mã và loại. Cần: tài khoản Cloudflare,
kho nhận (`LEAD_WEBHOOK_URL`, chưa có), token bot Telegram, email chung (chưa có).
