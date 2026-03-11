# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install          # Install dependencies
yarn dev              # Start development server (http://localhost:3000)
yarn build            # Build for production
yarn preview          # Preview production build
yarn lint             # Run ts-standard linter
yarn lint:fix         # Fix linting issues automatically
```

## Architecture

This is a Nuxt 4 headless frontend for the CBD (Convention on Biological Diversity) website. It fetches content from a Drupal CMS backend and external CBD APIs.

### Data Flow

```
Drupal CMS (content)  ─┐
CBD Solr API (search) ─┼─► api/ (server routes) ─► services/ (business logic) ─► composables/ (Vue hooks) ─► components/
Thesaurus API         ─┘
```

### Key Directories

- `api/` - Server-side API route handlers (Nitro endpoints)
- `services/` - Business logic layer that wraps API clients and transforms data
- `app/composables/api/` - Vue composables exposing data to components (use-*-api.ts pattern)
- `types/` - TypeScript type definitions, organized by domain
- `i18n/` - Translations for 6 UN languages (ar, en, es, fr, ru, zh)
- `infra/router/` - Reverse proxy routing app (deployed separately, has its own Dockerfile)

### Nginx Reverse Proxy (`infra/router/`)

A separate nginx-based Docker service that sits in front of the Nuxt app and routes traffic to multiple backends. It is deployed independently from the Nuxt app (excluded from the main `.dockerignore`).

**Routing priority (order of evaluation):**

1. **Drupal admin** (`/admin`, `/user`, `/themes/`, `/modules/`, `/sites/default/files`, locale node/history/contextual/editor paths) → Drupal CMS
2. **Legacy CMS portals** (`/meetings/*`, `/conferences`, `/documents`, `/decisions/*`, `/doc/*`, plus portal routes like `/ebsa`, `/lbcd`, `/kronos`, `/participation`, etc.) → Legacy CMS via SNI proxy
3. **Gaia documents** (`/doc/c/*`, `/doc/interventions/*`) → S3 (gaia.documents bucket)
4. **Static content files** (`/content/files/*`, `/content/images/*`) → Drupal (rewritten to `/sites/default/files/`)
5. **API** (`/api/v*`) → api.cbd.int
6. **Static file extensions** (`.pdf`, `.docx`, `.jpg`, etc.) → Nuxt first, fallback to Legacy CMS on 404
7. **Default** (`/`) → Nuxt app, fallback to legacy www on 404

**Configuration:** Uses `envsubst` templates (`.conf.template` files) processed at container startup. Environment variables define upstream hosts/ports (see `infra/router/Dockerfile` for defaults).

**Files:**
- `infra/router/Dockerfile` - Alpine-based nginx image with template configs
- `infra/router/templates/default.conf.template` - Main server block with all routing rules
- `infra/router/conf.d/proxy-params.conf` - Shared proxy headers (Host, X-Real-IP, X-Forwarded-*)
- `infra/router/templates/snippets/drupal-dev-proxy.conf.template` - Drupal-specific proxy overrides (dev/localhost)
- `infra/router/templates/snippets/legacy-cms-sni-proxy.conf.template` - SNI proxy settings for legacy CMS
- `infra/router/templates/snippets/traefik-portal-routes.conf.template` - Portal routes normally handled by Traefik (dev/preview only)

### External Dependencies

- **@scbd/vue-components** - Shared Vue component library
- **api-client** - Shared API client with error handling utilities

### Content Types

Content flows from Drupal as JSON:API and is normalized in `services/drupal.ts`:
- `Page` - Basic CMS pages with optional menu association
- `Article` - News/blog content with cover images
- `Menu` - Hierarchical navigation structures with caching
- `Portal` - Portal card configurations

## Naming Conventions (SCBD Standards)

- **Variables/functions/parameters**: camelCase
- **Classes**: PascalCase
- **Constants/env vars**: UPPER_SNAKE_CASE
- **Files/directories**: kebab-case
- **Vue composables**: `use-{name}.ts` pattern
- **API composables**: `use-{resource}-api.ts` pattern

### Function Naming

- `get*` - Throws error if not found
- `find*` - Returns null if not found
- `list*` / `search*` - Returns arrays

## Environment Variables

Required in `.env`:
- `NUXT_DRUPAL_BASE_URL` - Drupal CMS API URL
- `NUXT_API_BASE_URL` - CBD API URL (Solr, etc.)
- `NUXT_ORT_URL` - ORT service URL

## Git Workflow

- Branch naming: `{type}/{ticket-id}-{short-description}` (e.g., `feature/CIR-123-add-search`)
- Branch types: feature/, bugfix/, hotfix/, release/, chore/, docs/, test/, spike/
- Use conventional commits with imperative mood, lowercase
- PRs require 2 approvals (1 from senior developer) for master merges

**Important**: When creating git commits, do NOT include `Co-Authored-By: Claude` in commit messages. Commits should be attributed solely to the human developer.

## Linting

Uses ts-standard (TypeScript Standard Style). Run `yarn lint:fix` before committing.
