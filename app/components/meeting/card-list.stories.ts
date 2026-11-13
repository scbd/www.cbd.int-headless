import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import MeetingCardList from './card-list.vue'
import { meetings } from '~~/.storybook/fixtures/meetings'
import { MEETINGS } from '~~/constants/api-paths'

const meta = {
  component: MeetingCardList,
  parameters: {
    api: { [MEETINGS]: { total: meetings.length, rows: meetings } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 520 } }
  }
} satisfies Meta<typeof MeetingCardList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ApiError: Story = {
  parameters: { api: { [MEETINGS]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
