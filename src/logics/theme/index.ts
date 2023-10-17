import { getThemeColors, generateColors } from '../../../build/config/themeConfig'

import { replaceStyleVariables } from 'vite-plugin-theme/es/client'
import { mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme/es/colorUtils'

/** 改变主题颜色 */
export async function changeTheme(color: string) {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color,
  })
  // 应用新的颜色变量，从而更改应用程序的主题
  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors],
  })
}
