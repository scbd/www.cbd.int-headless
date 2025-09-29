import DrupalService from "../../services/drupal";
import type { Content, Article, Page } from "../../types/content";

export default defineEventHandler(async (event) => {
    const { url } = getQuery(event) as { url: string };
    return await DrupalService.getContent(url) as Content | Page | Article;
});