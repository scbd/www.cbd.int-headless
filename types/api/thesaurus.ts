import type { LString } from '@scbd/vue-components'
export interface ThesaurusQuery {
  termId?: number
  identifier: string
  name: string
  title?: LString
  shortTitle?: LString
  description?: string
  longDescription?: LString
  source?: string
  broaderTerms?: string[]
  narrowerTerms?: string[]
  relatedTerms?: string[]
  nonPreferredTerms?: string[]
}
