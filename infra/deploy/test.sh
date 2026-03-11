#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
STACK_NAME=www
DB_STACK_NAME=www-db
IMAGE_TAG=local
PORT="${PORT:-3010}"

DRUPAL_DATABASE_HOST="${DB_STACK_NAME}_mariadb"
DRUPAL_DATABASE_DB_NAME=www-cms
DRUPAL_DATABASE_USERNAME=drupal

# ---------------------------------------------------------------------------
# Tear down existing stacks
# ---------------------------------------------------------------------------
echo "Tearing down existing stacks..."
docker stack rm "${STACK_NAME}"    2>/dev/null || true
docker stack rm "${DB_STACK_NAME}" 2>/dev/null || true

echo "Waiting for stacks to fully stop..."
until [ -z "$(docker ps -q -f name=${STACK_NAME}_)" ] && [ -z "$(docker ps -q -f name=${DB_STACK_NAME}_)" ]; do
  echo "  ...containers still stopping, retrying in 3s"
  sleep 3
done
echo "Stacks stopped."

# Remove volumes so MariaDB re-initializes with the correct database name
docker volume rm "${DB_STACK_NAME}_db_data"      2>/dev/null || true
docker volume rm "${STACK_NAME}_drupal_files"    2>/dev/null || true
docker volume rm "${STACK_NAME}_redis_data"      2>/dev/null || true

# ---------------------------------------------------------------------------
# Ensure db_net overlay network exists (shared between both stacks)
# ---------------------------------------------------------------------------
docker network inspect db_net >/dev/null 2>&1 || \
  docker network create --driver overlay --attachable db_net
echo "Network db_net ready."

docker network inspect webgateway >/dev/null 2>&1 || \
  docker network create --driver overlay --attachable webgateway
echo "Network webgateway ready."

# ---------------------------------------------------------------------------
# Create secrets from infra/deploy/secrets/ files
# ---------------------------------------------------------------------------
bash "${SCRIPT_DIR}/init-secrets.sh"

# ---------------------------------------------------------------------------
# Deploy DB stack
# ---------------------------------------------------------------------------
MYSQL_DATABASE="${DRUPAL_DATABASE_DB_NAME}" \
MYSQL_USER="${DRUPAL_DATABASE_USERNAME}" \
  docker stack deploy --detach=true -c "${INFRA_DIR}/db-stack.yml" "${DB_STACK_NAME}"

echo "Waiting for MariaDB to be ready..."
until docker exec $(docker ps -q -f name=${DB_STACK_NAME}_mariadb) \
  sh -c 'mariadb -u root -p"$(cat /run/secrets/mysql_root_password)" -e "SELECT 1"' &>/dev/null; do
  echo "  ...not ready yet, retrying in 3s"
  sleep 3
done
echo "MariaDB is ready."

# ---------------------------------------------------------------------------
# Restore database
# ---------------------------------------------------------------------------
echo "Restoring database..."
docker exec -i $(docker ps -q -f name=${DB_STACK_NAME}_mariadb) \
  sh -c 'mariadb -u root -p"$(cat /run/secrets/mysql_root_password)" '"${DRUPAL_DATABASE_DB_NAME}" \
  < "${SCRIPT_DIR}/data/db.bak.sql"
echo "Database restored."

# ---------------------------------------------------------------------------
# Grant privileges to the Drupal DB user
# ---------------------------------------------------------------------------
echo "Granting privileges..."
docker exec $(docker ps -q -f name=${DB_STACK_NAME}_mariadb) \
  sh -c 'mariadb -u root -p"$(cat /run/secrets/mysql_root_password)" -e "GRANT ALL PRIVILEGES ON \`'"${DRUPAL_DATABASE_DB_NAME}"'\`.* TO '"'"''"${DRUPAL_DATABASE_USERNAME}"''"'"'@'"'"'%'"'"'; FLUSH PRIVILEGES;"'
echo "Privileges granted."

# ---------------------------------------------------------------------------
# Pre-populate drupal_files volume before starting Drupal
# ---------------------------------------------------------------------------
echo "Pre-populating drupal_files volume..."
docker volume create "${STACK_NAME}_drupal_files"
docker run --rm \
  -v "${STACK_NAME}_drupal_files:/opt/drupal/web/sites/default/files" \
  -v "${SCRIPT_DIR}/data:/data:ro" \
  alpine \
  tar -xzf /data/drupal_files.tar.gz -C /opt/drupal/web/sites/default/files
echo "Files volume populated."

# ---------------------------------------------------------------------------
# Deploy app stack
# ---------------------------------------------------------------------------
NGINX_IMAGE="scbd/www-router:${IMAGE_TAG}" \
NUXT_IMAGE="scbd/www-app:${IMAGE_TAG}" \
DRUPAL_IMAGE="scbd/www-cms:${IMAGE_TAG}" \
DRUPAL_DATABASE_HOST="${DRUPAL_DATABASE_HOST}" \
DRUPAL_DATABASE_DB_NAME="${DRUPAL_DATABASE_DB_NAME}" \
DRUPAL_DATABASE_USERNAME="${DRUPAL_DATABASE_USERNAME}" \
PORT="${PORT}" \
  docker stack deploy --detach=true -c "${INFRA_DIR}/www-stack.yml" "${STACK_NAME}"

# ---------------------------------------------------------------------------
# Run migration init (updatedb + cache-rebuild) once Drupal is up
# ---------------------------------------------------------------------------
echo "Waiting 5s for Drupal to start..."
sleep 5
bash "${SCRIPT_DIR}/migration-init.sh" "${STACK_NAME}"

echo ""
echo "Done. Stack '${STACK_NAME}' deployed."
echo "  docker stack ps ${STACK_NAME}"
