#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# load-db.sh — load a SQL dump into MariaDB
#
# Usage:
#   MYSQL_ROOT_PASSWORD=<password> bash infra/deploy/load-db.sh [dump.sql]
#
# Defaults to data/db.bak.sql if no file argument is given.
# Sources .env if present (MYSQL_ROOT_PASSWORD must be set there or in env).
# ---------------------------------------------------------------------------
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Source .env if present
if [ -f "${SCRIPT_DIR}/.env" ]; then
  set -a; source "${SCRIPT_DIR}/.env"; set +a
fi

DUMP_FILE="${1:-${SCRIPT_DIR}/data/db.bak.sql}"
MYSQL_DATABASE="${MYSQL_DATABASE:-www-cms}"

SECRET_FILE="${SCRIPT_DIR}/secrets/www_mysql_root_password"
if [ -z "${MYSQL_ROOT_PASSWORD:-}" ]; then
  if [ ! -f "${SECRET_FILE}" ]; then
    echo "Error: ${SECRET_FILE} not found and MYSQL_ROOT_PASSWORD not set" >&2
    exit 1
  fi
  MYSQL_ROOT_PASSWORD="$(cat "${SECRET_FILE}")"
fi

if [ ! -f "${DUMP_FILE}" ]; then
  echo "Error: dump file not found: ${DUMP_FILE}" >&2
  exit 1
fi

echo "Loading ${DUMP_FILE} into ${MYSQL_DATABASE} on mariadb..."

docker run --rm -i \
  --network www_db_net \
  -e MYSQL_PWD="${MYSQL_ROOT_PASSWORD}" \
  mariadb:10.6.21-focal \
  mariadb -h mariadb -u root "${MYSQL_DATABASE}" \
  < "${DUMP_FILE}"

echo "Done."
