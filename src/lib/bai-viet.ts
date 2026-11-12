/**
 * Bài Kiến thức (10/11/2026). BẢN BIÊN SOẠN CHUNG: giải thích nguyên lý phổ biến, KHÔNG có số liệu, chứng nhận hay
 * tuyên bố riêng về sản phẩm WINDUCA. Cần đội kỹ thuật WINDUCA duyệt trước khi công bố chính thức.
 */

export type MucId = "kien-thuc" | "hoat-dong" | "cong-trinh" | "tai-lieu";

export type MucBai = { h: string; p: string[] };

export type BaiViet = {
  slug: string;
  /** Chuyên mục của Tin tức (mặc định "kien-thuc"). */
  muc?: MucId;
  /** Chủ đề bài (nhãn tiếng Anh cũ, dùng TEN_CHU_DE để hiện tiếng Việt). */
  chuyenMuc: string;
  tieuDe: string;
  tomTat: string;
  anh: string;
  /** "ky-thuat": ảnh nền trong (mẫu 3D, bản vẽ 2D) đặt trên khung tối kiểu bản vẽ, không cắt xén. */
  kieu?: "ky-thuat";
  ngay: string;
  noiDung: MucBai[];
  ketLuan: string;
};

export const BAI_VIET: BaiViet[] = [
  {
    slug: "chon-cua-theo-khong-gian",
    chuyenMuc: "Architecture & Design",
    tieuDe: "Chọn cửa theo không gian: phòng khách, ban công, phòng ngủ",
    tomTat: "Mỗi không gian dùng cửa khác nhau. Vài câu hỏi đơn giản giúp chọn kiểu cửa trước khi nói đến vật liệu.",
    anh: "/images/giai-phap/can-ho-cao-cap-1.webp",
    ngay: "2026-11-12",
    noiDung: [
      {
        h: "Bắt đầu từ cách dùng, không phải từ kiểu cửa",
        p: [
          "Cùng là một ô cửa, nhưng cửa phòng khách, cửa ban công và cửa phòng ngủ phục vụ những việc rất khác nhau. Phòng khách cần tầm nhìn và lối ra vào rộng, ban công cần tiết kiệm diện tích khi mở, phòng ngủ cần yên tĩnh và riêng tư.",
          "Trước khi chọn kiểu cửa, nên viết ra vài câu: ô cửa này mở bao nhiêu lần mỗi ngày, ai dùng, và mong muốn lớn nhất là gì. Câu trả lời thường đã gợi ý được kiểu mở phù hợp.",
        ],
      },
      {
        h: "Gợi ý theo từng không gian",
        p: [
          "Phòng khách liên thông với sân vườn thường hợp với cánh lớn trượt hoặc xếp gọn để mở rộng tầm nhìn. Ban công và lô gia hợp với cánh trượt vì không chiếm chỗ khi mở. Phòng ngủ và phòng làm việc thường ưu tiên cửa sổ có thể thông gió mà vẫn giữ được sự riêng tư.",
          "Đây là gợi ý chung. Bản vẽ, hướng nắng, tiếng ồn và khẩu độ thực tế sẽ quyết định cấu hình cuối cùng.",
        ],
      },
      {
        h: "Giữ sự đồng bộ giữa các ô cửa",
        p: [
          "Khi nhiều kiểu cửa cùng xuất hiện trong một công trình, đường nét khung và màu hoàn thiện nên thống nhất. Một ngôn ngữ chung giúp mặt tiền và nội thất liền mạch, dù từng ô cửa có cách mở khác nhau.",
        ],
      },
    ],
    ketLuan: "Anh chị có thể gửi bản vẽ hoặc mô tả không gian để đội kỹ thuật WINDUCA gợi ý kiểu cửa phù hợp.",
  },
  {
    slug: "cach-doc-ban-ve-cua-truoc-khi-dat-hang",
    chuyenMuc: "Architecture & Design",
    tieuDe: "Cách đọc bản vẽ cửa trước khi đặt hàng",
    tomTat: "Vài điểm cần nhìn kỹ trên bản vẽ để tránh sửa đổi tốn kém khi cửa đã sản xuất.",
    anh: "/images/he-cua/ban-ve/civro-xd65-1.webp",
    kieu: "ky-thuat",
    ngay: "2026-11-12",
    noiDung: [
      {
        h: "Bản vẽ cho biết điều gì?",
        p: [
          "Bản vẽ cửa thường gồm mặt đứng thể hiện hình dạng và cách chia ô, và mặt cắt thể hiện cấu tạo khung, kính và phụ kiện. Hai loại bản vẽ này bổ sung cho nhau: mặt đứng cho thấy cửa trông thế nào, mặt cắt cho thấy cửa được làm ra sao.",
        ],
      },
      {
        h: "Những điểm nên kiểm tra",
        p: [
          "Trước hết là kích thước và vị trí mở của từng cánh: cánh nào mở, cánh nào cố định, mở vào trong hay ra ngoài. Tiếp theo là cao độ sàn và ngưỡng cửa, vì chi tiết này ảnh hưởng đến cả vận hành lẫn thoát nước.",
          "Cuối cùng là các ghi chú về màu hoàn thiện, loại kính và phụ kiện. Nếu một ghi chú chưa rõ, hãy hỏi lại trước khi chốt thay vì chờ đến khi lắp đặt.",
        ],
      },
      {
        h: "Cùng đội kỹ thuật rà soát",
        p: [
          "Bóc tách cùng đội kỹ thuật giúp phát hiện sớm những chỗ bản vẽ kiến trúc chưa tính đến chi tiết cửa, ví dụ chỗ giấu ray hoặc khoảng hở lắp đặt. Làm rõ ở giai đoạn này luôn nhẹ nhàng hơn xử lý tại công trình.",
        ],
      },
    ],
    ketLuan: "Anh chị có thể gửi bản vẽ để đội kỹ thuật WINDUCA cùng rà soát trước khi chốt cấu hình.",
  },
  {
    slug: "kinh-hop-trong-cua-nhom-nen-hoi-gi",
    chuyenMuc: "Material & Engineering",
    tieuDe: "Kính hộp trong cửa nhôm: những điều nên hỏi",
    tomTat: "Kính chiếm phần lớn diện tích cửa. Biết đặt câu hỏi đúng giúp chọn kính phù hợp với không gian.",
    anh: "/images/engineering/exploded-windows.webp",
    ngay: "2026-11-12",
    noiDung: [
      {
        h: "Kính hộp là gì?",
        p: [
          "Kính hộp gồm hai hay nhiều lớp kính ngăn cách bằng một khoảng đệm kín. Cấu tạo này góp phần cải thiện cách nhiệt và cách âm so với kính một lớp, tùy vào cấu hình cụ thể.",
        ],
      },
      {
        h: "Câu hỏi nên đặt cho nhà cung cấp",
        p: [
          "Hãy hỏi về cấu hình lớp kính, loại kính (kính cường lực, kính dán an toàn, kính phủ) và cách nhà cung cấp kiểm soát chất lượng thanh đệm và keo làm kín. Hỏi thêm về tài liệu kiểm định nếu có.",
          "Cũng nên nói rõ vị trí lắp: mặt hướng nắng, mặt hướng đường lớn hay khu vực cần an toàn cao sẽ đòi hỏi cấu hình khác nhau.",
        ],
      },
      {
        h: "Đừng quên khung và gioăng",
        p: [
          "Kính tốt chỉ phát huy khi khung, gioăng và cách lắp đặt tương xứng. Khả năng cách nhiệt và cách âm của cả bộ cửa là kết quả của toàn bộ các thành phần cùng làm việc.",
        ],
      },
    ],
    ketLuan: "Số liệu cụ thể nên lấy từ tài liệu kiểm định của từng hệ cửa. Anh chị có thể liên hệ để được tư vấn theo công trình.",
  },
  {
    slug: "bao-tri-cua-nhom-kinh-viec-nho-giu-cua-ben",
    chuyenMuc: "Window Technology",
    tieuDe: "Bảo trì cửa nhôm kính: những việc nhỏ giữ cửa bền lâu",
    tomTat: "Vệ sinh ray, kiểm tra gioăng và tra phụ kiện đúng lúc giúp cửa vận hành êm lâu hơn.",
    anh: "/images/xuong/tay-nghe-phu-kien.webp",
    ngay: "2026-11-12",
    noiDung: [
      {
        h: "Vệ sinh ray và rãnh thoát nước",
        p: [
          "Bụi và cát tích tụ trong ray làm bánh xe và con lăn nhanh mòn, cánh trượt nặng và ồn hơn. Hút bụi và lau ray định kỳ, kiểm tra rãnh thoát nước không bị nghẹt, là việc đơn giản nhưng hiệu quả nhất.",
        ],
      },
      {
        h: "Kiểm tra gioăng và phụ kiện",
        p: [
          "Gioăng cao su có thể cứng hoặc nứt theo thời gian. Khi thấy gioăng hở hoặc biến dạng, nên báo để thay đúng loại. Tay nắm, bản lề và khóa cũng cần được vặn chặt và tra dầu phù hợp theo hướng dẫn của nhà cung cấp.",
        ],
      },
      {
        h: "Khi nào nên gọi kỹ thuật?",
        p: [
          "Nếu cánh cửa bị xệ, khó đóng, đóng không kín hoặc có tiếng kêu bất thường, đừng tự ý tháo chỉnh bộ phận chịu lực. Hãy liên hệ đội kỹ thuật để kiểm tra và hiệu chỉnh đúng cách.",
        ],
      },
    ],
    ketLuan: "Chính sách bảo hành và hậu mãi cụ thể đang được hoàn thiện. Anh chị liên hệ WINDUCA để được hỗ trợ khi cần.",
  },
  {
    slug: "anh-sang-tu-nhien-va-cua-kinh-lon",
    chuyenMuc: "Architecture & Design",
    tieuDe: "Ánh sáng tự nhiên và cửa kính lớn: cân bằng thế nào?",
    tomTat: "Mặt kính lớn đón sáng và tầm nhìn, nhưng cũng cần tính đến nắng nóng, chói và riêng tư.",
    anh: "/images/giai-phap/penthouse-1.webp",
    ngay: "2026-11-12",
    noiDung: [
      {
        h: "Vì sao nên có nhiều ánh sáng tự nhiên?",
        p: [
          "Ánh sáng tự nhiên làm không gian thoáng và dễ chịu hơn, đồng thời giúp giảm nhu cầu bật đèn ban ngày. Cửa kính lớn là cách trực tiếp nhất để đưa ánh sáng và tầm nhìn vào nhà.",
        ],
      },
      {
        h: "Những điều cần cân bằng",
        p: [
          "Mặt kính hướng nắng có thể gây chói và nóng. Giải pháp thường kết hợp nhiều yếu tố: loại kính, mái hiên hoặc lam che, rèm và cách bố trí nội thất. Không có một đáp án chung, vì mỗi hướng nhà có điều kiện riêng.",
          "Riêng tư cũng là câu hỏi quan trọng với nhà phố và căn hộ. Vị trí ô mở, cách chia ô kính và rèm hoặc kính mờ có thể giải quyết tùy tình huống.",
        ],
      },
      {
        h: "Trao đổi sớm với kiến trúc sư",
        p: [
          "Quyết định về diện tích kính nên được cân nhắc từ giai đoạn thiết kế, cùng với hướng nhà, che nắng và thông gió. Khi đó cửa không chỉ là chi tiết hoàn thiện mà là một phần của ý đồ kiến trúc.",
        ],
      },
    ],
    ketLuan: "Anh chị có thể gửi bản vẽ để đội kỹ thuật WINDUCA cùng kiến trúc sư cân nhắc giải pháp cửa phù hợp từng hướng nhà.",
  },
  {
    slug: "cua-truot-nang-khac-gi-cua-truot-thuong",
    chuyenMuc: "Window Technology",
    tieuDe: "Cửa trượt nâng khác gì cửa trượt thường?",
    tomTat: "Hai kiểu cửa cùng trượt ngang nhưng khác nhau ở cách cánh tựa vào ray và cách đóng kín.",
    anh: "/images/he-cua/mau-goc/romadio-rd120ls-ss-g1.webp",
    kieu: "ky-thuat",
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
    anh: "/images/he-cua/ban-ve/civro-xw65-1.webp",
    kieu: "ky-thuat",
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
  {
    slug: "thanh-cau-cach-nhiet-trong-khung-nhom",
    chuyenMuc: "Material & Engineering",
    tieuDe: "Thanh cầu cách nhiệt trong khung nhôm hoạt động thế nào?",
    tomTat: "Thanh cầu là phần ngăn giữa hai nửa khung nhôm, giúp hạn chế nhiệt truyền qua khung cửa.",
    anh: "/images/mat-cat-khung-cua.jpg",
    ngay: "2026-11-10",
    noiDung: [
      {
        h: "Vì sao khung nhôm cần ngăn dẫn nhiệt?",
        p: [
          "Nhôm là kim loại dẫn nhiệt tốt. Nếu khung chỉ là một khối nhôm liền, nhiệt có thể truyền thẳng từ mặt ngoài vào mặt trong, hoặc ngược lại.",
          "Điều này ảnh hưởng đến cảm giác nhiệt gần khung cửa, và khi chênh lệch nhiệt độ lớn có thể gây đọng hơi nước trên bề mặt khung.",
        ],
      },
      {
        h: "Thanh cầu nằm ở đâu?",
        p: [
          "Khung được chia thành hai nửa, một nửa hướng ra ngoài và một nửa hướng vào trong. Giữa hai nửa là các thanh làm từ vật liệu dẫn nhiệt kém hơn nhôm, thường là polyamide, nối hai nửa thành một thanh khung chắc chắn.",
          "Vì vậy trên bản vẽ mặt cắt, khung thường gồm hai khoang nhôm và phần nối ở giữa.",
        ],
      },
      {
        h: "Nên xem gì khi chọn?",
        p: [
          "Hãy hỏi nhà cung cấp về tài liệu kỹ thuật của hệ nhôm: cấu tạo mặt cắt, vật liệu thanh cầu và kết quả kiểm định nếu có. Khả năng cách nhiệt của cả bộ cửa còn phụ thuộc vào kính, gioăng và cách lắp đặt, không chỉ khung.",
          "Số liệu cụ thể nên lấy từ phiếu kiểm định của từng hệ cửa.",
        ],
      },
    ],
    ketLuan: "Anh chị có thể gửi bản vẽ để đội kỹ thuật WINDUCA tư vấn chi tiết phù hợp với công trình.",
  },
];

/** Chuyên mục của Tin tức. Ba mục sau chưa có bài thật nên trang hiện trạng thái đang cập nhật. */
export const MUC_TIN_TUC: { id: MucId; ten: string; mota: string; href: string }[] = [
  { id: "kien-thuc", ten: "Kiến thức", mota: "Bài chuyên môn về kiến trúc, công nghệ cửa, vật liệu và kỹ thuật.", href: "/tin-tuc/kien-thuc" },
  { id: "hoat-dong", ten: "Tin hoạt động", mota: "Ra mắt, triển lãm, hợp tác và hoạt động của WINDUCA.", href: "/tin-tuc/hoat-dong" },
  { id: "cong-trinh", ten: "Câu chuyện công trình", mota: "Công trình và giải pháp triển khai, khi có sự đồng ý của chủ đầu tư.", href: "/tin-tuc/cong-trinh" },
  { id: "tai-lieu", ten: "Tài liệu", mota: "Catalog, hồ sơ kỹ thuật và bảng màu khi đã được kiểm duyệt.", href: "/tin-tuc/tai-lieu" },
];

export const TEN_CHU_DE: Record<string, string> = {
  "Window Technology": "Công nghệ cửa",
  "Material & Engineering": "Vật liệu và kỹ thuật",
  "Architecture & Design": "Kiến trúc và thiết kế",
};

/** Mã màu theo chủ đề: chữ (đủ tương phản trên nền sáng) và thanh nhấn dưới ảnh. */
export const MAU_CHU_DE: Record<string, { chu: string; thanh: string }> = {
  "Kiến trúc và thiết kế": { chu: "#b8122b", thanh: "#e31937" },
  "Vật liệu và kỹ thuật": { chu: "#2f5d80", thanh: "#4f86b0" },
  "Công nghệ cửa": { chu: "#8a5a12", thanh: "#d19a2e" },
};
export const mauChuDe = (ten: string) => MAU_CHU_DE[ten] ?? { chu: "#b8122b", thanh: "#e31937" };

export const mucCua = (b: BaiViet): MucId => b.muc ?? "kien-thuc";
export const chuDeCua = (b: BaiViet) => TEN_CHU_DE[b.chuyenMuc] ?? b.chuyenMuc;

/** Số phút đọc ước tính (khoảng 200 từ mỗi phút), tối thiểu 1. */
export function phutDoc(b: BaiViet): number {
  const chu = [b.tomTat, b.ketLuan, ...b.noiDung.flatMap((m) => [m.h, ...m.p])].join(" ");
  return Math.max(1, Math.round(chu.split(/\s+/).filter(Boolean).length / 200));
}

/** 2026-11-12 -> 12/11/2026 */
export const ngayVN = (iso: string) => iso.split("-").reverse().join("/");

/** Dữ liệu gọn cho thành phần client (không chứa nội dung bài). */
export type TheBai = { slug: string; muc: MucId; chuDe: string; tieuDe: string; tomTat: string; anh: string; kieu?: "ky-thuat"; ngay: string; phut: number; diem: string[] };
export const THE_BAI: TheBai[] = BAI_VIET.map((b) => ({ slug: b.slug, muc: mucCua(b), chuDe: chuDeCua(b), tieuDe: b.tieuDe, tomTat: b.tomTat, anh: b.anh, kieu: b.kieu, ngay: ngayVN(b.ngay), phut: phutDoc(b), diem: b.noiDung.slice(0, 3).map((m) => m.h) }));
