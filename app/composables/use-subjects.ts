import type { Subject } from '~~/types/subject'
import { SUBJECTS } from '~~/constants/api-paths'
import { mandatory } from 'api-client/api-error'

export function useSubjects (): {
  getSubjectList: (domain: MaybeRef<string>) => ReturnType<typeof useAsyncData<Subject[]>>
} {
  function getSubjectList (domain: MaybeRef<string>): ReturnType<typeof useAsyncData<Subject[]>> {
    return useAsyncData<Subject[]>(
      computed(() => `subjects-${unref(domain) as string}`),
      () => {
        const d = unref(domain) as string
        if (d === '') { throw mandatory('domain', 'domain is mandatory') }
        return $fetch<Subject[]>(`${SUBJECTS}/${encodeURIComponent(d)}`)
      },
      {
        lazy: true,
        default: () => [] as Subject[]
      }
    )
  }

  return { getSubjectList }
}
