import type { Portal } from '~~/types/portal'
import { PORTALS } from '~~/constants/api-paths'
import { mandatory } from 'api-client/api-error'

export function getPortalList (portal: MaybeRef<string>): ReturnType<typeof useAsyncData<Portal[]>> {
  if (portal === undefined || portal === null) { throw mandatory('portal is mandatory') }
  return useAsyncData<Portal[]>(
    computed(() => `portals-${unref(portal) as string}`),
    () => $fetch<Portal[]>(PORTALS, { params: { portal: unref(portal) as string } }),
    { default: () => [] as Portal[] }
  )
}
