import type { ProjectConfig } from '/#/config'
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum'
import { CacheTypeEnum } from '/@/enums/cacheEnum'
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum'
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting'
import { primaryColor } from '../../build/config/themeConfig'

/**
 * 默认的项目配置
 * @description: 更改后需要清除浏览器缓存
 */
const setting: ProjectConfig = {
  showSettingButton: true,

  showDarkModeToggle: true,

  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  permissionCacheType: CacheTypeEnum.LOCAL,

  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  themeColor: primaryColor,

  grayMode: false,

  colorWeak: false,

  fullContent: false,

  contentMode: ContentEnum.FULL,

  showLogo: true,

  showFooter: false,

  headerSetting: {
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    fixed: true,
    show: true,
    theme: ThemeEnum.LIGHT,
    showFullScreen: true,
    showDoc: true,
    showNotice: true,
    showSearch: true,
  },

  menuSetting: {
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    fixed: true,
    collapsed: false,
    siderHidden: false,
    collapsedShowTitle: false,
    canDrag: false,
    show: true,
    hidden: false,
    menuWidth: 210,
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
    theme: ThemeEnum.DARK,
    split: false,
    topMenuAlign: 'center',
    trigger: TriggerEnum.HEADER,
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    mixSideFixed: false,
  },

  multiTabsSetting: {
    cache: false,
    show: true,
    canDrag: true,
    showQuick: true,
    showRedo: true,
    showFold: true,
  },

  transitionSetting: {
    enable: true,

    basicTransition: RouterTransitionEnum.FADE_SIDE,

    openPageLoading: true,

    openNProgress: false,
  },

  openKeepAlive: true,

  showBreadCrumb: true,

  showBreadCrumbIcon: false,

  useErrorHandle: false,

  useOpenBackTop: true,

  canEmbedIFramePage: true,

  closeMessageOnSwitch: true,

  removeAllHttpPending: false,
}

export default setting
