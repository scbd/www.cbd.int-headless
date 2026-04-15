import type { Content } from '~~/types/content'
import { CONTENT } from '~~/constants/api-paths'
import { mandatory } from 'api-client/api-error'

export function getContent (url: MaybeRef<string>): ReturnType<typeof useAsyncData<Content | undefined>> {
  if (url === undefined || url === null) { throw mandatory('url is mandatory') }
  return useAsyncData<Content>(
    computed(() => `content-${unref(url) as string}`),
    () => $fetch<Content>(CONTENT, { params: { url: unref(url) } })
  )
}
