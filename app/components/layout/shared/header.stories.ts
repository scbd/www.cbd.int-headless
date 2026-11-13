import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import LayoutSharedHeader from './header.vue'
import { megaMenuApi } from '~~/.storybook/fixtures/navigation-extra'

const meta = {
  component: LayoutSharedHeader,
  parameters: {
    layout: 'fullscreen',
    api: megaMenuApi,
    // Tall enough for an open mega-menu drawer
    docs: { story: { inline: false, iframeHeight: 720 } }
  }
} satisfies Meta<typeof LayoutSharedHeader>

export default meta
type Story = StoryObj<typeof meta>

// As layouts/home.vue fills the slot
export const WithMegaMenu: Story = {
  render: (args) => ({
    components: { LayoutSharedHeader },
    setup: () => ({ args }),
    template: '<LayoutSharedHeader v-bind="args"><navigation-mega-menu /></LayoutSharedHeader>'
  })
}
