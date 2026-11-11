/**
 * Danh mục sản phẩm theo chức năng (11/11/2026, bố cục như trang sản phẩm Winboss nhưng KHÔNG dùng tên hãng/mã hệ).
 * Bốn dòng thông số: giá trị chưa có phiếu kiểm định nên để "Đang chờ xác nhận"; chống trộm "Liên hệ tư vấn".
 * Khi có số liệu đã xác nhận (kèm nguồn) thì điền vào từng sản phẩm: apLucGio, kinNuoc, kinKhi, chongTrom.
 */
export const CHO_XAC_NHAN = "Đang chờ xác nhận";
export const THONG_SO_SAN_PHAM = ["Áp lực gió", "Độ kín nước", "Độ kín khí", "Chống trộm"] as const;
export const NHOM_SAN_PHAM = ["Cửa trượt", "Cửa nâng trượt", "Cửa xếp gấp", "Cửa đi mở quay", "Cửa sổ"];

export type SanPham = {
  slug: string;
  ten: string;
  nhom: string;
  /** slug của trang kiểu cửa tương ứng (/he-cua/[slug]) */
  kieu: string;
  mota: string;
  apLucGio: string;
  kinNuoc: string;
  kinKhi: string;
  chongTrom: string;
};

const sp = (slug: string, ten: string, nhom: string, kieu: string, mota: string): SanPham => ({
  slug,
  ten,
  nhom,
  kieu,
  mota,
  apLucGio: CHO_XAC_NHAN,
  kinNuoc: CHO_XAC_NHAN,
  kinKhi: CHO_XAC_NHAN,
  chongTrom: "Liên hệ tư vấn",
});

export const SAN_PHAM: SanPham[] = [
  sp("cua-truot-khung-slim", "Cửa trượt khung slim", "Cửa trượt", "cua-truot-nang", "Khung nhôm mảnh, mặt kính lớn cho tầm nhìn thoáng."),
  sp("cua-truot-infinity-view", "Cửa trượt Infinity View", "Cửa trượt", "cua-truot-nang", "Tầm nhìn liền mạch ra sân vườn, hồ bơi."),
  sp("cua-truot-toi-gian", "Cửa trượt tối giản", "Cửa trượt", "cua-truot-nang", "Đường nét tối giản cho không gian hiện đại."),
  sp("cua-nang-truot-kho-lon", "Cửa nâng trượt khổ lớn", "Cửa nâng trượt", "cua-truot-nang", "Cánh lớn nâng khỏi ray khi vận hành, đóng kín khi hạ cánh."),
  sp("cua-nang-truot-canh-nang", "Cửa nâng trượt cánh nặng", "Cửa nâng trượt", "cua-truot-nang", "Dành cho khẩu độ rộng và cánh kính lớn."),
  sp("cua-xep-gap", "Cửa xếp gấp", "Cửa xếp gấp", "cua-xep-truot", "Gấp gọn các cánh để mở trọn khoảng không gian."),
  sp("cua-di-mo-quay", "Cửa đi mở quay", "Cửa đi mở quay", "cua-di-mo-quay", "Lối vào chắc chắn, đóng mở thuận tay."),
  sp("cua-so-truot", "Cửa sổ trượt", "Cửa sổ", "cua-so", "Gọn gàng cho phòng ngủ, bếp và hành lang."),
  sp("cua-so-mo-quay-toi-gian", "Cửa sổ mở quay tối giản", "Cửa sổ", "cua-so", "Khung mảnh, mở quay đóng kín."),
];

/** Ảnh theo kiểu cửa (bộ ảnh products/ do chủ website cung cấp). */
export const ANH_THEO_KIEU: Record<string, { src: string; hover: string }> = {
  "cua-truot-nang": { src: "/images/products/lift-slide.webp", hover: "/images/products/lift-slide-hover.webp" },
  "cua-di-mo-quay": { src: "/images/products/casement.webp", hover: "/images/products/casement-hover.webp" },
  "cua-xep-truot": { src: "/images/products/bi-fold.webp", hover: "/images/products/bi-fold-hover.webp" },
  "cua-so": { src: "/images/products/window.webp", hover: "/images/products/window-hover.webp" },
};
