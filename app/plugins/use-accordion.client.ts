function collapseSiblings (button: HTMLElement): void {
  const accordion = button.closest('.usa-accordion')

  if (accordion !== null && accordion.getAttribute('aria-multiselectable') !== 'true') {
    accordion.querySelectorAll<HTMLElement>('.usa-accordion__button[aria-expanded="true"]').forEach(btn => {
      if (btn !== button) {
        btn.setAttribute('aria-expanded', 'false')
      }
    })
  }
}

function openAccordionForHash (): boolean {
  const hash = window.location.hash.slice(1)
  if (hash === '') return true

  const target = document.getElementById(hash)
  if (target == null) return false

  const content = target.closest<HTMLElement>('.usa-accordion__content')
  if (content == null) return true

  const button = document.querySelector<HTMLElement>(`.usa-accordion__button[aria-controls="${content.id}"]`)
  if (button == null) return false

  collapseSiblings(button)
  button.setAttribute('aria-expanded', 'true')

  // Re-scroll now that the panel is expanded (native anchor scroll ran before it opened).
  target.scrollIntoView()
  return true
}

// On a cold load the accordion markup may not be in the DOM yet when this first
// runs (hydration / async content). Retry across a few frames until the target
// is found, so the hash anchor opens reliably on refresh.
function openAccordionForHashWithRetry (attempts = 20): void {
  if (openAccordionForHash() || attempts <= 0) return
  requestAnimationFrame(() => openAccordionForHashWithRetry(attempts - 1))
}

export default defineNuxtPlugin(nuxtApp => {
  document.addEventListener('click', (event: Event) => {
    const button = (event.target as Element).closest<HTMLElement>('.usa-accordion__button')
    if (button == null) return

    const isExpanded = button.getAttribute('aria-expanded') === 'true'

    collapseSiblings(button)
    button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true')
  })

  document.addEventListener('click', (event: Event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href*="#"]')
    if (link == null) return

    // Same-page hash links don't fire hashchange reliably; defer to let the hash update.
    requestAnimationFrame(() => openAccordionForHashWithRetry())
  })

  window.addEventListener('hashchange', () => openAccordionForHashWithRetry())

  // Run after hydration settles and on every page navigation.
  nuxtApp.hook('app:suspense:resolve', () => openAccordionForHashWithRetry())
  nuxtApp.hook('page:finish', () => openAccordionForHashWithRetry())
})
