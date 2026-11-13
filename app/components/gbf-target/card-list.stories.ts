import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import GbfTargetCardList from './card-list.vue'
import { gbfTargetsWithTitles } from '~~/.storybook/fixtures/cards-extra'
import { GBF_TARGETS } from '~~/constants/api-paths'

const meta = {
  component: GbfTargetCardList,
  parameters: {
    // a11y debt (color-contrast, image-alt): fix the component, then delete this line
    a11y: { test: 'todo' },
    // This endpoint returns a plain array, not { total, rows }
    api: { [GBF_TARGETS]: gbfTargetsWithTitles },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 560 } }
  }
} satisfies Meta<typeof GbfTargetCardList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ApiError: Story = {
  parameters: { api: { [GBF_TARGETS]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
