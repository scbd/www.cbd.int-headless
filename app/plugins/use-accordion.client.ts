export default defineNuxtPlugin(() => {
  document.addEventListener('click', (event: Event) => {
    const button = (event.target as Element).closest<HTMLElement>('.usa-accordion__button')
    if (button == null) return

    const isExpanded = button.getAttribute('aria-expanded') === 'true'
    const accordion = button.closest('.usa-accordion')

    if (accordion !== null && accordion.getAttribute('aria-multiselectable') !== 'true') {
      accordion.querySelectorAll<HTMLElement>('.usa-accordion__button[aria-expanded="true"]').forEach(btn => {
        if (btn !== button) {
          btn.setAttribute('aria-expanded', 'false')
        }
      })
    }

    button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true')
  })
})
