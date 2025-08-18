<?php
/**
 * Plugin Name: CTF Access Gate
 * Description: Exige login no Guia e bloqueia edição/exclusão por não-admin.
 */

/** retorna o ID da página Guia, a partir da option; se faltar, tenta descobrir e salva */
function ctf_kb_id() {
  $id = intval(get_option('ctf_kb_page_id'));
  if ($id > 0) return $id;

  // fallback: tenta achar por path original (pode ter virado -2/-3) ou pelo título
  $page = get_page_by_path('kb-migracao-pm');
  if (!$page) {
    $page = get_page_by_title('Guia de Migração — Gerenciador TechCorp PM', OBJECT, 'page');
  }
  if ($page && $page->ID) {
    update_option('ctf_kb_page_id', intval($page->ID), true);
    return intval($page->ID);
  }
  return 0;
}

/** exige login na visualização do Guia (além da senha da própria página) */
add_action('template_redirect', function () {
  if (is_admin()) return;
  $kb_id = ctf_kb_id();
  if ($kb_id && is_singular('page') && get_queried_object_id() === $kb_id && !is_user_logged_in()) {
    auth_redirect(); // manda para /wp-login.php?redirect_to=...
    exit;
  }
});

/** bloqueia editar/deletar/publicar o Guia para quem não é admin (por função/role) */
add_filter('map_meta_cap', function ($caps, $cap, $user_id, $args) {
  if (!in_array($cap, ['edit_post','delete_post','publish_post'], true)) {
    return $caps;
  }
  $post_id = !empty($args[0]) ? intval($args[0]) : 0;
  $kb_id   = ctf_kb_id();
  if (!$kb_id || $post_id !== $kb_id) {
    return $caps;
  }

  // checa role do usuário (admin) OU uma capability "de admin"
  $user = get_userdata($user_id);
  $roles = is_object($user) ? (array) $user->roles : [];
  $is_admin = in_array('administrator', $roles, true) || user_can($user_id, 'manage_options');

  if (!$is_admin) {
    return ['do_not_allow']; // trava a ação
  }
  return $caps;
}, 10, 4);
