import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import type { App, Plugin } from 'vue'

import { unref } from 'vue'
import { isObject } from '/@/utils/is'

export const noop = () => {}

/**
 * 用于确定弹出框容器的实用函数
 * 确定在哪个 HTML 元素内部渲染弹出框或浮动元素，以确保正确的布局和样式
 * @description:  设置 ui 载入节点
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

/**
 * 将对象作为参数添加到 URL 中
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

/**
 * 深度合并
 * @param src 源对象
 * @param target 要合并的目标对象，合并时目标对象的值可覆盖源对象的值
 * @description: 浅合并{...src,...target}只会将源对象和目标对象的顶级属性合并，不会递归处理嵌套对象，会导致源对象的一些属性丢失
 * @returns
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

/**
 * 打开新的浏览器窗口或标签页，加载指定的 URL
 * @param url 要在新窗口中加载的 URL
 * @param opt 配置新窗口行为的参数
 */
export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  // 是否在新窗口中设置 rel="noopener"，如果为 true，则会设置 noopener=yes。默认值为 true
  // 是否在新窗口中设置 rel="noreferrer"。如果为 true，则会设置 noreferrer=yes。默认值为 true。
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  // 用于存储要传递给 window.open 方法的窗口特性参数
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

/**
 * 将包含 Ref 对象的 props 转换为普通的 JavaScript 对象，以便更容易操作
 * @param props
 * @returns
 */
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {}

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key])
  })

  return ret as Partial<U>
}

/**
 * 用于获取一个 RouteLocationNormalized 类型对象的原始版本。
 * 它会去除 matched 属性中的一些属性，只保留了 meta、name 和 path 属性
 * @param route
 * @returns
 */
export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  }
}

/**
 * 将组件注册到 Vue 应用中
 * @param component
 * @param alias
 * @returns
 */
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}
