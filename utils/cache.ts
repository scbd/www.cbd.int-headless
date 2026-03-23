// utils/cache.ts
export interface CacheOptions {
  name?: string
  expiry?: number | null
  maxSize?: number | null
  /** How often (ms) to purge expired entries. Defaults to half of `expiry`, or 60 000 ms when expiry is null. */
  purgeInterval?: number | null
}

interface CacheEntry<T> {
  value: T
  createdAt: number
  expiry: number | null
}

export class Cache {
  readonly name: string
  private readonly expiry: number | null
  private readonly maxSize: number | null
  private readonly purgeInterval: number | null
  private readonly store = new Map<string, CacheEntry<unknown>>()
  private purgeTimer: ReturnType<typeof setTimeout> | null = null
  private readonly pending = new Map<string, Promise<unknown>>()

  constructor (options: CacheOptions = {}) {
    this.name = options.name ?? 'default'
    this.expiry = options.expiry ?? null
    this.maxSize = options.maxSize ?? null
    this.purgeInterval = options.purgeInterval !== undefined
      ? options.purgeInterval
      : this.expiry !== null ? Math.max(this.expiry / 2, 1000) : 60_000
  }

  /** Start a recurring setTimeout that purges expired cache entries. */
  startPurgeTimer (): void {
    if (this.purgeTimer !== null || this.purgeInterval === null) return
    const schedule = () => {
      this.purgeTimer = setTimeout(() => {
        this.purgeExpired()
        schedule()
      }, this.purgeInterval!)
      if (typeof this.purgeTimer === 'object' && 'unref' in this.purgeTimer) {
        this.purgeTimer.unref()
      }
    }
    schedule()
  }

  /** Stop the purge timer (call during app teardown to avoid memory leaks). */
  stopPurgeTimer (): void {
    if (this.purgeTimer !== null) {
      clearTimeout(this.purgeTimer)
      this.purgeTimer = null
    }
  }

  set<T>(key: string, value: T): T {
    if (this.store.has(key)) {
      this.store.delete(key)
    } else if (this.maxSize !== null && this.store.size >= this.maxSize) {
      const firstKey = this.store.keys().next().value
      if (firstKey !== undefined) this.store.delete(firstKey)
    }

    this.store.set(key, {
      value,
      createdAt: Date.now(),
      expiry: this.expiry
    })
    return value
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key)
    if (entry === undefined) return null

    if (entry.expiry !== null && Date.now() - entry.createdAt > entry.expiry) {
      this.store.delete(key)
      return null
    }

    // Promote to most recently used
    this.store.delete(key)
    this.store.set(key, entry)

    return entry.value as T
  }

  delete (key: string): boolean {
    return this.store.delete(key)
  }

  clear (): void {
    this.store.clear()
  }

  has (key: string): boolean {
    return this.get(key) !== null
  }

  async getOrFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    const cached = this.get<T>(key)
    if (cached !== null) return cached

    const inflight = this.pending.get(key)
    if (inflight !== undefined) return inflight as Promise<T>

    const promise = fetchFn().then(
      (value) => {
        this.pending.delete(key)
        return this.set(key, value)
      },
      (error) => {
        this.pending.delete(key)
        throw error
      }
    )

    this.pending.set(key, promise)
    return promise
  }

  get size (): number {
    this.purgeExpired()
    return this.store.size
  }

  entries<T>(): Array<{ key: string, value: T, timeLeft: number | null }> {
    this.purgeExpired()
    return [...this.store.entries()].map(([key, entry]) => ({
      key,
      value: entry.value as T,
      timeLeft: entry.expiry !== null
        ? Math.max(0, entry.expiry - (Date.now() - entry.createdAt))
        : null
    }))
  }

  private purgeExpired (): void {
    const now = Date.now()
    for (const [key, entry] of this.store) {
      if (entry.expiry !== null && now - entry.createdAt > entry.expiry) {
        this.store.delete(key)
      }
    }
  }
}