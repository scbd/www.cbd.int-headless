import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NotificationContent from './content.vue'
import { notification1, notificationWithSubmissions, submissions } from '~~/.storybook/fixtures/notifications'
import { countries } from '~~/.storybook/fixtures/countries'
import { COUNTRIES, NOTIFICATIONS, SUBMISSIONS } from '~~/constants/api-paths'

const { code } = notificationWithSubmissions

const meta = {
  component: NotificationContent,
  args: { code },
  parameters: {
    // a11y debt (color-contrast): fix the component, then delete this line
    a11y: { test: 'todo' },
    api: {
      [`${NOTIFICATIONS}/${code}`]: notificationWithSubmissions,
      [`${SUBMISSIONS}/${code}`]: { total: submissions.length, rows: submissions },
      [COUNTRIES]: { total: countries.length, rows: countries }
    },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 900 } }
  }
} satisfies Meta<typeof NotificationContent>

export default meta
type Story = StoryObj<typeof meta>

export const HtmlWithSubmissions: Story = {}
export const PlainText: Story = {
  args: { code: notification1.code },
  parameters: {
    api: {
      [`${NOTIFICATIONS}/${notification1.code}`]: notification1,
      [`${SUBMISSIONS}/${notification1.code}`]: { total: 0, rows: [] }
    }
  }
}
export const NotFound: Story = {
  args: { code: '2026-999' },
  parameters: { api: { [`${NOTIFICATIONS}/2026-999`]: new Response(null, { status: 404, statusText: 'Not Found' }) } }
}
