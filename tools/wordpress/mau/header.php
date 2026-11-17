<?php
if (!defined('ABSPATH')) exit;
$u = get_template_directory_uri();
$i = winduca_info();
$la_trang_chu = is_front_page();
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="eBoweq_variable">
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#231f20">
<?php wp_head(); ?>
</head>
<body <?php body_class('min-h-screen flex flex-col'); ?>>
<?php wp_body_open(); ?>
<a href="#noi-dung" class="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[70] focus:rounded focus:bg-white focus:px-3 focus:py-2">Bỏ qua, tới nội dung</a>

<header class="absolute inset-x-0 top-0 z-50 <?php echo $la_trang_chu ? 'bg-transparent' : 'bg-than-chi'; ?>">
  <div class="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:h-[90px] md:px-10">
    <div class="flex items-center gap-2 md:gap-4">
      <a href="<?php echo esc_attr($i['tel']); ?>" aria-label="Gọi hotline <?php echo esc_attr($i['hotline']); ?>" class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent transition-colors hover:bg-accent hover:text-white md:h-14 md:w-14">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>
      </a>
      <a href="<?php echo esc_url(home_url('/lien-he/')); ?>" aria-label="Gửi liên hệ" class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent transition-colors hover:bg-accent hover:text-white md:h-14 md:w-14">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
      </a>
    </div>
    <div class="absolute left-1/2 -translate-x-1/2">
      <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="WINDUCA — trang chủ" class="flex min-h-11 shrink-0 items-center py-1">
        <img alt="WINDUCA" width="677" height="102" class="h-5 w-auto md:h-9" src="<?php echo esc_url($u); ?>/assets/brand/WINDUCA-ngang-am-ban-trong.svg">
      </a>
    </div>
    <button type="button" class="flex h-12 w-12 flex-col items-center justify-center gap-[7px]" aria-expanded="false" aria-controls="menu-toan-man-hinh" aria-label="Mở menu" data-mo-menu>
      <span class="block h-[2px] w-8 bg-white"></span><span class="block h-[2px] w-8 bg-white"></span><span class="block h-[2px] w-8 bg-white"></span>
    </button>
  </div>
</header>

<div id="menu-toan-man-hinh" role="dialog" aria-modal="true" aria-label="Menu" hidden class="fixed inset-0 z-[60] overflow-y-auto bg-white px-3 py-3 md:px-6 md:py-5">
  <div class="mx-auto flex min-h-full max-w-[1440px] flex-col rounded-[28px] bg-nga p-2 md:rounded-[40px] md:p-2.5">
    <div class="flex h-16 items-center justify-between pl-5 pr-1 md:h-[72px] md:pl-8 md:pr-2">
      <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="WINDUCA — trang chủ" class="flex min-h-11 shrink-0 items-center py-1">
        <img alt="WINDUCA" width="677" height="102" class="h-6 w-auto md:h-7" src="<?php echo esc_url($u); ?>/assets/brand/WINDUCA-ngang-mau-trong.svg">
      </a>
      <button type="button" aria-label="Đóng menu" data-dong-menu class="group flex items-center gap-2 rounded-full bg-than-chi py-1 pl-6 pr-1 text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-accent">
        Đóng
        <span class="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </span>
      </button>
    </div>
    <div class="grid flex-1 gap-2 md:gap-2.5 lg:grid-cols-[1.15fr_1fr]">
      <nav aria-label="Điều hướng chính" class="flex flex-col justify-center rounded-[22px] bg-white px-6 py-6 md:rounded-[32px] md:px-14 md:py-10">
        <ul>
          <?php foreach (winduca_menu() as $k => $m) : $con = $m[2]; ?>
            <li class="py-3 md:py-4 <?php echo $k > 0 ? 'border-t border-inox/60' : ''; ?>">
              <div class="flex items-center gap-5 text-than-chi">
                <span class="w-6 text-xs font-semibold tracking-[0.12em] text-accent"><?php echo sprintf('%02d', $k + 1); ?></span>
                <a href="<?php echo esc_url(home_url($m[0])); ?>" class="tieu-de text-[1.15rem] font-semibold uppercase tracking-[0.02em] transition-colors hover:text-accent md:text-[1.45rem]"><?php echo esc_html($m[1]); ?></a>
                <?php if ($con) : ?>
                  <button type="button" data-muc-con="muc-con-<?php echo $k; ?>" aria-expanded="false" aria-controls="muc-con-<?php echo $k; ?>" aria-label="Mở mục <?php echo esc_attr($m[1]); ?>" class="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-accent transition-colors hover:bg-accent/10">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14" class="origin-center transition-transform duration-300" data-dau-cong/></svg>
                  </button>
                <?php endif; ?>
              </div>
              <?php if ($con) : ?>
                <div id="muc-con-<?php echo $k; ?>" class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300" data-hop-con>
                  <ul class="flex flex-wrap gap-x-6 gap-y-2 overflow-hidden pl-11 pt-0 invisible" aria-hidden="true">
                    <?php foreach ($con as $c) : ?>
                      <li class="pt-3"><a href="<?php echo esc_url(home_url($c[0])); ?>" tabindex="-1" class="flex items-center gap-2.5 text-sm text-than-chi/65 transition-colors hover:text-accent"><span><?php echo esc_html($c[1]); ?></span></a></li>
                    <?php endforeach; ?>
                  </ul>
                </div>
              <?php endif; ?>
            </li>
          <?php endforeach; ?>
        </ul>
      </nav>
      <div class="relative min-h-[420px] overflow-hidden rounded-[22px] bg-than-chi md:rounded-[32px]">
        <img alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover" src="<?php echo esc_url($u); ?>/assets/images/hero.jpg">
        <div class="absolute inset-0 bg-than-chi/20" aria-hidden="true"></div>
        <div class="absolute inset-x-3 bottom-3 rounded-[22px] bg-nga p-5 md:inset-x-4 md:bottom-4 md:rounded-[26px] md:p-6">
          <p class="tieu-de text-xl font-semibold text-than-chi">Liên hệ</p>
          <ul class="mt-4 space-y-3 text-[0.9rem] text-than-chi/85">
            <li>Địa chỉ: <?php echo esc_html($i['dia_chi']); ?></li>
            <li><a href="<?php echo esc_attr($i['tel']); ?>" class="font-medium hover:underline">Hotline: <?php echo esc_html($i['hotline']); ?></a></li>
            <li><a href="mailto:<?php echo esc_attr($i['email']); ?>" class="hover:underline">Email: <?php echo esc_html($i['email']); ?></a></li>
          </ul>
          <a href="<?php echo esc_url(home_url('/trai-nghiem/')); ?>" class="mt-5 inline-flex w-full items-center justify-between gap-4 rounded-full bg-than-chi py-1.5 pl-6 pr-1.5 text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-accent sm:w-auto">Đăng ký trải nghiệm
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
