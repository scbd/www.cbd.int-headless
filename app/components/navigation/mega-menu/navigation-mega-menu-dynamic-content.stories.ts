import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationMegaMenuDynamicContent from './navigation-mega-menu-dynamic-content.vue'
import { dynamicContentApi } from '~~/.storybook/fixtures/navigation-extra'
import { MEETINGS } from '~~/constants/api-paths'

const meta = {
  component: NavigationMegaMenuDynamicContent,
  args: { component: 'meetings' },
  // Same markup the drawer and list render around the items
  decorators: [() => ({
    template: '<div class="cus-mega-menu"><nav class="mega-menu-drawer dropdown-menu show position-static container-fluid">' +
      '<ul class="mega-menu-drawer-internal nav"><div class="level-2-items"><li class="level-2-item nav-item">' +
      '<ul class="level-3-items nav"><story /></ul></li></div></ul></nav></div>'
  })],
  parameters: {
    // a11y debt (list, listitem): fix the component, then delete this line
    a11y: { test: 'todo' },
    layout: 'fullscreen',
    api: dynamicContentApi,
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 360 } }
  }
} satisfies Meta<typeof NavigationMegaMenuDynamicContent>

export default meta
type Story = StoryObj<typeof meta>

// Rows with `urls` and a start date
export const Meetings: Story = {}
// Rows with an `alias` and a plain-string title
export const Articles: Story = { args: { component: 'articles' } }
// The error is swallowed: nothing is rendered
export const ApiError: Story = {
  parameters: { api: { [MEETINGS]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
