import type { OasisArticleQuery } from '~~/types/api/oasis'
import { OASIS } from '~~/constants/api-paths'

export default async function useOasisApi (category: string, code: string): Promise<{ oasis: Ref<OasisArticleQuery | undefined>, error: Ref<Error | undefined> }> {
  const { data: oasis, error } = await useFetch<OasisArticleQuery>(`${OASIS}/${encodeURIComponent(category)}/${encodeURIComponent(code)}`)

  return { oasis, error }
}
