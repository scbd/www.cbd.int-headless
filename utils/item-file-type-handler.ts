
export function handleFileMimeType (mimeType: string): string | undefined {
  const doc = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  const pdf = ['application/pdf']

  if (doc.includes(mimeType)) return 'doc'
  if (pdf.includes(mimeType)) return 'pdf'
  return undefined
}
