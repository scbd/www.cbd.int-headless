#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# migration-init.sh — Run post-deploy Drupal tasks via docker exec.
#
# Run once after deploying the stack when migrating an existing database.
# Not part of the normal container startup to avoid:
#   - Scaling races (multiple replicas running updatedb simultaneously)
#   - Slow restarts on every crash/redeploy
# ---------------------------------------------------------------------------
set -euo pipefail

STACK_NAME="${1:-cbd}"

CONTAINER=$(docker ps -q -f name="${STACK_NAME}_drupal")
if [ -z "${CONTAINER}" ]; then
  echo "Error: no running drupal container found in stack '${STACK_NAME}'"
  exit 1
fi

echo "Running drush updatedb..."
docker exec "${CONTAINER}" sh -c 'cd /opt/drupal && vendor/bin/drush updatedb -y'

echo "Rebuilding cache..."
docker exec "${CONTAINER}" sh -c 'cd /opt/drupal && vendor/bin/drush cache-rebuild'

echo "Migration init complete."
