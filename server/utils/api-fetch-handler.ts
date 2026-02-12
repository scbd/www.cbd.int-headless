import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'

/**
 * Wraps a server route handler with error conversion.
 * Catches service-layer errors and re-throws them as H3 errors
 * so Nitro produces clean error responses instead of [unhandled] logs.
 */
export const apiFetchHandler = <T>(
  handler: (event: H3Event) => T | Promise<T>
): EventHandler<EventHandlerRequest, Promise<T>> => {
  return defineEventHandler(async (event) => {
    try {
      return await handler(event)
    } catch (err: unknown) {
      if (err instanceof Error && 'statusCode' in err && '__h3_error__' in err) {
        throw err
      }

      const error = err as { statusCode?: number, status?: number, statusMessage?: string, message?: string }
      throw createError({
        statusCode: error.statusCode ?? error.status ?? 500,
        statusMessage: error.statusMessage ?? error.message,
        cause: err
      })
    }
  })
}
