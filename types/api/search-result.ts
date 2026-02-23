export interface SearchResult<T> {
  rows: T[]
  total: number
}

export interface ActiveFilter {
  key: string
  label: string
  displayValue: string
}
