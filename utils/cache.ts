// utils/cache.ts
export interface CacheOptions {
  name?: string
  expiry?: number | null
  maxSize?: number | null
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
  private readonly store = new Map<string, CacheEntry<unknown>>()

  constructor (options: CacheOptions = {}) {
    this.name = options.name ?? 'default'
    this.expiry = options.expiry ?? null
    this.maxSize = options.maxSize ?? null
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
    for (const [key] of this.store) this.get(key)
  }
}
