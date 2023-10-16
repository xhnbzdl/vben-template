// 这个组件主要是用来动态创建组件使用的
import {
  defineAsyncComponent,
  // FunctionalComponent, CSSProperties
} from 'vue'
import { Spin } from 'ant-design-vue'
import { noop } from '/@/utils'

// const Loading: FunctionalComponent<{ size: 'small' | 'default' | 'large' }> = (props) => {
//   const style: CSSProperties = {
//     position: 'absolute',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   };
//   return (
//     <div style={style}>
//       <Spin spinning={true} size={props.size} />
//     </div>
//   );
// };

/** 动态创建组件的参数 */
interface Options {
  size?: 'default' | 'small' | 'large'
  delay?: number
  timeout?: number
  loading?: boolean
  retry?: boolean
}

/**
 * 创建异步组件
 * @param loader
 * @param options
 * @description: https://v3.vuejs.org/api/global-api.html#defineasynccomponent
 * @returns
 */
export function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { size = 'small', delay = 100, timeout = 30000, loading = false, retry = true } = options
  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? <Spin spinning={true} size={size} /> : undefined,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    // TODO
    timeout,
    // errorComponent
    // Defining if component is suspensible. Default: true.
    // suspensible: false,
    delay,
    /**
     *
     * @param {*} error Error message object
     * @param {*} retry A function that indicating whether the async component should retry when the loader promise rejects
     * @param {*} fail  End of failure
     * @param {*} attempts Maximum allowed retries number
     */
    onError: !retry
      ? noop
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            // retry on fetch errors, 3 max attempts
            retry()
          } else {
            // Note that retry/fail are like resolve/reject of a promise:
            // one of them must be called for the error handling to continue.
            fail()
          }
        },
  })
}
