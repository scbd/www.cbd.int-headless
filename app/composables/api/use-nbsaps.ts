import type {
  Nbsap,
  NbsapList,
  NbsapOptions
} from '~~/types/nbsap'
import { NBSAPS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function useNbsapsApi (): { getNbsaps: (options?: NbsapOptions) => Promise<NbsapList> } {
  const getNbsaps = async (
    options?: NbsapOptions
  ): Promise<NbsapList> => {
    const { data } = await useFetch<NbsapList>(NBSAPS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: NbsapList = data.value

    return {
      total: response.total,
      rows: response.rows.map((nbsap: Nbsap) =>
        normalizeObjectDates(nbsap)
      )
    }
  }

  return { getNbsaps }
}
