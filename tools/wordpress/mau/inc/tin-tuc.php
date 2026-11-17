<?php
/**
 * Tin tức: phân loại, hàm trợ giúp và bộ hiển thị danh sách (mô phỏng TinTucDanhSach của bản Next.js).
 * Chuyên mục (category): kien-thuc, hoat-dong, cong-trinh, tai-lieu. Chủ đề (taxonomy chu-de): 3 nhóm.
 */
if (!defined('ABSPATH')) exit;

add_action('init', function () {
    register_taxonomy('chu-de', 'post', [
        'label' => 'Chủ đề',
        'labels' => ['name' => 'Chủ đề', 'singular_name' => 'Chủ đề', 'add_new_item' => 'Thêm chủ đề'],
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => true,
        'rewrite' => ['slug' => 'chu-de'],
    ]);
    register_post_meta('post', 'wd_ket_luan', ['single' => true, 'type' => 'string', 'show_in_rest' => true]);
    register_post_meta('post', 'wd_kieu', ['single' => true, 'type' => 'string', 'show_in_rest' => true]);
});

// Chuyên mục nằm dưới /tin-tuc/<slug>/ cùng tiền tố với bài viết: đặt luật riêng cho 4 slug lên đầu,
// còn tiền tố mặc định của category đổi sang "chuyen-muc" để không nuốt đường dẫn bài.
add_action('init', function () {
    add_rewrite_rule('^tin-tuc/(kien-thuc|hoat-dong|cong-trinh|tai-lieu)/?$', 'index.php?category_name=$matches[1]', 'top');
});
add_filter('category_link', function ($link, $id) {
    $t = get_category($id);
    return ($t && !is_wp_error($t) && isset(winduca_muc_tin_tuc()[$t->slug])) ? home_url('/tin-tuc/' . $t->slug . '/') : $link;
}, 10, 2);

// Hộp nhập cho nhóm biên tập: kết luận "Tóm lại" và kiểu ảnh
add_action('add_meta_boxes', function () {
    add_meta_box('wd_bai', 'Thông tin bài WINDUCA', function ($p) {
        wp_nonce_field('wd_bai', 'wd_bai_n');
        $k = get_post_meta($p->ID, 'wd_ket_luan', true);
        $kieu = get_post_meta($p->ID, 'wd_kieu', true);
        echo '<p><label><strong>Tóm lại (khung cuối bài)</strong></label><br><textarea name="wd_ket_luan" rows="3" style="width:100%">' . esc_textarea($k) . '</textarea></p>';
        echo '<p><label><input type="checkbox" name="wd_kieu" value="ky-thuat" ' . checked($kieu, 'ky-thuat', false) . '> Ảnh kỹ thuật (mẫu 3D, bản vẽ nền trong): đặt trên nền tối kẻ lưới, không cắt xén</label></p>';
    }, 'post', 'normal', 'default');
});
add_action('save_post', function ($id) {
    if (!isset($_POST['wd_bai_n']) || !wp_verify_nonce($_POST['wd_bai_n'], 'wd_bai') || !current_user_can('edit_post', $id)) return;
    update_post_meta($id, 'wd_ket_luan', sanitize_textarea_field($_POST['wd_ket_luan'] ?? ''));
    update_post_meta($id, 'wd_kieu', isset($_POST['wd_kieu']) ? 'ky-thuat' : '');
});

// Danh sách hiện đủ bài, không phân trang (số bài ít)
add_action('pre_get_posts', function ($q) {
    if (!is_admin() && $q->is_main_query() && ($q->is_home() || $q->is_category() || $q->is_search())) {
        $q->set('posts_per_page', 60);
        if ($q->is_search()) $q->set('post_type', 'post');
    }
});

function winduca_muc_tin_tuc() {
    return [
        'kien-thuc' => ['Kiến thức', 'Bài chuyên môn về kiến trúc, công nghệ cửa, vật liệu và kỹ thuật.'],
        'hoat-dong' => ['Tin hoạt động', 'Ra mắt, triển lãm, hợp tác và hoạt động của WINDUCA.'],
        'cong-trinh' => ['Câu chuyện công trình', 'Công trình và giải pháp triển khai, khi có sự đồng ý của chủ đầu tư.'],
        'tai-lieu' => ['Tài liệu', 'Catalog, hồ sơ kỹ thuật và bảng màu khi đã được kiểm duyệt.'],
    ];
}
function winduca_se_co() {
    return [
        'kien-thuc' => [],
        'hoat-dong' => ['Ra mắt sản phẩm và giải pháp mới.', 'Sự kiện, triển lãm và buổi giới thiệu cho kiến trúc sư.', 'Hoạt động hợp tác với đối tác, đại lý và nhà thầu.'],
        'cong-trinh' => ['Yêu cầu kiến trúc, giải pháp triển khai và kết quả thực tế.', 'Chỉ đăng khi có hình ảnh thật và sự đồng ý của chủ đầu tư.'],
        'tai-lieu' => ['Catalog và hồ sơ kỹ thuật đã được kiểm duyệt.', 'Bảng màu hoàn thiện và thư viện bản vẽ.'],
    ];
}
function winduca_mau_chu_de($ten) {
    $m = [
        'Kiến trúc và thiết kế' => ['#b8122b', '#e31937'],
        'Vật liệu và kỹ thuật' => ['#2f5d80', '#4f86b0'],
        'Công nghệ cửa' => ['#8a5a12', '#d19a2e'],
    ];
    return $m[$ten] ?? ['#b8122b', '#e31937'];
}
function winduca_chu_de($id) {
    $t = get_the_terms($id, 'chu-de');
    return ($t && !is_wp_error($t)) ? $t[0]->name : '';
}
function winduca_muc_cua($id) {
    $c = get_the_category($id);
    foreach ($c as $x) if (isset(winduca_muc_tin_tuc()[$x->slug])) return $x->slug;
    return 'kien-thuc';
}
function winduca_phut_doc($post) {
    $post = get_post($post);
    $chu = wp_strip_all_tags($post->post_content . ' ' . $post->post_excerpt . ' ' . get_post_meta($post->ID, 'wd_ket_luan', true));
    $n = count(preg_split('/\s+/u', trim($chu), -1, PREG_SPLIT_NO_EMPTY));
    return max(1, (int) round($n / 200));
}
/** Ba tiêu đề mục đầu của bài (thẻ tối "ba điểm chính"). */
function winduca_diem($post) {
    $post = get_post($post);
    preg_match_all('/<h2[^>]*>(.*?)<\/h2>/su', $post->post_content, $m);
    return array_map('wp_strip_all_tags', array_slice($m[1] ?? [], 0, 3));
}

/** Ruột khung ảnh bài viết (mô phỏng AnhBai): ảnh kỹ thuật trên nền tối kẻ lưới, ảnh thường phủ kín. */
function winduca_anh_bai($id, $sizes, $zoom = 'group-hover:scale-[1.06]', $eager = false) {
    $kt = get_post_meta($id, 'wd_kieu', true) === 'ky-thuat';
    $chu_de = winduca_chu_de($id);
    $mau = winduca_mau_chu_de($chu_de);
    $tid = get_post_thumbnail_id($id);
    if ($kt) echo '<span class="luoi-ban-ve-toi absolute inset-0 bg-than-chi" aria-hidden="true"></span>';
    if ($tid) {
        echo wp_get_attachment_image($tid, 'large', false, [
            'alt' => '',
            'sizes' => $sizes,
            'loading' => $eager ? 'eager' : 'lazy',
            'class' => ($kt ? 'object-contain p-[7%]' : 'object-cover') . ' transition-transform duration-300 ease-out ' . $zoom,
            'style' => 'position:absolute;inset:0;width:100%;height:100%',
        ]);
    }
    if (!$kt) echo '<span class="absolute inset-0 bg-[#1b1d22]/10 mix-blend-multiply" aria-hidden="true"></span>';
    if ($kt) {
        echo '<span class="absolute left-2.5 top-2.5 h-3 w-3 border-l border-t border-white/45" aria-hidden="true"></span>';
        echo '<span class="absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-white/45" aria-hidden="true"></span>';
    }
    echo '<span class="absolute inset-x-0 bottom-0 h-[3px]" style="background:' . esc_attr($mau[1]) . '" aria-hidden="true"></span>';
}

function winduca_mui_ten_doc() {
    echo '<span class="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-than-chi transition-colors duration-150 group-hover:text-accent">Đọc bài <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
}

/** Trang danh sách Tin tức: $muc = null (tất cả) hoặc slug chuyên mục. Dùng truy vấn chính của WordPress. */
function winduca_trang_tin_tuc($muc = null) {
    $mucs = winduca_muc_tin_tuc();
    $tim = is_search() ? get_search_query() : '';
    $m = $muc ? $mucs[$muc] : null;
    $ds = $GLOBALS['wp_query']->posts;
    $noi_bat = $ds[0] ?? null;
    $con = array_slice($ds, 1);
    $nhanh = array_slice($con, 0, 3);
    $luoi = array_slice($con, 3);
    $dem = ['tat-ca' => (int) wp_count_posts('post')->publish];
    foreach ($mucs as $k => $_) { $t = get_category_by_slug($k); $dem[$k] = $t ? (int) $t->count : 0; }
    $url = fn($p) => esc_url(home_url($p));
    ?>
    <section class="luoi-ban-ve nen-nga pb-14 pt-28 md:pb-20 md:pt-36">
      <div class="mx-auto w-full max-w-[1440px] px-5 md:px-10">
        <div class="the-hien">
          <div class="flex items-center justify-between gap-4 pb-5 text-[13px] font-medium tracking-[0.02em] text-than-chi/70">
            <span class="inline-flex items-center gap-3"><i class="h-px w-8 bg-accent" aria-hidden="true"></i>WINDUCA · Tin tức</span>
            <span class="hidden sm:inline"><?php echo esc_html($m ? $m[0] : 'Kiến thức · Hoạt động · Công trình · Tài liệu'); ?></span>
          </div>
          <div class="grid gap-6 pb-10 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-14">
            <h1 class="text-[clamp(2.3rem,5.4vw,4.6rem)] font-light leading-[1.04] tracking-[-0.02em] [text-wrap:balance]">
              <?php if ($m) : ?><span class="font-semibold"><?php echo esc_html($m[0]); ?></span> của WINDUCA<?php else : ?>Tin tức và <span class="font-semibold">kiến thức.</span><?php endif; ?>
            </h1>
            <p class="max-w-md text-[16px] leading-relaxed text-than-chi/75 md:justify-self-end"><?php echo esc_html($m ? $m[1] : 'Bài chuyên môn về kiến trúc, công nghệ cửa và vật liệu, viết gọn và dễ đọc. Chọn chuyên mục hoặc tìm theo từ khóa.'); ?></p>
          </div>
        </div>

        <div class="flex flex-col gap-4 border-y border-than-chi/25 py-3 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Chuyên mục" class="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <?php
            $tabs = ['tat-ca' => ['Tất cả', '/tin-tuc/']];
            foreach ($mucs as $k => $v) $tabs[$k] = [$v[0], "/tin-tuc/$k/"];
            foreach ($tabs as $k => $t) :
                $dang = !$tim && (($muc === null && $k === 'tat-ca') || $muc === $k);
            ?>
              <a href="<?php echo $url($t[1]); ?>" <?php echo $dang ? 'aria-current="page"' : ''; ?> class="group relative inline-flex min-h-11 shrink-0 items-center gap-2 px-3.5 text-[14px] transition-colors duration-150 md:px-4 <?php echo $dang ? 'font-bold text-than-chi' : 'text-than-chi/70 hover:text-than-chi'; ?>">
                <?php echo esc_html($t[0]); ?>
                <span class="text-[12px] tabular-nums <?php echo $dang ? 'text-accent' : 'text-than-chi/50'; ?>"><?php echo (int) $dem[$k]; ?></span>
                <span class="absolute inset-x-3 -bottom-[13px] h-[2px] origin-left bg-accent <?php echo $dang ? '' : 'scale-x-0'; ?>" aria-hidden="true"></span>
              </a>
            <?php endforeach; ?>
          </nav>
          <form role="search" method="get" action="<?php echo $url('/'); ?>" class="relative block md:w-[300px]">
            <label class="sr-only" for="wd-tim">Tìm bài viết</label>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-than-chi/55" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input id="wd-tim" type="search" name="s" value="<?php echo esc_attr($tim); ?>" placeholder="Tìm bài viết" class="min-h-11 w-full rounded-full border border-than-chi/25 bg-white pl-11 pr-4 text-[14.5px] outline-none transition-[border-color,box-shadow] placeholder:text-than-chi/55 focus:border-accent focus:shadow-[0_0_0_3px_rgba(227,25,55,0.12)]">
          </form>
        </div>
        <p role="status" class="mt-3 text-[13px] text-than-chi/65"><?php echo $ds ? count($ds) . ' bài viết' : 'Không có bài phù hợp'; echo $tim ? ' cho “' . esc_html($tim) . '”' : ''; ?></p>

        <?php if (!$ds) : ?>
          <div class="mt-8 rounded-[16px] border border-dashed border-than-chi/25 bg-white/60 px-6 py-12 text-center md:py-16">
            <?php if ($m && !$tim) : ?>
              <p class="text-[1.3rem] font-bold"><?php echo esc_html($m[0]); ?> đang được cập nhật</p>
              <p class="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-than-chi/75"><?php echo esc_html($m[1]); ?></p>
              <?php $se = winduca_se_co()[$muc]; if ($se) : ?>
                <ul class="mx-auto mt-5 max-w-md space-y-2 text-left text-[14.5px] text-than-chi/80">
                  <?php foreach ($se as $x) : ?><li class="flex gap-3"><span class="mt-[0.7em] h-px w-5 shrink-0 bg-accent" aria-hidden="true"></span><?php echo esc_html($x); ?></li><?php endforeach; ?>
                </ul>
              <?php endif; ?>
              <div class="mt-7 flex flex-wrap justify-center gap-3">
                <a href="<?php echo $url('/tin-tuc/kien-thuc/'); ?>" class="nut nut-dac">Đọc bài kiến thức</a>
                <a href="<?php echo $url('/lien-he/'); ?>" class="nut nut-vien-sang">Liên hệ tư vấn</a>
              </div>
            <?php else : ?>
              <p class="text-[1.2rem] font-bold">Không tìm thấy bài phù hợp</p>
              <p class="mt-2 text-[15px] text-than-chi/75">Thử từ khóa ngắn hơn hoặc <a class="underline" href="<?php echo $url('/tin-tuc/'); ?>">xem tất cả bài viết</a>.</p>
            <?php endif; ?>
          </div>
        <?php else : ?>
          <div class="mt-6 grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-8">
            <?php $b = $noi_bat; $cd = winduca_chu_de($b->ID); ?>
            <a href="<?php echo esc_url(get_permalink($b)); ?>" class="the-hien group block overflow-hidden rounded-[20px] border border-than-chi/10 bg-white shadow-[0_5px_20px_rgba(0,0,0,0.04)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,17,21,0.12)] active:translate-y-0">
              <span class="relative block aspect-[16/9] overflow-hidden bg-than-chi">
                <?php winduca_anh_bai($b->ID, '(min-width: 1024px) 52vw, 100vw', 'group-hover:scale-[1.05]', true); ?>
                <span class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-than-chi">Bài mới nhất</span>
                <span class="absolute bottom-4 right-4 rounded-full bg-than-chi px-3 py-1 text-[12px] font-medium text-white"><?php echo winduca_phut_doc($b); ?> phút đọc</span>
              </span>
              <span class="block p-6 md:p-8">
                <span class="text-[12px] font-bold uppercase tracking-[0.14em]" style="color:<?php echo esc_attr(winduca_mau_chu_de($cd)[0]); ?>"><?php echo esc_html($cd); ?></span>
                <span class="mt-2 block text-[clamp(1.5rem,2.4vw,2.2rem)] font-bold leading-[1.15] tracking-[-0.01em] [text-wrap:balance]"><?php echo esc_html(get_the_title($b)); ?></span>
                <span class="mt-3 block max-w-2xl text-[16px] leading-relaxed text-than-chi/75"><?php echo esc_html(get_the_excerpt($b)); ?></span>
                <span class="mt-5 block"><?php winduca_mui_ten_doc(); ?></span>
              </span>
            </a>
            <?php if ($nhanh) : ?>
              <aside aria-label="Đọc nhanh" class="the-hien rounded-[20px] border border-than-chi/10 bg-white p-5 md:p-6">
                <p class="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-than-chi/70"><i class="h-px w-6 bg-accent" aria-hidden="true"></i>Đọc nhanh</p>
                <ul class="mt-2 divide-y divide-than-chi/10" role="list">
                  <?php foreach ($nhanh as $b) : $cd = winduca_chu_de($b->ID); ?>
                    <li>
                      <a href="<?php echo esc_url(get_permalink($b)); ?>" class="group flex items-center gap-4 py-4">
                        <span class="relative block h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[12px] bg-than-chi/10"><?php winduca_anh_bai($b->ID, '84px', 'group-hover:scale-[1.08]'); ?></span>
                        <span class="min-w-0">
                          <span class="block text-[12px] font-bold uppercase tracking-[0.12em]" style="color:<?php echo esc_attr(winduca_mau_chu_de($cd)[0]); ?>"><?php echo esc_html($cd); ?></span>
                          <span class="mt-1 line-clamp-2 block text-[15.5px] font-bold leading-snug transition-colors duration-150 group-hover:text-accent"><?php echo esc_html(get_the_title($b)); ?></span>
                          <span class="mt-1 block text-[12.5px] text-than-chi/65"><?php echo winduca_phut_doc($b); ?> phút đọc · <?php echo esc_html(get_the_date('d/m/Y', $b)); ?></span>
                        </span>
                      </a>
                    </li>
                  <?php endforeach; ?>
                </ul>
              </aside>
            <?php endif; ?>
          </div>

          <?php if ($luoi) : ?>
            <div class="mt-14 flex items-center gap-4"><h3 class="text-[1.25rem] font-bold">Tất cả bài viết</h3><hr class="flex-1 border-0 border-t border-than-chi/25"></div>
            <ul class="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
              <?php foreach ($luoi as $i => $b) : $toi = $i % 4 === 3; $cd = winduca_chu_de($b->ID); ?>
                <li class="the-hien">
                  <a href="<?php echo esc_url(get_permalink($b)); ?>" class="group flex h-full flex-col overflow-hidden rounded-[16px] border transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 active:translate-y-0 <?php echo $toi ? 'border-than-chi bg-than-chi text-white hover:shadow-[0_24px_50px_rgba(15,17,21,0.3)]' : 'border-than-chi/10 bg-white hover:border-than-chi/30 hover:shadow-[0_22px_46px_rgba(15,17,21,0.12)]'; ?>">
                    <span class="relative block aspect-[16/10] overflow-hidden bg-than-chi/10">
                      <?php winduca_anh_bai($b->ID, '(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw'); ?>
                      <span class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-medium text-than-chi"><?php echo esc_html($cd); ?></span>
                      <span class="absolute bottom-3 right-3 rounded-full bg-than-chi px-2.5 py-1 text-[12px] font-medium text-white"><?php echo winduca_phut_doc($b); ?> phút</span>
                    </span>
                    <span class="flex flex-1 flex-col p-5">
                      <span class="text-[12.5px] <?php echo $toi ? 'text-white/70' : 'text-than-chi/65'; ?>"><?php echo esc_html(get_the_date('d/m/Y', $b)); ?></span>
                      <span class="mt-1.5 block text-[1.15rem] font-bold leading-snug transition-colors duration-150 <?php echo $toi ? 'group-hover:text-white/80' : 'group-hover:text-accent'; ?>"><?php echo esc_html(get_the_title($b)); ?></span>
                      <?php $dm = winduca_diem($b); if ($toi && $dm) : ?>
                        <ul class="mt-3 space-y-1.5 text-[14px] leading-snug text-white/80" role="list">
                          <?php foreach ($dm as $d) : ?><li class="flex gap-2.5"><span class="mt-[0.6em] h-px w-4 shrink-0 bg-accent" aria-hidden="true"></span><?php echo esc_html($d); ?></li><?php endforeach; ?>
                        </ul>
                      <?php else : ?>
                        <span class="mt-2 line-clamp-2 block text-[14.5px] leading-relaxed text-than-chi/70"><?php echo esc_html(get_the_excerpt($b)); ?></span>
                      <?php endif; ?>
                      <span class="mt-auto block pt-4"><?php winduca_mui_ten_doc(); ?></span>
                    </span>
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
          <?php endif; ?>
        <?php endif; ?>
      </div>
    </section>

    <section class="relative overflow-hidden nen-toi py-14 text-white md:py-20">
      <div class="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true"></div>
      <div class="relative mx-auto w-full max-w-[1440px] px-5 md:px-10">
        <div class="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 class="max-w-2xl text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-tight">Cần hỏi thêm về cửa cho công trình của bạn?</h2>
            <p class="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80">Gửi bản vẽ hoặc mô tả không gian, đội kỹ thuật WINDUCA sẽ phản hồi hướng triển khai.</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a href="<?php echo $url('/danh-cho-kts/#tu-van'); ?>" class="nut nut-chinh">Gửi bản vẽ để tư vấn</a>
            <a href="<?php echo $url('/lien-he/'); ?>" class="nut nut-vien">Liên hệ tư vấn</a>
          </div>
        </div>
      </div>
    </section>
    <?php
}
