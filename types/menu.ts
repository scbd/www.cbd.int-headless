export interface Menu {
  branchId: string
  parentId?: string | null
  title: string
  url?: string
  position: number
  submenu?: string
  component?: string
  icon?: string
  childrenCount: number
  children?: Menu[]
  siblings?: Menu[]
}
