/**
 * Build a subject identifier → label map from an array of options.
 * @param options - Options with value/label pairs.
 * @returns Map of identifier to display label.
 */
export function buildSubjectLabelMap(options: Array<{ value: string; label: string }>): Record<string, string> {
  return options.reduce<Record<string, string>>((accumulator, option) => {
    accumulator[option.value] = option.label;
    return accumulator;
  }, {});
}

/**
 * Resolve a subject label from a label map.
 * @param identifier - Subject identifier.
 * @param labels - Map of identifier → label.
 * @returns Display label or empty string.
 */
export function resolveSubjectLabel(identifier: string, labels: Record<string, string>): string {
  if (!identifier) {
    return '';
  }
  return labels[identifier] || '';
}

/**
 * Generate a human-readable fallback label from a subject identifier.
 * @param identifier - Subject identifier (e.g. "CBD-SUBJECT-MARINE-COASTAL").
 * @returns Humanized label.
 */
export function fallbackSubjectLabel(identifier: string): string {
  const cleaned = identifier
    .replace(/^CBD[-_]SUBJECT[-_]/i, '')
    .replace(/^CBD[-_]/i, '')
    .replace(/[_-]+/g, ' ')
    .trim();

  if (!cleaned) {
    return identifier;
  }

  return cleaned
    .toLowerCase()
    .split(' ')
    .map(part => part ? part.charAt(0).toUpperCase() + part.slice(1) : '')
    .join(' ');
}
