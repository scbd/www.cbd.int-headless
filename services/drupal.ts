import { notFound } from "api-client/api-error";
import DrupalApi from "../api/drupal";
import type { Content, Article, Page, ArticleOptions } from "../types/content";
import type { Menu } from "../types/menu";
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

        if(route.entity.bundle == "article") { 
            const article = content as Article;
            const { meta } = drupalContent?.data?.relationships?.field_image?.data;

            article.coverImage =  {
                alt : meta?.alt,
                width : meta?.width,
                height : meta?.height,
                path : ""
            };

      if (media) {
        article.coverImage = {
          ...article.coverImage,
          path: media?.data?.attributes?.uri?.url,
        };
      }
    }

            if(media) {
                article.coverImage = {
                    ...article.coverImage,
                    path: media?.data?.attributes?.uri?.url
                };
            };
          };
        };
      };
    }[] = data.data;

    if (!articlesData) throw notFound('No Articles found');

    const articleList: Article[] = articlesData.map(
      (content): Article => ({
        title: content.attributes.title,
        bundle: 'article',
        createdOn: content.attributes.created,
        updatedOn: content.attributes.changed,
        alias: content.attributes.path.alias,
        locale: content.attributes.path.langcode,
        body: content.attributes.body.processed,
        summary: content.attributes.body.summary,
        coverImage: {
          alt: content.relationships.field_image.data.meta.alt,
          width: content.relationships.field_image.data.meta.width,
          height: content.relationships.field_image.data.meta.height,
          path: content.relationships.field_image.data.id,
        },
      })
    );

    for await (const article of articleList) {
      const media = await this.drupalApi.getMedia(article.coverImage.path);

      article.coverImage.path = media?.data?.attributes?.uri?.url;
    }

    return articleList;
  }

  static async getMenu(id: string): Promise<Menu[]> {
    const data = await this.drupalApi.getMenu(id);

    if (!data) throw notFound('No menu found.');

    const menus: Menu[] = [];
    const items: { [key: string]: Menu } = {};

    data.forEach((item: any) => {
      const { title, url, weight, options } = item?.attributes;
      const parentId = item.attributes.parent;

        return menus;
    };

    static async listArticles(options?: ArticleOptions): Promise<Article[]> {
        const data = await this.drupalApi.listArticles(options);

        const articles = await Promise.all(
            data.map(async (item: any) => {
                const { attributes } = item;
                const { meta } = item?.relationships?.field_image?.data;

                const content: Content = {
                    bundle: "article",
                    title: attributes?.title,
                    createdOn: attributes?.created,
                    updatedOn: attributes?.changed,
                    alias: attributes?.path?.alias,
                    locale: attributes?.path?.langcode,
                    body: attributes?.body?.processed,
                    summary: attributes?.body?.summary,
                };

                const article = content as Article;

                article.coverImage = {
                    alt: meta?.alt,
                    width: meta?.width,
                    height: meta?.height,
                    path: ""
                };

                const media = await this.drupalApi.getMedia(item?.relationships?.field_image?.data?.id);

                if (media) {
                    article.coverImage = {
                        ...article.coverImage,
                        path: media?.data?.attributes?.uri?.url
                    };
                }

                return article;
            })
        );

        return articles;
    };
};