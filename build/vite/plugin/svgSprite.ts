/**
 *  用于快速创建 SVG 精灵的 Vite 插件
 * https://github.com/anncwb/vite-plugin-svg-icons
 */

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

/**
 * 创建 SVG 精灵的 Vite 插件
 * @param isBuild 是否是打包环境
 * @returns
 */
export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    // 本地svg图片地址
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // 图标ID的样式
    symbolId: 'icon-[dir]-[name]',
  })
  return svgIconsPlugin
}
