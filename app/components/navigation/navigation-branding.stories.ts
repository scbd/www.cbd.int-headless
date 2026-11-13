import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationBranding from './navigation-branding.vue'

// The logo follows the locale toolbar (/images/cbd-logo-<locale>.svg)
const meta = {
  component: NavigationBranding,
  decorators: [() => ({ template: '<div class="cus-mega-menu"><story /></div>' })]
} satisfies Meta<typeof NavigationBranding>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
