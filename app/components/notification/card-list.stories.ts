import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NotificationCardList from './card-list.vue'
import { notifications } from '~~/.storybook/fixtures/notifications'
import { NOTIFICATIONS } from '~~/constants/api-paths'

const meta = {
  component: NotificationCardList,
  parameters: {
    api: { [NOTIFICATIONS]: { total: notifications.length, rows: notifications } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 720 } }
  }
} satisfies Meta<typeof NotificationCardList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ApiError: Story = {
  parameters: { api: { [NOTIFICATIONS]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
