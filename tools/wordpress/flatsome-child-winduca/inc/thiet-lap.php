<?php
/** Thiết lập Flatsome cho WINDUCA: các khóa theme_mod dùng đúng tên trong preset của Flatsome. */
if (!defined('ABSPATH')) { exit; }

function winduca_thiet_lap_mac_dinh() {
    $logo = get_stylesheet_directory_uri() . '/assets/brand/WINDUCA-ngang-am-ban-trong.svg';
    return array(
        'color_primary'          => '#e31937',
        'color_secondary'        => '#231f20',
        'color_success'          => '#0a7a3d',
        'type_headings'          => array('font-family' => 'Roboto', 'variant' => '300'),
        'type_texts'             => array('font-family' => 'Roboto', 'variant' => 'regular'),
        'type_nav'               => array('font-family' => 'Roboto', 'variant' => '500'),
        'type_alt'               => array('font-family' => 'Roboto'),
        'site_logo'              => $logo,
        'logo_width'             => '180',
        'header_height'          => '90',
        'header_height_sticky'   => '64',
        'header_color'           => 'dark',
        'header_bg'              => '#231f20',
        'header_width'           => 'container',
        'header_elements_left'   => array('html'),
        'topbar_left'            => '<a class="wd-nut-tron" href="tel:0947686668" aria-label="Gọi hotline 0947 686 668"><i class="icon-phone"></i></a><a class="wd-nut-tron" href="mailto:info@winduca.com" aria-label="Gửi email"><i class="icon-envelop"></i></a>',
        'header_elements_right'  => array('nav'),
        'topbar_show'            => '0',
        'mobile_sidebar'         => array('nav'),
        'footer_1'               => '0',
        'footer_2'               => '0',
        'footer_bottom_text'     => 'light',
        'footer_left_text'       => '© ' . date('Y') . ' WINDUCA. Cửa nhôm kiến trúc cao cấp.',
        'html_custom_css'        => '',
    );
}

function winduca_ap_dung_thiet_lap() {
    foreach (winduca_thiet_lap_mac_dinh() as $k => $v) {
        set_theme_mod($k, $v);
    }
}
