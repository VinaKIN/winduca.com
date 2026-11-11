/**
 * Dữ liệu 106 hệ cửa nhôm kính (11/11/2026), tạo tự động từ bảng công bố của nhà sản xuất.
 * - Tên theo chức năng, không dùng tên hãng hoặc mã sản phẩm.
 * - Chỉ dùng bản vẽ 2D đã kiểm tra: bỏ bản vẽ có logo hoặc mã profile in trên hình, cắt dải ghi mã sản phẩm ở đáy hình.
 *   Ảnh 3D và ảnh thực tế có logo nên không đưa vào.
 * - "Chức năng" lấy từ nhãn của trang gốc (cách nhiệt cao, an ninh cao, dễ tiếp cận, thông minh) và từ chính tên loại cửa.
 * - Số liệu chỉ để tham khảo, thay đổi theo kích thước và cấu hình; cần xác nhận quyền sử dụng trước khi công bố chính thức.
 */
export type HeCua = {
  slug: string;
  ten: string;
  /** Hệ thống: s trượt, l nâng trượt, d cửa đi, f xếp gấp, w cửa sổ, v vách kính */
  he: "s" | "l" | "d" | "f" | "w" | "v";
  heTen: string;
  /** t có cầu nhiệt, n không cầu nhiệt, tn có cả hai phiên bản, rỗng là chưa xác định */
  ketCau: "t" | "n" | "tn" | "";
  chucNang: string[];
  thongSo: Record<string, string>;
  ghiChu: string;
  banVe: string[];
};

export const HE_THONG: { id: HeCua["he"]; ten: string }[] = [
  { id: "w", ten: "Cửa sổ" },
  { id: "d", ten: "Cửa đi" },
  { id: "s", ten: "Cửa trượt" },
  { id: "l", ten: "Cửa nâng trượt" },
  { id: "f", ten: "Cửa xếp gấp" },
  { id: "v", ten: "Vách kính" },
];
export const CHUC_NANG = ["Cách nhiệt cao","An ninh cao","Dễ tiếp cận","Thông minh / động cơ","Lưới chống côn trùng","Thông gió","Kính ba lớp","Tầm nhìn rộng","Khung mảnh","Lan can an toàn","Thoát hiểm","Kiểu cổ điển"] as const;
export const THONG_SO_THU_TU = ["Hệ số truyền nhiệt U (W/m²K)", "Cách âm", "Độ kín nước", "Chịu gió", "Độ kín khí", "Chống đột nhập", "Kính áp dụng"] as const;

export function nhanKetCau(k: HeCua["ketCau"]) {
  return k === "t" ? "Có cầu nhiệt" : k === "n" ? "Không cầu nhiệt" : k === "tn" ? "Có và không cầu nhiệt" : "Kết cấu đang cập nhật";
}

export const HE_CUA_DS: HeCua[] = [
  {
    "slug": "cua-truot-tam-nhin-mo-rong-cach-nhiet",
    "ten": "Cửa trượt tầm nhìn mở rộng, cách nhiệt",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "t",
    "chucNang": [
      "Tầm nhìn rộng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 2.3",
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "28 dB",
      "Độ kín nước": "≤ E1200",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "10–32 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-tam-nhin-mo-rong-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "vach-kinh-cach-nhiet",
    "ten": "Vách kính, cách nhiệt",
    "he": "v",
    "heTen": "Vách kính",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 1.2",
      "Độ kín khí": "Class 4",
      "Cách âm": "39 dB",
      "Độ kín nước": "E1200",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–28 mm"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-nang-truot-cach-nhiet-kinh-5-28-mm-phien-ban-1",
    "ten": "Cửa nâng trượt, cách nhiệt, kính 5–28 mm, phiên bản 1",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 2.5",
      "Độ kín khí": "Class 2",
      "Cách âm": "32 dB",
      "Độ kín nước": "Class 7A",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–28 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-cach-nhiet-kinh-5-28-mm-phien-ban-1-1.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-kinh-ba-lop-cach-nhiet-uw-2-5",
    "ten": "Cửa nâng trượt kính ba lớp, cách nhiệt, Uw 2.5",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "ketCau": "t",
    "chucNang": [
      "Kính ba lớp"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 2.5",
      "Độ kín khí": "Class 4",
      "Cách âm": "36 dB",
      "Độ kín nước": "Class 8A",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "24–52 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-kinh-ba-lop-cach-nhiet-uw-2-5-1.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-cach-nhiet-kinh-5-28-mm-phien-ban-2",
    "ten": "Cửa nâng trượt, cách nhiệt, kính 5–28 mm, phiên bản 2",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 2.5",
      "Độ kín khí": "Class 2",
      "Cách âm": "32 dB",
      "Độ kín nước": "Class 7A",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–28 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-cach-nhiet-kinh-5-28-mm-phien-ban-2-1.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-kinh-ba-lop-cach-nhiet-uw-1-4",
    "ten": "Cửa nâng trượt kính ba lớp, cách nhiệt, Uw 1.4",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "ketCau": "t",
    "chucNang": [
      "Kính ba lớp"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 1.4",
      "Độ kín khí": "Class 4",
      "Cách âm": "36 dB",
      "Độ kín nước": "Class 8A",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "24–52 mm"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-di-mo-quay-vao-cach-nhiet",
    "ten": "Cửa đi mở quay vào, cách nhiệt",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 2.2",
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "34 dB",
      "Độ kín nước": "≤ E700",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–42 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-mo-quay-vao-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-di-mo-quay-ra-cach-nhiet",
    "ten": "Cửa đi mở quay ra, cách nhiệt",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 1.2",
      "Độ kín khí": "Class 4",
      "Cách âm": "34 dB",
      "Độ kín nước": "≤ E700",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–32 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-mo-quay-ra-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-xep-gap-cach-nhiet",
    "ten": "Cửa xếp gấp, cách nhiệt",
    "he": "f",
    "heTen": "Cửa xếp gấp",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 1.2",
      "Độ kín khí": "Class 4",
      "Cách âm": "29 dB",
      "Độ kín nước": "≥ E1000",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–36 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-xep-gap-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-so-song-song-co-lan-can-cach-nhiet",
    "ten": "Cửa sổ song song có lan can, cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Lan can an toàn"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 2.5",
      "Độ kín khí": "0.21 m³/(m·h)",
      "Cách âm": "35 dB",
      "Độ kín nước": "1000 Pa",
      "Chịu gió": "≤ 5.0 kPa",
      "Kính áp dụng": "24 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-song-song-co-lan-can-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-so-thong-gio-co-luoi-cach-nhiet",
    "ten": "Cửa sổ thông gió có lưới, cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Lưới chống côn trùng",
      "Thông gió"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 2.6",
      "Độ kín khí": "Class 4",
      "Cách âm": "39 dB",
      "Độ kín nước": "E1200",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "13–52 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-thong-gio-co-luoi-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-so-thong-gio-cach-nhiet-kinh-5-42-mm",
    "ten": "Cửa sổ thông gió, cách nhiệt, kính 5–42 mm",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Thông gió"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 2.6",
      "Độ kín khí": "Class 4",
      "Cách âm": "39 dB",
      "Độ kín nước": "E700",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–42 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-thong-gio-cach-nhiet-kinh-5-42-mm-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-hat-quay-co-luoi-cach-nhiet-kinh-13-52-mm",
    "ten": "Cửa sổ mở hất/quay có lưới, cách nhiệt, kính 13–52 mm",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 1.8",
      "Độ kín khí": "Class 4",
      "Cách âm": "38 dB",
      "Độ kín nước": "E1200",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "13–52 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-hat-quay-co-luoi-cach-nhiet-kinh-13-52-mm-1.webp"
    ]
  },
  {
    "slug": "cua-so-truot-cach-nhiet-kinh-24-mm",
    "ten": "Cửa sổ trượt, cách nhiệt, kính 24 mm",
    "he": "w",
    "heTen": "Cửa sổ trượt",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 3.2",
      "Độ kín khí": "≤ Class 1",
      "Cách âm": "29 dB",
      "Độ kín nước": "≤ Class 5A",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "24 mm"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-mo-quay-ra-co-luoi-cach-nhiet",
    "ten": "Cửa sổ mở quay ra có lưới, cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 1.2",
      "Độ kín khí": "Class 4",
      "Cách âm": "34 dB",
      "Độ kín nước": "≤ E1200",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–32 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-ra-co-luoi-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-hat-quay-co-luoi-cach-nhiet-kinh-5-42-mm",
    "ten": "Cửa sổ mở hất/quay có lưới, cách nhiệt, kính 5–42 mm",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 2.6",
      "Độ kín khí": "Class 4",
      "Cách âm": "33 dB",
      "Độ kín nước": "≤ E1200",
      "Chịu gió": "B5",
      "Kính áp dụng": "5–42 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-hat-quay-co-luoi-cach-nhiet-kinh-5-42-mm-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-quay-ra-cach-nhiet",
    "ten": "Cửa sổ mở quay ra, cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "≥ 2.3",
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "34 dB",
      "Độ kín nước": "≤ E1200",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–32 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-ra-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-phien-ban-1",
    "ten": "Cửa nâng trượt, phiên bản 1",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 2",
      "Cách âm": "30 dB",
      "Độ kín nước": "≤ Class 8A",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–24 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-phien-ban-1-1.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-phien-ban-2",
    "ten": "Cửa nâng trượt, phiên bản 2",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 2",
      "Cách âm": "30 dB",
      "Độ kín nước": "≤ Class 8A",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–24 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-phien-ban-2-1.webp"
    ]
  },
  {
    "slug": "cua-di-mo-quay-vao-kinh-5-24-mm",
    "ten": "Cửa đi mở quay vào, kính 5–24 mm",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "29 dB",
      "Độ kín nước": "≤ E700",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–24 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-mo-quay-vao-kinh-5-24-mm-1.webp"
    ]
  },
  {
    "slug": "cua-di-mo-quay-ra-kinh-5-24-mm",
    "ten": "Cửa đi mở quay ra, kính 5–24 mm",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "29 dB",
      "Độ kín nước": "≤ E1000",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–24 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-mo-quay-ra-kinh-5-24-mm-1.webp"
    ]
  },
  {
    "slug": "cua-di-mo-quay-vao-kinh-5-32-mm",
    "ten": "Cửa đi mở quay vào, kính 5–32 mm",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "31 dB",
      "Độ kín nước": "≤ E700",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–32 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-mo-quay-vao-kinh-5-32-mm-1.webp"
    ]
  },
  {
    "slug": "cua-di-mo-quay-ra-kinh-5-32-mm",
    "ten": "Cửa đi mở quay ra, kính 5–32 mm",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "31 dB",
      "Độ kín nước": "≤ E1000",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–32 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-mo-quay-ra-kinh-5-32-mm-1.webp"
    ]
  },
  {
    "slug": "cua-xep-gap",
    "ten": "Cửa xếp gấp",
    "he": "f",
    "heTen": "Cửa xếp gấp",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 2",
      "Cách âm": "29 dB",
      "Độ kín nước": "≤ E1200",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–36 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-xep-gap-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-quay-ra",
    "ten": "Cửa sổ mở quay ra",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "29 dB",
      "Độ kín nước": "≤ E1000",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–24 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-ra-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-hat-quay-co-luoi",
    "ten": "Cửa sổ mở hất/quay có lưới",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "n",
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "31 dB",
      "Độ kín nước": "≤ E1200",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–42 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-hat-quay-co-luoi-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-quay-ra-co-luoi",
    "ten": "Cửa sổ mở quay ra có lưới",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "n",
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "31 dB",
      "Độ kín nước": "≤ E1200",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–32 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-ra-co-luoi-1.webp"
    ]
  },
  {
    "slug": "cua-so-truot-co-luoi",
    "ten": "Cửa sổ trượt có lưới",
    "he": "w",
    "heTen": "Cửa sổ trượt",
    "ketCau": "n",
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Độ kín khí": "≤ Class 2",
      "Cách âm": "26 dB",
      "Độ kín nước": "≤ Class 5A",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "5–24 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-truot-co-luoi-1.webp"
    ]
  },
  {
    "slug": "cua-truot-khung-manh-kinh-10-32-mm",
    "ten": "Cửa trượt khung mảnh, kính 10–32 mm",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [
      "Khung mảnh"
    ],
    "thongSo": {
      "Độ kín khí": "≤ Class 2",
      "Cách âm": "28 dB",
      "Độ kín nước": "≤ Class 5A",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "10–32 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-khung-manh-kinh-10-32-mm-1.webp"
    ]
  },
  {
    "slug": "cua-truot-khung-manh-kinh-15-32-mm",
    "ten": "Cửa trượt khung mảnh, kính 15–32 mm",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [
      "Khung mảnh"
    ],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "28 dB",
      "Độ kín nước": "≤ E1200",
      "Chịu gió": "C5/B5",
      "Kính áp dụng": "15–32 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-khung-manh-kinh-15-32-mm-1.webp"
    ]
  },
  {
    "slug": "cua-truot-1-canh-ray-tren",
    "ten": "Cửa trượt 1 cánh, ray trên",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "Không khung bao đứng",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-1-canh-ray-tren-1.webp"
    ]
  },
  {
    "slug": "cua-truot-banh-xe-duoi-tren",
    "ten": "Cửa trượt bánh xe dưới / trên",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-banh-xe-duoi-tren-1.webp",
      "/images/he-cua/ban-ve/cua-truot-banh-xe-duoi-tren-2.webp"
    ]
  },
  {
    "slug": "cua-truot-2-ray-treo-tren",
    "ten": "Cửa trượt 2 ray treo trên",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "Không khung bao đứng",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-2-ray-treo-tren-1.webp"
    ]
  },
  {
    "slug": "cua-truot-banh-xe-duoi-tren-2-4-canh",
    "ten": "Cửa trượt bánh xe dưới / trên, 2–4 cánh",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-banh-xe-duoi-tren-2-4-canh-1.webp",
      "/images/he-cua/ban-ve/cua-truot-banh-xe-duoi-tren-2-4-canh-2.webp",
      "/images/he-cua/ban-ve/cua-truot-banh-xe-duoi-tren-2-4-canh-3.webp",
      "/images/he-cua/ban-ve/cua-truot-banh-xe-duoi-tren-2-4-canh-4.webp"
    ]
  },
  {
    "slug": "cua-truot-banh-xe-duoi-tren-3-canh",
    "ten": "Cửa trượt bánh xe dưới / trên, 3 cánh",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-banh-xe-duoi-tren-3-canh-1.webp",
      "/images/he-cua/ban-ve/cua-truot-banh-xe-duoi-tren-3-canh-2.webp"
    ]
  },
  {
    "slug": "cua-truot-banh-xe-duoi-tren-4-canh",
    "ten": "Cửa trượt bánh xe dưới / trên, 4 cánh",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-banh-xe-duoi-tren-4-canh-1.webp",
      "/images/he-cua/ban-ve/cua-truot-banh-xe-duoi-tren-4-canh-2.webp"
    ]
  },
  {
    "slug": "cua-mo-quay-vao-1-2-canh",
    "ten": "Cửa mở quay vào, 1–2 cánh",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-mo-quay-vao-1-2-canh-1.webp",
      "/images/he-cua/ban-ve/cua-mo-quay-vao-1-2-canh-2.webp"
    ]
  },
  {
    "slug": "cua-mo-quay-ra-1-2-canh-co-phao",
    "ten": "Cửa mở quay ra, 1–2 cánh, có phào",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-mo-quay-ra-1-2-canh-co-phao-1.webp",
      "/images/he-cua/ban-ve/cua-mo-quay-ra-1-2-canh-co-phao-2.webp",
      "/images/he-cua/ban-ve/cua-mo-quay-ra-1-2-canh-co-phao-3.webp"
    ]
  },
  {
    "slug": "cua-mo-quay-vao-dong-khung-manh",
    "ten": "Cửa mở quay vào dòng khung mảnh",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "n",
    "chucNang": [
      "Khung mảnh"
    ],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-mo-quay-vao-dong-khung-manh-1.webp",
      "/images/he-cua/ban-ve/cua-mo-quay-vao-dong-khung-manh-2.webp"
    ]
  },
  {
    "slug": "cua-mo-quay-ra-dong-khung-manh",
    "ten": "Cửa mở quay ra dòng khung mảnh",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "n",
    "chucNang": [
      "Khung mảnh"
    ],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-mo-quay-ra-dong-khung-manh-1.webp",
      "/images/he-cua/ban-ve/cua-mo-quay-ra-dong-khung-manh-2.webp"
    ]
  },
  {
    "slug": "cua-truot-ray-duoi-1-3-ray",
    "ten": "Cửa trượt ray dưới, 1–3 ray",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-ray-duoi-1-3-ray-1.webp",
      "/images/he-cua/ban-ve/cua-truot-ray-duoi-1-3-ray-2.webp",
      "/images/he-cua/ban-ve/cua-truot-ray-duoi-1-3-ray-3.webp",
      "/images/he-cua/ban-ve/cua-truot-ray-duoi-1-3-ray-4.webp"
    ]
  },
  {
    "slug": "cua-truot-ray-tren-1-2-ray",
    "ten": "Cửa trượt ray trên, 1–2 ray",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-ray-tren-1-2-ray-1.webp",
      "/images/he-cua/ban-ve/cua-truot-ray-tren-1-2-ray-2.webp"
    ]
  },
  {
    "slug": "cua-truot-ray-tren-1-3-ray",
    "ten": "Cửa trượt ray trên, 1–3 ray",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-ray-tren-1-3-ray-1.webp",
      "/images/he-cua/ban-ve/cua-truot-ray-tren-1-3-ray-2.webp",
      "/images/he-cua/ban-ve/cua-truot-ray-tren-1-3-ray-3.webp",
      "/images/he-cua/ban-ve/cua-truot-ray-tren-1-3-ray-4.webp"
    ]
  },
  {
    "slug": "cua-so-khung-manh-cach-nhiet",
    "ten": "Cửa sổ khung mảnh, cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Khung mảnh"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.7",
      "Cách âm": "35 dB",
      "Độ kín nước": "500 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-khung-manh-cach-nhiet-1.webp",
      "/images/he-cua/ban-ve/cua-so-khung-manh-cach-nhiet-2.webp",
      "/images/he-cua/ban-ve/cua-so-khung-manh-cach-nhiet-3.webp"
    ]
  },
  {
    "slug": "cua-so-cach-nhiet-uw-1-9",
    "ten": "Cửa sổ, cách nhiệt, Uw 1.9",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.9",
      "Cách âm": "36 dB",
      "Độ kín nước": "700 Pa"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-cach-nhiet-uw-1-9-1.webp",
      "/images/he-cua/ban-ve/cua-so-cach-nhiet-uw-1-9-2.webp"
    ]
  },
  {
    "slug": "cua-so-cach-nhiet-uw-2-1",
    "ten": "Cửa sổ, cách nhiệt, Uw 2.1",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Thông minh / động cơ"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.1",
      "Cách âm": "35 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-cach-nhiet-uw-1-8",
    "ten": "Cửa sổ, cách nhiệt, Uw 1.8",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Thông minh / động cơ"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.8",
      "Cách âm": "35 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-cach-nhiet-uw-1-8-1.webp",
      "/images/he-cua/ban-ve/cua-so-cach-nhiet-uw-1-8-2.webp"
    ]
  },
  {
    "slug": "cua-so-cach-nhiet-uw-1-5",
    "ten": "Cửa sổ, cách nhiệt, Uw 1.5",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Thông minh / động cơ"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.5",
      "Cách âm": "38 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-cach-nhiet-uw-1-5-1.webp",
      "/images/he-cua/ban-ve/cua-so-cach-nhiet-uw-1-5-2.webp"
    ]
  },
  {
    "slug": "cua-so-cach-nhiet-uw-1-2",
    "ten": "Cửa sổ, cách nhiệt, Uw 1.2",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao",
      "Thông minh / động cơ"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.2",
      "Cách âm": "39 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-cach-nhiet-uw-1-2-1.webp"
    ]
  },
  {
    "slug": "cua-so-cach-nhiet-uw-0-778",
    "ten": "Cửa sổ, cách nhiệt, Uw 0.778",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao",
      "Thông minh / động cơ"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "0.778",
      "Cách âm": "41 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-co-canh-luoi-cach-nhiet-uw-2-1",
    "ten": "Cửa sổ có cánh lưới, cách nhiệt, Uw 2.1",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Thông minh / động cơ",
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.1",
      "Cách âm": "35 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-co-canh-luoi-cach-nhiet-uw-2-1-1.webp"
    ]
  },
  {
    "slug": "cua-so-co-canh-luoi-cach-nhiet-uw-1-8-phien-ban-1",
    "ten": "Cửa sổ có cánh lưới, cách nhiệt, Uw 1.8, phiên bản 1",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.8",
      "Cách âm": "36 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-co-canh-luoi-cach-nhiet-uw-2-3",
    "ten": "Cửa sổ có cánh lưới, cách nhiệt, Uw 2.3",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.3",
      "Cách âm": "35 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-co-canh-luoi-cach-nhiet-uw-1-8-phien-ban-2",
    "ten": "Cửa sổ có cánh lưới, cách nhiệt, Uw 1.8, phiên bản 2",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.8",
      "Cách âm": "36 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-co-canh-luoi-cach-nhiet-uw-1-8-phien-ban-2-1.webp"
    ]
  },
  {
    "slug": "cua-so-kieu-co-dien-cach-nhiet",
    "ten": "Cửa sổ kiểu cổ điển, cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Thông minh / động cơ",
      "Kiểu cổ điển"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.5",
      "Cách âm": "39 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-kieu-co-dien-cach-nhiet-1.webp",
      "/images/he-cua/ban-ve/cua-so-kieu-co-dien-cach-nhiet-2.webp",
      "/images/he-cua/ban-ve/cua-so-kieu-co-dien-cach-nhiet-3.webp",
      "/images/he-cua/ban-ve/cua-so-kieu-co-dien-cach-nhiet-4.webp"
    ]
  },
  {
    "slug": "cua-so-thong-gio-cach-nhiet",
    "ten": "Cửa sổ thông gió, cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Thông minh / động cơ",
      "Thông gió"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.2",
      "Cách âm": "35 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-thong-gio-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-so-cach-nhiet-uw-2-5",
    "ten": "Cửa sổ, cách nhiệt, Uw 2.5",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Thông minh / động cơ"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.5",
      "Cách âm": "35 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC2 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so",
    "ten": "Cửa sổ",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "tn",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "3.0",
      "Cách âm": "30 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-di-cach-nhiet-uw-2-2-phien-ban-1",
    "ten": "Cửa đi, cách nhiệt, Uw 2.2, phiên bản 1",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [
      "Dễ tiếp cận"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.2",
      "Cách âm": "35 dB",
      "Độ kín nước": "700 Pa"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-2-phien-ban-1-1.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-2-phien-ban-1-2.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-2-phien-ban-1-3.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-2-phien-ban-1-4.webp"
    ]
  },
  {
    "slug": "cua-di-cach-nhiet-uw-2-6",
    "ten": "Cửa đi, cách nhiệt, Uw 2.6",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [
      "An ninh cao",
      "Dễ tiếp cận"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.6",
      "Cách âm": "33 dB",
      "Độ kín nước": "700 Pa",
      "Chống đột nhập": "RC3"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-6-1.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-6-2.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-6-3.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-6-4.webp"
    ]
  },
  {
    "slug": "cua-di-cach-nhiet-uw-2-2-phien-ban-2",
    "ten": "Cửa đi, cách nhiệt, Uw 2.2, phiên bản 2",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [
      "An ninh cao",
      "Dễ tiếp cận"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.2",
      "Cách âm": "35 dB",
      "Độ kín nước": "700 Pa",
      "Chống đột nhập": "RC3"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-2-phien-ban-2-1.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-2-phien-ban-2-2.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-2-phien-ban-2-3.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-2-phien-ban-2-4.webp"
    ]
  },
  {
    "slug": "cua-di-cach-nhiet-uw-1-6",
    "ten": "Cửa đi, cách nhiệt, Uw 1.6",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [
      "An ninh cao",
      "Dễ tiếp cận"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.6",
      "Cách âm": "38 dB",
      "Độ kín nước": "700 Pa",
      "Chống đột nhập": "RC3"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-1-6-1.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-1-6-2.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-1-6-3.webp",
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-1-6-4.webp"
    ]
  },
  {
    "slug": "cua-di-kieu-co-dien-cach-nhiet",
    "ten": "Cửa đi kiểu cổ điển, cách nhiệt",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [
      "Dễ tiếp cận",
      "Kiểu cổ điển"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.2",
      "Cách âm": "35 dB",
      "Độ kín nước": "700 Pa",
      "Chống đột nhập": "RC3 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-kieu-co-dien-cach-nhiet-1.webp",
      "/images/he-cua/ban-ve/cua-di-kieu-co-dien-cach-nhiet-2.webp",
      "/images/he-cua/ban-ve/cua-di-kieu-co-dien-cach-nhiet-3.webp",
      "/images/he-cua/ban-ve/cua-di-kieu-co-dien-cach-nhiet-4.webp"
    ]
  },
  {
    "slug": "cua-di-uw-3-3",
    "ten": "Cửa đi, Uw 3.3",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "tn",
    "chucNang": [
      "An ninh cao",
      "Dễ tiếp cận"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "3.3",
      "Cách âm": "30 dB",
      "Độ kín nước": "1000 Pa",
      "Chống đột nhập": "RC3"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-uw-3-3-1.webp",
      "/images/he-cua/ban-ve/cua-di-uw-3-3-2.webp",
      "/images/he-cua/ban-ve/cua-di-uw-3-3-3.webp",
      "/images/he-cua/ban-ve/cua-di-uw-3-3-4.webp"
    ]
  },
  {
    "slug": "cua-truot-cach-nhiet-uw-1-7-phien-ban-1",
    "ten": "Cửa trượt, cách nhiệt, Uw 1.7, phiên bản 1",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "t",
    "chucNang": [
      "An ninh cao",
      "Dễ tiếp cận"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.7",
      "Cách âm": "32 dB",
      "Độ kín nước": "350 Pa",
      "Chống đột nhập": "RC2"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-cach-nhiet-uw-1-7-phien-ban-1-1.webp"
    ]
  },
  {
    "slug": "cua-truot-cach-nhiet-uw-1-2",
    "ten": "Cửa trượt, cách nhiệt, Uw 1.2",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao",
      "An ninh cao",
      "Dễ tiếp cận",
      "Thông minh / động cơ"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.2",
      "Cách âm": "42 dB",
      "Độ kín nước": "400 Pa",
      "Chống đột nhập": "RC2"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-cach-nhiet-uw-1-2-1.webp",
      "/images/he-cua/ban-ve/cua-truot-cach-nhiet-uw-1-2-2.webp"
    ]
  },
  {
    "slug": "cua-truot-cach-nhiet-uw-2-5",
    "ten": "Cửa trượt, cách nhiệt, Uw 2.5",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "t",
    "chucNang": [
      "Dễ tiếp cận"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.5",
      "Cách âm": "33 dB",
      "Độ kín nước": "300 Pa"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-truot-cach-nhiet-uw-1-7-phien-ban-2",
    "ten": "Cửa trượt, cách nhiệt, Uw 1.7, phiên bản 2",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "t",
    "chucNang": [
      "Dễ tiếp cận"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.7",
      "Cách âm": "35 dB",
      "Độ kín nước": "800 Pa",
      "Chống đột nhập": "RC2 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-cach-nhiet-uw-1-7-phien-ban-2-1.webp",
      "/images/he-cua/ban-ve/cua-truot-cach-nhiet-uw-1-7-phien-ban-2-2.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-cach-nhiet-uw-1-4",
    "ten": "Cửa nâng trượt, cách nhiệt, Uw 1.4",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao",
      "An ninh cao",
      "Dễ tiếp cận"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1.4",
      "Cách âm": "37 dB",
      "Độ kín nước": "450 Pa",
      "Chống đột nhập": "RC2"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-cach-nhiet-uw-1-4-1.webp"
    ]
  },
  {
    "slug": "cua-xep-truot-cach-nhiet",
    "ten": "Cửa xếp trượt, cách nhiệt",
    "he": "f",
    "heTen": "Cửa xếp gấp",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2.2",
      "Cách âm": "33 dB",
      "Độ kín nước": "700 Pa",
      "Chống đột nhập": "RC2 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-xep-truot-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-so-truot-cach-nhiet",
    "ten": "Cửa sổ trượt, cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ trượt",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "3.2",
      "Cách âm": "28 dB",
      "Độ kín nước": "300 Pa",
      "Chống đột nhập": "RC2 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-truot-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-truot-uw-3-3",
    "ten": "Cửa trượt, Uw 3.3",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "tn",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "3.3",
      "Cách âm": "30 dB",
      "Độ kín nước": "500 Pa",
      "Chống đột nhập": "RC2 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-uw-3-3-1.webp",
      "/images/he-cua/ban-ve/cua-truot-uw-3-3-2.webp"
    ]
  },
  {
    "slug": "cua-so-truot",
    "ten": "Cửa sổ trượt",
    "he": "w",
    "heTen": "Cửa sổ trượt",
    "ketCau": "tn",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "3.8",
      "Cách âm": "25 dB",
      "Độ kín nước": "350 Pa",
      "Chống đột nhập": "RC2 (phụ kiện)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-truot-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-quay-phien-ban-1",
    "ten": "Cửa sổ mở quay, phiên bản 1",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-phien-ban-1-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-1-90",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 1.90",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,90 (Ug 0,7) · 1,80 (Ug 1,0)",
      "Độ kín khí": "Class 4"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-cach-nhiet-uw-1-90-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-1-21",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 1.21",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,21 (Ug 0,7) · 1,45 (Ug 1,0)",
      "Độ kín khí": "Class 4"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-0-96",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 0.96",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao",
      "An ninh cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "0,96 (Ug 0,6) · 1,30 (Ug 1,0)",
      "Độ kín khí": "Class 4",
      "Cách âm": "47 dB",
      "Độ kín nước": "E1500",
      "Chịu gió": "C5",
      "Chống đột nhập": "RC2/RC3 (bản kèm phụ kiện chống đột nhập)"
    },
    "ghiChu": "Khung 65/79 mm, cánh 71/77 mm. Catalog ghi Uw 1,4 (cửa 2 cánh 1540×1480) và 1,3 (1540×2180) với kính Ug 1,0.",
    "banVe": []
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-1-4",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 1.4",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,4 (Ug 0,7) · 1,6 (Ug 1,0)",
      "Độ kín khí": "Class 4",
      "Cách âm": "44 dB",
      "Độ kín nước": "9A",
      "Chịu gió": "C3"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-0-86",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 0.86",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao",
      "An ninh cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "0,86 (Ug 0,6) · 1,20 (Ug 1,0)",
      "Độ kín khí": "Class 4",
      "Cách âm": "41–46 dB",
      "Độ kín nước": "E1500",
      "Chịu gió": "C5",
      "Chống đột nhập": "RC2/RC3 (bản kèm phụ kiện chống đột nhập)"
    },
    "ghiChu": "Khung 75/89 mm, cánh 81/82,5 mm. Cánh nặng tối đa 170 kg (180 kg với bộ gia cường). Catalog ghi Uw 1,3 (cửa 2 cánh 1540×1480) và 1,2 (1540×2180) với kính Ug 1,0.",
    "banVe": []
  },
  {
    "slug": "cua-so-mo-quay-canh-an-cach-nhiet",
    "ten": "Cửa sổ mở quay (cánh ẩn), cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,3 (Ug 1,0)",
      "Cách âm": "đến 46 dB",
      "Độ kín nước": "E900",
      "Chịu gió": "C3"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-1-30-phien-ban-1",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 1.30, phiên bản 1",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,30 (Ug 1,0)",
      "Độ kín khí": "Class 4",
      "Cách âm": "đến 45 dB",
      "Độ kín nước": "E900",
      "Chịu gió": "C3"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-1-30-phien-ban-2",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 1.30, phiên bản 2",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,30 (Ug 1,0) · 1,00 (Ug 0,6)",
      "Độ kín khí": "Class 4",
      "Cách âm": "đến 46 dB",
      "Độ kín nước": "9A",
      "Chịu gió": "C3"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-1-30-phien-ban-3",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 1.30, phiên bản 3",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,30 (Ug 1,0) · 1,00 (Ug 0,6)",
      "Độ kín khí": "Class 4",
      "Cách âm": "đến 46 dB",
      "Độ kín nước": "9A",
      "Chịu gió": "C3"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-so-mo-quay-phien-ban-2",
    "ten": "Cửa sổ mở quay, phiên bản 2",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-phien-ban-2-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-1-54",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 1.54",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,54 · 1,78 (kính warm edge)",
      "Độ kín khí": "Class 4",
      "Cách âm": "37–44 dB",
      "Độ kín nước": "E750",
      "Chịu gió": "C4"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-cach-nhiet-uw-1-54-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-quay-phien-ban-3",
    "ten": "Cửa sổ mở quay, phiên bản 3",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-phien-ban-3-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-1-36",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 1.36",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,36 (Ug 0,7) · 1,59 (Ug 1,0)",
      "Độ kín khí": "Class 4",
      "Cách âm": "37–46 dB",
      "Độ kín nước": "9A",
      "Chịu gió": "C4"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-cach-nhiet-uw-1-36-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-quay-cach-nhiet-uw-1-07",
    "ten": "Cửa sổ mở quay, cách nhiệt, Uw 1.07",
    "he": "w",
    "heTen": "Cửa sổ",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,07 (Ug 0,7) · 1,31 (Ug 1,0)",
      "Độ kín khí": "Class 4",
      "Cách âm": "42–44 dB",
      "Độ kín nước": "E1200",
      "Chịu gió": "C4"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-cach-nhiet-uw-1-07-1.webp"
    ]
  },
  {
    "slug": "cua-truot",
    "ten": "Cửa trượt",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-truot-cach-nhiet-uw-1-90-phien-ban-1",
    "ten": "Cửa trượt, cách nhiệt, Uw 1.90, phiên bản 1",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,90 · 1,80 (Ug 1,0, hai kích thước thử)",
      "Độ kín khí": "Class 4",
      "Cách âm": "38 dB",
      "Độ kín nước": "9A",
      "Chịu gió": "C3"
    },
    "ghiChu": "Khung 2 ray 65/87 mm, cánh 46 mm, buồng kính 30 mm.",
    "banVe": []
  },
  {
    "slug": "cua-truot-cach-nhiet-uw-1-90-phien-ban-2",
    "ten": "Cửa trượt, cách nhiệt, Uw 1.90, phiên bản 2",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,90 · 1,80 (Ug 1,0, hai kích thước thử)",
      "Độ kín khí": "Class 4",
      "Cách âm": "38 dB",
      "Độ kín nước": "E900",
      "Chịu gió": "C3"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-truot-khung-an-cach-nhiet",
    "ten": "Cửa trượt khung ẩn, cách nhiệt",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao",
      "An ninh cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,40 (Ug 1,0)",
      "Độ kín khí": "Class 4",
      "Cách âm": "đến 40 dB",
      "Độ kín nước": "7A",
      "Chịu gió": "C1",
      "Chống đột nhập": "RC2 (cửa 2 cánh kèm phụ kiện chống đột nhập)"
    },
    "ghiChu": "Khung 2 ray 150 mm, cánh 59 mm, buồng kính 39–43 mm.",
    "banVe": []
  },
  {
    "slug": "cua-nang-truot-cach-nhiet-uw-1-70",
    "ten": "Cửa nâng trượt, cách nhiệt, Uw 1.70",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "ketCau": "t",
    "chucNang": [
      "An ninh cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,70 (Ug 1,0)",
      "Độ kín khí": "Class 4",
      "Cách âm": "đến 42 dB",
      "Độ kín nước": "E1350",
      "Chịu gió": "C4",
      "Chống đột nhập": "RC3/RC4 (cửa 2 cánh kèm phụ kiện chống đột nhập)"
    },
    "ghiChu": "Khung 2 ray 160 mm, cánh 67 mm.",
    "banVe": []
  },
  {
    "slug": "cua-di-phien-ban-1",
    "ten": "Cửa đi, phiên bản 1",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-phien-ban-1-1.webp"
    ]
  },
  {
    "slug": "cua-di-cach-nhiet-phien-ban-1",
    "ten": "Cửa đi, cách nhiệt, phiên bản 1",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-phien-ban-1-1.webp"
    ]
  },
  {
    "slug": "cua-di-cach-nhiet-uw-1-21",
    "ten": "Cửa đi, cách nhiệt, Uw 1.21",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,21 (Ug 0,7) · 1,45 (Ug 1,0)",
      "Độ kín khí": "Class 4"
    },
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-di-phien-ban-2",
    "ten": "Cửa đi, phiên bản 2",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-phien-ban-2-1.webp"
    ]
  },
  {
    "slug": "cua-di-phien-ban-3",
    "ten": "Cửa đi, phiên bản 3",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "n",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-phien-ban-3-1.webp"
    ]
  },
  {
    "slug": "cua-di-cach-nhiet-phien-ban-2",
    "ten": "Cửa đi, cách nhiệt, phiên bản 2",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-phien-ban-2-1.webp"
    ]
  },
  {
    "slug": "cua-di-cach-nhiet-uw-2-00",
    "ten": "Cửa đi, cách nhiệt, Uw 2.00",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "2,00 (Ug 0,7)"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-2-00-1.webp"
    ]
  },
  {
    "slug": "cua-di-cach-nhiet-uw-1-07",
    "ten": "Cửa đi, cách nhiệt, Uw 1.07",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [
      "Cách nhiệt cao"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,07 (Ug 0,7)",
      "Độ kín khí": "Class 3",
      "Cách âm": "40 dB",
      "Độ kín nước": "3A",
      "Chịu gió": "C2"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-cach-nhiet-uw-1-07-1.webp"
    ]
  },
  {
    "slug": "cua-di-thoat-hiem-cach-nhiet",
    "ten": "Cửa đi thoát hiểm, cách nhiệt",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [
      "Thoát hiểm"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U (W/m²K)": "1,70 (Ug 1,0)",
      "Độ kín khí": "Class 3",
      "Cách âm": "40 dB",
      "Độ kín nước": "3A",
      "Chịu gió": "C2"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-di-thoat-hiem-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-di-cach-nhiet-phien-ban-3",
    "ten": "Cửa đi, cách nhiệt, phiên bản 3",
    "he": "d",
    "heTen": "Cửa đi",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": []
  },
  {
    "slug": "cua-truot-cach-nhiet",
    "ten": "Cửa trượt, cách nhiệt",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "Khung 2 ray 150 mm, 3 ray 235 mm; cánh 65 mm; ngàm kính 15 mm.",
    "banVe": []
  },
  {
    "slug": "cua-nang-truot-cach-nhiet",
    "ten": "Cửa nâng trượt, cách nhiệt",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "ketCau": "t",
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "Khung 2 ray 150 mm, 3 ray 235 mm; cánh 65 mm; ngàm kính 15 mm.",
    "banVe": []
  },
  {
    "slug": "vach-kinh-truot",
    "ten": "Vách kính trượt",
    "he": "s",
    "heTen": "Cửa trượt",
    "ketCau": "",
    "chucNang": [
      "Thông minh / động cơ"
    ],
    "thongSo": {},
    "ghiChu": "Cánh khuyến nghị 450 kg, tối đa 1000 kg; vận hành tay hoặc động cơ; bánh xe inox, khung dưới âm sàn (theo tài liệu hãng).",
    "banVe": []
  }
];
