/**
 * 用于解析 .env.development 代理配置
 */
import type { ProxyOptions } from 'vite'
// 第一项被代理的路径，第二项代理至的路径
type ProxyItem = [string, string]
// 方法接收的参数
type ProxyList = ProxyItem[]
// Vite 代理所接收对象类型
type ProxyTargetList = Record<string, ProxyOptions>
// https 类型的 URL 的匹配正则
const httpsRE = /^https:\/\//

/**
 * 生成 Vite 代理配置的方法
 * @param list
 */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {}
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target)

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      // 代理至的路径
      target: target,
      // 默认值：false -将主机标头的来源更改为目标 URL
      changeOrigin: true,
      // 是否代理 websocket
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    }
  }
  return ret
}
