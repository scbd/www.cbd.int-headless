import type { Menu } from '~~/types/menu'

export default function useMenuApi (code: string | undefined, options?: { depth?: number, branch?: string, url?: string }): { menu: Ref<Menu[]>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data: menu, pending, error } = useLazyFetch<Menu[]>(
    () => code !== undefined && code !== '' ? `/api/menus/${code}` : '',
    {
      params: {
        depth: options?.depth,
        branch: options?.branch,
        url: options?.url
      },
      default: () => []
    }
  )
  return { menu, pending, error }
}
