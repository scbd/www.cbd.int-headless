import type { Menu } from '~~/types/menu'

export default function useMenuApi (code: string, options?: { depth?: number, branch?: string, url?: string }): { menu: Ref<Menu[]>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data: menu, pending, error } = useLazyFetch<Menu[]>(`/api/menus/${code}`, {
    params: {
      depth: options?.depth,
      branch: options?.branch,
      url: options?.url
    },
    default: () => []
  })

  return { menu, pending, error }
}
