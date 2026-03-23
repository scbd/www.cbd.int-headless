import type { Submission } from '~~/types/notification'
import type { SearchResult } from '~~/types/api/search-result'
import { SUBMISSIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export default async function useSubmissionsApi (code: string): Promise<{ submissions: ComputedRef<SearchResult<Submission>>, error: Ref<Error | undefined> }> {
  if (code === undefined || code === null) { throw mandatory('code is mandatory') }

  const { data, error } = await useFetch<SearchResult<Submission>>(`${SUBMISSIONS}/${code}`, {
    default: () => ({ total: 0, rows: [] })
  })

  const submissions = computed(() => ({
    rows: data.value.rows.map(row => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { submissions, error }
}