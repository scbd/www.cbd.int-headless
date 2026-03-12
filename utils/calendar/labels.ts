/**
 * Label resolution utilities for calendar documents.
 *
 * Resolves country display names via `Intl.DisplayNames`, normalizes decision
 * labels with COP prefix handling, and maps SCBD unit/division abbreviations
 * to their full names.
 *
 * @module utils/calendar/labels
 */

import type { CalendarDoc } from '~/types/calendar-activity';
import { getDocStringValue } from './document-processing';
import { humanizeIdentifier } from './text';

/**
 * Resolve a country label using provided information, regional display names, or heuristics.
 *
 * @param value - Country code or name.
 * @param provided - Optional label from the dataset.
 * @returns Display label.
 *
 * @example
 * resolveCountryLabel('CA')        // → 'Canada'
 * resolveCountryLabel('CA', 'CAN') // → 'CAN'
 */
export function resolveCountryLabel(value: string, provided?: string | null): string {
  if (provided && provided.trim()) {
    return provided.trim();
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
    const display = displayNames.of(trimmed.toUpperCase());

    if (display && display.toLowerCase() !== trimmed.toLowerCase()) {
      return display;
    }
  } catch {
    // Ignore lookup failures and fall back to heuristics.
  }

  if (/^[a-z]{2}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  return humanizeIdentifier(trimmed);
}

/**
 * Normalize a decision label ensuring the COP prefix is present.
 *
 * @param label - Original decision label.
 * @returns Normalized decision label or null.
 *
 * @example
 * normalizeDecisionLabel('15/4') // → 'COP 15/4'
 * normalizeDecisionLabel('CP-11/7') // → 'CP-11/7' (already has prefix)
 */
export function normalizeDecisionLabel(label: string | null | undefined): string | null {
  if (label === null || label === undefined) {
    return null;
  }

  const trimmed = label.trim();

  if (!trimmed) {
    return null;
  }

  const upper = trimmed.toUpperCase();
  const hasReservedToken = ['COP', 'NP', 'CP'].some(token => upper.includes(token));

  if (hasReservedToken) {
    return trimmed;
  }

  return `COP ${trimmed}`;
}

/**
 * Resolve the responsible unit label for a document.
 * @param doc - Calendar document.
 * @returns Responsible unit label or undefined.
 */
export function responsibleUnitLabel(doc: CalendarDoc): string | undefined {
  return getDocStringValue(doc, 'responsibleUnit');
}

/**
 * Resolve the responsible officer label for a document.
 * @param doc - Calendar document.
 * @returns Responsible officer label or undefined.
 */
export function responsibleOfficerLabel(doc: CalendarDoc): string | undefined {
  return getDocStringValue(doc, 'responsibleOfficer');
}

// ---------------------------------------------------------------------------
// SCBD Units & Divisions (from scbd-units-divisions.ts)
// ---------------------------------------------------------------------------

/**
 * SCBD organizational units and divisions.
 * Keys are abbreviations; values are display names.
 */
export const SCBD_UNITS_DIVISIONS = {
  SSSFD: 'Science, Society and Sustainable Futures Division',
  ISD: 'Implementation Support Division',
  AD: 'Administration Division',
  LIA: 'Legal and Intergovernmental Affairs',
  SS: 'Secretariat Support',
  CA: 'Communication and Awareness',
  CS: 'Conference Services',
  BSPG: 'Biodiversity Science, Policy and Governance',
  MRNR: 'Monitoring, Review and National Reporting',
  FB: 'Finance and Budget',
  ABS: 'ABS',
  BS: 'Biosafety',
  BETI: 'Biodiversity Economy Transformation and Innovation',
  PB: 'Peoples and Biodiversity',
  SEC: 'Stakeholder Engagement and Cooperation',
  CBKM: 'Capacity Building and Knowledge Management',
  HRA: 'Human Resources and Administration',
} as const;

export type ScbdUnitDivisionKey = keyof typeof SCBD_UNITS_DIVISIONS;
