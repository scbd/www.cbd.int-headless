import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import StatementSearchList from './search-list.vue'
import { statements } from '~~/.storybook/fixtures/statements'
import { STATEMENTS } from '~~/constants/api-paths'

const meta = {
  component: StatementSearchList,
  parameters: {
    // a11y debt (color-contrast, landmark-unique, select-name): fix the component, then delete this line
    a11y: { test: 'todo' },
    // total > rows so the pagination is visible
    api: { [STATEMENTS]: { total: 120, rows: statements } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 640 } }
  }
} satisfies Meta<typeof StatementSearchList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoResults: Story = {
  parameters: { api: { [STATEMENTS]: { total: 0, rows: [] } } }
}
export const ApiError: Story = {
  parameters: { api: { [STATEMENTS]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
