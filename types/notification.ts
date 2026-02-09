import type { LString } from '@scbd/vue-components'
import type { Image } from '~~/types/image'
export interface Notification {
  id: string
  code: string
  title: LString
  urls: string[]
  themes: LString[]
  createdOn: Date
  endOn?: Date
  updatedOn: Date
  actionOn?: Date
  deadlineOn?: Date
  reference: string
  fulltext: LString
  from: LString
  sender: string
  recipients: string[]
  image: Image
}
