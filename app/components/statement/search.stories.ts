import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { expect, fn, waitFor } from 'storybook/test'
import StatementSearch from './search.vue'
import { subjects } from '~~/.storybook/fixtures/subjects'
import { SUBJECTS } from '~~/constants/api-paths'
import { SUBJECTS_DOMAIN } from '~~/constants/thesaurus'

const meta = {
  component: StatementSearch,
  args: { onSearch: fn() },
  // The subject select loads its options
  parameters: { api: { [`${SUBJECTS}/${SUBJECTS_DOMAIN}`]: subjects } }
} satisfies Meta<typeof StatementSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithActiveFilters: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(await canvas.findByRole('textbox'), 'biodiversity{Enter}')
    // Picking a subject searches right away (from a watcher, hence waitFor)
    await userEvent.selectOptions(canvas.getByRole('combobox'), 'CBD-SUBJECT-FOR')
    await waitFor(async () => await expect(args.onSearch).toHaveBeenLastCalledWith(expect.objectContaining({ themes: ['CBD-SUBJECT-FOR'] })))
  }
}
