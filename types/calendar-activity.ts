import type { LString } from '@scbd/vue-components'

// ---------------------------------------------------------------------------
// Base document — common fields shared by every schema
// ---------------------------------------------------------------------------

/**
 * Common fields shared by every calendar document schema.
 * Extended by {@link MeetingDoc}, {@link NotificationDoc}, and {@link CalendarActivityDoc}.
 */
export interface BaseCalendarDoc {
  id: string
  schema: 'meeting' | 'notification' | 'calendarActivity'
  identifier: string
  title: LString
  startDate: string | null
  endDate: string | null
  createdDate: string | null
  status: string | null
  statusKey: string | null
  statusCOA: string | null
  url: string | null
  governingBodies: string[]
  subsidiaryBodies: string[]
  governingBodiesCOA: string[]
  subsidiaryBodiesCOA: string[]
  relatedRecords: string[]
  relatedMeetings: string[]
  relatedActivities: string[]
  actionRequired: boolean
  actionRequiredByParties: boolean
  actionRequiredByPartiesCOA: boolean
}

// ---------------------------------------------------------------------------
// Schema-specific documents
// ---------------------------------------------------------------------------

/** A CBD meeting document (e.g. COP, SBSTTA, SBI sessions). */
export interface MeetingDoc extends BaseCalendarDoc {
  schema: 'meeting'
  symbol: string | null
  meetingCode: string | null
  eventCity: LString
  eventCountry: LString
  hostGovernments: string[]
  themes: string[]
}

/** A CBD notification document with sender, recipients, and attachments. */
export interface NotificationDoc extends BaseCalendarDoc {
  schema: 'notification'
  symbol: string | null
  reference: string | null
  sender: string | null
  recipients: string[]
  actionDate: string | null
  deadline: string | null
  files: string[]
  fulltext: LString
}

/** A general calendar activity document (actions, deadlines, milestones). */
export interface CalendarActivityDoc extends BaseCalendarDoc {
  schema: 'calendarActivity'
  type: string | null
  subType: string | null
  description: LString
  statusNarrative: LString
  agendaItems: string[]
  subjects: string[]
  decisions: string[]
  responsibleUnitsAndOfficers: string[]
  gbfTargets: string[]
  gbfSections: string[]
  outcome: string | null
}

/**
 * Discriminated union of all calendar document schemas.
 * Narrow via `doc.schema` to access schema-specific fields.
 */
export type CalendarDoc = MeetingDoc | NotificationDoc | CalendarActivityDoc

// ---------------------------------------------------------------------------
// Filter & query types
// ---------------------------------------------------------------------------

/** Local UI state for the calendar search filter form. */
export interface CalendarFilterState {
  types: string[]
  subjects: string[]
  statuses: string[]
  subsidiaryBodies: string[]
  governingBodies: string[]
  copDecisions: string[]
  activityTypes: string[]
  globalTargets: string[]
  gbfSections: string[]
  countries: string[]
  startDate: string
  endDate: string
  actionRequired: boolean
  searchText: string
  sort: string
  initialLoad?: boolean
}

/**
 * Query parameters sent to the calendar API route.
 * Array params are serialized as comma-separated strings.
 * @see SC-04 in shared-contracts.md
 */
export interface CalendarSearchParams {
  types?: string[]
  subjects?: string[]
  statuses?: string[]
  subsidiaryBodies?: string[]
  governingBodies?: string[]
  copDecisions?: string[]
  activityTypes?: string[]
  globalTargets?: string[]
  gbfSections?: string[]
  countries?: string[]
  startDate?: string
  endDate?: string
  actionRequired?: boolean
  searchText?: string
  sort?: string
  skip?: number
  limit?: number
}

// ---------------------------------------------------------------------------
// Facets & results
// ---------------------------------------------------------------------------

/** Parsed SOLR facet counts keyed by facet field name. */
export type ParsedFacets = Record<string, Array<{ value: string; count: number }>>

/**
 * Canonical response from the calendar API route and composable.
 * @see SC-01 in shared-contracts.md
 */
export interface CalendarSearchResult {
  docs: CalendarDoc[]
  total: number
  facets: ParsedFacets
}

// ---------------------------------------------------------------------------
// Grouping (matches SC-08)
// ---------------------------------------------------------------------------

/**
 * A group of calendar documents keyed by a date bucket (e.g. "2025-03").
 * @see SC-08 in shared-contracts.md
 */
export interface GroupedItem {
  key: string
  label: string
  items: CalendarDoc[]
}

// ---------------------------------------------------------------------------
// Supporting types
// ---------------------------------------------------------------------------

/** A parsed agenda item linking a meeting code to its agenda entry. */
export interface AgendaItem {
  meetingCode: string
  item: string
  title: string
  shortTitle: string
}

/** A single option in a calendar filter dropdown (vue-multiselect). */
export interface CalendarFilterOption {
  value: string
  label: string
  count?: number
}

/** Expanded notification details for the detail/expansion panel view. */
export interface NotificationDetails {
  title: string | null
  from: string | null
  recipients: string[]
  attachments: NotificationAttachment[]
  publicationDate: string | null
  fulltext: string | null
}

/** A file attachment on a notification document. */
export interface NotificationAttachment {
  name: string
  url: string
}
