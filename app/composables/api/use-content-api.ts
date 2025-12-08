import type { Content } from '~~/types/content'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function usePageApi (): { getPage: (url: string) => Promise<Content> } {
  const getPage = async (url: string): Promise<Content> => {
    const { data } = await useFetch<Content>('/api/content/', {
      params: {
        url
      }
    }).then(handleErrorState)

    return data
  }

  return { getPage }
}
