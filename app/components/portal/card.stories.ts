import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import PortalCard from './card.vue'
import { portal1 } from '~~/.storybook/fixtures/portals'

const meta = {
  component: PortalCard,
  args: { portal: portal1 },
  // a11y debt (color-contrast, image-alt): fix the component, then delete this line
  parameters: { a11y: { test: 'todo' } }
} satisfies Meta<typeof PortalCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
// `icon` is optional; the card falls back to the placeholder image
export const MissingIcon: Story = { args: { portal: { ...portal1, icon: undefined } } }
