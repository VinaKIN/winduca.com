import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-than-chi text-nga">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/WINDUCA-chinh-slogan-am-ban.svg"
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
            <p className="nhan-muc text-champagne">Liên hệ</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a href="tel:0947686668">Hotline 0947 686 668</a>
              </li>
              <li className="text-inox">Email: [CHỖ TRỐNG]</li>
              <li className="text-inox">Địa chỉ showroom: [CHỜ XÁC NHẬN]</li>
            </ul>
          </div>

          <div>
            <p className="nhan-muc text-champagne">Pháp lý</p>
            <ul className="mt-5 space-y-2 text-sm text-inox">
              <li>[CHỖ TRỐNG] Tên pháp nhân</li>
              <li>[CHỖ TRỐNG] Mã số thuế</li>
              <li>[CHỖ TRỐNG] Địa chỉ đăng ký</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 h-px bg-champagne" />
        <p className="mt-6 text-xs text-inox">
          © 2026 WINDUCA. Hình ảnh trên trang mang tính minh họa.
        </p>
      </div>
    </footer>
  );
}
