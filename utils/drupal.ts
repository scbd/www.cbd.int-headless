export function drupalImagePathNormalizer (value: string): string {
  if (value === undefined) throw new Error('Value is undefined')
  if (value === null) throw new Error('Value is null')
  if (value === '') throw new Error('Value is null')

  value = value.toString()

  value = value.replace(/\\/g, '\\\\')
  value = value.replace(/\/sites\/default\/files\//g, '/content/images/')

  return value
};
