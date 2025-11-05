import { getMeeting } from '../../../services/meeting'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await getMeeting(code)
})
