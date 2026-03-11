#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# init-secrets.sh — Create Docker Swarm secrets from files in secrets/
#
# Place secret values in infra/deploy/secrets/<secret-name> (one value per
# file, no trailing newline). The secrets/ folder is gitignored.
#
# Secret files expected:
#   secrets/www_mysql_root_password
#   secrets/www_db_password
#   secrets/www_redis_password
#   secrets/www_hash_salt
# ---------------------------------------------------------------------------
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SECRETS_DIR="${SCRIPT_DIR}/secrets"

if [ ! -d "${SECRETS_DIR}" ]; then
  echo "Error: secrets directory not found at ${SECRETS_DIR}"
  echo "Create it and populate the required secret files before running."
  exit 1
fi

create_secret() {
  local name="$1"
  local file="${SECRETS_DIR}/${name}"

  if [ ! -f "${file}" ]; then
    echo "Error: missing secret file: ${file}"
    exit 1
  fi

  docker secret create "${name}" "${file}" 2>/dev/null \
    || echo "secret ${name} already exists, skipping"
}

create_secret www_mysql_root_password
create_secret www_db_password
create_secret www_redis_password
create_secret www_hash_salt

echo "Secrets ready."
