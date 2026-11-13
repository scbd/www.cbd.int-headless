import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import HeroItemPage from './item-page.vue'
import { article1 } from '~~/.storybook/fixtures/articles'

const meta = {
  component: HeroItemPage,
  args: { article: article1 }
} satisfies Meta<typeof HeroItemPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
