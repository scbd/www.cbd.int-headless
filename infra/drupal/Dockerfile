# ---------------------------------------------------------------------------
# Stage 1: builder — installs build tools and all Composer dependencies
# ---------------------------------------------------------------------------
FROM drupal:10.4.6-fpm AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        unzip \
        curl \
        vim \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/drupal

# Bootstrap Drupal via composer (no DB connection at build time)
RUN composer create-project -n "drupal/recommended-project:^10" /tmp/recommended-project \
    && cp -Rp /tmp/recommended-project/composer.* /opt/drupal/ \
    && cp -Rp /tmp/recommended-project/vendor /opt/drupal/ \
    && cp -Rp /tmp/recommended-project/web/. /opt/drupal/web/ \
    && rm -rf /tmp/recommended-project

# Apply custom composer.json and reinstall
COPY config/drupal/composer.json /opt/drupal/composer.json
RUN rm -f /opt/drupal/composer.lock \
    && rm -rf /opt/drupal/vendor \
    && composer install -n

# Install drush and all contrib modules
RUN composer require -n "drush/drush:*"
RUN composer require -n \
    "drupal/gutenberg:*" \
    "drupal/admin_toolbar:*" \
    "drupal/admin_audit_trail:*" \
    "drupal/advanced_gutenberg_blocks:*" \
    "drupal/amazon_sns:*" \
    "drupal/aws:*" \
    "drupal/bootstrap5:*" \
    "drupal/classy_paragraphs:*" \
    "drupal/config_log:*" \
    "drupal/coffee:*" \
    "drupal/collapsible_dnd:*" \
    "drupal/consumers:*" \
    "drupal/ctools:*" \
    "drupal/decoupled_router:*" \
    "drupal/default_content_deploy:*" \
    "drupal/devel_entity_updates:*" \
    "drupal/dotenv:*" \
    "drupal/entity:*" \
    "drupal/entity_update:*" \
    "drupal/extlink:*" \
    "drupal/externalauth:*" \
    "drupal/facets:*" \
    "drupal/feeds:*" \
    "drupal/feeds_ex:^1.0@beta" \
    "drupal/tamper:^1.0@beta" \
    "drupal/feeds_tamper:^2.0@RC" \
    "drupal/field_group:*" \
    "drupal/file_replace:*" \
    "drupal/fontawesome:*" \
    "drupal/gin:*" \
    "drupal/gin_gutenberg:*" \
    "drupal/gin_login:*" \
    "drupal/gin_toolbar:*" \
    "drupal/google_analytics:*" \
    "drupal/group:*" \
    "drupal/group_permissions:^2.0@alpha" \
    "drupal/gutenberg_advanced_link:*" \
    "drupal/gutenberg_bs_blocks:^1.0@RC" \
    "drupal/gutenberg_core_enhancements:1.0.x-dev@dev" \
    "drupal/gutenberg_content_updater:1.0.x-dev" \
    "drupal/gutenberg_uswds:^1.1" \
    "drupal/jsonapi_aliases:^2.0@alpha" \
    "drupal/jsonapi_extras:*" \
    "drupal/jsonapi_menu_items:*" \
    "drupal/jsonapi_page_limit:*" \
    "drupal/key:*" \
    "drupal/login_destination:^2.0@beta" \
    "drupal/media_duplicates:*" \
    "drupal/media_entity_file_replace:*" \
    "drupal/menu_admin_per_menu:*" \
    "drupal/menu_export:*" \
    "drupal/menu_link_attributes:*" \
    "drupal/menu_migration:*" \
    "drupal/menu_item_extras:*" \
    "drupal/pathauto:*" \
    "drupal/redirect:*" \
    "drupal/redirect_domain:*" \
    "drupal/redis:*" \
    "drupal/rest_menu_tree:*" \
    "drupal/restui:*" \
    "drupal/revision_manager:^1.0@beta" \
    "drupal/robotstxt:*" \
    "drupal/rules:*" \
    "drupal/simple_oauth:^6.0" \
    "drupal/something_went_wrong:^2.0@alpha" \
    "drupal/tagify:*" \
    "drupal/tmgmt:*" \
    "drupal/tmgmt_deepl:^2.3@alpha" \
    "drupal/taxonomy_manager:*" \
    "drupal/quick_node_clone:*" \
    "drupal/views_bulk_operations:*" \
    "drupal/views_url_alias:*" \
    "drupal/yaml_editor:*" \
    "drupal/workbench:*" \
    "drupal/workbench_access:*" \
    "drupal/workbench_email:*"

RUN composer update -n

# ---------------------------------------------------------------------------
# Stage 2: runtime — lean final image with only what's needed at runtime
# ---------------------------------------------------------------------------
FROM drupal:10.4.6-fpm

# Runtime system deps: mysql client (for wait loop), nginx, supervisor
RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends \
        default-mysql-client \
        nginx \
        supervisor \
    && rm -rf /var/lib/apt/lists/*

# Install APCu PHP extension
RUN pecl channel-update pecl.php.net \
    && yes '' | pecl install -f apcu \
    && printf 'extension=apcu.so\napc.enable_cli=1\napc.enabled=1\napc.shm_size=256M\napc.ttl=7200\napc.gc_ttl=3600\n' \
        > /usr/local/etc/php/conf.d/docker-php-ext-apcu.ini

# Install Redis PHP extension
RUN yes '' | pecl install -f redis \
    && echo "extension=redis.so" > /usr/local/etc/php/conf.d/docker-php-ext-redis.ini

# PHP runtime config
RUN printf 'upload_max_filesize = 64M\npost_max_size = 64M\nmax_input_vars = 10000\nmemory_limit = 1024M\n' \
    > /usr/local/etc/php/conf.d/docker-php-custom.ini

WORKDIR /opt/drupal

# Copy built Drupal (vendor + web) from builder stage
COPY --from=builder /opt/drupal /opt/drupal

# Copy custom modules, themes, and site config into the web root
COPY config/drupal/web/  /opt/drupal/web/

RUN rm -f /opt/drupal/web/robots.txt

# nginx config
COPY config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -f /etc/nginx/sites-enabled/default

# supervisor config (manages nginx + php-fpm)
COPY config/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# PHP-FPM: listen on localhost only — nginx is co-located in the same container
RUN sed -i 's|^listen = .*|listen = 127.0.0.1:9000|' /usr/local/etc/php-fpm.d/www.conf

# Fix permissions
RUN chown -R www-data:www-data /opt/drupal/web

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

VOLUME ["/opt/drupal/web/sites/default/files", "/var/drupal/sync"]

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
