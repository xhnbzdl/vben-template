import { isDevMode } from '/@/utils/env'

// 默认缓存时间
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

// AES 加密密钥和偏移量
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_',
}

/**
 * 系统缓存是否使用 aes 加密
 * @description: 开发模式不启用，非开发模式启用
 */
export const enableStorageEncryption = !isDevMode()
