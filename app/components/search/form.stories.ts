import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { expect, fn } from 'storybook/test'
import SearchForm from './form.vue'

const meta = {
  component: SearchForm,
  args: { onSearch: fn() },
  // a11y debt (button-name, color-contrast, select-name): fix the component, then delete this line
  parameters: { a11y: { test: 'todo' } }
} satisfies Meta<typeof SearchForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithSearchTerm: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(await canvas.findByRole('textbox'), 'biodiversity{Enter}')
    await expect(args.onSearch).toHaveBeenLastCalledWith({ sort: '-changed', search: 'biodiversity' })
  }
}
