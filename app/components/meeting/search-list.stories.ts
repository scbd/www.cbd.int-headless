import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import MeetingSearchList from './search-list.vue'
import { meetingSearchResults } from '~~/.storybook/fixtures/search-extra'
import { MEETINGS } from '~~/constants/api-paths'

const meta = {
  component: MeetingSearchList,
  parameters: {
    // total > rows so the pagination is visible
    api: { [MEETINGS]: { total: 120, rows: meetingSearchResults } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 640 } }
  }
} satisfies Meta<typeof MeetingSearchList>

export default meta
type Story = StoryObj<typeof meta>

// Rows are grouped by month and split into Upcoming / Previous around today (the fixture straddles 2026-11-13)
export const Default: Story = {}
export const NoResults: Story = {
  parameters: { api: { [MEETINGS]: { total: 0, rows: [] } } }
}
export const ApiError: Story = {
  parameters: { api: { [MEETINGS]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
