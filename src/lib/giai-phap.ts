/**
 * Giải pháp theo loại công trình (đề xuất 10/11/2026, mục 5.2).
 * Nội dung chỉ nêu cân nhắc thiết kế chung và quy trình tư vấn; KHÔNG có thông số hay tuyên bố kỹ thuật chưa xác nhận.
 * Mỗi trang trả lời 3 câu hỏi: (1) không gian cần giải pháp cửa thế nào, (2) hệ cửa nào phù hợp, (3) WINDUCA tư vấn và triển khai gì.
 */

export type GiaiPhap = {
  slug: string;
  ten: string;
  tomTat: string;
  anh: string;
  pos: string;
  khongGian: string[];
  heCua: string[]; // slug của KIEU_CUA
  ghiChuHeCua: string;
};

export const GIAI_PHAP: GiaiPhap[] = [
  {
    slug: "biet-thu",
    ten: "Giải pháp cửa cho biệt thự",
    tomTat: "Mặt kính lớn nhìn ra sân vườn và hồ bơi, đường nét mảnh, vận hành êm.",
    anh: "/images/biet-thu-go-kinh.jpg",
    pos: "50% 55%",
    khongGian: [
      "Phòng khách và sảnh liên thông với sân vườn, hồ bơi.",
      "Mặt tiền nhiều lớp kính cần đường nét thống nhất.",
      "Cửa chính và cửa ra vườn cần đóng mở chắc chắn.",
      "Cân nhắc khẩu độ lớn, hướng nắng, gió và tầm nhìn.",
    ],
    heCua: ["cua-truot-nang", "cua-di-mo-quay", "cua-so"],
    ghiChuHeCua: "Cửa trượt nâng cho mặt kính lớn; cửa đi mở quay cho lối vào; cửa sổ đồng bộ đường nét với mặt tiền.",
  },
  {
    slug: "penthouse",
    ten: "Giải pháp cửa cho penthouse",
    tomTat: "Ban công và sân thượng nhìn toàn cảnh, đường nét tối giản để giữ tầm nhìn.",
    anh: "/images/nha-o-kinh.jpg",
    pos: "50% 50%",
    khongGian: [
      "Ban công, sân thượng nhìn toàn cảnh thành phố hoặc biển.",
      "Mặt kính cao, khẩu độ lớn, cần vận hành ổn định.",
      "Cân nhắc gió và an toàn ở tầng cao.",
      "Đường nét tối giản để giữ trọn tầm nhìn.",
    ],
    heCua: ["cua-truot-nang", "cua-xep-truot", "cua-so"],
    ghiChuHeCua: "Cửa trượt nâng và cửa xếp trượt cho khẩu độ rộng; cửa sổ cho các phòng riêng.",
  },
  {
    slug: "nha-pho-cao-cap",
    ten: "Giải pháp cho nhà phố cao cấp",
    tomTat: "Mặt tiền hẹp cần lấy sáng, thông gió và đồng bộ từ cửa chính đến cửa sổ.",
    anh: "/images/nha-pho-dem.jpg",
    pos: "50% 60%",
    khongGian: [
      "Mặt tiền hẹp, cần lấy sáng và thông gió tự nhiên.",
      "Cửa đi, cửa sổ và cửa ban công cần đồng bộ đường nét.",
      "Giếng trời và cầu thang cần ánh sáng.",
      "Cân nhắc tiếng ồn từ mặt phố khi chọn cấu hình.",
    ],
    heCua: ["cua-di-mo-quay", "cua-so", "cua-xep-truot"],
    ghiChuHeCua: "Cửa đi mở quay cho lối vào; cửa sổ cho thông gió; cửa xếp trượt cho khu sinh hoạt liên thông.",
  },
  {
    slug: "khach-san-resort",
    ten: "Giải pháp cho khách sạn và resort",
    tomTat: "Sảnh, nhà hàng và khu hồ bơi mở ra thiên nhiên; cần bền và dễ bảo trì.",
    anh: "/images/resort-ho-boi.jpg",
    pos: "50% 50%",
    khongGian: [
      "Sảnh, nhà hàng và khu hồ bơi mở ra thiên nhiên.",
      "Số lượng lớn, cần thống nhất vật tư và tiến độ.",
      "Vận hành thường xuyên, cần bền và dễ bảo trì.",
      "Cân nhắc dòng người đi lại và an toàn.",
    ],
    heCua: ["cua-xep-truot", "cua-truot-nang", "cua-so"],
    ghiChuHeCua: "Cửa xếp trượt cho khu mở; cửa trượt nâng cho mặt kính lớn; cửa sổ cho phòng nghỉ.",
  },
  {
    slug: "cong-trinh-dac-thu",
    ten: "Giải pháp cho công trình kiến trúc đặc thù",
    tomTat: "Hình khối, góc cắt hoặc kích thước ngoài tiêu chuẩn, cần chi tiết riêng theo bản vẽ.",
    anh: "/images/villa-ban-cong.jpg",
    pos: "50% 55%",
    khongGian: [
      "Hình khối, góc cắt hoặc kích thước ngoài tiêu chuẩn.",
      "Cần chi tiết riêng theo bản vẽ của kiến trúc sư.",
      "Phối hợp chặt chẽ giữa kiến trúc sư, nhà thầu và đội kỹ thuật.",
      "Cân nhắc phương án thi công và lắp đặt từ sớm.",
    ],
    heCua: ["cua-truot-nang", "cua-di-mo-quay", "cua-xep-truot", "cua-so"],
    ghiChuHeCua: "Lựa chọn tùy bản vẽ; đội kỹ thuật đề xuất kiểu cửa và chi tiết phù hợp từng hạng mục.",
  },
];

export const QUY_TRINH_TRIEN_KHAI = [
  "Tiếp nhận bản vẽ và yêu cầu kiến trúc.",
  "Đề xuất kiểu cửa, hệ nhôm, kính và phụ kiện.",
  "Bóc tách và tư vấn chi tiết theo bản vẽ.",
  "Gia công, lắp đặt và nghiệm thu tại công trình.",
];
