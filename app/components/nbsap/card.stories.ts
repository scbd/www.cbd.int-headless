import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NbsapCard from './card.vue'
import { nbsap1 } from '~~/.storybook/fixtures/nbsaps'
import { nbsapLongTitle } from '~~/.storybook/fixtures/cards-extra'

const meta = {
  component: NbsapCard,
  args: { nbsap: nbsap1 }
} satisfies Meta<typeof NbsapCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const LongTitle: Story = { args: { nbsap: nbsapLongTitle } }
