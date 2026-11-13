import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationMegaMenuSocialMedia from './navigation-mega-menu-social-media.vue'

const meta = {
  component: NavigationMegaMenuSocialMedia,
  // Styled as the footer of an open mega-menu drawer
  decorators: [() => ({ template: '<div class="cus-mega-menu"><nav class="mega-menu-drawer dropdown-menu show position-static container-fluid"><story /></nav></div>' })],
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof NavigationMegaMenuSocialMedia>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
