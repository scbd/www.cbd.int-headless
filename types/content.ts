import type { LString } from '@scbd/vue-components'
export interface Content {
  title: string
  bundle: string
  createdOn: Date
  updatedOn: Date
  alias: string
  locale: LString
  body: string
  summary: string
};

export interface Article extends Content {
  coverImage: {
    path: string
    alt: string
    width: number
    height: number
  }
};

export interface Page extends Content {
  menu: string
};
