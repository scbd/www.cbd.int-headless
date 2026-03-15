import type { CalendarActivity } from '~~/types/calendar-activity'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { CALENDAR_ACTIVITIES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

/**
 * Fetch a paginated list of calendar activities from the server.
 *
 * Follows the same pattern as `useMeetingsListApi` and `useNotificationsListApi`.
 *
 * @param options - Reactive query params (sort, limit, skip, fieldQueries).
 * @returns `{ calendarActivities, error }` where `calendarActivities` is a
 *          `ComputedRef<{ rows: CalendarActivity[], total: number }>`.
 */
export default async function useCalendarActivitiesListApi (
  options?: ComputedRef<QueryParams> | Ref<QueryParams>
): Promise<{ calendarActivities: ComputedRef<{ rows: CalendarActivity[], total: number }>, error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<CalendarActivity>>(CALENDAR_ACTIVITIES, {
    params: computed(() => ({
      sort: options?.value.sort,
      limit: options?.value.limit,
      skip: options?.value.skip,
      fieldQueries: options?.value.fieldQueries
    })),
    default: () => ({ total: 0, rows: [] })
  })

  const calendarActivities = computed(() => ({
    rows: data.value.rows.map(row => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { calendarActivities, error }
}
