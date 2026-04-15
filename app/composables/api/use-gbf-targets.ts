import type { GbfTarget } from '~~/types/gbf-target'
import { GBF_TARGETS } from '~~/constants/api-paths'

export function getGbfTargetsList (): ReturnType<typeof useAsyncData<GbfTarget[]>> {
  return useAsyncData<GbfTarget[]>(
    'gbf-targets',
    () => $fetch<GbfTarget[]>(GBF_TARGETS),
    { default: () => [] as GbfTarget[] }
  )
}
