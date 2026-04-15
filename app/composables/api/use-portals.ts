import type { Portal } from '~~/types/portal'
import { PORTALS } from '~~/constants/api-paths'
import { mandatory } from 'api-client/api-error'

export function getPortalList (portal: MaybeRef<string>): ReturnType<typeof useAsyncData<Portal[]>> {
  const p = unref(portal) as string
  if (p === '') { throw mandatory('portal is mandatory') }
  return useAsyncData<Portal[]>(
    computed(() => `portals-${p}`),
    () => $fetch<Portal[]>(PORTALS, { params: { portal: p } }),
    { default: () => [] as Portal[] }
  )
}
