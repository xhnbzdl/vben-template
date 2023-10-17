import { generate } from '@ant-design/colors'
/** 默认颜色 */
export const primaryColor = '#0960bd'
/** 默认主题 */
export const darkMode = 'light'

type Fn = (...arg: any) => any
// 主题类型
type GenerateTheme = 'default' | 'dark'

/** 用于生成颜色的参数 */
export interface GenerateColorsParams {
  /** 用来执行 ’白天’ 主题的颜色混合操作 */
  mixLighten: Fn
  /** 用来执行 ’暗黑’ 主题的颜色混合操作 */
  mixDarken: Fn
  /** 可能是一个颜色处理库或函数 */
  tinycolor: any
  /** 颜色值 */
  color?: string
}

/** 生成 Ant Design 组件的颜色主题 */
export function generateAntColors(color: string, theme: GenerateTheme = 'default') {
  return generate(color, {
    theme,
  })
}

/**
 * 生成主题颜色
 * @param color 主题色的基础颜色
 * @returns 浅色系列颜色和暗模式颜色合并成的 20 个颜色的数组
 */
export function getThemeColors(color?: string) {
  const tc = color || primaryColor
  // 生成基于基础颜色的 10 个浅色系列颜色
  const lightColors = generateAntColors(tc)
  // 从这 10 个浅色系列颜色中选择第 6 个颜色作为主颜色
  const primary = lightColors[5]
  // 使用主颜色生成 10 个深色系列颜色，这是主题的暗模式颜色系列
  const modeColors = generateAntColors(primary, 'dark')
  // 将浅色系列颜色和暗模式颜色合并成一个包含 20 个颜色的数组
  return [...lightColors, ...modeColors]
}

/**
 * 生成与颜色相关的样式变体，如浅色、深色、半透明等
 * @param color: 基础颜色，默认值为 primaryColor。
 * @param mixLighten: 一个函数，用于混合颜色以实现明亮效果。
 * @param mixDarken: 一个函数，用于混合颜色以实现深色效果。
 * @param tinycolor: 一个处理颜色的工具库，估计是 tinycolor2 或类似的库
 * @description: 这个函数的目的是为了生成多种颜色变体，以供主题定制或动态样式生成使用。这对于创建动态主题或多种视觉风格的应用程序非常有用。
 * @returns
 */
export function generateColors({
  color = primaryColor,
  mixLighten,
  mixDarken,
  tinycolor,
}: GenerateColorsParams) {
  // 创建一个包含 19 个元素的数组 arr，并将其填充为 0。这个数组将用于生成一系列颜色变体。
  const arr = new Array(19).fill(0)
  // 使用 mixLighten 函数和 color 作为基础颜色，生成一系列明亮的颜色（lightens），逐渐明亮（透明度不变）。
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5)
  })
  // 使用 mixDarken 函数和 color 作为基础颜色，生成一系列深色的颜色（darkens），逐渐加深（透明度不变）。
  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5)
  })
  // 使用 tinycolor 库将颜色逐渐变为半透明，并生成一系列带有不同透明度的颜色（alphaColors）。
  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString()
  })
  // 对 alphaColors 中的颜色进行处理，去除其中的空格，并将 0.
  // 替换为 ，生成更紧凑的表示（shortAlphaColors）。
  const shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.'))
  // 使用 tinycolor 库将颜色逐渐明亮，生成一系列颜色（tinycolorLightens），并且去掉了白色 #ffffff。
  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString()
    })
    .filter((item) => item !== '#ffffff')
  // 使用 tinycolor 库将颜色逐渐明亮，生成一系列颜色（tinycolorLightens），并且去掉了白色 #ffffff。
  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString()
    })
    .filter((item) => item !== '#000000')
  // 最后，将所有这些生成的颜色合并到一个数组，并去除其中包含 - 字符的颜色。这个数组包括了各种颜色变体，如明亮、深色、半透明等
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes('-'))
}
