/**
 * Bài Kiến thức (10/11/2026). BẢN BIÊN SOẠN CHUNG: giải thích nguyên lý phổ biến, KHÔNG có số liệu, chứng nhận hay
 * tuyên bố riêng về sản phẩm WINDUCA. Cần đội kỹ thuật WINDUCA duyệt trước khi công bố chính thức.
 */

export type MucBai = { h: string; p: string[] };

export type BaiViet = {
  slug: string;
  chuyenMuc: string;
  tieuDe: string;
  tomTat: string;
  anh: string;
  ngay: string;
  noiDung: MucBai[];
  ketLuan: string;
};

export const BAI_VIET: BaiViet[] = [
  {
    slug: "cua-truot-nang-khac-gi-cua-truot-thuong",
    chuyenMuc: "Window Technology",
    tieuDe: "Cửa trượt nâng khác gì cửa trượt thường?",
    tomTat: "Hai kiểu cửa cùng trượt ngang nhưng khác nhau ở cách cánh tựa vào ray và cách đóng kín.",
    anh: "/images/products/lift-slide.webp",
    ngay: "2026-11-10",
    noiDung: [
      {
        h: "Cửa trượt thường vận hành thế nào?",
        p: [
          "Ở cửa trượt thường, cánh cửa luôn nằm trên các bánh xe chạy trong ray. Khi đóng, cánh dừng lại ở vị trí khép kín nhưng trọng lượng vẫn dồn lên bánh xe.",
          "Gioăng ở cửa trượt thường chủ yếu ép nhẹ vào khung, nên độ kín phụ thuộc nhiều vào độ chính xác khi lắp và mức hao mòn của bánh xe, ray theo thời gian.",
        ],
      },
      {
        h: "Cửa trượt nâng khác ở điểm nào?",
        p: [
          "Cửa trượt nâng có tay nắm gắn cơ cấu nâng. Khi xoay tay nắm để mở, cánh được nâng lên khỏi gioăng và tựa vào các con lăn, nhờ đó cánh nặng vẫn trượt nhẹ.",
          "Khi đóng, cánh được hạ xuống: trọng lượng cánh ép vào gioăng quanh khung, giúp bộ cửa đóng kín chắc chắn hơn so với kiểu trượt thường.",
        ],
      },
      {
        h: "Khi nào nên chọn cửa trượt nâng?",
        p: [
          "Kiểu cửa này phù hợp với mặt kính lớn, cánh nặng, nơi người dùng muốn mở rộng tầm nhìn ra sân vườn, hồ bơi hoặc ban công mà vẫn cần đóng kín khi cần.",
          "Cần lưu ý nền sàn phẳng, ray được vệ sinh định kỳ và chọn đúng phụ kiện cho trọng lượng cánh. Kích thước và cấu hình cụ thể nên được đội kỹ thuật tư vấn theo bản vẽ.",
        ],
      },
    ],
    ketLuan: "Chọn kiểu cửa theo khẩu độ, mục đích sử dụng và bản vẽ công trình. Anh chị có thể gửi bản vẽ để đội kỹ thuật WINDUCA tư vấn.",
  },
  {
    slug: "cach-doc-chi-so-uw-cua-cach-nhiet",
    chuyenMuc: "Material & Engineering",
    tieuDe: "Cách đọc chỉ số Uw của cửa cách nhiệt",
    tomTat: "Uw cho biết khả năng cản nhiệt của cả bộ cửa, và cách so sánh các con số này cho đúng.",
    anh: "/images/engineering/exploded-profiles.webp",
    ngay: "2026-11-10",
    noiDung: [
      {
        h: "Uw là gì?",
        p: [
          "Uw là hệ số truyền nhiệt của toàn bộ cửa, tính cả khung, kính và phần liên kết giữa chúng. Đơn vị thường dùng là W/m²K.",
          "Số càng thấp, nhiệt truyền qua cửa càng ít, tức khả năng cách nhiệt càng tốt.",
        ],
      },
      {
        h: "Uw được tạo nên từ những gì?",
        p: [
          "Uf là hệ số của riêng khung. Ug là hệ số của riêng kính. Ngoài ra còn phần cầu nhiệt ở mép kính nơi kính gặp khung.",
          "Vì vậy hai bộ cửa dùng cùng loại kính vẫn có thể có Uw khác nhau nếu khung và cách lắp kính khác nhau.",
        ],
      },
      {
        h: "So sánh các con số cho đúng",
        p: [
          "Uw phụ thuộc kích thước cửa và cấu hình kính. Khi so sánh, cần đối chiếu cùng kích thước, cùng cấu hình và cùng phương pháp tính hoặc thử nghiệm.",
          "Nên yêu cầu nhà cung cấp cho xem tài liệu kiểm định hoặc bảng tính có nêu rõ điều kiện, thay vì chỉ nhìn một con số trên catalog.",
        ],
      },
    ],
    ketLuan: "Chỉ số Uw của từng hệ cửa WINDUCA sẽ được công bố cùng tài liệu kiểm định khi có xác nhận chính thức.",
  },
  {
    slug: "anode-hoa-hay-son-tinh-dien",
    chuyenMuc: "Material & Engineering",
    tieuDe: "Anode hóa hay sơn tĩnh điện: chọn thế nào?",
    tomTat: "Hai cách hoàn thiện bề mặt nhôm phổ biến, khác nhau về vẻ ngoài và cách ứng xử theo thời gian.",
    anh: "/images/bang-mau-vat-lieu-2.jpg",
    ngay: "2026-11-10",
    noiDung: [
      {
        h: "Anode hóa",
        p: [
          "Anode hóa là quá trình điện hóa tạo một lớp oxit ngay trên bề mặt nhôm. Lớp này là một phần của chính tấm nhôm, giữ được vẻ ánh kim loại đặc trưng.",
          "Bảng màu thường nhã nhặn và hạn chế hơn, nhưng cho cảm giác kim loại thật. Khi cần sửa chữa cục bộ, việc dặm lại màu đồng đều thường khó hơn.",
        ],
      },
      {
        h: "Sơn tĩnh điện",
        p: [
          "Sơn tĩnh điện phủ bột sơn lên bề mặt nhôm rồi nung để tạo lớp phủ. Cách này cho phép chọn nhiều màu và nhiều hiệu ứng bề mặt như mờ hoặc sần nhẹ.",
          "Lớp phủ nằm trên nhôm nên cần lưu ý chất lượng xử lý bề mặt trước khi sơn và điều kiện môi trường nơi lắp đặt.",
        ],
      },
      {
        h: "Chọn theo tiêu chí nào?",
        p: [
          "Thẩm mỹ: muốn cảm giác kim loại thật hay muốn dải màu rộng. Môi trường: công trình ven biển hoặc nhiều nắng cần được tư vấn kỹ hơn. Bảo hành và bảo trì: nên xem tài liệu của nhà cung cấp.",
          "Màu thực tế có thể khác tùy màn hình và lô hoàn thiện, nên xem mẫu vật trước khi quyết định.",
        ],
      },
    ],
    ketLuan: "Anh chị có thể nhận hộp mẫu góc nhôm để chạm thử và so màu với không gian của mình.",
  },
];
