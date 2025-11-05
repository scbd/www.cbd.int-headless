export interface Portal {
  title: string
  url: string
  position: number
  submenu?: string
  component?: string
  icon?: string
  children?: Portal[]
}
