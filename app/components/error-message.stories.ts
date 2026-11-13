import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import ErrorMessage from './error-message.vue'

const meta = {
  component: ErrorMessage,
  args: { statusCode: 404, url: '/meetings/unknown-meeting' }
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

export const NotFound: Story = {}
export const Forbidden: Story = { args: { statusCode: 403 } }
export const ServerError: Story = { args: { statusCode: 500 } }
// No message for this code: t() returns the key itself, so the `|| t('…-default')` fallback never applies
export const UnmappedStatus: Story = { args: { statusCode: 418 } }
