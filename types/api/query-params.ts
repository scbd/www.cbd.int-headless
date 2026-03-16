export interface QueryParams {
  fieldQueries?: string
  query?: string | string[]
  sort?: string
  skip?: number
  limit?: number
  search?: string
  startDate?: string // ISO datetime string (e.g. "2026-03-01T00:00:00Z")
  endDate?: string // ISO datetime string (e.g. "2026-03-31T23:59:59Z")
}
