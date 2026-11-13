import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NotificationCard from './card.vue'
import { notification1, notificationWithSubmissions } from '~~/.storybook/fixtures/notifications'

const meta = {
  component: NotificationCard,
  args: { notification: notification1 },
  // a11y debt (color-contrast): fix the component, then delete this line
  parameters: { a11y: { test: 'todo' } }
} satisfies Meta<typeof NotificationCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
// Has an action date and an HTML fulltext (rendered as plain text)
export const ActionRequired: Story = { args: { notification: notificationWithSubmissions } }
