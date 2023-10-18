/** 重定向页的路由名称 */
export const REDIRECT_NAME = 'Redirect'

export const PARENT_LAYOUT_NAME = 'ParentLayout'
/** 404页面的路由名称 */
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'
/** 异常页面的组件 */
export const EXCEPTION_COMPONENT = () => import('/@/views/sys/exception/Exception.vue')

/**
 * 布局组件
 * @description: default layout
 */
export const LAYOUT = () => import('/@/layouts/default/index.vue')

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      })
    })
}
