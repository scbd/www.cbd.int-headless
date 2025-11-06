import type { Portal } from '~~/types/portal'
import { PORTALS } from '~~/constants/api-paths'

const handleErrorState = ({
  error,
  ...rest
}: {
  [key: string]: any
  error: any
}): { [key: string]: any } => {
  if (error.value === null || error.value === undefined) {
    return rest
  } else {
    throw error.value
  }
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
