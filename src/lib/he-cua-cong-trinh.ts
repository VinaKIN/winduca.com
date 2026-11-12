import type { HeCua } from "./he-cua-du-lieu";

/**
 * Ảnh công trình thực tế dùng cho hộp chi tiết hệ cửa (12/11/2026). Anh Huy chịu trách nhiệm bản quyền ảnh lấy từ web;
 * mỗi ảnh vẫn ghi nguồn để dễ kiểm tra và gỡ. Ảnh gắn theo hãng và kiểu hệ (w cửa sổ, d cửa đi, s trượt, l nâng trượt, f xếp gấp,
 * v vách kính), KHÔNG khẳng định công trình dùng đúng mã hệ trừ khi nguồn ghi rõ (`dungMa`).
 */
export type AnhCongTrinh = { src: string; chuThich: string; nguon: string; tenNguon: string; dungMa?: string };

export const ANH_CONG_TRINH: Record<string, AnhCongTrinh[]> = {
  "civro:ACW120": [
    { src: "/images/he-cua/cong-trinh/civro-whale-hill-villa.webp", chuThich: "Whale Hill Villa", nguon: "https://www.civro.com/case/whale-hill-villa/", tenNguon: "civro.com", dungMa: "ACW120" },
  ],
  "civro:AD80FD": [
    { src: "/images/he-cua/cong-trinh/civro-delong-villa.webp", chuThich: "Delong Villa", nguon: "https://www.civro.com/case/delong-villa/", tenNguon: "civro.com", dungMa: "AD80FD" },
    { src: "/images/he-cua/cong-trinh/civro-wuxi-villa.webp", chuThich: "Wuxi Villa", nguon: "https://www.civro.com/case/wuxi-villa/", tenNguon: "civro.com", dungMa: "AD80FD" },
    { src: "/images/he-cua/cong-trinh/civro-the-six-season-vacation-manor.webp", chuThich: "A 130-Acre French-Inspired Escape: The Six Season Vacation Manor Framed by CIVRO", nguon: "https://www.civro.com/case/the-six-season-vacation-manor/", tenNguon: "civro.com", dungMa: "AD80FD" },
  ],
  "civro:CIVRO-ORAMA UD137/UD207": [
    { src: "/images/he-cua/cong-trinh/civro-erya-villa.webp", chuThich: "Erya Villa", nguon: "https://www.civro.com/case/erya-villa/", tenNguon: "civro.com", dungMa: "CIVRO-ORAMA UD137/UD207" },
    { src: "/images/he-cua/cong-trinh/civro-yinhaichangyuan.webp", chuThich: "A Tree of Life: CIVRO’s Minimalist Oasis", nguon: "https://www.civro.com/case/yinhaichangyuan/", tenNguon: "civro.com", dungMa: "CIVRO-ORAMA UD137/UD207" },
  ],
  "civro:ND55_E": [
    { src: "/images/he-cua/cong-trinh/civro-10-nguyen-tuyen.webp", chuThich: "10 Nguyen Tuyen", nguon: "https://www.civro.com/case/10-nguyen-tuyen/", tenNguon: "civro.com", dungMa: "ND55_E" },
    { src: "/images/he-cua/cong-trinh/civro-vietnam-chuong-my.webp", chuThich: "Who Says Non-Thermal Break Can’t Be Excellent?", nguon: "https://www.civro.com/case/vietnam-chuong-my/", tenNguon: "civro.com", dungMa: "ND55_E" },
  ],
  "civro:NW55SS": [
    { src: "/images/he-cua/cong-trinh/civro-10-nguyen-tuyen.webp", chuThich: "10 Nguyen Tuyen", nguon: "https://www.civro.com/case/10-nguyen-tuyen/", tenNguon: "civro.com", dungMa: "NW55SS" },
  ],
  "civro:NW55_E": [
    { src: "/images/he-cua/cong-trinh/civro-10-nguyen-tuyen.webp", chuThich: "10 Nguyen Tuyen", nguon: "https://www.civro.com/case/10-nguyen-tuyen/", tenNguon: "civro.com", dungMa: "NW55_E" },
    { src: "/images/he-cua/cong-trinh/civro-vietnam-chuong-my.webp", chuThich: "Who Says Non-Thermal Break Can’t Be Excellent?", nguon: "https://www.civro.com/case/vietnam-chuong-my/", tenNguon: "civro.com", dungMa: "NW55_E" },
  ],
  "civro:XD63": [
    { src: "/images/he-cua/cong-trinh/civro-no-1-jiangshan-residence.webp", chuThich: "No.1 Jiangshan Residence", nguon: "https://www.civro.com/case/no-1-jiangshan-residence/", tenNguon: "civro.com", dungMa: "XD63" },
    { src: "/images/he-cua/cong-trinh/civro-central-apartments.webp", chuThich: "Central Apartments", nguon: "https://www.civro.com/case/central-apartments/", tenNguon: "civro.com", dungMa: "XD63" },
    { src: "/images/he-cua/cong-trinh/civro-dianchi-villa.webp", chuThich: "A 500㎡ Luxury Villa That Opens Seamlessly to Nature", nguon: "https://www.civro.com/case/dianchi-villa/", tenNguon: "civro.com", dungMa: "XD63" },
  ],
  "civro:XD65": [
    { src: "/images/he-cua/cong-trinh/civro-tianan-villa.webp", chuThich: "Tian’an Villa", nguon: "https://www.civro.com/case/tianan-villa/", tenNguon: "civro.com", dungMa: "XD65" },
    { src: "/images/he-cua/cong-trinh/civro-rose-garden-villa.webp", chuThich: "Rose Garden Villa", nguon: "https://www.civro.com/case/rose-garden-villa/", tenNguon: "civro.com", dungMa: "XD65" },
    { src: "/images/he-cua/cong-trinh/civro-sanqing-moutain-villa.webp", chuThich: "Sanqing Moutain Villa", nguon: "https://www.civro.com/case/sanqing-moutain-villa/", tenNguon: "civro.com", dungMa: "XD65" },
  ],
  "civro:XD73LS": [
    { src: "/images/he-cua/cong-trinh/civro-wuxi-villa.webp", chuThich: "Wuxi Villa", nguon: "https://www.civro.com/case/wuxi-villa/", tenNguon: "civro.com", dungMa: "XD73LS" },
  ],
  "civro:XD80": [
    { src: "/images/he-cua/cong-trinh/civro-tianan-villa.webp", chuThich: "Tian’an Villa", nguon: "https://www.civro.com/case/tianan-villa/", tenNguon: "civro.com", dungMa: "XD80" },
    { src: "/images/he-cua/cong-trinh/civro-fuchun-river-flat.webp", chuThich: "Fuchun River Flat", nguon: "https://www.civro.com/case/fuchun-river-flat/", tenNguon: "civro.com", dungMa: "XD80" },
  ],
  "civro:XVE65 & XVE100": [
    { src: "/images/he-cua/cong-trinh/civro-xiangxieyipin-residence.webp", chuThich: "Xiangxieyipin Residence", nguon: "https://www.civro.com/case/xiangxieyipin-residence/", tenNguon: "civro.com", dungMa: "XVE65 & XVE100" },
    { src: "/images/he-cua/cong-trinh/civro-central-apartments.webp", chuThich: "Central Apartments", nguon: "https://www.civro.com/case/central-apartments/", tenNguon: "civro.com", dungMa: "XVE65 & XVE100" },
    { src: "/images/he-cua/cong-trinh/civro-gong-residence.webp", chuThich: "Gong Residence", nguon: "https://www.civro.com/case/gong-residence/", tenNguon: "civro.com", dungMa: "XVE65 & XVE100" },
  ],
  "civro:XW100PO/XW110PO": [
    { src: "/images/he-cua/cong-trinh/civro-whale-hill-villa.webp", chuThich: "Whale Hill Villa", nguon: "https://www.civro.com/case/whale-hill-villa/", tenNguon: "civro.com", dungMa: "XW100PO/XW110PO" },
    { src: "/images/he-cua/cong-trinh/civro-oriental-electric-heating-building.webp", chuThich: "Oriental Electric Heating Expert Building", nguon: "https://www.civro.com/case/oriental-electric-heating-building/", tenNguon: "civro.com", dungMa: "XW100PO/XW110PO" },
    { src: "/images/he-cua/cong-trinh/civro-the-six-season-vacation-manor.webp", chuThich: "A 130-Acre French-Inspired Escape: The Six Season Vacation Manor Framed by CIVRO", nguon: "https://www.civro.com/case/the-six-season-vacation-manor/", tenNguon: "civro.com", dungMa: "XW100PO/XW110PO" },
  ],
  "civro:XW65": [
    { src: "/images/he-cua/cong-trinh/civro-erya-villa.webp", chuThich: "Erya Villa", nguon: "https://www.civro.com/case/erya-villa/", tenNguon: "civro.com", dungMa: "XW65" },
    { src: "/images/he-cua/cong-trinh/civro-tianan-villa.webp", chuThich: "Tian’an Villa", nguon: "https://www.civro.com/case/tianan-villa/", tenNguon: "civro.com", dungMa: "XW65" },
    { src: "/images/he-cua/cong-trinh/civro-zhongjiandaguan-residence.webp", chuThich: "Zhongjiandaguan Residence", nguon: "https://www.civro.com/case/zhongjiandaguan-residence/", tenNguon: "civro.com", dungMa: "XW65" },
  ],
  "civro:XW80": [
    { src: "/images/he-cua/cong-trinh/civro-fuchun-river-flat.webp", chuThich: "Fuchun River Flat", nguon: "https://www.civro.com/case/fuchun-river-flat/", tenNguon: "civro.com", dungMa: "XW80" },
    { src: "/images/he-cua/cong-trinh/civro-wuxi-villa.webp", chuThich: "Wuxi Villa", nguon: "https://www.civro.com/case/wuxi-villa/", tenNguon: "civro.com", dungMa: "XW80" },
  ],
  "civro:XWS100": [
    { src: "/images/he-cua/cong-trinh/civro-xiangshuwan-villa.webp", chuThich: "Xiangshuwan Villa", nguon: "https://www.civro.com/case/xiangshuwan-villa/", tenNguon: "civro.com", dungMa: "XWS100" },
    { src: "/images/he-cua/cong-trinh/civro-rose-garden-villa.webp", chuThich: "Rose Garden Villa", nguon: "https://www.civro.com/case/rose-garden-villa/", tenNguon: "civro.com", dungMa: "XWS100" },
  ],
  "civro:XWS115": [
    { src: "/images/he-cua/cong-trinh/civro-shangri-la-villa.webp", chuThich: "Shangri-La Villa", nguon: "https://www.civro.com/case/shangri-la-villa/", tenNguon: "civro.com", dungMa: "XWS115" },
    { src: "/images/he-cua/cong-trinh/civro-hawaii-1039.webp", chuThich: "Hawaii 1039", nguon: "https://www.civro.com/case/hawaii-1039/", tenNguon: "civro.com", dungMa: "XWS115" },
    { src: "/images/he-cua/cong-trinh/civro-dianchi-villa.webp", chuThich: "A 500㎡ Luxury Villa That Opens Seamlessly to Nature", nguon: "https://www.civro.com/case/dianchi-villa/", tenNguon: "civro.com", dungMa: "XWS115" },
  ],
  "civro:XWS125": [
    { src: "/images/he-cua/cong-trinh/civro-sanqing-moutain-villa.webp", chuThich: "Sanqing Moutain Villa", nguon: "https://www.civro.com/case/sanqing-moutain-villa/", tenNguon: "civro.com", dungMa: "XWS125" },
  ],
  "civro:XWS90": [
    { src: "/images/he-cua/cong-trinh/civro-fuchun-river-flat.webp", chuThich: "Fuchun River Flat", nguon: "https://www.civro.com/case/fuchun-river-flat/", tenNguon: "civro.com", dungMa: "XWS90" },
    { src: "/images/he-cua/cong-trinh/civro-oriental-electric-heating-building.webp", chuThich: "Oriental Electric Heating Expert Building", nguon: "https://www.civro.com/case/oriental-electric-heating-building/", tenNguon: "civro.com", dungMa: "XWS90" },
  ],
  "civro:d": [
    { src: "/images/he-cua/cong-trinh/civro-tianan-villa.webp", chuThich: "Tian’an Villa", nguon: "https://www.civro.com/case/tianan-villa/", tenNguon: "civro.com" },
    { src: "/images/he-cua/cong-trinh/civro-rose-garden-villa.webp", chuThich: "Rose Garden Villa", nguon: "https://www.civro.com/case/rose-garden-villa/", tenNguon: "civro.com" },
    { src: "/images/he-cua/cong-trinh/civro-sanqing-moutain-villa.webp", chuThich: "Sanqing Moutain Villa", nguon: "https://www.civro.com/case/sanqing-moutain-villa/", tenNguon: "civro.com" },
  ],
  "civro:f": [
    { src: "/images/he-cua/cong-trinh/civro-delong-villa.webp", chuThich: "Delong Villa", nguon: "https://www.civro.com/case/delong-villa/", tenNguon: "civro.com" },
    { src: "/images/he-cua/cong-trinh/civro-wuxi-villa.webp", chuThich: "Wuxi Villa", nguon: "https://www.civro.com/case/wuxi-villa/", tenNguon: "civro.com" },
    { src: "/images/he-cua/cong-trinh/civro-the-six-season-vacation-manor.webp", chuThich: "A 130-Acre French-Inspired Escape: The Six Season Vacation Manor Framed by CIVRO", nguon: "https://www.civro.com/case/the-six-season-vacation-manor/", tenNguon: "civro.com" },
  ],
  "civro:l": [
    { src: "/images/he-cua/cong-trinh/civro-wuxi-villa.webp", chuThich: "Wuxi Villa", nguon: "https://www.civro.com/case/wuxi-villa/", tenNguon: "civro.com" },
  ],
  "civro:s": [
    { src: "/images/he-cua/cong-trinh/civro-erya-villa.webp", chuThich: "Erya Villa", nguon: "https://www.civro.com/case/erya-villa/", tenNguon: "civro.com" },
    { src: "/images/he-cua/cong-trinh/civro-yinhaichangyuan.webp", chuThich: "A Tree of Life: CIVRO’s Minimalist Oasis", nguon: "https://www.civro.com/case/yinhaichangyuan/", tenNguon: "civro.com" },
    { src: "/images/he-cua/cong-trinh/civro-no-1-jiangshan-residence.webp", chuThich: "No.1 Jiangshan Residence", nguon: "https://www.civro.com/case/no-1-jiangshan-residence/", tenNguon: "civro.com" },
  ],
  "civro:v": [
    { src: "/images/he-cua/cong-trinh/civro-whale-hill-villa.webp", chuThich: "Whale Hill Villa", nguon: "https://www.civro.com/case/whale-hill-villa/", tenNguon: "civro.com" },
  ],
  "civro:w": [
    { src: "/images/he-cua/cong-trinh/civro-erya-villa.webp", chuThich: "Erya Villa", nguon: "https://www.civro.com/case/erya-villa/", tenNguon: "civro.com" },
    { src: "/images/he-cua/cong-trinh/civro-tianan-villa.webp", chuThich: "Tian’an Villa", nguon: "https://www.civro.com/case/tianan-villa/", tenNguon: "civro.com" },
    { src: "/images/he-cua/cong-trinh/civro-zhongjiandaguan-residence.webp", chuThich: "Zhongjiandaguan Residence", nguon: "https://www.civro.com/case/zhongjiandaguan-residence/", tenNguon: "civro.com" },
  ],
  "ponzio:SL1300 TT": [
    { src: "/images/he-cua/cong-trinh/ponzio-pz2.webp", chuThich: "Cửa trượt SL1300 TT, vách kính khung ẩn", nguon: "https://ponzioaluminium.com/en/sliding-windows/", tenNguon: "ponzioaluminium.com", dungMa: "SL1300 TT" },
    { src: "/images/he-cua/cong-trinh/ponzio-pz3.webp", chuThich: "Cửa trượt SL1300 TT, mặt kính lớn nhìn ra hồ bơi", nguon: "https://ponzioaluminium.com/en/sliding-windows/", tenNguon: "ponzioaluminium.com", dungMa: "SL1300 TT" },
  ],
  "ponzio:SL1600 TT": [
    { src: "/images/he-cua/cong-trinh/ponzio-pz1.webp", chuThich: "Cửa trượt SL1600 TT trong không gian ở", nguon: "https://ponzioaluminium.com/en/sliding-windows/", tenNguon: "ponzioaluminium.com", dungMa: "SL1600 TT" },
  ],
  "ponzio:l": [
    { src: "/images/he-cua/cong-trinh/ponzio-pz3.webp", chuThich: "Cửa trượt SL1300 TT, mặt kính lớn nhìn ra hồ bơi", nguon: "https://ponzioaluminium.com/en/sliding-windows/", tenNguon: "ponzioaluminium.com" },
    { src: "/images/he-cua/cong-trinh/ponzio-pz2.webp", chuThich: "Cửa trượt SL1300 TT, vách kính khung ẩn", nguon: "https://ponzioaluminium.com/en/sliding-windows/", tenNguon: "ponzioaluminium.com" },
    { src: "/images/he-cua/cong-trinh/ponzio-pz1.webp", chuThich: "Cửa trượt SL1600 TT trong không gian ở", nguon: "https://ponzioaluminium.com/en/sliding-windows/", tenNguon: "ponzioaluminium.com" },
  ],
  "ponzio:s": [
    { src: "/images/he-cua/cong-trinh/ponzio-pz3.webp", chuThich: "Cửa trượt SL1300 TT, mặt kính lớn nhìn ra hồ bơi", nguon: "https://ponzioaluminium.com/en/sliding-windows/", tenNguon: "ponzioaluminium.com" },
    { src: "/images/he-cua/cong-trinh/ponzio-pz2.webp", chuThich: "Cửa trượt SL1300 TT, vách kính khung ẩn", nguon: "https://ponzioaluminium.com/en/sliding-windows/", tenNguon: "ponzioaluminium.com" },
    { src: "/images/he-cua/cong-trinh/ponzio-pz1.webp", chuThich: "Cửa trượt SL1600 TT trong không gian ở", nguon: "https://ponzioaluminium.com/en/sliding-windows/", tenNguon: "ponzioaluminium.com" },
  ],
  "romadio:d": [
    { src: "/images/he-cua/cong-trinh/romadio-vanda.webp", chuThich: "Vanda Villa Nam Việt Á · Riverside", nguon: "https://drive.google.com/drive/folders/1ArYkk88boOs6dByjQlcW1XMN6MYyYy20", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-vml5.webp", chuThich: "Công trình Việt Minh Long", nguon: "https://drive.google.com/drive/folders/12LvvCa0hOOmDgSKT4rFSJ4kJFqBdWyCz", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-dpp4.webp", chuThich: "Fideco Villa, Thảo Điền (Đông Phương Plus)", nguon: "https://drive.google.com/drive/folders/1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH", tenNguon: "Thư viện dự án Romadio" },
  ],
  "romadio:f": [
    { src: "/images/he-cua/cong-trinh/romadio-vanda.webp", chuThich: "Vanda Villa Nam Việt Á · Riverside", nguon: "https://drive.google.com/drive/folders/1ArYkk88boOs6dByjQlcW1XMN6MYyYy20", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-dpp4.webp", chuThich: "Fideco Villa, Thảo Điền (Đông Phương Plus)", nguon: "https://drive.google.com/drive/folders/1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-vml3.webp", chuThich: "Công trình Việt Minh Long", nguon: "https://drive.google.com/drive/folders/12LvvCa0hOOmDgSKT4rFSJ4kJFqBdWyCz", tenNguon: "Thư viện dự án Romadio" },
  ],
  "romadio:l": [
    { src: "/images/he-cua/cong-trinh/romadio-dpp4.webp", chuThich: "Fideco Villa, Thảo Điền (Đông Phương Plus)", nguon: "https://drive.google.com/drive/folders/1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-vanda.webp", chuThich: "Vanda Villa Nam Việt Á · Riverside", nguon: "https://drive.google.com/drive/folders/1ArYkk88boOs6dByjQlcW1XMN6MYyYy20", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-dpp1.webp", chuThich: "Fideco Villa, Thảo Điền (Đông Phương Plus)", nguon: "https://drive.google.com/drive/folders/1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH", tenNguon: "Thư viện dự án Romadio" },
  ],
  "romadio:s": [
    { src: "/images/he-cua/cong-trinh/romadio-dpp4.webp", chuThich: "Fideco Villa, Thảo Điền (Đông Phương Plus)", nguon: "https://drive.google.com/drive/folders/1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-vanda.webp", chuThich: "Vanda Villa Nam Việt Á · Riverside", nguon: "https://drive.google.com/drive/folders/1ArYkk88boOs6dByjQlcW1XMN6MYyYy20", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-vml3.webp", chuThich: "Công trình Việt Minh Long", nguon: "https://drive.google.com/drive/folders/12LvvCa0hOOmDgSKT4rFSJ4kJFqBdWyCz", tenNguon: "Thư viện dự án Romadio" },
  ],
  "romadio:v": [
    { src: "/images/he-cua/cong-trinh/romadio-dpp1.webp", chuThich: "Fideco Villa, Thảo Điền (Đông Phương Plus)", nguon: "https://drive.google.com/drive/folders/1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-dpp4.webp", chuThich: "Fideco Villa, Thảo Điền (Đông Phương Plus)", nguon: "https://drive.google.com/drive/folders/1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-vanda.webp", chuThich: "Vanda Villa Nam Việt Á · Riverside", nguon: "https://drive.google.com/drive/folders/1ArYkk88boOs6dByjQlcW1XMN6MYyYy20", tenNguon: "Thư viện dự án Romadio" },
  ],
  "romadio:w": [
    { src: "/images/he-cua/cong-trinh/romadio-dpp1.webp", chuThich: "Fideco Villa, Thảo Điền (Đông Phương Plus)", nguon: "https://drive.google.com/drive/folders/1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-dpp4.webp", chuThich: "Fideco Villa, Thảo Điền (Đông Phương Plus)", nguon: "https://drive.google.com/drive/folders/1M4Q-qK8emQnxqJ6Gpt1qzy7iykES0KoH", tenNguon: "Thư viện dự án Romadio" },
    { src: "/images/he-cua/cong-trinh/romadio-vml3.webp", chuThich: "Công trình Việt Minh Long", nguon: "https://drive.google.com/drive/folders/12LvvCa0hOOmDgSKT4rFSJ4kJFqBdWyCz", tenNguon: "Thư viện dự án Romadio" },
  ],
};

export function anhCongTrinh(r: HeCua): AnhCongTrinh[] {
  const rieng = ANH_CONG_TRINH[`${r.hang}:${r.ma}`];
  if (rieng) return rieng;
  return ANH_CONG_TRINH[`${r.hang}:${r.he.charAt(0)}`] ?? [];
}
