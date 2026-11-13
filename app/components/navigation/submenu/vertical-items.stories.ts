import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationSubmenuVerticalItems from './vertical-items.vue'
import { secretariatMenu } from '~~/.storybook/fixtures/navigation-extra'

const meta = {
  component: NavigationSubmenuVerticalItems,
  args: { menu: secretariatMenu, level: 3 },
  // Same markup the vertical submenu renders around the items
  decorators: [() => ({ template: '<aside class="cus-aside aside-nav"><div class="nav"><story /></div></aside>' })]
} satisfies Meta<typeof NavigationSubmenuVerticalItems>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
