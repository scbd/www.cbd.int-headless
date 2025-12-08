export interface Menu {
  title: string
  url: string
  position: number
  submenu?: string
  component?: string
  icon?: string
  children?: Menu[]
  parents?: Array<{
    title: string
    url: string
  }>
}
