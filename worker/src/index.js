/**
 * Cloudflare Worker nhận biểu mẫu WINDUCA (thay /api/lead khi web chạy tĩnh trên GitHub Pages).
 *
 * NGUYÊN TẮC DỮ LIỆU KHÁCH (ranh đỏ VinaKIN):
 * - Worker KHÔNG lưu và KHÔNG ghi log tên, SĐT, email, bản vẽ.
 * - Dữ liệu chỉ được chuyển tiếp tới kho mã hóa/CRM VinaKIN qua LEAD_WEBHOOK_URL.
 * - Telegram và email thông báo chỉ ghi MÃ và LOẠI, không có SĐT.
 * - Chưa cấu hình kho nhận => trả 503 (không nuốt dữ liệu âm thầm).
 */

const TIEN_TO = { "sample-box": "SB", showroom: "SR", "ban-ve": "BV", "tai-lieu": "TL", "lien-he": "LH" };
const TEN_LOAI = {
  "sample-box": "Hộp mẫu",
  showroom: "Đặt lịch showroom",
  "ban-ve": "Gửi bản vẽ",
  "tai-lieu": "Tải tài liệu",
  "lien-he": "Liên hệ",
};
const TOI_DA_TEP = 30 * 1024 * 1024;

function corsHeaders(request, env) {
  const cho = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const origin = request.headers.get("Origin") || "";
  const h = { "Cache-Control": "no-store", Vary: "Origin" };
  if (cho.includes(origin)) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type";
    h["Access-Control-Max-Age"] = "86400";
  }
  return { h, hopLe: cho.includes(origin) };
}

function tra(body, status, h) {
  return new Response(JSON.stringify(body), { status, headers: { ...h, "Content-Type": "application/json" } });
}

async function kiemTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET_KEY) return true; // chưa bật Turnstile
  if (!token) return false;
  const fd = new FormData();
  fd.set("secret", env.TURNSTILE_SECRET_KEY);
  fd.set("response", token);
  if (ip) fd.set("remoteip", ip);
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: fd });
    const j = await r.json();
    return j.success === true;
  } catch {
    return false;
  }
}

async function thongBao(env, ma, loai) {
  const text = `Có lead mới: ${ma} (${TEN_LOAI[loai]}). Xem chi tiết trong Command Center.`;
  const tacVu = [];
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    tacVu.push(
      fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
      }),
    );
  }
  if (env.RESEND_API_KEY && env.NOTIFY_EMAIL_TO && env.NOTIFY_EMAIL_FROM) {
    tacVu.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: env.NOTIFY_EMAIL_FROM, to: [env.NOTIFY_EMAIL_TO], subject: `WINDUCA: ${ma}`, text }),
      }),
    );
  }
  await Promise.allSettled(tacVu); // lỗi thông báo không làm hỏng việc tiếp nhận
}

export default {
  async fetch(request, env, ctx) {
    const { h, hopLe } = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: hopLe ? 204 : 403, headers: h });
    if (request.method !== "POST") return tra({ ok: false, error: "phuong-thuc" }, 405, h);
    if (!hopLe) return tra({ ok: false, error: "nguon" }, 403, h);

    let fd;
    try {
      fd = await request.formData();
    } catch {
      return tra({ ok: false, error: "du-lieu" }, 400, h);
    }

    // Bẫy spam: ô "website" phải trống. Giả vờ thành công, không chuyển tiếp.
    if (String(fd.get("website") ?? "") !== "") return tra({ ok: true, ma: "OK-0000" }, 200, h);

    const loai = String(fd.get("loai") ?? "");
    if (!(loai in TIEN_TO)) return tra({ ok: false, error: "loai" }, 400, h);

    const ten = String(fd.get("ten") ?? "").trim();
    const sdt = String(fd.get("sdt") ?? "").replace(/[\s.\-]/g, "");
    if (ten.length < 2 || !/^(\+84|0)(3|5|7|8|9)\d{8}$/.test(sdt)) return tra({ ok: false, error: "du-lieu" }, 400, h);
    if (!fd.get("dongY")) return tra({ ok: false, error: "dong-y" }, 400, h);

    const tep = fd.get("tep");
    if (tep instanceof File && tep.size > TOI_DA_TEP) return tra({ ok: false, error: "tep-qua-lon" }, 413, h);

    const ip = request.headers.get("CF-Connecting-IP") || "";
    if (!(await kiemTurnstile(env, String(fd.get("cf-turnstile-response") ?? ""), ip))) {
      return tra({ ok: false, error: "xac-minh" }, 403, h);
    }

    if (!env.LEAD_WEBHOOK_URL || !env.LEAD_WEBHOOK_SECRET) return tra({ ok: false, error: "chua-cau-hinh" }, 503, h);

    const ma = `${TIEN_TO[loai]}-${1000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 9000)}`;
    fd.delete("website");
    fd.delete("cf-turnstile-response");
    fd.set("ma", ma);
    fd.set("nguon", "winduca.com");

    try {
      const r = await fetch(env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${env.LEAD_WEBHOOK_SECRET}` },
        body: fd,
      });
      if (!r.ok) return tra({ ok: false, error: "kho-tu-choi" }, 502, h);
    } catch {
      return tra({ ok: false, error: "kho-tu-choi" }, 502, h);
    }

    ctx.waitUntil(thongBao(env, ma, loai));
    return tra({ ok: true, ma }, 200, h);
  },
};
