# Task: Calendar Utilities Tests

**ID:** p01-02b
**Type:** tests
**Status:** complete
**Depends on:** p01-02a
**Context size:** medium
**Branch:** `p01-02b-calendar-utilities-tests`
**Target LOC:** ~300

## Goal

Add comprehensive unit tests for all calendar utility modules from p01-02a.

## Pre-flight

1. Verify clean repo: `git status`
2. Create branch: `git checkout -b p01-02b-calendar-utilities-tests`

## Inputs

- Phase context: `phase-01/context.md`
- p01-02a task file for implementation details

## Steps

Create test files mirroring the utility structure:

1. `test/unit/utils/calendar/status.test.ts` — STATUS_EQUIVALENCES, expandStatusValuesForQuery (all status values), normalizeStatusKey, normalizeStatusLabel, statusColor
2. `test/unit/utils/calendar/labels.test.ts` — resolveCountryLabel, getCopLabel, normalizeDecisionLabel, responsibleUnitLabel
3. `test/unit/utils/calendar/date.test.ts` — parseFlexibleDate (various formats), formatDateRange (single day, multi-day, tentative), toSolrDateString
4. `test/unit/utils/calendar/decision-links.test.ts` — parseDecisionLabel (COP, CP, NP, invalid), resolveDecisionHref, resolveDecisionHrefWithFallback
5. `test/unit/utils/calendar/document-processing.test.ts` — field extraction from raw SOLR docs
6. `test/unit/utils/calendar/type-colors.test.ts` — normalizeTypeKey for all schema/type combos, getTypeColor returns valid hex
7. `test/unit/utils/calendar/subjects.test.ts` — buildSubjectLabelMap, resolveSubjectLabel, fallbackSubjectLabel

## Done When

- [x] All tests pass
- [x] Edge cases covered (null/undefined inputs, unknown status values, malformed dates)
- [x] Coverage > 80% for utility modules (97%+ achieved)

## Commits

Final commit: `p01-02b-calendar-utilities-tests`

## Handoff

Next: `phase-01/p01-02c-calendar-utilities-jsdoc.md`
