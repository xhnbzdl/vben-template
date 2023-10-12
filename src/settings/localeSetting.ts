import type { DropMenu } from '../components/Dropdown'
import type { LocaleSetting, LocaleType } from '/#/config'

/** 本地化的Key */
export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
}

/** 本地化设置 */
export const localeSetting: LocaleSetting = {
  /** 展示语言切换按钮 */
  showPicker: true,
  /** 默认的本地语言 */
  locale: LOCALE.ZH_CN,
  /** 默认失败后的语言 */
  fallback: LOCALE.ZH_CN,
  /** 支持的语言 */
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
}

/** 语言列表 */
export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
]
