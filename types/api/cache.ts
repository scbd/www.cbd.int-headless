export interface CacheEntry<T> {
  data: T
  timestamp: number
  promise?: Promise<T>
}

export interface WithCacheOptions<TArgs extends any[], TResult> {
  getKey: (...args: TArgs) => string
  maxAge?: number
  /** Return true if data should NOT be served as stale (e.g., empty arrays). Defaults to */
  isEmpty?: (data: TResult) => boolean
  /** Max entries before evicting oldest. Defaults to 200 */
  maxEntries?: number
}
