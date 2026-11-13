import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationTopMenuItem from './item.vue'
import { conventionAboutMenu, gbfTargetsMenu } from '~~/.storybook/fixtures/navigation-extra'

const meta = {
  component: NavigationTopMenuItem,
  args: { menu: conventionAboutMenu },
  // Same markup [...alias].vue renders around the items
  decorators: [() => ({
    template: '<div class="protocol-subnavigation accent-cbd"><nav class="navbar container-xxl"><ul class="nav">' +
      '<div class="subnav-level-3-items nav"><story /></div></ul></nav></div>'
  })],
  parameters: {
    layout: 'fullscreen',
    // a11y debt (list, listitem): fix the component, then delete this line
    a11y: { test: 'todo' }
  }
} satisfies Meta<typeof NavigationTopMenuItem>

export default meta
type Story = StoryObj<typeof meta>

// Secretariat is the active child
export const Default: Story = {}
export const ManyChildren: Story = { args: { menu: gbfTargetsMenu } }
