import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NbsapCardList from './card-list.vue'
import { nbsaps } from '~~/.storybook/fixtures/nbsaps'
import { NBSAPS } from '~~/constants/api-paths'

const meta = {
  component: NbsapCardList,
  parameters: {
    api: { [NBSAPS]: { total: nbsaps.length, rows: nbsaps } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 420 } }
  }
} satisfies Meta<typeof NbsapCardList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ApiError: Story = {
  parameters: { api: { [NBSAPS]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
