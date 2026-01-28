import type { Menu } from '~~/types/menu'

export default function useMenuApi (): {
  getMenu: (code: string, options?: { depth?: number, branch?: string, url?: string }) => Promise<Menu[]>
} {
  const getMenu = async (
    code: string,
    options?: { depth?: number, branch?: string, url?: string }
  ): Promise<Menu[]> => {
    const response = await useFetch(`/api/menus/${code}`, {
      method: 'GET',
      params: {
        depth: options?.depth,
        branch: options?.branch,
        url: options?.url
      }
    })

    const menu: Menu[] = response.data.value ?? []

    return menu
  }

  return { getMenu }
}
