#!/usr/bin/env sh
# Visual regression tests, run inside the Playwright Linux image so screenshots match CI on any host.
# Usage: yarn test:visual [--update-snapshots] [playwright test filters, e.g. --grep meeting]
# The container keeps its own node_modules and .nuxt in named volumes: the host's are built for the host OS.
set -e

# Must match the exact `@playwright/test` / `playwright` devDependencies (each version ships its own Chromium)
IMAGE=mcr.microsoft.com/playwright:v1.65.0-noble

docker run --rm --platform linux/amd64 --ipc=host \
  -v "$PWD":/work -w /work \
  -v cbd-headless-visual-node-modules:/work/node_modules \
  -v cbd-headless-visual-nuxt:/work/.nuxt \
  -e CI \
  "$IMAGE" sh -c '
    npm install --global --silent yarn@1.22.22 >/dev/null
    yarn install --frozen-lockfile --network-concurrency 1 --silent
    yarn -s build-storybook --quiet
    yarn -s playwright test --config .storybook/playwright.config.ts "$@"
  ' sh "$@"
