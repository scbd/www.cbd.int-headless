import type { Subject } from '~~/types/subject'
import { SUBJECTS } from '~~/constants/api-paths'

export default async function useSubjectsApi (domain: string): Promise<{ subjects: Ref<Subject[]>, error: Ref<Error | undefined> }> {
  const { data: subjects, error } = await useFetch<Subject[]>(`${SUBJECTS}/${encodeURIComponent(domain)}`, {
    default: () => []
  })

  return { subjects, error }
}
