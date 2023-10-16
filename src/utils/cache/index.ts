import { getStorageShortName } from '/@/utils/env'
import { createStorage as create, CreateStorageParams } from './storageCache'
import { enableStorageEncryption } from '/@/settings/encryptionSetting'
import { DEFAULT_CACHE_TIME } from '/@/settings/encryptionSetting'

// Partial 将类型变成可选的
export type Options = Partial<CreateStorageParams>

/** 创建构造缓存器需要的参数 */
const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    // 调试模式下不加密
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  }
}

/**
 * SessionStorage缓存器
 */
export const WebStorage = create(createOptions(sessionStorage))

/**
 * 创建缓存器
 * @param storage sessionStorage or localStorage
 * @param options 其他参数，如：过期时间，是否加密等。
 * @returns
 */
export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options))
}

/**
 * 创建 SessionStorage 存储器
 * @param options
 * @returns
 */
export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

/**
 * 创建 LocalStorage 存储器
 * @param options
 * @returns
 */
export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export default WebStorage
