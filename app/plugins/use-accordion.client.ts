function collapseSiblings (button: HTMLElement): void {
  const accordion = button.closest('.usa-accordion')

  if (accordion != null && accordion.getAttribute('aria-multiselectable') !== 'true') {
    accordion.querySelectorAll<HTMLElement>('.usa-accordion__button[aria-expanded="true"]').forEach(btn => {
      if (btn !== button) {
        btn.setAttribute('aria-expanded', 'false')
      }
    })
  }
}

function resolveAccordionHash (): void {
  const hash = window.location.hash.slice(1)
  if (hash === '') return

  const target = document.getElementById(hash)
  if (target == null) return

  const content = target.closest<HTMLElement>('.usa-accordion__content')
  if (content == null) return

  const button = document.querySelector<HTMLElement>(`.usa-accordion__button[aria-controls="${content.id}"]`)
  if (button == null) return

  collapseSiblings(button)
  button.setAttribute('aria-expanded', 'true')

  // Re-scroll now that the panel is expanded (native anchor scroll ran before it opened).
  target.scrollIntoView()
}

export default defineNuxtPlugin(nuxtApp => {
  // Defer one frame so the directive-rendered markup is patched before we look for
  // the target panel.
  const openForHash = (): void => { requestAnimationFrame(resolveAccordionHash) }

  document.addEventListener('click', (event: Event) => {
    const button = (event.target as Element).closest<HTMLElement>('.usa-accordion__button')
    if (button == null) return

    const isExpanded = button.getAttribute('aria-expanded') === 'true'
    collapseSiblings(button)
    button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true')
  })

  // In-app quick links are cross-page (handled by page:finish); same-page anchors live
  // in CMS body HTML as raw <a href="#x"> and fire native hashchange.
  window.addEventListener('hashchange', openForHash)

  // Run after hydration settles and on every page navigation.
  nuxtApp.hook('app:suspense:resolve', openForHash)
  nuxtApp.hook('page:finish', openForHash)
})
