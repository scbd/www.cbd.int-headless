import DrupalService from "../../services/drupal";
import { Menu } from "~~/types/menu";

export default defineEventHandler(async (event) => {
    const { menu } = getQuery(event) as { menu: string };
    return await DrupalService.getMenu(menu) as Menu[];
});