import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NotificationSubmissions from './submissions.vue'
import { notificationWithSubmissions, submissions } from '~~/.storybook/fixtures/notifications'
import { countries } from '~~/.storybook/fixtures/countries'
import { COUNTRIES, SUBMISSIONS } from '~~/constants/api-paths'

const { code } = notificationWithSubmissions

const meta = {
  component: NotificationSubmissions,
  args: { code },
  parameters: {
    api: {
      [`${SUBMISSIONS}/${code}`]: { total: submissions.length, rows: submissions },
      [COUNTRIES]: { total: countries.length, rows: countries }
    },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 700 } }
  }
} satisfies Meta<typeof NotificationSubmissions>

export default meta
type Story = StoryObj<typeof meta>

export const PartiesAndObservers: Story = {}
// Without countries every submitter shows its raw government code and counts as an observer
export const CountriesUnavailable: Story = {
  parameters: { api: { [COUNTRIES]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
