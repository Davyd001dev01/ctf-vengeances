<?php
/**
 * Plugin Name: CTF Hardening (mínimo)
 * Description: Endurece sem atrapalhar o fluxo 2FA do RSSSL.
 */

// 1) Desabilita XML-RPC via filtro (nível WP)
add_filter('xmlrpc_enabled', '__return_false');

// 2) Bloqueio agressivo do endpoint (antes de qualquer handler)
add_action('parse_request', function () {
  if (isset($GLOBALS['pagenow']) && $GLOBALS['pagenow'] === 'xmlrpc.php') {
    status_header(403);
    exit; // mata aqui
  }
}, 0);

// 3) Evita enumeração trivial de autores
add_action('init', function () {
  if (is_admin()) return;
  if (isset($_GET['author'])) { wp_redirect(home_url('/')); exit; }
});

// 4) Desliga registro público de usuários
add_filter('pre_option_users_can_register', fn() => 0);

// 5) (Opcional) esconder versão
remove_action('wp_head', 'wp_generator');
