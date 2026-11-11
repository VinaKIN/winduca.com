/**
 * Giải pháp theo loại công trình (viết lại 11/11/2026 theo phong cách tạp chí, 8 loại công trình).
 * Nội dung chỉ nêu cân nhắc thiết kế chung và quy trình tư vấn; KHÔNG có thông số, giá, tên hãng hay tuyên bố kỹ thuật chưa xác nhận.
 * Ảnh minh họa lấy từ Pexels (giấy phép miễn phí dùng thương mại), xem public/images/NGUON-ANH.md.
 */

export type CauHoi = { h: string; d: string };
export type CanNhac = { t: string; m: string };

export type GiaiPhap = {
  slug: string;
  /** Tên ngắn dùng ở mục lục và chip. */
  ten: string;
  /** Tên đầy đủ (tiêu đề trang). */
  tenDai: string;
  tomTat: string;
  /** Câu dẫn đầu bài (dek). */
  dan: string;
  /** Thân bài: các đoạn văn. */
  baiViet: string[];
  /** Câu trích nổi bật. */
  trich: string;
  anh: string;
  anh2: string;
  pos: string;
  pos2: string;
  /** Chú thích ảnh (kiểu FIG.). */
  chuThich: string;
  khongGian: string[];
  canNhac: CanNhac[];
  heCua: string[]; // slug của KIEU_CUA
  ghiChuHeCua: string;
  faq: CauHoi[];
};

const ANH = "/images/giai-phap/";

export const GIAI_PHAP: GiaiPhap[] = [
  {
    slug: "biet-thu",
    ten: "Biệt thự",
    tenDai: "Giải pháp cửa cho biệt thự",
    tomTat: "Mặt kính lớn nhìn ra sân vườn và hồ bơi, đường nét mảnh, vận hành êm.",
    dan: "Trong một căn biệt thự, cánh cửa là ranh giới mềm nhất giữa phòng khách và khu vườn.",
    baiViet: [
      "Biệt thự hiện đại thường được thiết kế quanh một ý tưởng: kéo thiên nhiên vào không gian sống. Mặt kính vì thế rộng hơn, thanh nhôm mảnh hơn và ít gờ chắn tầm nhìn hơn. Cửa không còn chỉ là lớp ngăn mà trở thành một phần của kiến trúc.",
      "Khi mặt tiền có nhiều lớp kính, đường nét của từng cánh cần thống nhất từ cửa chính, cửa ra vườn đến ô thoáng. Một bản vẽ chỉ đẹp khi các cánh cửa cùng nói một ngôn ngữ, từ màu hoàn thiện đến tỉ lệ khung.",
    ],
    trich: "Cánh cửa đẹp là cánh cửa mà bạn quên mất nó đang ở đó.",
    anh: ANH + "biet-thu-1.webp",
    anh2: ANH + "biet-thu-2.webp",
    pos: "50% 55%",
    pos2: "50% 50%",
    chuThich: "Phòng khách mở ra hồ bơi qua mặt kính lớn",
    khongGian: [
      "Phòng khách và sảnh liên thông với sân vườn, hồ bơi.",
      "Mặt tiền nhiều lớp kính cần đường nét thống nhất.",
      "Cửa chính và cửa ra vườn cần đóng mở chắc chắn.",
      "Cân nhắc khẩu độ lớn, hướng nắng, gió và tầm nhìn.",
    ],
    canNhac: [
      { t: "Khẩu độ và tầm nhìn", m: "Mặt kính càng rộng, khung càng nên mảnh. Cần chốt sớm vị trí cánh cố định và cánh mở để không làm đứt mạch nhìn." },
      { t: "Nắng, gió và mưa", m: "Hướng của từng mặt nhà quyết định cấu hình kính và cách che nắng. Nên xét cùng kiến trúc sư từ giai đoạn thiết kế." },
      { t: "Đóng mở hằng ngày", m: "Cửa ra vườn và cửa hồ bơi được dùng nhiều nhất. Chọn kiểu mở theo thói quen của gia đình, không chỉ theo bản vẽ." },
    ],
    heCua: ["cua-truot-nang", "cua-di-mo-quay", "cua-so"],
    ghiChuHeCua: "Cửa trượt nâng cho mặt kính lớn; cửa đi mở quay cho lối vào; cửa sổ đồng bộ đường nét với mặt tiền.",
    faq: [
      { h: "Mặt kính lớn nên chọn kiểu cửa nào?", d: "Với khẩu độ rộng nhìn ra sân vườn hoặc hồ bơi, cửa trượt nâng thường được cân nhắc đầu tiên vì cánh lớn, đường nét mảnh. Kiểu cuối cùng còn tùy bản vẽ, tải trọng và cách sử dụng." },
      { h: "Làm sao để cửa chính và cửa sổ trông đồng bộ?", d: "Thống nhất màu hoàn thiện, tỉ lệ khung và cách chia ô ngay từ bản vẽ. Chọn các hệ cùng một ngôn ngữ thiết kế giúp mặt tiền liền mạch." },
      { h: "Cần chuẩn bị gì trước khi nhờ WINDUCA tư vấn?", d: "Bản vẽ kiến trúc hoặc mặt đứng, vị trí các ô cửa và mong muốn về cách mở. Chưa có bản vẽ vẫn có thể trao đổi trước về ý tưởng." },
    ],
  },
  {
    slug: "penthouse",
    ten: "Penthouse",
    tenDai: "Giải pháp cửa cho penthouse",
    tomTat: "Ban công và sân thượng nhìn toàn cảnh, đường nét tối giản để giữ tầm nhìn.",
    dan: "Ở tầng cao, thứ xa xỉ nhất là khoảng trời không bị khung cửa cắt ngang.",
    baiViet: [
      "Penthouse sống bằng tầm nhìn. Từ sân thượng hay ban công, thành phố và đường chân trời là phần được thiết kế kỹ nhất, và cửa phải biết lùi lại để nhường chỗ cho khung cảnh đó.",
      "Ở độ cao này, gió và an toàn là câu hỏi đầu tiên chứ không phải câu hỏi cuối. Cánh cửa lớn cần vận hành ổn định, đóng kín chắc chắn và được lắp đặt chuẩn xác theo từng vị trí.",
    ],
    trich: "Tầng càng cao, đường nét càng cần tối giản.",
    anh: ANH + "penthouse-1.webp",
    anh2: ANH + "penthouse-2.webp",
    pos: "50% 50%",
    pos2: "50% 40%",
    chuThich: "Sân thượng với lan can kính nhìn ra thành phố",
    khongGian: [
      "Ban công, sân thượng nhìn toàn cảnh thành phố hoặc biển.",
      "Mặt kính cao, khẩu độ lớn, cần vận hành ổn định.",
      "Cân nhắc gió và an toàn ở tầng cao.",
      "Đường nét tối giản để giữ trọn tầm nhìn.",
    ],
    canNhac: [
      { t: "Tầm nhìn không bị cắt", m: "Hạn chế thanh ngang ở tầm mắt, ưu tiên cánh lớn và khung mảnh để đường chân trời liền một mạch." },
      { t: "Gió ở tầng cao", m: "Cần xét điều kiện gió thực tế của tòa nhà khi chọn cấu hình kính và hệ cửa. Kiến trúc sư và đội kỹ thuật cùng chốt." },
      { t: "Vận hành và an toàn", m: "Cánh lớn phải đóng mở êm, khóa chắc, và có phương án an toàn cho khu vực sát lan can." },
    ],
    heCua: ["cua-truot-nang", "cua-xep-truot", "cua-so"],
    ghiChuHeCua: "Cửa trượt nâng và cửa xếp trượt cho khẩu độ rộng; cửa sổ cho các phòng riêng.",
    faq: [
      { h: "Penthouse cần lưu ý gì về gió?", d: "Điều kiện gió thay đổi theo độ cao và vị trí tòa nhà. Nên đưa thông tin này cho đội kỹ thuật ngay từ đầu để đề xuất cấu hình phù hợp." },
      { h: "Cửa xếp trượt hay cửa trượt nâng phù hợp hơn?", d: "Cửa xếp trượt mở được gần hết khẩu độ, hợp với ban công muốn thông hẳn ra ngoài. Cửa trượt nâng cho cánh lớn, đóng kín và giữ tầm nhìn liền mạch. Tùy bản vẽ và cách dùng." },
      { h: "Có làm được cửa cho ô kính rất cao không?", d: "Tùy khẩu độ và bản vẽ cụ thể. Đội kỹ thuật sẽ xem bản vẽ và trao đổi phương án khả thi trước khi báo hướng triển khai." },
    ],
  },
  {
    slug: "can-ho-cao-cap",
    ten: "Căn hộ cao cấp",
    tenDai: "Giải pháp cửa cho căn hộ cao cấp",
    tomTat: "Cửa kính lớn đón sáng và tầm nhìn, giữ không gian yên tĩnh giữa đô thị.",
    dan: "Trong căn hộ, mỗi mét vuông đều quý, và ánh sáng là thứ mở rộng không gian mà không tốn diện tích.",
    baiViet: [
      "Căn hộ cao cấp thường có mặt kính lớn quay ra thành phố, sông hoặc biển. Cửa ban công vì vậy vừa là lối ra, vừa là khung tranh của cả phòng khách.",
      "Sống giữa đô thị còn có câu chuyện tiếng ồn và sự riêng tư. Cấu hình kính, độ kín của cửa và cách bố trí cánh mở đều góp phần giữ không gian bên trong yên tĩnh, dễ chịu.",
    ],
    trich: "Một khung cửa tốt biến căn hộ thành một khung nhìn.",
    anh: ANH + "can-ho-cao-cap-1.webp",
    anh2: ANH + "can-ho-cao-cap-2.webp",
    pos: "50% 50%",
    pos2: "50% 55%",
    chuThich: "Phòng khách đón ánh sáng qua cửa kính lớn",
    khongGian: [
      "Cửa ban công và cửa kính phòng khách nhìn ra thành phố.",
      "Cần giữ yên tĩnh và riêng tư giữa khu đô thị đông đúc.",
      "Mặt tiền tòa nhà có quy định chung về màu và hình thức.",
      "Cân nhắc không gian hẹp, ưu tiên kiểu mở tiết kiệm diện tích.",
    ],
    canNhac: [
      { t: "Quy định của tòa nhà", m: "Ban quản lý thường có yêu cầu về màu khung, hình thức mặt ngoài và cách lắp đặt. Nên kiểm tra trước khi chốt phương án." },
      { t: "Yên tĩnh và riêng tư", m: "Chọn cấu hình kính và độ kín phù hợp với vị trí căn hộ, nhất là mặt hướng ra đường lớn." },
      { t: "Diện tích sử dụng", m: "Cánh trượt giúp không chiếm chỗ khi mở, phù hợp ban công và phòng khách không quá rộng." },
    ],
    heCua: ["cua-truot-nang", "cua-so", "cua-di-mo-quay"],
    ghiChuHeCua: "Cửa trượt cho ban công và phòng khách; cửa sổ cho phòng ngủ; cửa đi mở quay cho lối vào hoặc phòng riêng.",
    faq: [
      { h: "Căn hộ có cần xin phép khi thay cửa không?", d: "Nhiều tòa nhà có quy định riêng về mặt ngoài và thi công. Nên hỏi ban quản lý và đưa quy định đó cho đội kỹ thuật để tính vào phương án." },
      { h: "Cửa trượt hay cửa mở quay cho ban công?", d: "Ban công hẹp thường hợp cửa trượt vì không chiếm diện tích khi mở. Ban công rộng có thể cân nhắc thêm các kiểu khác tùy bản vẽ." },
      { h: "Làm sao giảm tiếng ồn từ bên ngoài?", d: "Độ kín của cửa và cấu hình kính ảnh hưởng nhiều. Đội kỹ thuật sẽ tư vấn theo vị trí căn hộ; số liệu cụ thể sẽ được cung cấp khi có xác nhận." },
    ],
  },
  {
    slug: "nha-pho-cao-cap",
    ten: "Nhà phố cao cấp",
    tenDai: "Giải pháp cho nhà phố cao cấp",
    tomTat: "Mặt tiền hẹp cần lấy sáng, thông gió và đồng bộ từ cửa chính đến cửa sổ.",
    dan: "Nhà phố có chiều ngang hẹp, nên mỗi ô cửa phải làm việc nhiều hơn một nhiệm vụ.",
    baiViet: [
      "Mặt tiền nhà phố là nơi kiến trúc sư phải cân bằng giữa vẻ đẹp, ánh sáng và sự kín đáo. Cửa đi, cửa sổ và cửa ban công cùng xuất hiện trên một mặt đứng hẹp, nên chỉ cần lệch đường nét là thấy ngay.",
      "Bên trong, giếng trời và cầu thang là hai nguồn sáng quan trọng. Cửa kính lấy sáng và thông gió tự nhiên giúp ngôi nhà sâu mà vẫn thoáng, đồng thời vẫn cần tính đến tiếng ồn từ mặt phố.",
    ],
    trich: "Nhà hẹp không có nghĩa là tối. Có khi chỉ cần một ô kính đặt đúng chỗ.",
    anh: ANH + "nha-pho-cao-cap-1.webp",
    anh2: ANH + "nha-pho-cao-cap-2.webp",
    pos: "50% 50%",
    pos2: "50% 40%",
    chuThich: "Dãy nhà phố với mặt tiền nhiều ô cửa",
    khongGian: [
      "Mặt tiền hẹp, cần lấy sáng và thông gió tự nhiên.",
      "Cửa đi, cửa sổ và cửa ban công cần đồng bộ đường nét.",
      "Giếng trời và cầu thang cần ánh sáng.",
      "Cân nhắc tiếng ồn từ mặt phố khi chọn cấu hình.",
    ],
    canNhac: [
      { t: "Đồng bộ mặt đứng", m: "Cửa chính, cửa sổ và ban công nên cùng màu và cùng tỉ lệ khung để mặt tiền trông liền khối." },
      { t: "Sáng và thoáng", m: "Bố trí ô mở và ô cố định để vừa lấy sáng, vừa thông gió chéo cho ngôi nhà sâu." },
      { t: "Tiếng ồn mặt phố", m: "Phòng hướng ra đường cần cấu hình kín hơn. Nên phân biệt khu cần yên tĩnh và khu cần thoáng." },
    ],
    heCua: ["cua-di-mo-quay", "cua-so", "cua-xep-truot"],
    ghiChuHeCua: "Cửa đi mở quay cho lối vào; cửa sổ cho thông gió; cửa xếp trượt cho khu sinh hoạt liên thông.",
    faq: [
      { h: "Nhà phố hẹp nên chọn cửa nào để thoáng?", d: "Cửa sổ mở quay hoặc mở hất cho phép thông gió tốt mà ít chiếm chỗ. Với khu sinh hoạt liên thông, cửa xếp trượt cho phép mở rộng khi cần." },
      { h: "Làm sao để mặt tiền trông đồng bộ?", d: "Thống nhất màu, độ dày khung và cách chia ô cho mọi loại cửa trên mặt đứng, ngay từ khi dựng bản vẽ." },
      { h: "Có thể cải tạo cửa cho nhà đã xây xong không?", d: "Được, nếu đo đạc hiện trạng chính xác. Đội kỹ thuật sẽ khảo sát và đề xuất phương án phù hợp với kết cấu hiện có." },
    ],
  },
  {
    slug: "khach-san-resort",
    ten: "Khách sạn và resort",
    tenDai: "Giải pháp cho khách sạn và resort",
    tomTat: "Sảnh, nhà hàng và khu hồ bơi mở ra thiên nhiên; cần bền và dễ bảo trì.",
    dan: "Với khách sạn, cánh cửa đầu tiên khách chạm vào cũng là lời chào đầu tiên của thương hiệu.",
    baiViet: [
      "Khách sạn và resort vận hành mỗi ngày, với dòng người đi lại liên tục. Cửa ở sảnh, nhà hàng và khu hồ bơi phải vừa đẹp để tạo ấn tượng, vừa bền và dễ bảo trì để giữ chất lượng lâu dài.",
      "Công trình quy mô lớn còn đặt ra bài toán thống nhất: số lượng nhiều, tiến độ chặt, vật tư phải đồng đều từ lô đầu đến lô cuối. Một đầu mối tư vấn và triển khai giúp giảm rủi ro phối hợp.",
    ],
    trich: "Công trình đẹp trong ảnh nghiệm thu chưa đủ, nó phải đẹp sau mỗi mùa cao điểm.",
    anh: ANH + "khach-san-resort-1.webp",
    anh2: ANH + "khach-san-resort-2.webp",
    pos: "50% 50%",
    pos2: "50% 45%",
    chuThich: "Khu hồ bơi và sảnh mở ra thiên nhiên",
    khongGian: [
      "Sảnh, nhà hàng và khu hồ bơi mở ra thiên nhiên.",
      "Số lượng lớn, cần thống nhất vật tư và tiến độ.",
      "Vận hành thường xuyên, cần bền và dễ bảo trì.",
      "Cân nhắc dòng người đi lại và an toàn.",
    ],
    canNhac: [
      { t: "Thống nhất từ lô đầu đến lô cuối", m: "Số lượng lớn đòi hỏi vật tư đồng đều và quy trình sản xuất ổn định để các phòng, các tầng đồng nhất." },
      { t: "Bền và dễ bảo trì", m: "Chọn kiểu cửa và phụ kiện theo tần suất sử dụng thực tế, có phương án bảo trì rõ ràng cho đội vận hành." },
      { t: "Dòng người và an toàn", m: "Khu sảnh và hồ bơi cần xét lối đi, cách mở cánh và an toàn khi đông người." },
    ],
    heCua: ["cua-xep-truot", "cua-truot-nang", "cua-so"],
    ghiChuHeCua: "Cửa xếp trượt cho khu mở; cửa trượt nâng cho mặt kính lớn; cửa sổ cho phòng nghỉ.",
    faq: [
      { h: "Dự án nhiều hạng mục thì làm việc thế nào?", d: "WINDUCA tiếp nhận toàn bộ bản vẽ, bóc tách theo từng hạng mục và đề xuất cấu hình thống nhất. Một đầu mối phụ trách giúp tiến độ và vật tư đồng bộ." },
      { h: "Cửa cho khu có độ ẩm cao như hồ bơi cần lưu ý gì?", d: "Cần chọn hoàn thiện bề mặt và phụ kiện phù hợp môi trường. Đội kỹ thuật sẽ tư vấn khi nắm điều kiện cụ thể của công trình." },
      { h: "Có hỗ trợ khảo sát tại công trình không?", d: "Có thể trao đổi để sắp xếp khảo sát tùy quy mô và vị trí. Liên hệ để được hướng dẫn cụ thể." },
    ],
  },
  {
    slug: "van-phong-hang-a",
    ten: "Văn phòng hạng A",
    tenDai: "Giải pháp cho văn phòng hạng A",
    tomTat: "Vách kính và cửa lớn tạo không gian làm việc sáng, thoáng và chuyên nghiệp.",
    dan: "Một văn phòng tốt nhận ra mình qua ánh sáng: đủ sáng để làm việc, đủ kín để tập trung.",
    baiViet: [
      "Văn phòng hạng A cần tạo ấn tượng ngay từ sảnh đón, đồng thời phải thực dụng trong từng phòng họp và khu làm việc. Vách kính và cửa kính lớn giúp ánh sáng tự nhiên đi sâu vào không gian, giữ cảm giác thoáng mà vẫn phân chia được khu chức năng.",
      "Điều quan trọng là sự đồng bộ. Khi mặt ngoài tòa nhà, sảnh và các phòng bên trong cùng một ngôn ngữ đường nét, thương hiệu doanh nghiệp được thể hiện nhất quán, không cần thêm một chi tiết trang trí nào.",
    ],
    trich: "Ánh sáng tự nhiên là tiện nghi đắt giá nhất của một văn phòng.",
    anh: ANH + "van-phong-hang-a-1.webp",
    anh2: ANH + "van-phong-hang-a-2.webp",
    pos: "50% 50%",
    pos2: "50% 50%",
    chuThich: "Vách kính phân chia không gian làm việc",
    khongGian: [
      "Sảnh đón và phòng họp cần vách kính lớn, sáng và sang.",
      "Phân chia khu chức năng mà vẫn giữ cảm giác thoáng.",
      "Cần giữ yên tĩnh cho phòng họp và khu làm việc tập trung.",
      "Đồng bộ đường nét từ mặt ngoài đến nội thất.",
    ],
    canNhac: [
      { t: "Ánh sáng và chói", m: "Mặt kính lớn đón sáng nhưng cũng cần cách xử lý chói và nhiệt. Nên xét cùng thiết kế che nắng và nội thất." },
      { t: "Yên tĩnh cho phòng họp", m: "Vách phân chia nên chọn cấu hình phù hợp nhu cầu riêng tư và cách âm của từng phòng." },
      { t: "Hình ảnh thương hiệu", m: "Cửa sảnh là điểm chạm đầu tiên với đối tác. Đường nét gọn và vận hành êm tạo cảm giác chuyên nghiệp." },
    ],
    heCua: ["cua-di-mo-quay", "cua-so", "cua-truot-nang"],
    ghiChuHeCua: "Cửa đi mở quay cho sảnh và phòng họp; cửa sổ cho mặt ngoài; cửa trượt cho khu liên thông.",
    faq: [
      { h: "Cửa cho phòng họp cần lưu ý gì?", d: "Quan trọng là độ kín và cách âm tương đối cho cuộc họp riêng tư. Đội kỹ thuật sẽ đề xuất cấu hình theo yêu cầu của từng phòng." },
      { h: "Có thể đồng bộ cửa ngoài và vách trong không?", d: "Có. Thống nhất màu hoàn thiện và tỉ lệ khung giúp mặt ngoài và nội thất đọc như một tổng thể." },
      { h: "Dự án văn phòng có tiến độ gấp thì sao?", d: "Cần trao đổi sớm về mốc bàn giao để sắp xếp bóc tách, gia công và lắp đặt hợp lý. Liên hệ để được tư vấn kế hoạch cụ thể." },
    ],
  },
  {
    slug: "nha-hang-quan-ca-phe",
    ten: "Nhà hàng và quán cà phê",
    tenDai: "Giải pháp cho nhà hàng và quán cà phê",
    tomTat: "Mặt kính lớn mời khách từ ngoài phố, mở ra khi cần để không gian liền mạch.",
    dan: "Một quán ăn đẹp bắt đầu từ ô kính mặt tiền, nơi người qua đường quyết định có bước vào hay không.",
    baiViet: [
      "Với nhà hàng và quán cà phê, mặt kính là phương tiện giới thiệu rẻ nhất mà hiệu quả nhất. Ánh đèn, bàn ghế và người ngồi bên trong trở thành bức tranh sống động nhìn từ ngoài phố.",
      "Cửa mở ra còn giúp không gian linh hoạt theo thời tiết và giờ cao điểm, biến mặt tiền thành khu ngồi ngoài trời khi cần. Cánh cửa phải vận hành thuận tay, vì nhân viên và khách ra vào cả ngày.",
    ],
    trich: "Mặt kính là bảng hiệu đẹp nhất của một quán.",
    anh: ANH + "nha-hang-quan-ca-phe-1.webp",
    anh2: ANH + "nha-hang-quan-ca-phe-2.webp",
    pos: "50% 55%",
    pos2: "50% 40%",
    chuThich: "Quán ăn mở mặt kính nhìn ra phố",
    khongGian: [
      "Mặt tiền kính lớn thu hút khách từ ngoài phố.",
      "Cần mở rộng khu ngồi khi thời tiết đẹp hoặc giờ cao điểm.",
      "Cửa vận hành liên tục, cần êm và bền.",
      "Cân nhắc ánh sáng, nhiệt và độ riêng tư theo từng khung giờ.",
    ],
    canNhac: [
      { t: "Mặt tiền như một bảng hiệu", m: "Đường nét khung mảnh giúp kính nổi bật; màu khung nên hòa với nhận diện thương hiệu của quán." },
      { t: "Mở khi cần", m: "Cửa xếp trượt hoặc cửa trượt cho phép nối khu trong và ngoài nhà, linh hoạt theo thời tiết." },
      { t: "Vận hành cả ngày", m: "Cửa ra vào được dùng liên tục, nên ưu tiên phụ kiện bền và dễ bảo trì." },
    ],
    heCua: ["cua-xep-truot", "cua-di-mo-quay", "cua-truot-nang"],
    ghiChuHeCua: "Cửa xếp trượt để mở rộng mặt tiền; cửa đi mở quay cho lối vào; cửa trượt nâng cho mặt kính lớn.",
    faq: [
      { h: "Làm sao để quán thoáng mà vẫn kín khi máy lạnh chạy?", d: "Chọn cửa có độ kín tốt khi đóng và cho phép mở rộng khi cần. Đội kỹ thuật sẽ tư vấn theo cách quán vận hành." },
      { h: "Mặt tiền kính lớn có phù hợp quán nhỏ không?", d: "Có, miễn là tỉ lệ cửa và vị trí cánh mở được tính trong bản vẽ. Quán nhỏ càng cần mặt kính để tạo cảm giác rộng." },
      { h: "Có thể làm màu khung theo nhận diện thương hiệu không?", d: "Có thể trao đổi về màu hoàn thiện phù hợp. Liên hệ để xem mẫu và phương án." },
    ],
  },
  {
    slug: "cong-trinh-dac-thu",
    ten: "Công trình đặc thù",
    tenDai: "Giải pháp cho công trình kiến trúc đặc thù",
    tomTat: "Hình khối, góc cắt hoặc kích thước ngoài tiêu chuẩn, cần chi tiết riêng theo bản vẽ.",
    dan: "Khi hình khối đã khác thường, cánh cửa cũng phải được vẽ riêng cho nó.",
    baiViet: [
      "Có những công trình không đi theo lối mòn: mặt kính cong, góc cắt xiên, kích thước vượt khuôn mẫu. Ở đó, hệ cửa tiêu chuẩn chỉ là điểm khởi đầu và phần còn lại được hoàn thiện bằng chi tiết riêng theo ý đồ của kiến trúc sư.",
      "Loại công trình này đòi hỏi phối hợp chặt chẽ giữa kiến trúc sư, nhà thầu và đội kỹ thuật ngay từ sớm. Phương án thi công, lắp đặt và dung sai càng được làm rõ sớm thì rủi ro phát sinh càng ít.",
    ],
    trich: "Công trình đặc thù cần một người đối thoại, không chỉ một nhà cung cấp.",
    anh: ANH + "cong-trinh-dac-thu-1.webp",
    anh2: ANH + "cong-trinh-dac-thu-2.webp",
    pos: "50% 45%",
    pos2: "50% 50%",
    chuThich: "Mặt đứng kính cong của một công trình đặc thù",
    khongGian: [
      "Hình khối, góc cắt hoặc kích thước ngoài tiêu chuẩn.",
      "Cần chi tiết riêng theo bản vẽ của kiến trúc sư.",
      "Phối hợp chặt chẽ giữa kiến trúc sư, nhà thầu và đội kỹ thuật.",
      "Cân nhắc phương án thi công và lắp đặt từ sớm.",
    ],
    canNhac: [
      { t: "Bản vẽ làm điểm xuất phát", m: "Mọi đề xuất đi từ bản vẽ của kiến trúc sư. Càng có chi tiết, đội kỹ thuật càng đề xuất sát ý đồ." },
      { t: "Dung sai và lắp đặt", m: "Hình khối phức tạp cần làm rõ dung sai và trình tự lắp đặt từ đầu để tránh sửa đổi tại công trình." },
      { t: "Phối hợp nhiều bên", m: "Kiến trúc sư, nhà thầu và đội kỹ thuật nên có đầu mối trao đổi chung, cập nhật theo từng mốc." },
    ],
    heCua: ["cua-truot-nang", "cua-di-mo-quay", "cua-xep-truot", "cua-so"],
    ghiChuHeCua: "Lựa chọn tùy bản vẽ; đội kỹ thuật đề xuất kiểu cửa và chi tiết phù hợp từng hạng mục.",
    faq: [
      { h: "Công trình có hình khối đặc biệt có làm được không?", d: "Tùy bản vẽ cụ thể. Đội kỹ thuật sẽ xem xét và trao đổi phương án khả thi trước khi đề xuất hướng triển khai." },
      { h: "Nên liên hệ ở giai đoạn nào của dự án?", d: "Càng sớm càng tốt, lý tưởng là giai đoạn thiết kế cơ sở hoặc kỹ thuật. Khi đó có thể tối ưu chi tiết thay vì xử lý lại sau." },
      { h: "Kiến trúc sư có làm việc trực tiếp với đội kỹ thuật không?", d: "Có. WINDUCA sắp xếp để kiến trúc sư trao đổi trực tiếp với đội kỹ thuật về chi tiết và phương án triển khai." },
    ],
  },
];

export type BuocQuyTrinh = { t: string; m: string };

/** Quy trình triển khai (5 bước), dùng chung cho trang tổng và trang chi tiết. */
export const QUY_TRINH_5_BUOC: BuocQuyTrinh[] = [
  { t: "Tiếp nhận", m: "Nhận bản vẽ, mặt đứng và yêu cầu kiến trúc. Chưa có bản vẽ vẫn có thể bắt đầu bằng trao đổi ý tưởng." },
  { t: "Đề xuất", m: "Gợi ý kiểu cửa, hệ nhôm, kính và phụ kiện phù hợp từng vị trí trong công trình." },
  { t: "Bóc tách", m: "Tư vấn chi tiết theo bản vẽ, thống nhất cấu hình và các điểm cần làm rõ cùng kiến trúc sư." },
  { t: "Gia công", m: "Sản xuất theo bản vẽ đã chốt, kiểm soát vật tư để các hạng mục đồng đều." },
  { t: "Lắp đặt và nghiệm thu", m: "Lắp đặt tại công trình, kiểm tra vận hành và nghiệm thu cùng chủ đầu tư." },
];
