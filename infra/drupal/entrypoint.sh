#!/bin/bash
set -e

# ---------------------------------------------------------------------------
# Read Docker secrets
# ---------------------------------------------------------------------------
if [ -f /run/secrets/db_password ]; then
    export DRUPAL_DATABASE_PASSWORD=$(cat /run/secrets/db_password)
fi

if [ -f /run/secrets/redis_password ]; then
    export DRUPAL_REDIS_PASSWORD=$(cat /run/secrets/redis_password)
fi

if [ -f /run/secrets/hash_salt ]; then
    export DRUPAL_HASH_SALT=$(cat /run/secrets/hash_salt)
fi

# ---------------------------------------------------------------------------
# Wait for the database to be available
# ---------------------------------------------------------------------------
echo "Waiting for database at ${DRUPAL_DATABASE_HOST}:${DRUPAL_DATABASE_PORT:-3306}..."
until mysqladmin ping \
    -h "${DRUPAL_DATABASE_HOST}" \
    -P "${DRUPAL_DATABASE_PORT:-3306}" \
    -u "${DRUPAL_DATABASE_USERNAME}" \
    -p"${DRUPAL_DATABASE_PASSWORD}" \
    --silent 2>/dev/null; do
    sleep 2
    echo "Database not ready, retrying..."
done
echo "Database is up."

# ---------------------------------------------------------------------------
# Generate settings.local.php (idempotent — regenerated on every start)
# ---------------------------------------------------------------------------
SETTINGS_LOCAL=/opt/drupal/web/sites/default/settings.local.php

cat > "${SETTINGS_LOCAL}" <<PHP
<?php

\$settings['hash_salt'] = '${DRUPAL_HASH_SALT}';
\$settings['trusted_host_patterns'] = ['${DRUPAL_TRUSTED_HOST:-.*}'];
PHP

# Override individual DB fields only when the corresponding env var is set
[ -n "${DRUPAL_DATABASE_HOST:-}"     ] && echo "\$databases['default']['default']['host']     = '${DRUPAL_DATABASE_HOST}';"     >> "${SETTINGS_LOCAL}"
[ -n "${DRUPAL_DATABASE_PORT:-}"     ] && echo "\$databases['default']['default']['port']     = '${DRUPAL_DATABASE_PORT}';"     >> "${SETTINGS_LOCAL}"
[ -n "${DRUPAL_DATABASE_DB_NAME:-}"  ] && echo "\$databases['default']['default']['database'] = '${DRUPAL_DATABASE_DB_NAME}';"  >> "${SETTINGS_LOCAL}"
[ -n "${DRUPAL_DATABASE_USERNAME:-}" ] && echo "\$databases['default']['default']['username'] = '${DRUPAL_DATABASE_USERNAME}';" >> "${SETTINGS_LOCAL}"
[ -n "${DRUPAL_DATABASE_PASSWORD:-}" ] && echo "\$databases['default']['default']['password'] = '${DRUPAL_DATABASE_PASSWORD}';" >> "${SETTINGS_LOCAL}"

# Append Redis configuration if DRUPAL_REDIS_HOST is provided
if [ -n "${DRUPAL_REDIS_HOST}" ]; then
    echo "Redis host detected — configuring Redis cache backend."

    cat >> "${SETTINGS_LOCAL}" <<PHP

\$settings['cache']['default'] = 'cache.backend.redis';
\$settings['redis.connection']['interface'] = 'PhpRedis';
\$settings['redis.connection']['host'] = '${DRUPAL_REDIS_HOST}';
\$settings['redis.connection']['port'] = ${DRUPAL_REDIS_PORT:-6379};
\$settings['redis.connection']['base'] = ${DRUPAL_REDIS_DB:-0};
\$settings['cache_prefix']['default'] = '${DRUPAL_REDIS_CACHE_PREFIX:-cbd_}';
\$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/default/redis.services.yml';
\$settings['cache']['bins']['bootstrap'] = 'cache.backend.apcu';
\$settings['cache']['bins']['discovery'] = 'cache.backend.apcu';
PHP
fi

chown www-data:www-data "${SETTINGS_LOCAL}"

# ---------------------------------------------------------------------------
# Hand off to the CMD (supervisord)
# ---------------------------------------------------------------------------
echo "Drupal is ready. Starting supervisord..."
exec "$@"
