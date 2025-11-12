export function handleHtmlTags (content: string): string {
  const paragraphRegEx = /\r\n\r\n/g
  const urlRegEx = /((https?|ftp):\/\/)[\w/\-?=%.]+\.[0-9a-zA-Z/\-&?=%]+/g
  const emailRegEx = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

  const item = {
    content
  }

  item.content = `<p>${content}</p>`
  item.content = item.content.replaceAll(paragraphRegEx, '</p><p>')

  const urlList = item.content.matchAll(urlRegEx)
  for (const [url] of urlList) {
    item.content = item.content.replaceAll(url, `<a href="${url}" target="_blank">${url}</a>`)
  }

  const emailList = item.content.matchAll(emailRegEx)
  for (const [email] of emailList) {
    item.content = item.content.replaceAll(email, `<a href="mailto:${email}">${email}</a>`)
  }

  return item.content
}

export function handleFileMimeType (mimeType: string): string | undefined {
  const doc = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  const pdf = ['application/pdf']

  if (doc.includes(mimeType)) return 'doc'
  if (pdf.includes(mimeType)) return 'pdf'
  return undefined
}
