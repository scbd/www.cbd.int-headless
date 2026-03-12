/**
 * Calendar utility barrel export.
 *
 * Re-exports all public functions, types, and constants from the calendar
 * utility modules used by the SOLR service layer, composables, and UI.
 *
 * @module utils/calendar
 */

export {
  normalizeSolrFieldName,
  normalizeSolrDocument,
} from './solr-normalize';

export {
  normalizeWhitespace,
  htmlToText,
  decodeEntities,
  humanizeIdentifier,
} from './text';

export {
  type ValueLabelPair,
  getDocStringValue,
  getDocBooleanValue,
  getDocSubjects,
  getDocSubsidiaryBodies,
  getDocGoverningBodies,
  getDocGbfSections,
  getDocGlobalTargets,
  getDocRecipients,
  getDocThemes,
  getDocFiles,
  getDocCountries,
  getDocDecisionIdentifiers,
  getDocDecisionLabels,
  collectValueLabelPairs,
  collectGlobalTargetEntries,
  collectCountryEntries,
} from './document-processing';

export {
  STATUS_EQUIVALENCES,
  COMPLETED_FACET_ALIASES,
  COMPLETED_QUERY_ALIASES,
  expandStatusValuesForQuery,
  normalizeStatusKey,
  normalizeStatusLabel,
  statusColor,
} from './status';

export {
  resolveCountryLabel,
  normalizeDecisionLabel,
  responsibleUnitLabel,
  responsibleOfficerLabel,
  SCBD_UNITS_DIVISIONS,
  type ScbdUnitDivisionKey,
} from './labels';

export {
  parseFlexibleDate,
  formatNotificationDate,
  formatGridDate,
  safeDate,
  getQuarter,
  isQuarterStart,
  formatDateRange,
  formatGridDateRange,
} from './date';

export {
  type DecisionEntry,
  parseDecisionLabel,
  resolveDecisionHref,
  resolveDecisionHrefWithFallback,
  parseCbdDecisionPath,
} from './decision-links';

export {
  type NotificationKey,
  NOTIFICATION_BASE_URL,
  resolveNotificationUrl,
  deriveNameFromUrl,
  buildNotificationLink,
  parseNotificationAttachments,
  buildNotificationExcerpt,
  getNotificationKeys,
} from './notifications';

export {
  CBD_GREEN,
  type CalendarTypeKey,
  type CalendarTypeColor,
  normalizeTypeKey,
  getTypeColor,
} from './type-colors';

export {
  buildSubjectLabelMap,
  resolveSubjectLabel,
  fallbackSubjectLabel,
} from './subjects';

export {
  subsidiaryBodyToSubject,
  subjectToSubsidiaryBody,
  mapIdentifier,
  getAllSubsidiaryBodyIdentifiers,
  getAllSubjectIdentifiers,
  isSubsidiaryBodyIdentifier,
  isSubjectIdentifier,
} from './subsidiary-body-mappings';
