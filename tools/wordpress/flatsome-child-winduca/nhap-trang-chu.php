<?php
/**
 * Nhập Trang chủ UX Builder vào WordPress (chạy bằng WP-CLI trên site có Flatsome và theme con này đang bật):
 *   wp eval-file wp-content/themes/winduca-flatsome-child/nhap-trang-chu.php
 * Tạo hoặc cập nhật trang "Trang chủ", đặt làm trang chủ, tạo menu chính, áp dụng thiết lập theme.
 */
if (!defined('ABSPATH')) { exit; }

$tep = get_stylesheet_directory() . '/du-lieu/trang-chu.txt';
$nd = file_get_contents($tep);
$goc = get_stylesheet_directory_uri() . '/assets/images/';
$nd = preg_replace_callback('/\{\{ANH:([^}]+)\}\}/', function ($m) use ($goc) { return $goc . $m[1]; }, $nd);

$trang = get_page_by_path('trang-chu');
$mang = array('post_title' => 'Trang chủ', 'post_name' => 'trang-chu', 'post_type' => 'page', 'post_status' => 'publish', 'post_content' => $nd);
if ($trang) { $mang['ID'] = $trang->ID; $id = wp_update_post($mang); } else { $id = wp_insert_post($mang); }
update_post_meta($id, '_wp_page_template', 'page-blank.php');
update_option('show_on_front', 'page');
update_option('page_on_front', $id);

// Menu chính
$ten = 'Menu chính';
$menu = wp_get_nav_menu_object($ten);
$mid = $menu ? $menu->term_id : wp_create_nav_menu($ten);
$cu = wp_get_nav_menu_items($mid);
if ($cu) { foreach ($cu as $it) { wp_delete_post($it->ID, true); } }
$muc = array('Giới thiệu' => '/gioi-thieu/', 'Hệ cửa' => '/he-cua/', 'Giải pháp' => '/giai-phap/', 'Công trình' => '/cong-trinh/', 'Hợp tác' => '/hop-tac/', 'Tin tức' => '/tin-tuc/');
foreach ($muc as $t => $u) {
    wp_update_nav_menu_item($mid, 0, array('menu-item-title' => $t, 'menu-item-url' => home_url($u), 'menu-item-status' => 'publish', 'menu-item-type' => 'custom'));
}
$vt = get_theme_mod('nav_menu_locations', array());
$vt['primary'] = $mid;
set_theme_mod('nav_menu_locations', $vt);

if (function_exists('winduca_ap_dung_thiet_lap')) { winduca_ap_dung_thiet_lap(); }
update_option('blogname', 'WINDUCA');
update_option('blogdescription', 'Cửa nhôm kiến trúc cao cấp');
flush_rewrite_rules();
echo "Đã nhập Trang chủ (ID $id) và menu chính.\n";
