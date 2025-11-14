/** TODO: https://scbd.atlassian.net/browse/CIR-139
 */
export const handleErrorState = ({
  error,
  ...rest
}: {
  [key: string]: any
  error: any
}): { [key: string]: any } => {
  if (error.value === null || error.value === undefined) {
    return rest
  } else {
    throw error.value
  }
}
