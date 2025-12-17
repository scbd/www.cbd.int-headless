import type { GbfTarget } from '~~/types/gbf-target'
import { notFound } from 'api-client/api-error'
import SolrIndexApi from '~~/api/solr-index'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function getGbfTargets (): Promise<GbfTarget[]> {
  const response = await api.queryGbfTargets()

  if (response === undefined || response === null) throw notFound(response) // throw notFound('GBF Targets not found.')

  const gbfTargetList: GbfTarget[] = response.map((item: any): GbfTarget => ({
    id: item.termId,
    identifier: item.identifier,
    title: item.title,
    shortTitle: item.shortTitle,
    description: item.description,
    source: item.source,
    broaderTerms: item.broaderTerms,
    narrowerTerms: item.narrowerTerms,
    relatedTerms: item.relatedTerms,
    nonPreferredTerms: item.nonPreferredTerms
  }))

  return gbfTargetList
}
