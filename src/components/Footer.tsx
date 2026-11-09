import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { HOTLINE, HOTLINE_TEL, MENU } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-than-chi text-nga">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src={asset("/brand/WINDUCA-chinh-slogan-am-ban.svg")}
              alt="WINDUCA — Premium Window & Door"
              width={220}
              height={190}
              className="h-auto w-44 md:w-52"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-inox">
              WINDUCA là thương hiệu thuộc VinaKIN Group.
            </p>
          </div>

          <div>
            <p className="nhan-muc text-champagne">Trang</p>
            <ul className="mt-5 space-y-2 text-sm">
              {MENU.map((m) => (
                <li key={m.href}>
                  <Link href={m.href}>{m.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="nhan-muc text-champagne">Liên hệ</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a href={HOTLINE_TEL}>Hotline {HOTLINE}</a>
              </li>
              <li className="text-inox">Email: [CHỖ TRỐNG]</li>
              <li className="text-inox">Địa chỉ showroom: [CHỜ XÁC NHẬN]</li>
            </ul>
          </div>

          <div>
            <p className="nhan-muc text-champagne">Pháp lý</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung">Điều khoản sử dụng</Link>
              </li>
              <li>
                <Link href="/chinh-sach-cookie">Chính sách cookie</Link>
              </li>
              <li className="pt-2 text-inox">[CHỖ TRỐNG] Tên pháp nhân · MST · Địa chỉ</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 h-px bg-champagne" />
        <p className="mt-6 text-xs text-inox">© 2026 WINDUCA. Hình ảnh trên trang mang tính minh họa.</p>
      </div>
    </footer>
  );
}
