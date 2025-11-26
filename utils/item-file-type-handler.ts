
export function handleFileMimeType (mimeType: string): string | undefined {
  const doc = ['doc', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  const pdf = ['pdf', 'application/pdf']

  if (doc.includes(mimeType) || mimeType.includes('.doc')) return 'doc'
  if (pdf.includes(mimeType) || mimeType.includes('.pdf')) return 'pdf'
  return undefined
}
