import type { QueryParams } from '~~/types/api/query-params'
import { listMeetings } from '~~/services/meeting'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default defineEventHandler(async (event) => {
  const { fieldQueries, sort, limit, skip } = getQuery(event) as QueryParams
  return await listMeetings({ fieldQueries, sort, limit, skip }).catch(apiErrorHandler)
})
