import { JSDOM } from 'jsdom'

const { document } = new JSDOM("").window;

export default function convertPlainTextToHtml (content: string): string {
  if (content === undefined || content === null || content === '') return ''

  // Escape HTML entities to prevent XSS
  content = escapeHtml(content)

  // Convert URLs to clickable links
  content = content.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  // Convert email addresses to mailto links
  content = content.replace(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    '<a href="mailto:$1">$1</a>'
  )

  // Normalize line endings and convert to paragraphs
  content = content
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map(paragraph => paragraph.trim())
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('')

  return content
}

function escapeHtml(text: string): string {
  const el = document.createElement("div");
  el.textContent = text;
  return el.innerHTML;
}
