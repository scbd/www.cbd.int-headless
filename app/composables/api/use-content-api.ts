import type { Content } from '~~/types/content'
import { CONTENT } from '~~/constants/api-paths'

export default function useContentApi (url: string): { content: Ref<Content | undefined>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data: content, pending, error } = useLazyFetch<Content>(CONTENT, {
    params: { url }
  })

  return { content, pending, error }
}
