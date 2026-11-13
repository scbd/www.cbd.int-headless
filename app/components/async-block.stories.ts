import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { defineComponent, h } from 'vue'
import AsyncBlock from './async-block.vue'

const Pending = defineComponent({
  async setup () {
    await new Promise(() => {})
    return () => h('div')
  }
})

const Loaded = defineComponent({
  async setup () {
    await Promise.resolve()
    return () => h('p', 'Async content loaded')
  }
})

const meta = {
  component: AsyncBlock
} satisfies Meta<typeof AsyncBlock>

export default meta
type Story = StoryObj<typeof meta>

// The child never resolves, so the status loader fallback stays
export const Loading: Story = {
  render: () => ({ components: { AsyncBlock, Pending }, template: '<AsyncBlock><Pending /></AsyncBlock>' })
}
export const Resolved: Story = {
  render: () => ({ components: { AsyncBlock, Loaded }, template: '<AsyncBlock><Loaded /></AsyncBlock>' })
}
