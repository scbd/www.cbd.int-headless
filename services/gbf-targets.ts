import ThesaurusApi from '~~/api/thesaurus'
import { toLString } from '~~/utils/solr'
import { notFound } from 'api-client/api-error'
import type { GbfTarget } from '~~/types/gbf-target'
import type { ThesaurusQuery } from '~~/types/api/thesaurus'

const api = new ThesaurusApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function getGbfTargets (): Promise<GbfTarget[]> {
  const domain = 'GBF-TARGETS'
  const response = await api.queryThesaurus(domain)

  if (response === undefined || response === null) throw notFound(response) // TODO: revise the error throw and ensure a standard response: 'GBF Targets not found.'

  const gbfTargetList: GbfTarget[] = response.map((item: ThesaurusQuery): GbfTarget => ({
    identifier: item.identifier,
    title: toLString(item, 'title'),
    shortTitle: toLString(item, 'shortTitle')
  }))

  return gbfTargetList
}
