import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import LayoutSharedFooter from './footer.vue'
import { footerMenu } from '~~/.storybook/fixtures/menus'
import { MENUS } from '~~/constants/api-paths'

const meta = {
  component: LayoutSharedFooter,
  parameters: {
    // a11y debt (landmark-unique, list, listitem): fix the component, then delete this line
    a11y: { test: 'todo' },
    layout: 'fullscreen',
    api: { [`${MENUS}/cbd-footer`]: footerMenu },
    // Each story mocks the API differently; render them in separate iframes on the docs page
    docs: { story: { inline: false, iframeHeight: 520 } }
  }
} satisfies Meta<typeof LayoutSharedFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ApiError: Story = {
  parameters: { api: { [`${MENUS}/cbd-footer`]: new Response(null, { status: 500, statusText: 'Internal Server Error' }) } }
}
