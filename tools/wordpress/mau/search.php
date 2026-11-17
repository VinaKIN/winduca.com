<?php
/** Kết quả tìm kiếm bài viết, dùng cùng bố cục Tin tức. */
if (!defined('ABSPATH')) exit;
get_header();
?>
<main id="noi-dung" tabindex="-1" class="flex-1 outline-none">
  <?php winduca_trang_tin_tuc(null); ?>
</main>
<?php get_footer(); ?>
