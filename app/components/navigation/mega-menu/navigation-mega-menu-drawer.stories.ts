import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationMegaMenuDrawer from './navigation-mega-menu-drawer.vue'
import { gbfHeaderItem, megaMenuApi, updatesHeaderItem } from '~~/.storybook/fixtures/navigation-extra'
import { MENUS } from '~~/constants/api-paths'

const meta = {
  component: NavigationMegaMenuDrawer,
  args: { menu: gbfHeaderItem },
  // The drawer is a Bootstrap dropdown: force it open and into the page flow
  render: (args) => ({
    components: { NavigationMegaMenuDrawer },
    setup: () => ({ args }),
    template: '<NavigationMegaMenuDrawer v-bind="args" class="show position-static" />'
  }),
  decorators: [() => ({ template: '<div class="cus-mega-menu"><story /></div>' })],
  parameters: {
    layout: 'fullscreen',
    api: megaMenuApi,
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 720 } }
  }
} satisfies Meta<typeof NavigationMegaMenuDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const StaticLinks: Story = {}
export const DynamicContent: Story = { args: { menu: updatesHeaderItem } }
export const ApiError: Story = {
  parameters: { api: { [`${MENUS}/cbd-header-gbf`]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
