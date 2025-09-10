import DrupalService from "../../services/drupal";

export default defineEventHandler(async (event) => {
    const { url } = getQuery(event) as { url: string };
    return await DrupalService.getContent(url);
});