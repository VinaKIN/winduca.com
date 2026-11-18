<?php
/** Trang /he-cua/: danh sách 115 hệ cửa (dữ liệu từ loại bài "Hệ cửa", hiển thị bằng assets/js/he-cua.js). */
if (!defined('ABSPATH')) exit;
get_header();
$du = winduca_he_cua_du_lieu();
$i = winduca_info();
$u = get_template_directory_uri();
$tong = count($du);
$co3d = count(array_filter($du, fn($r) => !empty($r['anh']['c'])));
$hangs = count(array_unique(array_column($du, 'hang')));
$nhan = fn($s, $c = 'dd') => $s;
?>
<main id="noi-dung" tabindex="-1" class="flex-1 outline-none">
  <section class="hero-gradient relative overflow-hidden text-white">
    <div class="hero-phu absolute inset-0" aria-hidden="true"></div>
    <div class="luoi-ban-ve-toi pointer-events-none absolute inset-0" aria-hidden="true"></div>
    <div class="hero-duong-sang pointer-events-none absolute inset-x-0 bottom-0 h-px" aria-hidden="true"></div>
    <div class="mx-auto max-w-[1440px] px-5 md:px-10 relative pb-10 pt-28 md:pb-12 md:pt-36">
      <div class="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p class="nhan-muc text-accent">Hệ cửa nhôm kính · Romadio · Civro · Ponzio</p>
          <h1 class="mt-3 max-w-3xl text-[clamp(1.875rem,3.6vw,3.25rem)] font-bold leading-[1.15] [text-wrap:balance]">Chọn hệ cửa theo thông số kỹ thuật</h1>
          <p class="mt-4 max-w-xl text-base font-light leading-relaxed text-white/80 md:text-lg">Lọc theo hãng, kết cấu, chức năng và hệ thống. Mỗi hệ hiển thị chỉ số do hãng công bố để so sánh nhanh.</p>
          <dl class="mt-7 flex flex-wrap gap-x-9 gap-y-4 border-t border-white/15 pt-6">
            <div><dd class="text-3xl font-light tabular-nums md:text-4xl"><?php echo (int) $tong; ?></dd><dt class="mt-1 text-[12px] font-medium uppercase tracking-[0.16em] text-white/60">hệ cửa</dt></div>
            <div><dd class="text-3xl font-light tabular-nums md:text-4xl"><?php echo (int) $hangs; ?></dd><dt class="mt-1 text-[12px] font-medium uppercase tracking-[0.16em] text-white/60">hãng</dt></div>
            <div><dd class="text-3xl font-light tabular-nums md:text-4xl"><?php echo (int) $co3d; ?></dd><dt class="mt-1 text-[12px] font-medium uppercase tracking-[0.16em] text-white/60">hệ có mẫu góc 3D</dt></div>
          </dl>
        </div>
        <div class="relative mx-auto hidden h-[380px] w-full max-w-[600px] select-none sm:block lg:h-[432px]" aria-hidden="true">
          <div class="absolute inset-x-[2%] bottom-[14%] h-[26%] rounded-[50%] border border-white/10"></div>
          <img alt="" width="640" height="576" class="absolute left-1/2 top-[44%] h-auto w-[54%] -translate-x-1/2 -translate-y-1/2" style="filter:drop-shadow(0 34px 44px rgba(0,0,0,0.6))" src="<?php echo esc_url($u); ?>/assets/images/he-cua/mau-goc/civro-xw65-g1.webp">
          <img alt="" width="640" height="576" class="absolute left-1/2 top-[44%] h-auto w-[54%]" style="transform:translate(calc(-50% + 54%),calc(-50% + -4%)) scale(0.62);opacity:.85;filter:drop-shadow(0 18px 24px rgba(0,0,0,0.5)) brightness(0.78)" src="<?php echo esc_url($u); ?>/assets/images/he-cua/mau-goc/romadio-rd80fd-g1.webp">
          <img alt="" width="640" height="576" class="absolute left-1/2 top-[44%] h-auto w-[54%]" style="transform:translate(calc(-50% + -54%),calc(-50% + -4%)) scale(0.62);opacity:.85;filter:drop-shadow(0 18px 24px rgba(0,0,0,0.5)) brightness(0.78)" src="<?php echo esc_url($u); ?>/assets/images/he-cua/mau-goc/civro-xd65-g1.webp">
          <div class="absolute inset-x-0 bottom-0 z-40 flex items-end justify-between gap-4 border-t border-white/15 pt-3 text-white/70"><div><p class="text-[13px] font-medium tracking-[0.02em] text-accent">FIG. 01</p><p class="mt-1 text-[13px] font-medium tracking-[0.02em] text-white">Civro · XW65</p></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="nen-sang luoi-ban-ve">
    <div class="mx-auto max-w-[1440px] px-5 md:px-10 relative pb-20 pt-8 md:pb-28 md:pt-10">
      <div id="wd-he-cua-app" data-assets="<?php echo esc_url($u . '/assets'); ?>" data-lien-he="<?php echo esc_url(home_url('/lien-he/')); ?>" data-hotline="<?php echo esc_attr($i['hotline']); ?>" data-tel="<?php echo esc_attr($i['tel']); ?>">
        <div class="rounded-[18px] border border-[#e3e7ec] bg-white/95 px-4 shadow-[0_10px_34px_rgba(15,17,21,0.06)] md:px-6">
          <div class="flex scroll-mt-24 flex-wrap items-center justify-between gap-5 border-b border-[#eef0f4] py-3.5">
            <div role="radiogroup" aria-label="Lọc theo hãng" data-tabs class="inline-flex w-full flex-wrap gap-0.5 rounded-[12px] bg-[#f3f5f8] p-1 md:w-auto"></div>
            <div class="flex w-full flex-wrap items-center gap-x-5 gap-y-3 md:w-auto">
              <button type="button" data-mo-chon aria-haspopup="dialog" class="nut nut-chinh !min-h-11 gap-2.5 !px-5">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
                Chọn hệ <span data-so-chon-nut></span>
              </button>
              <span role="status" aria-live="polite" data-trang-thai class="text-[13px] font-bold tracking-[0.04em] text-[#4b5563]"><?php echo (int) $tong; ?> / <?php echo (int) $tong; ?> hệ</span>
              <div class="relative min-w-0 flex-1 md:flex-none">
                <label for="wd-he-tim" class="sr-only">Tìm hệ cửa</label>
                <svg viewBox="0 0 24 24" class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#697280]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
                <input id="wd-he-tim" data-tim type="search" placeholder="Tìm hệ: XW98, WS 75 THI…" class="w-full rounded-[12px] border border-[#e3e7ec] bg-white py-3 pl-10 pr-3.5 text-[15px] outline-none focus:border-than-chi md:w-[280px]">
              </div>
              <button type="button" data-xoa-tat-ca hidden class="min-h-11 text-[13px] text-[#697280] underline underline-offset-4 hover:text-than-chi">× Xóa tất cả</button>
            </div>
          </div>
          <div class="hidden flex-wrap items-center gap-2.5 py-4 md:flex" data-loc></div>
        </div>
        <div class="h-3 md:hidden" aria-hidden="true"></div>
        <h2 class="sr-only">Danh sách hệ cửa</h2>
        <ul data-luoi class="mt-6 grid gap-x-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7">
          <?php foreach (array_slice($du, 0, 12) as $r) : ?><li class="mb-5"><?php echo esc_html(ucfirst($r['hang']) . ' ' . $r['ma']); ?></li><?php endforeach; ?>
        </ul>
        <nav aria-label="Phân trang hệ cửa" data-phan-trang class="mt-14 text-center"></nav>
        <noscript><p class="mt-6 text-[#4b5563]">Cần bật JavaScript để lọc và xem thông số các hệ cửa. Liên hệ <?php echo esc_html($i['hotline']); ?> để được tư vấn.</p></noscript>
      </div>
    </div>
  </section>
</main>

<div role="status" aria-live="polite" data-thong-bao class="sr-only"></div>
<div data-thanh-so-sanh hidden class="fixed bottom-[88px] left-1/2 z-40 flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-4 whitespace-nowrap rounded-[14px] bg-than-chi py-2 pl-5 pr-2.5 text-sm text-white shadow-[0_14px_36px_rgba(0,0,0,0.3)] md:bottom-[100px]">
  <span data-so-ss>Đã chọn 0/3 hệ</span>
  <button type="button" data-mo-ss disabled class="nut nut-chinh !min-h-0 !px-5 !py-2.5 disabled:opacity-50">So sánh</button>
  <button type="button" data-bo-chon class="min-h-11 pr-2 text-[#cfd5de] underline underline-offset-4">Bỏ chọn</button>
</div>
<button type="button" data-nut-loc aria-haspopup="dialog" class="fixed bottom-4 left-1/2 z-40 flex min-h-12 -translate-x-1/2 items-center gap-2.5 rounded-full bg-than-chi px-6 text-[14px] font-bold text-white shadow-[0_14px_36px_rgba(0,0,0,0.35)] md:hidden">
  <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
  Bộ lọc <span data-so-loc></span>
</button>

<script type="application/json" id="wd-he-cua"><?php echo wp_json_encode($du, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP); ?></script>
<?php get_footer(); ?>
