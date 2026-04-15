import type { Subject } from '~~/types/subject'
import { SUBJECTS } from '~~/constants/api-paths'
import { mandatory } from 'api-client/api-error'

export function getSubjectList (domain: MaybeRef<string>): ReturnType<typeof useAsyncData<Subject[]>> {
  if (domain === undefined || domain === null) { throw mandatory('domain is mandatory') }
  return useAsyncData<Subject[]>(
    computed(() => `subjects-${unref(domain) as string}`),
    () => $fetch<Subject[]>(`${SUBJECTS}/${encodeURIComponent(unref(domain) as string)}`),
    { default: () => [] as Subject[] }
  )
}
