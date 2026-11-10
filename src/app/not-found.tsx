import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-than-chi px-5 pb-20 pt-32 text-nga md:px-10">
      {/* Cửa trượt hé mở: chi tiết trang trí */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 flex w-1/2 justify-end">
        <div className="h-full w-1/3 border-l border-inox/30 bg-kinh-suong/10" />
        <div className="ml-6 h-full w-1/3 border-l border-accent bg-kinh-suong/5" />
      </div>
      <div className="relative mx-auto w-full max-w-[1440px]">
        <p className="nhan-muc text-accent">404</p>
        <h1 className="tieu-de mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.1]">Cánh cửa này chưa mở.</h1>
        <p className="mt-5 max-w-xl text-lg text-nga/85">Trang anh chị tìm không tồn tại hoặc đã được chuyển đi.</p>
        <ul className="mt-10 flex flex-col gap-3 sm:flex-row">
          <li>
            <Link href="/" className="nut nut-chinh">
              Về trang chủ
            </Link>
          </li>
          <li>
            <Link href="/he-cua" className="nut nut-vien">
              Xem hệ cửa
            </Link>
          </li>
          <li>
            <Link href="/lien-he" className="nut nut-vien">
              Liên hệ
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
