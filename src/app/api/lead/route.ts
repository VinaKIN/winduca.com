/**
 * Tiếp nhận biểu mẫu (Sample Box, Showroom, Gửi bản vẽ, Tải tài liệu, Liên hệ).
 *
 * NGUYÊN TẮC DỮ LIỆU KHÁCH (quy tắc dữ liệu khách):
 * - Máy chủ web KHÔNG lưu và KHÔNG ghi log tên, SĐT, email, bản vẽ.
 * - Dữ liệu chỉ được chuyển tiếp tới kho mã hóa/CRM nội bộ qua LEAD_WEBHOOK_URL.
 * - Thông báo Telegram chỉ ghi MÃ và LOẠI, không có SĐT.
 * - Chưa cấu hình kho nhận => trả 503 (không nuốt dữ liệu một cách âm thầm).
 */

const TIEN_TO: Record<string, string> = {
  "sample-box": "SB",
  showroom: "SR",
  "ban-ve": "BV",
  "tai-lieu": "TL",
  "lien-he": "LH",
};

const TEN_LOAI: Record<string, string> = {
  "sample-box": "Hộp mẫu",
  showroom: "Đặt lịch showroom",
  "ban-ve": "Gửi bản vẽ",
  "tai-lieu": "Tải tài liệu",
  "lien-he": "Liên hệ",
};

// Giới hạn tần suất đơn giản theo IP (tốt nhất có thể; môi trường serverless nên thêm Turnstile/WAF).
const lanGui = new Map<string, number[]>();
const GIOI_HAN = 5;
const CUA_SO = 60 * 60 * 1000;

function quaNhieu(ip: string): boolean {
  const now = Date.now();
  const ds = (lanGui.get(ip) ?? []).filter((t) => now - t < CUA_SO);
  if (ds.length >= GIOI_HAN) {
    lanGui.set(ip, ds);
    return true;
  }
  ds.push(now);
  lanGui.set(ip, ds);
  return false;
}

function phanHoi(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return phanHoi({ ok: false, error: "du-lieu" }, 400);
  }

  // Bẫy spam: ô "website" phải trống. Giả vờ thành công, không chuyển tiếp.
  if (String(fd.get("website") ?? "") !== "") {
    return phanHoi({ ok: true, ma: "OK-0000" });
  }

  const loai = String(fd.get("loai") ?? "");
  if (!(loai in TIEN_TO)) return phanHoi({ ok: false, error: "loai" }, 400);

  const ten = String(fd.get("ten") ?? "").trim();
  const sdt = String(fd.get("sdt") ?? "").replace(/[\s.\-]/g, "");
  if (ten.length < 2 || !/^(\+84|0)(3|5|7|8|9)\d{8}$/.test(sdt)) {
    return phanHoi({ ok: false, error: "du-lieu" }, 400);
  }
  if (!fd.get("dongY")) return phanHoi({ ok: false, error: "dong-y" }, 400);

  const tep = fd.get("tep");
  if (tep instanceof File && tep.size > 30 * 1024 * 1024) {
    return phanHoi({ ok: false, error: "tep-qua-lon" }, 413);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "khong-ro";
  if (quaNhieu(ip)) return phanHoi({ ok: false, error: "qua-nhieu" }, 429);

  const url = process.env.LEAD_WEBHOOK_URL;
  const khoa = process.env.LEAD_WEBHOOK_SECRET;
  if (!url || !khoa) {
    return phanHoi({ ok: false, error: "chua-cau-hinh" }, 503);
  }

  const ma = `${TIEN_TO[loai]}-${String(Math.floor(1000 + Math.random() * 9000))}`;
  fd.delete("website");
  fd.set("ma", ma);
  fd.set("nguon", "winduca.com");

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${khoa}` },
      body: fd,
    });
    if (!r.ok) return phanHoi({ ok: false, error: "kho-tu-choi" }, 502);
  } catch {
    return phanHoi({ ok: false, error: "kho-tu-choi" }, 502);
  }

  // Thông báo nội bộ: CHỈ mã và loại, không SĐT.
  const bot = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (bot && chat) {
    try {
      await fetch(`https://api.telegram.org/bot${bot}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chat,
          text: `Có lead mới: ${ma} (${TEN_LOAI[loai]}). Xem chi tiết trong Command Center.`,
        }),
      });
    } catch {
      /* thông báo lỗi không làm hỏng việc tiếp nhận */
    }
  }

  return phanHoi({ ok: true, ma });
}
