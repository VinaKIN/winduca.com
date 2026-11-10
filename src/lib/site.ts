/** Hằng số và nội dung dùng chung. Mọi con số kỹ thuật chưa xác nhận KHÔNG có ở đây. */

import { asset } from "./asset";

/**
 * Ảnh/video nền cho hero. Đặt tệp vào public/images rồi điền đường dẫn.
 * Để null thì hero dùng hình minh họa tạm. Ảnh phải có giấy phép dùng thương mại,
 * ghi nguồn vào public/images/NGUON-ANH.md, và KHÔNG chứa logo/tên hãng khác.
 */
export const HERO_ANH: string | null = asset("/images/hero.jpg"); // ảnh stock tạm, xem public/images/NGUON-ANH.md
export const HERO_VIDEO: string | null = null; // ví dụ "/images/hero.mp4" (muted, ≤ 8MB, có HERO_ANH làm poster)

export const HOTLINE = "0947 686 668";
export const HOTLINE_TEL = "tel:0947686668";

export const MENU = [
  { href: "/he-cua", label: "Hệ cửa" },
  { href: "/cong-trinh", label: "Công trình" },
  { href: "/nang-luc-xuong", label: "Năng lực & Xưởng" },
  { href: "/danh-cho-kts", label: "Dành cho KTS" },
  { href: "/trai-nghiem", label: "Trải nghiệm" },
  { href: "/lien-he", label: "Liên hệ" },
];

/** Menu ba gạch (toàn màn hình): theo mẫu anh Huy gửi 10/11/2026 — Giới thiệu · Sản phẩm · Tin tức · Chính sách · Liên hệ */
export type MucMenu = { href: string; label: string; con?: { href: string; label: string }[] };
export const MENU_CHINH: MucMenu[] = [
  {
    href: "/nang-luc-xuong",
    label: "Giới thiệu",
    con: [
      { href: "/nang-luc-xuong", label: "Năng lực & Xưởng" },
      { href: "/cong-trinh", label: "Công trình" },
      { href: "/trai-nghiem", label: "Trải nghiệm" },
    ],
  },
  {
    href: "/he-cua",
    label: "Sản phẩm",
    con: [
      { href: "/he-cua/cua-truot-nang", label: "Cửa trượt nâng" },
      { href: "/he-cua/cua-di-mo-quay", label: "Cửa đi mở quay" },
      { href: "/he-cua/cua-xep-truot", label: "Cửa xếp trượt" },
      { href: "/he-cua/cua-so", label: "Cửa sổ" },
      { href: "/danh-cho-kts", label: "Dành cho KTS" },
    ],
  },
  { href: "/tin-tuc", label: "Tin tức" },
  {
    href: "/chinh-sach-bao-mat",
    label: "Chính sách",
    con: [
      { href: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
      { href: "/dieu-khoan-su-dung", label: "Điều khoản sử dụng" },
      { href: "/chinh-sach-cookie", label: "Chính sách cookie" },
    ],
  },
  { href: "/lien-he", label: "Liên hệ" },
];

export type KieuCua = {
  slug: string;
  ten: string;
  tagline: string;
  tongQuan: string;
  khongGian: string[];
  cachMo: string;
  khauDo: string;
  dacDiem: string[];
};

/** Tên thẳng theo quyết định 09/11/2026: không tên hãng. Tagline là bản nháp để chủ dự án duyệt. */
export const KIEU_CUA: KieuCua[] = [
  {
    slug: "cua-truot-nang",
    ten: "Cửa trượt nâng",
    tagline: "Mở rộng tầm nhìn, vận hành êm.",
    tongQuan:
      "Cánh cửa khổ lớn được nâng lên khỏi ray khi vận hành rồi hạ xuống khi đóng, cho cảm giác trượt nhẹ nhàng và đóng kín chắc chắn. Phù hợp với những mặt kính rộng nhìn ra sân vườn, hồ bơi hoặc biển.",
    khongGian: ["Phòng khách", "Sân vườn", "Hồ bơi", "Ban công rộng"],
    cachMo: "Trượt ngang, cánh nâng khỏi ray khi mở",
    khauDo: "Khẩu độ lớn",
    dacDiem: ["Mặt kính lớn, khung nhôm mảnh", "Vận hành êm", "Đóng kín khi hạ cánh"],
  },
  {
    slug: "cua-di-mo-quay",
    ten: "Cửa đi mở quay",
    tagline: "Lối vào chắc chắn, đường nét tối giản.",
    tongQuan:
      "Cửa đi một hoặc hai cánh mở quay quanh bản lề, phù hợp cho lối vào chính, cửa ra vườn hay cửa ban công. Đường nét gọn, bề mặt anode hoặc sơn tĩnh điện đồng bộ với toàn bộ hệ cửa của công trình.",
    khongGian: ["Cửa chính", "Cửa ra vườn", "Cửa ban công"],
    cachMo: "Mở quay vào trong hoặc ra ngoài",
    khauDo: "Khẩu độ vừa",
    dacDiem: ["Dáng cửa truyền thống, nét hiện đại", "Dùng được cho một hoặc hai cánh", "Đồng bộ phụ kiện"],
  },
  {
    slug: "cua-xep-truot",
    ten: "Cửa xếp trượt",
    tagline: "Gập gọn về một phía, mở rộng cả không gian.",
    tongQuan:
      "Nhiều cánh gập lại và xếp gọn về một hoặc hai phía, cho phép mở gần như toàn bộ khẩu độ. Thích hợp với những không gian muốn liên thông phòng khách và sân hiên theo từng thời điểm trong ngày.",
    khongGian: ["Phòng khách liên thông sân hiên", "Phòng ăn", "Quầy bar ngoài trời"],
    cachMo: "Cánh gập và xếp gọn về một hoặc hai phía",
    khauDo: "Khẩu độ rộng",
    dacDiem: ["Mở gần hết khẩu độ", "Linh hoạt theo thời tiết", "Xếp gọn, không chiếm không gian"],
  },
  {
    slug: "cua-so",
    ten: "Cửa sổ",
    tagline: "Ánh sáng và gió trời, đúng chỗ cần.",
    tongQuan:
      "Cửa sổ mở quay hoặc mở hất, đồng bộ đường nét với cửa đi và cửa trượt để toàn bộ mặt tiền thống nhất. Phù hợp với phòng ngủ, phòng làm việc, cầu thang và những vị trí cần lấy sáng, thông gió.",
    khongGian: ["Phòng ngủ", "Phòng làm việc", "Cầu thang", "Phòng tắm"],
    cachMo: "Mở quay hoặc mở hất",
    khauDo: "Khẩu độ nhỏ đến vừa",
    dacDiem: ["Đồng bộ mặt tiền", "Thông gió chủ động", "Nhiều kích thước"],
  },
];

export const THONG_SO_BANG = [
  "Bề rộng khung",
  "Độ dày thành nhôm",
  "Thanh cách nhiệt",
  "Độ dày kính tối đa",
  "Tải gió",
  "Hệ số truyền nhiệt khung (Uf)",
];

/** 8 màu mẫu theo tông brand. Mã màu nhà cung cấp: [CHỖ TRỐNG]. */
export const MAU_HOAN_THIEN = [
  { ten: "Champagne anode", hex: "#bfa678" },
  { ten: "Than chì", hex: "#2b2b2d" },
  { ten: "Inox xước", hex: "#c8c9c6" },
  { ten: "Ngà", hex: "#e8e2d4" },
  { ten: "Nâu đất", hex: "#6b5848" },
  { ten: "Đen mờ", hex: "#1c1c1e" },
  { ten: "Xám đá", hex: "#7b7a76" },
  { ten: "Đồng sẫm", hex: "#8a6b45" },
];

export const LOAI_CONG_TRINH = ["Biệt thự", "Penthouse", "Cải tạo nhà phố", "Khác"];

export type CongTrinhMinhHoa = {
  slug: string;
  ten: string;
  loai: string;
  khuVuc: string;
  kieuCua: string;
};

/** 12 mục MINH HỌA (anh Huy chọn 09/11/2026). Không phải công trình thật. */
export const CONG_TRINH_MINH_HOA: CongTrinhMinhHoa[] = [
  { slug: "minh-hoa-01", ten: "Biệt thự ven biển", loai: "Biệt thự", khuVuc: "Miền Trung", kieuCua: "Cửa trượt nâng" },
  { slug: "minh-hoa-02", ten: "Penthouse nhìn ra thành phố", loai: "Penthouse", khuVuc: "Miền Nam", kieuCua: "Cửa xếp trượt" },
  { slug: "minh-hoa-03", ten: "Biệt thự vườn", loai: "Biệt thự", khuVuc: "Miền Bắc", kieuCua: "Cửa đi mở quay" },
  { slug: "minh-hoa-04", ten: "Nhà phố cải tạo", loai: "Cải tạo nhà phố", khuVuc: "Miền Bắc", kieuCua: "Cửa sổ" },
  { slug: "minh-hoa-05", ten: "Biệt thự hồ bơi", loai: "Biệt thự", khuVuc: "Miền Nam", kieuCua: "Cửa trượt nâng" },
  { slug: "minh-hoa-06", ten: "Penthouse sân thượng", loai: "Penthouse", khuVuc: "Miền Bắc", kieuCua: "Cửa xếp trượt" },
  { slug: "minh-hoa-07", ten: "Biệt thự đồi", loai: "Biệt thự", khuVuc: "Miền Trung", kieuCua: "Cửa trượt nâng" },
  { slug: "minh-hoa-08", ten: "Nhà phố mặt tiền kính", loai: "Cải tạo nhà phố", khuVuc: "Miền Nam", kieuCua: "Cửa đi mở quay" },
  { slug: "minh-hoa-09", ten: "Biệt thự nghỉ dưỡng", loai: "Biệt thự", khuVuc: "Miền Trung", kieuCua: "Cửa xếp trượt" },
  { slug: "minh-hoa-10", ten: "Penthouse hai tầng", loai: "Penthouse", khuVuc: "Miền Nam", kieuCua: "Cửa trượt nâng" },
  { slug: "minh-hoa-11", ten: "Biệt thự ven sông", loai: "Biệt thự", khuVuc: "Miền Nam", kieuCua: "Cửa đi mở quay" },
  { slug: "minh-hoa-12", ten: "Nhà vườn hiện đại", loai: "Khác", khuVuc: "Miền Bắc", kieuCua: "Cửa sổ" },
];

export const FAQ_CHUNG = [
  {
    q: "WINDUCA có báo giá trên website không?",
    a: "Chi phí phụ thuộc vào bản vẽ và yêu cầu cụ thể của từng công trình, nên chúng tôi không đăng giá trên website. Anh chị gửi bản vẽ hoặc đăng ký tư vấn để đội kỹ thuật bóc tách và phản hồi.",
  },
  {
    q: "Hộp mẫu góc nhôm gồm những gì?",
    a: "Hộp mẫu có các góc nhôm nhiều màu, lát cắt thanh nhôm cầu cách nhiệt, mẫu kính và đoạn gioăng, tay nắm để anh chị chạm và so màu tại nhà. Chính sách nhận hộp mẫu sẽ được công bố khi có xác nhận.",
  },
  {
    q: "Tôi là kiến trúc sư, có tài liệu kỹ thuật để đưa vào hồ sơ thiết kế không?",
    a: "Thư viện kỹ thuật gồm mặt cắt DWG, tài liệu PDF và mô hình BIM đang được hoàn thiện. Anh chị có thể đăng ký để nhận khi có tệp, hoặc gửi bản vẽ để đội kỹ thuật tư vấn chi tiết.",
  },
  {
    q: "Bản vẽ tôi gửi có được bảo mật không?",
    a: "Bản vẽ chỉ dùng để tư vấn cho đúng công trình đó, không chia sẻ cho bên thứ ba và được xóa sau 30 ngày. Anh chị có thể yêu cầu xóa sớm bất cứ lúc nào.",
  },
  {
    q: "Cửa của WINDUCA được gia công ở đâu?",
    a: "Bộ cửa được gia công chính xác theo bản vẽ tại xưởng WINDUCA, thuộc VinaKIN Group, rồi lắp đặt tại công trình.",
  },
  {
    q: "Bảo hành và bảo trì thế nào?",
    a: "Bảo hành và bảo trì theo chính sách công bố của WINDUCA. Thời hạn cụ thể sẽ được cập nhật khi có xác nhận.",
  },
];
