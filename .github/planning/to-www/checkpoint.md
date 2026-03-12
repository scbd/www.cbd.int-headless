# Checkpoint

**Current phase:** Phase 01
**Last completed:** `p01-02c-calendar-utilities-jsdoc` — module-level JSDoc headers, @example annotations, and type/constant documentation across all 12 utility files
**Next task:** `phase-02/p02-01a-calendar-solr-service.md`
**Updated:** 2026-03-12T21:00:00Z

## State

- p01-01a complete: types, constants, plugin, dependencies installed
- p01-01b complete: vitest infrastructure, 37 unit tests (14 type, 23 constant), 100% coverage on constants
- p01-01c complete: JSDoc comments on all exported symbols (types, constants, plugin)
- p01-02a complete: 12 utility files in utils/calendar/ (solr-normalize, text, document-processing, status, labels, date, decision-links, notifications, type-colors, subjects, subsidiary-body-mappings, index barrel)
- p01-02b complete: 9 test files with 398 unit tests, 97%+ coverage on utility modules
- p01-02c complete: JSDoc comments on all exported symbols in utils/calendar/
- Plan fully drafted, reviewed, and reconciled
- 7 phases with 15 task groups (39 sub-task files: 12 × 3 triplets + 3 E2E)
- **Shared contracts frozen** in [shared-contracts.md](shared-contracts.md) — all phases must conform
- **Migration regression checklist** in [migration-regression-checklist.md](migration-regression-checklist.md) — 5 known bugs tracked
- Jira tickets created just-in-time when each task starts (no separate Phase 00)
- Ticket specs preserved in `phase-00/jira-ticket-reference.md`
- Branching convention: `{JIRA-ID}-short-task-description`
- Commit convention: `{JIRA-ID} description of change`
- Parent Jira ticket: DEV-739

## Reconciliation Pass (2026-03-12)

Changes made to align roadmap with actual task files:
1. ✅ **Roadmap rewritten** — 22 old-style entries replaced with 15 task groups using a/b/c triplet notation matching actual files
2. ✅ **p06-01a dependencies fixed** — removed non-existent `p04-02a` and `p05-04a`, replaced with actual `p04-01a` and `p05-03a`
3. ✅ **Migration regression checklist created** — was referenced but missing; now contains MR-01 through MR-05
4. ✅ **Total time corrected** — was 57h 30m (math error), actual sum is 60h
5. ✅ **Task counts corrected** — 15 task groups, 39 sub-task files (not 22 tasks)

## Review Alignment (2026-03-12)

Changes made to address review findings:
1. ✅ **Shared contracts** — Created `shared-contracts.md` freezing API response shape (SC-01), API path (SC-02), composable signature (SC-03), query params (SC-04), pagination API (SC-05), page layout (SC-06), SearchList data flow (SC-07), GroupedItem shape (SC-08), i18n build path (SC-09), navigation dependency (SC-10)
2. ✅ **p06-01a rewritten** — Pagination now uses `currentPage`/`totalPages`/`@update:page` (matches real `search/pagination.vue`). Page uses `definePageMeta({ layout: 'home' })` + `<async-block>`. SearchList owns data fetching internally. `numFound` → `total` everywhere.
3. ✅ **Phase 07 restructured** — p07-01a is now infrastructure bootstrap (Playwright install, config, scripts). Calendar E2E tests start in p07-02a. Context corrected to note Playwright is NOT installed.
4. ✅ **Navigation dependency explicit** — AD-09 added to index.md. SC-10 in shared-contracts. Phase-06/context.md and p06-01a updated to note Drupal-driven menu.
5. ✅ **Migration regression checklist** — Created with 5 items (MR-01 through MR-05) sourced from source app docs. Referenced from test tasks and relevant code tasks.

## Phase Summary

| Phase | Task Groups | Sub-tasks | SP | Time (code) | Description |
|-------|-------------|-----------|----|----|-------------|
| 01 | 2 | 6 | 11 | 8h 15m | Foundation — Types, constants, plugin, utilities |
| 02 | 2 | 6 | 18 | 13h 30m | Service & API — Solr service, server routes |
| 03 | 2 | 6 | 9 | 6h 45m | Composables — Calendar data, thesaurus filters |
| 04 | 1 | 3 | 8 | 6h | Search & Filter UI — vue-multiselect filters |
| 05 | 3 | 9 | 16 | 12h | Display — Cards, detail panels, helper components |
| 06 | 2 | 6 | 10 | 7h 30m | Page Assembly — Page, search-list, navigation, i18n |
| 07 | 3 | 3 | 8 | 6h | E2E Testing — Infra bootstrap, page tests, filtering, pagination |
| **Total** | **15** | **39** | **80** | **60h** | |

## Notes

- **Shared contracts** in `shared-contracts.md` — all phases must conform
- **Migration regression checklist** in `migration-regression-checklist.md` — verified in tests
- Jira tickets are created JIT when starting each task — specs in `phase-00/jira-ticket-reference.md`
- vue-multiselect must be installed in p01-01a before phase 04
- Phases 04 and 05 can run in parallel (independent UI components)
- Phase 07 E2E tasks are already all-in-one (they ARE tests)
- Navigation link requires Drupal CMS decision (see AD-09 / SC-10)
- Review items from `claude-review.md` to address during implementation:
  - C-02: Type-safe `SolrFacetedQuery` interface (p02-01a)
  - C-05: Defer FontAwesome — use Bootstrap Icons or inline SVG instead (p01-01a)
  - I-05: Defer `fuse.js` — start with vue-multiselect's built-in search (p01-01a)
  - I-07: Use `<NuxtTime>` for date display in templates (p05-01a, p05-02a)
