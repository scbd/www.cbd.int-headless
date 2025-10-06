import type { Content, Page, Article } from '~~/types/content';

export default function useContentApi() {
  const getArticles = async () => {};

  const getArticle = async (articlePath: string) => {
    // const response = await useFetch('/api/content', {
    //   method: 'GET',
    //   params: {
    //     article: articlePath,
    //   },
    // });
    // const article = response.data;
    // return article;
  };

  return {
    getArticle
  };
}
