"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { asset } from "@/lib/asset";
import { MUC_TIN_TUC, type MucId, type TheBai } from "@/lib/bai-viet";

/**
 * Danh sách Tin tức kiểu tạp chí tối giản (12/11/2026): tab chuyên mục có số bài, ô tìm kiếm không phân biệt dấu,
 * một bài nổi bật lớn rồi lưới bài nhỏ. Đổi tab hoặc gõ tìm thì các thẻ hiện lại lần lượt. Rê chuột: thẻ nâng nhẹ,
 * ảnh phóng chậm, mũi tên "Đọc bài" trượt ra. Mục chưa có bài hiện trạng thái đang cập nhật, không bịa bài.
 */
const bo = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").toLowerCase();

const SE_CO: Record<MucId, string[]> = {
  "kien-thuc": [],
  "hoat-dong": ["Ra mắt sản phẩm và giải pháp mới.", "Sự kiện, triển lãm và buổi giới thiệu cho kiến trúc sư.", "Hoạt động hợp tác với đối tác, đại lý và nhà thầu."],
  "cong-trinh": ["Yêu cầu kiến trúc, giải pháp triển khai và kết quả thực tế.", "Chỉ đăng khi có hình ảnh thật và sự đồng ý của chủ đầu tư."],
  "tai-lieu": ["Catalog và hồ sơ kỹ thuật đã được kiểm duyệt.", "Bảng màu hoàn thiện và thư viện bản vẽ."],
};

function MuiTen() {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-than-chi transition-colors group-hover:text-accent">
      Đọc bài
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

function Meta({ b }: { b: TheBai }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-than-chi/70">
      <span className="font-bold uppercase tracking-[0.14em] text-accent">{b.chuDe}</span>
      <i className="h-[3px] w-[3px] rounded-full bg-than-chi/40" aria-hidden="true" />
      <span>{b.phut} phút đọc</span>
      <i className="h-[3px] w-[3px] rounded-full bg-than-chi/40" aria-hidden="true" />
      <time>{b.ngay}</time>
    </p>
  );
}

export function TinTucDanhSach({ bai, mucDau = "tat-ca" }: { bai: TheBai[]; mucDau?: MucId | "tat-ca" }) {
  const [muc, setMuc] = useState<MucId | "tat-ca">(mucDau);
  const [tim, setTim] = useState("");
  const idTim = useId();

  const dem = useMemo(() => {
    const d: Record<string, number> = { "tat-ca": bai.length };
    for (const m of MUC_TIN_TUC) d[m.id] = bai.filter((b) => b.muc === m.id).length;
    return d;
  }, [bai]);

  const ds = useMemo(() => {
    const q = bo(tim.trim());
    return bai.filter((b) => (muc === "tat-ca" || b.muc === muc) && (!q || bo(`${b.tieuDe} ${b.tomTat} ${b.chuDe}`).includes(q)));
  }, [bai, muc, tim]);

  const [noiBat, ...con] = ds;
  const khoa = `${muc}|${tim}`;
  const mucHienTai = MUC_TIN_TUC.find((m) => m.id === muc);

  return (
    <div>
      {/* thanh công cụ */}
      <div className="flex flex-col gap-4 border-y border-than-chi/25 py-3 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Chuyên mục" className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[{ id: "tat-ca" as const, ten: "Tất cả" }, ...MUC_TIN_TUC].map((m) => {
            const dang = muc === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={dang}
                onClick={() => setMuc(m.id)}
                className={`group relative inline-flex min-h-11 shrink-0 items-center gap-2 px-3.5 text-[14px] transition-colors md:px-4 ${dang ? "font-bold text-than-chi" : "text-than-chi/70 hover:text-than-chi"}`}
              >
                {m.ten}
                <span className={`text-[12px] tabular-nums ${dang ? "text-accent" : "text-than-chi/50"}`}>{dem[m.id]}</span>
                <span className={`absolute inset-x-3 -bottom-[13px] h-[2px] origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${dang ? "scale-x-100" : "scale-x-0"}`} aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <label htmlFor={idTim} className="relative block md:w-[300px]">
          <span className="sr-only">Tìm bài viết</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-than-chi/55" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id={idTim}
            type="search"
            value={tim}
            onChange={(e) => setTim(e.target.value)}
            placeholder="Tìm bài viết"
            className="min-h-11 w-full rounded-full border border-than-chi/25 bg-white pl-11 pr-4 text-[14.5px] outline-none transition-[border-color,box-shadow] placeholder:text-than-chi/55 focus:border-accent focus:shadow-[0_0_0_3px_rgba(227,25,55,0.12)]"
          />
        </label>
      </div>
      <p role="status" aria-live="polite" className="mt-3 text-[13px] text-than-chi/65">
        {ds.length > 0 ? `${ds.length} bài viết` : "Không có bài phù hợp"}
        {tim && ` cho “${tim}”`}
      </p>

      {ds.length === 0 ? (
        <div className="mt-8 rounded-[16px] border border-dashed border-than-chi/25 bg-white/60 px-6 py-12 text-center md:py-16">
          {mucHienTai && !tim ? (
            <>
              <p className="text-[1.3rem] font-bold">{mucHienTai.ten} đang được cập nhật</p>
              <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-than-chi/75">{mucHienTai.mota}</p>
              {SE_CO[mucHienTai.id].length > 0 && (
                <ul className="mx-auto mt-5 max-w-md space-y-2 text-left text-[14.5px] text-than-chi/80">
                  {SE_CO[mucHienTai.id].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[0.7em] h-px w-5 shrink-0 bg-accent" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => setMuc("kien-thuc")} className="nut nut-dac">
                  Đọc bài kiến thức
                </button>
                <Link href="/lien-he" className="nut nut-vien-sang">
                  Liên hệ nhận thông tin
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-[1.2rem] font-bold">Chưa có bài phù hợp</p>
              <p className="mt-2 text-[15px] text-than-chi/75">Thử từ khóa khác hoặc chọn chuyên mục khác.</p>
              <button type="button" onClick={() => { setTim(""); setMuc("tat-ca"); }} className="nut nut-dac mt-6">
                Xóa tìm kiếm
              </button>
            </>
          )}
        </div>
      ) : (
        <div key={khoa}>
          {/* bài nổi bật */}
          {noiBat && (
            <Link href={`/tin-tuc/${noiBat.slug}`} className="the-hien group mt-6 grid overflow-hidden rounded-[18px] border border-than-chi/10 bg-white shadow-[0_14px_40px_rgba(15,17,21,0.06)] transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,17,21,0.12)] lg:grid-cols-[1.3fr_1fr]">
              <span className="relative block aspect-[16/10] overflow-hidden bg-than-chi lg:aspect-auto lg:min-h-[420px]">
                <Image src={asset(noiBat.anh)} alt="" fill priority quality={70} sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-than-chi backdrop-blur-sm">Bài mới nhất</span>
              </span>
              <span className="flex flex-col justify-center p-6 md:p-10">
                <Meta b={noiBat} />
                <span className="mt-4 block text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.01em] [text-wrap:balance]">{noiBat.tieuDe}</span>
                <span className="mt-4 block text-[16px] leading-relaxed text-than-chi/75">{noiBat.tomTat}</span>
                <span className="mt-7 block">
                  <MuiTen />
                </span>
              </span>
            </Link>
          )}

          {/* lưới bài */}
          {con.length > 0 && (
            <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {con.map((b, i) => (
                <li key={b.slug} className="the-hien" style={{ animationDelay: `${(i + 1) * 70}ms` }}>
                  <Link href={`/tin-tuc/${b.slug}`} className="group block">
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-[14px] bg-than-chi/10 transition-[box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_44px_rgba(15,17,21,0.16)]">
                      <Image src={asset(b.anh)} alt="" fill quality={65} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]" />
                      <span className="absolute inset-0 bg-gradient-to-t from-than-chi/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                    </span>
                    <span className="mt-4 block">
                      <Meta b={b} />
                    </span>
                    <span className="mt-2 block text-[1.15rem] font-bold leading-snug transition-colors group-hover:text-accent">{b.tieuDe}</span>
                    <span className="mt-2 line-clamp-2 block text-[14.5px] leading-relaxed text-than-chi/70">{b.tomTat}</span>
                    <span className="mt-4 block">
                      <MuiTen />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
