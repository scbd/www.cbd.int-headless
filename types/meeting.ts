import type { LString } from '@scbd/vue-components'
import type { Image } from '~~/types/image'
export interface Meeting {
  id: string
  code: string
  title: LString
  urls: string[]
  themes: LString[]
  startOn: Date
  endOn: Date
  createdOn: Date
  updatedOn: Date
  country: LString
  city: LString
  image: Image
}
