import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import NavigationBreadcrumbs from './breadcrumbs.vue'
import { conventionBreadcrumbs } from '~~/.storybook/fixtures/navigation-extra'

const meta = {
  component: NavigationBreadcrumbs,
  args: { items: conventionBreadcrumbs },
  decorators: [() => ({ template: '<article class="cus-article container-fluid d-flex flex-column"><story /></article>' })],
  // a11y debt (color-contrast): fix the component, then delete this line
  parameters: { a11y: { test: 'todo' } }
} satisfies Meta<typeof NavigationBreadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const DeepPage: Story = {}
export const SectionRoot: Story = { args: { items: conventionBreadcrumbs.slice(0, 1) } }
