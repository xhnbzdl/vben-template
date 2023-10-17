import { Slots } from 'vue'
import { isFunction } from '/@/utils/is'

/**
 * 从Vue 3组件的slots中获取具名插槽的函数
 * @description:  获取插槽以防止空错误
 * @param data 用于向插槽传递数据
 */
export function getSlot(slots: Slots, slot = 'default', data?: any) {
  // 检查 slots 是否为b null 或是否具有名为 `slot` 变量值的插槽
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  // 检查指定插槽是否为一个函数
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) {
    return null
  }

  return slotFn(data)
}

/**
 * 获取指定排除项以外的插槽
 * @param slots
 * @param excludeKeys 要排除的插槽（传插槽名称数组）
 */
export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  //  slots 对象中所有的插槽名称
  const slotKeys = Object.keys(slots)
  // 处理后的插槽
  const ret: any = {}
  slotKeys.map((key) => {
    if (excludeKeys.includes(key)) {
      return null
    }
    ret[key] = (data?: any) => getSlot(slots, key, data)
  })
  return ret
}
