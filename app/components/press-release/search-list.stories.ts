import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import PressReleaseSearchList from './search-list.vue'
import { pressReleases } from '~~/.storybook/fixtures/press-releases'
import { PRESS_RELEASES } from '~~/constants/api-paths'

const meta = {
  component: PressReleaseSearchList,
  parameters: {
    // a11y debt (color-contrast, landmark-unique, select-name): fix the component, then delete this line
    a11y: { test: 'todo' },
    // total > rows so the pagination is visible
    api: { [PRESS_RELEASES]: { total: 120, rows: pressReleases } },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 640 } }
  }
} satisfies Meta<typeof PressReleaseSearchList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoResults: Story = {
  parameters: { api: { [PRESS_RELEASES]: { total: 0, rows: [] } } }
}
export const ApiError: Story = {
  parameters: { api: { [PRESS_RELEASES]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
