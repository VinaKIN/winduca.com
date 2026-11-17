<?php
/** Trang bài viết kiểu tạp chí tối giản (mô phỏng /tin-tuc/[slug] của bản Next.js). */
if (!defined('ABSPATH')) exit;
get_header();
while (have_posts()) : the_post();
    $id = get_the_ID();
    $muc = winduca_muc_cua($id);
    $mucs = winduca_muc_tin_tuc();
    $cd = winduca_chu_de($id);
    $mau = winduca_mau_chu_de($cd);
    $ket = get_post_meta($id, 'wd_ket_luan', true);
    $url = fn($p) => esc_url(home_url($p));

    // Tách thân bài theo thẻ h2 thành các mục đánh số
    $html = apply_filters('the_content', get_the_content());
    $muc_noi = [];
    if (preg_match_all('/<h2[^>]*>(.*?)<\/h2>(.*?)(?=<h2|\z)/su', $html, $mm, PREG_SET_ORDER)) {
        foreach ($mm as $i => $x) $muc_noi[] = ['id' => 'muc-' . ($i + 1), 'h' => wp_strip_all_tags($x[1]), 'noi' => $x[2]];
    }
    $khac = get_posts(['post_type' => 'post', 'posts_per_page' => 3, 'post__not_in' => [$id], 'orderby' => 'date', 'order' => 'DESC']);
?>
<div class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent" role="progressbar" aria-label="Tiến độ đọc" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-tien-do>
  <div class="h-full origin-left bg-accent" style="transform:scaleX(0)"></div>
</div>

<main id="noi-dung" tabindex="-1" class="flex-1 outline-none">
<header class="luoi-ban-ve nen-nga pb-10 pt-28 md:pb-14 md:pt-36">
  <div class="mx-auto w-full max-w-[1440px] px-5 md:px-10">
    <nav aria-label="Đường dẫn" class="flex flex-wrap items-center gap-3 text-[13px] font-medium tracking-[0.02em] text-than-chi/70">
      <a href="<?php echo $url('/tin-tuc/'); ?>" class="transition-colors hover:text-accent">Tin tức</a>
      <span aria-hidden="true">/</span>
      <a href="<?php echo $url("/tin-tuc/$muc/"); ?>" class="transition-colors hover:text-accent"><?php echo esc_html($mucs[$muc][0]); ?></a>
    </nav>
    <div class="mt-6 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-14">
      <h1 class="text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] [text-wrap:balance]"><?php the_title(); ?></h1>
      <div>
        <p class="text-[17px] leading-relaxed text-than-chi/80"><?php echo esc_html(get_the_excerpt()); ?></p>
        <p class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-than-chi/70">
          <span class="font-semibold tracking-[0.02em]" style="color:<?php echo esc_attr($mau[0]); ?>"><?php echo esc_html($cd); ?></span>
          <i class="h-[3px] w-[3px] rounded-full bg-than-chi/40" aria-hidden="true"></i>
          <span><?php echo winduca_phut_doc($id); ?> phút đọc</span>
          <i class="h-[3px] w-[3px] rounded-full bg-than-chi/40" aria-hidden="true"></i>
          <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('d/m/Y')); ?></time>
        </p>
      </div>
    </div>
    <div class="dau-goc relative mt-9 aspect-[16/8] overflow-hidden rounded-[14px] bg-than-chi md:mt-12">
      <?php winduca_anh_bai($id, '(min-width: 1440px) 1360px, 100vw', '', true); ?>
    </div>
  </div>
</header>

<section class="bg-white py-12 md:py-20">
  <div class="mx-auto w-full max-w-[1440px] px-5 md:px-10">
    <div class="grid gap-10 lg:grid-cols-[0.3fr_0.7fr] lg:gap-20">
      <div class="hidden lg:block">
        <nav aria-label="Mục lục bài viết" class="lg:sticky lg:top-28" data-muc-luc>
          <p class="text-[13px] font-medium tracking-[0.02em] text-than-chi/70">Trong bài này</p>
          <ol class="mt-4 space-y-1 border-l border-than-chi/20">
            <?php foreach ($muc_noi as $i => $m) : ?>
              <li>
                <a href="#<?php echo esc_attr($m['id']); ?>" class="-ml-px flex min-h-11 items-start gap-3 border-l-2 border-transparent py-2 pl-4 text-[14.5px] leading-snug text-than-chi/70 transition-colors hover:text-than-chi">
                  <span class="tabular-nums text-accent"><?php echo sprintf('%02d', $i + 1); ?></span><span><?php echo esc_html($m['h']); ?></span>
                </a>
              </li>
            <?php endforeach; ?>
          </ol>
        </nav>
      </div>

      <article id="than-bai" class="max-w-[44rem]">
        <?php foreach ($muc_noi as $i => $m) : ?>
          <section id="<?php echo esc_attr($m['id']); ?>" class="mb-12 scroll-mt-28">
            <p class="text-[13px] font-semibold tabular-nums text-accent"><?php echo sprintf('%02d', $i + 1); ?></p>
            <h2 class="mt-1 text-[1.55rem] font-semibold leading-tight md:text-[1.9rem]"><?php echo esc_html($m['h']); ?></h2>
            <div class="wd-noi"><?php echo $m['noi']; ?></div>
          </section>
        <?php endforeach; ?>
        <?php if (!$muc_noi) echo '<div class="wd-noi">' . $html . '</div>'; ?>

        <?php if ($ket) : ?>
          <aside class="rounded-[14px] border-l-2 border-accent bg-nga p-6 md:p-8">
            <p class="text-[13px] font-medium tracking-[0.02em] text-than-chi/70">Tóm lại</p>
            <p class="mt-2 text-[1.15rem] font-medium leading-relaxed"><?php echo esc_html($ket); ?></p>
          </aside>
        <?php endif; ?>
        <p class="mt-5 text-[13px] leading-relaxed text-than-chi/70">Bài viết giải thích nguyên lý chung, không kèm thông số riêng của sản phẩm. Thông số chính thức sẽ được công bố khi có tài liệu kiểm định.</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="<?php echo $url('/lien-he/'); ?>" class="nut nut-chinh">Liên hệ tư vấn</a>
          <a href="<?php echo $url('/trai-nghiem/#sample-box'); ?>" class="nut nut-dac">Nhận hộp mẫu góc nhôm</a>
        </div>
      </article>
    </div>
  </div>
</section>

<?php if ($khac) : ?>
<section class="nen-nga py-14 md:py-20">
  <div class="mx-auto w-full max-w-[1440px] px-5 md:px-10">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <h2 class="text-[1.6rem] font-semibold leading-tight md:text-[1.9rem]">Đọc tiếp</h2>
      <a href="<?php echo $url('/tin-tuc/'); ?>" class="text-[13px] font-semibold tracking-[0.02em] transition-colors hover:text-accent">Tất cả bài viết →</a>
    </div>
    <hr class="mt-4 border-0 border-t border-than-chi/70">
    <ul class="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($khac as $x) : $cx = winduca_chu_de($x->ID); ?>
        <li>
          <a href="<?php echo esc_url(get_permalink($x)); ?>" class="group block">
            <span class="relative block aspect-[4/3] overflow-hidden rounded-[14px] bg-than-chi/10 transition-[box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_44px_rgba(15,17,21,0.16)]"><?php winduca_anh_bai($x->ID, '(min-width: 1024px) 31vw, 92vw'); ?></span>
            <span class="mt-4 block text-[13px] font-semibold tracking-[0.02em]" style="color:<?php echo esc_attr(winduca_mau_chu_de($cx)[0]); ?>"><?php echo esc_html($cx); ?></span>
            <span class="mt-1 block text-[1.1rem] font-semibold leading-snug transition-colors duration-150 group-hover:text-accent"><?php echo esc_html(get_the_title($x)); ?></span>
            <span class="mt-1 block text-[13px] text-than-chi/65"><?php echo winduca_phut_doc($x); ?> phút đọc</span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>
<?php endif; ?>
</main>
<?php endwhile; get_footer(); ?>
