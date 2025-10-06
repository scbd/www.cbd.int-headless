import DrupalService from '../../services/drupal';
import type { Article } from '../../types/content';

export default defineEventHandler(async (event) => {
  const { sort } = getQuery(event) as { sort: string };
  return (await DrupalService.getArticles(sort)) as Article[];
});
