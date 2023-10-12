import { ErrorTypeEnum } from '/@/enums/exceptionEnum'
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum'
import { RoleInfo } from '/@/api/sys/model/userModel'

/** 错误日志信息 */
export interface ErrorLogInfo {
  /** 错误类型 */
  type: ErrorTypeEnum
  /** 错误文件 */
  file: string
  /** 错误名称 */
  name?: string
  /** 错误信息 */
  message: string
  /** 错误堆栈 */
  stack?: string
  /** 错误详情 */
  detail: string
  /** 错误 URL */
  url: string
  /** 出错时间 */
  time?: string
}

/** 用户信息 */
export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
  homePath?: string
  roles: RoleInfo[]
}

/** 迷你状态之前 */
export interface BeforeMiniState {
  menuCollapsed?: boolean
  menuSplit?: boolean
  menuMode?: MenuModeEnum
  menuType?: MenuTypeEnum
}
