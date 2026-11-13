import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import ArticleSearchList from './search-list.vue'
import { articles } from '~~/.storybook/fixtures/articles'
import { ARTICLES } from '~~/constants/api-paths'

const meta = {
  component: ArticleSearchList,
  parameters: {
    // total > rows so the pagination is visible
    api: { [ARTICLES]: { total: 120, rows: articles } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 640 } }
  }
} satisfies Meta<typeof ArticleSearchList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoResults: Story = {
  parameters: { api: { [ARTICLES]: { total: 0, rows: [] } } }
}
export const ApiError: Story = {
  parameters: { api: { [ARTICLES]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
