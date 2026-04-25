import type { Portal } from '~~/types/portal'
import { PORTALS } from '~~/constants/api-paths'
import { mandatory } from 'api-client/api-error'
import { emptyKey } from '~~/utils/solr'

export function usePortals (): {
  getPortalList: (portal: MaybeRef<string>) => ReturnType<typeof useAsyncData<Portal[]>>
} {
  function getPortalList (portal: MaybeRef<string>): ReturnType<typeof useAsyncData<Portal[]>> {
    return useAsyncData<Portal[]>(
      computed(() => `portals-${unref(portal) as string}`),
      () => {
        const p = unref(portal) as string
        if (emptyKey(p)) { throw mandatory('portal', 'portal is mandatory') }
        return $fetch<Portal[]>(PORTALS, { params: { portal: p } })
      },
      {
        lazy: true,
        default: () => [] as Portal[]
      }
    )
  }

  return { getPortalList }
}
