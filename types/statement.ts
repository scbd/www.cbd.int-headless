import type LString from 'api-client/types/lstring'
export interface Statement {
  id: string
  code: string
  title: LString
  urls: string[]
  themes: LString[]
  createdOn: Date
  updatedOn: Date
};
