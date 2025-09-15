import DrupalApi from "../api/drupal";
import { Content, Article, Page } from "../types/content";
import { Menu } from "../types/menu";
export default class DrupalService {

    private static drupalApi = new DrupalApi(
        {
            drupalBaseUrl: useRuntimeConfig().drupalBaseUrl as string,
            drupalClientId: useRuntimeConfig().drupalClientId as string,
            drupalClientSecret: useRuntimeConfig().drupalClientSecret as string,
            drupalScope: useRuntimeConfig().drupalScope as string
        }
    );

    static async getContent(url: string) : Promise<Content | Page | Article> {
        const route = await this.drupalApi.getRoute(url);
        const drupalContent = await this.drupalApi.getContent(route.entity.uuid, route.entity.bundle);
        const { attributes } = drupalContent.data;

        const content : Content = {
            bundle: route.entity.bundle,
            title: attributes.title,
            created: attributes.created,
            changed: attributes.changed,
            alias: attributes.path.alias,
            lang: attributes.path.langcode,
            body: attributes.body.processed,
            summary: attributes.body.summary,
        };

        if(route.entity.bundle == 'page') { 
            const page = content as Page;

            page.menu = drupalContent.data.attributes.field_menu;
        }

        if(route.entity.bundle == 'article') { 
            const article = content as Article;
            const { field_image } = drupalContent.data.relationships;

            article.image =  {
                alt : field_image.data.meta.alt,
                title : field_image.data.meta.title,
                width : field_image.data.meta.width,
                height : field_image.data.meta.height,
                filename : '',
                path : ''
            };

            const media = await this.drupalApi.getMedia(drupalContent.data.relationships.field_image.data.id);

            if(media) {
                article.image = {
                    ...article.image,
                    filename: media.data.attributes.filename,
                    path: media.data.attributes.uri.url,
                };
            };
        };

        return content;
    };

    static async getMenu(id: string) {
        const data = await this.drupalApi.getMenu(id);
        if(!data) { return null; }

        const menus: Menu[] = [];
        const items: { [ key: string ]: Menu } = {};

        data.forEach(( item: any ) => {
            const { title, url, weight, options } = item.attributes;
            const parentId = item.attributes.parent;

            const menuItem: Menu = {
                title,
                url,
                position: weight,
                submenu: options?.attributes?.submenu,
                icon: options?.attributes?.icon,
                composable: options?.attributes?.component,
                children: []
            };

            items[item.id] = menuItem;

            if(parentId) {
                const parent = items[parentId];

                parent.children?.push(menuItem);
            }
            else{
                menus.push(menuItem);
            }

        });

        return menus;
    }
};