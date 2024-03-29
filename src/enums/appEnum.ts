/** 无标题菜单的最小宽度 */
export const SIDE_BAR_MINI_WIDTH = 48
/** 有标题菜单的最小宽度 */
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80

/**
 * 内容区域宽度的枚举类型
 */
export enum ContentEnum {
  /** auto width 流式 */
  FULL = 'full',
  /** fixed width 定宽 */
  FIXED = 'fixed',
}

/** 菜单主题类型 */
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

/**
 * 设置按钮的位置枚举
 */
export enum SettingButtonPositionEnum {
  /** 两种都有 */
  AUTO = 'auto',
  /** 头部 */
  HEADER = 'header',
  /** 固定在窗口右侧 */
  FIXED = 'fixed',
}

/**
 * 回话超时处理类型
 */
export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  /** 角色权限 */
  ROLE = 'ROLE',
  /** 后端 */
  BACK = 'BACK',
  /** 路由映射 */
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

/** 路由切换动画 */
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}
