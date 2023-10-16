import type { UserInfo } from '/#/store'
import type { ProjectConfig } from '/#/config'
import type { RouteLocationNormalized } from 'vue-router'

import { createLocalStorage, createSessionStorage } from '/@/utils/cache'
import { Memory } from './memory'
import {
  TOKEN_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  PROJ_CFG_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  MULTIPLE_TABS_KEY,
} from '/@/enums/cacheEnum'
import { DEFAULT_CACHE_TIME } from '/@/settings/encryptionSetting'
import { toRaw } from 'vue'
import { pick, omit } from 'lodash-es'

/** 基础缓存项 */
interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined
  [USER_INFO_KEY]: UserInfo
  [ROLES_KEY]: string[]
  [PROJ_CFG_KEY]: ProjectConfig
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[]
}

/** LocalStore存储接口 */
type LocalStore = BasicStore
/** // LocalStore存储接口 */
type SessionStore = BasicStore

/** 基础存储接口的Key */
export type BasicKeys = keyof BasicStore
/** LocalStore存储接口Key */
type LocalKeys = keyof LocalStore
/** SessionStore存储接口Key */
type SessionKeys = keyof SessionStore

/** LocalStorage存储器 */
const ls = createLocalStorage()
/** SessionStorage存储器 */
const ss = createSessionStorage()

/** 本地内存 */
const localMemory = new Memory(DEFAULT_CACHE_TIME)
/** Session内存 */
const sessionMemory = new Memory(DEFAULT_CACHE_TIME)

/** 初始化持久化内存 */
function initPersistentMemory() {
  // 获取 LocalStorage 中的 COMMON__LOCAL__KEY__ 的值
  const localCache = ls.get(APP_LOCAL_CACHE_KEY)
  // 获取 SessionStorage 中的 COMMON__SESSION__KEY__ 的值
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY)
  // 如果存了值，就在内存中也存一份
  localCache && localMemory.resetCache(localCache)
  sessionCache && sessionMemory.resetCache(sessionCache)
}

/** 持久化类 */
export class Persistent {
  /** 获取 LocalStorage 的内存 */
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>
  }

  /**
   * 设置 LocalStorage 的内存
   * @param key
   * @param value
   * @param immediate true：同时设置到 LocalStorage 中。false：只设置在内存中
   */
  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    localMemory.set(key, toRaw(value))
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }

  /**
   * 删除 LocalStorage 的内存
   * @param key
   * @param immediate true：同时在 LocalStorage 中删除。false：只在内存中删除
   */
  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key)
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }

  /**
   * 清空所有 LocalStorage 的内存
   * @param immediate true：同时清空 LocalStorage 中的所有缓存。false：只清空内存中的缓存
   */
  static clearLocal(immediate = false): void {
    localMemory.clear()
    immediate && ls.clear()
  }

  /** 获取 Session 内存 */
  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>
  }

  /**
   * 设置 SessionStorage 的内存
   * @param key
   * @param value
   * @param immediate true：同时设置到 SessionStorage 中。false：只设置在内存中
   */
  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
    sessionMemory.set(key, toRaw(value))
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
  }

  /**
   * 删除 SessionStorage 的内存
   * @param key
   * @param immediate true：同时在 SessionStorage 中删除。false：只在内存中删除
   */
  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key)
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
  }

  /**
   * 清空所有 SessionStorage 的内存
   * @param immediate true：同时清空 SessionStorage 中的所有缓存。false：只清空内存中的缓存
   */
  static clearSession(immediate = false): void {
    sessionMemory.clear()
    immediate && ss.clear()
  }

  /**
   * 清空所有内存，包含 LocalStorage 和 SessionStorage
   * @param immediate true：同时清空 LocalStorage、SessionStorage。false：只清空内存中的缓存
   */
  static clearAll(immediate = false) {
    sessionMemory.clear()
    localMemory.clear()
    if (immediate) {
      ls.clear()
      ss.clear()
    }
  }
}

/** 当窗口刷新或者关闭窗口 */
window.addEventListener('beforeunload', function () {
  // TOKEN_KEY 在登录或注销时已经写入到 storage 了，此处为了解决同时打开多个窗口时token不同步的问题
  ss.set(APP_SESSION_CACHE_KEY, {
    ...omit(sessionMemory.getCache),
    ...pick(ss.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY]),
  })
})

/**
 * 当存储库修改时
 * @param e
 * @returns
 */
function storageChange(e: any) {
  const { key, newValue, oldValue } = e

  if (!key) {
    Persistent.clearAll()
    return
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal()
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession()
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
// 只监听LocalStorage的变化，监听其他窗口是否改变了 LocalStorage，当前窗口修改的不处理
window.addEventListener('storage', storageChange)

// 将 LocalStorage 和 SessionStorage 加载到内存中
initPersistentMemory()
