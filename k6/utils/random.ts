export function randomItem<T> (arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function randomBetween (min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomInt (min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1))
}
