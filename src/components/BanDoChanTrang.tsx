/**
 * Bản đồ chân trang theo mẫu Winboss: bản đồ Google tông tối hiện ngay, nút "Mở trong Maps" ở góc trái trên.
 * Khung đẩy bản đồ lên để thẻ thông tin mặc định của Google nằm ngoài vùng nhìn, tránh trùng nút của WINDUCA.
 * Bản đồ tải từ Google khi người xem cuộn tới (loading="lazy"); đã ghi trong Chính sách cookie.
 */
export function BanDoChanTrang({ diaChi, mapsUrl, lop = "h-[300px]" }: { diaChi: string; mapsUrl: string; lop?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[10px] bg-[#1d1a1b] ${lop}`}>
      <iframe
        title="Bản đồ văn phòng WINDUCA"
        src={`https://www.google.com/maps?q=${encodeURIComponent(diaChi)}&hl=vi&z=16&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-x-0 -top-[170px] h-[calc(100%+170px)] w-full border-0 [filter:grayscale(1)_invert(0.9)_contrast(0.92)_brightness(0.95)]"
      />
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 bg-than-chi/95 px-4 py-2.5 text-[16px] text-white/90 transition-colors hover:bg-accent hover:text-white"
      >
        Mở trong Maps
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </svg>
      </a>
    </div>
  );
}
