// server/utils/cache-function.ts
import { CACHE_DURATION_MS } from '~~/constants/cache'
import type { CacheEntry, WithCacheOptions } from '../../types/api/cache'

export function withCache<TArgs extends any[], TResult> (
  fn: (...args: TArgs) => Promise<TResult>,
  options: WithCacheOptions<TArgs, TResult>
): (...args: TArgs) => Promise<TResult> {
  const cache = new Map<string, CacheEntry<TResult>>()
  const ttl = options.maxAge ?? CACHE_DURATION_MS
  const maxEntries = options.maxEntries ?? 200

  function evictOldest (): void {
    if (cache.size <= maxEntries) return
    // Map iterates in insertion order — first entry is the oldest
    const oldestKey = cache.keys().next().value
    if (oldestKey !== undefined) cache.delete(oldestKey)
  }

  function hasStaleData (cached: CacheEntry<TResult> | undefined): cached is CacheEntry<TResult> {
    if (cached?.data == null) return false
    if (options.isEmpty?.(cached.data) === true) return false
    return true
  }

  return async (...args: TArgs): Promise<TResult> => {
    const key = options.getKey(...args)
    const now = Date.now()
    const cached = cache.get(key)

    // 1. Fresh cache hit
    if (cached != null && (now - cached.timestamp) < ttl) {
      return cached.data as TResult
    }

    // 2. In-flight request exists
    if (cached?.promise != null) {
      const { promise } = cached
      // SWR: return stale data immediately if available
      if (hasStaleData(cached)) return cached.data as TResult
      // Otherwise wait for the in-flight request
      return await promise
    }

    // 3. Start new fetch — store entry first so we can compare by identity
    const pendingEntry: CacheEntry<TResult> = {
      data: cached?.data as TResult,
      timestamp: cached?.timestamp ?? 0
    }
    cache.set(key, pendingEntry)

    const loadPromise: Promise<TResult> = (async () => {
      try {
        const result = await fn(...args)
        cache.set(key, { data: result, timestamp: Date.now() })
        evictOldest()
        return result
      } catch (error) {
        // Clean up: remove the failed promise so next request retries
        if (cache.get(key) === pendingEntry) {
          if (hasStaleData(pendingEntry)) {
            // Keep stale data, clear the promise
            cache.set(key, { data: pendingEntry.data as TResult, timestamp: pendingEntry.timestamp })
          } else {
            cache.delete(key)
          }
        }
        throw error
      }
    })()

    pendingEntry.promise = loadPromise

    // SWR: return stale data immediately if available
    if (hasStaleData(cached)) return cached.data as TResult
    // Cold start: wait for the result
    return await loadPromise
  }
}
