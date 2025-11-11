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
  files: {
    type: string,
    language: lstring
    url: string
    name: string
  }[]
}

export interface NotificationList {
  rows: Notification[]
  total: number
}

export interface NotificationOptions {
  sort?: string
  limit?: number
  skip?: number
}
