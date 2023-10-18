import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { RoleEnum } from '/@/enums/roleEnum'
import { defineComponent } from 'vue'

/** 定义vue组件的类型 */
export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

/**
 * 定义扩展的路由类型
 */
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  /**
   * 设定路由的名字，当使用<keep-alive>时请务必填写，并且应该与引用的 component class 的 name 属性相同,
   * @description：https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
   */
  name: string
  /** 路由元数据 */
  meta: RouteMeta
  /** 表示与该路由相关联的主要视图组件 */
  component?: Component | string
  /** 定义命名视图（named views）和它们对应的组件 */
  components?: Component
  /** 子路由 */
  children?: AppRouteRecordRaw[]
  /** 用于将路由参数映射为组件的 props */
  props?: Recordable
  fullPath?: string
}

/** 菜单tag */
export interface MenuTag {
  /** tag类型 */
  type?: 'primary' | 'error' | 'warn' | 'success'
  /** 内容 */
  content?: string
  /** 是否标记点 */
  dot?: boolean
}

/** 菜单的类型定义 */
export interface Menu {
  /** 菜单名称 */
  name: string
  /** 菜单要显示的图标 */
  icon?: string
  /** 菜单的路径 */
  path: string
  /** 路径中包含的参数，自动赋值 */
  paramPath?: string
  /** 是否无法点击 */
  disabled?: boolean
  /** 子菜单 */
  children?: Menu[]
  /** 菜单排序 */
  orderNo?: number
  /** 角色 */
  roles?: RoleEnum[]
  /** 菜单元数据 */
  meta?: Partial<RouteMeta>
  /** 菜单tag */
  tag?: MenuTag
  /** 是否隐藏菜单 */
  hideMenu?: boolean
}

/** 菜单模块的类型定义 */
export interface MenuModule {
  /** 菜单排序 */
  orderNo?: number
  /** 菜单 */
  menu: Menu
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw
