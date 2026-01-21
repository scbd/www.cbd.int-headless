export interface Menu {
  branchId: string
  title: string
  url: string
  position: number
  submenu?: string
  component?: string
  icon?: string
  childrenCount: number
  children?: Menu[]
  parents?: Array<{
    title: string
    url: string
  }>
}
