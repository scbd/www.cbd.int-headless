export const handleErrorState = ({
  error,
  ...rest
}: {
  error: any
  [key: string]: any
}): { [key: string]: any } => {
  if (error.value != null) {
    showError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage
    })
  }
  return rest
}
