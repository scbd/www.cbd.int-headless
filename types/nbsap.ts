import type lstring from 'api-client/types/lstring'

export interface Nbsap {
  id: string
  title: lstring
  government: lstring
  countryCode: keyof lstring
  jurisdiction: lstring
  regions: lstring[]
  createdOn: Date
  indexedOn: Date
  updatedOn: Date
  submittedOn: Date
  startOn: Date
  endOn: Date
  adoptionOn: Date
  summary: lstring
  url: string
  documents:
  Array<Record<keyof lstring, { name: string, tags?: string[], url: string }>>
}

export interface NbsapList {
  rows: Nbsap[]
  total: number
}

export interface NbsapOptions {
  sort?: string
  limit?: number
  skip?: number
}
