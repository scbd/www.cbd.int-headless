---
status: accepted
date: 2026-07-09
deciders: [randy]
context: "COA Authoring & Indexing"
code-path: gaia controllers/calendar-of-activities/ (outcomes schema); docs/coa-2026-07-09/
origin: promoted-from-aadr-0002
---

# 0003. Outcomes remain embedded on the calendar activity, extended with kind and typed links

Production Outcomes extend gaia's existing embedded `outcomes` array (`{date, outcomeDetail:
lString, url}`) with a `kind` field (activity / report / meeting / notification / multiple) and a
`links` array of typed references (schema name plus identifier), rather than becoming a separate
collection and endpoint set. One save from the strata activity form carries the activity and its
Outcomes together, keeping the existing version-snapshot, linkage-upsert, and
single-indexing-message semantics, and the indexer's outcome fields extend in place. Ratifies
[AADR 0002](../aadr/0002-outcomes-remain-embedded-extended-with-kind-and-typed-links.md)
(agreed by Randy, 2026-07-09); alternatives and consequences in
[AADR details](../aadr/details/0002.md).
