import type { LString } from '@scbd/vue-components'
export interface GbfTarget {
  termId?: number
  identifier: string
  title: LString
  shortTitle: LString
  description?: string
  longDescription?: LString
  source?: string
  broaderTerms?: string[]
  narrowerTerms?: string[]
  relatedTerms?: string[]
  nonPreferredTerms?: string[]
}
