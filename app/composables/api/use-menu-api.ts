import type { Menu } from '~~/types/menu'

export default async function useMenuApi (code: string, options?: { depth?: number, branch?: string, url?: string }): Promise<{ menu: Ref<Menu[]>, error: Ref<Error | undefined> }> {
  const { data: menu, error } = await useFetch<Menu[]>(`/api/menus/${code}`,
    {
      params: {
        depth: options?.depth,
        branch: options?.branch,
        url: options?.url
      },
      default: () => []
    }
  )

  return { menu, error }
}
