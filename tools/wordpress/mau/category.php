<?php
/** Chuyên mục Tin tức: /tin-tuc/<kien-thuc|hoat-dong|cong-trinh|tai-lieu>/ */
if (!defined('ABSPATH')) exit;
get_header();
$slug = get_queried_object()->slug ?? '';
?>
<main id="noi-dung" tabindex="-1" class="flex-1 outline-none">
  <?php winduca_trang_tin_tuc(isset(winduca_muc_tin_tuc()[$slug]) ? $slug : null); ?>
</main>
<?php get_footer(); ?>
