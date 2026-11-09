"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { BAN_XEM_THU_TINH } from "@/lib/asset";
import { HOTLINE, HOTLINE_TEL, KIEU_CUA, LOAI_CONG_TRINH } from "@/lib/site";

export type LoaiForm = "sample-box" | "showroom" | "ban-ve" | "tai-lieu" | "lien-he";

const CHU_DE = ["Hộp mẫu góc nhôm", "Đặt lịch showroom", "Bóc tách theo bản vẽ", "Tài liệu kỹ thuật", "Khác"];
const VAI_TRO = ["Chủ nhà", "Kiến trúc sư", "Thiết kế nội thất", "Kỹ sư", "Nhà thầu", "Khác"];

const CAU_DONG_Y: Record<LoaiForm, string> = {
  "sample-box":
    "Tôi đồng ý để WINDUCA liên hệ xác nhận và giao hộp mẫu theo thông tin tôi cung cấp, và xử lý dữ liệu theo Chính sách bảo mật.",
  showroom:
    "Tôi đồng ý để WINDUCA liên hệ xác nhận lịch trải nghiệm theo thông tin tôi cung cấp, và xử lý dữ liệu theo Chính sách bảo mật.",
  "ban-ve":
    "Tôi đồng ý để WINDUCA dùng bản vẽ này để tư vấn cho đúng công trình, xóa sau 30 ngày, và xử lý dữ liệu theo Chính sách bảo mật.",
  "tai-lieu": "Tôi đồng ý để WINDUCA lưu thông tin để gửi tài liệu và xử lý dữ liệu theo Chính sách bảo mật.",
  "lien-he": "Tôi đồng ý để WINDUCA liên hệ lại theo thông tin tôi cung cấp, và xử lý dữ liệu theo Chính sách bảo mật.",
};

const NUT: Record<LoaiForm, string> = {
  "sample-box": "Đăng ký nhận hộp mẫu",
  showroom: "Gửi yêu cầu đặt lịch",
  "ban-ve": "Gửi bản vẽ để tư vấn",
  "tai-lieu": "Gửi và tải tài liệu",
  "lien-he": "Gửi liên hệ",
};

type Props = {
  loai: LoaiForm;
  tone?: "sang" | "toi";
  kieuCuaMacDinh?: string;
  /** Gọi sau khi gửi thành công (ví dụ tải tệp). Nếu có thì không chuyển sang /cam-on. */
  khiXong?: (ma: string) => void;
};

export function LeadForm({ loai, tone = "sang", kieuCuaMacDinh = "", khiXong }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [dangGui, setDangGui] = useState(false);
  const [loi, setLoi] = useState<string | null>(null);
  const [loiTruong, setLoiTruong] = useState<Record<string, string>>({});
  const toi = tone === "toi";

  const nhan = `block text-sm font-medium ${toi ? "text-nga" : "text-than-chi"}`;
  const o = `mt-2 w-full rounded-[2px] border px-3 py-3 text-base outline-none transition-colors focus:border-champagne ${
    toi
      ? "border-inox/40 bg-than-chi/40 text-nga placeholder:text-nga/50"
      : "border-than-chi/25 bg-white text-than-chi placeholder:text-than-chi/50"
  }`;
  const phu = `mt-1 text-xs ${toi ? "text-nga/60" : "text-than-chi/60"}`;
  const loiCss = "mt-1 text-xs text-do-do " + (toi ? "!text-[#e0a0a8]" : "");

  async function guiDi(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoi(null);
    const fd = new FormData(e.currentTarget);
    const l: Record<string, string> = {};
    const ten = String(fd.get("ten") ?? "").trim();
    const sdt = String(fd.get("sdt") ?? "").replace(/[\s.\-]/g, "");
    if (ten.length < 2) l.ten = "Vui lòng nhập họ tên.";
    if (!/^(\+84|0)(3|5|7|8|9)\d{8}$/.test(sdt)) l.sdt = "Số điện thoại chưa đúng (10 số, hoặc +84).";
    const email = String(fd.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) l.email = "Email chưa đúng định dạng.";
    if (!fd.get("dongY")) l.dongY = "Cần đồng ý để chúng tôi liên hệ.";
    const tep = fd.get("tep");
    if (tep instanceof File && tep.size > 30 * 1024 * 1024) l.tep = "Tệp tối đa 30MB. Tệp lớn hơn xin gửi qua đường dẫn.";
    setLoiTruong(l);
    if (Object.keys(l).length) return;

    if (BAN_XEM_THU_TINH) {
      setLoi("Bản xem thử tĩnh chưa nhận được biểu mẫu.");
      return;
    }

    fd.set("loai", loai);
    setDangGui(true);
    try {
      const r = await fetch("/api/lead", { method: "POST", body: fd });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; ma?: string; error?: string };
      if (!r.ok || !j.ok) {
        setLoi(
          j.error === "chua-cau-hinh"
            ? `Hệ thống tiếp nhận chưa sẵn sàng. Anh chị vui lòng gọi hotline ${HOTLINE}.`
            : j.error === "qua-nhieu"
              ? "Anh chị đã gửi quá nhiều lần. Vui lòng thử lại sau hoặc gọi hotline."
              : `Chưa gửi được. Anh chị vui lòng thử lại hoặc gọi hotline ${HOTLINE}.`,
        );
        return;
      }
      const ma = j.ma ?? "";
      if (khiXong) khiXong(ma);
      else router.push(`/cam-on?loai=${loai}&ma=${encodeURIComponent(ma)}`);
    } catch {
      setLoi(`Chưa gửi được. Anh chị vui lòng thử lại hoặc gọi hotline ${HOTLINE}.`);
    } finally {
      setDangGui(false);
    }
  }

  const coLoaiCT = loai === "sample-box" || loai === "showroom" || loai === "ban-ve";

  return (
    <form ref={formRef} onSubmit={guiDi} noValidate className="grid gap-5 md:grid-cols-2" aria-label="Biểu mẫu liên hệ">
      {BAN_XEM_THU_TINH && (
        <p className="rounded-sm border border-dashed border-champagne p-3 text-sm md:col-span-2">
          Đây là bản xem thử tĩnh: biểu mẫu chưa gửi được. Anh chị vui lòng gọi hotline {HOTLINE}.
        </p>
      )}
      {/* bẫy spam: người thật không thấy */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className={nhan} htmlFor={`ten-${loai}`}>
          Họ và tên
        </label>
        <input id={`ten-${loai}`} name="ten" autoComplete="name" className={o} required />
        {loiTruong.ten && <p className={loiCss}>{loiTruong.ten}</p>}
      </div>
      <div>
        <label className={nhan} htmlFor={`sdt-${loai}`}>
          Số điện thoại / Zalo
        </label>
        <input id={`sdt-${loai}`} name="sdt" type="tel" inputMode="tel" autoComplete="tel" className={o} required />
        {loiTruong.sdt && <p className={loiCss}>{loiTruong.sdt}</p>}
      </div>

      <div>
        <label className={nhan} htmlFor={`email-${loai}`}>
          Email <span className="font-normal opacity-70">(không bắt buộc)</span>
        </label>
        <input id={`email-${loai}`} name="email" type="email" autoComplete="email" className={o} />
        {loiTruong.email && <p className={loiCss}>{loiTruong.email}</p>}
      </div>

      {(loai === "tai-lieu" || loai === "lien-he" || loai === "ban-ve") && (
        <div>
          <label className={nhan} htmlFor={`vaitro-${loai}`}>
            Bạn là
          </label>
          <select id={`vaitro-${loai}`} name="vaiTro" className={o} defaultValue="">
            <option value="" disabled>
              Chọn
            </option>
            {VAI_TRO.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
      )}

      {loai === "lien-he" && (
        <div>
          <label className={nhan} htmlFor="chude-lien-he">
            Chủ đề
          </label>
          <select id="chude-lien-he" name="chuDe" className={o} defaultValue="">
            <option value="" disabled>
              Chọn
            </option>
            {CHU_DE.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
      )}

      {coLoaiCT && (
        <div>
          <label className={nhan} htmlFor={`loaict-${loai}`}>
            Loại công trình
          </label>
          <select id={`loaict-${loai}`} name="loaiCongTrinh" className={o} defaultValue="">
            <option value="" disabled>
              Chọn
            </option>
            {LOAI_CONG_TRINH.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
      )}

      {(coLoaiCT || loai === "tai-lieu") && (
        <div>
          <label className={nhan} htmlFor={`kieucua-${loai}`}>
            Kiểu cửa quan tâm
          </label>
          <select id={`kieucua-${loai}`} name="kieuCua" className={o} defaultValue={kieuCuaMacDinh}>
            <option value="">Chưa rõ</option>
            {KIEU_CUA.map((k) => (
              <option key={k.slug} value={k.ten}>
                {k.ten}
              </option>
            ))}
          </select>
        </div>
      )}

      {coLoaiCT && (
        <div>
          <label className={nhan} htmlFor={`tinh-${loai}`}>
            Tỉnh/thành <span className="font-normal opacity-70">(không bắt buộc)</span>
          </label>
          <input id={`tinh-${loai}`} name="tinh" autoComplete="address-level1" className={o} />
        </div>
      )}

      {loai === "showroom" && (
        <>
          <div>
            <label className={nhan} htmlFor="ngay-showroom">
              Ngày mong muốn
            </label>
            <input id="ngay-showroom" name="ngay" type="date" className={o} />
          </div>
          <div>
            <label className={nhan} htmlFor="buoi-showroom">
              Buổi
            </label>
            <select id="buoi-showroom" name="buoi" className={o} defaultValue="Sáng">
              <option>Sáng</option>
              <option>Chiều</option>
            </select>
          </div>
          <div>
            <label className={nhan} htmlFor="songuoi-showroom">
              Số người
            </label>
            <input id="songuoi-showroom" name="soNguoi" type="number" min={1} max={20} defaultValue={2} className={o} />
          </div>
        </>
      )}

      {loai === "ban-ve" && (
        <>
          <div>
            <label className={nhan} htmlFor="tencongtrinh">
              Tên công trình
            </label>
            <input id="tencongtrinh" name="tenCongTrinh" className={o} />
          </div>
          <div>
            <label className={nhan} htmlFor="khoiluong">
              Khối lượng ước tính (m²) <span className="font-normal opacity-70">(không bắt buộc)</span>
            </label>
            <input id="khoiluong" name="khoiLuong" inputMode="numeric" className={o} />
          </div>
          <div className="md:col-span-2">
            <label className={nhan} htmlFor="tep-ban-ve">
              Bản vẽ (PDF, DWG, JPG, PNG)
            </label>
            <input id="tep-ban-ve" name="tep" type="file" accept=".pdf,.dwg,.jpg,.jpeg,.png" className={`${o} file:mr-4 file:rounded-[2px] file:border-0 file:bg-champagne file:px-3 file:py-2 file:text-sm file:font-semibold file:text-than-chi`} />
            <p className={phu}>
              Tối đa 30MB. Bản vẽ chỉ dùng để tư vấn cho đúng công trình này, không chia sẻ cho bên thứ ba, xóa sau 30
              ngày; anh chị có thể yêu cầu xóa sớm.
            </p>
            {loiTruong.tep && <p className={loiCss}>{loiTruong.tep}</p>}
          </div>
        </>
      )}

      {(loai === "lien-he" || loai === "ban-ve") && (
        <div className="md:col-span-2">
          <label className={nhan} htmlFor={`ghichu-${loai}`}>
            Nội dung
          </label>
          <textarea id={`ghichu-${loai}`} name="ghiChu" rows={4} className={o} />
        </div>
      )}

      <div className="md:col-span-2">
        <label className={`flex items-start gap-3 text-sm ${toi ? "text-nga/90" : "text-than-chi/85"}`}>
          <input type="checkbox" name="dongY" className="mt-1 h-4 w-4 accent-[#bfa678]" />
          <span>{CAU_DONG_Y[loai]}</span>
        </label>
        {loiTruong.dongY && <p className={loiCss}>{loiTruong.dongY}</p>}
      </div>

      <div className="md:col-span-2">
        {loi && (
          <p role="alert" className={`mb-4 text-sm ${toi ? "text-[#e0a0a8]" : "text-do-do"}`}>
            {loi}{" "}
            <a href={HOTLINE_TEL} className="underline">
              Gọi {HOTLINE}
            </a>
          </p>
        )}
        <button
          type="submit"
          disabled={dangGui}
          className={`nut nut-chinh w-full sm:w-auto ${dangGui ? "opacity-60" : ""}`}
        >
          {dangGui ? "Đang gửi…" : NUT[loai]}
        </button>
        <p className={`${phu} max-w-xl`}>Chúng tôi không hỏi ngân sách và không đăng giá. Chuyên viên sẽ liên hệ trong giờ làm việc.</p>
      </div>
    </form>
  );
}
