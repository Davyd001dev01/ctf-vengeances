#!/bin/bash
set -euo pipefail

# 1) Garantir que o core do WP exista em /var/www/html
if [ ! -f /var/www/html/wp-includes/version.php ]; then
  echo "[start] Populando WordPress core em /var/www/html ..."
  # Copia como o entrypoint oficial faria
  tar -C /usr/src/wordpress -cf - . | tar -C /var/www/html -xf -
  chown -R www-data:www-data /var/www/html
fi

if ! php -r 'include "/var/www/html/wp-config.php"; exit(!isset($table_prefix) || $table_prefix==="");'; then
  echo "[start] wp-config invalido (prefix vazio). Regenerando..."
  cat > /var/www/html/wp-config.php << "EOF"
<?php
define("DB_NAME","wordpress");
define("DB_USER","wpuser");
define("DB_PASSWORD","wppass");
define("DB_HOST","db");
define("DB_CHARSET","utf8");
define("DB_COLLATE","");
$table_prefix="wp_";
define("WP_DEBUG",true);
define("AUTOMATIC_UPDATER_DISABLED",true);
define("FS_METHOD","direct");
if(!defined("ABSPATH")) define("ABSPATH", __DIR__."/");
require_once ABSPATH."wp-settings.php";
EOF
  chown www-data:www-data /var/www/html/wp-config.php
fi


# 2) Rodar o init (não derruba o container em caso de erros não críticos)
/usr/local/bin/init.sh || true

# 3) Subir Apache em foreground (PID 1)
exec apache2-foreground
