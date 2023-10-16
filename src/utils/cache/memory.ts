/** 缓存值接口 */
export interface Cache<V = any> {
  /** 缓存的值 */
  value?: V
  /** 计时器的ID */
  timeoutId?: ReturnType<typeof setTimeout>
  /** 过期时间毫秒值（new Date + alive） */
  time?: number
  /** 存活时间 1 * 1000 */
  alive?: number
}

/** 不存活为0 */
const NOT_ALIVE = 0

/** 内存类 */
export class Memory<T = any, V = any> {
  /** 它的键是来自类型 T 的属性名称，值是对应的缓存数据（Cache<V> 类型） */
  private cache: { [key in keyof T]?: Cache<V> } = {}
  /** 默认存活时间 */
  private alive: number

  /**
   * 构造函数
   * @param alive 过期时间
   */
  constructor(alive = NOT_ALIVE) {
    // 单位秒
    this.alive = alive * 1000
  }

  /** 获取缓存 */
  get getCache() {
    return this.cache
  }

  /** 设置缓存 */
  setCache(cache) {
    this.cache = cache
  }

  /** 获取缓存项 */
  get<K extends keyof T>(key: K) {
    return this.cache[key]
  }

  /** 设置缓存项 */
  set<K extends keyof T>(key: K, value: V, expires?: number) {
    let item = this.get(key)

    // 如果过期时间为空或小于0
    if (!expires || (expires as number) <= 0) {
      expires = this.alive
    }

    // 如果原来缓存有值
    if (item) {
      if (item.timeoutId) {
        // 清除计时器
        clearTimeout(item.timeoutId)
        item.timeoutId = undefined
      }
      // 缓存赋值，覆盖之前的值
      item.value = value
    } else {
      // 原值不存在，赋值
      item = { value, alive: expires }
      this.cache[key] = item
    }
    // 没有过期时间直接返回缓存值
    if (!expires) {
      return value
    }
    const now = new Date().getTime()
    /**
     * 防止 setTimeout 最大延迟值溢出，最大延迟值 2,147,483,647 毫秒
     * https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value
     */
    item.time = expires > now ? expires : now + expires
    item.timeoutId = setTimeout(
      () => {
        this.remove(key)
      },
      expires > now ? expires - now : expires,
    )

    return value
  }

  /** 删除缓存项 */
  remove<K extends keyof T>(key: K) {
    const item = this.get(key)
    Reflect.deleteProperty(this.cache, key)
    // 清空定时器
    if (item) {
      clearTimeout(item.timeoutId!)
      return item.value
    }
  }

  /**
   * 重置所有缓存项
   * @param cache
   */
  resetCache(cache: { [K in keyof T]: Cache }) {
    Object.keys(cache).forEach((key) => {
      const k = key as any as keyof T
      const item = cache[k]
      if (item && item.time) {
        const now = new Date().getTime()
        // 过期时间
        const expire = item.time
        // 如果缓存项还没过期
        if (expire > now) {
          this.set(k, item.value, expire)
        }
      }
    })
  }

  /** 清空所有缓存项 */
  clear() {
    Object.keys(this.cache).forEach((key) => {
      const item = this.cache[key]
      item.timeoutId && clearTimeout(item.timeoutId)
    })
    this.cache = {}
  }
}
