import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NotificationSearchList from './search-list.vue'
import { notifications } from '~~/.storybook/fixtures/notifications'
import { NOTIFICATIONS } from '~~/constants/api-paths'

const meta = {
  component: NotificationSearchList,
  parameters: {
    // a11y debt (color-contrast, landmark-unique, select-name): fix the component, then delete this line
    a11y: { test: 'todo' },
    // total > rows so the pagination is visible
    api: { [NOTIFICATIONS]: { total: 120, rows: notifications } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 640 } }
  }
} satisfies Meta<typeof NotificationSearchList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoResults: Story = {
  parameters: { api: { [NOTIFICATIONS]: { total: 0, rows: [] } } }
}
export const ApiError: Story = {
  parameters: { api: { [NOTIFICATIONS]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
