import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import SearchResultsList from './results-list.vue'
import { searchResults } from '~~/.storybook/fixtures/search-results'
import { SEARCH } from '~~/constants/api-paths'

const meta = {
  component: SearchResultsList,
  parameters: {
    // a11y debt (color-contrast, landmark-unique, select-name): fix the component, then delete this line
    a11y: { test: 'todo' },
    // total > rows so the pagination is visible
    api: { [SEARCH]: { total: 120, rows: searchResults } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 640 } }
  }
} satisfies Meta<typeof SearchResultsList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoResults: Story = {
  parameters: { api: { [SEARCH]: { total: 0, rows: [] } } }
}
export const ApiError: Story = {
  parameters: { api: { [SEARCH]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
