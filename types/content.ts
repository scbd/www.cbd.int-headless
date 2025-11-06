import type lstring from 'api-client/types/lstring'
export interface Content {
  title: string
  bundle: string
  createdOn: Date
  updatedOn: Date
  alias: string
  locale: lstring
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

export interface ArticleOptions {
  sort?: string
  limit?: number
  skip?: number
};
