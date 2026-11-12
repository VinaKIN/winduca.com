/** Ba nhóm đối tác (đề xuất 10/11/2026, mục 5.4). Nội dung quyền lợi là BẢN NHÁP, chờ anh Huy xác nhận điều kiện hợp tác. */

export type NhomDoiTac = {
  id: "dealer" | "contractor" | "architect";
  en: string;
  ten: string;
  tomTat: string;
  anh: string;
  quyenLoi: string[];
  kyThuat: string[];
  taiLieu: string[];
};

export const NHOM_DOI_TAC: NhomDoiTac[] = [
  {
    id: "dealer",
    en: "Dealer Partnership",
    ten: "Đại lý và nhà phân phối",
    tomTat: "Đồng hành cùng đội ngũ WINDUCA để đưa giải pháp cửa nhôm kính đến công trình trong khu vực của bạn.",
    anh: "/images/doi-tac/dai-ly.webp",
    quyenLoi: ["Trao đổi chương trình hợp tác phân phối theo khu vực", "Đào tạo sản phẩm và kỹ năng tư vấn", "Hỗ trợ trưng bày mẫu vật"],
    kyThuat: ["Tư vấn kỹ thuật theo từng công trình", "Phối hợp xử lý yêu cầu của khách hàng"],
    taiLieu: ["Catalog sản phẩm (đang hoàn thiện)", "Tài liệu bán hàng (đang hoàn thiện)"],
  },
  {
    id: "contractor",
    en: "Contractor Partnership",
    ten: "Nhà thầu và đơn vị thi công",
    tomTat: "Gửi bản vẽ, nhận bóc tách và hỗ trợ kỹ thuật từ đội ngũ WINDUCA trong suốt quá trình thi công.",
    anh: "/images/doi-tac/nha-thau.webp",
    quyenLoi: ["Bóc tách khối lượng theo bản vẽ", "Phối hợp tiến độ thi công", "Một đầu mối làm việc xuyên suốt"],
    kyThuat: ["Hỗ trợ kỹ thuật tại công trình", "Hướng dẫn lắp đặt (đang hoàn thiện)"],
    taiLieu: ["Hồ sơ kỹ thuật PDF (đang hoàn thiện)", "Mặt cắt DWG (đang hoàn thiện)"],
  },
  {
    id: "architect",
    en: "Architect Partnership",
    ten: "Kiến trúc sư và công ty thiết kế",
    tomTat: "Tài liệu kỹ thuật, mặt cắt và tư vấn chi tiết theo bản vẽ cho từng công trình.",
    anh: "/images/doi-tac/kien-truc-su.webp",
    quyenLoi: ["Tư vấn chi tiết theo bản vẽ", "Mẫu vật để chạm thử vật liệu", "Trao đổi trực tiếp với đội kỹ thuật"],
    kyThuat: ["Đề xuất chi tiết tham khảo cho hồ sơ thiết kế", "Gợi ý hệ cửa theo loại công trình"],
    taiLieu: ["Thư viện BIM, DWG (đang hoàn thiện)", "Bảng màu vật liệu"],
  },
];
