import type { Subject, SubjectGroup } from '~~/types/subject'

export function groupSubjects (
  subjects: Subject[],
  locale: string,
  toLocale: (lstring: Subject['title']) => string
): SubjectGroup[] {
  const isRoot = (s: Subject): boolean => s.broaderTerms == null || s.broaderTerms.length === 0

  const roots = subjects.filter(isRoot)
  const rootIds = new Set(roots.map(r => r.identifier))

  const childrenByParent = new Map<string, Array<{ identifier: string, label: string }>>()
  for (const s of subjects) {
    if (isRoot(s)) continue
    const parentId = s.broaderTerms?.[0]
    if (parentId == null || !rootIds.has(parentId)) continue
    const list = childrenByParent.get(parentId) ?? []
    list.push({ identifier: s.identifier, label: toLocale(s.title) })
    childrenByParent.set(parentId, list)
  }

  const cmp = (a: string, b: string): number => a.localeCompare(b, locale)

  return roots
    .map(r => ({
      identifier: r.identifier,
      label: toLocale(r.title),
      children: (childrenByParent.get(r.identifier) ?? []).sort((a, b) => cmp(a.label, b.label))
    }))
    .sort((a, b) => cmp(a.label, b.label))
}
