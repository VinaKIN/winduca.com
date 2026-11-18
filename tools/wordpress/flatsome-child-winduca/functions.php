<?php
/**
 * Theme con Flatsome cho WINDUCA.
 * Cấu trúc giống flatsome-child của Winboss: functions.php + style.css + assets, nội dung dựng bằng UX Builder.
 */
if (!defined('ABSPATH')) { exit; }

define('WD_VER', '0.1.0');

remove_action('wp_head', 'wp_generator');

// Trình soạn thảo cổ điển như Winboss (UX Builder không cần Gutenberg)
add_filter('use_block_editor_for_post', '__return_false', 10);
add_filter('gutenberg_use_widgets_block_editor', '__return_false');
add_filter('use_widgets_block_editor', '__return_false');

// CSS, phông Roboto
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('winduca-roboto', 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap&subset=vietnamese', array(), null);
    wp_enqueue_style('winduca-child', get_stylesheet_uri(), array('flatsome-style'), WD_VER);
}, 20);

// Shortcode [site_menu name="..."] (giống Winboss)
add_shortcode('site_menu', function ($atts) {
    $a = shortcode_atts(array('name' => ''), $atts);
    return wp_nav_menu(array('menu' => $a['name'], 'echo' => false));
});

// Shortcode đường dẫn tới tệp trong theme: [wd_anh f="hero.jpg"]
add_shortcode('wd_anh', function ($atts) {
    $a = shortcode_atts(array('f' => ''), $atts);
    return esc_url(get_stylesheet_directory_uri() . '/assets/images/' . ltrim($a['f'], '/'));
});

// Nạp thiết lập mặc định (màu, phông, header) khi kích hoạt theme
require_once get_stylesheet_directory() . '/inc/thiet-lap.php';
require_once get_stylesheet_directory() . '/inc/he-cua.php';
require_once get_stylesheet_directory() . '/inc/cai-dat.php';
add_action('after_switch_theme', 'winduca_ap_dung_thiet_lap');
