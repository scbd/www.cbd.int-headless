export function handleHtmlTags (content?: string): string {
  if (content === undefined) return ''
  if (content === null) return ''
  if (content === '') return ''

  const item = {
    content
  }

  const paragraphRegEx = /\r\n\r\n/g
  const urlRegEx = /((https?|ftp):\/\/)[\w/\-?=%.]+\.[0-9a-zA-Z/\-&?=%]+/g
  const emailRegEx = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

  item.content = `<p>${content}</p>`
  item.content = item.content.replaceAll(paragraphRegEx, '</p><p>')

  const urlList = [...item.content.matchAll(urlRegEx)]

  urlList.forEach((url, index) => {
    const textReplacement = `<a href="${url[0]}" target="_blank">${url[0]}</a>`
    const htmlLength = '<a href="" target="_blank"></a>'.length
    const textStrings = {
      beforeUrl: '',
      afterUrl: ''
    }

    if (index < 1) {
      textStrings.beforeUrl = item.content.slice(0, url.index)
      textStrings.afterUrl = item.content.slice(url.index + url[0].length)
    } else {
      const modifier = (htmlLength + (urlList[index - 1]?.[0].length ?? 0))
      textStrings.beforeUrl = item.content.slice(0, (url.index + modifier))
      textStrings.afterUrl = item.content.slice(url.index + modifier + url[0].length)
    }

    item.content = `${textStrings.beforeUrl}${textReplacement}${textStrings.afterUrl}`
  })

  const emailList = [...item.content.matchAll(emailRegEx)]

  emailList.forEach((email, index) => {
    const textReplacement = `<a href="mailto:${email[0]}">${email[0]}</a>`
    const htmlLength = '<a href="mailto:"></a>'.length
    const textStrings = {
      beforeEmail: '',
      afterEmail: ''
    }

    if (index < 1) {
      textStrings.beforeEmail = item.content.slice(0, email.index)
      textStrings.afterEmail = item.content.slice(email.index + email[0].length)
    } else {
      const modifier = (htmlLength + (emailList[index - 1]?.[0].length ?? 0))
      textStrings.beforeEmail = item.content.slice(0, (email.index + modifier))
      textStrings.afterEmail = item.content.slice(email.index + modifier + email[0].length)
    }

    item.content = `${textStrings.beforeEmail}${textReplacement}${textStrings.afterEmail}`
  })

  return item.content
}
