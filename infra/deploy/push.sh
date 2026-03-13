#!/usr/bin/env bash
# Push locally built images to Docker Hub.
# Usage: bash infra/deploy/push.sh <tag>
set -euo pipefail

TAG="${1:?Usage: push.sh <tag>}"

echo "Pushing images — tag: ${TAG}"
echo ""

docker push "scbd/www-router:${TAG}"
echo "  Pushed: scbd/www-router:${TAG}"

docker push "scbd/www-nuxt:${TAG}"
echo "  Pushed: scbd/www-nuxt:${TAG}"

docker push "scbd/www-drupal:${TAG}"
echo "  Pushed: scbd/www-drupal:${TAG}"

echo ""
echo "Done."
