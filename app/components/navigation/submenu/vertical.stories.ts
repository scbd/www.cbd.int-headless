import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationSubmenuVertical from './vertical.vue'
import { secretariatMenu } from '~~/.storybook/fixtures/navigation-extra'

// Starts collapsed when the window is 953px wide or less
const meta = {
  component: NavigationSubmenuVertical,
  args: { menu: secretariatMenu },
  decorators: [() => ({ template: '<div class="container-xxl d-flex"><story /></div>' })],
  // a11y debt (button-name, listitem): fix the component, then delete this line
  parameters: { a11y: { test: 'todo' } }
} satisfies Meta<typeof NavigationSubmenuVertical>

export default meta
type Story = StoryObj<typeof meta>

// /convention/about/secretariat/staff/executive-secretary: active branch three levels deep
export const Default: Story = {}
