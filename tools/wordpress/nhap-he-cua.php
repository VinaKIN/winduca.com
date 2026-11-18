<?php
// Nhập 115 hệ cửa vào loại bài "he-cua". Chạy cục bộ: chép tệp này và du-lieu/he-cua.json vào thư mục gốc WordPress,
// mở http://winduca.local/nhap-he-cua.php rồi xóa cả hai. Chạy lại được (cập nhật theo wd_h_id).
if (!in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true)) { http_response_code(403); exit; }
require __DIR__ . '/wp-load.php';
header('Content-Type: text/plain; charset=utf-8');
wp_set_current_user(1);
$d = json_decode(file_get_contents(__DIR__ . '/he-cua.json'), true);
$n = 0;
foreach ($d as $r) {
    $ex = get_posts(['post_type' => 'he-cua', 'post_status' => 'any', 'numberposts' => 1, 'meta_key' => 'wd_h_id', 'meta_value' => (string) $r['id']]);
    $arr = ['post_type' => 'he-cua', 'post_status' => 'publish', 'post_title' => $r['ma'], 'menu_order' => $r['id']];
    if ($ex) { $arr['ID'] = $ex[0]->ID; $id = wp_update_post($arr, true); } else { $id = wp_insert_post($arr, true); }
    if (is_wp_error($id)) { echo "LỖI {$r['ma']}: " . $id->get_error_message() . "\n"; continue; }
    $m = [
        'id' => (string) $r['id'], 'hang' => $r['hang'], 'loai' => $r['loai'], 'he' => $r['he'], 'ket_cau' => $r['ketCau'],
        'tags' => implode(',', $r['tags']), 'u' => $r['u'], 'kin_khi' => $r['kinKhi'], 'cach_am' => $r['cachAm'], 'kin_nuoc' => $r['kinNuoc'],
        'chiu_gio' => $r['chiuGio'], 'chong_trom' => $r['chongTrom'], 'ghi_chu' => $r['ghiChu'], 'them' => $r['them'] ? '1' : '0',
        'anh_c' => implode("\n", $r['anh']['c']), 'anh_d' => implode("\n", $r['anh']['d']),
        'ctr' => $r['ctr'] ? wp_json_encode($r['ctr'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : '',
    ];
    foreach ($m as $k => $v) update_post_meta($id, 'wd_h_' . $k, wp_slash($v));
    $n++;
}
$p = get_page_by_path('he-cua');
if (!$p) wp_insert_post(['post_type' => 'page', 'post_status' => 'publish', 'post_title' => 'Hệ cửa', 'post_name' => 'he-cua']);
delete_transient('wd_he_cua_json');
flush_rewrite_rules(true);
echo "Đã nhập $n hệ. Tổng: " . wp_count_posts('he-cua')->publish . "\n";
