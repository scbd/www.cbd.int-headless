import type { LString } from '@scbd/vue-components'
export interface Meeting {
  id: string
  code: string
  title: LString
  urls: string[]
  themes: LString[]
  startOn: Date
  endOn: Date
  updatedOn: Date
  country: LString
  city: LString
};
