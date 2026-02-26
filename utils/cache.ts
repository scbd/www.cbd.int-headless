// utils/cache.ts
export interface CacheOptions {
  name?: string
  expiry?: number | null
}

interface CacheEntry<T> {
  value: T
  createdAt: number
  expiry: number | null
}

export class Cache {
  readonly name: string
  private readonly expiry: number | null
  private readonly store = new Map<string, CacheEntry<unknown>>()

  constructor (options: CacheOptions = {}) {
    this.name = options.name ?? 'default'
    this.expiry = options.expiry ?? null
  }

  set<T>(key: string, value: T): T {
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
