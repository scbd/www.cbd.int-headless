export interface Menu {
  branchId: string
  parentId?: string | null
  title: string
  url: string // TODO this is in fact optional
  position: number
  submenu?: string
  component?: string
  icon?: string
  childrenCount: number
  children?: Menu[]
  siblings?: Menu[]
  parent?: Menu
  parents?: Array<{ // TODO remove this: use parent recursively
    title: string
    url: string
  }>
}
