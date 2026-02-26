export function apiErrorHandler (err: unknown): never {
  if (err instanceof Error && 'statusCode' in err && '__h3_error__' in err) {
    throw err
  }

  const error = err as { statusCode?: number, status?: number, statusMessage?: string, message?: string }
  throw createError({
    statusCode: error.statusCode ?? error.status,
    statusMessage: error.statusMessage ?? error.message
  })
}
