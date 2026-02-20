import { getMenu } from '~~/services/drupal'
import { apiErrorHandler } from '~~/server/utils/api-error-handler'

export default cachedEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''

  const query = getQuery(event)
  const depth = query.depth != null ? Number(query.depth) : undefined
  const branch = query.branch as string | undefined
  const url = query.url as string | undefined

  return await getMenu(code, { depth, branch, url }).catch(apiErrorHandler)
}, {
  maxAge: 60 * 5,
  name: 'menus-item',
  getKey: (event) => {
    const code = (getRouterParam(event, 'code') as string | undefined) ?? ''
    const query = getQuery(event) as { depth?: string, branch?: string, url?: string }
    return `${code}-${query.depth ?? ''}-${query.branch ?? ''}-${query.url ?? ''}`
  }
})
