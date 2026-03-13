#!/usr/bin/env bash
set -euo pipefail

# Run from anywhere: bash infra/deploy/build.sh [tag]
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
TAG="${1:?Usage: build.sh <tag>}"

echo "Building images — tag: ${TAG}"
echo ""

docker build --platform linux/amd64 \
  --tag "scbd/www-router:${TAG}" \
  "${REPO_ROOT}/infra/router"
echo "  Built: scbd/www-router:${TAG}"

docker build --platform linux/amd64 \
  --tag "scbd/www-nuxt:${TAG}" \
  "${REPO_ROOT}"
echo "  Built: scbd/www-nuxt:${TAG}"

docker build --platform linux/amd64 \
  --tag "scbd/www-drupal:${TAG}" \
  "${REPO_ROOT}/infra/drupal"
echo "  Built: scbd/www-drupal:${TAG}"

echo ""
echo "Done. Deploy with: bash infra/deploy/test.sh"
