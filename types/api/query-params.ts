export interface QueryParams {
  sort?: string
  skip?: number
  limit?: number
}

export interface QueryList<T> {
  rows: T[]
  total: number
}
