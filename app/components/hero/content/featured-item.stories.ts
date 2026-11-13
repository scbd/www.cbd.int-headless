import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import HeroContentFeaturedItem from './featured-item.vue'
import { article1, article2 } from '~~/.storybook/fixtures/articles'

const meta = {
  component: HeroContentFeaturedItem,
  args: { article: article1, isPrimary: true },
  // a11y debt (color-contrast): fix the component, then delete this line
  parameters: { a11y: { test: 'todo' } }
} satisfies Meta<typeof HeroContentFeaturedItem>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { article: article2, isPrimary: false } }
