<?php
/**
 * Hệ cửa: loại bài "he-cua" (115 hệ), hộp nhập liệu cho nhóm biên tập và hàm trả dữ liệu cho trang /he-cua/.
 * Loại bài không có trang riêng (không công khai); trang /he-cua/ hiển thị tất cả bằng JavaScript.
 */
if (!defined('ABSPATH')) exit;

add_action('init', function () {
    register_post_type('he-cua', [
        'labels' => ['name' => 'Hệ cửa', 'singular_name' => 'Hệ cửa', 'add_new_item' => 'Thêm hệ cửa', 'edit_item' => 'Sửa hệ cửa', 'menu_name' => 'Hệ cửa'],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-admin-multisite',
        'menu_position' => 21,
        'supports' => ['title'],
        'has_archive' => false,
        'rewrite' => false,
    ]);
});

/** Các trường: khóa => [nhãn, kiểu]. Kiểu: text | select:... | area. */
function winduca_he_cua_truong() {
    return [
        'hang' => ['Hãng (romadio, civro, ponzio)', 'text'],
        'loai' => ['Loại (mô tả ngắn)', 'text'],
        'he' => ['Hệ thống: w cửa sổ, d cửa đi, s trượt, l nâng trượt, f xếp gấp, v vách kính (ghép được)', 'text'],
        'ket_cau' => ['Kết cấu: t có cầu nhiệt, n không cầu nhiệt, tn cả hai, để trống nếu chưa rõ', 'text'],
        'tags' => ['Nhãn (cách nhau dấu phẩy): cn cách nhiệt cao, an an ninh cao, de dễ tiếp cận, sm thông minh', 'text'],
        'u' => ['U-value (W/m²K)', 'text'],
        'kin_khi' => ['Kín khí', 'text'],
        'cach_am' => ['Cách âm', 'text'],
        'kin_nuoc' => ['Kín nước', 'text'],
        'chiu_gio' => ['Chịu gió', 'text'],
        'chong_trom' => ['Chống đột nhập', 'text'],
        'ghi_chu' => ['Ghi chú', 'text'],
        'them' => ['Số liệu lấy từ tài liệu hãng cung cấp (1 = có)', 'text'],
        'anh_c' => ['Ảnh mẫu góc 3D (mỗi dòng một đường dẫn, tính từ assets của theme)', 'area'],
        'anh_d' => ['Bản vẽ 2D (mỗi dòng một đường dẫn)', 'area'],
        'ctr' => ['Ảnh công trình (JSON: danh sách {src, chuThich, nguon, tenNguon, dungMa})', 'area'],
    ];
}

add_action('add_meta_boxes', function () {
    add_meta_box('wd_he_cua', 'Thông số hệ cửa', function ($p) {
        wp_nonce_field('wd_he_cua', 'wd_he_cua_n');
        echo '<p style="color:#666">Số liệu chỉ để tham khảo, do hãng công bố. Chưa có số liệu thì để trống, trang sẽ ghi "Hãng chưa công bố".</p>';
        foreach (winduca_he_cua_truong() as $k => $t) {
            $v = get_post_meta($p->ID, 'wd_h_' . $k, true);
            echo '<p><label><strong>' . esc_html($t[0]) . '</strong></label><br>';
            if ($t[1] === 'area') echo '<textarea name="wd_h_' . esc_attr($k) . '" rows="4" style="width:100%;font-family:monospace">' . esc_textarea($v) . '</textarea>';
            else echo '<input type="text" name="wd_h_' . esc_attr($k) . '" value="' . esc_attr($v) . '" style="width:100%">';
            echo '</p>';
        }
    }, 'he-cua', 'normal', 'high');
});
add_action('save_post_he-cua', function ($id) {
    if (!isset($_POST['wd_he_cua_n']) || !wp_verify_nonce($_POST['wd_he_cua_n'], 'wd_he_cua') || !current_user_can('edit_post', $id)) return;
    foreach (winduca_he_cua_truong() as $k => $t) {
        $v = wp_unslash($_POST['wd_h_' . $k] ?? '');
        update_post_meta($id, 'wd_h_' . $k, $t[1] === 'area' ? sanitize_textarea_field($v) : sanitize_text_field($v));
    }
    delete_transient('wd_he_cua_json');
});
add_action('deleted_post', fn() => delete_transient('wd_he_cua_json'));

function winduca_dong_anh($s) {
    return array_values(array_filter(array_map('trim', preg_split('/\R/', (string) $s))));
}

/** Danh sách hệ cửa dạng mảng, cùng cấu trúc với HeCua của bản Next.js. */
function winduca_he_cua_du_lieu() {
    $cache = get_transient('wd_he_cua_json');
    if (is_array($cache)) return $cache;
    $q = get_posts(['post_type' => 'he-cua', 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => 'menu_order ID', 'order' => 'ASC']);
    $out = [];
    foreach ($q as $p) {
        $m = fn($k) => (string) get_post_meta($p->ID, 'wd_h_' . $k, true);
        $ctr = json_decode($m('ctr'), true);
        $out[] = [
            'id' => (int) $m('id') ?: count($out),
            'hang' => $m('hang'),
            'ma' => $p->post_title,
            'loai' => $m('loai'),
            'he' => $m('he'),
            'ketCau' => $m('ket_cau'),
            'tags' => array_values(array_filter(array_map('trim', explode(',', $m('tags'))))),
            'u' => $m('u'), 'kinKhi' => $m('kin_khi'), 'cachAm' => $m('cach_am'), 'kinNuoc' => $m('kin_nuoc'),
            'chiuGio' => $m('chiu_gio'), 'chongTrom' => $m('chong_trom'), 'ghiChu' => $m('ghi_chu'),
            'anh' => ['c' => winduca_dong_anh($m('anh_c')), 'd' => winduca_dong_anh($m('anh_d'))],
            'them' => $m('them') === '1',
            'ctr' => is_array($ctr) ? $ctr : [],
        ];
    }
    usort($out, fn($a, $b) => $a['id'] <=> $b['id']);
    set_transient('wd_he_cua_json', $out, DAY_IN_SECONDS);
    return $out;
}
