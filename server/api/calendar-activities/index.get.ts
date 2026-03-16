import type { QueryParams } from '~~/types/api/query-params'
import { listCalendarActivities } from '~~/services/calendar-activity'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { fieldQueries, query, sort, limit, skip } = getQuery(event) as QueryParams
  return await listCalendarActivities({ fieldQueries, query, sort, limit, skip }).catch(apiErrorHandler)
})
