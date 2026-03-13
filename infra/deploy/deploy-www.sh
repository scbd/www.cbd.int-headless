#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# deploy-www.sh — idempotent www stack deploy
#
# Usage:
#   bash infra/deploy/deploy-www.sh
#
# Sources .env if present. Safe to run against a live cluster (no teardown).
# Requires DB stack to already be running (www_db_net must exist).
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
IMAGE_TAG="${IMAGE_TAG:-master}"

DRUPAL_DATABASE_HOST="${DRUPAL_DATABASE_HOST:-${DB_STACK_NAME}_mariadb}"
DRUPAL_DATABASE_DB_NAME="${DRUPAL_DATABASE_DB_NAME:-www-cms}"
DRUPAL_DATABASE_USERNAME="${DRUPAL_DATABASE_USERNAME:-drupal}"

# ---------------------------------------------------------------------------
# Ensure webgateway overlay network exists
# ---------------------------------------------------------------------------
docker network inspect webgateway >/dev/null 2>&1 || \
  docker network create --driver overlay --attachable webgateway
echo "Network webgateway ready."

# ---------------------------------------------------------------------------
# Deploy www stack
# ---------------------------------------------------------------------------
NGINX_IMAGE="scbd/www-router:${IMAGE_TAG}" \
NUXT_IMAGE="scbd/www-nuxt:${IMAGE_TAG}" \
DRUPAL_IMAGE="scbd/www-drupal:${IMAGE_TAG}" \
DRUPAL_DATABASE_HOST="${DRUPAL_DATABASE_HOST}" \
DRUPAL_DATABASE_DB_NAME="${DRUPAL_DATABASE_DB_NAME}" \
DRUPAL_DATABASE_USERNAME="${DRUPAL_DATABASE_USERNAME}" \
  docker stack deploy --detach=true -c "${INFRA_DIR}/www-stack.yml" "${STACK_NAME}"
echo "Stack '${STACK_NAME}' deployed."

# ---------------------------------------------------------------------------
# Wait for Drupal service to have a running task, then run migrations
# ---------------------------------------------------------------------------
echo "Waiting for Drupal service to start..."
until docker service ps "${STACK_NAME}_drupal" \
    --filter desired-state=running \
    --format '{{.CurrentState}}' 2>/dev/null \
    | grep -q '^Running'; do
  echo "  ...not ready yet, retrying in 5s"
  sleep 5
done
echo "Drupal is running."

echo ""
echo "Done. Stack '${STACK_NAME}' is running."
echo "  docker stack ps ${STACK_NAME}"
echo ""
echo "If this is a first deploy or database migration, run the following drush commands:"
echo "  CONTAINER=\$(docker ps -q -f name=${STACK_NAME}_drupal)"
echo "  docker exec \$CONTAINER sh -c 'cd /opt/drupal && vendor/bin/drush updatedb -y'"
echo "  docker exec \$CONTAINER sh -c 'cd /opt/drupal && vendor/bin/drush cache-rebuild'"
