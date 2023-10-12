import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

/**
 * 是否是Dev环境
 * @param mode
 * @returns
 */
export function isDevFn(mode: string): boolean {
  return mode === 'development'
}

/**
 * 是否是生产环境
 * @param mode
 * @returns
 */
export function isProdFn(mode: string): boolean {
  return mode === 'production'
}

/**
 * 是否生成软件包预览
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true'
}

/**
 * 将所有环境变量配置文件读入 process.env
 * @param envConf
 * @returns 包装后的环境变量
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    // 将字符串中所有的 \\n 替换为实际的换行符 \n。用于处理转义字符
    let realName = envConf[envName].replace(/\\n/g, '\n')
    // 将字符串的 true false 转为 boolean 的 true false
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    // 端口号转为 number 类型
    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    // 代理地址转为 数组对象
    if (envName === 'VITE_PROXY' && realName) {
      try {
        // 将字符串中所有的单引号 ' 替换为双引号 "
        realName = JSON.parse(realName.replace(/'/g, '"'))
      } catch (error) {
        realName = ''
      }
    }
    ret[envName] = realName

    // 将环境变量存入 process.env
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }

  return ret
}

/**
 * 获取当前环境下生效的配置文件
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script
  // 匹配字符串中的 --mode 后面的参数
  const reg = new RegExp('--mode ([a-z_\\d]+)')
  const result = reg.exec(script as string) as any
  if (result) {
    const mode = result[1] as string
    return ['.env', `.env.${mode}`]
  }
  return ['.env', '.env.production']
}

/**
 * 获取以指定前缀开头的环境变量
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {}
  confFiles.forEach((item) => {
    try {
      // 使用 dotenv 从 .env 文件流 Buffer 中同步读取环境变量
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)))
      // 将新获取的对象追加到结果中，相同的覆盖
      envConfig = { ...envConfig, ...env }
    } catch (e) {
      console.error(`Error in parsing ${item}`, e)
    }
  })
  const reg = new RegExp(`^(${match})`)
  Object.keys(envConfig).forEach((key) => {
    // 删除非 `match` 变量值开头的环境变量
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig
}

/**
 * 获取用户根目录
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}
