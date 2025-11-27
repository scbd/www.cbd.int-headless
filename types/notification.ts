import type lstring from 'api-client/types/lstring'
export interface Notification {
  id: string
  code: string
  title: lstring
  urls: string[]
  themes: lstring[]
  createdOn: Date
  endOn?: Date
  updatedOn: Date
  actionOn?: Date
  deadlineOn?: Date
  reference: string
  fulltext: lstring
  from: lstring
  sender: string
  recipients: string[]
}
