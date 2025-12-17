import type lstring from 'api-client/types/lstring'

export interface GbfTarget {
  id: number
  identifier: string
  title: lstring
  shortTitle: lstring
  description: lstring
  source?: string
  broaderTerms?: string[]
  narrowerTerms?: string[]
  relatedTerms?: string[]
  nonPreferredTerms?: string[]
}
