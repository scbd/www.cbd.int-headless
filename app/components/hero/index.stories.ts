import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import Hero from './index.vue'
import { article1, article2, article3 } from '~~/.storybook/fixtures/articles'
import { ARTICLES } from '~~/constants/api-paths'

const meta = {
  component: Hero,
  parameters: {
    api: { [ARTICLES]: { total: 3, rows: [article1, article2, article3] } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 640 } }
  }
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const TripleFeatures: Story = {}
export const SingleFeature: Story = {
  parameters: { api: { [ARTICLES]: { total: 1, rows: [article1] } } }
}
export const ApiError: Story = {
  parameters: { api: { [ARTICLES]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
