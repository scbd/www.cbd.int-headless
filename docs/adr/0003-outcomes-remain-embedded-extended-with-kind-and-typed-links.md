---
status: accepted
date: 2026-07-09
deciders: [randy]
context: "COA Authoring & Indexing"
code-path: gaia controllers/calendar-of-activities/ (outcomes schema); docs/coa-2026-07-09/
origin: standalone
---

# 0003. Outcomes remain embedded on the calendar activity, extended with kind and typed links

Production Outcomes extend gaia's existing embedded `outcomes` array (`{date, outcomeDetail:
lString, url}`) with a `kind` field (activity / report / meeting / notification / multiple) and a
`links` array of typed references (schema name plus identifier), rather than becoming a separate
collection and endpoint set. One save from the strata activity form carries the activity and its
Outcomes together, keeping the existing version-snapshot, linkage-upsert, and
single-indexing-message semantics, and the indexer's outcome fields extend in place (agreed by
Randy, 2026-07-09).

## Considered options

- **A separate `outcomes` collection with its own endpoints** — rejected: duplicates the
  version-snapshot, linkage-upsert, and indexing-message machinery gaia already runs for the
  embedded array, for no gain over extending it in place.
- **A typed sub-document without `links`** — rejected: the typed `links` array is what lets an
  Outcome reference the meeting / report / notification it summarizes, which the presentation
  layer needs.

## Consequences

- No schema migration to a new collection; the existing embedded array is extended additively.
- Reads stay a single document fetch — the activity and its Outcomes travel together.
- `kind` and `links` become part of the version snapshot and the single indexing message,
  inheriting their existing semantics unchanged.
