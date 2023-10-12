export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /** 排序 */
    orderNo?: number
    /** 标题 */
    title: string
    /** 动态路由器级别 */
    dynamicLevel?: number
    /** 动态路由器真实路由路径（为提高性能） */
    realPath?: string
    /** 是否忽略权限 */
    ignoreAuth?: boolean
    /** 角色信息 */
    roles?: RoleEnum[]
    /** 是否缓存 */
    ignoreKeepAlive?: boolean
    /** 是否固定在选项卡上 */
    affix?: boolean
    /** 选项卡上的图标 */
    icon?: string
    /** iframe 的 url */
    frameSrc?: string
    /** 当前页的过渡动画配置 */
    transitionName?: string
    /** 是否在面包屑中不显示 */
    hideBreadcrumb?: boolean
    /** 是否隐藏子菜单 */
    hideChildrenInMenu?: boolean
    /** 携带参数 */
    carryParam?: boolean
    /** 内部用于标记单层菜单 */
    single?: boolean
    /** 当前活动菜单 */
    currentActiveMenu?: string
    /** 是否在选项卡中不显示 */
    hideTab?: boolean
    /** 不在菜单中显示 */
    hideMenu?: boolean
    /** 是否是外链 */
    isLink?: boolean
    /** 是否仅为菜单构建 */
    ignoreRoute?: boolean
    /** 是否隐藏子路由 */
    hidePathForChildren?: boolean
  }
}
