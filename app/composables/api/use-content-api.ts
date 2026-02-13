import type { Content } from '~~/types/content'
import { CONTENT } from '~~/constants/api-paths'

export default async function useContentApi (url: string): Promise<{ content: Ref<Content | undefined>, pending: Ref<boolean>, error: Ref<Error | undefined> } > {
  const { data: content, pending, error } = await useFetch<Content>(CONTENT, {
    params: { url }
  })

  return { content, pending, error }
}
