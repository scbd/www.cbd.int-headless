import type { Content } from '~~/types/content'
import { CONTENT } from '~~/constants/api-paths'
import { emptyKey } from '~~/utils/solr'
import { mandatory } from 'api-client/api-error'

export function useContent (): {
  getContent: (url: MaybeRef<string>) => ReturnType<typeof useAsyncData<Content | undefined>>
} {
  function getContent (url: MaybeRef<string>): ReturnType<typeof useAsyncData<Content | undefined>> {
    return useAsyncData<Content | undefined>(
      computed(() => `content-${unref(url) as string}`),
      () => {
        const u = unref(url) as string
        if (emptyKey(u)) throw mandatory('url', 'url is mandatory')
        return $fetch<Content>(CONTENT, { params: { url: u } })
      },
      { lazy: true }
    )
  }

  return { getContent }
}
