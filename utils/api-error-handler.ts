export const handleErrorState = ({
  error,
  ...rest
}: {
  error: any
  [key: string]: any
}): { [key: string]: any } => {
  if (error.value !== null && error.value !== undefined) {
    showError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
      message: error.value.message
    })
  }
  return rest
}
