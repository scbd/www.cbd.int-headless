import type { LString } from '@scbd/vue-components'
import type { Image } from './image'

export interface PressRelease {
  id: string
  code: string
  title: LString
  urls: string[]
  themes: LString[]
  image: Image
  createdOn: Date
  updatedOn: Date
}
