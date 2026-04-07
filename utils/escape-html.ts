
let { document } = globalThis

if (document === undefined) {
  await import('jsdom').then(({ JSDOM }) => {
    document = new JSDOM('').window.document
  }).catch(() => console.warn('jsdom is not available, HTML escaping may not work properly in non-browser environments.'))
}

/**
 * Escapes HTML special characters in a string by leveraging the DOM.
 *
 * This function creates a temporary DOM element, sets its text content,
 * and returns the resulting escaped HTML string. This approach ensures
 * all special characters are properly escaped.
 *
 * @param text - The string to escape
 * @returns The escaped HTML string
 * @throws {Error} If the function is called in an environment without DOM support (jsdom must be installed)
 *
 * @example
 * ```
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 * ```
 */
export default function escapeHtml (text: string): string {
  if (document === undefined) {
    throw new Error('escapeHtml function requires a DOM environment. Please ensure jsdom is installed and available in non-browser environments.')
  }

  const el = document.createElement('div')
  el.textContent = text
  return el.innerHTML
}

export function extractTextFromHtml (html: string): string {
  if (document === undefined) {
    throw new Error('extractTextFromHtml function requires a DOM environment. Please ensure jsdom is installed and available in non-browser environments.')
  }

  const el = document.createElement('div')
  el.innerHTML = html
  return el.textContent || ''
}
