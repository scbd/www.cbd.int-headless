import { getRequestURL, sendRedirect, type StatusCode } from 'h3'
import { getRoute } from '../../services/drupal'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  // ignore paths
  if (path == null) return
  if (path === '/') return
  if (/^\/api\//i.test(path)) return
  if (/^\/([a-z]{2}\/)?notifications(\/|$)/i.test(path)) return // Ignore /notifications path
  if (/^\/([a-z]{2}\/)?meetings(\/|$)/i.test(path)) return // Ignore /meetings path
  if (/^\/([a-z]{2}\/)?statements(\/|$)/i.test(path)) return // Ignore /statements path
  if (/^\/_/.test(path)) return

  try {
    const route = await getRoute(path)

    if (route.redirect?.[0]?.to != null) {
      const { to, status } = route.redirect[0]
      const statusCode = parseInt(status ?? '302') as StatusCode

      return await sendRedirect(event, to, statusCode)
    }
  } catch (error) {
    // suppress but log
    console.error('Error in redirect middleware', { error })
  }
})
