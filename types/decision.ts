import type { LString } from '@scbd/vue-components'

export interface Decision {
  id: string
  code: string
  title: LString
  file: LString
  eventTitle: string
  session: number
  decision: number
  createdOn: Date
  updatedOn: Date
}
