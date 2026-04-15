import type { Menu } from '~~/types/menu'
import { mandatory } from 'api-client/api-error'

export function getMenu (code: MaybeRef<string>, options?: MaybeRef<{ depth?: number, branch?: string, url?: string }>): ReturnType<typeof useAsyncData<Menu[]>> {
  const c = unref(code) as string
  if (c === '') { throw mandatory('code is mandatory') }
  return useAsyncData<Menu[]>(
    computed(() => `menu-${c}-${JSON.stringify(unref(options))}`),
    () => $fetch<Menu[]>(`/api/menus/${c}`, { params: unref(options) }),
    { default: () => [] as Menu[] }
  )
}
