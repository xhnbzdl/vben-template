const docEle = document.documentElement
/**
 * 用于在 HTML 元素上切换指定的 CSS 类名
 * @param flag 指定是否添加或删除 CSS 类名，true：添加，false：删除
 * @param clsName 要操作的 CSS 类名
 * @param target 目标 HTML 元素，如果未提供，将默认使用 document.body。
 */
export function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
  // 获取要操作的 HTML 元素
  const targetEl = target || document.body
  // 获取目标元素的当前 className
  let { className } = targetEl
  // 如果要操作的 CSS 类名 存在，它将被从 className 中删除
  className = className.replace(clsName, '')
  // 将新的 className 赋值给目标元素的 className 属性，从而实现 CSS 类名的切换
  targetEl.className = flag ? `${className} ${clsName} ` : className
}

/**
 * 这是一个设置 CSS 变量（Custom Properties）的函数
 * @param prop 要设置的 CSS 变量的名称，通常以 -- 开头
 * @param val 要分配给 CSS 变量的值。这可以是任何有效的 CSS 值，如颜色、尺寸、文本等
 * @param dom 可选参数，是一个 HTML 元素，表示要在其上设置 CSS 变量。默认情况下，
 * 它将使用 document.documentElement，通常用于全局设置
 * @description: 这个函数的主要功能是将 prop 对应的 CSS 变量设置为 val，从而可以在 CSS 样式表中使用
 * 这个自定义属性。这使得在样式表中使用相同的值变得更加灵活，特别是在多个地方共享相同的值时，可以避免重复设置。
 * 通过这种方式，你可以动态地改变主色，而不需要在样式表中搜索并替换所有出现的颜色值。
 */
export function setCssVar(prop: string, val: any, dom = docEle) {
  dom.style.setProperty(prop, val)
}
