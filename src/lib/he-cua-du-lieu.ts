/**
 * Dữ liệu 43 hệ cửa nhôm kính (11/11/2026), tạo tự động từ bảng công bố của nhà sản xuất.
 * - Tên theo chức năng, không dùng tên hãng hoặc mã sản phẩm.
 * - Chỉ dùng bản vẽ 2D (đã kiểm tra không có tên hãng); ảnh 3D và ảnh thực tế có in logo nên không đưa vào.
 * - "Chức năng" được suy ra từ chính tên loại cửa và cấu tạo (cầu nhiệt), không thêm thông tin mới.
 * - Số liệu chỉ để tham khảo, thay đổi theo kích thước và cấu hình; cần xác nhận quyền sử dụng trước khi công bố chính thức.
 */
export type HeCua = {
  slug: string;
  ten: string;
  /** Hệ thống: s trượt, l nâng trượt, d cửa đi, f xếp gấp, w cửa sổ, v vách kính */
  he: "s" | "l" | "d" | "f" | "w" | "v";
  heTen: string;
  cauNhiet: boolean;
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
export const CHUC_NANG = ["Cách nhiệt","Tầm nhìn rộng","Kính ba lớp","Lan can an toàn","Lưới chống côn trùng","Thông gió","Khung mảnh"] as const;
export const THONG_SO_THU_TU = ["Hệ số truyền nhiệt U", "Độ kín khí", "Độ kín nước", "Áp lực gió", "Cách âm", "Chống trộm", "Kính áp dụng"] as const;

export const HE_CUA_DS: HeCua[] = [
  {
    "slug": "cua-truot-tam-nhin-mo-rong-cach-nhiet",
    "ten": "Cửa trượt tầm nhìn mở rộng, cách nhiệt",
    "he": "s",
    "heTen": "Cửa trượt",
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt",
      "Tầm nhìn rộng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 2.3",
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "28 dB",
      "Độ kín nước": "≤ E1200",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 1.2",
      "Độ kín khí": "Class 4",
      "Cách âm": "39 dB",
      "Độ kín nước": "E1200",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 2.5",
      "Độ kín khí": "Class 2",
      "Cách âm": "32 dB",
      "Độ kín nước": "Class 7A",
      "Áp lực gió": "C5/B5",
      "Kính áp dụng": "5–28 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-cach-nhiet-kinh-5-28-mm-phien-ban-1-1.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-kinh-ba-lop-cach-nhiet-kinh-24-52-mm-phien-ban-1",
    "ten": "Cửa nâng trượt kính ba lớp, cách nhiệt, kính 24–52 mm, phiên bản 1",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt",
      "Kính ba lớp"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 2.5",
      "Độ kín khí": "Class 4",
      "Cách âm": "36 dB",
      "Độ kín nước": "Class 8A",
      "Áp lực gió": "C5/B5",
      "Kính áp dụng": "24–52 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-kinh-ba-lop-cach-nhiet-kinh-24-52-mm-phien-ban-1-1.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-cach-nhiet-kinh-5-28-mm-phien-ban-2",
    "ten": "Cửa nâng trượt, cách nhiệt, kính 5–28 mm, phiên bản 2",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 2.5",
      "Độ kín khí": "Class 2",
      "Cách âm": "32 dB",
      "Độ kín nước": "Class 7A",
      "Áp lực gió": "C5/B5",
      "Kính áp dụng": "5–28 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-cach-nhiet-kinh-5-28-mm-phien-ban-2-1.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-kinh-ba-lop-cach-nhiet-kinh-24-52-mm-phien-ban-2",
    "ten": "Cửa nâng trượt kính ba lớp, cách nhiệt, kính 24–52 mm, phiên bản 2",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt",
      "Kính ba lớp"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 1.4",
      "Độ kín khí": "Class 4",
      "Cách âm": "36 dB",
      "Độ kín nước": "Class 8A",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 2.2",
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "34 dB",
      "Độ kín nước": "≤ E700",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 1.2",
      "Độ kín khí": "Class 4",
      "Cách âm": "34 dB",
      "Độ kín nước": "≤ E700",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 1.2",
      "Độ kín khí": "Class 4",
      "Cách âm": "29 dB",
      "Độ kín nước": "≥ E1000",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt",
      "Lan can an toàn"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 2.5",
      "Độ kín khí": "0.21 m³/(m·h)",
      "Cách âm": "35 dB",
      "Độ kín nước": "1000 Pa",
      "Áp lực gió": "≤ 5.0 kPa",
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
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt",
      "Lưới chống côn trùng",
      "Thông gió"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 2.6",
      "Độ kín khí": "Class 4",
      "Cách âm": "39 dB",
      "Độ kín nước": "E1200",
      "Áp lực gió": "C5/B5",
      "Kính áp dụng": "13–52 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-thong-gio-co-luoi-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-so-thong-gio-cach-nhiet",
    "ten": "Cửa sổ thông gió, cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ",
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt",
      "Thông gió"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 2.6",
      "Độ kín khí": "Class 4",
      "Cách âm": "39 dB",
      "Độ kín nước": "E700",
      "Áp lực gió": "C5/B5",
      "Kính áp dụng": "5–42 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-thong-gio-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-so-mo-hat-quay-co-luoi-cach-nhiet-kinh-13-52-mm",
    "ten": "Cửa sổ mở hất/quay có lưới, cách nhiệt, kính 13–52 mm",
    "he": "w",
    "heTen": "Cửa sổ",
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt",
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 1.8",
      "Độ kín khí": "Class 4",
      "Cách âm": "38 dB",
      "Độ kín nước": "E1200",
      "Áp lực gió": "C5/B5",
      "Kính áp dụng": "13–52 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-hat-quay-co-luoi-cach-nhiet-kinh-13-52-mm-1.webp"
    ]
  },
  {
    "slug": "cua-so-truot-cach-nhiet",
    "ten": "Cửa sổ trượt, cách nhiệt",
    "he": "w",
    "heTen": "Cửa sổ",
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 3.2",
      "Độ kín khí": "≤ Class 1",
      "Cách âm": "29 dB",
      "Độ kín nước": "≤ Class 5A",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt",
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 1.2",
      "Độ kín khí": "Class 4",
      "Cách âm": "34 dB",
      "Độ kín nước": "≤ E1200",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt",
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 2.6",
      "Độ kín khí": "Class 4",
      "Cách âm": "33 dB",
      "Độ kín nước": "≤ E1200",
      "Áp lực gió": "B5",
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
    "cauNhiet": true,
    "chucNang": [
      "Cách nhiệt"
    ],
    "thongSo": {
      "Hệ số truyền nhiệt U": "≥ 2.3",
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "34 dB",
      "Độ kín nước": "≤ E1200",
      "Áp lực gió": "C5/B5",
      "Kính áp dụng": "5–32 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-so-mo-quay-ra-cach-nhiet-1.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-kinh-5-24-mm-phien-ban-1",
    "ten": "Cửa nâng trượt, kính 5–24 mm, phiên bản 1",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "cauNhiet": false,
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 2",
      "Cách âm": "30 dB",
      "Độ kín nước": "≤ Class 8A",
      "Áp lực gió": "C5/B5",
      "Kính áp dụng": "5–24 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-kinh-5-24-mm-phien-ban-1-1.webp"
    ]
  },
  {
    "slug": "cua-nang-truot-kinh-5-24-mm-phien-ban-2",
    "ten": "Cửa nâng trượt, kính 5–24 mm, phiên bản 2",
    "he": "l",
    "heTen": "Cửa nâng trượt",
    "cauNhiet": false,
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 2",
      "Cách âm": "30 dB",
      "Độ kín nước": "≤ Class 8A",
      "Áp lực gió": "C5/B5",
      "Kính áp dụng": "5–24 mm"
    },
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-nang-truot-kinh-5-24-mm-phien-ban-2-1.webp"
    ]
  },
  {
    "slug": "cua-di-mo-quay-vao-kinh-5-24-mm",
    "ten": "Cửa đi mở quay vào, kính 5–24 mm",
    "he": "d",
    "heTen": "Cửa đi",
    "cauNhiet": false,
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "29 dB",
      "Độ kín nước": "≤ E700",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": false,
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "29 dB",
      "Độ kín nước": "≤ E1000",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": false,
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "31 dB",
      "Độ kín nước": "≤ E700",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": false,
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "31 dB",
      "Độ kín nước": "≤ E1000",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": false,
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 2",
      "Cách âm": "29 dB",
      "Độ kín nước": "≤ E1200",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": false,
    "chucNang": [],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "29 dB",
      "Độ kín nước": "≤ E1000",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": false,
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "31 dB",
      "Độ kín nước": "≤ E1200",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": false,
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "31 dB",
      "Độ kín nước": "≤ E1200",
      "Áp lực gió": "C5/B5",
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
    "heTen": "Cửa sổ",
    "cauNhiet": false,
    "chucNang": [
      "Lưới chống côn trùng"
    ],
    "thongSo": {
      "Độ kín khí": "≤ Class 2",
      "Cách âm": "26 dB",
      "Độ kín nước": "≤ Class 5A",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": false,
    "chucNang": [
      "Khung mảnh"
    ],
    "thongSo": {
      "Độ kín khí": "≤ Class 2",
      "Cách âm": "28 dB",
      "Độ kín nước": "≤ Class 5A",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": false,
    "chucNang": [
      "Khung mảnh"
    ],
    "thongSo": {
      "Độ kín khí": "≤ Class 4",
      "Cách âm": "28 dB",
      "Độ kín nước": "≤ E1200",
      "Áp lực gió": "C5/B5",
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
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
    "cauNhiet": false,
    "chucNang": [],
    "thongSo": {},
    "ghiChu": "",
    "banVe": [
      "/images/he-cua/ban-ve/cua-truot-ray-tren-1-3-ray-1.webp",
      "/images/he-cua/ban-ve/cua-truot-ray-tren-1-3-ray-2.webp",
      "/images/he-cua/ban-ve/cua-truot-ray-tren-1-3-ray-3.webp",
      "/images/he-cua/ban-ve/cua-truot-ray-tren-1-3-ray-4.webp"
    ]
  }
];
