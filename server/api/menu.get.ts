import DrupalService from "../../services/drupal";

export default defineEventHandler(async (event) => {
    const { menu } = getQuery(event) as { menu: string };
    return await DrupalService.getMenu(menu);
});