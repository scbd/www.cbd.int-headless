import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import RecentUpdateCardList from './card-list.vue'
import { recentUpdates } from '~~/.storybook/fixtures/recent-updates'
import { RECENT_UPDATES } from '~~/constants/api-paths'

const meta = {
  component: RecentUpdateCardList,
  parameters: {
    // a11y debt (color-contrast): fix the component, then delete this line
    a11y: { test: 'todo' },
    api: { [RECENT_UPDATES]: { total: recentUpdates.length, rows: recentUpdates } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 560 } }
  }
} satisfies Meta<typeof RecentUpdateCardList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ApiError: Story = {
  parameters: { api: { [RECENT_UPDATES]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
