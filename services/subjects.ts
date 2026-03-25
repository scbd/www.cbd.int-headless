import ThesaurusApi from '~~/api/thesaurus'
import { notFound } from 'api-client/api-error'
import type { ThesaurusQuery } from '~~/types/api/thesaurus'
import type { Subject } from '~~/types/subject'

const api = new ThesaurusApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function getSubjects (domain: string): Promise<Subject[]> {
  const response = await api.queryThesaurus(domain)

  if (response === undefined || response === null) throw notFound(response)

  const subjectList: Subject[] = response.map((item: ThesaurusQuery): Subject => ({
    identifier: item.identifier,
    title: item.title ?? {},
    shortTitle: item.shortTitle ?? {}
  }))

  return subjectList
}
