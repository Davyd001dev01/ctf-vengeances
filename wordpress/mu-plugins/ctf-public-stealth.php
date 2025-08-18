<?php
/**
 * Plugin Name: CTF Public Stealth
 * Description: Esconde navegação pública e o Guia do sitemap para visitantes.
 * Author: CTF Crew
 */

function ctf_get_kb_id(){
  $id = (int) get_option('ctf_kb_page_id');
  if ($id) return $id;
  // fallback: tenta descobrir por path/título e salva
  $page = get_page_by_path('kb-migracao-pm');
  if (!$page) $page = get_page_by_title('Guia de Migração — Gerenciador TechCorp PM', OBJECT, 'page');
  if ($page && $page->ID) { update_option('ctf_kb_page_id', (int)$page->ID, true); return (int)$page->ID; }
  return 0;
}

/* 1) Oculta blocos de navegação para visitantes (temas de blocos) */
add_filter('render_block', function($content, $block){
  if (is_user_logged_in()) return $content;
  $name = isset($block['blockName']) ? $block['blockName'] : '';
  if (in_array($name, ['core/navigation','core/page-list','core/loginout','core/site-title'], true)) {
    return ''; // não renderiza nada do menu/blocos de navegação
  }
  return $content;
}, 10, 2);

/* 2) Zera itens de menus clássicos para visitantes (temas clássicos) */
add_filter('wp_nav_menu_items', function($items, $args){
  if (is_user_logged_in()) return $items;
  return ''; // esvazia o menu
}, 10, 2);

/* 3) Exclui o Guia do sitemap XML (evita enumeração trivial) */
add_filter('wp_sitemaps_posts_query_args', function($args, $post_type){
  if ($post_type !== 'page') return $args;
  $kb = ctf_get_kb_id();
  if ($kb) {
    $args['post__not_in'] = array_merge($args['post__not_in'] ?? [], [$kb]);
  }
  return $args;
}, 10, 2);

/* 4) Menos pistas no <head> */
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);
