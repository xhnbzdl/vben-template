import { cacheCipher } from '/@/settings/encryptionSetting'
import type { EncryptionParams } from '/@/utils/cipher'
import { AesEncryption } from '/@/utils/cipher'
import { isNullOrUnDef } from '/@/utils/is'

/** 创建缓存器的参数 */
export interface CreateStorageParams extends EncryptionParams {
  /** key 前缀 */
  prefixKey: string
  /** 缓存器： LocalStorage 或 SessionStorage */
  storage: Storage
  /** 是否加密 */
  hasEncrypt: boolean
  /** 过期时间 */
  timeout?: Nullable<number>
}

/** 创建缓存器 */
export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('当 hasEncrypt 为 true 时，密钥或 iv 必须为 16 位！')
  }

  const encryption = new AesEncryption({ key, iv })

  /**
   * 缓存类
   * 构造参数可以传入 sessionStorage 或 localStorage
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    /** 存储器 */
    private storage: Storage
    /** key 前缀 */
    private prefixKey?: string
    /** 加密器 */
    private encryption: AesEncryption
    /** 是否加密 */
    private hasEncrypt: boolean
    /**
     *
     * @param {*} storage
     */
    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
      this.encryption = encryption
      this.hasEncrypt = hasEncrypt
    }

    /** 获取缓存 key */
    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    /**
     * 设置缓存
     * @param {string} key 缓存的 key
     * @param {*} value 缓存的值
     * @param {*} expire 失效时间（秒）
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
      })
      const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData
      this.storage.setItem(this.getKey(key), stringifyValue)
    }

    /**
     * 获取缓存
     * @param {string} key
     * @param {*} def 如果缓存为空，返回的默认值
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key))
      // 如果值为空，返回默认值
      if (!val) return def

      try {
        // 解密值
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val
        const data = JSON.parse(decVal)
        const { value, expire } = data
        // 如果没有设置过期时间，或还未到过期时间，则返回值
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value
        }
        // 如果值过期，则删除
        this.remove(key)
      } catch (e) {
        return def
      }
    }

    /**
     * 删除缓存
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    /**
     * 删除所有缓存
     */
    clear(): void {
      this.storage.clear()
    }
  }

  return new WebStorage()
}
