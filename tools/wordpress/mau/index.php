<?php
if (!defined('ABSPATH')) exit;
get_header();
?>
<main id="noi-dung" tabindex="-1" class="flex-1 outline-none">
  <section class="bg-nga pb-12 pt-32 md:pb-16 md:pt-44">
    <div class="mx-auto max-w-[1440px] px-5 md:px-10">
      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article class="mb-10">
          <h1 class="text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight"><?php the_title(); ?></h1>
          <div class="mt-4 max-w-3xl text-[1.05rem] leading-relaxed"><?php the_content(); ?></div>
        </article>
      <?php endwhile; else : ?>
        <p>Chưa có nội dung.</p>
      <?php endif; ?>
    </div>
  </section>
</main>
<?php get_footer(); ?>
