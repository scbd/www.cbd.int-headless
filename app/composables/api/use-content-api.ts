import type { Article } from '~~/types/content';
import type { ArticlesQueryParamsOptions } from '~~/types/api/query-params';

export default function useContentApi() {
  const getArticles = async (
    sort: string = '-created',
    { limit, offset, status }: ArticlesQueryParamsOptions = {}
  ): Promise<Article[]> => {
    const response = await useFetch('/api/articles', {
      method: 'GET',
    });

    const articles: Article[] = response.data.value?.articles || [];

    return articles;
  };

  return {
    getArticles,
  };
}
