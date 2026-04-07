export interface Menu {
  branchId: string
  parentId?: string | null
  title: string
  url?: string
  position: number
  submenu?: string
  component?: string
  filter?: string
  icon?: string
  childrenCount: number
  children?: Menu[]
  activeBranch?: boolean
}

export interface Breadcrumb {
  title: string
  url: string
  activeBranch: boolean
}
