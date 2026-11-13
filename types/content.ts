export interface Content {
  id: string
  title: string
  bundle: string
  createdOn: Date
  updatedOn: Date
  alias: string
  locale: string
  body: string
  summary: string
  menu?: string
  tags?: string[]
  components?: {
    meetings?: string[]
    notifications?: string[]
    statements?: string[]
  }
  list?: {
    meetings?: string[]
    notifications?: string[]
    statements?: string[]
  }
};

export interface Article extends Content {
  coverImage: {
    path: string
    alt: string
    width: number
    height: number
  }
};
