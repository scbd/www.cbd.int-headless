import type { LString } from '@scbd/vue-components'
import type { Image } from '~~/types/image'
export interface Statement {
  id: string
  code: string
  title: LString
  urls: string[]
  themes: LString[]
  createdOn: Date
  updatedOn: Date
  image: Image
}
