import type { LString } from '@scbd/vue-components'
export interface Subject {
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

export interface SubjectGroup {
  identifier: string
  title: LString
  children: Array<{ identifier: string, title: LString }>
}
