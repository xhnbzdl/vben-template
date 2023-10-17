/**
 * 应用程序配置
 */
import type { ProjectConfig } from '/#/config'

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'
import projectSetting from '/@/settings/projectSetting'

import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground'
import { updateColorWeak } from '/@/logics/theme/updateColorWeak'
import { updateGrayMode } from '/@/logics/theme/updateGrayMode'
import { updateDarkTheme } from '/@/logics/theme/dark'
import { changeTheme } from '/@/logics/theme'

import { useAppStore } from '/@/store/modules/app'
import { useLocaleStore } from '/@/store/modules/locale'

import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env'

import { primaryColor } from '../../build/config/themeConfig'
import { Persistent } from '/@/utils/cache/persistent'
import { deepMerge } from '/@/utils'
import { ThemeEnum } from '/@/enums/appEnum'

/** 初始化内部系统配置 */
export function initAppConfigStore() {
  // 多语言状态管理器
  const localeStore = useLocaleStore()
  // 应用程序状态管理器
  const appStore = useAppStore()
  // 获取项目配置信息
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})
  // 获取系统主题颜色
  const darkMode = appStore.getDarkMode
  // 部分解构解释：1.将 projCfg.headerSetting.bgColor 的值赋给 headerBgColor
  // 如果 headerSetting 不存在或者 bgColor 不存在，将使用一个空对象作为默认值，以避免解构时出现错误。
  // 2.将 projCfg.menuSetting.bgColor 的值解构为 bgColor。
  const {
    colorWeak,
    grayMode,
    themeColor,

    headerSetting: { bgColor: headerBgColor } = {},
    menuSetting: { bgColor } = {},
  } = projCfg

  try {
    if (themeColor && themeColor !== primaryColor) {
      changeTheme(themeColor)
    }

    grayMode && updateGrayMode(grayMode)
    colorWeak && updateColorWeak(colorWeak)
  } catch (error) {
    console.log(error)
  }
  // 将项目配置存储到状态管理器
  appStore.setProjectConfig(projCfg)

  // 初始化主题模式
  updateDarkTheme(darkMode)
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor()
    updateSidebarBgColor()
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor)
    bgColor && updateSidebarBgColor(bgColor)
  }
  // 初始化多语言信息
  localeStore.initLocale()

  // 清空无用的缓存
  setTimeout(() => {
    clearObsoleteStorage()
  }, 16)
}

/**
 * 随着版本的不断迭代，存储在 localStorage 中的缓存键也会越来越多。
 * 该方法用于删除无用的键
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix()
  const shortPrefix = getStorageShortName()

  const storages = [localStorage, sessionStorage]
  storages.forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key)
      }
    })
  })
}
