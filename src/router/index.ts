import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'

/** 白名单应该包含基本静态路由 */
const WHITE_NAME_LIST: string[] = []
// 将所有基础路由的路由名称加入白名单
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(basicRoutes)

/** 创建一个可以被 Vue 应用程序使用的路由实例 */
export const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/** 重置路由 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    // 路由名称
    const { name } = route
    // 路由不在白名单内
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      // 删除路由
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

/** 配置路由器 */
export function setupRouter(app: App<Element>) {
  app.use(router)
}
