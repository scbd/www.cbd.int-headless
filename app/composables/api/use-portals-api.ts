import type { Portal } from '~~/types/portal'
import { PORTALS } from '~~/constants/api-paths'

export default async function usePortalsApi (portal: string): Promise<{ portals: Ref<Portal[]>, error: Ref<Error | undefined> }> {
  const { data: portals, error } = await useFetch<Portal[]>(PORTALS, {
    params: { portal },
    default: () => []
  })

  return { portals, error }
}
