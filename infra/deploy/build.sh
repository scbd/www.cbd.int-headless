#!/usr/bin/env bash
set -euo pipefail

# Run from anywhere: bash infra/deploy/build.sh [tag]
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
TAG="${1:-local}"

echo "Building images — tag: ${TAG}"
echo ""

docker build --platform linux/amd64 \
  --tag "scbd/www-router:${TAG}" \
  "${REPO_ROOT}/infra/router"
echo "  Built: scbd/www-router:${TAG}"

docker build --platform linux/amd64 \
  --tag "scbd/www-app:${TAG}" \
  "${REPO_ROOT}"
echo "  Built: scbd/www-app:${TAG}"

docker build --platform linux/amd64 \
  --tag "scbd/www-cms:${TAG}" \
  "${REPO_ROOT}/infra/drupal"
echo "  Built: scbd/www-cms:${TAG}"

echo ""
echo "Done. Deploy with: bash infra/deploy/test.sh"
