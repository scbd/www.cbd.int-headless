import type { LString } from '@scbd/vue-components'
export interface Statement {
  id: string
  code: string
  title: LString
  urls: string[]
  themes: LString[]
  createdOn: Date
  updatedOn: Date
};
