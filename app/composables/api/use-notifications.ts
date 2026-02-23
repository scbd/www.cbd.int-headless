import type { Notification } from '~~/types/notification'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { NOTIFICATIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export default async function useNotificationsListApi (options?: ComputedRef<QueryParams> | Ref<QueryParams>): Promise<{ notifications: ComputedRef<{ rows: Notification[], total: number }>, error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Notification>>(NOTIFICATIONS, {
    params: computed(() => ({
      sort: options?.value.sort,
      limit: options?.value.limit,
      skip: options?.value.skip,
      fieldQueries: options?.value.fieldQueries
    })),
    default: () => ({ total: 0, rows: [] })
  })

  const notifications = computed(() => ({
    rows: data.value.rows.map(row => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { notifications, error }
}

export async function useNotificationsApi (code: string): Promise<{ notifications: ComputedRef<{ rows: Notification[], total: number }>, error: Ref<Error | undefined> }> {
  if (code === undefined || code === null) { throw mandatory('code is mandatory') }

  const { data, error } = await useFetch<Notification>(`${NOTIFICATIONS}/${code}`)

  const notifications = computed(() => {
    const rows = data.value != null ? [normalizeObjectDates(data.value)] : []
    return { rows, total: rows.length }
  })

  return { notifications, error }
}
