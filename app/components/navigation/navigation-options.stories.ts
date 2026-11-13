import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationOptions from './navigation-options.vue'

const meta = {
  component: NavigationOptions,
  // Not wrapped in .cus-navigation: its stylesheet hides the options bar below 1200px
  decorators: [() => ({ template: '<nav class="navbar navbar-expand-xl d-flex flex-column"><story /></nav>' })],
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof NavigationOptions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
