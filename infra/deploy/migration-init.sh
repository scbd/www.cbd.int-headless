#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# migration-init.sh — Run post-deploy Drupal tasks (updatedb + cache-rebuild)
#
# Works in Docker Swarm: spawns a one-shot service on a worker node using the
# same image/networks/secrets as the drupal service, then cleans up.
#
# Usage:
#   bash infra/deploy/migration-init.sh [stack-name]
# ---------------------------------------------------------------------------
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Source .env if present
if [ -f "${SCRIPT_DIR}/.env" ]; then
  set -a; source "${SCRIPT_DIR}/.env"; set +a
fi

STACK_NAME="${1:-${STACK_NAME:-www}}"
IMAGE_TAG="${IMAGE_TAG:-master}"
DRUPAL_IMAGE="scbd/www-drupal:${IMAGE_TAG}"

DRUPAL_DATABASE_HOST="${DRUPAL_DATABASE_HOST:?DRUPAL_DATABASE_HOST is required}"
DRUPAL_DATABASE_DB_NAME="${DRUPAL_DATABASE_DB_NAME:-www-cms}"
DRUPAL_DATABASE_USERNAME="${DRUPAL_DATABASE_USERNAME:-drupal}"

SERVICE_NAME="${STACK_NAME}_drush_init"

# Clean up any leftover service from a previous failed run
docker service rm "${SERVICE_NAME}" 2>/dev/null || true

echo "Running drush updatedb + cache-rebuild via one-shot service..."

docker service create \
  --name "${SERVICE_NAME}" \
  --restart-condition none \
  --network "${STACK_NAME}_backend" \
  --network www_db_net \
  --secret source=www_db_password,target=db_password \
  --secret source=www_redis_password,target=redis_password \
  --secret source=www_hash_salt,target=hash_salt \
  --constraint "node.role == worker" \
  -e DRUPAL_DATABASE_HOST="${DRUPAL_DATABASE_HOST}" \
  -e DRUPAL_DATABASE_PORT="${DRUPAL_DATABASE_PORT:-3306}" \
  -e DRUPAL_DATABASE_DB_NAME="${DRUPAL_DATABASE_DB_NAME}" \
  -e DRUPAL_DATABASE_USERNAME="${DRUPAL_DATABASE_USERNAME}" \
  -e DRUPAL_REDIS_HOST=redis \
  -e DRUPAL_REDIS_PORT=6379 \
  -e DRUPAL_REDIS_DB=0 \
  -e DRUPAL_REDIS_CACHE_PREFIX=cbd_ \
  -e DRUPAL_TRUSTED_HOST=.* \
  --detach \
  "${DRUPAL_IMAGE}" \
  sh -c 'cd /opt/drupal && vendor/bin/drush updatedb -y && vendor/bin/drush cache-rebuild' \
  >/dev/null

# Wait for the task to complete (Complete or Failed)
echo "Waiting for drush to finish..."
until docker service ps "${SERVICE_NAME}" \
    --format '{{.CurrentState}}' \
    | grep -qE '^(Complete|Failed)'; do
  sleep 3
done

# Show logs
docker service logs "${SERVICE_NAME}" 2>&1 || true

# Check exit state
STATE=$(docker service ps "${SERVICE_NAME}" --format '{{.CurrentState}}' | head -1)
docker service rm "${SERVICE_NAME}" >/dev/null

if echo "${STATE}" | grep -q "^Failed"; then
  echo "Error: drush migration failed (state: ${STATE})" >&2
  exit 1
fi

echo "Migration init complete."
