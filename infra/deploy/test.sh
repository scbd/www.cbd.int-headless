#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# test.sh — full local test deployment (teardown + data restore)
#
# For production deployments use deploy-db.sh and deploy-www.sh directly.
# ---------------------------------------------------------------------------
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Source .env if present
if [ -f "${SCRIPT_DIR}/.env" ]; then
  set -a; source "${SCRIPT_DIR}/.env"; set +a
fi

STACK_NAME="${STACK_NAME:-www}"
DB_STACK_NAME="${DB_STACK_NAME:-www-db}"
IMAGE_TAG="${IMAGE_TAG:-local}"

DRUPAL_DATABASE_DB_NAME="${DRUPAL_DATABASE_DB_NAME:-www-cms}"
DRUPAL_DATABASE_USERNAME="${DRUPAL_DATABASE_USERNAME:-drupal}"

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
# Deploy DB stack (creates www_db_net + secrets + stack, waits for ready)
# ---------------------------------------------------------------------------
IMAGE_TAG="${IMAGE_TAG}" bash "${SCRIPT_DIR}/deploy-db.sh"

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
# Pre-populate drupal_files volume (local Docker volume, not EFS)
# Pre-creating the volume before stack deploy causes Swarm to reuse it
# rather than creating it with the EFS NFS driver_opts in www-stack.yml.
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
# Deploy www stack
# ---------------------------------------------------------------------------
IMAGE_TAG="${IMAGE_TAG}" bash "${SCRIPT_DIR}/deploy-www.sh"

echo ""
echo "Done. Stack '${STACK_NAME}' deployed."
echo "  docker stack ps ${STACK_NAME}"
