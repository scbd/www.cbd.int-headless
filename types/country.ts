import type { LString } from '@scbd/vue-components'

export interface Country {
  id: string
  name: LString
  code: string
  code2: string
  code3: string
  treaties: {
    XXVII8: boolean
    XXVII8a: boolean
    XXVII8b: boolean
    XXVII8c: boolean
  }
}
