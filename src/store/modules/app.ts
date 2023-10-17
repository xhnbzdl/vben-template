import type {
  ProjectConfig,
  HeaderSetting,
  MenuSetting,
  TransitionSetting,
  MultiTabsSetting,
} from '/#/config'
import type { BeforeMiniState } from '/#/store'

import { defineStore } from 'pinia'
import { store } from '/@/store'

import { ThemeEnum } from '/@/enums/appEnum'
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '/@/enums/cacheEnum'
import { Persistent } from '/@/utils/cache/persistent'
import { darkMode } from '/@/settings/designSetting'
import { resetRouter } from '/@/router'
import { deepMerge } from '/@/utils'

/** Pinia——应用程序App状态数据 */
interface AppState {
  /** 主题模式：暗黑、白天 */
  darkMode?: ThemeEnum
  /** 加载页面时是否显示 loading 效果（作用于 LayoutContent 组件） */
  pageLoading: boolean
  /** 项目配置 */
  projectConfig: ProjectConfig | null
  /** 当窗口缩小时，记住一些状态，并在窗口恢复时恢复这些状态 */
  beforeMiniInfo: BeforeMiniState
}

/** 计时器标识 */
let timeId: TimeoutHandle

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    /** LayoutContent 切换页面时是否显示 loading 效果，默认值：false */
    getPageLoading(): boolean {
      return this.pageLoading
    },
    /** 主题模式：暗黑、白天 */
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode
    },
    /** 当窗口缩小时的状态数据 */
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo
    },
    /** 项目配置 */
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
    /** 头部设置 */
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting
    },
    /** 菜单设置 */
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },
    /** 动画设置 */
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting
    },
    /** 多选项卡设置 */
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting
    },
  },
  actions: {
    /** 设置 LayoutContent 切换页面时是否显示 loading 效果 */
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },
    /** 设置主题模式：light、dark */
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
      localStorage.setItem(APP_DARK_MODE_KEY_, mode)
    },
    /** 设置窗口缩小时的状态数据 */
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state
    },
    /** 设置项目配置 */
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      // 使用深度合并方法将新数据与旧数据合并
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    },
    /** 重置路由和所有缓存数据 */
    async resetAllState() {
      resetRouter()
      Persistent.clearAll()
    },
    /** 设置 LayoutContent 中切换页面时的 loading 行为 */
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        // 在创建新的定时器之前清除旧的定时器，如果 timeId 为空它会被自动忽略
        clearTimeout(timeId)
        // 使用定时器的目的是为了防止加载状态在很短的时间内闪烁
        timeId = setTimeout(() => {
          this.setPageLoading(loading)
        }, 50)
      } else {
        this.setPageLoading(loading)
        clearTimeout(timeId)
      }
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
