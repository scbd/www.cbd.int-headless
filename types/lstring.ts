type Letter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
type TwoLetterKey = `${Letter}${Letter}`
type ThreeLetterKey = `${Letter}${Letter}${Letter}`
export type Locale = TwoLetterKey | ThreeLetterKey
/*
TODO: To remove this file when vue-components exposes Locale type

export type LString = {
  [locale in Locale]?: string
}

export type { LString as default }
*/
