# wordpress/Dockerfile
FROM wordpress:6.4.2-php8.1-apache

# Utilitários e WP-CLI
RUN apt-get update && apt-get install -y \
    curl \
    netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

# WP-CLI
RUN curl -fsSL https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o /usr/local/bin/wp \
 && chmod +x /usr/local/bin/wp

# Copiar plugin vulnerável para dentro da imagem e posicioná-lo no local correto
COPY ./plugins/really-simple-security-vulnerable /usr/src/rsssl
RUN mkdir -p /var/www/html/wp-content/plugins \
 && cp -r /usr/src/rsssl /var/www/html/wp-content/plugins/really-simple-security \
 && chown -R www-data:www-data /var/www/html/wp-content/plugins

# Copiar MU-plugins (hardening, etc.) e posicionar no local correto
COPY ./mu-plugins /usr/src/mu-plugins
RUN mkdir -p /var/www/html/wp-content/mu-plugins \
 && cp -r /usr/src/mu-plugins/* /var/www/html/wp-content/mu-plugins/ \
 && chown -R www-data:www-data /var/www/html/wp-content/mu-plugins

# Configs e scripts
COPY wp-config.php /var/www/html/
COPY init.sh /usr/local/bin/init.sh
COPY docker-start.sh /usr/local/bin/docker-start.sh
RUN chmod +x /usr/local/bin/init.sh /usr/local/bin/docker-start.sh \
 && chown -R www-data:www-data /var/www/html

ENTRYPOINT ["/usr/local/bin/docker-start.sh"]
