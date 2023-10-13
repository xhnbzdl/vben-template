// 日志打印相关方法

// 项目名称
const projectName = import.meta.env.VITE_GLOB_APP_TITLE

/** 打印警告日志 */
export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`)
}

/** 打印错误日志 */
export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`)
}
