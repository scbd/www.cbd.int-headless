import type { GbfTarget } from '~~/types/gbf-target'
import { GBF_TARGETS } from '~~/constants/api-paths'

export function useGbfTargets (): {
  getGbfTargetList: () => ReturnType<typeof useAsyncData<GbfTarget[]>>
} {
  function getGbfTargetList (): ReturnType<typeof useAsyncData<GbfTarget[]>> {
    return useAsyncData<GbfTarget[]>(
      'gbf-targets',
      () => $fetch<GbfTarget[]>(GBF_TARGETS),
      {
        lazy: true,
        default: () => [] as GbfTarget[]
      }
    )
  }
  return { getGbfTargetList }
}
