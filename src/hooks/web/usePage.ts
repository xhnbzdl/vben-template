import type { RouteLocationRaw, Router } from 'vue-router'

import { PageEnum } from '/@/enums/pageEnum'
import { unref } from 'vue'

import { useRouter } from 'vue-router'
import { REDIRECT_NAME } from '/@/router/constant'

/**
 * 它首先检查泛型参数 T 是否具有 path 属性，通过条件类型 T extends { path: string } 进行判断。
 * 如果 T 具有 path 属性，它将返回 T & { path: PageEnum }，即将 path 属性的类型替换为 PageEnum 类型。
 * 这样，它将 path 属性映射到特定的枚举类型 PageEnum 上。
 * T & { path: PageEnum } 中的 & 是 TypeScript 中的交叉类型（Intersection Type）运算符。
 * 它用于将多个类型合并为一个类型，新类型包含了这些类型的所有属性。
 */
export type PathAsPageEnum<T> = T extends { path: string } ? T & { path: PageEnum } : T
/**
 * 它将 RouteLocationRaw 类型经过 PathAsPageEnum 处理后的结果。
 * 这意味着 RouteLocationRawEx 类型的对象具有 path 属性，但其类型已被替换为 PageEnum，
 * 因此它的 path 属性将是一个特定页面的路径。
 */
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>

/** 处理错误信息，打印日志 */
function handleError(e: Error) {
  console.error(e)
}

/**
 * 用于前端路由的跳转
 */
export function useGo(_router?: Router) {
  const { push, replace } = _router || useRouter()
  // 定义内部方法
  function go(opt: RouteLocationRawEx = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return
    }
    // replace 方法用于导航到一个新的路由，但它不会像 push 方法一样将新路由添加到历史记录堆栈中，而是替换当前路由。
    // 这意味着在使用 replace 后，用户无法通过浏览器的后退按钮返回到前一个路由，因为前一个路由已被替换。
    isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
  }
  return go
}

/**
 * 在当前路由上执行一个 "重做" 操作，通常用于重新加载当前路由
 * @description: 重做当前页面
 */
export const useRedo = (_router?: Router) => {
  const { replace, currentRoute } = _router || useRouter()
  // 从当前路由中获取路径参数、组件名称等
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)
  // 定义重做方法
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false)
        return
      }
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name'
        params['path'] = String(name)
      } else {
        params['_redirect_type'] = 'path'
        params['path'] = fullPath
      }
      replace({ name: REDIRECT_NAME, params, query }).then(() => resolve(true))
    })
  }
  return redo
}
