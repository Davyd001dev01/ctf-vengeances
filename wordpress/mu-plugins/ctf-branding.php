<?php
/**
 * Plugin Name: CTF Branding (Login RH)
 * Description: Personaliza a tela de login para o CTF (branding RH) sem interferir no 2FA.
 * Author: CTF Crew
 */

// URL base dos assets dentro de mu-plugins
function ctfb_assets_url($path = '') {
  return content_url('mu-plugins/' . ltrim($path, '/'));
}

// CSS no login (cores, logo, tipografia)
add_action('login_enqueue_scripts', function () {
  $logo = esc_url( ctfb_assets_url('assets/logo-rh.svg') ); 
  echo '<style>
    body.login {
      background: #0b132b;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    }
    #login {
      padding: 2rem 0;
    }
    #login h1 a {
      background-image: url('.$logo.');
      background-size: contain;
      background-position: center;
      width: 140px;
      height: 140px;
      margin: 0 auto 10px;
    }
    .login form {
      border-radius: 14px;
      box-shadow: 0 10px 24px rgba(0,0,0,.25);
      border: 1px solid rgba(255,255,255,.06);
      background: #1c2541;
      color: #000000;
    }
    .login label { color: #000000; }
    .login .input, .login input[type=password] {
      background: #0f172a; border: 1px solid #2a2f45; color: #000000;
    }
    .login .button-primary {
      background: #3a86ff; border-color: #3a86ff; box-shadow:none; text-shadow:none;
    }
    .login .button-primary:hover { background:#2e6ed1; border-color:#2e6ed1; }
    .message, .notice, .updated { border-left-color: #3a86ff; }
    #nav, #backtoblog a { color:#9fb3c8 !important; }
    .ctfb-banner {
      margin: 16px 0; padding: 12px 14px; border-radius: 10px;
      background: rgba(58,134,255,.08); border:1px solid rgba(58,134,255,.25);
      color:#cfe1ff; font-size:14px;
    }
    .privacy-policy-page-link { display:none; } /* limpa rodapé */
  </style>';
});

add_filter('login_message', function ($msg) {
  $html = '<div class="ctfb-banner"><strong>TechCorp RH</strong> — Acesso restrito a colaboradores. '
        . 'Tentativas são auditadas para fins de segurança e treinamento.</div>';
  return $html . $msg;
});

add_filter('login_headerurl', fn() => home_url('https://nvd.nist.gov/vuln/detail/cve-????-?????'));
add_filter('login_headertext', fn() => 'TechCorp RH');

add_action('wp_login_failed', function ($username){
  error_log('[CTF] login_failed user='.$username.' ip='.($_SERVER['REMOTE_ADDR'] ?? ''));
});
add_action('wp_login', function ($user_login){
  error_log('[CTF] login_ok user='.$user_login.' ip='.($_SERVER['REMOTE_ADDR'] ?? ''));
}, 10, 1);
