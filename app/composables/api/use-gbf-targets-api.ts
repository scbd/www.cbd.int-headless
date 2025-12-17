import type { GbfTarget } from '~~/types/gbf-target'
import { GBF_TARGETS } from '~~/constants/api-paths'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function useGbfTargetsApi (): { getGbfTargets: () => Promise<GbfTarget[]> } {
  const getGbfTargets = async (): Promise<GbfTarget[]> => {
    const { data } = await useFetch<GbfTarget[]>(GBF_TARGETS).then(handleErrorState)

    return data.value as GbfTarget[]
  }

  return { getGbfTargets }
}
