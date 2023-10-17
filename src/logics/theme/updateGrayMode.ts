import { toggleClass } from './util'

/**
 * 更改项目主题为灰色模式状态
 * @param gray
 */
export function updateGrayMode(gray: boolean) {
  toggleClass(gray, 'gray-mode', document.documentElement)
}
