import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationTopMenu from './index.vue'
import { conventionMenu, gbfMenu } from '~~/.storybook/fixtures/navigation-extra'

const meta = {
  component: NavigationTopMenu,
  args: { menus: conventionMenu.children },
  render: (args) => ({
    components: { NavigationTopMenu },
    setup: () => ({ args }),
    template: '<NavigationTopMenu v-bind="args" class="level-2-items" />'
  }),
  // Same markup [...alias].vue renders around the top menu
  decorators: [() => ({ template: '<div class="protocol-subnavigation accent-cbd"><nav class="navbar container-xxl"><ul class="nav"><story /></ul></nav></div>' })],
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof NavigationTopMenu>

export default meta
type Story = StoryObj<typeof meta>

// Only the active branch (About) has its children loaded
export const Default: Story = {}
// The active branch has 23 children: rendered over three columns
export const ManyChildren: Story = { args: { menus: gbfMenu.children } }
