import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationMegaMenuListItem from './navigation-mega-menu-list-item.vue'
import { gbfGoalsSubmenuItem } from '~~/.storybook/fixtures/navigation-extra'

const meta = {
  component: NavigationMegaMenuListItem,
  args: { menu: gbfGoalsSubmenuItem },
  // Same markup the drawer and list render around the items
  decorators: [() => ({
    template: '<div class="cus-mega-menu"><nav class="mega-menu-drawer dropdown-menu show position-static container-fluid">' +
      '<ul class="mega-menu-drawer-internal nav"><div class="level-2-items"><li class="level-2-item nav-item">' +
      '<ul class="level-3-items nav"><story /></ul></li></div></ul></nav></div>'
  })],
  parameters: {
    layout: 'fullscreen',
    // a11y debt (list, listitem): fix the component, then delete this line
    a11y: { test: 'todo' }
  }
} satisfies Meta<typeof NavigationMegaMenuListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
