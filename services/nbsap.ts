import { mandatory, notFound } from 'api-client/api-error'
import SolrIndexApi from '../api/solr-index'
import { solrEscape, toLString, toLStringArray } from '../utils/solr'
import type { SolrQuery } from '../types/api/solr'
import type { Nbsap, NbsapList, NbsapOptions } from '../types/nbsap'
import type { LString } from 'api-client'

function normalizeNbsapCode (code: string): string {
  return code.toLowerCase()
};
const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function getNbsap (countryCode: string): Promise<Nbsap> {
  if (countryCode === null || countryCode === '') throw mandatory('Country Code', 'NBSAP Country code is required.')
  const data = await searchNbsaps({ countryCode: normalizeNbsapCode(countryCode) })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`NBSAP for '${countryCode}' not found.`)
  return data.rows[0] as Nbsap
}

export async function listNbsaps (options: NbsapOptions): Promise<NbsapList> {
  return await searchNbsaps(options)
}

async function searchNbsaps (options?: NbsapOptions & { countryCode?: string }): Promise<NbsapList> {
  const query = options?.countryCode !== undefined && options.countryCode !== '' ? `government_s:${solrEscape(options.countryCode)}` : '*.*'
  console.log(query)

  const params: SolrQuery = {
    query,
    fieldQueries: 'schema_s:nbsap',
    sort: options?.sort ?? 'updatedDate_dt DESC',
    fields: 'id,title_*_t,government_s,government_*_t,jurisdiction_*_t,countryRegions_*_txt,url_ss,summary_*_t,indexedDate_dt,createdDate_dt,startDate_dt,endDate_dt,updatedDate_dt,submittedDate_dt,adoptionDate_dt,documentLinks_s',
    start: options?.skip ?? 0,
    rowsPerPage: options?.limit ?? 25
  }

  const { response } = await api.querySolr(params)

  const nbsapList: Nbsap[] = response.docs.map((item: any): Nbsap => ({
    id: item.id,
    title: toLString(item, 'title'),
    countryCode: item.government_s,
    government: toLString(item, 'government'),
    jurisdiction: toLString(item, 'jurisdiction'),
    regions: toLStringArray(item, 'countryRegions'),
    indexedOn: new Date(item.indexedDate_dt),
    submittedOn: new Date(item.submittedDate_dt),
    createdOn: new Date(item.createdDate_dt),
    updatedOn: new Date(item.updatedDate_dt),
    startOn: new Date(item.startDate_dt),
    endOn: new Date(item.endDate_dt),
    adoptionOn: new Date(item.adoptionDate_dt),
    summary: toLString(item, 'summary'),
    url: item.url_ss.toString(),
    documents: (JSON.parse(item.documentLinks_s) ?? []).map((document: any) => {
      return {
        [document.language as keyof LString]: {
          name: document.name,
          url: document.url,
          tags: typeof document.tag === 'string' ? document.tag.split(', ') : undefined
        }
      }
    })
  }))

  return {
    total: response.numFound,
    rows: nbsapList
  }
}
