import type { LString } from '@scbd/vue-components'
export interface Nbsap {
  id: string
  code: string
  title: LString
  urls: string[]
  country: LString
  createdOn: Date
  updatedOn: Date
}
