import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import StatementCardList from './card-list.vue'
import { statements } from '~~/.storybook/fixtures/statements'
import { STATEMENTS } from '~~/constants/api-paths'

const meta = {
  component: StatementCardList,
  parameters: {
    // The component requests limit=4; the mock ignores query params
    api: { [STATEMENTS]: { total: statements.length, rows: statements.slice(0, 4) } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 560 } }
  }
} satisfies Meta<typeof StatementCardList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ApiError: Story = {
  parameters: { api: { [STATEMENTS]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
