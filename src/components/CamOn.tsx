"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HOTLINE, HOTLINE_TEL } from "@/lib/site";

const NOI_DUNG: Record<string, { tieuDe: string; mota: string }> = {
  "sample-box": {
    tieuDe: "Cảm ơn anh chị đã đăng ký hộp mẫu.",
    mota: "Chuyên viên sẽ liên hệ xác nhận và hỏi địa chỉ nhận hộp qua điện thoại.",
  },
  showroom: {
    tieuDe: "Cảm ơn anh chị đã đặt lịch trải nghiệm.",
    mota: "Chuyên viên sẽ liên hệ để xác nhận giờ cụ thể.",
  },
  "ban-ve": {
    tieuDe: "Cảm ơn anh chị đã gửi bản vẽ.",
    mota: "Đội kỹ thuật sẽ xem bản vẽ và liên hệ trao đổi. Bản vẽ chỉ dùng để tư vấn và được xóa sau 30 ngày.",
  },
  "tai-lieu": {
    tieuDe: "Cảm ơn anh chị đã đăng ký nhận tài liệu.",
    mota: "Chúng tôi sẽ gửi tài liệu khi có tệp.",
  },
  "lien-he": {
    tieuDe: "Cảm ơn anh chị đã liên hệ.",
    mota: "Chuyên viên sẽ phản hồi trong giờ làm việc.",
  },
};

export function CamOn() {
  const sp = useSearchParams();
  const loai = sp.get("loai") ?? "lien-he";
  const ma = sp.get("ma") ?? "";
  const nd = NOI_DUNG[loai] ?? NOI_DUNG["lien-he"];
  return (
    <section className="bg-than-chi px-5 pb-24 pt-40 text-nga md:px-10 md:pt-52">
      <div className="mx-auto max-w-[1440px]">
        <p className="nhan-muc text-accent">Đã nhận</p>
        <h1 className="tieu-de mt-4 max-w-3xl text-4xl md:text-6xl">{nd.tieuDe}</h1>
        <p className="mt-6 max-w-2xl text-nga/85">{nd.mota}</p>
        {ma && <p className="mt-6 text-sm text-nga/60">Mã tiếp nhận: {ma}</p>}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={HOTLINE_TEL} className="nut nut-chinh">
            Gọi {HOTLINE}
          </a>
          <Link href="/" className="nut nut-vien">
            Về trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
}
