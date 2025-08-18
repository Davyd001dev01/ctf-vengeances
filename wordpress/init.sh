#!/bin/bash
set -euxo pipefail

cd /var/www/html

# Espera o DB ficar pronto
until nc -z db 3306; do
  echo "[init] Aguardando DB em db:3306..."; sleep 2;
done

# Evita reinstalação
if ! wp core is-installed --allow-root >/dev/null 2>&1; then
  echo "[init] Instalando WordPress..."
  wp core install \
    --url="http://localhost:8000" \
    --title="TechCorp RH" \
    --admin_user="admin" \
    --admin_password="admin_password" \
    --admin_email="admin@techcorp.com" \
    --skip-email \
    --allow-root
fi

# Usuário do RH
if ! wp user get rh_user --field=ID --allow-root >/dev/null 2>&1; then
  echo "[init] Criando usuário rh_user..."
  wp user create rh_user rh_user@techcorp.com \
    --role=editor \
    --user_pass="rh_password" \
    --display_name="Analista de RH" \
    --first_name="Ana" --last_name="Silva" \
    --allow-root
fi

# (invalida tokens de sessão gravados no banco)
echo "[init] Invalidando sessões existentes..."
for ID in $(wp user list --field=ID --allow-root); do
  wp user session destroy "$ID" --all --allow-root || true
done
wp cache flush --allow-root || true

# Ativar o plugin Really Simple Security (slug correto), com fallback para o path antigo
wp plugin is-active really-simple-security --allow-root \
  || wp plugin activate really-simple-security --allow-root \
  || wp plugin activate really-simple-security-vulnerable/rlrsssl-really-simple-ssl.php --allow-root \
  || true

# Log do status (só informativo)
if wp plugin is-active really-simple-security --allow-root >/dev/null 2>&1; then
  echo "[init] RSSSL ACTIVE (slug: really-simple-security)"
else
  echo "[init][WARN] Really Simple Security ainda INATIVO."
fi

# Habilitar 2FA global (não falha se a opção não existir nessa versão)
wp option update rsssl_two_fa_enabled 1 --allow-root || true

# Etapa 1: sem SSRF ainda. Controle pela env ENABLE_SSRF_HINT (desligada por padrão).
if [ "${ENABLE_SSRF_HINT:-0}" = "1" ]; then
  if ! wp post list --post_type=post --fields=ID,post_title --allow-root | grep -q "Serviço Interno de Projetos"; then
    echo "[init] Criando post de pista (SSRF)..."
    wp post create \
      --post_title="Serviço Interno de Projetos" \
      --post_content='Acesse o gerenciador: <a href="http://localhost:3000/" target="_blank" rel="noopener">TechCorp PM</a><br>Use a função <em>Importar por URL</em>.' \
      --post_status=publish \
      --allow-root
  fi
else
  # Post corporativo neutro (se não houver nenhum publicado)
  if [ "$(wp post list --post_type=post --post_status=publish --format=count --allow-root)" = "0" ]; then
    echo "[init] Criando post corporativo neutro..."
    wp post create \
      --post_title="Política de Acesso — RH" \
      --post_content="Acesso restrito. Em caso de dúvida, contate o setor de RH." \
      --post_status=publish \
      --allow-root
  fi
fi

# --- Página Guia (KB/Migração PM) — publicada + protegida por senha + autor admin ---
ADMIN_USER="${WP_ADMIN_USER:-admin}"
ADMIN_ID="$(wp user get "$ADMIN_USER" --field=ID --allow-root)"

cat > /tmp/kb_migracao_pm.html <<'HTML'
<h2>Guia de Migração — Gerenciador TechCorp PM</h2>
<p>Estamos migrando o backlog e os documentos de RH para o <strong>Gerenciador TechCorp PM</strong>.</p>
<h3>Acessar o Gerenciador</h3>
<p>Use o portal do PM para importar artefatos diretamente por URL.</p>
<p><a href="http://localhost:3000/" target="_blank" rel="noopener">Abrir Gerenciador TechCorp PM</a></p>
<h3>Importar por URL (Exemplo)</h3>
<pre><code>GET /import?url=http://example.com/dados.json
Host: localhost:3000
</code></pre>
<p>O importador busca o recurso a partir do servidor do PM. Evite URLs não confiáveis.</p>
<h3>Configuração de Infra</h3>
<p>Nota de DevOps: variáveis de ambiente para provisionamento.</p>
<pre><code>PM_INTERNAL_METADATA_URL=http://internal-secrets:4000/metadata
PM_ALLOWED_HOSTS=techcorp.local
</code></pre>
<p>O endpoint de metadados fornece parâmetros temporários do painel administrativo (uso interno).</p>
<h3>Observações</h3>
<ul>
  <li>URLs de <em>loopback</em> podem ser bloqueadas por política.</li>
  <li>O importador segue redirecionamentos HTTP quando presente.</li>
  <li>Para testes, prefira endpoints HTTP simples.</li>
</ul>
HTML

# tenta achar por slug; se não existir, cria e guarda o ID
POST_ID="$(wp post list --post_type=page --name=kb-migracao-pm --field=ID --allow-root || true)"
if [ -z "$POST_ID" ]; then
  echo "[init] Criando página Guia (kb-migracao-pm) como admin..."
  POST_ID="$(wp post create \
    --post_type=page \
    --post_status=publish \
    --post_title='Guia de Migração — Gerenciador TechCorp PM' \
    --post_name='kb-migracao-pm' \
    --post_content=\"$(cat /tmp/kb_migracao_p m.html)\" \
    --post_author=\"$ADMIN_ID\" \
    --post_password='check_login_and_get_user' \
    --porcelain \
    --allow-root)"
else
  echo "[init] Atualizando página Guia (ID=$POST_ID)..."
  wp post update "$POST_ID" \
    --post_status=publish \
    --post_author="$ADMIN_ID" \
    --post_password='check_login_and_get_user' \
    --post_content="$(cat /tmp/kb_migracao_pm.html)" \
    --allow-root
fi

# salva o ID para o MU-plugin usar (gating/anti-edição)
wp option update ctf_kb_page_id "$POST_ID" --autoload=yes --allow-root

# Permalinks
wp rewrite structure '/%postname%/' --hard --allow-root
wp rewrite flush --hard --allow-root

# --- Homepage estática "TechCorp — Início" usando arquivo externo (idempotente) ---
CONTENT_FILE="${CTF_CONTENT_FILE:-/usr/src/ctf/content/techcorp_home.html}"

# Se o arquivo não existir, usa um fallback simples
if [ ! -f "$CONTENT_FILE" ]; then
  echo "[init][WARN] $CONTENT_FILE não encontrado; usando template padrão."
  cat > /tmp/techcorp_home_default.html <<'HTML'
<!-- wp:heading {"textAlign":"center"} --><h2 class="has-text-align-center">TechCorp RH</h2><!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} --><p class="has-text-align-center">Homepage padrão.</p><!-- /wp:paragraph -->
HTML
  CONTENT_FILE=/tmp/techcorp_home_default.html
fi

ADMIN_USER="${WP_ADMIN_USER:-admin}"
ADMIN_ID="$(wp user get "$ADMIN_USER" --field=ID --allow-root)"

# tenta reutilizar ID salvo/slug
HOME_ID="$(wp option get ctf_home_page_id --allow-root || true)"
if [ -z "$HOME_ID" ] || ! wp post get "$HOME_ID" --field=ID --allow-root >/dev/null 2>&1; then
  HOME_ID="$(wp post list --post_type=page --name=techcorp_home --field=ID --allow-root || true)"
fi

# cria se necessário
if [ -z "$HOME_ID" ]; then
  HOME_ID="$(wp post create \
    --post_type=page \
    --post_status=publish \
    --post_title='TechCorp — Início' \
    --post_name='techcorp_home' \
    --post_content=\"$(cat "$CONTENT_FILE")\" \
    --post_author=\"$ADMIN_ID\" \
    --porcelain \
    --allow-root)"
else
  # atualiza conteúdo/slug/autor
  wp post update "$HOME_ID" \
    --post_status=publish \
    --post_name='techcorp_home' \
    --post_author="$ADMIN_ID" \
    --post_content="$(cat "$CONTENT_FILE")" \
    --allow-root
fi

# define como homepage
wp option update show_on_front page --allow-root
wp option update page_on_front "$HOME_ID" --allow-root
wp option update page_for_posts 0 --allow-root
wp option update ctf_home_page_id "$HOME_ID" --autoload=yes --allow-root

# remove duplicatas do prefixo
for id in $(wp post list --post_type=page --fields=ID,post_name --allow-root \
  | awk -v keep="$HOME_ID" '\''$2 ~ /^techcorp_home/ && $1 != keep {print $1}'\'''); do
  wp post delete "$id" --force --allow-root
done

# não falha se .htaccess não puder ser escrito
wp rewrite flush --hard --allow-root || true



# Permissões do wp-content
chown -R www-data:www-data wp-content

echo "[init] OK."
