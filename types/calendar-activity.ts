import type { LString } from '@scbd/vue-components'

// ---------------------------------------------------------------------------
// Base document — common fields shared by every schema
// ---------------------------------------------------------------------------

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

export interface MeetingDoc extends BaseCalendarDoc {
  schema: 'meeting'
  symbol: string | null
  meetingCode: string | null
  eventCity: LString
  eventCountry: LString
  hostGovernments: string[]
  themes: string[]
}

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

// Discriminated union — narrow via doc.schema
export type CalendarDoc = MeetingDoc | NotificationDoc | CalendarActivityDoc

// ---------------------------------------------------------------------------
// Filter & query types
// ---------------------------------------------------------------------------

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

// Matches shared contract SC-04
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

export type ParsedFacets = Record<string, Array<{ value: string; count: number }>>

// Matches shared contract SC-01
export interface CalendarSearchResult {
  docs: CalendarDoc[]
  total: number
  facets: ParsedFacets
}

// ---------------------------------------------------------------------------
// Grouping (matches SC-08)
// ---------------------------------------------------------------------------

export interface GroupedItem {
  key: string
  label: string
  items: CalendarDoc[]
}

// ---------------------------------------------------------------------------
// Supporting types
// ---------------------------------------------------------------------------

export interface AgendaItem {
  meetingCode: string
  item: string
  title: string
  shortTitle: string
}

export interface CalendarFilterOption {
  value: string
  label: string
  count?: number
}

export interface NotificationDetails {
  title: string | null
  from: string | null
  recipients: string[]
  attachments: NotificationAttachment[]
  publicationDate: string | null
  fulltext: string | null
}

export interface NotificationAttachment {
  name: string
  url: string
}
