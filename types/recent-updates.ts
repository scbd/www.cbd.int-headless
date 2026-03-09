import type { LString } from '@scbd/vue-components'
import type { Image } from '~~/types/image'

export interface RecentUpdate {
  id: string
  code: string
  title: LString
  urls: string[]
  category: 'meeting' | 'notification' | 'statement'
  themes: LString[]
  createdOn: Date
  updatedOn: Date
  startOn?: Date
  endOn?: Date
  country?: LString
  city?: LString
  image: Image
}