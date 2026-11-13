import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { fn } from 'storybook/test'
import SearchSelect from './select.vue'
import { subjects } from '~~/.storybook/fixtures/subjects'
import { SUBJECTS } from '~~/constants/api-paths'
import { SUBJECTS_DOMAIN } from '~~/constants/thesaurus'

const subjectsPath = `${SUBJECTS}/${SUBJECTS_DOMAIN}`

const meta = {
  component: SearchSelect,
  args: { modelValue: [], domain: SUBJECTS_DOMAIN, inputId: 'fsThemes', 'onUpdate:modelValue': fn() },
  parameters: {
    api: { [subjectsPath]: subjects },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 120 } }
  }
} satisfies Meta<typeof SearchSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
// The fetch error is not surfaced: only "Any subject" is left
export const SubjectsUnavailable: Story = {
  parameters: { api: { [subjectsPath]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
