import type { Portal } from '~~/types/portal'
import { PORTALS } from '~~/constants/api-paths'

const handleErrorState = ({
  error,
  ...rest
}: {
  [key: string]: any
  error: any
}): { [key: string]: any } => {
  if (error.value != null) throw error.value
  return rest
}

export default function usePortalsApi (): { getPortals: (portal: string) => Promise<Portal[]> } {
  const getPortals = async (portal: string): Promise<Portal[]> => {
    const { data } = await useFetch<Portal[]>(PORTALS, {
      params: { portal }
    }).then(handleErrorState)

    return data.value
  }

  return { getPortals }
}
