# ADR Index

| # | Decision (≤3 sentences) | Details | Status |
|---|-------------------------|---------|--------|
| [0001](0001-record-architecture-decisions.md) | We record architecturally-significant decisions as ADRs in `docs/adr/`, numbered and immutable. | — | accepted |
| [0002](0002-outcome-write-read-path-follows-gaia-controller-pattern.md) | Outcome writes go through strata → gaia's custom endpoints → MongoDB → message-queue → indexer, mirroring gaia's existing linked-schema re-index fan-out; the front end stays a pure SOLR read-through. | [details](details/0002.md) | accepted |
| [0003](0003-outcomes-remain-embedded-extended-with-kind-and-typed-links.md) | Outcomes stay embedded on the calendar activity, extended with `kind` and typed `links`; no separate collection or endpoints. | — | accepted |
| [0004](0004-add-coa-admin-role-alongside-administrator.md) | A dedicated `COA-ADMIN` role is added alongside `Administrator` for calendar-activity writes; both UIs gate on either role; nothing else in the role model changes. | — | accepted |
