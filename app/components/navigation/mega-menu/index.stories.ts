import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationMegaMenu from './index.vue'
import { megaMenuApi } from '~~/.storybook/fixtures/navigation-extra'
import { MENUS } from '~~/constants/api-paths'

const meta = {
  component: NavigationMegaMenu,
  decorators: [() => ({ template: '<header class="cus-navigation"><nav class="navbar navbar-expand-xl d-flex flex-column"><story /></nav></header>' })],
  parameters: {
    layout: 'fullscreen',
    api: megaMenuApi,
    // Each story mocks the API differently; render them in separate iframes on the docs page (tall enough for an open drawer)
    docs: { story: { inline: false, iframeHeight: 720 } }
  }
} satisfies Meta<typeof NavigationMegaMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ApiError: Story = {
  parameters: { api: { [`${MENUS}/cbd-header`]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
