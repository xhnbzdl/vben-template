import type { LocaleSetting, LocaleType } from '/#/config'

import { defineStore } from 'pinia'
import { store } from '/@/store'

import { LOCALE_KEY } from '/@/enums/cacheEnum'
import { createLocalStorage } from '/@/utils/cache'
import { localeSetting } from '/@/settings/localeSetting'

const ls = createLocalStorage()

/** 从 localStorage 中获取的本地化设置 */
const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting

/** Pinia——本地化多语言状态数据 */
interface LocaleState {
  localInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    /** 是否展示语言切换 */
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker
    },
    /** 当前语言 */
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'zh_CN'
    },
  },
  actions: {
    /**
     * 设置多语言信息和缓存
     * @param info 多语种信息
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      // 将新数据和原数据合并
      this.localInfo = { ...this.localInfo, ...info }
      ls.set(LOCALE_KEY, this.localInfo)
    },
    /**
     * 初始化多语言信息，并从本地缓存中加载现有配置
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      })
    },
  },
})

/** 如果要在 Pinia 初始化之前使用，请使用此方法 */
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
