import DrupalService from '../../services/drupal';
import type { Article } from '../../types/content';
import type { ArticlesQueryParamsOptions } from '~~/types/api/query-params';

export default defineEventHandler(async (event) => {
  const { sort, options } = getQuery(event) as {
    sort: string;
    options: ArticlesQueryParamsOptions;
  };
  const articleList = (await DrupalService.getArticles(
    sort,
    options
  )) as Article[];
  const articles = {
    articles: articleList,
    toJSON() {
      return { ...this };
    },
  };
  return articles;
});
