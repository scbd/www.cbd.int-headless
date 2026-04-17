import type { Subject } from '~~/types/subject'
import { SUBJECTS } from '~~/constants/api-paths'
import { mandatory } from 'api-client/api-error'

export function getSubjectList (domain: MaybeRef<string>): ReturnType<typeof useAsyncData<Subject[]>> {
  const d = unref(domain) as string
  if (d === '') { throw mandatory('domain is mandatory') }
  return useAsyncData<Subject[]>(
    computed(() => `subjects-${d}`),
    () => $fetch<Subject[]>(`${SUBJECTS}/${encodeURIComponent(d)}`),
    {
      lazy: true,
      default: () => [] as Subject[]
    }
  )
}
