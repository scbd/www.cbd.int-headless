import { getRequestURL, sendRedirect } from 'h3'
import { getRoute } from '../../services/drupal'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event)?.href?.replace(/https?:\/\/[^/]*/, '')

  // ignore paths
  if (path == null || /\/api\/|\/_/.test(path)) return

  try {
    const route = await getRoute(path)

    if (route.redirect?.[0]?.to != null) {
      const { to, status } = route.redirect[0]
      return await sendRedirect(event, to, status)
    }
  } catch (error) {
    // suppress but log
    console.error('Error in redirect middleware', { error })
  }
})
