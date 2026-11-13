import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import StatementCard from './card.vue'
import { statement1, statement2 } from '~~/.storybook/fixtures/statements'

const meta = {
  component: StatementCard,
  args: { statement: statement1 },
  // a11y debt (color-contrast): fix the component, then delete this line
  parameters: { a11y: { test: 'todo' } }
} satisfies Meta<typeof StatementCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const LongTitle: Story = { args: { statement: statement2 } }
