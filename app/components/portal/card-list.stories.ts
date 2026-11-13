import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import PortalCardList from './card-list.vue'
import { portals } from '~~/.storybook/fixtures/portals'
import { PORTALS } from '~~/constants/api-paths'

const meta = {
  component: PortalCardList,
  args: { portal: 'cbd-portals' },
  parameters: {
    // a11y debt (color-contrast, image-alt): fix the component, then delete this line
    a11y: { test: 'todo' },
    // This endpoint returns a plain array, not { total, rows }
    api: { [PORTALS]: portals },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 420 } }
  }
} satisfies Meta<typeof PortalCardList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ApiError: Story = {
  parameters: { api: { [PORTALS]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
