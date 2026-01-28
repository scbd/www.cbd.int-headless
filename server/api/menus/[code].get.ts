import { getMenu } from '../../../services/drupal'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''

  const query = getQuery(event)
  const depth = query.depth != null ? Number(query.depth) : undefined
  const branch = query.branch as string | undefined
  const url = query.url as string | undefined

  return await getMenu(code, { depth, branch, url })
})
