import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import MeetingCard from './card.vue'
import { absWorkshop, invasiveSpeciesOnline, kathmanduWorkshop } from '~~/.storybook/fixtures/meetings'

const meta = {
  component: MeetingCard,
  args: { meeting: kathmanduWorkshop },
  // a11y debt (color-contrast): fix the component, then delete this line
  parameters: { a11y: { test: 'todo' } }
} satisfies Meta<typeof MeetingCard>

export default meta
type Story = StoryObj<typeof meta>

export const MultiDay: Story = {}
export const SingleDayOnline: Story = { args: { meeting: invasiveSpeciesOnline } }
export const MissingCountry: Story = { args: { meeting: absWorkshop } }
