export interface CacheEntry<T> {
  data?: T
  timestamp: number
  promise?: Promise<T>
}

export interface WithCacheOptions<TArgs extends any[], TResult> {
  getKey: (...args: TArgs) => string
  /** Time-to-live in milliseconds before a cached entry is considered stale. */
  maxAge?: number
  /** Return true if data should NOT be served as stale (e.g., empty arrays). Defaults to a no-op (all data is considered valid). */
  isEmpty?: (data: TResult) => boolean
  /** Max entries before evicting oldest. Defaults to 200 */
  maxEntries?: number
}
