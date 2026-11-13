# www.cbd.int-headless

Nuxt 4 headless frontend for the CBD website.

## Setup

Install dependencies:

```bash
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

## Storybook

Every component in `app/components` has a colocated `*.stories.ts`. Stories need no backend: data components get
their `/api/*` responses from `parameters.api`, using the typed fixtures in `.storybook/fixtures`.

```bash
yarn storybook          # http://localhost:6006
yarn build-storybook    # static build in storybook-static/
yarn preview-storybook  # serve the static build at http://127.0.0.1:6007
```

## Tests

```bash
yarn test               # every story as a browser test: render, play function, a11y checks
yarn test:visual        # visual regression against the baselines in .storybook/__screenshots__ (needs Docker)
yarn test:visual --update-snapshots   # accept visual changes; commit the updated PNGs
```

Run `yarn playwright install chromium` once before `yarn test`.

- **Accessibility:** violations fail the test. Story files with known violations carry an
  `a11y: { test: 'todo' }` "a11y debt" line naming the rules; fix the component, then delete that line.
- **Visual baselines are Linux-only** (fonts render differently per OS), so `yarn test:visual` always runs in the
  Playwright Docker image, locally and in CI. Diffs of a failed run are in `.storybook/test-results/`.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable                      | Description                                              | Required |
|-------------------------------|----------------------------------------------------------|----------|
| `NUXT_DRUPAL_BASE_URL`        | Base URL for Drupal CMS API                              | Yes      |
| `NUXT_API_BASE_URL`           | Base URL for CBD API (Solr, Thesaurus)                   | Yes      |
| `NUXT_ORT_URL`                | Base URL for ORT service                                 | Yes      |
| `NUXT_PUBLIC_GTAG_ID`         | Google Analytics tracking ID                             | No       |

## Docker

Build the Docker image:

```bash
docker build -t cbd-headless .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env cbd-headless
```

## Documentation

- [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction)
- [Deployment documentation](https://nuxt.com/docs/getting-started/deployment)
