<?php
/**
 * Plugin Name: CTF RH Breadcrumbs
 * Description: Breadcrumbs pós-login para guiar o jogador ao Gerenciador TechCorp PM (Etapa 2).
 * Author: CTF Crew
 */

function ctfb_rh_can_view() {
  return is_user_logged_in() && current_user_can('edit_pages');
}

/* Dashboard widget */
add_action('wp_dashboard_setup', function () {
  if (!ctfb_rh_can_view()) return;
  wp_add_dashboard_widget('ctf_rh_onboarding', 'RH — Onboarding do Gerenciador', function () {
    $url = home_url('/kb/migracao-pm');
    echo '<p>Estamos migrando nossa gestão para o <strong>Gerenciador TechCorp PM</strong>.</p>';
    echo '<p><a class="button button-primary" href="'.esc_url($url).'">Abrir Guia</a></p>';
  });
});

/* Aviso no topo do admin */
add_action('admin_notices', function () {
  if (!ctfb_rh_can_view()) return;
  $url = esc_url(home_url('/kb-migracao-pm'));
  echo '<div class="notice notice-info is-dismissible"><p>📌 <strong>RH:</strong> confira o guia de migração para o Gerenciador TechCorp PM. ';
  echo '<a href="'.$url.'">Abrir Guia</a></p></div>';
});

/* Link rápido na Admin Bar */
add_action('admin_bar_menu', function ($bar) {
  if (!ctfb_rh_can_view()) return;
  $bar->add_menu([
    'id'    => 'ctf-rh-kb',
    'title' => 'Onboarding PM',
    'href'  => home_url('/kb/migracao-pm'),
    'meta'  => ['title' => 'Guia de migração do RH'],
  ]);
}, 100);
