import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import GbfTargetCard from './card.vue'
import { gbfTarget3 } from '~~/.storybook/fixtures/cards-extra'

const meta = {
  component: GbfTargetCard,
  args: { gbfTarget: gbfTarget3 }
} satisfies Meta<typeof GbfTargetCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
// What /api/gbf-targets returns today: every target has an empty shortTitle
export const MissingShortTitle: Story = { args: { gbfTarget: { ...gbfTarget3, shortTitle: {} } } }
