# nginx reverse proxy

Nginx-based reverse proxy that sits in front of the Nuxt app and routes traffic to multiple backends. Deployed independently from the Nuxt application.

## Build

```bash
docker build -t scbd/www-router ./nginx
```

## Run

```bash
docker run -p 80:80 --env-file default.env scbd/www-router
```

## Routing Priority

Requests are evaluated in the following order:

1. **Drupal admin**           — `/admin`, `/user`, `/themes/`, `/modules/`, `/sites/default/files`, locale `node/history/contextual/editor` paths
2. **Legacy CMS portals**     — `/meetings/*`, `/conferences`, `/documents`, `/decisions/*`, `/doc/*`, plus portal routes (`/ebsa`, `/lbcd`, `/kronos`, `/participation`, etc.)
3. **Gaia documents**         — `/doc/c/*`, `/doc/interventions/*` via S3
4. **Static content files**   — `/content/files/*`, `/content/images/*` rewritten to Drupal `/sites/default/files/`
5. **API**                    — `/api/v*` proxied to `api.cbd.int`
6. **Static file extensions** — `.pdf`, `.docx`, `.jpg`, etc. served by Nuxt with Legacy CMS fallback on 404
7. **Default**                — Everything else to Nuxt app with Legacy CMS fallback on 404

## Environment Variables

All variables must be provided at runtime (see `default.env` for defaults) and are processed at container startup via `envsubst`.

### Nuxt App

| Variable    | Description                    | Default    |
|-------------|--------------------------------|------------|
| `NUXT_HOST` | Hostname of the Nuxt container | `www-nuxt` |
| `NUXT_PORT` | Port of the Nuxt container     | `3000`     |

### Drupal CMS

| Variable       | Description                      | Default  |
|----------------|----------------------------------|----------|
| `DRUPAL_HOST`  | Hostname of the Drupal container | `drupal` |
| `DRUPAL_PORT`  | Port of the Drupal container     | `80`     |

### Legacy CMS

| Variable                   | Description                                  | Default                      |
|----------------------------|----------------------------------------------|------------------------------|
| `LEGACY_CMS_HOST`          | Hostname of the legacy CMS (SNI proxy)       | `legacy-www.cbd.int`         |
| `LEGACY_CMS_PORT`          | Port of the legacy CMS                       | `443`                        |
| `LEGACY_WWW_FALLBACK_URL`  | Base URL for 404 fallback redirects          | `https://legacy-www.cbd.int` |

### Webgateway

| Variable           | Description                          | Default      |
|--------------------|--------------------------------------|--------------|
| `WEBGATEWAY_HOST`  | Hostname of the webgateway container | `webgateway` |
| `WEBGATEWAY_PORT`  | Port of the webgateway container     | `83`         |

### API

| Variable   | Description                  | Default       |
|------------|------------------------------|---------------|
| `API_HOST` | Hostname of the CBD API      | `api.cbd.int` |
| `API_PORT` | Port of the CBD API          | `443`         |

### S3 / Gaia Documents

| Variable                 | Description                                | Default                      |
|--------------------------|--------------------------------------------|------------------------------|
| `GAIA_DOCS_S3_ENDPOINT`  | S3 endpoint for Gaia document storage      | `s3.us-east-1.amazonaws.com` |

## Configuration Files

```
nginx/
├── Dockerfile                                          # Alpine-based nginx image
├── conf.d/
│   └── proxy-params.conf                               # Shared proxy headers and buffer settings
└── templates/                                          # envsubst templates (processed at startup)
    ├── default.conf.template                           # Main server block with all routing rules
    └── snippets/
        ├── drupal-dev-proxy.conf.template              # Drupal proxy overrides for dev/localhost
        ├── legacy-cms-sni-proxy.conf.template          # SNI proxy settings for legacy CMS
        └── traefik-portal-routes.conf.template         # Portal routes (dev/preview only)
```

Files in `templates/` use nginx's `envsubst` mechanism: `.conf.template` files are processed at container startup, substituting `${VAR}` references with environment variable values, and the output is written to `/etc/nginx/conf.d/`.

Files in `conf.d/` are static and copied directly into the image.
