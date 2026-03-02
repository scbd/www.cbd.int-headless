import type { LString } from '@scbd/vue-components'

export interface PressRelease {
  id: string
  code: string
  title: LString
  urls: string[]
  themes: LString[]
  createdOn: Date
  updatedOn: Date
}
