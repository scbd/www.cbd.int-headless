import { notFound, badRequest } from 'api-client/api-error'
import DrupalApi from '../api/drupal'
import type { Content, Article } from '../types/content'
import type { QueryParams } from '~~/types/api/query-params'
import type { Menu } from '../types/menu'
import type { Portal } from '../types/portal'
import { MENU_CACHE_DURATION_MS } from '../constants/cache'
import { DRUPAL_IMAGE_PATH } from '~~/constants/image-paths'

const drupalApi = new DrupalApi({
  baseURL: useRuntimeConfig().drupalBaseUrl
})

// Cache structure
interface MenuCacheEntry {
  data: ProcessedMenuItem[]
  timestamp: number
  promise?: Promise<ProcessedMenuItem[]>
}

// Preprocessed menu item for efficient filtering
interface ProcessedMenuItem {
  id: string
  title: string
  url: string
  position: number
  submenu?: string
  icon?: string
  component?: string
  parentId: string | null
  depth: number
  childrenIds: string[]
  childrenCount: number
}

// In-memory cache: Map<menuCode, MenuCacheEntry>
const menuCache = new Map<string, MenuCacheEntry>()

export async function getContent (url: string): Promise<Content | Article> {
  const route = await drupalApi.getRoute(url)

  if (route?.entity?.uuid === null) throw notFound('Route not found.')

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
    body: contentNormalizer(attributes?.body?.processed),
    summary: attributes?.body?.summary
  }

  if (route.entity.bundle === 'page') {
    const page = content

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
        path: contentNormalizer(media?.data?.attributes?.uri?.url)
      }
    };
  };

  return content
};

export async function getPortal (id: string): Promise<Portal[]> {
  const data = await drupalApi.getMenu(id)

  if (data === null || data === '') throw notFound('No portal found.')

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

export async function listArticles (options?: QueryParams): Promise<Article[]> {
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
        body: contentNormalizer(attributes?.body?.processed),
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
          path: contentNormalizer(media?.data?.attributes?.uri?.url)
        }
      }

      return article
    })
  )

  return articles
}

async function loadCachedMenu (code: string): Promise<ProcessedMenuItem[]> {
  const now = Date.now()
  const cached = menuCache.get(code)

  // Return cached data if valid (not expired)
  if (cached != null && (now - cached.timestamp) < MENU_CACHE_DURATION_MS) {
    return cached.data
  }

  // If there's an in-flight request, handle stale-while-revalidate pattern
  if (cached?.promise != null) {
    // Return stale/expired data immediately if we have it and it's not empty
    if (cached.data != null && cached.data.length > 0) {
      return cached.data
    }
    // Otherwise, wait for the in-flight request to complete
    return await cached.promise
  }

  // Create new promise for this load
  const loadPromise = (async () => {
    const rawData = await drupalApi.getMenu(code)

    if (rawData === null || rawData === '') {
      throw notFound('No menu found.')
    }

    // Build lookup map
    const itemsById = new Map<string, any>()
    rawData.forEach((item: any) => {
      itemsById.set(item.id, item)
    })

    // Calculate depth for each item recursively
    const getDepth = (itemId: string, visited = new Set<string>()): number => {
      if (visited.has(itemId)) return 0 // Circular reference protection
      visited.add(itemId)

      const item = itemsById.get(itemId)
      if (item == null) return 0

      const parentId = item.attributes.parent
      if (parentId === '' || parentId === null) return 0

      return 1 + getDepth(parentId, visited)
    }

    // Build children relationships
    const childrenMap = new Map<string, string[]>()
    rawData.forEach((item: any) => {
      const parentId = item.attributes.parent
      if (parentId !== '' && parentId !== null) {
        if (!childrenMap.has(parentId)) {
          childrenMap.set(parentId, [])
        }
        const children = childrenMap.get(parentId)
        if (children != null) {
          children.push(item.id)
        }
      }
    })

    // Process all items
    const processed: ProcessedMenuItem[] = rawData.map((item: any) => {
      const { title, url, weight, options } = item.attributes
      const parentId = item.attributes.parent
      const childrenIds = childrenMap.get(item.id) ?? []

      return {
        id: item.id,
        title,
        url,
        position: weight,
        submenu: options?.attributes?.submenu,
        icon: options?.attributes?.icon,
        component: options?.attributes?.component,
        parentId: (parentId === '' || parentId === null) ? null : parentId,
        depth: getDepth(item.id),
        childrenIds,
        childrenCount: childrenIds.length
      }
    })

    // Cache the result
    menuCache.set(code, {
      data: processed,
      timestamp: now
    })

    return processed
  })()

  // Store promise to prevent concurrent requests
  // Preserve existing stale data if available
  menuCache.set(code, {
    data: cached?.data ?? [],
    timestamp: cached?.timestamp ?? 0,
    promise: loadPromise
  })

  // Return stale data immediately if available, otherwise wait for fresh data
  if (cached?.data != null && cached.data.length > 0) {
    return cached.data
  }

  return await loadPromise
}

/**
 * Retrieves and filters menu items from Drupal CMS with caching support
 *
 * @param code - Menu identifier (e.g., 'main-menu', 'cbd-header', 'footer-menu')
 * @param options - Optional filtering parameters
 * @param options.depth - Maximum depth of menu hierarchy to return
 *   - 0: Only root level items (no children included, but childrenCount is set)
 *   - 1: Root items + 1 level of children
 *   - 2: Root items + 2 levels of children
 *   - n: Root items + n levels of children
 *   - undefined: Full tree (all levels)
 *   - Note: Last level items will have childrenCount but no children array
 * @param options.branch - Menu item ID to use as root (returns subtree starting from this item)
 *   - Must be a valid menu item ID from Drupal JSON:API
 *   - When combined with depth, limits levels from the branch item
 *   - Example: branch='item-123', depth=2 returns item-123 with 2 levels of descendants
 *
 * @returns Promise resolving to array of Menu items
 *   - All items include branchId and childrenCount fields
 *   - Cached for 5 minutes to reduce Drupal API calls
 *   - Concurrent requests share the same promise
 *
 * @throws {Error} If menu code is not found in Drupal
 * @throws {Error} If branch ID is specified but not found in menu
 *
 * @example
 * // Get full menu tree
 * const menu = await getMenu('main-menu')
 *
 * @example
 * // Get only root items
 * const roots = await getMenu('main-menu', { depth: 0 })
 *
 * @example
 * // Get root + 2 levels
 * const limited = await getMenu('main-menu', { depth: 2 })
 *
 * @example
 * // Get subtree starting from specific item
 * const subtree = await getMenu('main-menu', { branch: 'menu-item-123' })
 *
 * @example
 * // Get subtree with limited depth
 * const subtreeLimited = await getMenu('main-menu', { branch: 'menu-item-123', depth: 1 })
 */
export async function getMenu (
  code: string,
  options: { depth?: number, branch?: string, url?: string } = {}
): Promise<Menu[]> {
  if (options?.branch != null && options?.url != null) throw badRequest('Can only get menu with branch or url at once')

  // Load preprocessed menu data
  const processedItems = await loadCachedMenu(code)

  // loading a branch via its url
  if (options?.url != null) {
    options.branch = processedItems.find(item => item.url === options.url)?.id

    // If a specific url was requested but not found, signal this explicitly
    if (options.branch == null) {
      throw notFound(`Menu url '${options.url}' not found`)
    }

    delete options.url
  }

  // Apply depth filtering if specified
  let maxDepth: number | undefined
  if (options?.depth != null) {
    maxDepth = options.depth
  }

  const itemToMenu = (item: ProcessedMenuItem): Menu => ({
    branchId: item.id,
    parentId: item.parentId,
    title: item.title,
    url: item.url,
    position: item.position,
    submenu: item.submenu,
    component: item.component,
    icon: item.icon,
    childrenCount: item.childrenCount
  })

  // Build hierarchical structure
  const buildHierarchy = (branchId: string | null = null, parentId: string | null = null, currentDepth: number = 0): Menu[] => {
    const items = branchId != null
      ? processedItems.filter(item => item.id === branchId)
      : processedItems
        .filter(item => item.parentId === parentId)
        .sort((a, b) => a.position - b.position)

    return items.map(item => {
      const menu: Menu = {
        ...itemToMenu(item),
        ...branchId != null && { activeBranch: true }
      }

      // Include children if we haven't reached max depth
      if (maxDepth === undefined || currentDepth < maxDepth) {
        const children = buildHierarchy(null, item.id, currentDepth + 1)
        if (children.length > 0) {
          menu.children = children
        }
      }

      return menu
    })
  }

  // Start building from root
  const menus = buildHierarchy(options.branch)

  // If a specific branch was requested but not found, signal this explicitly
  if (options.branch != null && menus.length === 0) {
    throw notFound(`Menu branch '${options.branch}' not found`)
  }

  // if we pulled from a specific branch traverse ancestors
  // note that in this case we only have one root menu item
  while (options.branch != null && menus[0] !== undefined && menus[0] != null && menus[0]?.parentId != null) {
    const parentMenus = buildHierarchy(menus[0].parentId)
    const parentMenu = parentMenus[0]
    const branchId = menus[0].branchId

    if (parentMenu?.children !== undefined && menus[0] !== undefined) {
      // replace current menu to make sure we build the hierarchy
      const child = parentMenu?.children.find(item => item.branchId === branchId)
      if (child !== undefined) Object.assign(child, menus[0])

      menus[0] = {
        ...parentMenu,
        children: parentMenu?.children
      }
    }
  }

  return menus
};

function contentNormalizer (value: string): string {
  if (value === undefined) throw new Error('Value is undefined')
  if (value === null) throw new Error('Value is null')
  if (value === '') throw new Error('Value is empty')

  // Convert Drupal image paths to use the path defined on the nuxt.config.ts
  value = value.replace(/\/sites\/default\/files\//g, DRUPAL_IMAGE_PATH)
  // Add Bootstrap flex class to WP columns block to allow three columns display to work on the front-end
  value = value.replace(/wp-block-columns/g, 'wp-block-columns d-flex')

  return value
}
