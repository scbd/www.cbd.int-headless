import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import SearchPagination from './pagination.vue'

const meta = {
  component: SearchPagination,
  args: { currentPage: 3, totalPages: 12 }
} satisfies Meta<typeof SearchPagination>

export default meta
type Story = StoryObj<typeof meta>

export const Middle: Story = {}
export const FirstPage: Story = { args: { currentPage: 1 } }
export const LastPage: Story = { args: { currentPage: 12 } }
export const SinglePage: Story = { args: { currentPage: 1, totalPages: 1 } }
