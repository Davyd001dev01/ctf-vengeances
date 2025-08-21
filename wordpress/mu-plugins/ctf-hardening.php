<?php
/**
 * Plugin Name: CTF Hardening (mínimo)
 * Description: Endurece sem atrapalhar o fluxo 2FA do RSSSL.
 */

add_filter('xmlrpc_enabled', '__return_false');

add_action('parse_request', function () {
  if (isset($GLOBALS['pagenow']) && $GLOBALS['pagenow'] === 'xmlrpc.php') {
    status_header(403);
    exit; 
  }
}, 0);

add_action('init', function () {
  if (is_admin()) return;
  if (isset($_GET['author'])) { wp_redirect(home_url('/')); exit; }
});

add_filter('pre_option_users_can_register', fn() => 0);

remove_action('wp_head', 'wp_generator');
