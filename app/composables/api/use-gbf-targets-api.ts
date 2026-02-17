import type { GbfTarget } from '~~/types/gbf-target'
import { GBF_TARGETS } from '~~/constants/api-paths'

export default async function useGbfTargetsApi (): Promise<{ gbfTargets: Ref<GbfTarget[]>, error: Ref<Error | undefined> } > {
  const { data: gbfTargets, error } = await useFetch<GbfTarget[]>(GBF_TARGETS, {
    default: () => []
  })

  return { gbfTargets, error }
}
