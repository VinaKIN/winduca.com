import { Hien, NutHut } from "./HieuUng";
import { TinTucDanhSach } from "./TinTucDanhSach";
import { Wrap } from "./ui";
import { MUC_TIN_TUC, THE_BAI, type MucId } from "@/lib/bai-viet";

/**
 * Khung trang Tin tức và 4 chuyên mục con (12/11/2026): đầu trang kiểu tạp chí tối giản trên nền ngà, danh sách tương tác,
 * khối kêu gọi. `muc` chọn sẵn tab của chuyên mục con.
 */
export function TinTucTrang({ muc = "tat-ca" }: { muc?: MucId | "tat-ca" }) {
  const m = MUC_TIN_TUC.find((x) => x.id === muc);
  return (
    <>
      <section className="luoi-ban-ve nen-nga pb-14 pt-28 md:pb-20 md:pt-36">
        <Wrap>
          <Hien>
            <div className="flex items-center justify-between gap-4 pb-5 text-[12px] font-medium uppercase tracking-[0.22em] text-than-chi/70">
              <span className="inline-flex items-center gap-3">
                <i className="h-px w-8 bg-accent" aria-hidden="true" />
                WINDUCA · Tin tức
              </span>
              <span className="hidden sm:inline">{m ? m.ten : "Kiến thức · Hoạt động · Công trình · Tài liệu"}</span>
            </div>
            <div className="grid gap-6 pb-10 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-14">
              <h1 className="text-[clamp(2.3rem,5.4vw,4.6rem)] font-light leading-[1.04] tracking-[-0.02em] [text-wrap:balance]">
                {m ? (
                  <>
                    <span className="font-bold">{m.ten}</span> của WINDUCA
                  </>
                ) : (
                  <>
                    Tin tức và <span className="font-bold">kiến thức.</span>
                  </>
                )}
              </h1>
              <p className="max-w-md text-[16px] leading-relaxed text-than-chi/75 md:justify-self-end">
                {m ? m.mota : "Bài chuyên môn về kiến trúc, công nghệ cửa và vật liệu, viết gọn và dễ đọc. Chọn chuyên mục hoặc tìm theo từ khóa."}
              </p>
            </div>
          </Hien>
          <TinTucDanhSach bai={THE_BAI} mucDau={muc} />
        </Wrap>
      </section>

      <section className="relative overflow-hidden nen-toi py-14 text-white md:py-20">
        <div className="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true" />
        <Wrap className="relative">
          <Hien>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <h2 className="max-w-2xl text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold leading-tight">Cần hỏi thêm về cửa cho công trình của bạn?</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80">Gửi bản vẽ hoặc mô tả không gian, đội kỹ thuật WINDUCA sẽ phản hồi hướng triển khai.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <NutHut href="/danh-cho-kts#tu-van" className="nut nut-chinh">
                  Gửi bản vẽ để tư vấn
                </NutHut>
                <NutHut href="/lien-he" className="nut nut-vien">
                  Liên hệ tư vấn
                </NutHut>
              </div>
            </div>
          </Hien>
        </Wrap>
      </section>
    </>
  );
}
