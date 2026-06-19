import type { LString } from '@scbd/vue-components'
export interface OasisArticleQuery {
  _id: string
  content: LString
  title: LString
  adminTags?: string[]
  meta?: {
    modifiedBy?: number
    createdBy?: number
    modifiedOn?: string
    createdOn?: string
    version?: number
    createdByInfo?: {
      userID?: number
      firstName?: string
      lastName?: string
      email?: string
    }
    modifiedByInfo?: {
      userID?: number
      firstName?: string
      lastName?: string
      email?: string
    }
  }
  summary?: LString
}
