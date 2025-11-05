import type { Menu } from '~~/types/menu'

export default function useMenuApi () {
  const getMenu = async (menuName: string): Promise<Menu[]> => {
    const response = await useFetch('/api/menus', {
      method: 'GET',
      params: {
        menu: menuName
      },
    })

    const menu: Menu[] = response.data.value ?? []

    return menu
  };

  return { getMenu }
}
