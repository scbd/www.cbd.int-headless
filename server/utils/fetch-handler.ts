import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'

/**
 * Wraps a server route handler with error conversion.
 * Catches service-layer errors and re-throws them as H3 errors
 * so Nitro produces clean error responses instead of [unhandled] logs.
 */
export const fetchHandler = <T>(
  handler: (event: H3Event) => T | Promise<T>
): EventHandler<EventHandlerRequest, Promise<T>> => {
  return defineEventHandler(async (event) => {
    try {
      return await handler(event)
    } catch (err: unknown) {
      const error = err as { statusCode?: number, status?: number, message?: string }
      throw createError({
        statusCode: error.statusCode ?? error.status,
        statusMessage: error.message
      })
    }
  })
}
