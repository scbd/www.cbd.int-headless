export interface Menu {
    title: string,
    url: string,
    position: number,
    submenu?: string,
    composable?: string,
    icon?: string,
    children?: Menu[]
}