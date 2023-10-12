/**
 * @description: 菜单布局的四种类型
 */
export enum MenuTypeEnum {
  /** 左侧菜单模式 */
  SIDEBAR = 'sidebar',
  /** 左侧菜单混合模式 */
  MIX_SIDEBAR = 'mix-sidebar',
  /** 顶部菜单混合模式 */
  MIX = 'mix',
  /** 顶部菜单 */
  TOP_MENU = 'top-menu',
}

/** 折叠触发器位置 */
export enum TriggerEnum {
  // 不显示
  NONE = 'NONE',
  // 菜单底部
  FOOTER = 'FOOTER',
  // 头部
  HEADER = 'HEADER',
}

export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline'

/** 菜单的显示方式 */
export enum MenuModeEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline',
}

/** 菜单分割类型 */
export enum MenuSplitTyeEnum {
  NONE,
  TOP,
  LEFT,
}

/** 菜单在顶部的对齐方式 */
export enum TopMenuAlignEnum {
  CENTER = 'center',
  START = 'start',
  END = 'end',
}

/** 混合菜单触发方式类型 */
export enum MixSidebarTriggerEnum {
  HOVER = 'hover',
  CLICK = 'click',
}
