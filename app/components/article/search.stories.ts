import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { expect, fn } from 'storybook/test'
import ArticleSearch from './search.vue'

const meta = {
  component: ArticleSearch,
  args: { onSearch: fn() }
} satisfies Meta<typeof ArticleSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithTitleFilter: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(await canvas.findByRole('textbox'), 'biodiversity{Enter}')
    await expect(args.onSearch).toHaveBeenLastCalledWith({ search: 'biodiversity', sort: '-changed,-created' })
  }
}
