<?php
// Nhập 9 bài kiến thức vào WordPress. Chạy cục bộ: chép tệp này và du-lieu/bai-viet.json vào thư mục gốc WordPress,
// mở http://winduca.local/nhap-tin-tuc.php rồi xóa cả hai. Chạy lại được (cập nhật theo slug).
if (!in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true)) { http_response_code(403); exit; }
require __DIR__ . '/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
header('Content-Type: text/plain; charset=utf-8');
wp_set_current_user(1);

$d = json_decode(file_get_contents(__DIR__ . '/bai-viet.json'), true);
$theme = get_template_directory();

// Chuyên mục và chủ đề
$cats = [];
foreach ($d['muc'] as $m) {
    $slug = $m['id'];
    $t = term_exists($slug, 'category');
    if (!$t) $t = wp_insert_term($m['ten'], 'category', ['slug' => $slug, 'description' => $m['mota']]);
    $cats[$slug] = is_array($t) ? (int) $t['term_id'] : (int) $t;
}
$chu_de = ['Công nghệ cửa', 'Vật liệu và kỹ thuật', 'Kiến trúc và thiết kế'];
foreach ($chu_de as $n) if (!term_exists($n, 'chu-de')) wp_insert_term($n, 'chu-de');
$ten_cd = ['Window Technology' => 'Công nghệ cửa', 'Material & Engineering' => 'Vật liệu và kỹ thuật', 'Architecture & Design' => 'Kiến trúc và thiết kế'];

foreach ($d['bai'] as $b) {
    $html = '';
    foreach ($b['noiDung'] as $m) {
        $html .= '<h2>' . esc_html($m['h']) . "</h2>\n";
        foreach ($m['p'] as $p) $html .= '<p>' . esc_html($p) . "</p>\n";
    }
    $exist = get_page_by_path($b['slug'], OBJECT, 'post');
    $arr = [
        'post_type' => 'post', 'post_status' => 'publish', 'post_name' => $b['slug'], 'post_title' => $b['tieuDe'],
        'post_content' => $html, 'post_excerpt' => $b['tomTat'], 'post_date' => $b['ngay'] . ' 09:00:00',
        'post_author' => 1,
    ];
    if ($exist) { $arr['ID'] = $exist->ID; $id = wp_update_post($arr, true); } else { $id = wp_insert_post($arr, true); }
    if (is_wp_error($id)) { echo "LỖI {$b['slug']}: " . $id->get_error_message() . "\n"; continue; }
    wp_set_post_categories($id, [$cats[$b['muc'] ?? 'kien-thuc']]);
    wp_set_object_terms($id, [$ten_cd[$b['chuyenMuc']] ?? $b['chuyenMuc']], 'chu-de');
    update_post_meta($id, 'wd_ket_luan', $b['ketLuan']);
    update_post_meta($id, 'wd_kieu', ($b['kieu'] ?? '') === 'ky-thuat' ? 'ky-thuat' : '');

    // Ảnh đại diện: nạp từ ảnh trong theme vào thư viện media (một lần)
    $nguon = $theme . '/assets' . $b['anh'];
    if (!has_post_thumbnail($id) && file_exists($nguon)) {
        $tmp = wp_tempnam(basename($nguon));
        copy($nguon, $tmp);
        $aid = media_handle_sideload(['name' => basename($nguon), 'tmp_name' => $tmp], $id, $b['tieuDe']);
        if (is_wp_error($aid)) echo "Ảnh lỗi {$b['slug']}: " . $aid->get_error_message() . "\n";
        else set_post_thumbnail($id, $aid);
    } elseif (!file_exists($nguon)) echo "Không thấy ảnh $nguon\n";
    echo "OK {$b['slug']} (#$id)\n";
}

// Trang Chủ và Tin tức, đường dẫn
$ct = get_page_by_path('trang-chu'); $ct = $ct ? $ct->ID : wp_insert_post(['post_type' => 'page', 'post_status' => 'publish', 'post_title' => 'Trang chủ', 'post_name' => 'trang-chu']);
$tt = get_page_by_path('tin-tuc'); $tt = $tt ? $tt->ID : wp_insert_post(['post_type' => 'page', 'post_status' => 'publish', 'post_title' => 'Tin tức', 'post_name' => 'tin-tuc']);
update_option('show_on_front', 'page');
update_option('page_on_front', $ct);
update_option('page_for_posts', $tt);
update_option('category_base', 'chuyen-muc');
update_option('permalink_structure', '/tin-tuc/%postname%/');
foreach (['hello-world', 'chao-moi-nguoi'] as $s) { $x = get_page_by_path($s, OBJECT, 'post'); if ($x) wp_delete_post($x->ID, true); }
flush_rewrite_rules();
echo "Bài đã đăng: " . wp_count_posts('post')->publish . "\n";
