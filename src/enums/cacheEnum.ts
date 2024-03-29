// 存在内存和Storage中的缓存的Key
// token key
export const TOKEN_KEY = 'TOKEN__'
/** 本地化多语言缓存的key */
export const LOCALE_KEY = 'LOCALE__'

// user info key
export const USER_INFO_KEY = 'USER__INFO__'

// role info key
export const ROLES_KEY = 'ROLES__KEY__'

/** 项目配置缓存的key */
export const PROJ_CFG_KEY = 'PROJ__CFG__KEY__'

export const MULTIPLE_TABS_KEY = 'MULTIPLE_TABS__KEY__'
/** 系统主题模式（白天，暗黑） */
export const APP_DARK_MODE_KEY_ = '__APP__DARK__MODE__'

/** 全局本地缓存key */
export const APP_LOCAL_CACHE_KEY = 'COMMON__LOCAL__KEY__'

/** 全局 Session 缓存key */
export const APP_SESSION_CACHE_KEY = 'COMMON__SESSION__KEY__'

/**
 * 缓存的类型
 */
export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}
