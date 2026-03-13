#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# deploy-db.sh — idempotent DB stack deploy
#
# Usage:
#   bash infra/deploy/deploy-db.sh
#
# Sources .env if present. Safe to run against a live cluster (no teardown).
# ---------------------------------------------------------------------------
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Source .env if present
if [ -f "${SCRIPT_DIR}/.env" ]; then
  set -a; source "${SCRIPT_DIR}/.env"; set +a
fi

DB_STACK_NAME="${DB_STACK_NAME:-www-db}"
MYSQL_DATABASE="${MYSQL_DATABASE:-www-cms}"
MYSQL_USER="${MYSQL_USER:-drupal}"

# ---------------------------------------------------------------------------
# Ensure www_db_net overlay network exists
# ---------------------------------------------------------------------------
docker network inspect www_db_net >/dev/null 2>&1 || \
  docker network create --driver overlay --attachable www_db_net
echo "Network www_db_net ready."

# ---------------------------------------------------------------------------
# Deploy DB stack
# ---------------------------------------------------------------------------
MYSQL_DATABASE="${MYSQL_DATABASE}" \
MYSQL_USER="${MYSQL_USER}" \
  docker stack deploy --detach=true -c "${INFRA_DIR}/db-stack.yml" "${DB_STACK_NAME}"
echo "Stack '${DB_STACK_NAME}' deployed."

# ---------------------------------------------------------------------------
# Wait for MariaDB to be ready
# Probe via a temp container on www_db_net — works across Swarm nodes.
# The root password is read from the Docker secret mounted into the container.
# ---------------------------------------------------------------------------
echo "Waiting for MariaDB to be ready..."
until docker run --rm \
    --network www_db_net \
    alpine \
    sh -c 'nc -z mariadb 3306' \
    &>/dev/null; do
  echo "  ...not ready yet, retrying in 5s"
  sleep 5
done
echo "MariaDB is ready."
