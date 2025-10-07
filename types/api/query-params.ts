export interface QueryParams {
  code: string;
  sort?: string;
  skip?: number;
  limit?: number;
}

export interface ArticlesQueryParamsOptions {
  limit?: number;
  offset?: number;
  status?: boolean;
}
