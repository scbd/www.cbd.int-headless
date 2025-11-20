import type LString from '~~/types/lstring'
export interface Statement {
  id: string
  code: string
  title: LString
  urls: string[]
  themes: LString[]
  createdOn: Date
  updatedOn: Date
};
export interface StatementMetadata {
  total: number
};
export interface StatementList {
  rows: Statement[]
  total: number
};

export interface StatementOptions {
  sort?: string
  limit?: number
  skip?: number
};
