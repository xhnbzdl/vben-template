import type { GlobEnvConfig } from '/#/config'

import { warn } from '/@/utils/log'
import pkg from '../../package.json'
import { getConfigFileName } from '../../build/getConfigFileName'

/** 获取公共的缓存前缀 */
export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
  // VUE_VBEN_ADMIN__DEVELOPMENT
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase()
}

/** 根据版本生成缓存密钥 */
export function getStorageShortName() {
  // VUE_VBEN_ADMIN__DEVELOPMENT__2.8.0__
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()
}

export function getAppEnvConfig() {
  // __PRODUCTION__VUE_VBEN_ADMIN__CONF__
  const ENV_NAME = getConfigFileName(import.meta.env)

  const ENV = (import.meta.env.DEV
    ? // 获取全局配置（打包时将单独提取配置）
      (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = ENV

  // 要求整个字符串只包含小写字母、大写字母和下划线
  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(`VITE_GLOB_APP_SHORT_NAME 变量只能是字符或省略号，请修改环境变量并重新运行。`)
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  }
}

/**
 * @description: Development mode
 */
export const devMode = 'development'

/**
 * @description: Production mode
 */
export const prodMode = 'production'

/**
 * @description: 获取当前环境名称
 * @returns:
 * @example:"development"、"production"
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

/**
 * @description: 是否为开发模式
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * @description: 是否为生产模式
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}
