/**
 * Bidirectional mapping between subsidiary body/protocol identifiers
 * and their corresponding subject identifiers.
 *
 * Filter identifiers: CAL-SUBSIDIARY-BODY-SBI, CAL-SUBSIDIARY-BODY-SBSTTA, etc.
 * Subject identifiers: CBD-SUBJECT-SBI, CBD-SUBJECT-SBSTTA, CBD-SUBJECT-CPB, etc.
 */

const SUBSIDIARY_BODY_TO_SUBJECT_MAP: Record<string, string> = {
  'CAL-SUBSIDIARY-BODY-SBI': 'CBD-SUBJECT-SBI',
  'CAL-SUBSIDIARY-BODY-SBSTTA': 'CBD-SUBJECT-SBSTTA',
  'CAL-SUBSIDIARY-BODY-CP': 'CBD-SUBJECT-CPB',
  'CAL-SUBSIDIARY-BODY-NP': 'CBD-SUBJECT-NPB',
  'CAL-SUBSIDIARY-BODY-8J': 'CBD-SUBJECT-8J',
  'CAL-SUBSIDIARY-BODY-COP': 'CBD-SUBJECT-COP',
  SBI: 'CBD-SUBJECT-SBI',
  SBSTTA: 'CBD-SUBJECT-SBSTTA',
  CP: 'CBD-SUBJECT-CPB',
  NP: 'CBD-SUBJECT-NPB',
  '8J': 'CBD-SUBJECT-8J',
  COP: 'CBD-SUBJECT-COP',
};

const SUBJECT_TO_SUBSIDIARY_BODY_MAP: Record<string, string> = {
  'CBD-SUBJECT-SBI': 'SBI',
  'CBD-SUBJECT-SBSTTA': 'SBSTTA',
  'CBD-SUBJECT-CPB': 'CP',
  'CBD-SUBJECT-NPB': 'NP',
  'CBD-SUBJECT-8J': '8J',
  'CBD-SUBJECT-COP': 'COP',
};

/**
 * Convert a subsidiary body filter identifier to its corresponding subject identifier.
 *
 * @param subsidiaryBodyId - e.g. 'CAL-SUBSIDIARY-BODY-SBI' or 'SBI'
 * @returns Subject identifier (e.g. 'CBD-SUBJECT-SBI') or undefined.
 *
 * @example
 * subsidiaryBodyToSubject('SBI') // → 'CBD-SUBJECT-SBI'
 */
export function subsidiaryBodyToSubject(subsidiaryBodyId: string): string | undefined {
  if (!subsidiaryBodyId) {
    return undefined;
  }

  return SUBSIDIARY_BODY_TO_SUBJECT_MAP[subsidiaryBodyId.trim()];
}

/**
 * Convert a subject identifier to its corresponding subsidiary body identifier.
 *
 * @param subjectId - e.g. 'CBD-SUBJECT-SBI'
 * @returns Subsidiary body short name (e.g. 'SBI') or undefined.
 *
 * @example
 * subjectToSubsidiaryBody('CBD-SUBJECT-SBI') // → 'SBI'
 */
export function subjectToSubsidiaryBody(subjectId: string): string | undefined {
  if (!subjectId) {
    return undefined;
  }

  return SUBJECT_TO_SUBSIDIARY_BODY_MAP[subjectId.trim()];
}

/**
 * Bidirectional: try subsidiary body → subject, then subject → subsidiary body.
 * @param identifier - Either a subsidiary body or subject identifier.
 * @returns The corresponding identifier in the opposite system or undefined.
 */
export function mapIdentifier(identifier: string): string | undefined {
  if (!identifier) {
    return undefined;
  }

  return subsidiaryBodyToSubject(identifier) ?? subjectToSubsidiaryBody(identifier);
}

/**
 * Get all subsidiary body short-name identifiers.
 */
export function getAllSubsidiaryBodyIdentifiers(): string[] {
  return Object.values(SUBJECT_TO_SUBSIDIARY_BODY_MAP);
}

/**
 * Get all subject identifiers that map to subsidiary bodies.
 */
export function getAllSubjectIdentifiers(): string[] {
  return Object.keys(SUBJECT_TO_SUBSIDIARY_BODY_MAP);
}

/**
 * Check if a given identifier is a subsidiary body identifier.
 */
export function isSubsidiaryBodyIdentifier(identifier: string): boolean {
  if (!identifier) {
    return false;
  }

  return identifier.trim() in SUBSIDIARY_BODY_TO_SUBJECT_MAP;
}

/**
 * Check if a given identifier is a subject identifier with a subsidiary body mapping.
 */
export function isSubjectIdentifier(identifier: string): boolean {
  if (!identifier) {
    return false;
  }

  return identifier.trim() in SUBJECT_TO_SUBSIDIARY_BODY_MAP;
}
