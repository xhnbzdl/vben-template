import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum'
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum'

import { CacheTypeEnum } from '/@/enums/cacheEnum'

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

/**
 * 菜单设置
 */
export interface MenuSetting {
  /** 菜单背景颜色 */
  bgColor: string
  /** 菜单是否跟随内容滚动 */
  fixed: boolean
  /** 是否折叠菜单 */
  collapsed: boolean

  siderHidden: boolean
  /**
   * 侧边菜单是否可以拖拽
   * @description: (左侧菜单混合模式、固定展开菜单、菜单背景为白色的情况下，打开子菜单，有一个class="vben-layout-mix-sider-drag-bar"的元素，该元素就是一个背景色div)，该变量修改它的display
   */
  canDrag: boolean
  /** 是否展示左侧菜单 */
  show: boolean
  /** 是否隐藏左侧菜单 */
  hidden: boolean
  /**
   * 是否分割菜单（顶部菜单混合模式，开启分割菜单，父级菜单将在顶部，子菜单在侧边）
   */
  split: boolean
  /** 菜单宽度 */
  menuWidth: number
  /**
   * 菜单模式，手机情况下为 INLINE
   */
  mode: MenuModeEnum
  /** 菜单的4种类型 */
  type: MenuTypeEnum
  /** 菜单的主题，由菜单的背景色决定 */
  theme: ThemeEnum
  /** 菜单在顶部的时候的对齐方式 */
  topMenuAlign: 'start' | 'center' | 'end'
  /** 折叠菜单的按钮位置 */
  trigger: TriggerEnum
  /** 侧边菜单手风琴模式，即是否一次只展开一个 */
  accordion: boolean
  /** 切换页面关闭菜单，暂时不太清楚这是干什么的 */
  closeMixSidebarOnChange: boolean
  /** 折叠菜单显示名称 */
  collapsedShowTitle: boolean
  /** 混合菜单触发方式 */
  mixSideTrigger: MixSidebarTriggerEnum
  /** 固定展开菜单 */
  mixSideFixed: boolean
}

/**
 * 多选项卡设置
 */
export interface MultiTabsSetting {
  cache: boolean
  /** 是否展示标签页 */
  show: boolean
  /** 标签页快捷按钮 */
  showQuick: boolean
  /** 是否可拖拽 */
  canDrag: boolean
  /** 标签页刷新按钮 */
  showRedo: boolean
  /** 标签页折叠按钮，就是那个全窗口按钮 */
  showFold: boolean
}

/**
 * 头部设置
 */
export interface HeaderSetting {
  /** 头部背景颜色 */
  bgColor: string
  /** 是否头部固定不滚动 */
  fixed: boolean
  /** 是否展示头部 */
  show: boolean
  /** 头部主题，由头部背景颜色决定，是接近白色就是light，接近黑色就是dark */
  theme: ThemeEnum
  /** 是否展示头部的全屏按钮 */
  showFullScreen: boolean
  /** 是否展示文档按钮 */
  showDoc: boolean
  /** 是否展示消息中心按钮 */
  showNotice: boolean
  /** 是否展示搜索 */
  showSearch: boolean
}

/**
 * 本地化设置
 */
export interface LocaleSetting {
  /** 是否展示语言切换 */
  showPicker: boolean
  /** 当前语言 */
  locale: LocaleType
  /** 语言找不到时，使用的默认语言 */
  fallback: LocaleType
  /** 可用的语言 */
  availableLocales: LocaleType[]
}

/**
 * 过渡动画设置
 */
export interface TransitionSetting {
  /** 是否打开页面切换动画 */
  enable: boolean
  /** 路由基本切换动画 */
  basicTransition: RouterTransitionEnum
  /** 是否打开网页切换加载 */
  openPageLoading: boolean
  /** 是否打开顶部进度条 */
  openNProgress: boolean
}

/**
 * 项目配置
 */
export interface ProjectConfig {
  /** 权限相关信息的存储位置 LocalStorage or SessionStorage */
  permissionCacheType: CacheTypeEnum
  /** 是否显示配置按钮 */
  showSettingButton: boolean
  /** 是否显示主题切换按钮 */
  showDarkModeToggle: boolean
  /** 配置按钮的显示位置 */
  settingButtonPosition: SettingButtonPositionEnum
  /** 权限模式 */
  permissionMode: PermissionModeEnum
  /** 会话超时处理类型 */
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  /** 网站灰色模式，开放可能的哀悼日期 */
  grayMode: boolean
  /** 是否开启弱色模式 */
  colorWeak: boolean
  /** 主题颜色 */
  themeColor: string

  /** 主界面全屏显示，不显示菜单，顶部的 */
  fullContent: boolean
  /** 内容宽度 */
  contentMode: ContentEnum
  /** 是否显示Logo */
  showLogo: boolean
  /** 是否显示全局页脚 */
  showFooter: boolean
  // menuType: MenuTypeEnum;
  /** 头部设置 */
  headerSetting: HeaderSetting
  /** 菜单设置 */
  menuSetting: MenuSetting
  /** 多选项卡设置 */
  multiTabsSetting: MultiTabsSetting
  /** 动画配置 */
  transitionSetting: TransitionSetting
  /** 页面布局是否启用 keep-alive */
  openKeepAlive: boolean
  /** 是否显示面包屑 */
  showBreadCrumb: boolean
  /** 是否显示面包屑图标 */
  showBreadCrumbIcon: boolean
  /** 是否使用错误处理程序插件 */
  useErrorHandle: boolean
  /** 是否打开 返回顶部 */
  useOpenBackTop: boolean
  /** 是否可以嵌入 iframe 页面 */
  canEmbedIFramePage: boolean
  /** 是否删除未关闭的信息，并在切换接口时发出通知 */
  closeMessageOnSwitch: boolean
  /** 切换接口时，是否取消已发送但未响应的 http 请求。 */
  removeAllHttpPending: boolean
}

/**
 * 全局配置
 */
export interface GlobConfig {
  /** 网站标题 */
  title: string
  /** 服务接口 url */
  apiUrl: string
  /** 上传网址 */
  uploadUrl?: string
  /** 服务接口 url 前缀 */
  urlPrefix?: string
  /** 项目缩写 */
  shortName: string
}

/**
 * 全局环境变量配置
 */
export interface GlobEnvConfig {
  /** 网站标题 */
  VITE_GLOB_APP_TITLE: string
  /** 服务接口 url */
  VITE_GLOB_API_URL: string
  /** 服务接口 url 前缀 */
  VITE_GLOB_API_URL_PREFIX?: string
  /** 项目缩写 */
  VITE_GLOB_APP_SHORT_NAME: string
  /** 上传网址 */
  VITE_GLOB_UPLOAD_URL?: string
}
