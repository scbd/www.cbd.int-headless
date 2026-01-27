import type { Page } from '~~/types/content'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function usePageApi (): { getPage: (url: string) => Promise<Page> } {
  const getPage = async (url: string): Promise<Page> => {
    const { data } = await useFetch<Page>('/api/content/', {
      params: {
        url
      }
    }).then(handleErrorState)

    return data?.value
  }

  return { getPage }
}
