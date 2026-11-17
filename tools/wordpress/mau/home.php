<?php
/** Trang Tin tức (trang bài viết): tất cả bài. */
if (!defined('ABSPATH')) exit;
get_header();
?>
<main id="noi-dung" tabindex="-1" class="flex-1 outline-none">
  <?php winduca_trang_tin_tuc(null); ?>
</main>
<?php get_footer(); ?>
