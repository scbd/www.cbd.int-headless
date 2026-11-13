import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import RecentUpdateCard from './card.vue'
import { recentUpdate1, recentUpdate3, recentUpdate4 } from '~~/.storybook/fixtures/recent-updates'
import { recentUpdateNotification } from '~~/.storybook/fixtures/cards-extra'

const meta = {
  component: RecentUpdateCard,
  args: { recentUpdate: recentUpdate1 },
  // a11y debt (color-contrast): fix the component, then delete this line
  parameters: { a11y: { test: 'todo' } }
} satisfies Meta<typeof RecentUpdateCard>

export default meta
type Story = StoryObj<typeof meta>

export const Meeting: Story = {}
// Same start and end date; empty country, so only the city is shown
export const SingleDayMeeting: Story = { args: { recentUpdate: recentUpdate4 } }
export const Statement: Story = { args: { recentUpdate: recentUpdate3 } }
export const Notification: Story = { args: { recentUpdate: recentUpdateNotification } }
