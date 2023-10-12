import type { UserConfig, ConfigEnv } from 'vite'
import pkg from './package.json'
import dayjs from 'dayjs'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { generateModifyVars } from './build/generate/generateModifyVars'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { OUTPUT_DIR } from './build/constant'

// 路径解析
function pathResolve(dir: string) {
  // 当前工作目录/dir
  return resolve(process.cwd(), '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

// https://cn.vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  // 当前工作目录
  const root = process.cwd()
  // 根据 `mode` 加载当前工作目录中的 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。默认不加载`VITE_`以外的变量
  const env = loadEnv(mode, root)

  // loadEnv 读取的布尔类型是字符串。该函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root, // 项目根目录（index.html 文件所在的位置）
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      https: true,
      // 监听所有本地 IP
      host: true,
      port: VITE_PORT,
      // 从 .env 加载代理配置
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      // 删除控制台打印
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      // 打包输出的目录
      outDir: OUTPUT_DIR,
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },

      // 启用/禁用 brotli 压缩大小报告。禁用该功能可能会提高大型项目的构建性能，缩短打包时间
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // 设置 vue-i18-next
      // 消除警告
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    css: {
      preprocessorOptions: {
        less: {
          // 主题切换时改变样式
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },

    // 项目使用的 vite 插件。数量较大，因此单独提取和管理
    plugins: createVitePlugins(viteEnv, isBuild),

    optimizeDeps: {
      // @iconify/iconify： @purge-icons/generated 会动态虚拟加载依赖关系，因此需要明确指定
      include: [
        '@vue/runtime-core',
        '@vue/shared',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
  }
})
