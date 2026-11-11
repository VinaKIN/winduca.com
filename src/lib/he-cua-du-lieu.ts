/**
 * Dữ liệu 115 hệ cửa nhôm kính (11/11/2026), tạo tự động.
 * - 106 hệ lấy từ bảng công bố trên trang hệ cửa của Winboss; 9 hệ còn thiếu bổ sung từ tài liệu hãng trong thư mục ảnh (them = true).
 * - Ảnh: bản vẽ 2D đã kiểm tra (bỏ bản vẽ có logo, cắt dải mã sản phẩm ở đáy hình Civro) và 2 ảnh 3D đã kiểm tra không có logo.
 *   Ảnh 3D và ảnh thực tế còn lại có logo hãng nên chưa dùng.
 * - Số liệu chỉ để tham khảo, thay đổi theo kích thước và cấu hình; cần xác nhận quyền sử dụng trước khi công bố chính thức.
 */
export type Hang = "romadio" | "civro" | "ponzio";
export type HeCua = {
  id: number;
  hang: Hang;
  ma: string;
  loai: string;
  /** Hệ thống, có thể ghép nhiều ký tự: w cửa sổ, d cửa đi, s trượt, l nâng trượt, f xếp gấp, v vách kính */
  he: string;
  /** t có cầu nhiệt, n không cầu nhiệt, tn có cả hai, rỗng là chưa rõ */
  ketCau: "t" | "n" | "tn" | "";
  /** cn cách nhiệt cao, an an ninh cao, de dễ tiếp cận, sm thông minh / động cơ */
  tags: string[];
  u: string;
  kinKhi: string;
  cachAm: string;
  kinNuoc: string;
  chiuGio: string;
  chongTrom: string;
  ghiChu: string;
  anh: { c: string[]; d: string[] };
  them: boolean;
};

export const TEN_HANG: Record<Hang, string> = { romadio: "Romadio", civro: "Civro", ponzio: "Ponzio" };
export const TEN_TAG: Record<string, string> = { cn: "Cách nhiệt cao", an: "An ninh cao", de: "Dễ tiếp cận", sm: "Thông minh / Có động cơ" };
export const TEN_KET_CAU: Record<string, string> = { t: "Có cầu cách nhiệt", n: "Không cầu nhiệt", tn: "Có cả hai phiên bản" };
export const TEN_HE: Record<string, string> = { w: "Cửa sổ", d: "Cửa đi", s: "Cửa trượt", l: "Nâng trượt", f: "Xếp gấp", v: "Vách kính" };

export const HE_CUA_DS: HeCua[] = [
 {
  "id": 0,
  "hang": "civro",
  "ma": "PW80 · Enfini Pro Slender Frames",
  "loai": "Cửa sổ khung mảnh",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "1.7",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "500 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-pw80-enfini-pro-slender-frames-1.webp",
    "/images/he-cua/ban-ve/civro-pw80-enfini-pro-slender-frames-2.webp",
    "/images/he-cua/ban-ve/civro-pw80-enfini-pro-slender-frames-3.webp"
   ]
  },
  "them": false
 },
 {
  "id": 1,
  "hang": "civro",
  "ma": "MW65",
  "loai": "Cửa sổ",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "1.9",
  "kinKhi": "",
  "cachAm": "36 dB",
  "kinNuoc": "700 Pa",
  "chiuGio": "",
  "chongTrom": "N/A",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-mw65-1.webp",
    "/images/he-cua/ban-ve/civro-mw65-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 2,
  "hang": "civro",
  "ma": "XW55",
  "loai": "Cửa sổ",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "sm"
  ],
  "u": "2.1",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 3,
  "hang": "civro",
  "ma": "XW65",
  "loai": "Cửa sổ",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "sm"
  ],
  "u": "1.8",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xw65-1.webp",
    "/images/he-cua/ban-ve/civro-xw65-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 4,
  "hang": "civro",
  "ma": "XW75",
  "loai": "Cửa sổ",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "sm"
  ],
  "u": "1.5",
  "kinKhi": "",
  "cachAm": "38 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xw75-1.webp",
    "/images/he-cua/ban-ve/civro-xw75-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 5,
  "hang": "civro",
  "ma": "XW80",
  "loai": "Cửa sổ",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn",
   "sm"
  ],
  "u": "1.2",
  "kinKhi": "",
  "cachAm": "39 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xw80-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 6,
  "hang": "civro",
  "ma": "XW98",
  "loai": "Cửa sổ",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn",
   "sm"
  ],
  "u": "0.778",
  "kinKhi": "",
  "cachAm": "41 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 7,
  "hang": "civro",
  "ma": "XWS90",
  "loai": "Cửa sổ có cánh lưới",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "sm"
  ],
  "u": "2.1",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xws90-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 8,
  "hang": "civro",
  "ma": "XWS100",
  "loai": "Cửa sổ có cánh lưới",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "1.8",
  "kinKhi": "",
  "cachAm": "36 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 9,
  "hang": "civro",
  "ma": "XWS115",
  "loai": "Cửa sổ có cánh lưới",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "2.3",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 10,
  "hang": "civro",
  "ma": "XWS125",
  "loai": "Cửa sổ có cánh lưới",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "1.8",
  "kinKhi": "",
  "cachAm": "36 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xws125-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 11,
  "hang": "civro",
  "ma": "Retro XW85_BC/XW95_BC",
  "loai": "Cửa sổ kiểu Retro",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "sm"
  ],
  "u": "1.5",
  "kinKhi": "",
  "cachAm": "39 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-retro-xw85-bc-xw95-bc-1.webp",
    "/images/he-cua/ban-ve/civro-retro-xw85-bc-xw95-bc-2.webp",
    "/images/he-cua/ban-ve/civro-retro-xw85-bc-xw95-bc-3.webp",
    "/images/he-cua/ban-ve/civro-retro-xw85-bc-xw95-bc-4.webp"
   ]
  },
  "them": false
 },
 {
  "id": 12,
  "hang": "civro",
  "ma": "XVE65 & XVE100",
  "loai": "Cửa sổ thông gió",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "sm"
  ],
  "u": "2.2",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xve65-xve100-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 13,
  "hang": "civro",
  "ma": "XW100PO/XW110PO",
  "loai": "Cửa sổ",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "sm"
  ],
  "u": "2.5",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC2 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 14,
  "hang": "civro",
  "ma": "NW55_E",
  "loai": "Cửa sổ",
  "he": "w",
  "ketCau": "tn",
  "tags": [],
  "u": "3.0",
  "kinKhi": "",
  "cachAm": "30 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 15,
  "hang": "civro",
  "ma": "MD65",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "t",
  "tags": [
   "de"
  ],
  "u": "2.2",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "700 Pa",
  "chiuGio": "",
  "chongTrom": "N/A",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-md65-1.webp",
    "/images/he-cua/ban-ve/civro-md65-2.webp",
    "/images/he-cua/ban-ve/civro-md65-3.webp",
    "/images/he-cua/ban-ve/civro-md65-4.webp"
   ]
  },
  "them": false
 },
 {
  "id": 16,
  "hang": "civro",
  "ma": "XD55",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "t",
  "tags": [
   "an",
   "de"
  ],
  "u": "2.6",
  "kinKhi": "",
  "cachAm": "33 dB",
  "kinNuoc": "700 Pa",
  "chiuGio": "",
  "chongTrom": "RC3",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xd55-1.webp",
    "/images/he-cua/ban-ve/civro-xd55-2.webp",
    "/images/he-cua/ban-ve/civro-xd55-3.webp",
    "/images/he-cua/ban-ve/civro-xd55-4.webp"
   ]
  },
  "them": false
 },
 {
  "id": 17,
  "hang": "civro",
  "ma": "XD65",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "t",
  "tags": [
   "an",
   "de"
  ],
  "u": "2.2",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "700 Pa",
  "chiuGio": "",
  "chongTrom": "RC3",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xd65-1.webp",
    "/images/he-cua/ban-ve/civro-xd65-2.webp",
    "/images/he-cua/ban-ve/civro-xd65-3.webp",
    "/images/he-cua/ban-ve/civro-xd65-4.webp"
   ]
  },
  "them": false
 },
 {
  "id": 18,
  "hang": "civro",
  "ma": "XD80",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "t",
  "tags": [
   "an",
   "de"
  ],
  "u": "1.6",
  "kinKhi": "",
  "cachAm": "38 dB",
  "kinNuoc": "700 Pa",
  "chiuGio": "",
  "chongTrom": "RC3",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xd80-1.webp",
    "/images/he-cua/ban-ve/civro-xd80-2.webp",
    "/images/he-cua/ban-ve/civro-xd80-3.webp",
    "/images/he-cua/ban-ve/civro-xd80-4.webp"
   ]
  },
  "them": false
 },
 {
  "id": 19,
  "hang": "civro",
  "ma": "Retro XD85_BC/XD95_BC",
  "loai": "Cửa đi kiểu Retro",
  "he": "d",
  "ketCau": "t",
  "tags": [
   "de"
  ],
  "u": "2.2",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "700 Pa",
  "chiuGio": "",
  "chongTrom": "RC3 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-retro-xd85-bc-xd95-bc-1.webp",
    "/images/he-cua/ban-ve/civro-retro-xd85-bc-xd95-bc-2.webp",
    "/images/he-cua/ban-ve/civro-retro-xd85-bc-xd95-bc-3.webp",
    "/images/he-cua/ban-ve/civro-retro-xd85-bc-xd95-bc-4.webp"
   ]
  },
  "them": false
 },
 {
  "id": 20,
  "hang": "civro",
  "ma": "ND55_E",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "tn",
  "tags": [
   "an",
   "de"
  ],
  "u": "3.3",
  "kinKhi": "",
  "cachAm": "30 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "",
  "chongTrom": "RC3",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-nd55-e-1.webp",
    "/images/he-cua/ban-ve/civro-nd55-e-2.webp",
    "/images/he-cua/ban-ve/civro-nd55-e-3.webp",
    "/images/he-cua/ban-ve/civro-nd55-e-4.webp"
   ]
  },
  "them": false
 },
 {
  "id": 21,
  "hang": "civro",
  "ma": "PD65 · Enfini Pro",
  "loai": "Cửa trượt",
  "he": "s",
  "ketCau": "t",
  "tags": [
   "an",
   "de"
  ],
  "u": "1.7",
  "kinKhi": "",
  "cachAm": "32 dB",
  "kinNuoc": "350 Pa",
  "chiuGio": "",
  "chongTrom": "RC2",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-pd65-enfini-pro-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 22,
  "hang": "civro",
  "ma": "CIVRO-ORAMA UD137/UD207",
  "loai": "Cửa trượt",
  "he": "s",
  "ketCau": "t",
  "tags": [
   "cn",
   "an",
   "de",
   "sm"
  ],
  "u": "1.2",
  "kinKhi": "",
  "cachAm": "42 dB",
  "kinNuoc": "400 Pa",
  "chiuGio": "",
  "chongTrom": "RC2",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-civro-orama-ud137-ud207-1.webp",
    "/images/he-cua/ban-ve/civro-civro-orama-ud137-ud207-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 23,
  "hang": "civro",
  "ma": "MD45SS",
  "loai": "Cửa trượt",
  "he": "s",
  "ketCau": "t",
  "tags": [
   "de"
  ],
  "u": "2.5",
  "kinKhi": "",
  "cachAm": "33 dB",
  "kinNuoc": "300 Pa",
  "chiuGio": "",
  "chongTrom": "N/A",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 24,
  "hang": "civro",
  "ma": "XD63",
  "loai": "Cửa trượt",
  "he": "s",
  "ketCau": "t",
  "tags": [
   "de"
  ],
  "u": "1.7",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "800 Pa",
  "chiuGio": "",
  "chongTrom": "RC2 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xd63-1.webp",
    "/images/he-cua/ban-ve/civro-xd63-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 25,
  "hang": "civro",
  "ma": "XD73LS",
  "loai": "Cửa nâng trượt",
  "he": "l",
  "ketCau": "t",
  "tags": [
   "cn",
   "an",
   "de"
  ],
  "u": "1.4",
  "kinKhi": "",
  "cachAm": "37 dB",
  "kinNuoc": "450 Pa",
  "chiuGio": "",
  "chongTrom": "RC2",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-xd73ls-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 26,
  "hang": "civro",
  "ma": "AD80FD",
  "loai": "Cửa xếp trượt",
  "he": "f",
  "ketCau": "t",
  "tags": [],
  "u": "2.2",
  "kinKhi": "",
  "cachAm": "33 dB",
  "kinNuoc": "700 Pa",
  "chiuGio": "",
  "chongTrom": "RC2 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-ad80fd-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 27,
  "hang": "civro",
  "ma": "AW55SS",
  "loai": "Cửa sổ trượt",
  "he": "ws",
  "ketCau": "t",
  "tags": [],
  "u": "3.2",
  "kinKhi": "",
  "cachAm": "28 dB",
  "kinNuoc": "300 Pa",
  "chiuGio": "",
  "chongTrom": "RC2 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-aw55ss-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 28,
  "hang": "civro",
  "ma": "ND45SS",
  "loai": "Cửa trượt",
  "he": "s",
  "ketCau": "tn",
  "tags": [],
  "u": "3.3",
  "kinKhi": "",
  "cachAm": "30 dB",
  "kinNuoc": "500 Pa",
  "chiuGio": "",
  "chongTrom": "RC2 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-nd45ss-1.webp",
    "/images/he-cua/ban-ve/civro-nd45ss-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 29,
  "hang": "civro",
  "ma": "NW55SS",
  "loai": "Cửa sổ trượt",
  "he": "ws",
  "ketCau": "tn",
  "tags": [],
  "u": "3.8",
  "kinKhi": "",
  "cachAm": "25 dB",
  "kinNuoc": "350 Pa",
  "chiuGio": "",
  "chongTrom": "RC2 (phụ kiện)",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/civro-nw55ss-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 30,
  "hang": "romadio",
  "ma": "PANORAMA 19H",
  "loai": "Cửa trượt Infinity View",
  "he": "s",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 2.3",
  "kinKhi": "≤ Class 4",
  "cachAm": "28 dB",
  "kinNuoc": "≤ E1200",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 10–32 mm",
  "anh": {
   "c": [
    "/images/he-cua/mau-goc/romadio-panorama-19h-g1.webp"
   ],
   "d": [
    "/images/he-cua/ban-ve/romadio-panorama-19h-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 31,
  "hang": "romadio",
  "ma": "RCT65",
  "loai": "Vách kính (Curtain wall)",
  "he": "v",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 1.2",
  "kinKhi": "Class 4",
  "cachAm": "39 dB",
  "kinNuoc": "E1200",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–28 mm",
  "anh": {
   "c": [
    "/images/he-cua/mau-goc/romadio-rct65-g1.webp"
   ],
   "d": []
  },
  "them": false
 },
 {
  "id": 32,
  "hang": "romadio",
  "ma": "RD120LS/SS",
  "loai": "Cửa nâng trượt",
  "he": "l",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 2.5",
  "kinKhi": "Class 2",
  "cachAm": "32 dB",
  "kinNuoc": "Class 7A",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–28 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rd120ls-ss-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 33,
  "hang": "romadio",
  "ma": "RD150LS/SS Triple Glass",
  "loai": "Cửa nâng trượt kính ba lớp",
  "he": "l",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 2.5",
  "kinKhi": "Class 4",
  "cachAm": "36 dB",
  "kinNuoc": "Class 8A",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 24–52 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rd150ls-ss-triple-glass-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 34,
  "hang": "romadio",
  "ma": "RD190LS/SS",
  "loai": "Cửa nâng trượt",
  "he": "l",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 2.5",
  "kinKhi": "Class 2",
  "cachAm": "32 dB",
  "kinNuoc": "Class 7A",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–28 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rd190ls-ss-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 35,
  "hang": "romadio",
  "ma": "RD225LS/SS Triple Glass",
  "loai": "Cửa nâng trượt kính ba lớp",
  "he": "l",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 1.4",
  "kinKhi": "Class 4",
  "cachAm": "36 dB",
  "kinNuoc": "Class 8A",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 24–52 mm",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 36,
  "hang": "romadio",
  "ma": "RD65IN",
  "loai": "Cửa đi mở quay vào",
  "he": "d",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 2.2",
  "kinKhi": "≤ Class 4",
  "cachAm": "34 dB",
  "kinNuoc": "≤ E700",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–42 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rd65in-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 37,
  "hang": "romadio",
  "ma": "RD65OU",
  "loai": "Cửa đi mở quay ra",
  "he": "d",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 1.2",
  "kinKhi": "Class 4",
  "cachAm": "34 dB",
  "kinNuoc": "≤ E700",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–32 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rd65ou-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 38,
  "hang": "romadio",
  "ma": "RD80FD",
  "loai": "Cửa xếp gấp",
  "he": "f",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 1.2",
  "kinKhi": "Class 4",
  "cachAm": "29 dB",
  "kinNuoc": "≥ E1000",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–36 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rd80fd-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 39,
  "hang": "romadio",
  "ma": "RP127OU + Fence",
  "loai": "Cửa sổ song song có lan can",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 2.5",
  "kinKhi": "0.21 m³/(m·h)",
  "cachAm": "35 dB",
  "kinNuoc": "1000 Pa",
  "chiuGio": "≤ 5.0 kPa",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 24 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rp127ou-fence-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 40,
  "hang": "romadio",
  "ma": "RVE100IN",
  "loai": "Cửa sổ thông gió có lưới",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 2.6",
  "kinKhi": "Class 4",
  "cachAm": "39 dB",
  "kinNuoc": "E1200",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 13–52 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rve100in-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 41,
  "hang": "romadio",
  "ma": "RVE65IN",
  "loai": "Cửa sổ thông gió",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 2.6",
  "kinKhi": "Class 4",
  "cachAm": "39 dB",
  "kinNuoc": "E700",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–42 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rve65in-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 42,
  "hang": "romadio",
  "ma": "RW100IN + FW40G",
  "loai": "Cửa sổ mở hất/quay có lưới",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 1.8",
  "kinKhi": "Class 4",
  "cachAm": "38 dB",
  "kinNuoc": "E1200",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 13–52 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rw100in-fw40g-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 43,
  "hang": "romadio",
  "ma": "RW100SS",
  "loai": "Cửa sổ trượt",
  "he": "ws",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 3.2",
  "kinKhi": "≤ Class 1",
  "cachAm": "29 dB",
  "kinNuoc": "≤ Class 5A",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 24 mm",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 44,
  "hang": "romadio",
  "ma": "RW120OU + MESH",
  "loai": "Cửa sổ mở quay ra có lưới",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 1.2",
  "kinKhi": "Class 4",
  "cachAm": "34 dB",
  "kinNuoc": "≤ E1200",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–32 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rw120ou-mesh-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 45,
  "hang": "romadio",
  "ma": "RW65IN + Mesh",
  "loai": "Cửa sổ mở hất/quay có lưới",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 2.6",
  "kinKhi": "Class 4",
  "cachAm": "33 dB",
  "kinNuoc": "≤ E1200",
  "chiuGio": "B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–42 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rw65in-mesh-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 46,
  "hang": "romadio",
  "ma": "RW65OU",
  "loai": "Cửa sổ mở quay ra",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "≥ 2.3",
  "kinKhi": "≤ Class 4",
  "cachAm": "34 dB",
  "kinNuoc": "≤ E1200",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–32 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-rw65ou-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 47,
  "hang": "romadio",
  "ma": "MD120LS/SS",
  "loai": "Cửa nâng trượt",
  "he": "l",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 2",
  "cachAm": "30 dB",
  "kinNuoc": "≤ Class 8A",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–24 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-md120ls-ss-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 48,
  "hang": "romadio",
  "ma": "MD190LS/SS",
  "loai": "Cửa nâng trượt",
  "he": "l",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 2",
  "cachAm": "30 dB",
  "kinNuoc": "≤ Class 8A",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–24 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-md190ls-ss-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 49,
  "hang": "romadio",
  "ma": "MD55IN",
  "loai": "Cửa đi mở quay vào",
  "he": "d",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 4",
  "cachAm": "29 dB",
  "kinNuoc": "≤ E700",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–24 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-md55in-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 50,
  "hang": "romadio",
  "ma": "MD55OU",
  "loai": "Cửa đi mở quay ra",
  "he": "d",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 4",
  "cachAm": "29 dB",
  "kinNuoc": "≤ E1000",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–24 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-md55ou-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 51,
  "hang": "romadio",
  "ma": "MD65IN",
  "loai": "Cửa đi mở quay vào",
  "he": "d",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 4",
  "cachAm": "31 dB",
  "kinNuoc": "≤ E700",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–32 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-md65in-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 52,
  "hang": "romadio",
  "ma": "MD65OU",
  "loai": "Cửa đi mở quay ra",
  "he": "d",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 4",
  "cachAm": "31 dB",
  "kinNuoc": "≤ E1000",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–32 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-md65ou-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 53,
  "hang": "romadio",
  "ma": "MD80FD",
  "loai": "Cửa xếp gấp",
  "he": "f",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 2",
  "cachAm": "29 dB",
  "kinNuoc": "≤ E1200",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–36 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-md80fd-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 54,
  "hang": "romadio",
  "ma": "MW55OU",
  "loai": "Cửa sổ mở quay ra",
  "he": "w",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 4",
  "cachAm": "29 dB",
  "kinNuoc": "≤ E1000",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–24 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-mw55ou-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 55,
  "hang": "romadio",
  "ma": "MW65IN + Mesh",
  "loai": "Cửa sổ mở hất/quay có lưới",
  "he": "w",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 4",
  "cachAm": "31 dB",
  "kinNuoc": "≤ E1200",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–42 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-mw65in-mesh-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 56,
  "hang": "romadio",
  "ma": "MW65OU + MESH",
  "loai": "Cửa sổ mở quay ra có lưới",
  "he": "w",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 4",
  "cachAm": "31 dB",
  "kinNuoc": "≤ E1200",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–32 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-mw65ou-mesh-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 57,
  "hang": "romadio",
  "ma": "MW65SS + Mesh",
  "loai": "Cửa sổ trượt có lưới",
  "he": "ws",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 2",
  "cachAm": "26 dB",
  "kinNuoc": "≤ Class 5A",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 5–24 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-mw65ss-mesh-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 58,
  "hang": "romadio",
  "ma": "PANORAMA 19S · 2 ray",
  "loai": "Cửa trượt slim",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 2",
  "cachAm": "28 dB",
  "kinNuoc": "≤ Class 5A",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 10–32 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-panorama-19s-2-ray-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 59,
  "hang": "romadio",
  "ma": "PANORAMA 19S · 3 ray",
  "loai": "Cửa trượt slim",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "≤ Class 4",
  "cachAm": "28 dB",
  "kinNuoc": "≤ E1200",
  "chiuGio": "C5/B5",
  "chongTrom": "",
  "ghiChu": "Kính áp dụng: 15–32 mm",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-panorama-19s-3-ray-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 60,
  "hang": "ponzio",
  "ma": "WS 45",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-ws-45-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 61,
  "hang": "ponzio",
  "ma": "WS 45 TT",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "1,90 (Ug 0,7) · 1,80 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-ws-45-tt-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 62,
  "hang": "ponzio",
  "ma": "WS 55 TT",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn"
  ],
  "u": "1,21 (Ug 0,7) · 1,45 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 63,
  "hang": "ponzio",
  "ma": "WS 65 THI",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn",
   "an"
  ],
  "u": "0,96 (Ug 0,6) · 1,30 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "47 dB",
  "kinNuoc": "E1500",
  "chiuGio": "C5",
  "chongTrom": "RC2/RC3 (bản kèm phụ kiện chống đột nhập)",
  "ghiChu": "Khung 65/79 mm, cánh 71/77 mm. Catalog ghi Uw 1,4 (cửa 2 cánh 1540×1480) và 1,3 (1540×2180) với kính Ug 1,0.",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 64,
  "hang": "ponzio",
  "ma": "WS 65 THI AS",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn"
  ],
  "u": "1,4 (Ug 0,7) · 1,6 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "44 dB",
  "kinNuoc": "9A",
  "chiuGio": "C3",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 65,
  "hang": "ponzio",
  "ma": "WS 75 THI",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn",
   "an"
  ],
  "u": "0,86 (Ug 0,6) · 1,20 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "41–46 dB",
  "kinNuoc": "E1500",
  "chiuGio": "C5",
  "chongTrom": "RC2/RC3 (bản kèm phụ kiện chống đột nhập)",
  "ghiChu": "Khung 75/89 mm, cánh 81/82,5 mm. Cánh nặng tối đa 170 kg (180 kg với bộ gia cường). Catalog ghi Uw 1,3 (cửa 2 cánh 1540×1480) và 1,2 (1540×2180) với kính Ug 1,0.",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 66,
  "hang": "ponzio",
  "ma": "WS 65/75 AS",
  "loai": "Cửa sổ/cửa mở quay (cánh ẩn)",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn"
  ],
  "u": "1,3 (Ug 1,0)",
  "kinKhi": "",
  "cachAm": "đến 46 dB",
  "kinNuoc": "E900",
  "chiuGio": "C3",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 67,
  "hang": "ponzio",
  "ma": "WS 65/75 AD",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn"
  ],
  "u": "1,30 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "đến 45 dB",
  "kinNuoc": "E900",
  "chiuGio": "C3",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 68,
  "hang": "ponzio",
  "ma": "WS 65/75 FL",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn"
  ],
  "u": "1,30 (Ug 1,0) · 1,00 (Ug 0,6)",
  "kinKhi": "Class 4",
  "cachAm": "đến 46 dB",
  "kinNuoc": "9A",
  "chiuGio": "C3",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 69,
  "hang": "ponzio",
  "ma": "WS 65/75 IL",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn"
  ],
  "u": "1,30 (Ug 1,0) · 1,00 (Ug 0,6)",
  "kinKhi": "Class 4",
  "cachAm": "đến 46 dB",
  "kinNuoc": "9A",
  "chiuGio": "C3",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 70,
  "hang": "ponzio",
  "ma": "NT 50",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-nt-50-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 71,
  "hang": "ponzio",
  "ma": "NT 52 TT",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [],
  "u": "1,54 · 1,78 (kính warm edge)",
  "kinKhi": "Class 4",
  "cachAm": "37–44 dB",
  "kinNuoc": "E750",
  "chiuGio": "C4",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-nt-52-tt-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 72,
  "hang": "ponzio",
  "ma": "NT 60 F",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-nt-60-f-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 73,
  "hang": "ponzio",
  "ma": "NT 60 TT",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn"
  ],
  "u": "1,36 (Ug 0,7) · 1,59 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "37–46 dB",
  "kinNuoc": "9A",
  "chiuGio": "C4",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-nt-60-tt-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 74,
  "hang": "ponzio",
  "ma": "NT 65 TT",
  "loai": "Cửa sổ/cửa mở quay",
  "he": "w",
  "ketCau": "t",
  "tags": [
   "cn"
  ],
  "u": "1,07 (Ug 0,7) · 1,31 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "42–44 dB",
  "kinNuoc": "E1200",
  "chiuGio": "C4",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-nt-65-tt-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 75,
  "hang": "ponzio",
  "ma": "SL600 Evo Freddo",
  "loai": "Cửa trượt",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 76,
  "hang": "ponzio",
  "ma": "SL600 TT Evo",
  "loai": "Cửa trượt",
  "he": "s",
  "ketCau": "t",
  "tags": [],
  "u": "1,90 · 1,80 (Ug 1,0, hai kích thước thử)",
  "kinKhi": "Class 4",
  "cachAm": "38 dB",
  "kinNuoc": "9A",
  "chiuGio": "C3",
  "chongTrom": "",
  "ghiChu": "Khung 2 ray 65/87 mm, cánh 46 mm, buồng kính 30 mm.",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 77,
  "hang": "ponzio",
  "ma": "SL600 TT Evozero",
  "loai": "Cửa trượt",
  "he": "s",
  "ketCau": "t",
  "tags": [],
  "u": "1,90 · 1,80 (Ug 1,0, hai kích thước thử)",
  "kinKhi": "Class 4",
  "cachAm": "38 dB",
  "kinNuoc": "E900",
  "chiuGio": "C3",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 78,
  "hang": "ponzio",
  "ma": "SL1300 TT",
  "loai": "Cửa trượt khung ẩn",
  "he": "s",
  "ketCau": "t",
  "tags": [
   "cn",
   "an"
  ],
  "u": "1,40 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "đến 40 dB",
  "kinNuoc": "7A",
  "chiuGio": "C1",
  "chongTrom": "RC2 (cửa 2 cánh kèm phụ kiện chống đột nhập)",
  "ghiChu": "Khung 2 ray 150 mm, cánh 59 mm, buồng kính 39–43 mm.",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 79,
  "hang": "ponzio",
  "ma": "SL1600 TT",
  "loai": "Cửa nâng trượt",
  "he": "l",
  "ketCau": "t",
  "tags": [
   "an"
  ],
  "u": "1,70 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "đến 42 dB",
  "kinNuoc": "E1350",
  "chiuGio": "C4",
  "chongTrom": "RC3/RC4 (cửa 2 cánh kèm phụ kiện chống đột nhập)",
  "ghiChu": "Khung 2 ray 160 mm, cánh 67 mm.",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 80,
  "hang": "ponzio",
  "ma": "WS 45 (cửa đi)",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-ws-45-cua-di-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 81,
  "hang": "ponzio",
  "ma": "WS 45 TT (cửa đi)",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "t",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-ws-45-tt-cua-di-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 82,
  "hang": "ponzio",
  "ma": "WS 55 TT (cửa đi)",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "t",
  "tags": [
   "cn"
  ],
  "u": "1,21 (Ug 0,7) · 1,45 (Ug 1,0)",
  "kinKhi": "Class 4",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 83,
  "hang": "ponzio",
  "ma": "WS 60 (cửa đi)",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-ws-60-cua-di-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 84,
  "hang": "ponzio",
  "ma": "NT 50 (cửa đi)",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-nt-50-cua-di-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 85,
  "hang": "ponzio",
  "ma": "NT 52 TT (cửa đi)",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "t",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-nt-52-tt-cua-di-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 86,
  "hang": "ponzio",
  "ma": "NT 60 TT (cửa đi)",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "t",
  "tags": [],
  "u": "2,00 (Ug 0,7)",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-nt-60-tt-cua-di-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 87,
  "hang": "ponzio",
  "ma": "NT 65 TT (cửa đi)",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "t",
  "tags": [
   "cn"
  ],
  "u": "1,07 (Ug 0,7)",
  "kinKhi": "Class 3",
  "cachAm": "40 dB",
  "kinNuoc": "3A",
  "chiuGio": "C2",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-nt-65-tt-cua-di-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 88,
  "hang": "ponzio",
  "ma": "NT 65 TT Panic (SAC 1)",
  "loai": "Cửa đi thoát hiểm",
  "he": "d",
  "ketCau": "t",
  "tags": [],
  "u": "1,70 (Ug 1,0)",
  "kinKhi": "Class 3",
  "cachAm": "40 dB",
  "kinNuoc": "3A",
  "chiuGio": "C2",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/ponzio-nt-65-tt-panic-sac-1-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 89,
  "hang": "ponzio",
  "ma": "NT 75 TT HI (cửa đi)",
  "loai": "Cửa đi",
  "he": "d",
  "ketCau": "t",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 90,
  "hang": "ponzio",
  "ma": "SL65 In linea",
  "loai": "Cửa trượt",
  "he": "s",
  "ketCau": "t",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Khung 2 ray 150 mm, 3 ray 235 mm; cánh 65 mm; ngàm kính 15 mm.",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 91,
  "hang": "ponzio",
  "ma": "SL65 Nâng trượt",
  "loai": "Cửa nâng trượt",
  "he": "l",
  "ketCau": "t",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Khung 2 ray 150 mm, 3 ray 235 mm; cánh 65 mm; ngàm kính 15 mm.",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 92,
  "hang": "ponzio",
  "ma": "Apexfine",
  "loai": "Vách kính trượt",
  "he": "s",
  "ketCau": "",
  "tags": [
   "sm"
  ],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Cánh khuyến nghị 450 kg, tối đa 1000 kg; vận hành tay hoặc động cơ; bánh xe inox, khung dưới âm sàn (theo tài liệu hãng).",
  "anh": {
   "c": [],
   "d": []
  },
  "them": false
 },
 {
  "id": 93,
  "hang": "romadio",
  "ma": "LID45",
  "loai": "Cửa trượt 1 cánh, ray trên",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Không khung bao đứng",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-lid45-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 94,
  "hang": "romadio",
  "ma": "LID58",
  "loai": "Cửa trượt bánh xe dưới / trên",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-lid58-1.webp",
    "/images/he-cua/ban-ve/romadio-lid58-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 95,
  "hang": "romadio",
  "ma": "LID102",
  "loai": "Cửa trượt 2 ray treo trên",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Không khung bao đứng",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-lid102-1.webp"
   ]
  },
  "them": false
 },
 {
  "id": 96,
  "hang": "romadio",
  "ma": "LID115",
  "loai": "Cửa trượt bánh xe dưới / trên, 2–4 cánh",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-lid115-1.webp",
    "/images/he-cua/ban-ve/romadio-lid115-2.webp",
    "/images/he-cua/ban-ve/romadio-lid115-3.webp",
    "/images/he-cua/ban-ve/romadio-lid115-4.webp"
   ]
  },
  "them": false
 },
 {
  "id": 97,
  "hang": "romadio",
  "ma": "LID172",
  "loai": "Cửa trượt bánh xe dưới / trên, 3 cánh",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-lid172-1.webp",
    "/images/he-cua/ban-ve/romadio-lid172-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 98,
  "hang": "romadio",
  "ma": "LID230",
  "loai": "Cửa trượt bánh xe dưới / trên, 4 cánh",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-lid230-1.webp",
    "/images/he-cua/ban-ve/romadio-lid230-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 99,
  "hang": "romadio",
  "ma": "LID67IN",
  "loai": "Cửa mở quay vào, 1–2 cánh",
  "he": "d",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-lid67in-1.webp",
    "/images/he-cua/ban-ve/romadio-lid67in-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 100,
  "hang": "romadio",
  "ma": "LID67OU",
  "loai": "Cửa mở quay ra, 1–2 cánh, có phào",
  "he": "d",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-lid67ou-1.webp",
    "/images/he-cua/ban-ve/romadio-lid67ou-2.webp",
    "/images/he-cua/ban-ve/romadio-lid67ou-3.webp"
   ]
  },
  "them": false
 },
 {
  "id": 101,
  "hang": "romadio",
  "ma": "LD16IN",
  "loai": "Cửa mở quay vào dòng Slim",
  "he": "d",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-ld16in-1.webp",
    "/images/he-cua/ban-ve/romadio-ld16in-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 102,
  "hang": "romadio",
  "ma": "LD16OU",
  "loai": "Cửa mở quay ra dòng Slim",
  "he": "d",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-ld16ou-1.webp",
    "/images/he-cua/ban-ve/romadio-ld16ou-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 103,
  "hang": "romadio",
  "ma": "LD16SB-F",
  "loai": "Cửa trượt ray dưới, 1–3 ray",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-ld16sb-f-1.webp",
    "/images/he-cua/ban-ve/romadio-ld16sb-f-2.webp",
    "/images/he-cua/ban-ve/romadio-ld16sb-f-3.webp",
    "/images/he-cua/ban-ve/romadio-ld16sb-f-4.webp"
   ]
  },
  "them": false
 },
 {
  "id": 104,
  "hang": "romadio",
  "ma": "LD16ST",
  "loai": "Cửa trượt ray trên, 1–2 ray",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-ld16st-1.webp",
    "/images/he-cua/ban-ve/romadio-ld16st-2.webp"
   ]
  },
  "them": false
 },
 {
  "id": 105,
  "hang": "romadio",
  "ma": "LD16ST-F",
  "loai": "Cửa trượt ray trên, 1–3 ray",
  "he": "s",
  "ketCau": "n",
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "",
  "anh": {
   "c": [],
   "d": [
    "/images/he-cua/ban-ve/romadio-ld16st-f-1.webp",
    "/images/he-cua/ban-ve/romadio-ld16st-f-2.webp",
    "/images/he-cua/ban-ve/romadio-ld16st-f-3.webp",
    "/images/he-cua/ban-ve/romadio-ld16st-f-4.webp"
   ]
  },
  "them": false
 },
 {
  "id": 106,
  "tags": [],
  "u": "2.2",
  "kinKhi": "0.21 m³/(m·h)",
  "cachAm": "35 dB",
  "kinNuoc": "700 Pa",
  "chiuGio": "≤ 4.0 kPa",
  "chongTrom": "",
  "ghiChu": "Mặt đứng 60 mm; chiều sâu thanh đứng 166 mm, thanh ngang 125 mm; kính 24 mm.",
  "ketCau": "t",
  "anh": {
   "c": [],
   "d": []
  },
  "them": true,
  "hang": "civro",
  "ma": "ACW120",
  "loai": "Vách kính (Curtain wall)",
  "he": "v"
 },
 {
  "id": 107,
  "tags": [],
  "u": "2.2",
  "kinKhi": "",
  "cachAm": "35 dB",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "AWG140 có cầu nhiệt (kính 28 mm), NWG110 không cầu nhiệt. Mái song song, mái dốc một phía hoặc mái nhiều dốc (AWG140). Chỉ số U và cách âm trong bảng là của AWG140. Hãng chưa công bố thông số hiệu năng cho NWG110.",
  "ketCau": "tn",
  "anh": {
   "c": [],
   "d": []
  },
  "them": true,
  "hang": "civro",
  "ma": "AWG140 / NWG110",
  "loai": "Nhà kính (Conservatory)",
  "he": "v"
 },
 {
  "id": 108,
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Khung mô-đun, kính hộp, treo trên, nâng đứng, trượt hoặc nhiều cánh chạy động cơ. Hãng chưa công bố bảng thông số.",
  "ketCau": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": true,
  "hang": "civro",
  "ma": "USL",
  "loai": "Cửa mái (Skylight)",
  "he": "v"
 },
 {
  "id": 109,
  "tags": [
   "sm"
  ],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Lưới giấu trong khung bên, vận hành một tay, lắp trong hoặc ngoài cửa trượt. Hãng chưa công bố bảng thông số.",
  "ketCau": "",
  "anh": {
   "c": [],
   "d": []
  },
  "them": true,
  "hang": "civro",
  "ma": "USW",
  "loai": "Màn chắn côn trùng cuốn toàn cảnh",
  "he": "s"
 },
 {
  "id": 110,
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Khung nhìn thấy 16 mm; chiều cao cánh tối đa 3600 mm; trượt hoặc treo, mở quay, xoay trục.",
  "ketCau": "n",
  "anh": {
   "c": [],
   "d": []
  },
  "them": true,
  "hang": "civro",
  "ma": "AMAZA UID16",
  "loai": "Cửa nội thất siêu mảnh",
  "he": "s"
 },
 {
  "id": 111,
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Có bản không nan trang trí. Hãng chưa công bố bảng thông số.",
  "ketCau": "tn",
  "anh": {
   "c": [],
   "d": []
  },
  "them": true,
  "hang": "romadio",
  "ma": "FineLine 59WO",
  "loai": "Cửa sổ nan trang trí",
  "he": "w"
 },
 {
  "id": 112,
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Hãng chưa công bố bảng thông số.",
  "ketCau": "tn",
  "anh": {
   "c": [],
   "d": []
  },
  "them": true,
  "hang": "romadio",
  "ma": "FineLine 62DO",
  "loai": "Cửa đi nan trang trí",
  "he": "d"
 },
 {
  "id": 113,
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Hãng chưa công bố bảng thông số.",
  "ketCau": "n",
  "anh": {
   "c": [],
   "d": []
  },
  "them": true,
  "hang": "romadio",
  "ma": "OVERSKY 23S Double",
  "loai": "Cửa trượt 2 ray",
  "he": "s"
 },
 {
  "id": 114,
  "tags": [],
  "u": "",
  "kinKhi": "",
  "cachAm": "",
  "kinNuoc": "",
  "chiuGio": "",
  "chongTrom": "",
  "ghiChu": "Hãng chưa công bố bảng thông số.",
  "ketCau": "n",
  "anh": {
   "c": [],
   "d": []
  },
  "them": true,
  "hang": "romadio",
  "ma": "OVERSKY 23S Triple",
  "loai": "Cửa trượt 3 ray",
  "he": "s"
 }
];
