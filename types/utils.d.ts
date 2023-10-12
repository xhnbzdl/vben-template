import type { ComputedRef, Ref } from 'vue'

/** 用于定义动态属性，以支持响应性和计算属性。 */
export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}
