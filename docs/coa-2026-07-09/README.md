# Calendar of Activities — production design set (2026-07-09)

The full design-document set for taking the Calendar of Activities (COA) from approved
prototype to production across three projects: **gaia** (API, system of record),
**strata** (create/edit form), and **www.cbd.int-headless** (public search front end,
this repo — the docs hub). The run mandate and every fixed decision are in
[prompt.md](prompt.md); the COP mandate summary is in [mandate.md](mandate.md).

## Why this set exists

COP Decision 16/25 asks the Secretariat to give focal points a yearly calendar of
activities and actions. The prototype proved the search experience; production needs the
three missing pieces this set designs: an authoring form (strata), result records
(Outcomes, in gaia), and a real home in the production site — including a top-navigation
menu entry, because a calendar nobody can find from the site menu might as well not exist
(folded from the fast-www plan, DEV-842).

## Reading order

| # | Document | What it answers |
|---|---|---|
| 1 | [prd.md](prd.md) | Hub PRD — shared domain, workflow, roles, cross-project flows, Deferred register |
| 2 | [gaia-prd.md](gaia-prd.md) · [strata-prd.md](strata-prd.md) · [www.cbd.int-headless-prd.md](www.cbd.int-headless-prd.md) | Each project's requirements |
| 3 | [CONTEXT.md](CONTEXT.md) | The domain glossary (ubiquitous language) |
| 4 | [CONTEXT-MAP.md](CONTEXT-MAP.md) | How the three bounded contexts relate |
| 5 | [architectural-plan.md](architectural-plan.md) | Hub architecture — system overview, end-to-end flows, verification checklist |
| 6 | [gaia-arch-plan.md](gaia-arch-plan.md) · [strata-arch-plan.md](strata-arch-plan.md) · [www.cbd.int-headless-arch-plan.md](www.cbd.int-headless-arch-plan.md) | Each project's design |
| 7 | [gaia-seam-options.md](gaia-seam-options.md) · [strata-seam-options.md](strata-seam-options.md) · [www.cbd.int-headless-seam-options.md](www.cbd.int-headless-seam-options.md) | Rival ways to cut each project's work into pull requests, with a recommendation |

Decisions of record live in the repo docs tree, not here: the ADRs in
[../adr/](../adr/index.md) (0002 write path, 0003 embedded Outcomes, 0004 COA-ADMIN role).

## How it was produced

PRDs, then architectural plans, then seam options — each set adversarially reviewed
(war-games and devil's-advocate passes for the PRD and architecture sets, per-spoke
seam-critic reviews for the seam set) with accepted findings folded before the next set
started. Codebase claims were verified against the three working trees; SCBD software
development and deployment standards bind the stack, naming, CI, and Swarm deployment
choices throughout.
