import type { Subject, SubjectGroup } from '~~/types/subject'

export function groupSubjects (subjects: Subject[]): SubjectGroup[] {
  const isRoot = (s: Subject): boolean => s.broaderTerms == null || s.broaderTerms.length === 0

  const roots = subjects.filter(isRoot)
  const rootIds = new Set(roots.map(r => r.identifier))

  const childrenByParent = new Map<string, SubjectGroup['children']>()
  for (const s of subjects) {
    if (rootIds.has(s.identifier)) continue
    const parentId = s.broaderTerms?.[0]
    if (parentId == null || !rootIds.has(parentId)) continue
    const list = childrenByParent.get(parentId) ?? []
    list.push({ identifier: s.identifier, title: s.title })
    childrenByParent.set(parentId, list)
  }

  return roots.map(r => ({
    identifier: r.identifier,
    title: r.title,
    children: childrenByParent.get(r.identifier) ?? []
  }))
}
