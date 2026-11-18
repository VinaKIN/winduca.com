<?php
/**
 * WINDUCA theme: nạp CSS/JS, hỗ trợ theme, menu chính.
 */
if (!defined('ABSPATH')) exit;

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'gallery', 'caption', 'style', 'script']);
    add_image_size('winduca-the', 960, 600, true);
});

add_action('wp_enqueue_scripts', function () {
    $v = wp_get_theme()->get('Version');
    $d = get_template_directory();
    $u = get_template_directory_uri();
    wp_enqueue_style('winduca-app', $u . '/assets/css/app.css', [], filemtime($d . '/assets/css/app.css'));
    wp_enqueue_style('winduca-theme', get_stylesheet_uri(), ['winduca-app'], $v);
    wp_enqueue_script('winduca-app', $u . '/assets/js/app.js', [], filemtime($d . '/assets/js/app.js'), ['in_footer' => true, 'strategy' => 'defer']);
    if (is_page('he-cua')) {
        wp_enqueue_script('winduca-he-cua', $u . '/assets/js/he-cua.js', [], filemtime($d . '/assets/js/he-cua.js'), ['in_footer' => true, 'strategy' => 'defer']);
    }
    if (is_single()) {
        wp_enqueue_script('winduca-bai-viet', $u . '/assets/js/bai-viet.js', [], filemtime($d . '/assets/js/bai-viet.js'), ['in_footer' => true, 'strategy' => 'defer']);
    }
});

require_once get_template_directory() . '/inc/tin-tuc.php';
require_once get_template_directory() . '/inc/he-cua.php';

// Gọn đầu trang: bỏ emoji, oembed rác
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_generator');

/** Thông tin chung dùng ở header/footer. */
function winduca_info() {
    return [
        'hotline' => '0947 686 668',
        'tel' => 'tel:0947686668',
        'email' => 'info@winduca.com',
        'dia_chi' => 'Tòa nhà VinaKIN Building, 280A5 Lương Định Của, Bình Trưng, Hồ Chí Minh',
    ];
}

/** Menu chính, giống MENU_CHINH của bản Next.js. */
function winduca_menu() {
    return [
        ['/gioi-thieu/', 'Giới thiệu', [['/gioi-thieu/', 'Câu chuyện thương hiệu'], ['/nang-luc-xuong/', 'Năng lực & Xưởng'], ['/trai-nghiem/', 'Trải nghiệm']]],
        ['/he-cua/', 'Hệ cửa', [['/he-cua/?h=w', 'Cửa sổ'], ['/he-cua/?h=d', 'Cửa đi'], ['/he-cua/?h=s', 'Cửa trượt'], ['/he-cua/?h=l', 'Nâng trượt'], ['/he-cua/?h=f', 'Xếp gấp'], ['/he-cua/?h=v', 'Vách kính']]],
        ['/giai-phap/', 'Giải pháp', [['/giai-phap/biet-thu/', 'Biệt thự'], ['/giai-phap/penthouse/', 'Penthouse'], ['/giai-phap/nha-pho-cao-cap/', 'Nhà phố cao cấp'], ['/giai-phap/khach-san-resort/', 'Khách sạn & Resort'], ['/giai-phap/cong-trinh-dac-thu/', 'Công trình đặc thù']]],
        ['/cong-trinh/', 'Công trình', [['/cong-trinh/', 'WINDUCA Projects'], ['/cong-trinh/#cam-hung', 'Cảm hứng kiến trúc']]],
        ['/hop-tac/', 'Đối tác', [['/hop-tac/#dealer', 'Đại lý'], ['/hop-tac/#contractor', 'Nhà thầu'], ['/hop-tac/#architect', 'Kiến trúc sư'], ['/danh-cho-kts/', 'Thư viện KTS']]],
        ['/tin-tuc/', 'Tin tức', [['/tin-tuc/kien-thuc/', 'Kiến thức'], ['/tin-tuc/hoat-dong/', 'Tin hoạt động'], ['/tin-tuc/cong-trinh/', 'Câu chuyện công trình'], ['/tin-tuc/tai-lieu/', 'Tài liệu & tải về']]],
        ['/chinh-sach/', 'Chính sách', [['/chinh-sach-bao-mat/', 'Bảo mật'], ['/dieu-khoan-su-dung/', 'Điều khoản sử dụng'], ['/chinh-sach-cookie/', 'Cookie'], ['/chinh-sach-bao-hanh/', 'Bảo hành & hậu mãi'], ['/chinh-sach-doi-tac/', 'Đối tác & đại lý']]],
        ['/lien-he/', 'Liên hệ', []],
    ];
}
