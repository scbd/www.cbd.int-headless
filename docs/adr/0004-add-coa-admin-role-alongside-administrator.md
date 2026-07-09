---
status: accepted
date: 2026-07-09
deciders: [randy]
context: "COA Authoring & Indexing"
code-path: gaia controllers/calendar-of-activities/schemas/calendar-of-activities.ts (security block); docs/coa-2026-07-09/
origin: standalone
---

# 0004. Add a COA-ADMIN role alongside Administrator for calendar-activity writes

The COA design run had pinned calendar-activity writes to gaia's existing `Administrator` role (the
only role its security block enforces as built), which meant granting calendar administration
required granting full administrator rights. Randy ruled (2026-07-09) that a dedicated `COA-ADMIN`
role is added in addition: gaia's security lists for create/update/delete/status change become
`['Administrator', 'COA-ADMIN']`, and strata's page guard and the front end's edit/create buttons
gate on holding either role. The `securize` middleware, the owner-may-update rule, and open reads
are unchanged; the role is granted through the existing CBD user administration, and no other role
scheme is introduced.
