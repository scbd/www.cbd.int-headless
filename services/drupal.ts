import { notFound } from 'api-client/api-error';
import DrupalApi from '../api/drupal';
import type { Content, Article, Page } from '../types/content';
import type { Menu } from '../types/menu';
import type lstring from 'api-client/types/lstring';
import type { ArticlesQueryParamsOptions } from '~~/types/api/query-params';
export default class DrupalService {
  private static drupalApi = new DrupalApi({
    baseURL: useRuntimeConfig().drupalBaseUrl,
  });

  static async getContent(url: string): Promise<Content | Page | Article> {
    const route = await this.drupalApi.getRoute(url);

    if (!route) throw notFound('Route not found.');

    const drupalContent = await this.drupalApi.getContent(
      route.entity.uuid,
      route.entity.bundle
    );

    if (!drupalContent) throw notFound('Content not found.');

    const { attributes } = drupalContent?.data;

    const content: Content = {
      bundle: route?.entity?.bundle,
      title: attributes?.title,
      createdOn: attributes?.created,
      updatedOn: attributes?.changed,
      alias: attributes?.path?.alias,
      locale: attributes?.path?.langcode,
      body: attributes?.body?.processed,
      summary: attributes?.body?.summary,
    };

    if (route.entity.bundle == 'page') {
      const page = content as Page;

      page.menu = drupalContent.data.attributes.field_menu;
    }

    if (route.entity.bundle == 'article') {
      const article = content as Article;
      const { field_image } = drupalContent?.data?.relationships;

      article.coverImage = {
        alt: field_image?.data?.meta?.alt,
        width: field_image?.data?.meta?.width,
        height: field_image?.data?.meta?.height,
        path: '',
      };

      const media = await this.drupalApi.getMedia(
        drupalContent.data.relationships.field_image.data.id
      );

      if (media) {
        article.coverImage = {
          ...article.coverImage,
          path: media?.data?.attributes?.uri?.url,
        };
      }
    }

    return content;
  }

  static async getArticles(
    sort: string,
    { limit, offset, status }: ArticlesQueryParamsOptions = {}
  ): Promise<Article[]> {
    const data = await this.drupalApi.getArticles(sort, {
      limit,
      offset,
      status,
    });
    const articlesData: {
      attributes: {
        path: {
          langcode: lstring;
          alias: string;
        };
        title: string;
        created: string;
        changed: string;
        body: {
          processed: string;
          summary: string;
        };
      };
      relationships: {
        field_image: {
          data: {
            id: string;
            meta: {
              alt: string;
              width: number;
              height: number;
            };
          };
        };
      };
    }[] = data.data;

    if (!articlesData) throw notFound('No Articles found');

    const articles: Article[] = articlesData.map(
      (article): Article => ({
        title: article.attributes.title,
        bundle: 'article',
        createdOn: new Date(article.attributes.created),
        updatedOn: new Date(article.attributes.changed),
        alias: article.attributes.path.alias,
        locale: article.attributes.path.langcode,
        body: article.attributes.body.processed,
        summary: article.attributes.body.summary,
        coverImage: {
          alt: article.relationships.field_image.data.meta.alt,
          width: article.relationships.field_image.data.meta.width,
          height: article.relationships.field_image.data.meta.height,
          path: article.relationships.field_image.data.id,
        },
      })
    );

    for await (const article of articles) {
      const media = await this.drupalApi.getMedia(article.coverImage.path);

      article.coverImage.path = media?.data?.attributes?.uri?.url;
    }

    return articles;
  }

  static async getMenu(id: string): Promise<Menu[]> {
    const data = await this.drupalApi.getMenu(id);

    if (!data) throw notFound('No menu found.');

    const menus: Menu[] = [];
    const items: { [key: string]: Menu } = {};

    data.forEach((item: any) => {
      const { title, url, weight, options } = item?.attributes;
      const parentId = item.attributes.parent;

      const menuItem: Menu = {
        title,
        url,
        position: weight,
        submenu: options?.attributes?.submenu,
        icon: options?.attributes?.icon,
        component: options?.attributes?.component,
        children: [],
      };

      items[item.id] = menuItem;

      if (parentId) {
        const parent = items[parentId];

        parent?.children?.push(menuItem);
      } else {
        menus.push(menuItem);
      }
    });

    return menus;
  }
}
