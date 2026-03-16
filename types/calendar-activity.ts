import type { LString } from '@scbd/vue-components'

export interface CalendarActivity {
  id: string
  title: LString
  url: string | null
  actionRequiredByParties: boolean
  startDate: Date | null
  endDate: Date | null
  createdOn: Date
  updatedOn: Date
}
