import type { GbfTarget } from '~~/types/gbf-target'
import { GBF_TARGETS } from '~~/constants/api-paths'

export default function useGbfTargetsApi (): { gbfTargets: Ref<GbfTarget[]>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data: gbfTargets, pending, error } = useLazyFetch<GbfTarget[]>(GBF_TARGETS, {
    default: () => []
  })

  return { gbfTargets, pending, error }
}
