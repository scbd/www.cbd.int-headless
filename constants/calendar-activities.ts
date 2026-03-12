// ---------------------------------------------------------------------------
// Thesaurus domain identifiers — values must match the CBD thesaurus API
// ---------------------------------------------------------------------------

/**
 * CBD thesaurus domain identifiers used to fetch filter options
 * from the thesaurus API (e.g. countries, GBF targets, activity types).
 */
export const THESAURUS_DOMAINS = {
  COUNTRIES: 'countries',
  GBF_GOALS: 'GBF-GOALS',
  GBF_TARGETS: 'GBF-TARGETS',
  GBF_SECTIONS: 'GBF-SECTIONS',
  EVENT_STATUS: 'NCHM-EVENT-STATUS',
  ACTIVITY_TYPES: 'CALENDAR-OF-ACTIVITY-TYPES',
  CBD_SUBJECTS: 'CBD-SUBJECTS',
  SCBD_UNITS: 'SCBD-UNITS',
  GOVERNING_BODIES: 'GOVERNING-BODIES',
  SUBSIDIARY_BODIES: 'SUBSIDIARY-BODIES',
} as const

/** Union of all keys in {@link THESAURUS_DOMAINS}. */
export type ThesaurusDomainKey = keyof typeof THESAURUS_DOMAINS
/** Union of all string literal values in {@link THESAURUS_DOMAINS}. */
export type ThesaurusDomainIdentifier = typeof THESAURUS_DOMAINS[ThesaurusDomainKey]

// ---------------------------------------------------------------------------
// Record types
// ---------------------------------------------------------------------------

/**
 * The three calendar document schemas with their i18n label keys.
 * Used to populate the "Type" filter dropdown.
 */
export const CALENDAR_RECORD_TYPES = [
  { value: 'meeting', labelKey: 'calendar.types.meeting' },
  { value: 'notification', labelKey: 'calendar.types.notification' },
  { value: 'calendarActivity', labelKey: 'calendar.types.calendarActivity' },
] as const

/** Union type of record type values: `'meeting' | 'notification' | 'calendarActivity'`. */
export type RecordType = typeof CALENDAR_RECORD_TYPES[number]['value']

// ---------------------------------------------------------------------------
// SOLR facet fields with exclusion tags
// ---------------------------------------------------------------------------

/**
 * SOLR facet field definitions with `{!ex=tag}` exclusion tags.
 * Exclusion tags allow multi-select faceting: selecting a value in one
 * facet does not collapse the counts in that same facet.
 */
export const SOLR_FACET_FIELDS = {
  schema: '{!ex=schema}schema_s',
  subjects: '{!ex=subjects}thematicArea_ss',
  governingBody: '{!ex=governingBody}governingBodiesCOA_ss',
  subsidiaryBody: '{!ex=subsidiaryBody}subsidiaryBodiesCOA_ss',
  statusCOA: '{!ex=status}statusCOA_s',
  activityType: '{!ex=activityType}type_s',
  gbfTargets: '{!ex=gbfTargets}gbfTargets_ss',
  gbfSections: '{!ex=gbfSections}gbfSections_ss',
  countries: '{!ex=countries}eventCountry_s',
  decisions: '{!ex=decisions}decisions_ss',
  themes: '{!ex=themes}themes_ss',
} as const

/** Union of all keys in {@link SOLR_FACET_FIELDS}. */
export type SolrFacetFieldKey = keyof typeof SOLR_FACET_FIELDS

// ---------------------------------------------------------------------------
// SOLR field lists
// ---------------------------------------------------------------------------

/** Comma-separated SOLR field list for calendar list/search views. */
export const CALENDAR_LIST_FIELDS = [
  'id', '_id', 'schema_s', 'identifier_s',
  'title_EN_t', 'title_FR_t', 'title_ES_t', 'title_AR_t', 'title_RU_t', 'title_ZH_t',
  'startDateCOA_dt', 'endDateCOA_dt', 'status_s', 'activityStatus_s',
  'eventCity_s', 'eventCountry_s', 'meetingCode_s',
  'type_s', 'subType_s',
  'symbol_s', 'date_dt', 'actionDate_dt',
  'subjects_ss', 'governingBodiesCOA_ss', 'subsidiaryBodiesCOA_ss',
  'gbfTargets_ss', 'gbfSections_ss', 'decisions_ss',
  'themes_ss',
  'notifications_ss', 'meetings_ss', 'activities_ss',
  'url_ss',
  'actionRequiredByPartiesCOA_b',
  'agendaItemMeetingCodes_ss', 'agendaItemNumbers_ds',
  'recipient_ss', 'files_ss', 'sender_s', 'reference_s', 'fulltext_s', 'deadline_dt',
].join(',')

/** Comma-separated SOLR field list for calendar detail views (superset of list fields). */
export const CALENDAR_DETAIL_FIELDS = [
  ...CALENDAR_LIST_FIELDS.split(','),
  'description_EN_t', 'description_FR_t', 'description_ES_t',
  'description_AR_t', 'description_RU_t', 'description_ZH_t',
  'statusNarrative_EN_t', 'statusNarrative_FR_t', 'statusNarrative_ES_t',
  'statusNarrative_AR_t', 'statusNarrative_RU_t', 'statusNarrative_ZH_t',
  'fulltext_EN_t', 'fulltext_FR_t', 'fulltext_ES_t',
  'fulltext_AR_t', 'fulltext_RU_t', 'fulltext_ZH_t',
  'actionRequiredByPartiesCOA_b',
  'agendaItems_ss',
  'responsibleUnitsAndOfficers_ss',
  'hostGovernments_ss',
  'reference_s', 'sender_s', 'recipient_ss', 'files_ss',
  'outcome_s',
  'createdDate_dt', 'updatedDate_dt',
].join(',')

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

/** Number of calendar items displayed per page in search results. */
export const ITEMS_PER_PAGE = 10

// ---------------------------------------------------------------------------
// URL path for the calendar page
// ---------------------------------------------------------------------------

/** Client-side route path for the calendar of activities page. */
export const CALENDAR_ACTIVITIES_PATH = '/calendar-of-activities'
