export const handleErrorState = ({
  error,
  ...rest
}: {
  error: any
  [key: string]: any
}): { [key: string]: any } => {
  if (error.value === null || error.value === undefined) {
    return rest
  } else {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
      fatal: true
    })
  }
}
