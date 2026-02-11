import { getMenu } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default apiFetchHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''

  const query = getQuery(event)
  const depth = query.depth != null ? Number(query.depth) : undefined
  const branch = query.branch as string | undefined
  const url = query.url as string | undefined

  return await getMenu(code, { depth, branch, url }).catch(apiErrorHandler)
})
