/**
 * Mẫu cửa theo hãng (anh Huy yêu cầu 10/11/2026: hiện đầy đủ tên hãng và dòng mẫu).
 * KHUNG DỮ LIỆU RỖNG: tên dòng mẫu lấy từ tài liệu nội bộ của dự án, bản vẽ/mẫu gốc/thông số chờ catalog của anh Huy.
 * Cần xác nhận quyền sử dụng tên hãng và hình ảnh trước khi công bố chính thức. KHÔNG tự điền thông số.
 */

export const HANG = ["Romadio", "Civro", "Ponzio"] as const;
export type Hang = (typeof HANG)[number];

export type MauCua = {
  id: string;
  hang: Hang;
  ten: string; // tên dòng mẫu
  moTa: string;
  banVe: string | null; // đường dẫn ảnh bản vẽ khi có
  mauGoc: string | null; // đường dẫn ảnh mẫu gốc khi có
  thongSo: Record<string, string | null>; // null = chờ xác nhận
};

export const MAU_CUA: MauCua[] = [
  {
    id: "romadio-panorama-19s",
    hang: "Romadio",
    ten: "Panorama 19S",
    moTa: "Dòng cửa trượt khổ lớn. Mô tả chi tiết chờ tài liệu.",
    banVe: null,
    mauGoc: null,
    thongSo: {},
  },
  {
    id: "civro-cho-xac-nhan",
    hang: "Civro",
    ten: "[CHỜ XÁC NHẬN] dòng mẫu",
    moTa: "Anh Huy sẽ gửi danh sách dòng mẫu và catalog.",
    banVe: null,
    mauGoc: null,
    thongSo: {},
  },
  {
    id: "ponzio-ws75",
    hang: "Ponzio",
    ten: "WS75",
    moTa: "Dòng hệ nhôm. Mô tả chi tiết chờ tài liệu.",
    banVe: null,
    mauGoc: null,
    thongSo: {},
  },
];
