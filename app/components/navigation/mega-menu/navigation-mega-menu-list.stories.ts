import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationMegaMenuList from './navigation-mega-menu-list.vue'
import { megaMenuApi } from '~~/.storybook/fixtures/navigation-extra'
import { MENUS } from '~~/constants/api-paths'

const meta = {
  component: NavigationMegaMenuList,
  args: { submenu: 'cbd-header-gbf' },
  render: (args) => ({
    components: { NavigationMegaMenuList },
    setup: () => ({ args }),
    template: '<NavigationMegaMenuList v-bind="args" class="level-2-items" />'
  }),
  // Same markup the drawer renders around the list
  decorators: [() => ({
    template: '<div class="cus-mega-menu"><nav class="mega-menu-drawer dropdown-menu show position-static container-fluid">' +
      '<ul class="mega-menu-drawer-internal nav"><story /></ul></nav></div>'
  })],
  parameters: {
    layout: 'fullscreen',
    api: megaMenuApi,
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 640 } }
  }
} satisfies Meta<typeof NavigationMegaMenuList>

export default meta
type Story = StoryObj<typeof meta>

// 2030 Targets has 23 links: rendered as a multi-column level-3 list
export const StaticLinks: Story = {}
export const DynamicContent: Story = { args: { submenu: 'cbd-header-updates' } }
export const ApiError: Story = {
  parameters: { api: { [`${MENUS}/cbd-header-gbf`]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
