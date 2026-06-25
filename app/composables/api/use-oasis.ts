import type { OasisArticleQuery } from '~~/types/api/oasis'
import { OASIS } from '~~/constants/api-paths'

export default async function useOasisApi (adminTags: string[]): Promise<{ oasisContent: Ref<OasisArticleQuery | undefined>, error: Ref<Error | undefined> }> {
  const path = adminTags.map(encodeURIComponent).join('/')
  const { data: oasisContent, error } = await useFetch<OasisArticleQuery>(`${OASIS}/${path}`)

  return { oasisContent, error }
}
