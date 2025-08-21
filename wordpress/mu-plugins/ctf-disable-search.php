<?php
/*
Plugin Name: CTF Disable Search (Force 404)
Description: Desativa buscas (?s=...) e força 404 com o template 404 do tema.
Author: CTF
*/

add_action('template_redirect', function () {
  if (is_search()) {
    global $wp_query;
    $wp_query->posts = [];
    $wp_query->post_count = 0;
    $wp_query->is_search = false;
    $wp_query->set_404();
    status_header(404);
    nocache_headers();
  }
}, 0);

add_filter('get_search_form', function () { return ''; }, 99);
