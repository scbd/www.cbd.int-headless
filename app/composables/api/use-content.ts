import type { Content } from '~~/types/content'
import { CONTENT } from '~~/constants/api-paths'
import { mandatory } from 'api-client/api-error'

export function getContent (url: MaybeRef<string>): ReturnType<typeof useAsyncData<Content | undefined>> {
  return useAsyncData<Content>(
    computed(() => `content-${unref(url) as string}`),
    () => {
      const u = unref(url) as string
      if (u === '' || u === undefined) throw mandatory('url is mandatory')
      return $fetch<Content>(CONTENT, { params: { url: u } })
    }
  )
}
