// 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#%E4%BD%BF%E7%94%A8_tostring_%E5%8E%BB%E6%A3%80%E6%9F%A5%E5%AF%B9%E8%B1%A1%E7%B1%BB
const toString = Object.prototype.toString

/**
 * 检查给定值 val 是否属于特定的类型
 * @param val
 * @param type
 * @returns true：值与类型匹配。false：值与类型不匹配
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * 检查给定的值是否已定义（不是 undefined）
 * @param val
 * @returns true：已定义。false：未定义
 */
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

/**
 * 检查给定的值是否未定义（即等于 undefined）
 * @param val
 * @returns true：未定义，值等于 undefined。false：已定义
 */
export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

/**
 * 检查给定的值是否是 Object 类型
 * @param val
 * @returns true: 是 Object 类型。false： 不是 Object 类型
 */
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

/**
 * 检查给定的值是否为空
 * @param val
 * @returns
 */
export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

/**
 * 检查给定的值是否是 Date 类型
 * @param val
 * @returns
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

/**
 * 检查给定的值是否为 null
 * @param val
 * @returns
 */
export function isNull(val: unknown): val is null {
  return val === null
}

/**
 * 检查给定的值是否未定义，并且值为 null
 * @param val
 * @returns
 */
export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

/**
 * 是否为 null 或未定义
 * @param val
 * @returns
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

/**
 * 检查给定的值是否是 Number 类型
 * @param val
 * @returns
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

/**
 * 检查给定的值是否是 Promise 类型
 * @param val
 * @returns
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 检查给定的值是否是 String 类型
 * @param val
 * @returns
 */
export function isString(val: unknown): val is string {
  return is(val, 'String')
}

/**
 * 检查给定的值是否是 Founction 类型
 * @param val
 * @returns
 */
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

/**
 * 检查给定的值是否是 Boolean 类型
 * @param val
 * @returns
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

/**
 * 检查给定的值是否是 RegExp 类型
 * @param val
 * @returns
 */
export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

/**
 * 检查给定的值是否是数组类型
 * @param val
 * @returns true: 是数组类型。false：不是数组类型。
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

/**
 * 检查给定的值 val 是否是一个浏览器窗口对象 Window
 * @param val
 * @returns
 */
export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}

/**
 * 检查给定的值 val 是否是一个 DOM 元素
 * @param val
 * @returns
 */
export function isElement(val: unknown): val is Element {
  // 如果 val 是一个 DOM 元素，它应该具有 tagName 属性。使用两个感叹号 !! 将表达式的结果转换为布尔值
  return isObject(val) && !!val.tagName
}

/**
 * 检查给定的值 val 是否是 Map 类型
 * @param val
 * @returns
 */
export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map')
}

/**
 * 检查代码是否在服务器端执行
 * @description: 这种检查在服务器端渲染 (SSR) 的应用程序中很有用，因为在服务器端渲染期间，客户端的 window 对象不可用，而在浏览器端渲染时，window 对象是可用的。
 */
export const isServer = typeof window === 'undefined'

/**
 * 检查代码是否在客户端执行
 */
export const isClient = !isServer

/**
 * 检查 path 是否是一个有效的 URL
 * @param path
 * @returns
 */
export function isUrl(path: string): boolean {
  const reg =
    /^(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?(\/#\/)?(?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}
