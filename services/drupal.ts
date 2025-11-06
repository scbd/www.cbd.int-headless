import { notFound } from 'api-client/api-error'
import DrupalApi from '../api/drupal'
import type { Content, Article, Page, ArticleOptions } from '../types/content'
import type { Menu } from '../types/menu'
import type { Portal } from '../types/portal'

const drupalApi = new DrupalApi({
  baseURL: useRuntimeConfig().drupalBaseUrl
})

export async function getContent (url: string): Promise<Content | Page | Article> {
  const route = await drupalApi.getRoute(url)

  if (route === null) throw notFound('Route not found.')

  const drupalContent = await drupalApi.getContent(route.entity.uuid, route.entity.bundle)

  if (drupalContent === null) throw notFound('Content not found.')

  const { attributes } = drupalContent?.data

  const content: Content = {
    bundle: route?.entity?.bundle,
    title: attributes?.title,
    createdOn: attributes?.created,
    updatedOn: attributes?.changed,
    alias: attributes?.path?.alias,
    locale: attributes?.path?.langcode,
    body: attributes?.body?.processed,
    summary: attributes?.body?.summary
  }

  if (route.entity.bundle === 'page') {
    const page = content as Page

    page.menu = drupalContent.data.attributes.field_menu
  }

  if (route.entity.bundle === 'article') {
    const article = content as Article
    const { meta } = drupalContent?.data?.relationships?.field_image?.data

    article.coverImage = {
      alt: meta?.alt,
      width: meta?.width,
      height: meta?.height,
      path: ''
    }

    const media = await drupalApi.getMedia(drupalContent.data.relationships.field_image.data.id)

    if (media !== null) {
      article.coverImage = {
        ...article.coverImage,
        path: media?.data?.attributes?.uri?.url
      }
    };
  };

  return content
};

export async function getMenu (id: string): Promise<Menu[]> {
  const data = await drupalApi.getMenu(id)

  if (data == null || data === '') throw notFound('No menu found.')

  const menus: Menu[] = []
  const items: { [ key: string ]: Menu } = {}

  data.forEach((item: any) => {
    const { title, url, weight, options } = item?.attributes
    const parentId = item.attributes.parent

    const menuItem: Menu = {
      title,
      url,
      position: weight,
      submenu: options?.attributes?.submenu,
      icon: options?.attributes?.icon,
      component: options?.attributes?.component,
      children: []
    }

    items[item.id] = menuItem

    if (parentId !== '' && parentId !== null) {
      const parent = items[parentId]

      parent?.children?.push(menuItem)
    } else {
      menus.push(menuItem)
    }
  })

  return menus
};

export async function getPortal (id: string): Promise<Portal[]> {
  const data = await drupalApi.getMenu(id)

  if (data == null || data === '') throw notFound('No portal found.')

  const portals: Portal[] = []
  const items: { [ key: string ]: Portal } = {}

  data.forEach((item: any) => {
    const { title, url, weight, options } = item?.attributes
    const parentId = item.attributes.parent

    const portalItem: Portal = {
      title,
      url,
      position: weight,
      submenu: options?.attributes?.submenu,
      icon: options?.attributes?.icon,
      component: options?.attributes?.component,
      children: []
    }

    items[item.id] = portalItem

    if (parentId !== '' && parentId !== null) {
      const parent = items[parentId]

      parent?.children?.push(portalItem)
    } else {
      portals.push(portalItem)
    }
  })

  return portals
};

export async function listArticles (options?: ArticleOptions): Promise<Article[]> {
  const data = await drupalApi.listArticles(options)

  const articles = await Promise.all(
    data.map(async (item: any) => {
      const { attributes } = item
      const { meta } = item?.relationships?.field_image?.data

      const content: Content = {
        bundle: 'article',
        title: attributes?.title,
        createdOn: attributes?.created,
        updatedOn: attributes?.changed,
        alias: attributes?.path?.alias,
        locale: attributes?.path?.langcode,
        body: attributes?.body?.processed,
        summary: attributes?.body?.summary
      }

      const article = content as Article

      article.coverImage = {
        alt: meta?.alt,
        width: meta?.width,
        height: meta?.height,
        path: ''
      }

      const media = await drupalApi.getMedia(item?.relationships?.field_image?.data?.id)

      if (media !== null) {
        article.coverImage = {
          ...article.coverImage,
          path: media?.data?.attributes?.uri?.url
        }
      }

      return article
    })
  )

  return articles
}
