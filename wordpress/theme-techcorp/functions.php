<?php
// theme-techcorp/functions.php

add_action('wp_head', function () {
  $base = get_stylesheet_directory_uri() . '/assets';
  echo "\n" .
    '<link rel="icon" href="'.esc_url($base).'/favicon.png" sizes="any">'."\n";
}, 99);
