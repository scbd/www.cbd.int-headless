import type { Ref } from 'vue'

const BUTTON = '.usa-accordion__button'
const CONTENT = '.usa-accordion__content'

/**
 * Drives the USWDS `.usa-accordion` blocks rendered inside a CMS body:
 *  - on load, the URL hash opens its panel (e.g. /gbf/targets/4#a opens "a");
 *    with no hash every panel stays closed,
 *  - clicking a header toggles its panel.
 *
 * USWDS ships no JS, so we flip `aria-expanded` ourselves and the SCSS shows/
 * hides each panel from it. The click listener is scoped to `root` and removed
 * on unmount via AbortController. No global plugin, no window/document listeners.
 */
export const useAccordion = (root: Readonly<Ref<HTMLElement | null>>): void => {
  const route = useRoute()

  const onClick = (event: Event): void => {
    if (!(event.target instanceof Element)) return
    const button = event.target.closest<HTMLElement>(BUTTON)
    if (button == null) return
    button.setAttribute('aria-expanded', String(button.getAttribute('aria-expanded') !== 'true'))
  }

  const openFromHash = async (): Promise<void> => {
    await nextTick() // wait for the v-dompurify-html markup to render

    const id = route.hash.replace(/^#/, '')
    if (id === '') return

    const content = root.value
      ?.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
      ?.closest<HTMLElement>(CONTENT)
    if (content == null) return

    const button = root.value?.querySelector<HTMLElement>(`${BUTTON}[aria-controls="${CSS.escape(content.id)}"]`)
    if (button == null) return

    button.setAttribute('aria-expanded', 'true')
    content.scrollIntoView() // re-scroll: native anchor scroll ran before the panel opened
  }

  onMounted(() => {
    root.value?.addEventListener('click', onClick)
    void openFromHash()
  })
}
