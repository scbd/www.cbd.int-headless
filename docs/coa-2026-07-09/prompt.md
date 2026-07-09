# COA production design run — 2026-07-09

## Goal

Draft the production design document set for the Calendar of Activities (COA) as a
hub-and-spoke system: PRDs, ADRs, DDD docs (CONTEXT.md + CONTEXT-MAP.md), an architectural
plan per spoke, and a seam-options document per spoke. The guiding mandate is
`@plans/COA/v2.md` — it supplies the domain framing and the
Action/Activity ontology; the functional baseline is the prototype PRD plus the Fixed
decisions below.

Approach this as a fresh start: the prototype exists and its features are approved and carry
into production, but draft as if designing from the prototype forward, not patching it.

## Hub and spokes

The hub (docs home) is `www.cbd.int-headless`. The spokes:

| Spoke | Path | Role |
|---|---|---|
| gaia | `@COA/gaia` | API service |
| strata | `@COA/strata` | Create/edit screen for calendarActivity; future: notifications and meetings |
| www.cbd.int-headless | `@scbd/www.cbd.int-headless` | Front-end search; production implementation of the prototype |

## Deliverables

All deliverables live in
`docs/coa-2026-07-09/`.
This placement deliberately OVERRIDES the default in-repo `docs/` locations in the
docs-prd, docs-context-map, and docs-architectural-planner skills — one consolidated set
here, not scattered per repo. Exactly these files (plus this `prompt.md` and a `README.md`
index); nothing else:

1. **PRDs** (skill: `docs-prd`, plan-level mode) — `prd.md` (hub) plus `gaia-prd.md`,
   `strata-prd.md`,
   `www.cbd.int-headless-prd.md`. Split rule: the hub PRD carries the canonical shared
   domain, workflow, cross-spoke flows, and the Deferred register; each spoke PRD carries
   that spoke's owned responsibilities plus whatever restated hub context it needs to be
   independently readable, labeled "from hub PRD §x". Labeled overlap is sanctioned;
   unlabeled divergence is not.
2. **DDD docs** (skills: `docs-domain-modeling` for `CONTEXT.md`, `docs-context-map` for
   `CONTEXT-MAP.md`) — `CONTEXT.md` (glossary/domain model) and `CONTEXT-MAP.md`.
3. **Architectural plans** (skill: `docs-architectural-planner`; diagrams via
   `docs-architecture` conventions) — `architectural-plan.md` (hub) plus
   `gaia-arch-plan.md`, `strata-arch-plan.md`, `www.cbd.int-headless-arch-plan.md`
   (at the file paths above).
4. **Seam options** (skill: `pr-decomposition` in its report mode; then critique each set
   with `pr-seam-critic` / the `agent-seam-critic` subagent) — `gaia-seam-options.md`,
   `strata-seam-options.md`,
   `www.cbd.int-headless-seam-options.md`. Model each on this example (local cached copy:
   `@plans/COA/decomp-seams-example.md`; source:
   <https://raw.githubusercontent.com/scbd/drupal-module-scbd-field-js/ff2e4e76a70fdfd9b0dc45952ae7cab6358bf35f/docs/decomp-seams.md>).
   Model the example's *logical* approach (rival seamings, independence test, trade-offs) —
   do NOT fabricate LOC counts or file paths for code that does not exist yet; cite real
   existing files where relevant.
5. **ADRs** (skill: `docs-adrs` for architecturally-significant decisions) — in the repo
   root docs tree (`docs/adr/`), NOT in `coa-2026-07-09/`. The directory does not exist yet —
   initialize the practice on first use (skill baseline, sequential numbering from 0001).

No implementation plans and no source code in this run.

## Fixed decisions

1. The prototype's features are approved and all transfer to production, plus the edit
   buttons and Outcomes additions below. Prototype:
   `@COA/calendar-of-activities-and-actions`
   (functionality: its `docs/prd.md`).
2. The API service lives in **gaia**. The create/edit form lives in **strata**.
3. Strata gets only the form — create new, or edit existing. No list page and no menu entry
   in strata for now. Strata's future notification/meeting editing is out of scope: one
   line in the strata PRD's Out of Scope section and one row in the hub Deferred register;
   no design work for it.
4. The front end shows edit buttons only to users with the required roles; clicking one
   links to the strata edit form for that record. It also shows a "create activity" entry
   point for the same roles, linking to the strata create form (otherwise creation is
   unreachable — strata has no menu). Roles: the prototype has NO auth or role model (it is
   a pure anonymous read-through), so roles come from gaia only. Locate and name the
   concrete roles gaia enforces for creating/editing calendarActivity records, citing file
   paths. If gaia defines no such roles, that is a hard-blocker Question (see Question
   protocol) — never invent a role scheme, and never auto-decide auth/role naming. The
   front end uses the standard CBD login to establish the user's roles.
5. **New requirement — Outcomes.** An Outcome records what happens after an activity.
   Outcome kinds: a new activity, a report, a meeting, a notification, or multiple items
   (e.g. a set of nominations), including future meeting activities with notifications.
   An Outcome links to — and in a future version can create — activities, and links to the
   meeting/report/notification artifact when that artifact exists in the system; when it
   does not, store a plain note describing what it is.
   Ownership: gaia stores and serves Outcomes; strata creates and edits them (alongside the
   activity form); the front end displays them.
   Boundary: Outcomes are post-activity result records only. They link to artifacts or hold
   a note; they do not represent obligations, tasks, deadlines, nomination workflows, or
   any "action required" behavior — they are not a back door for Action features.
   Read/write path (decided by Randy, 2026-07-09): follow the existing gaia controller
   pattern. Strata calls gaia's custom endpoints; gaia writes to its mongo collection and
   then sends an MQ message for indexing; the indexer updates the SOLR document AND
   reindexes related index documents so cross-links stay current — mirror the similar
   cross-linking reindex already implemented in gaia (find and cite it in the gaia arch
   plan). The front end stays a pure SOLR read-through; eventual consistency is accepted.
6. Production front-end code follows the existing style and conventions of
   `www.cbd.int-headless`; the prototype re-implementation must be consistent with that
   codebase. Each spoke's docs follow that spoke's codebase conventions.
7. **Actions are out of scope** for this version — meaning Actions as a first-class
   record/entity and any Action workflow. The prototype's existing "action required by
   Parties" filter/flag and actionDeadline behaviors are approved features and STAY,
   documented as activity metadata (this resolves the apparent conflict with decisions 1
   and 8). The glossary keeps the Action entity, marked out of scope.
8. Keep every feature already implemented in the API and indexers — nothing is dropped.
   Parity baseline for "nothing dropped" is the prototype PRD's feature list; verify named
   fields/behaviors in gaia with targeted searches only — no exhaustive indexer audit
   unless a parity item cannot be traced.
9. Resolve all inconsistencies and open questions in this final version. The only allowed
   exceptions are items explicitly parked in a **Deferred register** section of the hub
   `prd.md`, each with a one-line reason. The prototype PRD's own flagged defects and
   "the rebuild must decide" items are NOT Question-protocol forks: resolve each with the
   most defensible call and record the choice in one line in the relevant spoke PRD,
   reserving ADRs for choices that change approved scope.
10. Never use "draft" as a workflow state name — the state is **unpublished**. (This is
    about state naming only; the `calendar-of-activities-draft-1/2` reference folder names
    are fine.)
11. **Mermaid style:** never the experimental `C4Context` diagram type (the illegible style
    in `docs/architecture.md`
    section "2. System Context (C4 L1)"). Always plain Mermaid `flowchart` (the style used
    in that same doc from section 3 onward).
12. Every C4 L1 (context) diagram carries a footnote explaining what "C4 L1" means, with
    links to sources.
13. Every generated markdown deliverable (except this prompt.md and README.md) includes at
    least one useful Mermaid diagram; add more wherever they clarify workflow, ownership,
    lifecycle, data flow, or seams — never decorative diagrams.
14. Write explanatory prose at a grade-6 reading level. Explain any complex concept in
    plain words first, then reference the source in a footnote with a link. This applies to
    prose only — requirement tables, field names, and code identifiers stay precise. Run
    each finished doc through `ref-humanizer` before shipping it.
15. **Reference precedence** when sources conflict: `v2.md` governs the mandate, domain
    ontology, and legal scope; the prototype `docs/prd.md` governs approved front-end
    behavior wherever it does not conflict with `v2.md`; draft-2, then draft-1, are
    secondary references. Apply the precedence without asking and record each applied
    conflict in a footnote — unless the conflict changes approved behavior or ontology, in
    which case use the Question protocol.

## SCBD standards (binding)

All work in this run is SCBD work and must follow the SCBD DevOps standards (private
`scbd/documentation` repo — read each with `gh api`, not the plain/raw URL, which 404s for
an unauthenticated reader):

- **Software Development Standards** — stack, naming conventions, code standards, version
  control, code review.
  `gh api repos/scbd/documentation/contents/devops/software-development-standards.md --jq .content | base64 -d`
- **Deployment Standards** — branching/PR flow, CI pipeline (GitHub Actions), CalVer release,
  Docker Swarm deployment (dev + prod independent), new-service infrastructure, secrets.
  Scope: Node.js apps (Nuxt/Vue/Express/AngularJS) as Docker containers on Swarm — NOT legacy
  IIS apps.
  `gh api repos/scbd/documentation/contents/devops/deployment-standards.md --jq .content | base64 -d`

Read both before drafting and apply them to every design decision, recommended stack, naming
choice, deployment/CI assumption, and workflow in these documents — the gaia and strata arch
plans and all seam options especially must reflect the deployment standard's branching, CI,
release, and Swarm model. Where this prompt's Fixed decisions and a SCBD standard both apply,
follow both; if they genuinely conflict, the SCBD standard wins on technical convention
(naming, stack, VCS, CI/CD, deployment) and this prompt wins on COA scope and feature
decisions — flag any real conflict via the Question protocol.

## Skills and agents to use

Use the repo's own skills (canonical `.agents/skills/`, symlinked per harness) — prefer the
repo skill over any built-in shadow. Delegate heavy or parallelizable steps to subagents via
`harness-subagent-delegation` (classify tier, route to the cheapest capable model) so the main
context stays lean; every dispatch prompt carries the work-inline clause (subagents never
spawn-and-wait).

| Step | Skill (main thread) | Subagent (when delegating) |
|---|---|---|
| PRDs | `docs-prd` | — |
| Domain model / glossary | `docs-domain-modeling`, `docs-context-map` | — |
| Architectural plans | `docs-architectural-planner` | `agent-docs-architectural-planner` |
| Diagram conventions | `docs-architecture` (Mermaid) | — |
| Seam options | `pr-decomposition` | — |
| Seam-option critique | `pr-seam-critic` | `agent-seam-critic` |
| War games (each set) | `ref-war-games` | — |
| Devil's advocate (each set) | `orchestrator-devils-advocate` (codex/agy/claude critics) | — |
| ADRs | `docs-adrs` | — |
| Prose cleanup before shipping each doc | `ref-humanizer` | — |
| Tech-debt / deferred items | `docs-debt` (optional) | — |

## Process

- **Order:** PRDs first, then architectural plans, then seam options.
- **Adversarial gates:** each set (PRDs as a set, arch plans as a set, seam options as a
  set) goes through war games (`ref-war-games` doctrine: simulate implementing from the
  docs to expose gaps) and then devil's advocate (`orchestrator-devils-advocate` skill:
  argue the docs are wrong) before the next set starts. Bounds: one war-game pass plus one
  devil's-advocate pass per set, each capped at its 8 strongest findings; fold accepted
  High findings before moving on; run a second round only if a High fix changed scope or
  architecture; two rounds maximum per set, then list unresolved High findings for Randy.
  Run gates in subagents to protect the main context window. A gate finding whose
  resolution belongs to a later set (e.g. an architecture gap found while gating PRDs) is
  logged as a "forward finding" for that set and does not count toward any stop rule.
- **Question protocol:** when a genuine fork appears, ask Randy in chat (options +
  recommendation, recommended option first) — never with a blocking question tool, and
  keep working on non-dependent parts meanwhile. If no answer within about 5 minutes, make
  the most defensible call yourself, record it as an ADR (docs-adrs skill) in
  `docs/adr/`, and continue.
  **Hard blockers are exempt from the 5-minute auto-decide:** auth/role naming when gaia
  defines no suitable roles, changes to approved scope or ontology, and a High gate
  finding that survives two rounds — for these, stop and wait for Randy.
- **Off-repo / temporary work:** everything transient goes in
  `@plans/COA/<spoke>/` for spoke-specific work, or
  `@plans/COA/` root for cross-cutting work — never in the
  product repos.

## Token economy

- Reuse the reference drafts and the prototype PRD as primary inputs. Do not re-derive what
  they already settle — reconcile their inconsistencies instead (decision 9).
- Read spoke codebases selectively (sample for conventions, routes, models); never read a
  repo end to end.
- Work set by set; do not fan out all three deliverable sets at once.

## Verification (run these before declaring done)

1. The deliverables dir contains exactly Deliverables 1–4 plus `prompt.md` and `README.md`
   (Deliverable 5 — ADRs — lives in the repo root `docs/adr/`).
2. `grep -ri "C4Context" <deliverables dir>` returns nothing.
3. No deliverable uses "draft" as a workflow state (folder names and "draft PR" prose are
   fine).
4. Every deliverable (except `prompt.md` and `README.md`) has at least one Mermaid diagram;
   every C4 L1 diagram has its footnote.
5. The hub `prd.md` contains a Deferred register (even if empty).
6. The adversarial gate passes for all three sets are logged under
   `@plans/COA/`.

## References

- Mandate: `@plans/COA/v2.md`
- Draft 1: `docs/calendar-of-activities-draft-1/`
- Draft 2: `docs/calendar-of-activities-draft-2/`
- Prototype: `@COA/calendar-of-activities-and-actions/`
  (PRD: `docs/prd.md`)
- Seam-options example: the decomp-seams.md URL under Deliverables item 4.
