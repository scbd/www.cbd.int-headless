import { getRequestURL, sendRedirect, type StatusCode, H3Error } from 'h3'
import { getRoute } from '../../services/drupal'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  // ignore paths
  if (path == null) return
  if (path === '/') return
  if (/^\/api\//i.test(path)) return
  if (/^\/_/.test(path)) return

  try {
    const route = await getRoute(path)

    if (route.redirect?.[0]?.to != null) {
      const { to, status } = route.redirect[0]
      const statusCode = parseInt(status ?? '302') as StatusCode

      return await sendRedirect(event, to, statusCode)
    }
  } catch (error: unknown) {
    // suppress but log
    if (error instanceof H3Error && error.statusCode === 404) return
    console.warn('Error in redirect middleware', { error })
  }
})
