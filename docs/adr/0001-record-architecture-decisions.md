---
status: accepted
date: 2026-07-09
deciders: [randy]
context: system-wide
origin: standalone
---

# 0001. Record architecture decisions

We will record architecturally-significant decisions as Architecture Decision Records in `docs/adr/`, following the repository's ADR format (a three-sentence summary in the ADR file, with any overflow in a matching `details/<n>.md`). Decisions are numbered sequentially and immutable once accepted; a decision is changed by superseding it with a new ADR, never by editing the old one. This repo also carries a COA-specific context map at `docs/coa-2026-07-09/CONTEXT-MAP.md`, so ADRs governing that scope may set `context:` to one of its named bounded contexts (for example `COA Authoring & Indexing`) instead of `system-wide`.
