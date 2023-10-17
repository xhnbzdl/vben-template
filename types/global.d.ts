import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType,
} from 'vue'

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }
  // declare interface Window {
  //   // Global vue app instance
  //   __APP__: App<Element>;
  // }

  // vue
  declare type PropType<T> = VuePropType<T>
  declare type VueNode = VNodeChild | JSX.Element

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  declare type Nullable<T> = T | null
  declare type NonNullable<T> = T extends null | undefined ? never : T
  declare type Recordable<T = any> = Record<string, T>
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
  declare type Indexable<T = any> = {
    [key: string]: T
  }
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  /** 计时器标识的类型。这个标识可以用于清除计时器 */
  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  /** 定时器标识的类型。这个标识可以用于清除定时器 */
  declare type IntervalHandle = ReturnType<typeof setInterval>

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement
  }

  declare interface WheelEvent {
    path?: EventTarget[]
  }
  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  /** vite 环境变量 */
  declare interface ViteEnv {
    /** 运行的端口 */
    VITE_PORT: number
    /** 是否使用 mock */
    VITE_USE_MOCK: boolean
    /** 是否使用 PWA */
    VITE_USE_PWA: boolean
    /** 公共路径 */
    VITE_PUBLIC_PATH: string
    /** 跨域代理 */
    VITE_PROXY: [string, string][]
    /** 应用名称 */
    VITE_GLOB_APP_TITLE: string
    /** 应用短名称 */
    VITE_GLOB_APP_SHORT_NAME: string
    VITE_USE_CDN: boolean
    /** 是否删除控制台打印日志 */
    VITE_DROP_CONSOLE: boolean
    /** 是否启用 gzip 或 brotli 压缩。可选：gzip | brotli | none */
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    /** 使用压缩时是否删除源文件 */
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    /** 是否与旧版浏览器兼容 */
    VITE_LEGACY: boolean
    /** 是否启用图像压缩 */
    VITE_USE_IMAGEMIN: boolean
    VITE_GENERATE_UI: string
  }

  declare function parseInt(s: string | number, radix?: number): number

  declare function parseFloat(string: string | number): number

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy
    interface ElementAttributesProperty {
      $props: any
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface IntrinsicAttributes {
      [elem: string]: any
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>
}
