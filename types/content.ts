import type { LString } from '@scbd/vue-components'
export interface Content {
  id: string
  title: string
  bundle: string
  createdOn: Date
  updatedOn: Date
  alias: string
  locale: LString
  body: string
  summary: string
  menu?: string
};

export interface Article extends Content {
  coverImage: {
    path: string
    alt: string
    width: number
    height: number
  }
};
