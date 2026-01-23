import type { Content } from '~~/types/content'
import { CONTENT } from '~~/constants/api-paths'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function useContentApi (): { getContent: (url: string) => Promise<Content> } {
  const getContent = async (url: string): Promise<Content> => {
    const { data } = await useFetch<Content>(CONTENT, {
      params: {
        url
      }
    }).then(handleErrorState)

    return data.value
  }

  return { getContent }
}
