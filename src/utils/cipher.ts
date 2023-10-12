import { encrypt, decrypt } from 'crypto-js/aes'
import { parse } from 'crypto-js/enc-utf8'
import pkcs7 from 'crypto-js/pad-pkcs7'
import ECB from 'crypto-js/mode-ecb'
import md5 from 'crypto-js/md5'
import UTF8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'

/** 加密参数 */
export interface EncryptionParams {
  /** 密钥 */
  key: string
  /** 偏移量 */
  iv: string
}

/**
 * AES加密服务
 */
export class AesEncryption {
  /** 密钥 */
  private key
  /** 偏移量 */
  private iv

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key, iv } = opt
    if (key) {
      this.key = parse(key)
    }
    if (iv) {
      this.iv = parse(iv)
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv,
    }
  }

  /** AES 加密 */
  encryptByAES(cipherText: string) {
    return encrypt(cipherText, this.key, this.getOptions).toString()
  }

  /** AES 解密 */
  decryptByAES(cipherText: string) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8)
  }
}

/** Base64 加密 */
export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64)
}

/** Base64 解密 */
export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8)
}

/** Md5 加密 */
export function encryptByMd5(password: string) {
  return md5(password).toString()
}
