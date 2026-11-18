<?php
/**
 * Công cụ → WINDUCA: nhập trang, hệ cửa, tin tức và áp dụng thiết lập bằng nút bấm trong wp-admin (không cần WP-CLI).
 * Mọi bước chạy lại được: cập nhật theo slug hoặc theo mã dữ liệu, không nhân đôi.
 */
if (!defined('ABSPATH')) { exit; }

add_action('admin_menu', function () {
    add_management_page('WINDUCA', 'WINDUCA', 'manage_options', 'winduca-cai-dat', 'winduca_trang_cai_dat');
});

function winduca_thay_anh($nd) {
    $goc = get_stylesheet_directory_uri() . '/assets/images/';
    return preg_replace_callback('/\{\{ANH:([^}]+)\}\}/', function ($m) use ($goc) { return $goc . $m[1]; }, $nd);
}

/** Biểu mẫu Contact Form 7 cho trang Liên hệ (nếu plugin đã bật). Trả về shortcode hoặc HTML dự phòng. */
function winduca_bieu_mau_lien_he() {
    if (!function_exists('wpcf7_save_contact_form') || !class_exists('WPCF7_ContactForm')) {
        return '<p>Gửi yêu cầu qua email <a href="mailto:info@winduca.com">info@winduca.com</a> hoặc gọi <a href="tel:0947686668">0947 686 668</a>. (Cài plugin Contact Form 7 rồi chạy lại bước nhập trang để có biểu mẫu.)</p>';
    }
    $id = (int) get_option('winduca_cf7_id2');
    if (!$id || !get_post($id)) {
        $mau = "<label>Bạn cần gì [select* loai \"Tư vấn sản phẩm\" \"Nhận hộp mẫu góc nhôm\" \"Đặt lịch showroom\" \"Gửi bản vẽ để tư vấn\" \"Hợp tác đại lý, nhà thầu\" \"Hợp tác kiến trúc sư\"]</label>
<label>Họ và tên [text* ten autocomplete:name]</label>\n<label>Số điện thoại / Zalo [tel* sdt autocomplete:tel]</label>\n<label>Email (không bắt buộc) [email email autocomplete:email]</label>\n<label>Nội dung cần tư vấn [textarea noidung]</label>\n[acceptance dongy] Tôi đồng ý để WINDUCA liên hệ tư vấn theo Chính sách bảo mật. [/acceptance]\n[submit \"Gửi yêu cầu\"]";
        $f = WPCF7_ContactForm::get_template();
        $f->set_title('Liên hệ WINDUCA');
        $f->set_properties(array('form' => $mau, 'mail' => array_merge($f->prop('mail'), array('subject' => 'WINDUCA: yêu cầu liên hệ mới', 'body' => "Họ tên: [ten]\nSĐT: [sdt]\nEmail: [email]\nNội dung: [noidung]"))));
        $f->save();
        $id = $f->id();
        update_option('winduca_cf7_id2', $id);
    }
    return '[contact-form-7 id="' . $id . '" title="Liên hệ WINDUCA"]';
}

function winduca_nhap_trang() {
    $dir = get_stylesheet_directory() . '/du-lieu/trang/';
    $ds = json_decode(file_get_contents($dir . '_danh-sach.json'), true);
    $n = 0;
    $them = array(array('slug' => 'he-cua', 'tieuDe' => 'Hệ cửa'));
    foreach (array_merge($ds, $them) as $t) {
        if ($t['slug'] === 'he-cua') {
            $nd = '[ux_banner height="300px" bg_color="#231f20" class="wd-hero"][text_box text_align="left" position_x="5" position_y="50" width="70"]<p>Hệ cửa nhôm kính · Romadio · Civro · Ponzio</p><h1>Chọn hệ cửa theo thông số kỹ thuật</h1><p>Lọc theo hãng, kết cấu, chức năng và hệ thống. Mỗi hệ hiển thị chỉ số do hãng công bố để so sánh nhanh.</p>[/text_box][/ux_banner]' . "\n" . '[section padding="40px"][row][col span="12"][wd_he_cua][/col][/row][/section]';
        } else {
            $nd = winduca_thay_anh(file_get_contents($dir . $t['slug'] . '.txt'));
            $tieu_form = array('lien-he' => 'Gửi yêu cầu', 'trai-nghiem' => 'Đăng ký nhận hộp mẫu hoặc đặt lịch showroom', 'danh-cho-kts' => 'Gửi bản vẽ để tư vấn', 'hop-tac' => 'Đăng ký hợp tác');
            if (isset($tieu_form[$t['slug']])) {
                $nd .= "
[section bg_color=\"#f5f3ee\" padding=\"50px\"][row][col span=\"8\" span__sm=\"12\"]<h2>" . $tieu_form[$t['slug']] . '</h2>' . winduca_bieu_mau_lien_he() . '[/col][/row][/section]';
            }
        }
        $p = get_page_by_path($t['slug']);
        $mang = array('post_title' => $t['tieuDe'], 'post_name' => $t['slug'], 'post_type' => 'page', 'post_status' => 'publish', 'post_content' => $nd);
        if ($p) { $mang['ID'] = $p->ID; $id = wp_update_post($mang); } else { $id = wp_insert_post($mang); }
        update_post_meta($id, '_wp_page_template', 'page-blank.php');
        $n++;
    }
    // Trang con của Giải pháp (8 loại công trình): /giai-phap/<slug>/
    $cha = get_page_by_path('giai-phap');
    $dc = get_stylesheet_directory() . '/du-lieu/giai-phap/';
    if ($cha && file_exists($dc . '_danh-sach.json')) {
        foreach (json_decode(file_get_contents($dc . '_danh-sach.json'), true) as $t) {
            $nd = winduca_thay_anh(file_get_contents($dc . $t['slug'] . '.txt'));
            $p = get_page_by_path('giai-phap/' . $t['slug']);
            $mang = array('post_title' => $t['tieuDe'], 'post_name' => $t['slug'], 'post_parent' => $cha->ID, 'post_type' => 'page', 'post_status' => 'publish', 'post_content' => $nd);
            if ($p) { $mang['ID'] = $p->ID; $id = wp_update_post($mang); } else { $id = wp_insert_post($mang); }
            update_post_meta($id, '_wp_page_template', 'page-blank.php');
            $n++;
        }
    }
    // Trang chủ
    $nd = winduca_thay_anh(file_get_contents(get_stylesheet_directory() . '/du-lieu/trang-chu.txt'));
    $p = get_page_by_path('trang-chu');
    $mang = array('post_title' => 'Trang chủ', 'post_name' => 'trang-chu', 'post_type' => 'page', 'post_status' => 'publish', 'post_content' => $nd);
    if ($p) { $mang['ID'] = $p->ID; $id = wp_update_post($mang); } else { $id = wp_insert_post($mang); }
    update_post_meta($id, '_wp_page_template', 'page-blank.php');
    update_option('show_on_front', 'page');
    update_option('page_on_front', $id);
    return $n + 1;
}

function winduca_nhap_he_cua() {
    $d = json_decode(file_get_contents(get_stylesheet_directory() . '/du-lieu/he-cua.json'), true);
    $n = 0;
    foreach ($d as $r) {
        $ex = get_posts(array('post_type' => 'he-cua', 'post_status' => 'any', 'numberposts' => 1, 'meta_key' => 'wd_h_id', 'meta_value' => (string) $r['id']));
        $arr = array('post_type' => 'he-cua', 'post_status' => 'publish', 'post_title' => $r['ma'], 'menu_order' => $r['id']);
        if ($ex) { $arr['ID'] = $ex[0]->ID; $id = wp_update_post($arr, true); } else { $id = wp_insert_post($arr, true); }
        if (is_wp_error($id)) { continue; }
        $m = array(
            'id' => (string) $r['id'], 'hang' => $r['hang'], 'loai' => $r['loai'], 'he' => $r['he'], 'ket_cau' => $r['ketCau'],
            'tags' => implode(',', $r['tags']), 'u' => $r['u'], 'kin_khi' => $r['kinKhi'], 'cach_am' => $r['cachAm'], 'kin_nuoc' => $r['kinNuoc'],
            'chiu_gio' => $r['chiuGio'], 'chong_trom' => $r['chongTrom'], 'ghi_chu' => $r['ghiChu'], 'them' => $r['them'] ? '1' : '0',
            'anh_c' => implode("\n", $r['anh']['c']), 'anh_d' => implode("\n", $r['anh']['d']),
        );
        foreach ($m as $k => $v) { update_post_meta($id, 'wd_h_' . $k, wp_slash($v)); }
        $n++;
    }
    delete_transient('wd_he_cua_json');
    return $n;
}

function winduca_html_bai($b) {
    $h = '';
    foreach ($b['noiDung'] as $muc) {
        if (!empty($muc['h'])) { $h .= '<h2>' . esc_html($muc['h']) . "</h2>\n"; }
        foreach ((isset($muc['p']) ? $muc['p'] : array()) as $p) { $h .= '<p>' . esc_html($p) . "</p>\n"; }
    }
    if (!empty($b['ketLuan'])) {
        $kl = is_array($b['ketLuan']) ? implode(' ', $b['ketLuan']) : $b['ketLuan'];
        $h .= '<h2>Tóm lại</h2><p>' . esc_html($kl) . '</p>';
    }
    return $h;
}

function winduca_nhap_tin_tuc() {
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';
    $d = json_decode(file_get_contents(get_stylesheet_directory() . '/du-lieu/bai-viet.json'), true);
    $n = 0;
    foreach ($d['bai'] as $b) {
        $cm = wp_insert_term($b['chuyenMuc'], 'category');
        $cid = is_wp_error($cm) ? (int) $cm->get_error_data() : (int) $cm['term_id'];
        $ex = get_page_by_path($b['slug'], OBJECT, 'post');
        $mang = array('post_title' => $b['tieuDe'], 'post_name' => $b['slug'], 'post_type' => 'post', 'post_status' => 'publish', 'post_excerpt' => $b['tomTat'],
            'post_content' => winduca_html_bai($b), 'post_date' => $b['ngay'] . ' 08:00:00', 'post_category' => $cid ? array($cid) : array());
        if ($ex) { $mang['ID'] = $ex->ID; $id = wp_update_post($mang); } else { $id = wp_insert_post($mang); }
        if ($id && !has_post_thumbnail($id)) {
            $tep = get_stylesheet_directory() . '/assets' . $b['anh'];
            if (is_file($tep)) {
                $tam = wp_tempnam(basename($tep));
                copy($tep, $tam);
                $att = media_handle_sideload(array('name' => basename($tep), 'tmp_name' => $tam), $id);
                if (!is_wp_error($att)) { set_post_thumbnail($id, $att); }
            }
        }
        $n++;
    }
    return $n;
}

function winduca_thiet_lap_menu() {
    $ten = 'Menu chính';
    $menu = wp_get_nav_menu_object($ten);
    $mid = $menu ? $menu->term_id : wp_create_nav_menu($ten);
    $cu = wp_get_nav_menu_items($mid);
    if ($cu) { foreach ($cu as $it) { wp_delete_post($it->ID, true); } }
    $muc = array('Giới thiệu' => 'gioi-thieu', 'Hệ cửa' => 'he-cua', 'Giải pháp' => 'giai-phap', 'Công trình' => 'cong-trinh', 'Hợp tác' => 'hop-tac', 'Tin tức' => 'tin-tuc');
    foreach ($muc as $t => $slug) {
        $p = get_page_by_path($slug);
        $url = $slug === 'tin-tuc' ? home_url('/category/architecture-design/') : home_url('/' . $slug . '/');
        if ($slug === 'tin-tuc') {
            $pb = get_option('page_for_posts');
            $url = $pb ? get_permalink($pb) : home_url('/?post_type=post');
        }
        wp_update_nav_menu_item($mid, 0, array('menu-item-title' => $t, 'menu-item-url' => $p ? get_permalink($p) : $url, 'menu-item-status' => 'publish', 'menu-item-type' => 'custom'));
    }
    $vt = get_theme_mod('nav_menu_locations', array());
    $vt['primary'] = $mid;
    set_theme_mod('nav_menu_locations', $vt);
}

function winduca_hoan_tat() {
    winduca_ap_dung_thiet_lap();
    update_option('blogname', 'WINDUCA');
    update_option('blogdescription', 'Cửa nhôm kiến trúc cao cấp');
    // Trang "Tin tức" làm trang bài viết
    $pb = get_page_by_path('tin-tuc');
    if (!$pb) { $pid = wp_insert_post(array('post_title' => 'Tin tức', 'post_name' => 'tin-tuc', 'post_type' => 'page', 'post_status' => 'publish')); } else { $pid = $pb->ID; }
    update_option('page_for_posts', $pid);
    winduca_thiet_lap_menu();
    flush_rewrite_rules();
}

function winduca_trang_cai_dat() {
    if (!current_user_can('manage_options')) { return; }
    echo '<div class="wrap"><h1>WINDUCA: cài đặt nội dung</h1>';
    $hd = isset($_POST['wd_hd']) ? sanitize_key($_POST['wd_hd']) : '';
    if ($hd && check_admin_referer('winduca_cai_dat')) {
        $kq = array();
        if (in_array($hd, array('trang', 'tat-ca'), true)) { $kq[] = 'Đã nhập ' . winduca_nhap_trang() . ' trang.'; }
        if (in_array($hd, array('he-cua', 'tat-ca'), true)) { $kq[] = 'Đã nhập ' . winduca_nhap_he_cua() . ' hệ cửa.'; }
        if (in_array($hd, array('tin-tuc', 'tat-ca'), true)) { $kq[] = 'Đã nhập ' . winduca_nhap_tin_tuc() . ' bài viết.'; }
        if (in_array($hd, array('thiet-lap', 'tat-ca'), true)) { winduca_hoan_tat(); $kq[] = 'Đã áp dụng thiết lập, menu chính và trang chủ.'; }
        foreach ($kq as $k) { echo '<div class="notice notice-success"><p>' . esc_html($k) . '</p></div>'; }
    }
    echo '<p>Chạy theo thứ tự "Làm tất cả" lần đầu. Các bước chạy lại được, không nhân đôi nội dung. Cần bật theme Flatsome và theme con này, nên cài sẵn Contact Form 7.</p>';
    echo '<form method="post">';
    wp_nonce_field('winduca_cai_dat');
    foreach (array('tat-ca' => 'Làm tất cả (khuyến nghị)', 'trang' => '1. Nhập trang (16 trang, kể cả Trang chủ, Hệ cửa)', 'he-cua' => '2. Nhập 115 hệ cửa', 'tin-tuc' => '3. Nhập 9 bài viết', 'thiet-lap' => '4. Áp dụng thiết lập, menu, trang chủ') as $k => $t) {
        echo '<p><button class="button ' . ($k === 'tat-ca' ? 'button-primary' : '') . '" name="wd_hd" value="' . esc_attr($k) . '">' . esc_html($t) . '</button></p>';
    }
    echo '</form></div>';
}
