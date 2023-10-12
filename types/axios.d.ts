export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

/** axios 请求参数 */
export interface RequestOptions {
  /** 是否将请求参数拼接到 url */
  joinParamsToUrl?: boolean
  /** 是否对请求参数时间进行格式化 */
  formatDate?: boolean
  /** 是否处理请求结果 */
  isTransformResponse?: boolean
  /**
   * 是否返回本地响应标头
   * 例如：需要获取响应头时使用此属性
   */
  isReturnNativeResponse?: boolean
  /** 是否将前缀加入 url */
  joinPrefix?: boolean
  /** 接口地址，如果留空，请使用默认 apiUrl */
  apiUrl?: string
  /** 请求拼接路径 */
  urlPrefix?: string
  /** 错误信息提示类型 */
  errorMessageMode?: ErrorMessageMode
  /** 是否添加时间戳 */
  joinTime?: boolean
  ignoreCancelToken?: boolean
  /** 是否在请求头中携带 token */
  withToken?: boolean
  /** 请求重试机制 */
  retryRequest?: RetryRequest
}

/** 重试请求 */
export interface RetryRequest {
  /** 是否打开重试 */
  isOpenRetry: boolean
  /** 次数 */
  count: number
  /** 等待时间 */
  waitTime: number
}

/** 响应结果 */
export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}

/** multipart/form-data: 上传文件 */
export interface UploadFileParams {
  /** 其他参数 */
  data?: Recordable
  /** 文件参数接口字段名称 */
  name?: string
  /** 文件 */
  file: File | Blob
  /** 文件名称 */
  filename?: string
  [key: string]: any
}
