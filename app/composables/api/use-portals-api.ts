import type { Portal } from '~~/types/portal'
import { PORTALS } from '~~/constants/api-paths'

export default function usePortalsApi (portal: string): { portals: Ref<Portal[]>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data: portals, pending, error } = useLazyFetch<Portal[]>(PORTALS, {
    params: { portal },
    default: () => []
  })

  return { portals, pending, error }
}
