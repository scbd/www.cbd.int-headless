import type { Menu } from '~~/types/menu'
import { mandatory } from 'api-client/api-error'

export function getMenu (code: string, options?: { depth?: number, branch?: string, url?: string }): ReturnType<typeof useAsyncData<Menu[]>> {
  if (code === undefined || code === null) { throw mandatory('code is mandatory') }
  return useAsyncData<Menu[]>(
    `menu-${code}`,
    () => $fetch<Menu[]>(`/api/menus/${code}`, { params: options }),
    { default: () => [] as Menu[] }
  )
}
