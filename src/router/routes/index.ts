import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types'

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic'

import { PageEnum } from '/@/enums/pageEnum'
import { t } from '/@/hooks/web/useI18n'

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager('./modules/**/*.ts')
const routeModuleList: AppRouteModule[] = []

// 读取路由定义文件，将路由加入到路由集合中
Object.keys(modules).forEach((key) => {
  // ket = ./modules/dashboard.ts
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

/** 动态路由 */
export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]

/** 根路由 */
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}

/** 登录页面的路由 */
export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
}

/** 不需要权限就可访问的基础路由 */
export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE]
