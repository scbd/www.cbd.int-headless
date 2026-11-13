import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { createError } from 'nuxt/app'
import Status from './status.vue'

const meta = {
  component: Status
} satisfies Meta<typeof Status>

export default meta
type Story = StoryObj<typeof meta>

export const Loading: Story = {}
export const ApiError: Story = {
  args: { error: createError({ statusCode: 500, statusMessage: 'Internal Server Error' }) }
}
