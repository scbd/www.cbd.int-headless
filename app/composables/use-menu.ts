import type { Menu } from '~~/types/menu'
import { mandatory } from 'api-client/api-error'

export function useMenu (): {
  getMenu: (code: MaybeRef<string>, options?: MaybeRef<{ depth?: number, branch?: string, url?: string }>) => ReturnType<typeof useAsyncData<Menu[]>>
} {
  function getMenu (code: MaybeRef<string>, options?: MaybeRef<{ depth?: number, branch?: string, url?: string }>): ReturnType<typeof useAsyncData<Menu[]>> {
    return useAsyncData<Menu[]>(
      computed(() => `menu-${unref(code) as string}-${JSON.stringify(unref(options))}`),
      () => {
        const c = unref(code) as string
        if (c === '' || c === undefined) { throw mandatory('code', 'code is mandatory') }
        return $fetch<Menu[]>(`/api/menus/${encodeURIComponent(c)}`, { params: unref(options) })
      },
      {
        lazy: true,
        default: () => [] as Menu[]
      }
    )
  }
  return { getMenu }
}
