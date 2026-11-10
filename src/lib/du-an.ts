/**
 * WINDUCA Projects: CHỈ công trình thực tế đã thực hiện, có hình ảnh xác thực và sự đồng ý của chủ đầu tư.
 * Hiện danh sách RỖNG. Khi có công trình thật, thêm vào đây; trang Case Study và danh sách tự hiện.
 * KHÔNG đưa ảnh minh họa/cảm hứng vào đây.
 */

export type DuAn = {
  slug: string;
  ten: string;
  loai: "Biệt thự" | "Nhà phố cao cấp" | "Khách sạn & Resort" | "Penthouse" | "Khác";
  khuVuc: string;
  heCua: string[]; // tên kiểu cửa đã dùng
  anhTongThe: string; // đường dẫn trong /images/du-an/
  anhChiTiet: string[];
  yeuCauKienTruc: string;
  giaiPhap: string;
  ketQua: string;
  xacNhanChuDauTu: { ngay: string; nguoi: string; kenh: string }; // bắt buộc trước khi đăng
};

export const DU_AN: DuAn[] = [];
