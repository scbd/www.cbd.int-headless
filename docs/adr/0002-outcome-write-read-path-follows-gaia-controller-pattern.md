---
status: accepted
date: 2026-07-09
deciders: [randy]
context: "COA Authoring & Indexing"
code-path: gaia controllers/calendar-of-activities/ (write path, MQ indexing); docs/coa-2026-07-09/
origin: standalone
---

# 0002. Outcome write/read path follows the existing gaia controller pattern

The COA production design run (`docs/coa-2026-07-09/prompt.md`, Fixed decision 5) needed a write and read path for the new Outcome records attached to calendar activities. Randy ruled that strata calls gaia's custom endpoints, gaia writes its MongoDB collection then publishes a message-queue message for indexing, and the indexer updates the SOLR document and re-indexes related documents so cross-links stay current, mirroring gaia's existing linked-schema re-index fan-out (`controllers/calendar-of-activities/services/db.ts` `upsertSchemaLinkages`, `utils/index.ts` `queueLinkedSchemaReindex`), while the front end stays a pure SOLR read-through and eventual consistency is accepted. This reuses one proven write path and existing indexing plumbing instead of inventing a second one.

See [details](details/0002.md).
