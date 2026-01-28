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

## Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable                      | Description                                              | Required |
|-------------------------------|----------------------------------------------------------|----------|
| `NUXT_DRUPAL_BASE_URL`        | Base URL for Drupal CMS API                              | Yes      |
| `NUXT_DRUPAL_CLIENT_ID`       | OAuth client ID for Drupal authentication                | Yes      |
| `NUXT_DRUPAL_CLIENT_SECRET`   | OAuth client secret for Drupal authentication            | Yes      |
| `NUXT_DRUPAL_SCOPE`           | OAuth scope for Drupal API access (default: `api_scope`) | No       |
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
