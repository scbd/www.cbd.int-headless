import type { Portal } from '~~/types/portal'
import { PORTALS } from '~~/constants/api-paths'
import { handleErrorState } from '~~/utils/api-states'

export default function usePortalsApi (): { getPortals: (portal: string) => Promise<Portal[]> } {
  const getPortals = async (portal: string): Promise<Portal[]> => {
    const { data } = await useFetch<Portal[]>(PORTALS, {
      params: { portal }
    }).then(handleErrorState)

    return data.value
  }

  return { getPortals }
}
