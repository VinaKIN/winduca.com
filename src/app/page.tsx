import { HeroDoors } from "@/components/HeroDoors";
import { CrossSection } from "@/components/CrossSection";

export default function Home() {
  return (
    <>
      <HeroDoors />

      {/* Tuyên ngôn (rút từ bộ nhận diện) */}
      <section className="bg-nga">
        <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44">
          <p className="nhan-muc text-than-chi/70">01 / 09 · Tuyên ngôn</p>
          <p className="tieu-de mt-6 max-w-4xl text-3xl md:text-6xl">
            Chúng tôi chọn sự bền bỉ thay vì phô trương.
          </p>
          <div className="vach-champagne mt-12 max-w-xs" />
        </div>
      </section>

      <CrossSection />

      {/* Chỗ giữ cho các khối làm ở mốc sau: thẻ đối tượng, khối KTS/Chủ nhà/Nhà thầu, quy trình, công trình, form */}
      <section id="dang-ky" className="bg-nga">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <p className="nhan-muc text-than-chi/70">09 / 09 · Đăng ký</p>
          <h2 className="tieu-de mt-4 max-w-2xl text-3xl md:text-5xl">
            Bắt đầu cho ngôi nhà của bạn
          </h2>
          <p className="mt-5 max-w-xl text-than-chi/80">
            Form đăng ký (Sample Box, đặt lịch showroom, gửi bản vẽ) sẽ được làm ở mốc kế tiếp.
            Hiện tại, anh chị có thể gọi hotline <a className="underline" href="tel:0947686668">0947 686 668</a>.
          </p>
        </div>
      </section>
    </>
  );
}
