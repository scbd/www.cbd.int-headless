import type { Content } from '~~/types/content'
import { CONTENT } from '~~/constants/api-paths'
import { mandatory } from 'api-client/api-error'

export function getContent (url: MaybeRef<string>): ReturnType<typeof useAsyncData<Content | undefined>> {
  const u = unref(url) as string
  if (u === '') { throw mandatory('url is mandatory') }
  return useAsyncData<Content>(
    computed(() => `content-${u}`),
    () => $fetch<Content>(CONTENT, { params: { url: u } })
  )
}
