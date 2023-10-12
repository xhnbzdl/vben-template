/**
 * @description: 异常有关的枚举
 */
export enum ExceptionEnum {
  /** 页面无权限错误 */
  PAGE_NOT_ACCESS = 403,

  /** 页面找不到 */
  PAGE_NOT_FOUND = 404,

  /**  服务器错误 */
  ERROR = 500,

  /** 前端Js错误 or 网络错误 */
  NET_WORK_ERROR = 10000,

  /** 页面上没有数据 */
  PAGE_NOT_DATA = 10100,
}

/**
 * 错误类型枚举
 * @description: 这些错误被存储在 LocalStorage 中
 */
export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise',
}
