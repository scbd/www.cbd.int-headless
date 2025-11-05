import MeetingService from '../../../services/meeting'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code') ?? ''
  return await MeetingService.getMeeting(code)
})
