import { getNbsap } from '../../../services/nbsap'

export default defineEventHandler(async (event) => {
  const countryCode = getRouterParam(event, 'countrycode') ?? ''
  return await getNbsap(countryCode)
})
